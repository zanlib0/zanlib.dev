---
title: On TypeScript's Flaws
pubDate: 17 Aug 2024
---
While looking to adopt a new technology, a development team typically gets together and tries to review its pros and cons. The trouble is the asymmetry of information: pros are easily available, if only for the landing page that each library or language proudly displays. Everyone knows that TS is a "superset of JS," or that Formik lets you build forms "without the tears". The cons are comparatively much more difficult to come by. Some issues with a technology will only manifest once the project has been going on for long enough time and the code-base has grown. Unless someone on the team has extensive prior experience with a technology, it is very difficult to evaluate it honestly.

What follows is a few notes taken from experience about the times where TS fell short in long-running projects. Some of these aspects are fundamental to the design decisions that drive TS development and are inherent to the language, some are fixable, some might just be user error that is not obvious how to fix even with poking around the documentation. Please keep in mind that I am writing this from the perspective of a developer favouring functional-style programming in JS. Please also note that this list is deliberately negative. I acknowledge that TS is useful for some teams, but there are other places on the internet where you can find favourable comparisons or even panegyrics dedicated to it. That's not what this is for.

I hope that this list helps you to evaluate whether TS is a good fit for your project, or, if you are planning to create a new compile-to-JS language - since TS heavily suffers from a lack of serious competition - to give a few pointers where the current mainstream solution is lacking.

## Composition of arbitrary types

Composition is fundamental to functional programming. Any language that aims to attract functional programmers needs to have excellent support for composing functions, other transformations, and data.

Composing two functions in JS left-to-right is easy:

```javascript
const compose = (f, g) => x => g(f(x))
```

In TS:

```typescript
type Fn<A, V> = (x: A) => V
const compose = <A, B, C>(f: Fn<A, B>, g: Fn<B, C>): Fn<A, C> => x => g(f(x))
```

This is quite verbose and somewhat less readable, but it works. I can now compose two functions together.

```typescript
const double = (a: number) => a * 2
const square = (a: number) => a * a
const doubleThenSquare = compose(double, square)
```

Now that I have a way to compose two, I am able to compose as many as I'd like:

```typescript
const octupleThenSquare = compose(double, compose(double, compose(double, square)))
```

This doesn't look great, though. Ideally, I should be able to compose an entire array of functions. In JS (or, for that matter, any dynamically typed language with first-class functions) this is easy:

```javascript
const identity = x => x
const composeMany = (...fns) => fns.reduce(compose, identity)
const octupleThenSquare = composeMany(double, double, double, square)
```

When I get into the realm of statically-typed languages, this becomes more tricky. In the example above, every function takes a number and returns a number. Writing a typed `composeMany` that works within that constraint is not too difficult:

```typescript
const identity = <T>(x: T): T => x
const composeMany = <A>(...fns: Fn<A, A>[]): Fn<A, A> => fns.reduce(compose, identity)

const octupleThenSquare = composeMany(double, double, double, square)
```

However, should I now want to display the number at the end as a string, I have a problem:

```javascript
const show = (a: number) => String(a)
const octupleSquareThenShow = composeMany(double, double, double, square, show)
// Argument of type '(a: number) => string' is not assignable to parameter of type 'Fn<number, number>'.
```

This obviously doesn't type-check, since the `show` function doesn't satisfy the `Fn<A, A>` type - the type is too restrictive. When composing functions, the argument and return type of the function don't have to be the same. The only requirement is that the return type of one function is a subtype of the argument type of the one next in the list.

A function like that kind of `composeMany` is not possible to exhaustively type in TS - or most statically-typed languages, for that matter. The best you can do is to commit atrocities on the type system by listing each arity as its own overload or use a library that [has already done it for you](https://gcanti.github.io/fp-ts/modules/function.ts.html#flow).

For a relatively common use case like function composition, using a library might be fine. But what if you'd like to compose functions a little differently, for example by taking into account that one of them [might return `null`](https://hackage.haskell.org/package/base-4.20.0.1/docs/Data-Maybe.html)?

```javascript
type MaybeFn<A, V> = (a: A) => V | null
const maybeCompose = <A, B, C>(a: MaybeFn<A, B>, b: MaybeFn<B, C>): MaybeFn<A, C> => x => {
	if (x === null) return null
	const intermediate = a(x)
	if (intermediate === null) return null
	return b(intermediate)
}

const factorOf10 = (a: number) => a === 0 ? null : 10 / a

const factorAndDouble = maybeCompose(factorOf10, double)

factorAndDouble(5) // => 4
factorAndDouble(0) // => null
```

If I wanted to type `maybeComposeMany`, I would have to write the entire litany of arities from scratch. What about composing [classes](https://github.com/nestjs/mapped-types/blob/8c83b9262a35c6d42449e8584a57d8aa467a0218/lib/intersection-type.helper.ts#L9-L25)? Or [optics](https://github.com/ramda/types/blob/develop/types/lensPath.d.ts)?

Is there a solution to this? In the statically-typed land, not really. If the function accepts an array, and that array can contain functions with different signatures, and can be dynamically generated (in other words, it is not constant), it's not possible to determine the types of those functions.

It is, however, unlikely, that you'd ever need to use a dynamically generated array of functions to compose - typically these functions are hard-coded. If the types of the functions in the list are known ahead of time, the type checker would have to look at the value type of a function in the list and compare it to the parameter type of the next function.

This is what is already done when calling functions. When we do `compose(double, compose(double, double))`, that is what the compiler is doing. In order for TS to support this kind of usage without being excessively verbose, it'd have to introduce a different type of statically-defined collection or infix operators.

Indeed, a solution to this problem in Haskell (and PureScript) is simply the fact that function composition is an infix operator. So, to write that `octupleSquareThenShow`, instead of using a list, you'd just do this:

```haskell
octupleSquareThenShow = show . square . double . double . double
```

(Note that in Haskell the function composition operator `(.)` is right-to-left because [maths](https://en.wikipedia.org/wiki/Function_composition).)

It is unlikely the TS team will ever decide to do that, though. Perhaps they will find a better solution to the problem than custom infix operators which they've [said they won't implement](https://github.com/Microsoft/TypeScript/issues/2319). JS doesn't need infix operators, because this category of problems doesn't exist in dynamically-typed languages, but in statically-typed ones it does, and it needs a solution.

### Alternatives

A possible solution here, short of adding the custom infix operator feature to TypeScript itself, is to create a language that is a layer on top of TypeScript that could resolve this kind of syntax by metaprogramming. A possible candidate is a curious project called [Civet](https://civet.dev) which seemingly blends ideas from CoffeeScript and TypeScript. While I'm not a huge fan of CoffeeScript, Civet adds a few features that are annoyingly missing from TS and JS, like [infix operators](https://civet.dev/playground?code=dHlwZSBNYXliZUZuPEEsIEI%2BID0gKHg6IEEpID0%2BIEIgfCBudWxsCmNvbnN0IG1heWJlQ29tcG9zZSA9IDxBLCBCLCBDPihmOiBNYXliZUZuPEEsIEI%2BLCBnOiBNYXliZUZuPEIsIEM%2BKSA9PiAoeDogQSk6IEMgfCBudWxsID0%2BIHsKICBjb25zdCBpbnRlcm1lZGlhdGUgPSBmKHgpCiAgaWYgKGludGVybWVkaWF0ZSA9PT0gbnVsbCkgcmV0dXJuIG51bGwKICByZXR1cm4gZyhpbnRlcm1lZGlhdGUpCn0KCm9wZXJhdG9yIG1heWJlQ29tcG9zZQoKY29uc3QgZG91YmxlID0gKHg6IG51bWJlcikgPT4geCAqIDIKY29uc3QgZGl2ID0gKHg6IG51bWJlcikgPT4gaWYgKHggPT09IDgpIHJldHVybiBudWxsIGVsc2UgeC8gIDIKCmRvdWJsZSBtYXliZUNvbXBvc2UgZG91YmxlIG1heWJlQ29tcG9zZSBkaXY%3D), however as of yet it does not allow non-identifier characters in the custom operators, so no reimplementing `|>` or `>=>`.

Unfortunately, Civet also adds quite a lot of CoffeeScript-inspired anti-features (things like `unless` or postfixed `if`) that most JS and TS programmers would, I think, prefer not to have in their codebase. The tooling support for it is also very small, and I don't think I would choose to add it to my own projects.

## One-way inference

TS inference doesn't seem to ever cross function boundaries and as such is only able to infer variable types one way. It can infer return types from arguments by their usage, but the opposite is always inferred implicitly as `any`.

Consider the following code:

```typescript
const concat = (l: string, r: string): string => l.concat(r)
const getFullName = ({ firstName, lastName }: { firstName: string, lastName: string }) => concat(firstName, lastName)

const bob = { firstName: 'Bob', lastName: 'Kowalski', phone: '555-1234-256' }
const bobsName = getFullName(bob)

console.log(bobsName)
```

There is nothing wrong here (aside from the verbosity) and everything type checks nicely. We can see the inference at work here as well: when I hover over `getFullName` I see the return type correctly inferred as `string` and the type of `bobsName` is inferred as `string` as well. If I were to substitute Bob's `firstName` with `undefined`, the type checker correctly complains that the type does not match.

Interestingly, though, if I remove the type from the head of `getFullName`, the inference no longer works. The types of `firstName` and `lastName` both are implicitly `any`.

```typescript
const concat = (l: string, r: string): string => l.concat(r)
const getFullName = ({ firstName, lastName }) => concat(firstName, lastName)
```

If strict mode is off, I can change Bob's name to `undefined` and it still type checks. With strict mode on, this does not compile.

Intuitively however, we can still say with certainty what the types of `firstName` and `lastName` should be: we know that both arguments provided to `concat` _must_ be strings, so obviously the argument to `getFullName` should be an object with at least two properties `firstName` and `lastName` which are strings or subtypes of strings.

### HM type inference

For an intuition how this could be done differently, let us take a look at how this could be done in a language like PureScript. Since I expect the reader to be less familiar with it, I will be more precise in describing what I'm doing.

First, I define `concat` as a function taking two strings as arguments and returning a string. PureScript type signatures are separate from the function body and are defined only in terms of types (unlike in TypeScript, where for some odd reason function type signatures require naming the arguments as well as types). Note that functions in PureScript are [curried](https://en.wikipedia.org/wiki/Currying) by default, hence the surprisingly large number of arrows in the signature:

```haskell
concat :: String -> String -> String
concat a b = a <> b
-- Equivalent to JS: const concat = a => b => a.concat(b)
```

Now I can define `getFullName` without specifying the type signature. I am destructuring a record type in the argument and calling `concat` with two arguments:

```haskell
getFullName { firstName, lastName } = concat firstName lastName
-- Equivalent to JS: const getFullName = ({ firstName, lastName }) => concat(firstName)(lastName)
```

Checking the type of this function yields:

```haskell
forall (t5 :: Row Type). { firstName :: String, lastName :: String | t5 }	-> String
```

You can see that the type has been inferred correctly. The odd type variable `t5` (defined after the `forall` keyword and used later in the record syntax) is a remnant of the Hindley-Milner type inference. Since PureScript does not support subtyping and instead uses a feature called [row polymorphism](https://en.wikipedia.org/wiki/Row_polymorphism) for records, the `t5` represents the remainder of the record (which is kind of like a type variable describing the type of `...rest` in JS).

A more correct type for `getFullName` could perhaps be a function type with a generic argument type that returns a string.

```haskell
type HasNames u = { firstName :: String, lastName :: String | u }
getFullName :: forall u. HasNames u -> String
getFullName { firstName, lastName } = concat firstName lastName
```

### More inference

You'll notice that in both the TypeScript and PureScript examples I defined `concat` to explicitly accept strings. We already know what would happen if we tried to remove the type variables from the TypeScript code, but what would be the type signature of `getFullName` if we provided neither its own signature nor the `concat` one?

In TypeScript's case:

```typescript
const concat = (l, r) => l.concat(r)
const getFullName = ({ firstName, lastName }) => concat(firstName, lastName)
```

Here, the expected types are a bit harder to guess. I know that `l` can be defined as any object with the method `.concat` that takes one required argument. The flexibility of JS comes back to bite me here, though, because it's hard to say what the signature of this method should be and, following from that, what `r` should be.

In the JS standard there are two data types with a `.concat` method on their prototype: arrays and strings. Because of type coercion, basically any type can be concated on both of them. The worst thing that can happen is that you'll get something strange like `[object Object]` appended at the end of your array or string, but in general nothing you concat should result in an error. So it seems like the inferred type of `r` should be, practically speaking: `any`!

This does not seem like desired behaviour, though. On one hand, when concatenating two strings or two arrays, I would expect both sides of the concatenation to be either strings or arrays, respectively. On the other, `'Main Street '.concat(123)` or `[1, 2, 3].concat(4)` does not seem all that outlandish. It seems like type coercion has led me deep into the woods here and inference doesn't make sense - we need user input.

Let's see if PureScript has a better idea. First, I define `concat`, this time without specifying its type signature:

```haskell
concat a b = a <> b
```

The inferred type is:

```haskell
forall (a3 :: Type). Semigroup a3 => a3 -> a3 -> a3
```

Here once again we see an odd type variable `a3`. The type here, though is quite clear: this function accepts both arguments of any type `a3` and also returns `a3` as long as `a3` satisfies the `Semigroup` type class.

A type class in PureScript is something like an interface: it requires that a type satisfies some kind of requirement. In this case, the [Semigroup](https://pursuit.purescript.org/packages/purescript-prelude/3.0.0/docs/Data.Semigroup) type class requires that a type implements a function `append` (aliased to an infix operator `(<>)`) with signature `a -> a -> a` that is associative. (If you know what a [monoid](https://intercaetera.com/posts/monoids-in-practice/) is, a semigroup is kind of like a monoid, except for the identity element. All monoids are also semigroups, but not all semigroups are monoids.)

In other words, it is quite similar to the requirement in TypeScript code that the `l` argument is an object that implements the `.concat` method. However, the semigroup type class is a little more rigid with what it expects, yet still flexible enough not to fall back to a specific type. The PureScript type signature for `concat` says: give me two arguments of the same type that can be appended, and you'll get a value of that type back.

What if I wanted to emulate the previous examples of appending a value of a different type to a string or an array? Well, I would have to be precise about how I want to convert them. Instead of allowing JS type coercion to work, which sometimes produces odd results, I say how to convert these values to string or array. Thankfully, most values can be somehow converted to string (most types implement the [Show](https://pursuit.purescript.org/packages/purescript-prelude/6.0.1/docs/Data.Show) type class used for inspecting values) or array (any value of type `a` can be put into a list: `[a]`).

```haskell
concat "Main Street " (show 123)
-- "Main Street 123"
concat [1, 2, 3] [4]
-- [1, 2, 3, 4]
```

The problem of figuring out how to accomplish two-way inference to work around the JS type coercion simply does not exist because the type system is much more rigid with what it accepts. As a result, perhaps counter-intuitively, it is also able to infer a lot more.

Considering the inferred type of `getFullName` is left as an exercise to the reader (the exact type has been altered slightly for clarity):

```haskell
forall a u. Semigroup a => { firstName :: a, lastName :: a | u } -> a
```

I don't think that TypeScript should become like PureScript. I am sure that defining all JS standard library functions and methods in terms of type classes and without subtypes would be counter-productive, since JS environments are so dynamic. Especially working in object-oriented style, with classes and subclasses, would definitely be quite annoying. And firing a side effect or two from time to time is not a particularly bad thing.

On the other hand, wrangling extremely complicated types often provided by frameworks or libraries (or, better yet, generated, such as in the case of Prisma) is not great and it would be quite helpful not to have to do that. Two-way inference would work wonders here and we've seen some interesting applications of that in the PureScript code above. Another interesting example is ReasonML, which does not have subtyping or type classes, requiring the user to be very explicit about the relationships between data types.

## A hill of complication
Types-as-documentation is a neat idea but it has its limits, especially when you reach over the "hill" of type complication after which it becomes a lot less useful.

At the foot of the hill, there is untyped code. If you use a library without type definitions, you are left with only the documentation the author provided, either in JSDoc or in some kind of external location. You have to memorise the intent and idea behind a function while you use it, and then you have to recall it every time you see it - or check the docs again.

The more you go up the hill, the more useful the types become. You know that function takes a string and a number and returns a string. You know that object has those methods on it, and that class implements these interfaces. You no longer have to keep all of that in mind, the editor will tell you when you hover over the symbol. Eventually you start seeing some type aliases - you see that `UserRepository.findById` takes a string and returns a `User`. You aren't sure what `User` is, but you can use auto-completion or "go to type definition" to find out.

Typically from that point on, the types become less useful. You've reached the top, now you're going downhill. The `UserRepository.find` method takes a `QueryObject` and returns a `Promise<Optional<User>>`.  Now, you go and check what `QueryObject` is and it is a 200-line long litany of very different options. `Optional` is a custom, cryptic collection of `extends` and conditional types and `k in keyof T` and `never`s. The types no longer are much help with remembering what you need to pass to functions.

Eventually you get to types like the following generated Prisma type and you scratch your head as to what exactly the method expects.

```typescript
findMany<T extends UserEntityFindManyArgs>(args?: SelectSubset<T, UserEntityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEntityPayload<ExtArgs>, T, "findMany">>
```

"Eh, I'll just drop in an `any`."

In many cases writing a good and very generic abstraction is the easy part, and figuring out the types for it is significantly more difficult (especially for anything involving composition or recursion). I've encountered cases where developers actively decided to write "worse" (less performant, less generic, less elegant, less abstract) code just because they couldn't figure out the type gymnastics needed to satisfy the statically-typed compiler.

## Edge cases in libraries
When working with libraries, inclusions of edge cases or additional features can have significant [knock-on effects](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)) on the users of the types.

As an example, say you use a library that handles <abbr>HTTP</abbr> headers. The function to get a header has a simple signature:

```typescript
const getHeader = (request: Request, name: string): string | undefined => { /* ... */ }
```

Your library becomes popular, gets buried as a 3rd level dependency in a bunch of different <abbr>HTTP</abbr> frameworks. A lot of people start using it. At some point, a user of your library works on a code-base that uses the `getHeader` function thousands of times in a number of routes, perhaps like this:

```typescript
const authorizeUser = (token?: string): boolean => { /* ... */ }

const authMiddleware = (req, res, next) => {
	const token = getHeader(req, 'Authorization')
	const isAuthorized = authorizeUser(token)
    // ...
} 
```

Now, say you want to add another feature to your library. There is a header called [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) which could [return an array of cookies](https://nodejs.org/api/http.html#http_message_headers). You naively change the signature to:

```typescript
const getHeader = (request: Request, name: string): string | string[] | undefined => { /* ... */ }
```

A small change. In a JS code-base it would register as a breaking change only for the small minority of users who care about `Set-Cookie`. You bump the minor version.

Unfortunately now type-checking breaks for each user of your library who decided to update, because `authMiddleware` no longer gets the type that it expects - it now has to consider the possibility of the `token` being a `string[]`, even if the underlying function path would be unchanged.

In this specific case, because Node by default expects all the header requests to be lower-case, the situation can be resolved with an overload.

```typescript
function getHeader(request: Request, name: 'set-cookie'): string[];
function getHeader(request: Request, name: string): string | undefined;
function getHeader(request: Request, name: string): string | string[] | undefined {
    // ...
}
```

However, if you had previously made the decision to allow mixed-case headers (for example by doing `name.toLowerCase()` somewhere at the beginning of the function body, before calling the Node function), the overload would no longer work since now you would have to consider `Set-Cookie`, typos like `Set-COokie` and random weird combinations like `SeT-CoOkIe` for the type to be sound.

## Promises and bcrypt

_(Note: As of [TypeScript 5.6](https://devblogs.microsoft.com/typescript/announcing-typescript-5-6/#disallowed-nullish-and-truthy-checks1), this should correctly cause an error in the `if` statement, however I've been getting inconsistent results between `tsc` and the web playground, so it might need some more time to be ironed out.)_

This one is _technically_ a user error, however it has once resulted in a dangerous security flaw that would not have happened if it weren't for TypeScript's quite odd priority of reporting issues with types. Given the claims that TypeScript saves you "hours of debugging issues that could have been caught early" (though, frankly, I have yet to come across a type bug that would take so long to debug), this is an example of a bug caused _by_ TypeScript.

Consider the following line from an authorisation middleware:

```typescript
import { compare } from 'bcrypt'

// ...

const isPasswordValid = await compare(req.userId, user.passwordHash)

if (isPasswordValid) {
	console.log("You\'re in.")
}
```

This code is quite obviously wrong, since `compare` should compare a plain-text password and a password hash retrieved from a database. Here, someone passed the `userId` from the request object by accident.

In a JS code-base, this would cause every user to be locked out of the application, and the developer would most likely figure that out during manual testing before committing the code.

In TypeScript, however, assuming the `req.userId` is a different type than `string`, this is the first warning that `tsserver` complains about:

```
'await' has no effect on the type of this expression. (tsserver 80007)
```

The developer absentmindedly removes the `await`, and notices the other issue (this time an error):

```
Argument of type 'number' is not assignable to parameter of type 'string | Buffer'. (tsserver 2345)
```

He changes the incorrect `req.userId` to correct `req.password`.

Unfortunately, now he has introduced a serious bug, since the value of `isPasswordValid` is no longer `boolean` but `Promise<boolean>` which is going to always evaluate to true in the `if` statement, practically disabling password verification. This is not reported by the compiler, and the developer is unlikely to catch it in the manual testing, since he would have to log out and deliberately input a wrong password.

In the real-world scenario, we were saved by good tests, but in the absence of tests, this kind of behaviour is fail-deadly.

## Any is everywhere
Many commonly-used functions return `any` without any kind of warning, even if both `strict` and `noImplicitAny` are enabled. Here are a few examples.

### In standard library
Consider the following code:

```typescript
const getData = () => ([
	[1, 'one'],
	[2, 'two'],
	[3, 'three']
])

const obj = Object.fromEntries(getData())
```

The type of `obj` is `any` without any warning from the compiler. The correct way to use `Object.fromEntries` is to provide a type parameter. Additionally, the result of `getData` needs to be typed more strictly since the type inferred by default is `(string | number)[][]` which is too loose. In this case adding `as const` is sufficient.

```typescript
const getData = () => ([
	[1, 'one'],
	[2, 'two'],
	[3, 'three']
] as const)

const obj = Object.fromEntries<string>(getData())
```

What is odd is that without hovering over the value, you aren't going to get any information that you have introduced an `any` into your code if you didn't know that `Object.fromEntries` returns `any` by default.

### In lodash

Lodash is the de-facto extended standard library for JS, but the types for it give ample opportunity to accidentally include `any` in your code.

Consider:

```typescript
import { flow } from 'lodash'

const user = { name: "Bob", surname: "Kowalski" }

const bigName = flow([
	user => user.name + ' ' + user.surname,
	fullName => fullName.toUpperCase()
])(user)
```

Both `bigName` as well as each intermediate value is inferred as `any`. When using arguments instead of array, the same thing happens. To get inference to work correctly in this example, you have to do this, somewhat unintuitive, move:

```typescript
const bigName = flow(
	() => user,
	user => user.name + ' ' + user.surname,
	fullName => fullName.toUpperCase()
)()
```

Now, each of `user`, `fullName` and `bigName` are inferred correctly - but this is hard to catch without hovering on each value.

There are some other similar utility libraries which are more suited for use with TypeScript, but in most code-bases you will still have to use Lodash.

## The "Library TypeScript" fallacy

There is a commonly-held-view that JS is fine for toys or one man projects, and for building anything "large" or "serious" one should reach for TS. In my experience, this is completely backwards. In my experience for a small project TS is fine, but the larger your project grows, the more annoying TS becomes and the harder it is to justify it.

The problem is generally due to the fact that, as many online TS celebrities recognised, writing library code in TS is, first, [very different](https://x.com/tannerlinsley/status/1699794516813996049) than writing app code in TS and, second, [much harder](https://x.com/AdamRackis/status/1788064190516666826) than some make it seem to be. Writing generic code in TS is very hard because it has OOP-inspired syntax that becomes frustratingly hacky once you have to implement something that is extremely generic (or, you know, not "extremely," even stuff like higher-kinded types [feels very hacky](https://dev.to/effect/encoding-of-hkts-in-typescript-5c3) and slow, and HKTs are just one level of abstraction higher than generic types).

The argument for TypeScript in application code goes like this: if you're writing an app then you don't really need to know all this advanced TypeScript, `in`/`out` generics, dependent types, and so on, because this is all done by the &lt;0.01% of wizards who maintain the frameworks and libraries".

[Not to mention the elitism](https://fosstodon.org/@mcollina/112723450963851116), there are a number of problems with that approach. First of all, you are extremely reliant on one of those wizards to have done his job well to ensure that your application typechecks correctly. You might not even understand those complicated types because in many cases they are [rather hard to parse](https://www.learningtypescript.com/articles/extreme-explorations-of-typescripts-type-system#-this-is-not-normal). You also need to deal with these types when you want to figure out what the library expects (see "A hill of complication" above), because in many cases the types are considered documentation enough, and providing something even as pedestrian as an API reference might not be considered a requirement.

Secondly, on a long-lived project, you will _have_ to become one of these &lt;0.01% wizards because the longer your project goes, the higher the likelihood that some of it will have to resemble library code. In most cases, you will not need to write code that handles higher-kinded types, but when you do, you should wish that it is not overly complicated. And if someone is comfortable enough with "application TS" to write repetitive code and not comfortable enough with "library TS" to write generic code, he will most likely choose to write actually worse code than he would have otherwise written in JS because of a multitude of different factors (sloth, deadlines, &c).

## Debugging dependencies

In general, it is quite trivial to modify JS dependencies locally. It has been a matter of (thankfully uncommon but sometimes still necessary) practice to sprinkle `console.log`s in the code of a library that a project depends on in order to track down a bug or ensure that the library works as expected. Unfortunately, due to the proliferation of build tools (which, I recognise, is not _just_ TypeScript, but in general the notion of transpiling code in order to add polyfills for new EcmaScript features) this has become a lot more difficult. Nowadays, TypeScript libraries rarely ship with their source code when `npm install`ing, but rather just the compiled (and often minified or otherwise compressed) code along with the `.d.ts` declaration files.

This has a few distinct disadvantages for debugging. First, updating something in `node_modules` is more complicated because understanding compiled or minified code can be quite hard. Secondly, it impairs the quite useful feature of "go to definition," since there is no definition to go to. Instead, "go to definition" goes to the type declaration of the function, which more often than not is some kind of cryptic generic, instead of something that can actually be used to determine the expected behaviour.

## Conclusion

The above list is not exhaustive. I did my best to verify each point, but it is possible that I missed something obvious or overlooked a solution. If that is the case, feel free to get in touch and I'll make sure to make corrections wherever it is needed. If you would like to contribute to this list, feel free to get in touch as well.

I specifically did not want to go for the low-hanging fruit of issues with tooling surrouding TS. There are a lot of it there - it's very easy to complain about slow compilation with `tsc` or crazy memory usage of `tsserver`. Every piece of tooling [comes with a cost](https://intercaetera.com/posts/solid-anew).

I hope that this list has been useful for you and you will be able to make a more informed decision about whether to learn and use TypeScript in the future.
