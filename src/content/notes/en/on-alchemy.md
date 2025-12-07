---
pubDate: 7 Dec 2025
title: On Rory Sutherland's "Alchemy"
---

Quite messy set of notes taken while reading Rory Sutherland's book [_Alchemy_](https://amazon.com/dp/0753556529).

- Always listen to the client, but don't always do what he wants. He might have a solution in mind already instead of the problem. At least that's kind of the mantra. Sometimes even the problem statement is wrong, and the actual issue might be elsewhere. Don't ask for solution, offer solutions.
    - The smoke detector scenario—people liked them but didn't want more than one, turn up with five and ask if they want three or four.
- "Software engineering" is delivering value by means of code. "Alchemy" delivering value from thin air.
- People really don't like uncertainty and sometimes it's best to remove uncertainty than to increase performance if increasing performance is more costly.
    - It might be better to give an indication of expected time left, or progress in general, rather than work a lot to speed it up.
    - It might also be good to run a sanity check (and inform the user about it) before a big processing job - if someone knows stuff is unlikely to crash and he can get coffee.
        - Like that time some engineer went to get coffee to wait for a 30 minute pipeline just to realise when he came back that it crashed 3 minutes in
- Ensemble perspective vs time-series perspective
    - If a thousand people do something once, the result (or average) is going to be quite different than if one person does it.
        - QA and finding bugs is kind of like that often. There was a bug in one of my projects when we had some leftover data that appeared when you regenerated the schedules often, but devs during manual testing rarely did it because devs tend to work on a clean/recently seeded db.
    - "In maths `10 * 1` is always equal to `1 * 10` but in real life it isn't."
        - Shopping online you can make 10 people buy 1 thing, but it's harder to have 1 person buy 10 things.
        - Hiring 10 people will lead to a more complementary team than hiring 1 person 10 times.
        - If you had to only eat 1 food, you should choose potato, if you were allowed 10, potato wouldn't even register.
- You should try hiring interesting people ("reigning under 25 UK backgammon champion")
- "Complementary talent is much more valuable than conformist talent."
    - Teams become better when you hire a few people at once, because they can be chosen to be specialised rather than require everyone to be a jack of all trades (i.e. average in everything).
- "Every time you add, average or multiply something, you are losing information."
    - "A single rogue outlier can lead to an extraordinary distortion of reality" (Bill Gates entering a football stadium makes everyone on average a millionaire)
- Costly pre-interaction makes you more trustworthy
    - The fact that London black cab drivers have to go through "the knowledge" taxi license test means they are probably safe to leave your child with
    - You can use a costly messaging method (letter, FedEx) to make it more likely that your letter will be read. Especially if it contains something of value for the person who receives it.
    - Costly signalling works better than cheap. A coffee shop can signal with chairs outside that it's open. The signal is more costly than an "open" board in the door, but it is more effective.
- Water doesn't taste of anything so that you can figure out what's wrong with it.
    - Small deviations from the norm can cause you to start suspecting foul play.
    - It's very important to give the user as few quit moments as possible. We can trick ourselves into being productive with this as well.
    - "Effective communication always requires some degree of irrationality, because if it's rational, it becomes like water, entirely lacking in flavour."
- "Sometimes I have a £3.29 headache, not a 79p one."
    - A more expensive product communicates quality, regardless of its actual quality.
- Don't define parameters of success to narrowly, to allow room for creativity.
- We are drawn to reliable signals of honest intent.
    - Show that you care for the success of the project and you will get more leeway with how you work on tasks.
- Least worst appears better than best when things go wrong. 
    - If you choose a niche programming language like Elixir over JS/.NET/Java, if people aren't 100% on board, they might blame you over the smallest hurdles because it was not the obvious choice. On the other hand, even if you choose JS and it sucks, people will be ready to blame everything but their choice of the language.
    - This is the logic behind "No one ever got fired for buying IBM."
- People don't want objective savings, they want to know that they are getting a better deal than others.
    - It might be better to offer something at a higher price and offer deals, rather than just make the price low from the start.
- Sometimes you need to be quiet about the good stuff because the buyer will instinctively think that it comes at a cost.
    - Do refactors without telling anyone.
- Optimising parts doesn't mean the whole is optimised.
    - You can't hand each of the 9 parts of sudoku to a different person and ask them to solve the entire puzzle.
