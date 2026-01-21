---
pubDate: 20 Jan 2023
title: Lenses for Immutable Data
description: A short discussion on the most basic of optics.
---
Last time we talked about isomorphisms and I mentioned at the end of the [post](/blog/isomorphism-in-practice) that there is a kind of “weaker” isomorphism that lets us update immutable nested objects via a pair of functions—one that retrieves a part, and one that updates a part in an existing object.

This kind of structure turns out to have a name—lens—and there is actually a lot more to it than meets the eye. It’s a part of a bigger family of concepts called optics, which provide ways to access and manipulate parts of different kinds of modular data. They originate in [Haskell](https://hackage.haskell.org/package/lens), however they’ve been making their way into other languages as well.

Lenses are definitely the most common and useful type of optic especially in <abbr>JS</abbr>, where updating immutable data is verbose and not particularly clean. There have been attempts to make it less so, via libraries like Immutable or Immer, however lenses are something that is much easier to explain, there is a lot less magic involved and you can actually write your own lens implementation is just a few lines of code.

## Product types

Briefly, a lens is a composable getter and setter for product types. Let’s work backwards through this definition. A product (or intersection) type is a data type that combines multiple types into one. For example, a tuple of `[2, 'two']` is a product type combining a number and a string. The most common product type in <abbr>JS</abbr> is an object, and it will be the focus of the rest of this article.

Consider the following object:

```javascript
const user = {
	name: 'John Doe',
	age: 29,
	address: {
		street: 'New Street',
		city: 'Birmingham',
	},
}
```

`user` is a value of a product type of a string, a number, and another object which itself is a product type of two strings. We typically ignore the key types since the object type itself is isomorphic to a tuple containing those values, so ultimately the keys don’t really matter.

To access the value of the city key isn’t difficult:

```javascript
const userCity = user.address.city // == 'Birmingham'
```

The only issue that could potentially arise from this method of accessing properties is that the `.` operator can throw an error if the value on the left of it is not an object. This has been a serious concern for a long time in <abbr>JS</abbr> that required meticulous null-checking, until we got the “[wtf operator](https://youtu.be/R2idkNdKqpQ)” in `?.`.

Updating the user’s city in an immutable way—that is, returning a new object with the field updated—is a lot more difficult. We can’t just assign a new value to the `user.address.city` since that would mutate the object. Instead we have to resort to spreading the remaining values on every intermediate level, which is not only error-prone and verbose, but also very tightly couples the logic of retrieving nested fields with the data itself.

```javascript
const userInLondon = {
	...user,
	address: {
		...user.address,
		city: 'London',
	},
}
```

## Getters and setters

Getters and setters are pairs of functions that retrieve a value and update it. By convention, they are called `view` and `set`. Alternatively, you might find it helpful to think in terms of “unwrapping” and “wrapping” values. (Viewing is like “unwrapping” a smaller value from a larger context, setting is like “wrapping” a smaller value into a larger context.)

`view` is a function that takes a value of a product type and returns the focused value. A `view` function for the `name` field of our user (or indeed any product type containing a value under that key) would look like:

```javascript
const view = user => user.name
```

`set` is a function that takes a whole value, a new focused value, and returns a new whole value. Again, for the `name` field it would be:

```javascript
const set = (user, newName) => ({ ...user, name: newName })
```

Now, this pair of functions is only good for the `name` field. It would make sense to create a factory which would let us use them for any field.

```javascript
const createLens = field => ({
	view: whole => whole[field],
	set: (whole, part) => ({ ...whole, [field]: part }),
})
```

Now that we have packaged a lens into an object with its two functions, we can make utility functions that do more with the lens. We can create “standalone” `view` and `set` functions that take a lens and apply its functions. We’ll also create a function that applies a given function to the focused value. Conventionally this kind of function is called `over`.

```javascript
const view = (lens, whole) => lens.view(whole)
const set = (lens, whole, part) => lens.set(whole, part)
const over = (lens, whole, fn) => set(lens, whole, fn(view(lens, whole)))

const upcase = str => str.toUpperCase()
over(createLens('name'), user, upcase) // == { name: "JOHN DOE", ... }
```

## Composition

Since a lens is actually just a pair of functions, it turns out that we can compose them as well. This is what makes lenses so neat and powerful. To view the `address.city` field:

```javascript
const address = createLens('address')
const city = createLens('city')

view(city, view(address, user)) // == 'Birmingham'
```

And likewise to set it:

```javascript
set(address, user, set(city, view(address, user), 'London'))
// { address: { city: 'London', ... }, ... }
```

This isn’t much less verbose than the previous example with object spreading, however we can generalise it into a utility function. It looks pretty ugly, but thankfully we only need to write it once.

```javascript
const composeTwo = (outer, inner) => ({
	view: whole => view(inner, view(outer, whole)),
	set: (whole, part) => set(outer, whole, set(inner, view(outer, whole), part)),
})
```

Lenses form a monoid under composition, so now that we have a way to compose two of them, we have a way to compose arbitrarily many:

```javascript
const compose = (...lenses) => lenses.reduce(composeTwo)
```

And so now:

```javascript
const addressCity = compose(createLens('address'), createLens('city'))
view(addressCity, user) // == 'Birmingham'
set(addressCity, user, 'London') // { address: { city: 'London', ... }, ... }
```

## Beyond objects

It’s worth noting that the `createLens` factory that we wrote up earlier is only good for objects and their keys (hence you will most often find it actually called [`lensProp`](https://ramdajs.com/docs/#lensProp)). We can create lenses for other product types. For instance, let’s create a lens that returns the first element of an array. We will assume that the element always exists, though in a real application it would be best to ensure that by some other means.

```javascript
const first = {
	view: ([f]) => f,
	set: ([_, ...rest], f) => ([f, ...rest])
}

view(first, [1, 2, 3]) // == 1
```

Since `first` is a lens like any other, we can compose it with other lenses.

```javascript
const user = {
	name: 'John Doe',
	age: 29,
	address: [
		{ street: 'New Street', city: 'Birmingham' },
		{ street: 'Abbey Road', city: 'London' },
	]
}

const addressFirstCity = compose(address, first, city)
view(addressFirstCity, user) // == 'Birmingham'
```

Before wrapping up, a curveball. Let’s take a look at a less useful but nonetheless interesting application of lenses. We can think of integers as a product type of a sign and a natural number. And if it’s a product type, we can try to write a lens for it.

```javascript
const sign = {
	view: n => n >= 0
	set: (n, sign) => sign ? Math.abs(n) : -Math.abs(n)
}

view(sign, 1) // == true
view(sign, -3) // == false
set(sign, 3, true) // == 3
set(sign, -5, true) // == 5
set(sign, 4, false) // == -4
```

## Beyond lenses

Lenses are just one of the many different kinds of [optics](https://mpickering.github.io/papers/profunctor-options.pdf), that is, methods allowing for modular data access. Other types of optics include prisms (which are analogous to lenses, but for sum or union types rather than product types) or traversals (which allow multiple foci). There are multiple methods of expressing optics and there are many libraries in various languages implementing them.

For me, optics are among the most rewarding tools in functional programming. They solve a pervasive problem of manipulating values inside data structures in an immutable way and they do so without boilerplate. There is a [certain beauty](/blog/romantic-programming) to them that I appreciate and they manage to be very useful to boot.
