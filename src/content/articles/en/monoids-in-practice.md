---
pubDate: 2023-01-30T18:26:41Z
title: Monoids in Practice
description: One of the more useful algebraic structures.
layout: '../../../layouts/monoids-in-practice.astro'
---

Towards the end of the last post about lenses I mentioned that “lenses form a monoid under composition.” I realise in hindsight that that sentence is pretty vague for a tutorial post, however the concept of a monoid is very useful. It’s good to be able to spot them in the wild, because, much like isomorphisms, they give an intuition for what can be done with a construct that has certain properties.

First of all, what is important to understand is that monoid isn’t a type or a function but an algebraic structure. An algebraic structure in the context of programming is a construct that has three things: a type, a set of operations on that type, and a set of rules that the former two must abide by. This is a pretty general definition, and it isn’t immediately obvious what would be the use of knowing about that in everyday work. However, there are a few well-defined structures for which if we can prove that a type satisfies them, we can get something from them for free, which trains the programmer’s intuition for spotting solutions to more general problems.

In order for a type to be a monoid, there needs to be an *internal binary operation* on that type that’s *associative*, and that the type includes an *identity element*.

An “internal binary operation” is a function that takes two elements of a type (hence *binary*) and returns an element of the same type (hence *internal*). In the [previous post](https://www.intercaetera.com/posts/lenses) we implemented a function `composeTwo` that took two lenses and returned a new lens that was a composition of the two. A simpler example is the addition of integers. In the expression `1 + 2`, `+` is the binary operation taking the two arguments `1` and `2` which are elements of the set of integers. That expression evaluates to `3` which is also an integer.

From primary school arithmetic we know that one of the properties of addition is associativity, which means that no matter how we group the operations, the results will be the same. Both `(1 + 2) + 3` and `1 + (2 + 3)` evaluate to the same number. 

The final element to our definition of a monoid is the inclusion of an identity element. “Identity” in this case simply means “neutral.” Much like the identity function does nothing, the identity element makes the binary operation do nothing when it is given as one of the arguments. In the case of addition of integers, that neutral element is of course `0`.

When we have a type T that implements an associative binary operation Op, we can say that “T forms a monoid under Op.” Integers form a monoid under addition and multiplication, functions form a monoid under composition, and so on.

## An aside about reducers

The most useful conceptual advantage we gain from using and understanding monoids is that we can think about monoidal data structures in a way that’s not much different than arithmetic. The operator for concatenating strings is `+` and in many languages the operator for concatenating lists is `++`, immediately evoking the idea of adding things. Modelling our domain objects as monoids allows us to think about them in a similar way.

However, the biggest practical gain from working with monoids is that they are reducible.

There is (or was a while back) a controversy about the use of `Array.prototype.reduce` which supposedly makes code unreadable and difficult to grasp. There even are [ESLint plugins](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md) forbidding the use of the method. However, banning it altogether in my opinion is throwing the baby out with the bathwater.

Recall that the `.reduce` array method takes two arguments: a reducer in the form of `(accumulator, currentValue) => newAccumulator` and an initial value which gets substituted for the accumulator on the first run of the reducer. There are, as far as I can tell, two valid ways one can define a reducer, and they have got to do with types of the arguments and the return value.

The first way is a reducer with the signature of `(T, U) => T`. Here, the type of the accumulator is different than the type of the array on which it operates. Most of the time, this is because the reducer actually does more than one thing: it performs data conversion alongside reducing the array. Whereas this might be sometimes considered more performant, it is unlikely to be faster than a for-loop if performance is a concern, and it is definitely not going to be more readable than a combination of `.map` and some kind of join, where the two concerns are separated.

The second way is if the reducer is reducing the same type of value, i.e. its type signature is `(T, T) => T`. Here, the accumulator and every value of the array have the arbitrary type `T`. This is actually the definition of an internal binary operation, the same which we need for a monoid. What’s more, the initial accumulator more often than not will be the identity element of the same monoid.

Furthermore, if we are dealing with a particularly large collection of data with a monoidal type that needs reducing, thanks to the associativity of the binary operation the reduction doesn’t need to be sequential. We can split the computation across multiple cores or even machines and we are guaranteed to have the same result as if we did that computation in a single thread as long as we can then put it together in the right order.

## Lenses as monoids

In the post about lenses we didn’t prove that there exists an identity lens that we can compose. However, we can very easily construct such a lens:

```javascript
const identity = {
	view: a => a,
	set: (s, a) => a,
}
```

This lens isn’t very useful on its own. We can compose it with another lens and we will get back a lens that does the same thing:

```javascript
const addressId = composeTwo(address, identity)
const idAddress = composeTwo(identity, address)
// addressId, idAddress and address are the same
```

Now, in the previous post we implemented the generalised `compose` function like this:

```javascript
const compose = (...lenses) => lenses.reduce(composeTwo)
```

This isn’t quite right, because should we run `compose()` without providing any lenses to compose, we will get a runtime error. Instead, we would expect to get the identity lens back. To properly ensure that our implementation of lenses satisfies the properties of a monoid, we should implement compose like this:

```javascript
const compose = (...lenses) => lenses.reduce(composeTwo, identity)
```

It should at this point be evident why monoids are quite useful. Instead of thinking about ways of arbitrarily composing many lenses, we only needed to consider how to compose two and find the monoidal properties. Having found them, it was very simple to generalise the composition of two lenses to the composition of arbitrarily many.

## Appendix

<div class="breakout">
<table>
<thead>
<tr>
<th>Type</th><th>Binary operation</th><th>Identity element</th>
</tr>
</thead>
<tbody>
<tr><td>Number</td><td>`+`</td><td>`0`</td></tr>
<tr><td>Number</td><td>`*`</td><td>`1`</td></tr>
<tr><td>Number</td><td>`Math.max`</td><td>`-Infinity`</td></tr>
<tr><td>Number</td><td>`Math.min`</td><td>`Infinity`</td></tr>
<tr><td>Boolean</td><td>`&&`</td><td>`true`</td></tr>
<tr><td>Boolean</td><td>`||`</td><td>`false`</td></tr>
<tr><td>String</td><td>`String.prototype.concat`</td><td>`''` <span class="note">(empty string)</span></td></tr>
<tr><td>Array</td><td>`Array.prototype.concat`</td><td>`[]`</td></tr>
<tr><td>Function</td><td>`(f, g) => x => g(f(x))` <span class="note">(function composition)</span></td><td>`x => x` <span class="note">(identity function)</span></td></tr>
</tbody>
<caption>A few examples of monoids.</caption>
</table>
</div>
