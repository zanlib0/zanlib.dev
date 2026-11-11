---
pubDate: 2026-11-11
title: On Decision Provenance
---

Now that so much coding is being automated, and programmers' focus is moved elsewhere, it seems like individual product and technical decisions are the next bottleneck. Knowing and preserving _why_ a specific decision, even a very local one, was made, is very important. It was important even before <abbr>AI</abbr>, but the speed at which new features are being rolled out puts a lot more pressure on tracking what was decided consciously and what was accidental. Moreover, we cannot rely on the fact that every single aspect of developed code was consciously decided these days, because it might have randomly come out from the agent that didn't consider all aspects of it, and didn't have all product context.

Sometimes rationales are invented or imagined, but by tracking provenance we can reliably say where a decision comes from. If it comes from an agent, it can be assumed that it was made randomly, or simply on the basis of <abbr>AI</abbr> training and general knowledge. If it came from a specific person, it might give us a way to dig deeper into the reasoning by asking that person. Sometimes it might come from a specific business case.

Say you're working on some auth module and you see in the code that session expiry time is set to 9h.

Suppose we don't track the provenance of this decision and we get a change request from our security team that according to their professional opinion it should actually be 5 hours, because that's the industry standard for this specific use-case. We make the change and go about our day.

What might happen next is that we get upset emails from a big corporate client of ours that makes half of our revenue complaining that their employees are being logged out in the middle of the day _again_, after they'd complained some time ago. What happened before was that the expiry time had been set to 5 hours, but the big corporate client emailed us that their employees are being logged off during their workday and possibly losing important work they were in the middle of simply because of the session expiring, and they asked us if we can do something about it. Someone on our team suggested that we bump the expiry time to 9h because that's still secure enough but it doesn't annoy the employees because they only need to log in once at the beginning of their work day.

If we had tracked the provenance of that decision, we could have immediately got back to the security team and [explained](/blog/strongest-force#the-four-causes) that the choice of 9h is supported by a specific business case, and it's on them to weigh a business case against a professional opinion.

Oftentimes, breaking the user's experience, though, is disastrous and we want to avoid it at all costs.

Provenance is about who decided, because agents' "frame of reference" is ephemeral. It's the context that comes up and goes away. Humans in turn have much longer memories and time horizons, they have to ultimately maintain the resulting code. A human can be held responsible for a decision, an agent can't.

I was reminded of the practices we employed in most projects at a consultancy I used to work at, which was preserving a decision log of all relevant decisions made on the project, so that when someone came across something that would have been somewhat questionable, there was a list of pros and cons that detailed why a certain decision was made so that it didn't need to be revisited again from scratch.

The practice also wasn't extremely well implemented across the board, to be fair. It was a different time, and a decision log was not the only place where we held this kind of stuff, because we also held a lot of the product decisions in Jira, and each line of code could have been traced to a Jira ticket. And in that case, there was no <abbr>AI</abbr> to pin the blame on—when someone made a decision it was always a human that we usually could ask and probe further. Sometimes we couldn't because e.g. he left the team or was off.

"Pin the blame on" is perhaps too much of a mental shortcut—the point is that before we almost always could find someone who made the decision and re-evaluate it when new facts arose. I started thinking about this when I was listening to a podcast by Gergely Orosz and Maggie Appleton.[+appleton] She mentioned that she figures that preserving decision history is important and it is something they're working on at GitHub Next for their Ace editor:

> "I think each decision should have a human assigned to it, who made that decision, so that you have an audit trail later—not necessarily to hunt people down, but to be like: 'okay why why did we make this decision about the back end. Well let's go see. Okay, Luke made that decision, like, 6 months ago—let's go open up his decision card and be like, what information did he have available in order to make this decision?'"

What often happens in software development is that a decision has to be made with some amount of foresight, before it's deployed to the users, and only after users get their hands on that software the decision can be actually substantiated. Sometimes there are conflicting expectations from different users. So having a record of the people who are related to a decision that was made is very useful for exactly that reason. Luke might remember what he knew six months ago, Claude usually won't.

Why should an agent's choice be tagged and traced, when a compiler's isn't? I think ultimately it comes down to determinism and scope.

Determinism is the obvious case that people always cite—compilers, generally, produce the same output for the same input. Agents, generally, don't. This is a well-trodden path, so I won't go further down it because there is already a lot written about it.

Scope is more interesting—comparing agents to compilers is incorrect because compilers exist apart from your specific business case. They are written to be a technical layer of abstraction, unconcerned about your domain. A compiler has to be usable in any business case, or rather its abstraction seam runs in a way to make making decisions about business cases easier for the user. Agents are different in that they might take on some of this business context and make decisions on their own.

Granted, there are a ton of business decisions we'd make unconsciously when we coded features by hand. But by coding by hand, we had a certain feel for the codebase, and would sometimes remember when the relevant business context was brought up later. Agents don't have that feel because their context windows are ephemeral. So we have to make it concrete by logging the decisions more.

I think it's a tradeoff that we will have to accept. The tradeoff is that we lose the intuition for the fine-grained, inner workings of the software, in favour of being able to make more higher-level decisions and being able to ship more code. And we still won't have the theory written down.[+naur] If we could write down every single fact about the business, it'd run itself, and nothing indicates that that's going to happen.

But it's back to the [<abbr>CI/CD</abbr> problem](/blog/on-ai-in-the-current-year) again—we make many more decisions at a much higher level now that line-by-line coding is infrequent. And we have this entire new category of ephemeral, unaccountable decision makers that rummage through our codebases. The decision log from my old job was a primitive version of what now is more important because the scale grew a hundredfold.

Nowadays session logs live in opaque files on people's local machines, and actually perhaps it should be the case that everyone's transcripts of agent conversations should be always available and searchable, possibly to also gather that context around relevant decisions.

> "Today, agent sessions are ephemeral. Prompts live in terminals and reasoning lives in context windows. The decisions, constraints, and iteration that produce code disappears the moment you close the session. Git preserves what changed, but nothing about why."[+entire]

But agents are pretty fuzzy and you never know if in a situation where context is scattered across Git commit messages, merge request descriptions, Jira tickets, Slack conversations and Loom transcripts (for instance) you actually got all that was there to find.

This certainly is an area of research and there might be diverging opinions on it. Perhaps it might be the case that there is some kind of entity sitting above agent transcripts, like logged decisions that are first class and they are the only ones that are considered in the future, and agent transcripts aren't search surfaces but just progressive disclosure or metadata coupled to decisions.

Perhaps all the local decisions are small enough that they can be projected out of the large agent conversation transcripts into small, one-line searchable strings. In fact I think this is what most likely would happen—every merge request has with it a bunch of metadata about product and technical decisions and their provenance, kind of like the [`intent-stack`](https://github.com/zanlib0/skills/blob/master/intent-stack/SKILL.md) skill that I have. Indeed the `intent-stack` itself is a kind of interesting example because it's supposed to tie decision provenance to Git hunks, but gathering context for <abbr>MR</abbr>s where there were multiple agent conversations becomes the problem.

No clue how this develops. It's an interesting time.

First we had model improvements, then harness improvements. Harnesses are built for single player now, but to make them work in teams, I suspect that decision and provenance tracking across time will be the next big development to come out of harness developers. I think it comes down to designing harnesses for the multiplayer. Codex and Claude Code are generally local software, designed to be used by one person. How do you make sure that teams can work with agents effectively? I think there are multiple answers, but shared decisions and accountability are most interesting here.

We already have tools for collaborating—whiteboarding, Miro, &c. But making those decisions transparent and discoverable in the age where thousands of microdecisions of how to write your code, what to name each variable, etc. are automated requires modelling the domain in a consistent way extremely important—the teams that can stay consistent will win. The teams that amplify the randomness from the agents will, likely, not.

[+appleton]: Orosz, G. [_Design Engineering with Maggie Appleton_](https://newsletter.pragmaticengineer.com/p/design-engineering-with-maggie-appleton). The Pragmatic Engineer 2026; 24:11.

[+naur]: Naur, P. _Programming as Theory Building_. Microprocessing and Microprogramming 1985.

[+cicd]: "When automated deployment pipelines (<abbr>CI/CD</abbr>) became popular, organisations with broken deployment processes didn't get better deployments. They were either in no position to begin implementing <abbr>CI/CD</abbr> because their process was chaotic, or they automated broken deployment processes." [On <abbr>AI</abbr> in the Current Year](/blog/on-ai-in-the-current-year)

[+entire]: Dohmke, T. [_Hello Entire World_](https://entire.io/blog/hello-entire-world). Entire 2026
