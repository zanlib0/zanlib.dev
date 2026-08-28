---
pubDate: 2026-07-24
title: A Voice From Nowhere
description: The remnants of human understanding in generated content.
---
The Holy See has had a website since 1995, but the day Pope Leo XIV's [first encyclical](https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html) went up was the first time I saw it being linked to from outside the niche Catholic circles. The link to the encyclical made rounds on X, LinkedIn, Hacker News, and Reddit, and it was the first ever ".va" link published to [lobste.rs](https://lobste.rs/s/eedsds/encyclical_letter_his_holiness_leo_xiv#c_kpc3hw). I was surprised to see it was upvoted. People seemed to have _actually_ read it. And they seemed to argue about it in good faith.

I suspect that if you had told a room of engineers fifteen years ago, a time when Dawkins was still a frequent sight on airport shelves, that one day they'd be reading a Catholic encyclical and mostly nodding along, you'd have been at best met with polite disbelief.

Papal encyclicals, over the centuries, became documents that garner interest not just internally, from Catholic theologians and clergy. They became serious works of moral philosophy read and discussed outside the Catholic or even Christian circles. As such, besides being a source of magisterial teaching for Catholics, they have to stand on their own merits as addressed to "all people of good will."[+mh2] The first time I saw this with my own eyes was with the publication of Pope Francis's _Laudato Si'_. While the subject of that one was not of particular interest to me, it sparked widespread action and over time diffused into many initiatives. Outside of the many strictly Catholic institutions it permeated, it was quoted during <abbr>UN</abbr> panels on ecology and cited in serious climate change papers[+ls] published in multidisciplinary journals.

[+mh2]: Pope Leo XIV. _Magnifica humanitas_. Libreria Editrice Vaticana 2026; § 2

[+ls]: McCallum, M. L. [_Perspective: Global country-by-country response of public interest in the environment to the papal encyclical,_ Laudato Si'](https://www.sciencedirect.com/science/article/abs/pii/S0006320718315477). Biological Conservation 2019; pp. 209–225

The election of Pope Leo was a deeply personal event for me. I was born during the pontificate of John Paul II, whose legacy still endures in Polish culture to this day. At the time of the election of Benedict XVI, I was still a child; at the time of his retirement I was a disinterested teenager. Francis died on Easter Monday, and I learned about it that day while listening to the radio on my way to church. Two weeks later the entire family looked at the live feed from the <abbr>EWTN</abbr> covering the conclave, chuckling at the [seagulls](https://www.fox13seattle.com/news/sistine-seagull-pope-conclave). And then we had a new Pope.

Leo is the first pontiff that I will most likely follow consciously for the entirety of his rule, and at the time of his election I promised myself I will make a wholehearted attempt at reading what he writes. The fact that _Magnifica humanitas_ concerns a subject that I work with day-to-day, and am actually interested in, is just an excellent concurrence.

I thought about writing a complete commentary on the encyclical, but about midway through I figured that it might not actually be that good an idea—the document is so expansive and touches on so many subjects that it's impossible to comment on everything coherently while keeping to the perspective proper to my own trade. There are, however, individual threads running through it that are very relevant to the field of programming and the everyday work of software engineers, which are worth exploring. While my work is not in the field of <abbr>AI</abbr>, I use these tools every day extensively, and there is one property of them that the Pope identified, which most of our field seems content to ignore.

## A voice that belongs to no one

The encyclical hands us one of its many theses early:

> "In practice, however, technology is never neutral, because it takes on the characteristics of those who devise, finance, regulate and use it."[+mh9]

[+mh9]: _Magnifica humanitas_, § 9

That a tool takes on the character of its makers is nothing new, but the people who build these machines have a very particular one. They are the heirs and priests of Western rationalism, of the [subject-object split](/blog/on-lila/#on-the-subject-object-split), of classical dualism, which is so ingrained that it no longer registers as a position at all. It is the conviction that if a man works hard enough to divorce himself from his prejudices, his moods, his circumstances, his biases, what's left when the subtraction is finished is the world seen plain, true, factual, and _objective_.

A mindset so ubiquitous that there is no getting away from it.

> "\[This] kind of rationality has been used since antiquity to remove oneself from the tedium and depression of one's immediate surroundings. What makes it hard to see is that where once it was used to get away from it all, the escape has been so successful that now it is the 'it all' that the romantics are trying to escape."[+zmm]

[+zmm]: Pirsig, R. _Zen and the Art of Motorcycle Maintenance_. Vintage 2004; pp. 65–66

"The apparent objectivity of the responses," the Pope writes, "can lead us to overlook the fact that they reflect the cultural assumptions of those who designed and trained them."[+mh100] The pretense of standing nowhere in particular is not the absence of a bias, but a bias of its own, one that the builders hold, hidden well enough that they have hidden it from themselves. There is only one [point of view](https://en.wikipedia.org/wiki/Logos_(Christianity)) that has any claim to be objective, and is not accessible directly to any of us.

[+mh100]: _Magnifica humanitas_, § 100

However, the confident voice of the language model is not the sound of having arrived there. It is hollower still, because when a human sets out on a road towards objectivity, we can see the attempt under the surface of what is written. In the case of machine-generated prose and code, there is no such striving underneath. 

## The path underneath

> "These systems merely imitate certain functions of human intelligence. In doing so, they often surpass human intelligence in speed and computational capacity, offering tangible benefits across many fields. Yet this power remains entirely tied to data processing. (...) They may imitate language, behavior and analytical skills, or even simulate empathy and understanding, but they do not understand what they produce, for they lack the affective, relational and spiritual perspective through which human beings grow in wisdom."[+mh99]

[+mh99]: _Magnifica humanitas_, § 99

Pirsig spends a good part of Chapter 6 of _Zen and the Art of Motorcycle Maintenance_ taking a motorcycle apart in a few different ways.[+zmm2] The divisions he draws are not welded into the machine. There is no single correct way to carve a motorcycle into parts; a person chooses where to cut, and he chooses according to what he already understands, what he has seen fail before, what he happens to care about. A rider might be concerned with the split according to the function, a mechanic might be concerned with the split according to its constituent assembly, a parts vendor might studiously follow the factory-prescribed parts numbering scheme to make a split of his own. The manual that ships with the machine hides all of this, written as it is in the impersonal spectator's voice, as though no one stood behind it—though of course someone did. Motorcycles were not found lying in a field. People made them run, and the making left a trail.

[+zmm2]: <abbr>*Z&AMM*</abbr>, pp. 66–68

That trail is what I mean when I say that human work has a path underneath it, there is a structure of thought that underpins everything we make. When you write by hand, something prompted you to write it a certain way; that path is inherent to you, your perspective on the problem, your prior experience, your particular circumstances. You sort the grains of sand[+zmm3] a certain way.

[+zmm3]: <abbr>*Z&AMM*</abbr>, p. 72

The machine has no such path—or rather, and this is the whole of the trouble, it pretends to one it does not have. <abbr>AI</abbr> parrots that structure, but because it "reasons" in a completely different way, it is unable to produce it on its own. The form is reproduced without the comprehension that generated it. It is a great pretender—again, that is what it is meant to be, to a degree—and so when you read <abbr>AI</abbr>-generated content, be it prose or code, there is often a certain uneasiness. The content might be correct in every meaningful sense, it _looks_ right, but at the same time it seems completely devoid of any underlying structure. Humans naturally think, reason, experience, and talk [using analogy](/blog/on-surfaces-and-essences/); above a certain minimal threshold of quality, it is clear that there is some kind of structure behind the writing, and that structure is what the machine cannot lay down.

The path is not wholly absent. When you generate code or prose, some knowledge has to be put into that generation, and that input—that is, the agent prompt, in most cases—is an artefact that has a path underneath it like any other piece of human creative work. What is hard is that when reviewing <abbr>AI</abbr>-generated code or reading <abbr>AI</abbr>-generated prose, you're getting the output rather than the input, and the further the two are divorced—the wider the gap between the last point of human judgement and the finished artefact—the harder it becomes to make out what that path was, or if indeed there was one in the first place.

When you read, you're looking, by reflex, for the structure underneath—why here and not there, what was seen and set aside, where the author was uncertain about his assumptions. When you cannot tell whether you are looking at the work of a careful writer, or a stochastic parrot, you cannot tell whether the structure is there to be found, or how much human intellect has been put into it. This is why reading anything you've already clocked as <abbr>AI</abbr> is so exhausting. You are guessing, and looking for something that you don't know is even there to be found.

## Foreclosed on the way in

If the tool erases the path in the work, it also, more slowly, erases the path in the worker.

> "The speed and ease with which answers or summaries can be obtained risk extinguishing the desire to ask questions (…) As Plato wrote, the deepest and most important things are learned only after much time and effort (…) 'striking upon' ideas (…) like flint until the spark of understanding is kindled."[+mh140]

[+mh140]: _Magnifica humanitas_, § 140

When you have a specific engineering issue that needs fixing, ordinarily you would consult the manual, or the documentation, or some other relevant literature, and try to find the solution there. While doing this, you would often stumble on additional, unrelated information that you would file away, half-consciously, ready to be used when the need arose. Searching with Google removed some of that serendipity, directing you to the one section that dealt with your problem—but you still landed on the page, and might still glance at something interesting on the way past.

A Google result is, at least, a whole document: it answers your question and also does three or four other things around the edges. An answer from a chatbot is trimmed to exactly the query, with no margins and no digressions. When your only interface to the codebase is the chat window, you don't see what's around the diffs. You foreclose on the lateral exploration by getting precisely what you asked for and nothing adjacent to it.

And when you no longer know what your code is doing and where the boundaries of your system are, you lose the ability to maintain the system. If the entire team maintaining the project disconnects from what actually gets deployed in production, that's lights out.[+wsff]

[+wsff]: Horthy, D. [_Why Software Factories Fail_](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md)

## The signature and what it hides

> "This is where accountability becomes crucial: the possibility of identifying who must 'account' for decisions, justify them, monitor them, and, when necessary, challenge them and remedy any harm caused."[+mh105]

[+mh105]: _Magnifica humanitas_, § 105

When I worked on a project for a large professional-services client, we had conventions to ensure that every line of code could be traced back to a person ultimately responsible for it: lines lived in commits labelled with Jira tickets, the tickets carried sign-offs from the subject matter expert who had made sure the requirements and the business logic were correct, and they lived inside larger epics signed-off on by a manager. When something failed badly enough, everyone in that chain got on a call and worked on a fix. Some of my colleagues thought this unhealthy, and said we ought to have [blameless postmortems](https://www.atlassian.com/incident-management/postmortem/blameless).

We have them these days: "oh, Claude wrote it like that. You have it too, just prompt it for a fix."

There is, I have noticed, a great deal of effort now spent divorcing oneself from the machine's output. Some of the people I work with do not want to acknowledge that a particular commit was written by <abbr>AI</abbr>, because to acknowledge it is to invite the question of whether they understood the problem at all. So they sign the commit with their own names, omit the `Co-Authored-By`, and leave it to the reader to decide whether he is looking at the work of a competent programmer or a language model. And it is impolite to suggest that a colleague's work is <abbr>AI</abbr>-generated, since the suggestion implies he did not think. So the question is never asked. The whole thing dissolves, and we lose track of the level at which understanding last existed, before the work was handed off to the machine—or whether it was ever there in the first place.

This is precisely the possibility that the encyclical asks us to keep alive, "the possibility of identifying who must account for decisions." The encyclical, discussing war, insists that "it is not permissible to entrust lethal or otherwise irreversible decisions to artificial systems."[+mh198] The principle is not confined to the battlefield. All systems should have a chain of accountability that ultimately terminates in a person, even if just for reasons of respect and common courtesy, and the trouble with the voice from nowhere is that it lets the chain terminate in nothing while looking, for everyone else, as though it terminates in you.

[+mh198]: _Magnifica humanitas_, § 198

The voice from nowhere is seductive for exactly the reason it is dangerous: it comes from nowhere, so there is no one to credit, no one to blame, and no one of whom to ask "how do you know that?" Technology, the Pope says, takes on the character of those who make it. What should trouble us is not the character it takes on, but how readily we have learned to build in a voice that admits to no maker at all.
