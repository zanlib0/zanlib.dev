---
pubDate: 2020-02-24T19:29:34.836Z
title: Functional Ship of Theseus
description: When to stop refactoring.
---
The work of a programmer is much like the work of a sculptor. We are placed in front of a computer with a programming language out of which we can build anything, much like a sculptor placed in front of a block of marble can carve out anything. The only limitations are the skill of the craftsman and the flexibility of the material.

What is different though is that programmer has access to a cloning machine of sorts, the ability to reuse code. A sculptor can't exactly make one arm of his model and then reuse it for multiple different works.

How exactly did we came to value code reuse? How is it that reusable code is in our minds somehow superior to monolithic, non-reusable code?

## Poincaré's hierarchy of facts

In the 1908 book by Henri Poincaré *Science and Method* we can find the following passage:

> There is a hierarchy of facts. Some are without any positive bearing, and teach us nothing but themselves. The scientist who ascertains them learns nothing but facts, and becomes no better able to foresee new facts. Such facts, it seems, occur but once, and are not destined to be repeated.

There are, on the other hand, facts that give a large return, each of which teaches us a new law. And since he is obliged to make a selection, it is to these latter facts that the scientist must devote himself.

I suspect mathematicians and scientists are naturally drawn to simple and elegant proofs because the evidence presented in those proofs has a greater potential to prove valuable later on. We can see this hierarchy in nature as well: the structure of cells in living organisms is almost universal, even though the organisms themselves come in all shapes, sizes and environments. Similarly, going even deeper down, the structure of atoms is roughly the same for all of them, with the core surrounded by electrons. Yet, molecules of oxygen at greater scale behave very differently than molecules of iron.

Logically then, in programming, a function, class or module that does one thing and can then be reused in multiple places is a much more desirable entity than a monolith that only gives information about itself.

We might say then that the elegant proofs, the simple facts, the universal truths and the reusable code are of greater quality.

## Differences at the extremes

Let's look at a practical example. Let's say that you have a few places in our application where we need to execute database queries. As soon as the third occurrence of the <abbr>DB</abbr> query appears (according to the [<abbr>WET</abbr> principle](https://dev.to/wuz/stop-trying-to-be-so-dry-instead-write-everything-twice-wet-5g33)), you're going to rewrite the direct database calls into something that abstracts it more practically.

An example of this in <abbr>JS</abbr> might be the following piece of code which parses params into <abbr>SQL</abbr> and executes a database request:

```js
const executeSql = (sql, params) => {
    const parsedSql = Object.keys(params).reduce(
        (sql, key) => sql.replace(`&${key}`, params[key]),
        sql
    )

    return db.query(parsedSql)
}
```

Once you have a single reusable piece of code to run each of your database queries, you will be inclined to use it everywhere.

However, once you have a unified method to do something, the small differences start to show themselves. **Once you establish the rule, the rule starts to matter less than the exceptions.** 

In statistics, once you measure the mean value for a group and notice some differences between groups, those differences at the peak of the distribution end up being relatively insignificant. However, differences at the extremes of the same distribution turn out to be crucial.

Once you understand the structure, function and the rules that govern individual cells of all living organisms, the differences between them start to matter more than the rules themselves. Once you have the structure of the atom generalised, the differences in particular elements become more important than the structure itself.

Once you have a reusable piece of code, the cases which lie outside what you initially envisioned become the problem. You have effectively created the inversion of the initial problem of lack of reusability. That's the functional ship of Theseus.

## Solutions

Conceptually, this leads to infinite regress—if you were to have an infinite lifespan of the system and the size of the codebase tending off towards infinity. However in practice this never happens because, like with all of applied science, there always comes a point when a solution is "good enough".

Going back to the previous <abbr>JS</abbr> example, let's say that we create another couple of modules that want to execute multiple queries out of an array of parameters. In other words, if we provide an object as `params`, we run one query, but when we provide an array of objects as `params` we run a query for each of them.

In a statically typed language we'd use function overloading, but since we're using <abbr>JS</abbr> it's not that simple.

```javascript

const executeSql = (sql, params) => {
    if (Array.isArray(params)) {
        const parsedSql = params.map(paramsObj => Object.keys(paramsObj).reduce(
            (sql, key) => sql.replace(`&${key}`, paramsObj[key]),
            sql
        ))

        return Promise.all(parsedSql.map(query => db.query(query)))
    }

    const parsedSql = Object.keys(params).reduce(
        (sql, key) => sql.replace(`&${key}`, params[key]),
        sql
    )

    return db.query(parsedSql)
}

```

The above function clearly violates the single-responsibility principle but now accommodates the divergence that occurred with our new requirement of running multiple queries.

But now we are back to the initial problem that we no longer have a simple, elegant, reusable piece of code that does one thing. So we refactor it once more.

```js
const executeOneSql = (sql, params) => {
    const parsedSql = Object.keys(params).reduce(
            (sql, key) => sql.replace(`&${key}`, params[key]),
            sql
        )
    
        return db.query(parsedSql)
}

const executeManySql = (sql, params) => {
    const parsedSql = params.map(paramsObj => Object.keys(paramsObj).reduce(
        (sql, key) => sql.replace(`&${key}`, paramsObj[key]),
        sql
    ))

    return Promise.all(parsedSql.map(query => db.query(query)))
}

const executeSql = (sql, params) => {
    if (Array.isArray(params)) {
        return executeManySql(sql, params)
    }

    return executeOneSql(sql, params)
}
```

This is good enough for our current needs but it's not difficult to envision some other requirement that will necessitate further modification, further swapping of the parts and further refactoring.

Much like scientists who need to select facts to prove their hypotheses, we as software craftsmen must carefully select which pieces of our code need to be refactored and when is it a good time to stop. Our code will never be perfectly elegant and reusable, we just have to figure out when it is "good enough".
