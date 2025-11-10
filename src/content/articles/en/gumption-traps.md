---
pubDate: 4 Apr 2020
title: Gumption Traps
updatedDate: 10 Nov 2025
description: Gumption traps are the internal and external obstacles that drain your drive. Understanding them gives you tools to protect the quality of your work.
---

"Gumption traps" are a term introduced by Robert M. Pirsig in Chapter 26 of *Zen and the Art of Motorcycle Maintenance* as a detail of his Metaphysics of Quality. They're probably one of the most approachable topics in that book, and also one that can be acted upon very quickly, even (or maybe especially) by beginners. A newcomer to software engineering, motorcycle maintenance or any other craft job will definitely find something there that they struggle with and that they can work on.

"Gumption" is a Scots word similar to English "courage", but its meaning is a little broader. Cambridge Dictionary defines it as:

>The ability to decide what is the best thing to do in a particular situation, and to do it with energy and determination. *She had the gumption to write directly to the company manager and persuade him to give her a job.*

It also has that certain ring to it that, once you say it out loud a couple of times, will give you a better idea what it means.

Gumption in philosophy is not a particularly new idea, Aristotle hinted to something of that sort in *Nicomachean Ethics* as the difference between potential and result. Gumption is that difference. A doctor, for instance, can have the necessary skills to save the life of a bleeding out patient in front of him, but without gumption—without the drive to actually put those skills to use—the patient will die.

As Pirsig puts it: "gumption is the psychic gasoline that keeps the whole thing going."

Gumption is essential in any kind of craft—be it woodworking, motorcycle maintenance or programming. Within the context of programming, you will see gumption differently based on whether you're working on a project of your own or a commercial project for a customer. The gumption traps will be the same, just the ways of dealing with them might be slightly different and your approach might require different kinds of adjustments.

What is a gumption trap then? It's a factor, either external or internal, that causes your gumption to "leak out". It's <mark>when the relationship between the craftsman and the material he is working on breaks</mark>. The result of falling into a gumption trap is the loss of enthusiasm of working on the material and the irresistible desire to put the entire thing away. Since we are talking here primarily about programming, we will be discussing these mostly within that context.

There are, broadly, two groups of gumption traps. External, that is arising from the material (in our case, code) itself, from the system we are working on, from the external parts (libraries) that we use or from something else. Pirsig calls these "<mark>setbacks</mark>". The second type—internal—is caused by our own poor mindset or failures in performing our craft. These are called "<mark>hangups</mark>." Hangups are further divided into three groups — "value traps", "truth traps" and "muscle traps".

## Setbacks

Setbacks are external gumption traps and most often arise from the material the craftsman is working on or other external conditions. They may also come up as a result of something you have done previously.

### Out of sequence reassembly

Does this happen to you, that you work on a complicated feature, but just at the end, as you're about to wire everything together—and maybe connect the UI to the back-end you discover that there's a mismatch on the interfaces and you need to rewrite one of the sides entirely? Or it turns out that the feature is not exactly up to spec because you missed something and now you have to start over?

That's the trap of doing things out of sequence. In more general terms, it's when you realise you did something based on incorrect facts. Sometimes those facts change as you work—it's even more disheartening then. But there are ways to deal with it.

The first one is to *be meticulous* about your presuppositions. In other words—plan ahead. Not too much—there will be facts that you will fish out once you start working on it—but think about the general, high-level requirements that you will be working with. Read the spec of the feature a few times, note down (either physically or mentally) what jumps out at you as incorrect, under-communicated or what might prove to be more difficult later on. The knowledge of how to do that comes with experience—but the more attention you pay to it, the quicker you will gain that experience.

Secondly, *commit often*. If you don't use a version control system, start. And then whenever you finish a logical chunk of work, commit. This leaves a paper trail and a quick and easy fallback mechanism to return to in case your preconceptions turn out to be wrong.

And finally, when you do finally end up falling into this particular trap, remember that the subsequent "reassembly"—rewriting of the incorrect modules—will most likely take far shorter than the first run. After all, you already have the necessary knowledge not to make the same mistakes.

### Intermittent failure

...or as they're called more commonly in our field: [heisenbugs](https://en.wikipedia.org/wiki/Heisenbug). These are issues that seemingly disappear when studied. They exist only in production, but when we take the magnifying glass of our debugging tools, they are nowhere to be found. 

Unfortunately, if the heisenbugs were not as pernicious as they are, they would not be so feared. The advice Pirsig gives to deal with them in the context of motorcycles—"just ride it out" for a couple hundred kilometres—is also difficult to action within the software context.

Fortunately, the programming languages of today provide us with a host of tools to catch these bugs—but problems start when you do not exactly know how your diagnostic tools work.

One story from my professional experience comes to mind here. My colleague was trying to debug an object that seemingly had incorrect properties appended to it—but whenever he put a `console.log` into the function that constructed this object and inspected its nested properties, everything seemed to be fine, even though the result of an Excel file that was later generated by the object was blatantly wrong.

The issue, turns out, arose from a peculiarity in how `console.log` works in browser dev tools (which I'm sure my esteemed colleague knew about, but just happened to forget when it was needed— it happens to the best of us). Namely, the nested properties of an object are reevaluated when opened inside the browser dev tools. So, when one logs an object in a given state, if it had mutated by the time one opens one of its nested properties, those nested properties might not be the same as they were at the time of logging the object. (We had to mutate the object for performance reasons.)

The solution in that case was to `console.log(JSON.stringify(object))`, however we did spend a good workday trying to figure that out. The bottom line—*remember how your diagnostic tools work*.

### Parts setback

We do not often think about having to replace parts in a program—after all, it's not a physical thing, and the code that we write doesn't experience wear and tear, right?

Wrong. Our code uses (especially in the JS ecosystem) various kinds of libraries and modules. Some of these modules we wrote ourselves, some are third-party. Those third-party modules are often a source of our woes. Sometimes an update is going to break it. Sometimes there will be a bug in third-party code that we can't exactly fix. Sometimes we will simply outgrow the needs of a library. Another time a better solution will come out, and we will have to replace one component with another that does not have the same interface.

The most straightforward way to deal with these issues is to wrap your third-party code in custom interfaces. When you import a React component, do not simply use the provided interface that it ships with and then use it in dozen pages. Instead create a single point of contact between the library and your code. Oftentimes it might just be a rewrite of the module's interface into your own code—but that step is very important. Because when the time comes to replace that component, there will only be one place to change the interfaces rather than a dozen.

Of course this all has to be done within the bounds of reason—if you import React itself, it is fairly pointless to write an entire interface around such a robust framework. If a time comes to replace React, you will have bigger problems than that.

And also, remember to sometimes ask yourself the question "can't I make this myself?". Homegrown components are not in any way worse than third-party ones and the time spent building one of your own can save a lot of headache in maintenance. It's also much more flexible and gives you more experience to approach similar issues in the future. Finally, since we live in the digital world where every piece of code can just be copied or imported indefinitely, you might very well use that module in the future.

## Hang-ups

Setbacks often feel unfair—they come from things that we do not have much control over. But we do have control over how we approach them. Hang-ups are the internal issues. Or, in other words, the things that are all your own fault.

Before we start listing the hang-ups, let me give you a tip that will avoid most or all of these. You see, when you sit down to work on a piece of code, or a lump of clay, or a motorbike, there will be things you don't know. In fact, the very reason why you sat down in the first place is that you don't know what's wrong and how to fix it. There is a very small subset of bugs and tasks that you immediately know how to tackle—these are trivial, easily delegated to an <abbr>LLM</abbr> and, if you do your job right, very rare.

It is important not to be discouraged by the lack of knowledge, but rather embrace it and start fishing for facts that will further your understanding of the problem. Once you learn one thing, others will timidly raise their heads and look around, as if waiting to be discovered.

With that knowledge in mind, let us begin investigating hang-ups, and more specifically a subset of them called "value traps".

### Value rigidity

The story of the South Indian Monkey Trap is probably one of my favourite engineering parables in existence.

Do you know how to catch a monkey? All you need is a hollowed out coconut affixed to a post. Fill the coconut with a little rice and leave a rectangular slot large enough for the monkey to put its hand inside but not large enough for it to retract its clenched fist. The trap works pretty much as you would expect—the monkey comes up and puts the hand in, grasping the rice in its clenched fist. And it realises it is trapped just as it tries to pull out the clenched fist with the rice.

The trap works because the monkey is caught in the other, invisible, trap of value rigidity. In other words, it is unable to reconsider the value of facts once new ones present itself. In this case, even after realising that it is unable to take out the rice, it still values it more than its own life.

As programmers, especially ones working with external clients, we have to understand that value is not rigid. The importance of various features or bugfixes changes depending on the circumstances. The importance of having 90%+ test coverage is diminished when there's a critical bug discovered in production.

Remember that the code is not the most important thing in programming. In fact, code is probably one of the least important things in programming and as a general rule you want to write as little of it as possible. Consider your surroundings and the perspective of the people around you, the client, your teammates, and make the right choices on what to work on next.

As an aside, I find that the agile model already helps a lot with this, as it encourages decomposition and reduction of tasks into as small components as possible. When your units of work are very limited, it's easy to evaluate them. And even if you focus on something that is not important in a given moment, the small size of tasks means that the cost of wrong evaluation is small and you'll have the opportunity to adjust your thinking.

### Ego

The gumption trap of ego is dangerous and quite often leads to value rigidity. The difference is while conventional value rigidity often deals with the material (code, clay, the motorcycle), ego is like the value rigidity of self.

> If you have a high evaluation of yourself then your ability to recognize new facts is weakened. Your ego isolates you from the Quality reality. When the facts show that you’ve just goofed, you’re not as likely to admit it. When false information makes you look good, you're likely to believe it.

The thing about code is that it has a way of revealing your actual nature. Most programmers I know are usually rather modest and quiet, especially when they're working. Sometimes they are annoyed and tend to mumble or shout expletives, but I find they are less aimed at the code or the machine and more at themselves. The machine is a reflection of your own nature.

There's no other way to approach programming than with modesty and if you are not naturally inclined towards that, it's good to fake the modesty anyway. It's easy to feign your way into looking good on a coding job, but that only works for people who don't know what you're doing. The clients will most often be such people—it's imperative that you do everything to deflate that image.

### Anxiety

The gumption trap of anxiety is kind of like the opposite of ego. You fall into it when you are sure of your own inadequacy and think that whatever you'll do will go wrong. Very often it is this, rather than "laziness", that causes you not to know where to start with a particularly difficult task.

The good thing is, programmers rarely work alone and the agile mindset already has tools that deal with anxiety. Pair programming is one of the best ways to do it.

It's good to prepare before you start coding though. Poke around the module that you will most likely have to modify, read its tests and docs if they exist. Start fixing something small, maybe just the UI at first — because then you'll start discovering the facts that will help you with the rest of the task.

And also, remember that everyone has these moments. Everyone messes up from time to time and everyone tends to find himself in a situation where he does not know what to do.

It's important to not let that paralyse you.

### Boredom

This one is tricky, because it often goes hand in hand with ego. How often are we bored when working on code? Sometimes a module that is not reusable or an unintended convention of copy-pasting code can lead to a task that in theory should take twenty minutes but actually in a messy codebase will be more like twenty hours.

Robert C. Martin in *The Clean Coder* pointed to a similar concept and he called it "focus-mana". Focus-mana is a substance that affects alertness and attention. Coding consumes it, so do worries and distractions. Oftentimes situations which are not related to our work at all can reduce our focus-mana.

Take a few minutes to recharge. Look out the window. Go for a fifteen-minute walk. Go to the kitchen and make a cup of tea and talk to your colleagues. Sleep properly after work.

Once the focus-mana is gone, you can't force the focus. Coding is a creative exercise, and while you can still do it when the mana is gone, most likely you will have to throw out everything you had done while not focused out of the window. When you're bored, you stray off the path of quality, and that's when the really big mistakes happen.

It's also worth noting that when you are bored, you are more susceptible to [*revelations*](https://intercaetera.com/posts/three-ways-of-gaining-knowledge/)— unrelated facts spontaneously "clicking" together in your head—and when you stimulate that with poking around the code without any particular goal, you might find solutions that you hadn't considered previously.

### Impatience

The last of the value traps is impatience. This is what happens when you greatly underestimate the amount of time something would take and you start rushing through the process in order to speed it up.

Impatience is extremely dangerous in programming, and given the prevalence of deadlines in this job and clients who oftentimes desire estimations made with certainty, it is very common that we fall into this trap.

The best rule of thumb that you can use when asked about estimates or any expectations about how long something would take is to refuse to put any concrete number on it when working with unfamiliar technology. Whenever you're doing something that you haven't done before, avoid giving concrete estimates because they will most often be wrong. Once you give an estimate, even if you explicitly state that it's just a guess, you will in your mind be committed to it and will want to get your job done in time. You want to give yourself indefinite amount of time when working with unfamiliar technologies.

Establish the importance of deadlines. Sometimes deadlines can be deadly—shipping an important feature for an e-commerce site before Christmas—but oftentimes they are completely arbitrary. Make sure that deadlines are flexible when they need to be, and don't rush.

Another good way of dealing with impatience is to follow the best practices to the letter. If you do <abbr>TDD</abbr>, that's when <abbr>TDD</abbr> shines. Scale down and be meticulous, that way you'll avoid any big mistakes that will cause your gumption to leak out even more.

*The Pragmatic Programmer* lists many ways of working with incomplete information, especially when the client asks for estimates. But there is only one correct, bulletproof answer to all of those questions.

"I'll have to get back to you on that."

## Truth and muscle traps

Last up are the last two types of gumption traps: truth traps and muscle traps. We'll also wrap up with a description of the most destructive trap of them all, and one that is very difficult to get out of once you're inside.

### Truth traps

It's difficult to come up with organised groups of examples of truth traps, because they all are fairly individualistic in how they come about. However, in general, truth traps pop up when you find yourself in an "invalid state". You fall into a truth trap when your preconditions are such, that finding truth in your current situation is impossible.

This sounds quite cryptic, however elsewhere we discussed [The Tomato Game](https://intercaetera.com/posts/tomato-game/). It describes one scenario of a truth trap: when you are asked a binary question to which neither "yes" nor "no" are adequate answers.

*Zen and the Art of Motorcycle Maintenance* approaches this concept in a different, orientally-flavoured way of the Japanese "mu" (which, in essence, is the same thing as the Central-European-flavoured tomato, except in a more sophisticated, Eastern philosophical veneer. We Poles tend to be more down-to-Earth.) "Mu" means "no thing".

Knowing when you are in a "mu"-state is difficult to figure out, however there is one surefire way to both recognise you might be in one, as well as potentially avoid (inadvertently, always inadvertently!) putting your interlocutors in the same uncomfortable situation. It's very simple, too: avoid "why" questions.

"Why," as every eight-year-old with relatively strict upbringing knows, implies an accusation, and accusations are dangerous. "Why"'s place is in a court of law, against someone who is defiantly hostile towards you. In a partnership, when both parties are trying to cooperate and work on a common goal, it is best avoided.

The nice thing about truth traps, though, is that once you recognise you are in one, you can get yourself out of it fairly easily, as long as you put yourself into a habit of having a paper trail.

The basic definition of a "paper trail" here is "evidence that supports you in case of a potential accusation." Note the "potential." Having a fallback will give you gumption and courage to pursue the path of quality, even if the accusation never comes.

An example that comes to mind immediately is when a client asks about a feature she did not request previously, or requested it in a different way. She might be upset that you did not implement it they way she wanted, but as long as you have a paper trail of her initial description, you can nip the accusation in the bud, oftentimes before it even comes.

It goes without saying that you must be careful and courteous when pointing out to someone else that he or she has put you into a "mu"-state. It's not an occasion to grandstand— it's a polite pointing out of a breakdown in communication, something that you both must work on, because you both failed to communicate. Neither party wants to find themselves in a "mu"-state. You failed to ask for the right things, she failed to tell you the things she wanted.

When you find that you are in a "mu"-state, rephrase the question, look for a way out. It's probably not that far away.

### Muscle traps

Muscle traps (as in "muscle memory") in programming aren't quite the same as the ones in motorcycle maintenance, however, in general, they pertain to your tools and your environment. You can think of a muscle trap when you realise that, first of all, your process of programming is not comfortable or pleasant, or, more broadly, when you find yourself spending more time doing chores rather than solving problems.

When I am talking about "tools" and "environments" here, for once, I don't mean libraries. I don't even mean code—but rather your operating system, your text editor, your test runner, your source control, your continuous integration setup, your chair, your office lights. Everything that is not code but influences what you write.

I said this before, but I'm going to repeat it because it is very important: *know your tools*. More than that, use the best tools possible.

I think the best programmers underappreciate the impact of a good environment, mostly because they implicitly work towards reducing the unpleasantness. But when you're just starting out, or you are already quite experienced but still feel that something is not quite right, you might be a victim of a muscle trap.

Unfortunately, unlike value traps, muscle traps are not at all easy to get out of because they mean you did not put in the work to learn the motor skills of programming. Touch typing seems like something obvious, until you pair program with someone who can't touch type. Text manipulation at the speed of thought is natural if you've used Vim for a decade, until you look at someone using VS Code and pressing the down arrow thirty times to go down thirty lines. I'm exaggerating here, but not by as much as you might think.

There are technical limitations, too. I once heard of a team who had their environment set up in virtual machines on computers across the world. They would log into the virtual machine in the morning, code for roughly eight hours with breaks for coffee, meetings and profuse complaining about the code quality, and then log out, presumably questioning their life choices. They managed to survive like that only for a couple of months. They quit, citing "poor code quality" and "difficult atmosphere", but I guarantee that the clunkiness of the environment was at least what a scientist would call a "significant contributing factor".

I faced a similar situation when first switching to MacOS. The default choice of a terminal emulator on MacOS is called [iTerm2](https://iterm2.com). A very feature-complete (or, depending on your point of view, "bloated") application, it was used by nearly everyone in my company. However, working mostly in Vim with quite a few plugins, I found the terminal emulator to be slow. For me it was "very slow": a few milliseconds of delay too much upon each keypress doesn't seem like much, but it adds up when your normal typing speed is around 110 words per minute. Switching to Alacritty solved the issue, however it left me wondering how many people have these nigh-invisible gripes that are impeding their work, but are not nearly annoying enough to do anything about them.

Muscle traps is why I encourage every developer to at least attempt using Vim for an extended period of time. Initially, it's slow, awfully so, but the modal style of editing allows you to jump around text files far faster than you would in your clunky <abbr>IDE</abbr>. And once you can edit text fast, you remove a muscle trap that incrementally will yield gains. Granted, you will not notice them until you sit down to code with someone who has yet to remove that trap.

You might have heard professionals say that typing speed is not important in programming, because coding is just a minor part of programming. While I generally agree (because I claim that as well), the reason why it's not important *for them* (or *us*) is because they type fast enough or move around their <abbr>IDE</abbr> fast enough for it to not be an issue.

If you're a good piano player, finding the keys on the keyboard allows you to focus on the broader picture of the piece you are playing, not figuring out where middle C is. For a professional pianist, finding the middle C is muscle memory.

If it's not muscle memory for you, you're in a muscle trap. Learn touch typing. Learn *fast* touch typing. Learn Vim (or learn to move around your <abbr>IDE</abbr> if Vim doesn't cut it for your language, though it rarely doesn't).

## The worst trap

The final trap that I'd like to talk about is something Pirsig calls the "funeral procession".

> I watch the cars go by for a while on the highway. Something lonely about them. (...) Something about the car drivers too. (...) They all look like they're in a funeral procession. (...) The driving is different too. The cars seem to be moving at a steady maximum speed for in-town driving, as though they want to get somewhere, as though what's here right now is just something to get through. *The drivers seem to be thinking about where they want to be rather than where they are.* (...) Folks, I just forgot the biggest gumption trap of all. The funeral procession! The one everybody's in, this hyped-up, [screw]-you, supermodern, ego style of life that thinks it owns this country.

The emphasised sentence is key. There are many names for this feeling. The poetic names for this in the writings of the Catholic sages is "acedia" or "tædium." However, there is little place for poetry in modern corporate environment, so the funeral procession analogy seems to fit much better.

You are in a funeral procession when you have lost the feeling of purpose in what you're doing. When you feel like the code you're working on is not going to solve anything, or, worse, it's going to do harm. When you long for some kind of improvement in the future but without hope of getting there. When the process of creation feels like going through the motions. Funeral procession poisons everything else you do.

And the worst part is that we are rarely able to do anything about it. Funeral procession happens when the ratio of agency and accountability tilts heavily towards the latter and away from the former. It's a natural state of frustration for craftsman programmers — and something we've been able to avoid due to the organisational structure of "software companies." Because a "software company", really, is just a modern re-imagination of a medieval trade guild.

The structure of a guild— a loose association of craftsmen in a particular trade— stands in a very stark contrast to a modern corporation, which has different aims and different focuses. However, due to the very common business partnerships between software companies and corporations, the rigid hierarchy of the latter tends to bleed into the loose, quite informal, association of the former.

This wraps up our walk through the gumption traps in *Zen and the Art of Motorcycle Maintenance*. I hope this article brought you a bit closer to understanding how to persevere in the programming environment and excel in your craft.
