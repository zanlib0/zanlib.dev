---
pubDate: 2021-02-08T18:22:25.154Z
updatedDate: 23 Nov 2025
title: Agile, Avant la Lettre
description: The ideas in the agile mainfesto are older than one might think.
---
I have considered myself for a while now a "lay Benedictine" since the Rule of St. Benedict has been a continuing source of inspiration for my personal and professional life. I haven't written much on how that text applies to software, though. I'd like to fix that and write a little bit how it can be applied to craftsmanship in general and software craftsmanship in particular.

It should be noted that, even though it is forgotten by the general mindset, the [Rule of Saint Benedict](https://www.solesmes.com/sites/default/files/upload/pdf/rule_of_st_benedict.pdf) is very much one of the founding pillars of Western civilisation and certainly one of the driving forces behind the industrial and societal progress during the early and high middle ages. Original Benedictine coenobitic communities and their practices [very likely inspired the formation of lay craft and merchant guilds](https://www.gutenberg.org/files/45425/45425-h/45425-h.htm#CHAPTER_I), which appropriated and adapted the monastic practices to their own needs. One of the goals of craft guilds was to perfect their trade and create an environment to foster training of new members.

Given the above, one can expect to find a great deal of useful information inside the Rule, although it is worth mentioning that a reader accustomed to contemporary books about team organisation and other such topics might [find it difficult to get through](https://en.wikipedia.org/wiki/Lectio_Divina). What's important to point out, too, is that the Rule is not meant only for monks, or only for Catholics or even only for Christians (although I suspect atheists might find it difficult to follow). While a large part of the Rule consists of precepts for personal spiritual development and certain formal matters of the [liturgy of the hours](https://en.wikipedia.org/wiki/Liturgy_of_the_Hours), the second ("administrative") half is almost entirely applicable to any kind of organisation.

## Benedictine vows

One of the founding documents of the agile software development is called the [Agile Manifesto](https://agilemanifesto.org/). It's quite short and to the point, although seemingly on purpose rather vague. It emphasises a certain tendency to break away from the rigid, corporate process of developing software which was very prevalent in the days the manifesto was written but these days it is the de facto standard way of working on software even in big companies.

In essence, the manifesto is the vows you swear when you enter a programming job. Of course these days it is not done solemnly in the oratory with everyone else present and accepting you into the fold as a novice but rather just written inside the job offer. The sentiment is there, even though the form has changed.

Something similar can be found in the chapter 58 of the Rule.

> Let him then who is to be received (...) in the presence of all the brethren, make promise of stability, of conversion of life and of obedience.

Short of the final line of the Agile manifesto, the Benedictine vows correspond soundly to the values of agile software development. And even the seeds for that final line can be found elsewhere in the Rule.

### Working software—stability

The vow of stability (*stabilitas*) concerns counteracting a certain tendency that humans seem to have which manifests itself most when driving a rental or a borrowed car. When you're driving a rental, you're not particularly concerned about redlining the engine or taking handbrake turns because any issues that it would cause to the car would manifest themselves long after you're done with it. As long as there are no immediately visible damages, it's fine.

Similarly with software, approaching a project that is going to last two months is very different from a project expected to last two years. In a short MVP we are more likely to violate good practices, ignore issues and generally be more reckless than when working on a long-term solution.

Following good practices in software—automated testing, self-documenting code, <abbr>[SOLID](https://en.wikipedia.org/wiki/SOLID)</abbr>, &c—is important even in short term projects, and this evokes the notion of *stabilitas*. In other works, to follow stability, work on your code as if you were stuck with it for life, even if you are only going to work with it for the next week.

What should be noted is that "stability" does not mean "obsessive perfectionism". It does not mean mulling over every single line of code for hours on end but instead the approach of following the process and best practices regardless of the time-frame that we expect to be working on the software.

### Customer collaboration—obedience

The vow of obedience (*oboedientia*) is about listening. It seems that nowadays the word "obedience" is very loaded, and is commonly understood as "submission". However, the Latin verb *oboedire* comes from *ob-* and *audire*, meaning "to listen to". Perhaps on the contemporary [euphemism treadmill](https://en.wiktionary.org/wiki/euphemism_treadmill) a more appropriate word would be "communication". It is no coincidence, that the very first word of the Rule is "hearken".

In agile, customer collaboration over contract negotiation means that rather than sticking to a previously agreed upon scope, work is done to respond to market changes and discoveries made in the process of development. This is a prime example of *oboedientia*—listening to the needs of the client and responding to them in good faith, rather than obstinately sticking with an outdated schedule.

Obedience is also necessary in a student-mentor relationship, on both sides. The student should listen to the mentor's advice, because it is based on experience, even if it might not necessarily seem logical to him. The mentor, in turn, should remember that the student might not know the same things as he does and is still learning. Therefore the vow of obedience requires fostering healthy communication and listening to one another.

### Individuals and interactions—conversatio morum

The final vow, in the English translation rendered as "conversion of life" is often referred to by its Latin name of *conversio* or *conversatio morum* (literally "conversion of manners", though note the appendix for details). Elsewhere it is also translated as "fidelity to monastic life". Through the centuries it's been understood as the promise to daily improve oneself by a tiny amount so that these tiny improvements may add up into something greater over the years.

This is something that many novice programmers learn very early in their career under the name "[boy scout rule](https://www.oreilly.com/library/view/97-things-every/9780596809515/ch08.html)". However, the boy scout rule really only applies to the code. What if we were to apply the boy scout rule to the coder? What about the organisation?

Unlike the impossible notion of re-doing everything, conversatio morum is more akin to Japanese [kaizen](https://en.wikipedia.org/wiki/Kaizen): small, incremental improvements done at every level of resolution—from the organisation itself, the people who make it up and the products on which they work. It's fixing [dripping faucets](/2020-11-11-a-tale-of-a-dripping-faucet/). It only works at a personal level, and if the individual is not responsible or incentivised to make these small improvements, they will never happen.

### Responding to change—better judgment

While the passage about Benedictine vows does not have a strict equivalent of the Agile manifesto's line about responding to change (although *conversatio morum* is related), I feel like it's worth pointing out one of the "formal" chapters. Chapter 18 lays out in excruciating detail the order in which psalms should be sung, and in the last paragraph we find this gem:

> We particularly advise however that if haply this distribution of the psalms be displeasing to anyone he set it in order, if he judge it to be better when arranged otherwise, so long as this be in any case attended to (...)

If it doesn't work: change it! If the process produces a bad or undesirable outcome, identify what caused it and fix it. If there are formal requirements, let them be kept, but otherwise the [processes and plans are subject to be changed](/2020-12-16-axes-of-governance/) and revised as necessary.

## Conclusion

The Rule of Saint Benedict is the foundation of Western monasticism and, through medieval guilds, the inspiration for spirituality of craftsmanship. Given that, it seems prudent that those aspiring to the title of craftsmen be acquainted with it and follow its most basic precepts. While a lot of the core teaching of the Rule was passed down through evolving processes of first guilds and then corporations, it's worth knowing the work that inspired it all.

### Appendix: "Conversio" and "conversatio"

Anyone who decides to look up the term *conversatio morum* online is bound to find the information that the original manuscript contained the term "[conversatio](https://en.wiktionary.org/wiki/conversatio)", however one of the early copyists of St. Benedict's work made a typo and rendered it as "[conversio](https://en.wiktionary.org/wiki/conversio)". Regardless of the word used, we should remember that the utility of the Rule is not just dictated by the original text, but rather the centuries of monastic practice that followed and interpreted it. And whether that practice read that one particular vow as *conversatio* or *conversio* is not very important.
