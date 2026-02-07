---
pubDate: 05 Feb 2026
title: The Intuition Interface
description: What does a product engineer even do?
wip: true
---
What does a product engineer even do?

I've recently been asked about what product engineering means _to me_, and while I _knew_ the answer, I had considerable trouble articulating it. The term gets thrown around a lot but it is rarely examined, and if it is examined, it's usually reduced to a number of platitudes like "cares about the result, not the tools," as if software engineers didn't care about the result.

When we talk about the different _technical_ roles of a software project, we typically consider them on a spectrum from high-level to low-level, depending on how close to the user or how close to the machine someone works. At the high-level we might have front-end developers, web designers and <abbr>UX/UI</abbr> designers. A bit further down we might look at back-end developers, database administrators, infrastructure and site reliability engineers, embedded software developers, and so on.

Sometimes these roles are lumped together under a new label, for instance, one who combines the skill set of a back-end and front-end engineer and perhaps some database administration might be called a "full-stack engineer," or one who deals with infrastructure, databases and back-end comes to be defined as a "DevOps engineer."

Likewise, when we consider _non-technical_ roles we also tend to place them on a spectrum of those that are closest to the product to those that are closest to the stakeholders: business analysts, project managers, product owners are some of the labels employed here, and here too roles are frequently merged: one taking on the responsibilities and skills of both a project manager and a product owner might come to be called a "product manager."

The more complicated software becomes, the more roles are created and the more responsibilities are extracted. That said, we very rarely see the two worlds, technical and non-technical, merge, and they are rarely considered as a whole. There is a good reason for it: we tend to think of the non-technical world as the ones who set the goals, and of the technical world as the ones who execute these goals.[+hattip]

[+hattip]: This separation is quite obvious when you consider it from the outside, but it seems like many of us rarely consider what the software development field _looks like_ from the outside. I've been in this field for a while now, and I only realised this while listening to [a podcast about investing](https://www.youtube.com/watch?v=ePPWdUY0aLc).

But in my view, that separation, like [many](/blog/romantic-programming) is entirely artificial. We can lay every role, from the users themselves down to the most heads-down technical engineers on a spectrum from man to machine and within each part of this fractal, there will be those who set goals and those who execute them. The two can even be the same person.

## The filtering problem

One of the more serious downsides of this divide is that goals are input upstream and evaluated by that team first, _before_ they are handed off downstream for implementation.

The way this typically works is that first, the non-technical stakeholders, who have good knowledge and intuition of the needs of the users decide which ones should be prioritised. The goals with sub-par product value are discarded. Then, the technical team is asked to estimate the implementation of the remaining tasks, and finally the team as a whole agree on what to do and in what order.

When goals are evaluated by product merit alone, good options may be discarded before considering the technical cost. When presented with four options, Product picks <abbr>A</abbr>, discarding <abbr>B</abbr>, <abbr>C</abbr>, and <abbr>D</abbr>. But what if goal <abbr>B</abbr> was 90% as good as <abbr>A</abbr> and took 10% of the effort? The option is not considered, because technical effort is evaluated _after_ the search space is already narrowed.

## Go get coffee

Consider the following (real-world) scenario. A user complains that one particular long-running process that she has to engage with on a month-to-month basis is too slow. The product owner prods the user for a bit more information. Here's what the user has to say:

"Well, I need to generate the accounting report on the last day of every month. It takes about two hours to complete before I can download the finished Excel file and I can't do anything else while it's running. That's way too long. I just sit there, refreshing the page, because sometimes it errors out halfway through due to invalid data. I wish it were faster so I could just get it done and move on with my day."

What happens to this feedback upstream?

Well, the product owner does his job: he identifies the user's pain and translates it into a goal. The user said the process is too slow, so the goal is obvious: make it faster. The goal is put into a Jira ticket, the technical team is invited to brainstorm solutions on how to make the report generation faster. They draft a few possible approaches, estimate them, and everyone agrees on the best one. They start working. A month later, the report completes in twelve minutes. Success.

Except—is it really?

Making the report faster is not a bad idea. It's better for things to be [fast and not slow](/blog/solid-anew/#developer-experience). But perceived speed has sharply diminishing returns: anything beyond a few seconds means that the user becomes distracted and wants to go do something else. Two hours and twelve minutes are very different numbers, but from the user's perspective they are the same experience.

The user didn't really complain about the report generating in two hours. She complained about being held hostage for two hours. The pain is the uncertainty, rather than the duration.

If there were an engineer listening in to the conversation with the user, the entire situation might have turned out differently. Perhaps the engineer knows that "generating the report" is processing hundreds of thousands of rows one by one and outputting them to a spreadsheet, bailing out on the first error. It would be a trivial refactor to first sanity check the data, and then do the actual file conversion.

The resulting time might even take slightly _more_ than the original two hours, but a pre-flight check informing the user that the data is correct and she can go get coffee, reasonably assured that the process will be successful, might be the better solution. Indeed, two hours of justified [slacking off](https://xkcd.com/303/) might even make the user _more delighted_ than speeding up the generation to twelve minutes.

But that option was never on the table, because the goal was framed as a speed problem before anyone with technical knowledge entered the room.

## Dual vision

An experienced, purely technical software engineer has good intuition for technical solutions. He builds things that are technically beautiful and elegantly implemented. It's an exceptionally valuable and rare skill. On the other hand, an experienced product owner or manager has good intuition for product judgement in his preferred domain. He knows how to talk to users and understand what they actually need. It's also a valuable and rare skill.

The value proposition of a product engineer is that he ventures into both of these areas at once, becoming competent enough to serve as an interface between these two worlds.

The dual understanding in the case of product engineering also comes from intuition, not magic, innate talent, metrics or meetings. Intuition is compressed experience, and that's why the role requires seniority. There are no junior product engineers. You need to have lived through making decisions and seeing their consequences down the line. You can't [fake having been there](/blog/reliable-signals-of-honest-intent).

