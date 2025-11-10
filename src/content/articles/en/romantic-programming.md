---
pubDate: 31 Aug 2020
updatedDate: 10 Nov 2025
title: Romantic Programming
description: The dichotomy of people's approach to technology.
---
If you've ever attended a history class where I'm from you will recognise this familiar diagram.

<img src="/assets/sinusoid.svg" alt="Krzyżanowski sinusoid" class="invert" />

This is known as the "Krzyżanowski sinusoid", named after [Julian Krzyżanowski](https://en.wikipedia.org/wiki/Julian_Krzy%C5%BCanowski). The idea behind it is that it shows a progression of historical periods, as seen through the lens of their approach to reason. The epochs above the line are closer to Earth, materialistic, rational and progressive. By contrast, the periods below are more ephemeral, associated with religion, emotions and decadence. It is meant to show how human thought on a civilisational scale is based on contrast, in arts, literature and philosophy.

Unfortunately, how clear and orderly as this sounds, the sinusoid is mostly nonsense and is a classical example of cherry-picking facts to fit a narrative.

Be that as it may, unlike many things taught to children in schools in this country, it is not completely nonsensical. There is an underlying kernel of truth in the divide between rational and irrational. However, the terms are needlessly loaded. In a society permeated by rampant scientism we have come to, unfortunately, associate the irrational with something negative, and rational with something positive. These terms ought to be redefined.

## Buying a car

We can find a potential solution to this issue is in Chapter 6 of *Zen and the Art of Motorcycle Maintenance*. It's one of the central ideas of Pirsig's philosophy and also one of the first ones to be presented. It's a contrast between what he calls "classical" and "romantic" approaches to human understanding.

> A classical understanding sees the world primarily as underlying form itself. A romantic understanding sees it primarily in term of immediate appearance.

This dichotomy seems to cut through almost all of human experience, but is most evident and most prevalent when interacting with technology. What is it that you look for in a car that you buy? Some might say that they want a good fuel economy, cheap used parts, low mileage. Others will just go for the car they saw in a movie or a video game when they look to get their first car.

I am in that second group. The first real car I had was a [Mitsubishi Eclipse](https://en.wikipedia.org/wiki/Mitsubishi_Eclipse#Third_generation_(D52A/D53A;_1999)), and I got it only because it looked cool and it seemed fast even though it really was not. When I was looking through the internet for listings, I didn't really care about the technical details — I cared whether the car featured in one of the _Need for Speed_ games I had played as a child.

And, oh my, did it feel *good* to drive that Eclipse. It's a few years later now and the car is different hands and I switched to an old [Volvo](https://en.wikipedia.org/wiki/Volvo_S80#First_generation_(1998%E2%80%932006)) — one of the old Volvos that has the reputation of never breaking down. I love how the Volvo *works*, it's quiet and comfortable, the parts are cheap, it's cheap to drive... But it does not look like the Eclipse and, more importantly, it does not *feel* like the Eclipse. It's... boring.

This is the real divide between the classical and romantic mind. The classical is interested with how things *work* while the romantic is interested with how things *feel*. This leads to a certain attitude towards technology, too.

The classically minded person is a technophile. He wants to understand the machine, the technical details of how it functions and how all the parts fit together and how to fix it when something breaks. The classical thought gave us logic, mathematics, rationalism and the scientific method. It's built upon a hierarchy of facts, which themselves are based upon a similar hierarchy, all the way down, until the fundamental axioms of the universe.

On the other hand, the romantically minded person is naturally a technophobe. One of Clarke's laws states that any sufficiently advanced technology is indistinguishable from magic, and for a romantic understanding that technology is robbing it of its magic, undermining its beauty. What is perceived as strengths by the classically-minded is a weakness for the romantics.

## Romantic programmers

Given how tied to technology programming is, one might think that the romantic mindset is entirely incompatible with this vocation. However, it seems to me that with the proliferation of high-abstraction languages and their virtual machines which are agnostic to the kind of hardware they are running on, and even more so with the advent of large language models used for writing code, programming has become much more divorced from technology. It is not art per se, but understood high-level it is definitely not a science either. The software craftsmanship manifesto seems to only confirm this.

It is definitely a difficult field for romantics, though. With the number of classical programmers, romantics are expected to thoroughly embrace classical values, while the inverse is rarely true. We expect that — a classical piece of software is expected to be bulletproof and *work* without issue, without bugs and without hitches.

With sadness though, I find that amongst my colleagues the value of the software *feeling* good to use — and develop! — is very often completely secondary. We place far less emphasis on making software that feels good.

This is not an either/or, by the way. Of course, if you were given a choice to have a piece of software that works but is a dread to use, or a piece of software that is delightful but doesn't work — that's no choice at all! Both are worth nothing. However, given a piece of software that works really well but is unpleasant to use, one might find more value in focusing on the feel rather than perfecting the work. And achieving the appropriate balance between the two in given circumstances is where the quality truly lies.

And what's important is that we should not seek quality merely in how the software is used but how the software is developed — we want to have a resilient, tested and modular codebase that works well, because it is also pleasant to develop in. And we seem to also understand that having too rigid checks is also no good — we notice that if changing one line of production code requires updating a dozen test suites then something has gone wrong.

Ultimately, though, I reckon that it is important that we keep this dichotomy in mind when deciding team composition. One's particular affinity should not be an excuse to write bad software, whether it would be software that works poorly or is unpleasant to use, but rather used to perfect existing projects to bring them to the highest levels of quality.
