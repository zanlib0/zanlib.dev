---
title: Solid Anew
pubDate: 2024-06-13T20:22:40.557Z
description: Are the principles still relevant?
---

The <abbr>SOLID</abbr> principles are a set of five rules that have been formulated over 20 years ago. Their purpose is to make the code that one writes "better." Their application has been spearheaded by the [_Clean Code_](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) book by Uncle Bob, and thanks to the overwhelming success of that book, many self-professed _clean coders_ began to apply them in their day to day work.

However, is it true that they actually increase the quality of one's code? What does "quality" even mean in this sense? In many resources talking about the <abbr>SOLID</abbr> principles, it seems like the reasoning was circular—applying <abbr>SOLID</abbr> principles makes one's code better, and one's code is better because it conforms to the principles. And are these principles even relevant in web development, or if we employ a non-object-oriented style?

The point of "clean code" is that our code should be more adaptable. One is unable to predict the complexity of a system before one starts working on it, so one should avoid practices which require buy-in that locks us out from certain decisions later down the line. To be agile, one needs to be able to develop new features quickly, without costly refactors. In other words: keep options open.

My problem with <abbr>SOLID</abbr> is that in my experience these principles aren't particularly useful as coding guidelines. The only time I've ever seen them mentioned is post-hoc, as a tool to analyse something that has already been developed, or as a tool to deploy during a code review to nitpick a particular solution.

The rules aren't very well defined, and often require additional, sometimes arbitrary metrics to judge how well a given rule was applied. For example, Single Responsibility Principle [originally](https://web.archive.org/web/20150202200348/http://www.objectmentor.com/resources/articles/srp.pdf) said that "classes should have one reason to change," but "reason" is not well-defined and the concept of "class" as understood in Java doesn't exist outside a certain kind of object-oriented languages.

These principles are also quite hard to understand for new developers. "Dependency inversion" is a notoriously hairy subject and it's not easy to explain to novices (why "inversion," what are we inverting?), even though the concept, once grasped, is quite simple. It's somewhat similar to explaining what a monad is to novice functional programmers.

Also, it isn't clear how well <abbr>SOLID</abbr> principles can be applied to current paradigms. Back then, an enormous market share in enterprise belonged to Java or C++—_Clean Code_ uses Java for its code examples—and <abbr>OOP</abbr> was the paradigm that worked for many applications, from server-side systems, through [user interfaces](https://en.wikipedia.org/wiki/Swing_(Java)), to [games](https://en.wikipedia.org/wiki/Minecraft). Since then, technologies like React came along and the paradigm shifted dramatically. So, can React developers even benefit from <abbr>SOLID</abbr>?

For the past couple of years I've had the fortune to work on a web application project with a very stable team of about ten developers. We've had very few staff changes overall and we went for about 2 years without any developers leaving or joining. Thanks to that, we managed to work on some habits, and we saw what kind of processes lead to code that was understandable and easy to extend, and what processes lead to something, that later had to be refactored or fixed at great cost.

That is what I want to share today, and I felt like <abbr>SOLID</abbr> principles are a great vehicle for examining how we can improve the long-standing industry practices that are still often an integral part of our jobs (and job interviews) these days.

## Single Responsibility Principle

There are a few common formulations of <abbr>SRP</abbr>, however I feel like most people when asked what it means would say that it means that "a class should be responsible for one thing." However, classes are not always there, or a class means something different in Haskell than in Java. So perhaps it should be said that a function or a module should be responsible for one thing.

But then, what does it mean "to be responsible for something?" Well, the way that it's been explained is that another way to think about it is about reasons for change—a class (or a function, or a module) should have at most one reason to change. But then a question arises, what does "reason" mean?

So the final, "canonical" formulation of <abbr>SRP</abbr> is this:

> A module should be responsible to one, and only one, actor.

Disregarding for a moment the unfortunate terminological collision resulting from the choice of the word "actor" (which becomes confusing when the language of your choice is Erlang or anything else which employs the actor model—that's not the kind of actor we are talking about there), it now becomes completely impossible to apply this kind of principle _before_ we code. After all, any module _starts_  by being responsible to only one actor, because that actor is the reason why the module exists in the first place. Only after a while, once one consciously examines an existing code-base, one can see where this has been violated. But oftentimes, by that time, it's already too late.

What is the point of <abbr>SRP</abbr>? What does want to achieve by employing it?

Everyone wants his code to be adaptable, and here, the means of achieving adaptability is by modularising the code. If one follows <abbr>SRP</abbr>, at least in theory, he should have a whole lot of small modules in his code, which he can reuse and rewire at will, and making changes in one module shouldn't particularly impact other modules.

Applying this principle matters a lot when programming in an object-oriented style, because in my experience objects and classes tend to puff up a lot. Since classes get to access the shared state of their own objects, there is always a temptation to add another property, or another method to the class, because adding it elsewhere typically entails more work.

To the contrary, functions, and especially pure functions, are far easier to keep small because they are not tied to any kind of data until the time of application. In functional code, there is practically no cost to move functions between modules, it's typically just simple copy and paste operation. In object-oriented code, this is rarely that simple, since class methods tend to access shared state. Pulling apart classes is just a lot more burdensome compared to moving functions between modules.

Hence, my first reformulation of a <abbr>SOLID</abbr> principle as applied to <abbr>SRP</abbr> would be:

> Verbs over nouns.

What it means is that whenever I am faced with a problem that is to be solved by means of code, thinking about it in terms of verbs is going to lead to better results than thinking about it in terms of nouns.

### Functional modelling

This is essentially the idea of functional domain modelling, that is modelling your problem in terms of pure functions and immutable types. The functions can become impure at the time of implementation (after all, <abbr>IO</abbr> has to be done somehow), but when I first think how to approach a problem, I do not even consider side effects, rather I am concerned with the flow of data through the application.

Practically what this also means is that I try keep the number of types small—pretty much everything gets to be expressed as an object/record or an array of objects. The number of functions changing these objects then becomes comparatively large.

This approach works great in web applications and software systems, which is what I'm most concerned with. These kinds of applications tend to change a lot and as such require a great deal of adaptability. There are domains where functional modelling is not that great. For example in game-dev, when there is a game world and game entities that interact with that world, I would imagine the object-oriented model works much better, hence we haven't seen many games written in Haskell.

The problem with applying object-oriented modelling to software systems is that the first intuition is almost always inheritance. Indeed, inheritance is so intuitive that the people whose problem I am trying to solve, if they've had any exposure to programming theory, would often try to "help" by modelling the domain for me by means of inheritance.

### Inheritance pitfalls

What follows is a simple example of why inheritance fails.

Suppose you have a base class `A` with properties `A(a, b)`. The first time you create this class, you know that you will have two further classes that each add a property, `c` and `d` respectively. They can be expressed with inheritance: `B<:A(c)` and `C<:A(d)`.

Suppose now you get a requirement that requires you to create a new class `D(b, c, d)`. Without multiple inheritance this is not possible, and even if you are allowed multiple inheritance, you still have to rewrite the entire thing.

I ran into a similar problem while using a popular validation library [`class-validator`](https://github.com/typestack/class-validator) with Nest.js. I had a base class with some basic properties like name and description. Specific objects inherited from that class and added their own properties. But then I had to create an object which had no description. That's when I switched to using [`zod`](https://github.com/colinhacks/zod).

### Business happens in verbs

Even though developers are quite fond of creating system objects like services, repositories, models and components, it's worth remembering that actual business value is created by means of verbs. Users _use_ the application to _do_ something. <abbr>UX</abbr> designers think about user flows, which are patterns of actions (verbs, in other words) that achieve a specific result.

Developers can think like that as well, and model the domain to code in the same way. This is the idea behind [event storming](https://en.wikipedia.org/wiki/Event_storming). However, in an object-oriented language, one has to further map these events to system objects. Working functionally, and putting verbs over nouns, makes that unnecessary.

## Open-Closed Principle

The Open-Closed Principle (<abbr>OCP</abbr>) is canonically defined as:

> The elements of a system should be open for extension and closed for modification.

This means, in somewhat simplified terms, that if you have a module that you maintain, and it is used by other modules maintained by others, you should be able to add additional features to your module without requiring modifications to the depending modules. Of course that still applies even if you maintain all the modules.

<abbr>OCP</abbr> is a great idea, but no code is ever perfectly compliant with it. You _always_ have to modify code because that's the nature of software development. Ideally, you should have a hierarchy of stability—the more dependents a module has, the less it should change (it's fine to extend it though). It's kind of like [Kelvin versioning](https://jtobin.io/kelvin-versioning) in a way, but slightly less strict.

The problem is that, once again, you are able to judge whether a module abides by the <abbr>OCP</abbr> only in hindsight. If you have a module which has yet to be a dependency of anything, _every_ change is an extension and _no_ change is a modification. But when you write a module, you don't yet know which part of it will have to be the frozen "modification" part and which will be the flexible "extension" part. You don't yet know what "shape" your module will have to take to fit with the rest of the system jigsaw.

### How bad things happen

I remember from my professional career a kind of <abbr>UI</abbr> pattern that has been come up with by a designer quite early in the development life-cycle. It was a kind of global view for all entities in the system, which were all laid out in a series of tables one under the other. There was a single table component, within which was a `switch`, with cases for each entity type. Each of these tables also had a few buttons, which would open a modal, and the modal also had a `switch` with cases for each entity type, based on which button was clicked. There was also another button at the very top, which opened a drop-down menu, and it had an event handler with, you guessed it, a `switch` for every entity type.

In hindsight I become upset every time I have to open one of these components because _obviously_ it violates <abbr>OCP</abbr> and is a nightmare to maintain. But the team who wrote it weren't a haphazardly hired band of novices -- asking about <abbr>SOLID</abbr> was a standard part of the interview process, so it is certain that everyone knew about the principles. We just didn't see how to apply them when we wrote the code.

Because when you code, you don't think about extensions and modifications in the heat of the moment. You face a fork in the road and need to make a decision. And when you don't have a heuristic for what will be _better_, you will most likely choose what will be _easier_ (or [so you think](https://twitter.com/pinboard/status/761656824202276864)).

So a heuristic which works well for this example and which has worked well for me is:

> Vertical over horizontal.

The problem with the global entity view <abbr>UI</abbr> which I described was that it had been shallow. Each of the components was spread very thin, with a lot of cases and `if`s and `switch`es, but it lost sight of the bigger picture and when it came to adding more features it was daunting -- if we wanted to add more entities to the system, we would have to add them to every `switch`, and if we wanted to add another component or operation, we would have to include another lengthy `switch` in that component.

### Architecture in domain terms
This pattern is well known in <abbr>UI</abbr> design—the nested context menu ["flyouts"](https://i.sstatic.net/W6xga.png) are exactly that. The user starts off with something simple and goes on to do something more specific.

What does a path of a <abbr>HTTP</abbr> request to a server typically look like? It is quite vertical: starting off at the edge, a router of some kind perhaps, then is validated, goes through a service, is used to generate a database query, and then that query is executed. Then it goes out: the data is mapped and formatted in some way, maybe logged, and presented to the <abbr>UI</abbr>.

A common way to structure a backend project is by horizontal layer. There would be a `routes/` directory, `validators/`, `services/` and so on, each for a layer of a system. This is great if you want to perceive the system as a whole, to see each architecture layer. This is sometimes suggested by engineering managers who do not work directly with the code—from their point of view it makes sense. However, that is the only thing that kind of folder structure is good for, because you rarely think of the system layer-by-layer.

Instead, you will typically work on a specific case. There is an error when user tries to change his email. Trying to fetch all widgets is awfully slow. You want the users to be able to transmogrify their gizmos.

With a horizontal structure, you have to go into each isolated layer, find the correct part responsible for the event in question, investigate it, and either correct it or go to the next layer and repeat. It might become even more confusing when one of the layers is not used. In the rare case of a request which does not require validation, the developer might be tempted to add a "dummy" validator, just in the case that when someone comes looking, he will have something to find.

But what if we had this?

```javascript
const transmogrifyGizmosMiddleware = async (req, res, next) => {
	const gizmo = req.body
	const parsedGizmo = await gizmoSchema.parse(gizmo)
	const query = createTransmogrifyGizmoQuery(parsedGizmo)
	const newGizmo = await db.gizmos.create(query)
	const response = formatResponse(newGizmo)
	return res.send(response)
}
```

Isn't this a little nicer? Each of the steps is independently testable, the dependencies can be injected without issue, every function for a given business event can be in one file, and, most importantly, one can tell what the whole business process is at a glance.

That's because domain processes are typically vertical, and trying to map them onto a layered architecture is another mental step. This does not mean that you should avoid layers altogether, but rather, since domain events tend to cross multiple layers, the layers should be subordinate to the events.

## Liskov Substitution Principle

The standard formulation of <abbr>LSP</abbr> is somewhat difficult to follow, so instead I'll use the [Uncle Bob definition](https://web.archive.org/web/20151128004108/http://www.objectmentor.com/resources/articles/lsp.pdf):

> Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.

I have no qualms with this in object-oriented languages—now, 35 years since it's original formulation it's become almost universal to expect that an object of a class and an object of a super-class can share an interface.

However, what if you don't have derived classes? If you consciously avoid inheritance, there should be very few derived classes. The language still must support them, but it becomes a liability.

What if you do not have classes at all? If you write in a functional style, a type system which supports subtyping might be detrimental. With few exceptions, most statically-typed functional languages do not support subtyping (Haskell, Idris), or they are supported only in very narrow contexts (in OCaml it's limited only to object types).

### Subtyping

Subtypes cause problems on the level of language design. Consider the following TypeScript code:

```typescript
const double = x => x * 2
```

This is not fully correct: the type of `x` hasn't been specified, and <abbr>TS</abbr> isn't smart enough to know what it is, because while the `*` operator is defined for numbers, `x` could be anything that includes the `Number` type. Hence, the <abbr>TS</abbr> compiler will complain:

> Parameter `x` implicitly has an `any` type.

Compare this to the following ReasonML code:

```javascript
let double = x => x * 2
```

In ReasonML, the `*` function is defined as operating only on integers. Hence, there is no possibility for `x` to be anything other than `int`. So, the Reason type system infers the type of `double` as `int => int`. Should the function be used anywhere else and receive an invalid type (such as string or float), an error would be emitted at that place.

In Reason this kind of inference is possible because the language is based on OCaml and explicitly does not support subtypes. Thanks to this, it is actually possible to write Reason code with barely any type annotations and still be fully type-safe.

The obvious downside to a system without subtypes is: what if I want to multiply floats?

In practice, integers and floats are distinct data types, with different internal representation. But generally, any operation that can work for integers should work for floats. One expects to be able to pass `1.5` and `2.45` to the `*` function and receive a value. In conceptual terms, integers are a subset of floats. But this kind of relationship is informal. In C++, you can use the `*` operator on both `int`s and `float`s and nothing indicates that the two types are in any way related.

```cpp
int a = 2, b = 4;
float c = 1.5, d = 2.45;

std::cout << a * b << std::endl;
std::cout << c * d << std::endl;
```

Reason has a different operator for multiplying floats: `*.`. So you could write a function `doubleFloat` which looks like this:

```javascript
let doubleFloat = x => x *. 2.0
let double = x => x * 2
```

Now there are two functions to multiply numbers which look almost identical. This seems incorrect. I could instead implement the `double` function in terms of `doubleFloat` and, should the mechanics of the universe update at some point and I wanted to change how multiplication works, I must only do it in one place.

```javascript
let double = x => x -> float_of_int -> doubleFloat -> Js.Math.floor
```

(`->` means right function composition, and the strange formatting of the `x_of_y` functions, which convert between types, is [an artifact of Reason's OCaml heritage](https://github.com/reasonml/reason/issues/1689).)

What I achieved with this is that I now make the relationship between the `int` and `float` types completely explicit. It is clearly defined how to transform values between types: simply map between them. The `int => float` map is trivial, and the reverse is the floor function.

### Module boundaries

Consider a system in which you have the core module of our application logic, and another, in which you only handle specific business logic related to the schedules of our users. The main module defines the user type:

```typescript
type ScheduleItem = {
	task: string,
	start: number,
	end: number,
}

type Schedule = ScheduleItem[]

type User = {
	name: string,
	email: string,
	schedule: Schedule,
}
```

The core module communicates with the schedule management module, which is only concerned with the schedules of the users. Let's say that it implements specific business logic requirements, such as adding new tasks, ensuring that the tasks don't overlap, that there aren't any spaces in the user's schedule, etc.

It would be easiest to send off the entire user to the schedule module, but since it is only concerned with the user schedule, you could instead use a mapping that extracts the user schedule before it uses a function from the module, and then puts back the new schedule on that user. In this case you could use a [lens](/blog/lenses).

```typescript
const scheduleLens = createLens('schedule')
const addNewItemToUserSchedule = (user: User, item: ScheduleItem): User =>
	over(scheduleLens, user, schedule => addItemToSchedule(schedule, item))
```

The broader point is that by defining those mappings between the user and his schedule, you can clearly establish a boundary between the two modules and describe the relationship between them. If you simply allowed the `User` type in the schedule management module, or used the wonders of duck typing to allow any entity with a `schedule` field, this relationship would be obscured. And in the future, should the relationship change in some way, you have one place where it can be updated (in the example above, you need to only update the `scheduleLens`).

We have also, by accident, stumbled into the fourth <abbr>SOLID</abbr> principle.

## Interface Segregation Principle

The interface segregation principle simply states that

> Functions should only receive what they need.

In a type system which allows subtyping, it is very tempting to pass down large objects down the system components tree. Objects such as `config`, `user` or `request` tend to be passed around indiscriminately, even to modules or functions which only care about small parts of these objects.

It's even worse when the types of those objects are controlled by external forces, such as libraries or other teams. In those cases, whenever there is an update (oftentimes even a "patch"), if you are not careful you might end up having to change hundreds of files just to update a dependency.

If this data is mapped to smaller types, which contain only what is needed for specific functions, those kinds of breaking changes are not scary at all.

Hence the third heuristic:

> Mapping over subtyping.

## Dependency Inversion Principle

The broad point of the dependency inversion principle is that classes should not be responsible for their own dependencies. The dependencies should either be pulled from some kind of context (this is the service locator pattern or the inversion-of-control container) or passed as parameters to the constructor (constructor-based injection).

A long time ago, just as I was getting into programming professionally, I joined a few of my colleagues in writing a Node.js framework whose unique selling point would be that it provides an IoC container to all the request handlers so that each handler can get its dependencies from the container. The container can serve different instances of the dependency based on different parameters, for example whether the system is running in a real environment or in a test. That was supposed to be "clean" and "<abbr>SOLID</abbr>." I recall then that I thought in my mind "hey, that just sounds like global variables with extra steps," and it seems that I wasn't all that far off the mark.

In effect, what this kind of IoC container causes, is a state where no one knows which modules are actually being used where. We didn't know which parts of our applications were vulnerable, and we were afraid of touching some bits of the code because it could blow up 80% of the application. It was tested, to be sure, but running the entire test suite was 20 minutes of waiting around, so a lot of the changes were made with trembling hands and great ceremony.

Developing applications with that framework wasn't much more pleasant than in [Express](https://expressjs.com) or [Feathers](https://feathersjs.com), so we ended up scrapping the whole thing. The service locator is now widely considered an anti-pattern and it seems like this entire idea isn't all that great as it was once thought to be.

And broadly from this comes my fourth heuristic:

> Arguments over contexts.

### Constructors and functions
A somewhat more common pattern these days is constructor-based dependency injection, where the necessary object dependencies are passed through the constructor. The object is instantiated only after all the dependencies have been provided. It's a widely used pattern in object-oriented languages and frameworks such as Spring and Nest.js.

There is one thing that I find uncomfortable about this pattern. It's code like this:

```typescript
constructor(private prisma: PrismaService) {}
```

Aesthetically, looking at this, I feel uneasy. I can't quite put my finger on it. There is something eerie about a function receiving parameters and doing nothing with them. Of course, it isn't doing nothing: this is just syntactic sugar for assigning instance properties straight in the constructor. This code is, in effect, equivalent to:

```typescript
private prisma: PrismaService

constructor(prisma: PrismaService) {
	this.prisma = prisma
}
```

It did throw me for a loop when I first saw it, though. I just thought that someone had forgotten to write the body of the constructor. Now, even though I know what it does, I still don't like it.

In any case, it does make you wonder how to apply this pattern when one is not using classes. If classes are not used, well, a constructor is just a function that does something. So one might call it parameter-based dependency injection. Which is how you use functions, generally: by calling them with arguments.

### Purity injection
In functional programming, a pure function is a function exhibiting the following two properties:

- The values returned are the same for the same parameters. A pure function called with parameter `x` will always return value `y`, without regard for system state, user input or the phase of the moon.
- The function does not cause any side effects to happen.

From these two properties, a corollary: pure functions are useless in themselves, because I/O is a side effect. One cannot write a useful program with pure functions alone, because that program would not do anything. There needs to be some kind of way to interact with internally pure systems.

Purity is a useful trait of functional systems, because it ensures that the system is predictable. It is especially useful in writing unit tests, because as long as you know that the module under test is pure, you can write test cases that are guaranteed to pass when correct and fail when incorrect.

One way to deal with purity is the Haskell way, whose type system enforces it throughout the entire system. However, for some reason, that way hasn't really caught on.

Another way is to treat side effects as dependencies that need to be injected. In most cases, that's what dependencies in object-oriented systems often are: they are responsible for side effects. The side effects might be wrapped in neat services, but at the end of the day, the reason why one injects these dependencies is because they log something, or interact with the database, or ping some other external service.

This way, you can write our code "as normal" at first. Let's say we have a function that saves a gizmo to the database:

```javascript
import { prismaClient } from './prisma'
export const saveGizmoToDb = async gizmo => {
	const createdGizmo = await prismaClient.gizmo.create(gizmo)
	return createdGizmo
}
```

This function is impure: it uses Prisma to make a call to the database. Without rather laborious and error-prone mocking, you can't test this without having to spin up an entire Postgres instance. However, there is a way to make this function pure. You can pass the `prismaClient` as an argument:

```javascript
import { prismaClient } from './prisma'
export const saveGizmoToDb = async (gizmo, prisma = prismaClient) => {
	const createdGizmo = await prisma.gizmo.create(gizmo)
	return createdGizmo
}
```

In ordinary circumstances this function isn't pure either. The second parameter is set by default to `prismaClient` which makes a call to the database. But that second parameter is variable, and because it's variable we can change it and _inject purity_ whenever necessary. In unit tests the purity can be injected by providing a mocked client which satisfies the same interface, and elsewhere in the system, should we want to use a different database engine, another can be provided.

This method is called (perhaps unsurprisingly) [purity injection](https://katafrakt.me/2022/10/19/purity-injection-elixir/) and is a practical application of the [strategy pattern](https://en.wikipedia.org/wiki/Strategy_pattern) to solve the problem of dependencies in a language that has first-class functions. In a way it's an inversion of the dependency injection pattern. With <abbr>DI</abbr>, the function doesn't work without its dependencies. With <abbr>PI</abbr>, the function works without specially defined dependencies, but its behaviour can be altered.

## Developer Experience

So far I explored each of the <abbr>SOLID</abbr> principles, and I have derived four heuristics from it. However, every set of principles worth its salt needs to have a round number, like five. So, there is one final aspect that is often overlooked, probably because it is somewhat meta.

When you work on implementing software systems, you use a large number of tools. From the code editor, through various libraries and tool-chains for compilation and execution of programs, to version control, project management, note-taking, messaging, the array of tools at our disposal is endless. Many are also advertised in a flashy way, as magical silver bullets that will definitely solve all of your problems.

It's fine to use tools that are not good, but one should avoid like the plague tools that are _bad_.

### Flow
There is a concept in psychology called [flow](https://en.wikipedia.org/wiki/Flow_(psychology)) which is a state of extreme concentration and focus on the problem at hand. When you are in the flow state, you feel like you have superpowers. If you're writing and you catch the flow, it feels like the words just type themselves. You always want to maximise the time spent in the flow state, when you are most productive, when you feel like you can do anything. There are a number of methods that people have come up with to enter the flow state, such as the [pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique), but what is perhaps more important is to avoid things which knock you out of it.

One of these things is waiting.

In video game design there is an idea of a _quit moment_. A quit moment is a point in the game where you lose immersion and you have the opportunity to re-evaluate whether you want to continue playing. A quit moment in a video game might happen when you finish a quest line and are unsure what to do next, or if you are stuck and have trouble solving a puzzle, or if you reach a failure state and aren't motivated to try again.

An analogous example in programming is when it's necessary to wait for something—code compilation, running test suite, long network request, etc. It is far too easy to lose focus and do something else. First it's checking emails or Slack, but eventually you end up scrolling through social media or doing something else while the process is running. Before it is done, you cannot continue your work. But oftentimes, you don't get back to it right when it finishes. You still slack off for a little bit more, and even after you return, the focus is gone.

There are various levels of this, but broadly speaking the acceptable length of waiting is inversely proportional to how often one needs to wait. If I have to run a five minute <abbr>CI/CD</abbr> pipeline once a day, that's fine—an hour would be too much. If I have to wait five minutes to see the small change I have just made in the code, that's no good, but maybe five seconds wouldn't be the end of the world. If I have to wait five seconds for a character that I type to appear in my code editor, that's just awful—anything above 200ms is unacceptable.

Years ago I wrote about [dripping faucets](/blog/dripping-faucet), a story from _Zen and the Art of Motorcycle Maintenance_, which are invisible frustrations that are hard to identify individually but indirectly impact the quality of our work and our mood. Bad tools, and especially tools that force us to wait, are such dripping faucets. Not only do you waste time, but you also generate frustration and write worse code. Not to mention, that you often tell yourself that you need more tools to solve your waiting problems, when in reality the problem itself is the number of tools already in circulation.

Hence, the fifth and final heuristic:

> Fast over slow.

When in doubt: <abbr>[KISS](https://en.wikipedia.org/wiki/KISS_principle)</abbr>.

## _Sic et non_

So this is what I leave you with:

- Verbs over nouns.
- Vertical over horizontal.
- Mapping over subtyping.
- Arguments over contexts.
- Fast over slow.

Unlike <abbr>SOLID</abbr>, these aren't principles. They are not to be followed in every case and in every instance. They are heuristics: shortcuts to apply when working on a problem. When I am faced with a task that I don't immediately know the solution to, I will reach for them in moments of doubt. Just as when the path splits, and there doesn't seem to be a reason to go either left or right, I always go left; so here, if there is no reason to use the thing on the right, I will use the thing on the left.

I hope it's something that you find useful, or perhaps instructive, as well.
