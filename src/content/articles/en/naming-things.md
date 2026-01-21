---
title: Naming Things
pubDate: 11 May 2022
updatedDate: 10 Nov 2025
description: One of the two hardest things in computer science, supposedly.
---

They say that there are two hard things in computer science—cache invalidation and naming things. Naming things (variables, functions, classes, objects) right is an important part of writing clean code. For code to be clean and clear to its future readers, it needs to correspond to reality of what it models to the appropriate extent. In the case of naming things, this means that names should indicate what things are.

Aristotle wrote about the properties of things extensively, and one of the more useful categorisations of properties is the division into *accidental* and *essential* properties of entities in the universe. Essential properties are properties which something must have in order to be classified as that thing. Accidental properties on the other hand are not particular to the thing that we are investigating, and without them it would still retain its identity. Aristotle identified several categories of accidental properties, but the ones most useful for us as programmers are those related to appearance.

A good name is one that aids in understanding the nature of the thing it refers to. Because of this, we should strive to name things after what they are, and not by what they look like.

For example, we might call Socrates an Athenian. An essential property of the class of Athenians is that they are born, reside, or are citizens of Athens. If he, instead, was born in Corinth and resided there his whole life, it would not be right to classify him as an Athenian. Any other property of Socrates, for example his snub nose or bushy beard, is accidental to his being an Athenian.

In the real world finding essential properties of entities around us is quite difficult. For example, what are essential properties of giraffes? One might say: spots and a long neck. A giraffe could be born, due to a rare genetic mutation perhaps, with an extremely short neck and it would still be a giraffe. Likewise I could draw a crude outline of a spotless long-necked animal in pencil and you could guess that it is a drawing of a giraffe. With the knowledge of modern genetics we can peer into the implementation of the universe, so to speak, by sequencing the genes of a giraffe cell and conclude that an essential property of being a giraffe is to be a collection of cells with particular genetic material. The appearance—spots and a long neck—doesn’t have much to do with it.

That is perhaps satisfactory for identifying species, but we might further ask: what is an essential property of being Socrates? That’s quite difficult to define and deconstruct, so for the most part we treat this sort of thing as a black box. There are philosophical attempts at answering this question, but from the programming point of view we might just say that in the source code of the universe there exists a class called `Socrates` which has some number of unknown, encapsulated properties, an interface (albeit a somewhat obnoxious one, especially if you’re an Athenian minding your own business in the marketplace) that is intuitively understood, and a singleton member.

## Lessons in software

Since software engineering is [basically applied philosophy](/blog/faith-before-reason) we can draw lessons from this line of reasoning for our own code. Unlike in the real world, when you’re working on a software application, you typically can inspect the source code underlying an abstraction, either because you have written yourself or because it is a part of an open-source library. However, since the cognitive capacity of any single human brain’s short term memory cache is very limited, we want to use names to index complex things.

Memorising names without context is difficult, though. It is sometimes necessary for the most fundamental building blocks of our understanding—primitives—or when working in abstract or otherwise unfamiliar domains. In general, however, you almost always want to structure your abstractions in a way that reflects the real world, because most are familiar with it, and thus you have a larger chance of making your abstractions understandable.

In practical terms this means using names which correspond to the business domain of the product you are developing. A part of the job of a software engineer is also to name and structure the parts of the business which have until now been understood only implicitly or glossed over. To do that we have to identify essential properties of the parts of our system in order to name them correctly.

## Case study

Let’s say we have an application for automating marketing pipelines. We have some user groups as inputs, events which happen to the users and reports which collect our data. We call our UX designer and she comes up with the following mockup:

![Marketing mockup upright](/assets/marketing-mockup-upright.svg)

How would you name the components and actions in this UI? With just a cursory understanding of the business domain you might attempt to name them by what you see. So the rectangular components might be called *cards*. They will be grouped in *rows* and perhaps *subrows*, and connected by *arrows*. By right-clicking the UI, the user will be able to add cards *horizontally* to an existing row or *vertically* to create a new row.

This sounds like a useful way to name things initially, and you might communicate with the rest of your team using these abstractions: of cards and rows, of adding cards horizontally or vertically, connecting them with arrows and so on.

The team spends two weeks developing the page, and after that time the UX designer comes back armed with feedback from the users and slightly updates the mockup:

![Marketing mockup sideways](/assets/marketing-mockup-sideways.svg)

Horror strikes you. You now realise that while the change would be trivial to implement visually, and the business logic has not changed at all, almost every single name which you have used so far no longer makes sense. What is the error?

The error was in naming things after what they look and not what they are. Perhaps *cards* is not a bad name for the rectangles on the diagram, but neither arrows nor rows exist any more. You learn from a domain expert that the arrows represent *splits* (as in *split testing*) that evenly divide the flow of the campaign. In the updated diagram the campaign progresses from the left to right in *phases*. Instead of adding cards horizontally or vertically, the user simply *creates a card* or *creates a phase*.

The fact that the parts of our campaign are in cards, that they are laid out in rows or columns and are connected with arrows or lines is completely accidental to what they represent. By naming our components and actions after their essential properties, we can make our code clearer and more resilient to changes, ensuring that the names only change if there is a radical shift in the nature of our abstractions and not in their accidental properties.
