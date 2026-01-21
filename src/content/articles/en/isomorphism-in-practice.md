---
pubDate: 14 Oct 2022
title: Isomorphism in Practice
description: There are many kinds of equality.
---

Many who begin their journey with functional programming think that simply applying the principles of pure functions and immutability of data yields benefits to code clarity. While this is undoubtedly true, and these properties are indeed requisite for functional programming techniques to work, they are not in themselves the goal.

There are many lessons in purely functional languages that can be applied in the day-to-day of working with, for example, <abbr>JS</abbr>. Most programmers now use `const` exclusively to declare their variables. And while purity of functions is still rarely seen on a large scale, we understand the benefits that it brings, such as predictability, ease of testing and so on. But having immutable data structures and working with pure functions at least in a part of our application allows us to leverage the patterns found in category theory and applied in functional programming that make our code much easier to reason about and work with.

There are many such patterns. Algebraic structures like functors and monads are the first that come to mind. When working with deeply nested data, lenses are likewise very useful. But there is a property underlying all these concepts that is worth noticing and utilising more, and that property is isomorphism.

## Definitions and examples

The formal definition of isomorphism is that two objects are isomorphic if there are functions between them that if composed result in identity. In other words, an object of a type can be transformed into an object of another type and back without losing or gaining any new data.

In <abbr>JS</abbr> for example, an array `['a', 'b', 'c']` is isomorphic to a string `'abc'` because one can be transformed into another. One can use the `.split('')` method on the string to transform it into the array, or the `.join('')` method on the array to transform it into the string. They can also be combined into `.split('').join('')` to get back around to what we started with and prove the isomorphic property.

In more functional languages, such as Haskell, these transformations are [referentially transparent](https://en.wikipedia.org/wiki/Referential_transparency) and so there isn’t any performance cost in moving between them. In <abbr>JS</abbr> this isn’t as simple since the different types have different methods, however the performance overhead in transforming one into another is negligible unless both instances are particularly large.

The example of transforming a string into an array of characters is trivial and perhaps not very practical, but there are isomorphisms which are more widely used.

The focus of the array in <abbr>JS</abbr> is iteration—it’s an ordered collection of objects and the way one mostly uses it is to `.map` over it or `.find` something in it, `.filter` it or even `.reduce` it to a single value. On the other hand, the point of a <abbr>JS</abbr> object is random access: the Object prototype does not implement a `.map` method even though it would be sometimes useful. So is it not possible then to iterate over a <abbr>JS</abbr> object?

Most will quickly discover that there is a method `Object.entries` that converts the object into an array of key-value pairs (which are in themselves arrays) that of course allows the use of all the methods needed: map, find, filter and reduce. The array can then be converted back using `Object.fromEntries`. So objects are isomorphic to arrays of pairs, but there are situations where we might want to use one over the other.

Interestingly this is a first-class concept in Elixir, where we have maps—equivalent to <abbr>JS</abbr> objects—and keyword lists, which are lists of pairs, where the first of the pair is an atom key and the second some kind of value. Keyword lists are widely used to pass options to functions. This actually led to many new to Elixir asking why even have both. Elixir uses the [recursive definition of a list](https://en.wikipedia.org/wiki/Recursive_data_type#Example) (as opposed to <abbr>JS</abbr> where an array is simply a special kind of object), so the “iterative” nature of lists comes into play much more, since inexpensive random access is out of the question. Conversely, though, Elixir also implements the `Enum` module for maps out of the box so rarely is it necessary to convert them to keyword lists or vice versa.

## Usage

Perhaps the most famous mathematical example of applying isomorphism is the underlying principle of analytical geometry which states that points on an infinite, two-dimensional plane with an origin point can be mapped to pairs of real numbers that denote distance from that origin point and back. This was discovered by Descartes in the 17th century and we now know it under the name of “Cartesian coordinates.” It was a revolutionary discovery because by using it systematically it allowed one to translate relatively complicated problems in geometry, involving lines, circles and parabolas, into simpler problems in algebra involving equations of points of coordinates.

This is also possible in programming. If one faces a problem involving a complicated data structure or an unwieldy record, as long as we can find a way to translate it to a simpler form and back, we might be able to find a more elegant and simple solution.

The lofty ideals of consistently pure functions in software are unfortunately hard to attain in every-day, fast-paced agile development. There are deadlines, there are people inexperienced with functional programming, there are external requirements, services and libraries to integrate with. Perhaps the world would be a better place if every application were written in Haskell, but it isn’t, so we have to make do with what we got. This often means relegating the pure functional code to the business domain, where it may make the core of what we build and is then forced to interface with other impure code elsewhere. While the property of isomorphism is not going to make this any less or any more possible, it might make it a little prettier.

Let’s consider a module in an employee schedule application in <abbr>JS</abbr>. We have employees, each of whom has a schedule, and the schedules have events that happen during the employee’s shift. For the sake of example and simplicity, we can say that an event record looks like this. It had been implemented years before we had joined the project and in that time nobody had considered the key names are too long, so it is practically impossible to change them.

```javascript
const event = {
	eventTitle: 'Lunch with Bob'
	startTimeMinutes: 270,
	endTimeMinutes: 330,
}
```

Let’s say that our task is to write a function which detects collisions between two events:

```javascript
const event1 = { eventTitle: 'A', startTimeMinutes: 100, endTimeMinutes: 400 }
const event2 = { eventTitle: 'B', startTimeMinutes: 50, endTimeMinutes: 200 }
const event3 = { eventTitle: 'C', startTimeMinutes: 450, endTimeMinutes: 500 }

const detectCollisions = (event1, event2) => true // @TODO: Implement

expect(detectCollisions(event1, event2)).toBe(true)
expect(detectCollisions(event2, event3)).toBe(false)
```

One way to do this might be to simply use the provided data structure *as-is*. This is going to be a problem because the key names are particularly badly chosen—they are unnecessarily verbose. Also, because they are named properties of an object, they aren’t easy to destructure. Perhaps a better way would be to convert them to an isomorphic structure that is easier to work with.

```javascript
const toTriplet = ({ eventTitle, startTimeMinutes, endTimeMinutes }) =>
	([eventTitle, startTimeMinutes, endTimeMinutes ])
const fromTriplet = ([ eventTitle, startTimeMinutes, endTimeMinutes ]) =>
	({ eventTitle, startTimeMinutes, endTimeMinutes })
```

Now that we have a function that can translate between the event objects and simple array triplets, we can write a function which operates on these triplets alongside a helper which tells us if a number `x` is between two other numbers `a` and `z`.

```javascript
const isBetween = (a, z) => x => x >= a && x <= z
const check = ([_, ...first], [__, ...second]) =>
  first.some(isBetween(...second)) || second.some(isBetween(...first))
```

Implementing the `detectCollisions` function now is trivial, as it simply needs to translate the event object to a triplet and apply the `check` function. In this case we do not even need to translate the triplets back since we expect a boolean.

This approach has a few advantages. Firstly, we do not pollute the function implementation with unnecessary detail because destructuring arrays is concise, otherwise we would have to do something like `{ startTimeMinutes: firstStart, endTimeMinutes: firstEnd }` to change the unwieldy key names to something more usable. Secondly, since we do not care about the names of the events in this function, we can omit them by replacing the names with underscores. This also encapsulates the logic much better, since whoever will read the code should understand that now we operate in the bounded context of event durations. Finally, this implementation is quite extensible. We have a framework within which we can add other functions which deal with event durations, should we need to for instance add new events that match durations, or check if events are adjacent to one another.

It is worth noting that while the event-triplet transformation implemented here is purely isomorphic, if the event object were bigger, we might change the translation layer to a sort of weaker form where we only extract the fields we want and then put them back together. Perhaps if we were only interested in the event titles we might say:

```javascript
const toTitle = ({ eventTitle }) => eventTitle
const fromTitle = event => eventTitle => ({ ...event, eventTitle })
```

This approach requires us to remember which objects translate to what in both layers. In practice this means that if we operate on an array of events, we have to remember to keep both the event array and title array in the same order. It also removes the possibility of creating new events if we only have the event title, unless we also have “defaults” to assign to missing fields. Nevertheless, this technique is still sometimes useful.

## Vice versa

Finding isomorphisms in the wild is not always easy. However, mastering this technique allows for finding more elegant, readable and concise solutions to everyday problems. It is also a valuable stepping stone into more advanced <abbr>FP</abbr> concepts, such as algebraic structures.
