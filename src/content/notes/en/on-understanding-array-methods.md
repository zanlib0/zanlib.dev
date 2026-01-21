---
pubDate: 2023-09-07T21:08:04.892Z
title: On Understanding Array Methods
---
It seems like the general consensus among JS programmers is that for processing collections of data higher order functions are king. No longer does one have to wade through many nested `for` loops in order to process an array, mutating it along the way, accessing individual elements with cryptically named `i`s and `j`s and spending an hour trying to figure out what exactly happens inside a three-nested loop code block.

For most situations using array methods, such as `.map`, `.filter`, `.sort` and `.reduce`, is much easier. Not only to write, but also to convey the intent of what is meant in a more concise and understandable way. While it may take one a while to process a `for` loop which only doubles all the numbers in an array, with the use of `.map` it can simply be written as `array.map(x => x * 2*)`.

However, when faced with slightly more complex problems, it might not be immediately apparent what array method would be most appropriate for a given task. While one learns rather quickly that "`.map` takes an array, and returns an array with each element of the original array ran through the iteratee." That's quite a mouthful, and keeping all of that in mind when thinking about a solution to a problem is not that easy, especially since at first one tends to recoil and jump back to the more familiar imperative mode of thinking with loops and indices.

What in my opinion is most instructive is to think about each array method in terms of the lengths of the input and output arrays and how they change depending on which method is used. That way one first thinks about _what_ is to be done to the collection and then _how_ it is to be done.

## Fixed-length methods

The first category of array methods are those which do not change the length of the input array—`.map` and `.sort`.

```javascript
const numbers = [1, 2, 3]
const doubledNumbers = numbers.map(x => x * 2) // [2, 4, 6]
```

Mapping an array to something else is certainly one of the most common ways to process collections. In React, it is used to map data from the application state into elements of the UI. Using `.map` allows for dividing the problem of processing an array into two distinct steps. First, we recognise that each element must be processed individually. Then, we specify how to do it, having to think only about one element at a time.

```javascript
const users = [
	{ name: 'Anna', surname: 'Komnene' },
	{ name: 'Michael', surname: 'Psellos' },
	// ...
]
```

Let's say you want to join the names of the users into a single string. Well—how would you join the names of one user?

```javascript
const joinName = user => `${user.name} ${user.surname}`
```

The only thing that's left is applying the function to each element of the `users` array via `.map`:

```javascript
const usernames = users.map(joinName)
```

When reading code, `.map` gives us some guarantees. We do not have to delve into the iteratee to be guaranteed that the elements are not in a different order, or that the length of the output array is different than the input. The only thing that has changed are the values of the elements of the input array.

`.sort` is similarly straightforward, and here, too, we can say with certainty that the length of the array has not been changed. In this case we also know that the values are the same and the only thing that's been impacted is the order. The only larger trouble with `.sort` is having to remember the ternary state of the comparator function. Remembering that using `(a, b) => a - b` will result in numbers being sorted in an ascending order is usually enough to get to a solution.

```javascript
const numbers = [3, 1, 2]
const sortedNumbers = numbers.sort((a, b) => a - b) // [1, 2, 3]
```
## Aggregation methods

Next are the aggregation methods, which each produce a value from an ever narrower set of possibilities. `.filter` results in an array of equal or shorter length, `.find` (and its siblings, `.findLast`, `.findIndex` and `.findLastIndex`) comes up with just one item of the array, while `.some` and `.every` return a mere boolean value.

```javascript
const numbers = [1, 2, 3, 4, 5, 6]

const isEven = n => n % 2 === 0
const evenNumbers = numbers.filter(isEven) // [2, 4, 6]
const two = numbers.find(isEven) // 2
const hasEven = numbers.some(isEven) // true
const allEven = numbers.every(isEven) // false
```

Consider here that, especially with `.filter`, there also are certain guarantees—the output array will not have its individual values modified or their order changed, the only thing that can happen is that some will be missing.

## Dynamic-length methods

Finally, we have two most powerful methods which are not constrained by the size of the array. With `.flatMap` we might end up with more or less items, however we are guaranteed to end up with an array. This is not the case with `.reduce`, which collapses the entire collection to a single value (which, well, can also be an array that's even longer).

`.flatMap` especially is quite daunting at first glance—why exactly would we need to have it? The way it's often explained doesn't make sense either—it maps and then flattens, but why is that so important that we need to have a separate function for it in the JS spec?

The usefulness of `.flatMap` is that it gets around the limitation of `.map` being allowed to map one input element to exactly one output element. `.flatMap` can transform a single input element into zero, one, or more output elements. That way we can, for example, implement a filter in terms of `.flatMap`.

```javascript
const numbers = [1, 2, 3, 4, 5, 6]
const evenNumbers = numbers.flatMap(n => isEven(n) ? [n] : []) // [2, 4, 6]
```

What might be even more useful is that using `.flatMap` we can filter and map at the same time. An example—a validator that transforms a list of values into a list of errors.

```javascript
const numbers = [1, 2, 3, 4, 5, 6]
const errors = numbers.flatMap(n => !isEven(n)
	? [`${n} is not even.`]
	: []
)
// ['1 is not even', '3 is not even', '5 is not even']
```

In general, `.flatMap` will commonly work for problems to which one's first intuition is to reach for a mutable array, `.push` some items and then return it at the end.

The last array method, and the most powerful one, is also one whose use is often most discouraged. `.reduce` allows for collapsing an entire array to a single value. The value can be anything—a primitive value, or even something more robust like an array or an object. What's interesting is that we can reimplement pretty much every single other array method in terms of `.reduce`.

The way reduce works is that you supply it with a "reducer" function `(accumulator, value) => newAccumulator` which is repeatedly applied to the elements of the array, much like `.map`, however it also carries with it an accumulator argument. In many other languages a similar function is called `fold` which also illustrates its purpose.

```javascript
const numbers = [1, 2, 3]
const add = (a, b) => a + b
const sum = numbers.reduce(add, 0)
```

I said [before](monoids-in-practice), though it is worthy of a repeat, that in my view there are two main ways one can use `.reduce`. The reducer can take two values of the same type—in which case it exploits the monoidal nature of arrays, as above—or two values of different types, in which case it might be better to rewrite it first with a `.map`. An example of this can be a function converting an array to a map.

```javascript
const users = [
	{ id: 'abc', name: 'Anna', surname: 'Komnene' },
	{ id: 'def', name: 'Michael', surname: 'Psellos' },
	// ...
]

const usersMap = users.reduce(
	(map, { id, ...user }) => map.set(id, user),
	new Map()
) // Map{'abc' => {...}, 'def' => {...}, ...}
```

However, one can just as well do this in two steps:

```javascript
const usersEntries = users.map(({ id, ...user }) => [id, user])
const usersMap = new Map(usersEntries)
```

It is tempting to use the power of `.reduce` to write `for` loop-like constructs, but that's rarely a good idea.

## What next?

This way of thinking about array methods is actually a good way to learn about algebraic structures as well. After all, many of the array methods exploit the fact that arrays in JS implement certain algebraic structures. `.map` is an implementation of a functor's `fmap`, `.flatMap` is an implementation of a monad's `bind` and `.reduce` is an implementation of a monoid's `concat`. But even without knowing about the category theory behind arrays, it is useful to think about the array methods just in terms of the number of elements that they affect.
