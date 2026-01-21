---
pubDate: 2020-11-11T11:54:08.035Z
title: A Tale of a Dripping Faucet
description: Why minor pain points can ruin your mood.
---
There's a story quite early on in *Zen and the Art of Motorcycle Maintenance* about the Sutherland couple, who represent the "[romantic](/blog/romantic-programming)" and quite non-technical, perhaps even technophobe, approach to life. Pirsig starts off by considering their — or, particularly, John's, the husband's — approach to motorcycles until eventually extrapolating it to other kinds of technology, such as the kitchen sink faucet.

> Waiting for them to get going one morning in their kitchen I noticed the sink faucet was dripping and remembered that it was dripping the last time I was there before and that in fact it had been dripping as long as I could remember. I commented on it and John said he had tried to fix it with a new faucet washer but it hadn’t worked. That was all he said. The presumption left was that that was the end of the matter. If you try to fix a faucet and your fixing doesn't work then it’s just your lot to live with a dripping faucet.

It's unfortunately quite common to find those who haven't achieved mastery in a particular "intermediate skill" — that is, a skill not used to achieve anything on its own but supplementing other ones, such as touch typing, text editing or English — ignore them or, worse, claim they aren't "necessary". Indeed, it is not necessary to learn touch typing when you are a programmer or a professional writer much like it is not necessary to fix a dripping faucet. It's not a problem that screams "fix me, or else!" at you.

What inevitably happens then is that you end up convincing yourself that it is just your lot to live like this and this entire touch typing thing is "not for you". You end up convincing yourself that the constant dripping of the faucet does not actually bother you. However, the downside is unseen and insidious, coming for you at the least expected times. Pirsig continues his story like this:

> \[P]erhaps it was a subtle change in Sylvia \[Sutherland]'s mood whenever the dripping was particularly loud and she was trying to talk. She has a very soft voice. And one day when she was trying to talk above the dripping and the kids came in and interrupted her she lost her temper at them. It seemed that her anger at the kids would not have been nearly as great if the faucet hadn't also been dripping when she was trying to talk.

Small irritations mount and eventually they will blow up. Sometimes, also, lack of mastery in an intermediate skill can cause your primary skill to become useless for a given task. The two most important intermediate skills a programmer can have these days is a) good communication (English) and b) efficient text editing.

If you are a programmer, especially one working for someone else, good communication is absolutely vital because there are cases where an acceptance criterion that seems essential in a Jira task and would take 90% of the entire feature coding time is actually not that important. It's good to double-check whether certain features are really required, or if the manager who thought them up really thought about them as deep as you think she did.

As for text editing, a story I remember quite vividly from my day job was the situation when we had to refactor our method of handling SQL queries. Previously, we would use a direct method of execution and stored our queries as template literals inside JS model files. It was fairly uncomplicated, because the models had hardly any code besides the SQL so we stuck to it.

However, eventually the models started getting a little complex and also the database part of our team who didn't really know JS that much figured it would be best if we stored the queries in separate files and only referenced these file paths inside the models. When I joined the team, the refactor was only partially done, half of the models still had the queries in JS code and generally most of them gave up because it took a long time and was quite tedious to do in Emacs-like editors and IDEs. Vim macros took care of the issue in about a day, with no frustration, and I found it actually quite pleasant. There's something magical about seeing these execute.

As programmers and craftsmen, it is in our job description to eliminate minor pain points so that we can focus on the task at hand. The more minor pains there are, the greater the disconnect between the human and the task at hand. Noticing these pain points takes practice, but once you start fixing them, the quality of your work and the enjoyment taken from it will skyrocket.
