---
pubDate: 18 Jan 2026
title: Reliable Signals of Honest Intent
description: It's better if the message comes in an expensive box.
---

Imagine you are working on a significant software update. The software is used by a few thousand professionals, and the release you are working on will fix a few significant issues and greatly improve the quality of work of these people. The update costs money, so it cannot be an automated thing: you need to convince the users of this software to decide that they should update.

How would you do it?

Would you implement a pop-up window advertising the new release and push it through the automated update channel? Would you write an email? Would you _prompt <abbr>AI</abbr>_ for an email?

A story like this was related in Rory Sutherland's book _Alchemy_, and concerned the release of the then-new Windows NT 32-bit server operating system. Microsoft had to figure out how to convince its existing user-base of system administrators to make the switch. But they didn't ask developers for advice, they hired an advertising agency. And the advertising agency had a different idea.

> We produced an elaborate box containing a variety of bits and pieces including a free mouse-mat and a pen, inside gratuitously expensive packaging.[+alchemy]

[+alchemy]: Sutherland, R. _Alchemy: The Surprising Power of Ideas That Don't Make Sense_. W. H. Allen 2020; p. 177

Why go to such great lengths to advertise a software update?

Well, because this story is a subtle case of obliviousness that developers are often guilty of. We tend to get blindsided by the [subject-object](/blog/on-lila/#on-the-subject-object-split) split, and think that we only need to convey the objective fact while leaving the subjective interpretation of the value of that fact up to the reader. But it is perhaps not shocking that the subjective perception of value can be influenced—this is, after all, what persuasion is for. It's actually very natural and expected for it to be influenced, because we are constantly being bombarded by various stimuli. The stimuli fight for our attention, and we have developed a system of complex intuitions to select which stimuli are worth our attention and which are better to ignore.

The elaborate box with expensive packaging was a way to signal that what was inside was important, and exclusive enough, to warrant the attention of the recipients. It turned out that it was an unexpected success: almost all of the boxes were opened, and about 10% of the recipients actually tried the new operating system, which for an audience of experienced server administrators is an impressive conversion rate.

This is one of many examples from _Alchemy_ of what Sutherland calls "reliable signals of honest intent." The attention economy is very asymmetric—there are a lot of things competing for our attention, and we have to spend it to assess which are worth it. Reliable signals of honest intent are one way to quickly judge whether what is behind the signal is worth our time.

What's the equivalent of that expensive box when reading something on the internet? What proves to a reader that you deemed this interaction worth his time?

The mere fact that you are looking at these words in a form of an article rather than a tweet or a bullet point outline with terse, prescriptive theses is a signal that what I'm presenting to you was worth the effort of writing, editing, and publishing. These words have been written by a human, for a human.

If they weren't, you'd know.

## Gestalt recognition

You're analysing the text right now, as you read, but you're not just reading the words and ingesting the content. Subconsciously, you're also looking for a signal of intent. _Why_ did someone write this? You have already seen your fair share of deceptive writing on the internet. Somewhere in your brain, somewhere beneath conscious awareness, you're running a rapid assessment.

Is this worth my time? Is the author honest? Does he know what he's talking about?

Ever since the use of large language models became common online, we developed a sort of paranoia—is what I'm reading <abbr>AI</abbr> slop? Has this article been generated from a vague list of bullet points, or, worse yet, spewed to satisfy some vague clickability or virality metrics? We know the tells of <abbr>LLM</abbr>-generated writing—the awkward lists of three, the parallel sentence structure, the "and then it hit me", the "uncomfortable," "brutal," or "honest" assessments—but even without them we know instantly.

The knowing happens faster than conscious thought. And the "paranoia" is not paranoia at all, it's a fundamental survival mechanism that we repurposed for navigating information.

> Consider the hiker who comes across a bird while walking in the alps. In trying to identify the bird, the hiker takes out their bird book and uses a number of features of the bird (cues) to correctly identify it. Second, (...) consider the rabbit, who has a far more limited aim when it sees a bird: identify it as predator or non-predator, as quickly as possible.[+horsey]

[+horsey]: Horsey, R. _The art of chicken sexing_. Cogprints.org 2003, p. 111

Of course, when reading content online, we aren't necessarily thinking about our survival. The stakes are much lower, but the same system is employed to make sure we do not give the time of day to someone who does not know what he is talking about, or furthermore, that we do not believe a fraud. When we see enough <abbr>LLM</abbr>-generated writing, and we recognise its often poor quality, we subconsciously associate poor quality with the form of the writing.

The thing is that <abbr>LLM</abbr>s have become advanced enough that they can reliably avoid the obvious tells. But they are unable to escape the form itself, because they cannot put more meaning into the writing than what is given in the prompt and in the training data. A language model is unable to form an original thought. Everything coalesces into a limited number of patterns that we recognise subconsciously. Categorisation of <abbr>LLM</abbr> writing becomes pre-intellectual, what Horsey calls a "gestalt phenomenon," and what Pirsig might have called a "quality event." The [analytic knife](/blog/how-i-see-the-world/) has yet to begin its work.

But once the flag is raised, and we start suspecting foul play, we transform from the rabbit into the hiker. We take out the [bird book](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) and start looking for tells. The knife starts cutting. We know that something is wrong, now we have to confirm the suspicion with more reliable evidence. We already laughed—now it's time to explain the joke.

## Learning to detect

Would it not be _irrational_ of us to suggest that we recognise <abbr>AI</abbr> writing, and could not articulate why? How can you say that my _carefully crafted piece_ is <abbr>AI</abbr> slop?

Horsey's research into [identifying chickens](https://web-archive.southampton.ac.uk/cogprints.org/3255/1/chicken.pdf) seems to confirm that intuition is not illogical, but merely subconscious. There are a number of skills that appear to be cases of "irrational knowledge"—such as aircraft identification, bird watching or chicken sexing—that seem to defy conscious justification and introspection, that nevertheless produce verifiably correct results in almost all cases.[+intuition]

[+intuition]: From Horsey's paper it seems that effective intuition requires prior training, and that might as well be the case for some domains like bird watching or aircraft identification that rely on taxonomic categorisation. But there certainly are some phenomena—like music, or food—the quality of which we can judge without exposure. You don't need to have gone to music school to be moved by Mozart, or be a Michelin-starred chef to like pizza. "Being able to tell if something was prompted out" requires some prior experience, but "being able to tell if the text is any good"—everyone can do that. And everyone does.

If I were to go back to 2018 with a piece of <abbr>LLM</abbr>-generated content, and ask a random person in the street what he or she thought of it, there would be no reason for that person to suspect foul play. The "you're absolutely right," lists of three and copious em-dashes would not come across as suspicious, even though the text itself would most likely be uninspired. But once those patterns are identified and pointed out as indicators of low quality, we can acquire novel ones unconsciously, and come to identify <abbr>AI</abbr> slop even if it displays none of the standard indicators.

When the rabbit's alarm bells go off—and when the reader's unconscious pattern recognition flags the text as <abbr>AI</abbr>-generated, the scramble for confirmation begins, and out comes the _Wikipedia:Signs of <abbr>AI</abbr> writing_ article, or a detector like <abbr>GPT</abbr>Zero to justify the irrational hunch.

We are afraid of judgement, and we are afraid of being unfair. But in service of avoiding wrong-doing, we commit an intellectual dishonesty by justifying to others a pre-intellectual judgement with post-hoc analysis. We laugh before we consciously understand the joke, but pretend that the laugh was a decision made based on facts. We become suspicious, before we understand exactly what is suspect, and only afterwards look for evidence, even though our mind is already made. The causal arrows point up, but to appear reasonable we must make it seem like they have always pointed down.

This is because when we identify the text as <abbr>AI</abbr>-generated, not only do we think that "this is low quality," we implicitly suspect deception, and deception is a much more serious matter than low quality. Elaborate packaging for a software update proved that Microsoft used to value its users, it showed that if _this much_ effort had been put into informing the user of an update, _how much more_ effort must have been put into the update itself. <abbr>AI</abbr>-generated text, when identified, signals the opposite: you valued this interaction so little that you _hadn't bothered_ to write it yourself.

Consider how it looks when you apply for a technical position, or go through an internal evaluation process. You spend hours preparing, researching, doing tasks, interviewing. If you receive a canned rejection letter, that's annoying, but fine: it's disrespectful and unprofessional, but obvious. But if you receive an <abbr>AI</abbr>-generated feedback, that's somehow worse, because its automation disguised as individual attention. Deception is worse than disrespect.

If they can't evaluate you enough to write their own feedback, can they evaluate code at all?

Are they competent?

Are they _real_?

## Thought laundering

So there are the slop purveyors and the farm-to-table humanists. But there are some in between, and their story is perhaps the most tragic: the person who writes a heartfelt, honest, though slightly clumsy cover letter and then "improves" it with AI has taken the thing that would have got him noticed and replaced it with the thing that will get him filtered out.

The elaborate box works, because it's expensive to send. Your own words work for a different reason: they're unmistakably yours.

Imperfect prose, calques from your native language into English, idiosyncratic turns of phrase or slightly awkward sentence structure that nevertheless says exactly what you mean. These are proofs that someone sat with the problem and came up with a solution. And in time, these deficiencies can become individual characteristics.

If you keep writing, and keep showing up, they become your voice. The quirks become _style_.

Laundering thought through <abbr>AI</abbr> on the other hand removes proof instead of adding polish. You've traded the chance to sound like yourself for the guarantee to sound like everyone else. What remains from the text after an <abbr>LLM</abbr> has had its way with it is fluent, structured, professional.

Indistinguishable in form from thousands of other posts. Indistinguishable from slop.

The reliable signal of honest intent is gone. Poof. You might have better skipped the middle "man" and sent just the prompt.

## Rate of change

At this point, the technologist objects: "of course, _now_ the models end up with these tells, but _when_ the technology progresses further, the rough edges that signal humanity will be reproducible by the models."

While it is nevertheless true that the technology has progressed substantially in the last three years, I would argue that it hasn't progressed _that much_ in the last year. The gap between even early <abbr>GPT-3</abbr> and Chat<abbr>GPT</abbr> is vast. The gap between <abbr>GPT-4</abbr> and <abbr>GPT-5</abbr>? Not nearly as life-changing.[+pit]

[+pit]: If you need proof that progress in this field has slowed down, consider that the [bottomless pit supervisor greentext](https://www.reddit.com/r/greentext/comments/vc7hl0/the_bottomless_pit_supervisor/) was created in 2022 and still remains the best piece of writing to be created by a language model.

It is an open secret that <abbr>AI</abbr> research is currently unprofitable and it remains to be seen how long Anthropic and Open<abbr>AI</abbr> can burn through venture capital cash. It costs eye-watering amounts of money to train new models, and there is a theoretical limit of how many parameters you can tweak before the results don't end up improving that much. While it may seem that <abbr>AI</abbr> is poised to grow _exponentially_, history shows that it's unlikely to be the case. Growth looks linear when you're looking up from the middle of a sigmoid curve.

What works even more to the detriment of the technologist argument is that while model improvement faces diminishing returns and eventually plateaus, human pattern recognition accumulates linearly with exposure. Anthropic might throw another billion dollars to release Opus 5, just for an average Joe (who took the time to cultivate some taste in what he reads) to need six, rather than five paragraphs to determine if a text is <abbr>AI</abbr> slop.

## Showing up

Slop predates the models. Before Chat<abbr>GPT</abbr> we had ghostwritten engagement bait on LinkedIn. Before LinkedIn, we had <abbr>SEO</abbr>-optimised keyword listicles. Before that, we had God knows what, but without a doubt we had something. We learned to detect that, too.

The question is not whether <abbr>AI</abbr> will get more human. It isn't even about whether you use <abbr>AI</abbr> to help you write.[+writing-aid] The question is whether the mimicry was ever the thing we were detecting in the first place.

[+writing-aid]: Language models can be useful writing aids, but require very rigorous discipline to not descend into sycophantic regurgitation. First two or three prompts to Claude Opus can produce valuable feedback about a piece of writing, or can get you out of a writers block (they started off as text completion engines after all). Beyond that, the quality falls of a cliff.

You cannot fake having been there. You might produce more content by prompting a language model, but ultimately the author who was at the desk, who cared to pour over every sentence and choose every word with deliberate purpose—he will be the one who gets read, because he understands that _the reader is worth the trouble_. There is a person on the other side, and that person is worth sending the elaborate box to.

When someone shows up, you know. You know, because the text has friction. Because it has opinions that cost something to hold. Because it couldn't have been written by anyone else, for anyone else, about anything else. You _cannot_ fake putting in the time.

The models will get better. The cat and mouse will continue. The signal was never really about detection.

It was about whether you showed up.
