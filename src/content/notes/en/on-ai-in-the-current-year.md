---
pubDate: 18 Aug 2026
title: On AI in the Current Year
---

Much of the current discourse about <abbr>AI</abbr> in software development rests on the assumption that writing code has always been the hard part. If one accepts that premise, the conclusions follow naturally: now that <abbr>LLM</abbr>s have turned writing code into the easy part, everyone becomes a programmer, junior developers are unnecessary and obsolete, and you can vibe code a <abbr>B2B</abbr> SaaS overnight.

But everyone who has engaged with software development for end users[+software] knows that code has never been the hard part, in the same sense as the ability to adhere to the rules of English syntax is not the hard part in writing a compelling novel.

[+software]: As opposed to things like embedded systems, drivers, systems programming, programming language theory, and in general anything where the technical challenges are inherent to the problem and do not stem from factors like understanding the user needs or managing the complexity arising from the size of the system.

In pre-2020 technical literature the most commonly cited example is "a company is using paper and needs to move to digital" as a case of a business problem.[+dmmf] Now, in the age of <abbr>AI</abbr>, the equivalent is a company is using unstructured, digital records that need to be transferred to some kind of <abbr>AI</abbr>-enabled system. The means of analysis are largely the same, just the outcome is a bit different.

[+dmmf]: Wlaschin, S. [_Domain Modeling Made Functional_](/blog/on-domain-modeling-made-functional). Pragmatic Bookshelf 2018

Most advances in tooling and automation around software development (and <abbr>AI</abbr> is one such advance—it lets you create code faster) revealed bad processes. When automated deployment pipelines (<abbr>CI/CD</abbr>) became popular, organisations with broken deployment processes didn't get better deployments. They were either in no position to begin implementing <abbr>CI/CD</abbr> because their process was chaotic, or they automated broken deployment processes.

<abbr>AI</abbr> does the same thing for software development more broadly: if your processes are bad at the start, <abbr>LLM</abbr>s aren't going to straighten out the kinks, they will reveal the deficiencies that are already there.

There's a popular narrative that commodification of code means everyone will now be a programmer. There is no place for junior developers because with <abbr>AI</abbr> everyone can be a junior developer. But you don't go to a restaurant because you can't [cook at home](/blog/on-cooking). Putting aside the obvious broad risk towards the industry as a whole with this narrative, not everyone wants to solve all technical problems on his own. Some business stakeholders and domain experts don't _want_ to care about the technical problems. Just because Vorwerk came up with the [Thermomix](https://en.wikipedia.org/wiki/Thermomix) doesn't mean that no one goes out to eat.

This is partly because the prevalence of <abbr>LLM</abbr>s does not invalidate expertise. You need to know what to ask and need to know how to verify the answer. <abbr>LLM</abbr>s aren't great at revealing our blind spots.[+syc] A reasonable domain expert needing [technical consultation](/blog/on-the-trusted-advisor) will prefer talking to a human rather than an <abbr>AI</abbr> for genuine advice and opinion. Expertise in domain analysis is about asking the right questions, understanding the constraints that aren't in the prompt, and showing trade-offs between multiple different answers.

[+syc]: Goedecke, S. [_Sycophancy is the first <abbr>LLM</abbr> "dark pattern"_](https://www.seangoedecke.com/ai-sycophancy/), 2025

If <abbr>AI</abbr> doesn't change the fundamental challenges, it does change how the work feels day-to-day. One thing that has clearly changed for the worse is how we collaborate. We talk less with our colleagues and do pair programming much less frequently. I suspect this is mainly because coding with <abbr>AI</abbr> has an extremely slow feedback loop. There is no point in pairing when you're both sitting on a call waiting for the prompt to finish processing.

It's extremely hard to get in the zone and do deep work with <abbr>AI</abbr> not because there is something inherently wrong with interacting with a computer in natural language, but because the time spent waiting on processing a prompt is Chinese water torture to our attention span. Working with Claude Code for an extended period of time is experientially comparable to working [with a large, old Next.js code base](https://dev.to/chrismbah/why-is-nextjs-so-slow-for-developers-1gl9) or watching someone type at 20 words per minute—it's just insufferably difficult to not become distracted, which leads to fatigue and burn-out.

None of this means the industry is collapsing under the weight of <abbr>LLM</abbr>s. The "SaaS is dead" crowd is in my opinion mostly wrong. It still costs money and time to analyse a domain and build software. When you pay for a SaaS, you pay not only for the code, but also the infrastructure, management, compliance, and expertise. The pricing model will change because it's no longer feasible to charge per seat. A move to pay-as-you-go pricing seems to be quite likely—pay for <abbr>API</abbr> calls or <abbr>MCP</abbr> access and outputs rather than headcount.

However, if the SaaS crowd keeps on adopting the gung-ho, 100% agentic workflows, where no human actually reviews what goes to production, this might backfire. If a SaaS provider promising some kind of compliance (e.g. with payments or payroll) doesn't check that the software it's providing is correct, it might be hit with a penalty that erases the profits gained from efficiency increase due to <abbr>AI</abbr>. It also remains to be seen how badly intent debt[+debt] ends up impacting that kind of business, where so much [understanding is delegated to <abbr>LLM</abbr>s](/blog/a-voice-from-nowhere) that developers themselves stop being able to discover optimal domain models to use as proxies for good software.

[+debt]: Storey, M.-A. [_From Technical Debt to Cognitive and Intent Debt: Rethinking Software Health in the Age of <abbr>AI</abbr>_](https://arxiv.org/abs/2603.22106). arXiv 2026

My ultimate hope is that there is some sensible middle ground between tokenmaxxing [slop purveyors](/blog/reliable-signals-of-honest-intent) and Redditors who will negatively review a video game if the author confesses to using Claude when developing the code. I suspect that the middle ground involves using <abbr>AI</abbr> agents for the things they are actually good at, and rejecting them for what they are unfit for.
