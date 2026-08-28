---
pubDate: 2026-03-19
title: On "Domain Modeling Made Functional"
---
Below are my rough notes on the Scott Wlaschin's book _Domain Modeling Made Functional_. I read it almost immediately following Khononov's _Learning Domain Driven Design_, so a contrasting analysis might be in order here.

First, compared to [_Learning <abbr>DDD</abbr>_](/blog/on-learning-ddd), this one is much more concise about the domain discovery part of the process, but it is still very much complete. It goes through the process of exploring a domain with domain experts quite concretely on a fictional example of an order-taking <abbr>B2B</abbr> business process. Afterwards, we learn implementation strategies of the discovered domain, and in the last part there is a brief discussion of how the domain is to be evolved later.

It's a bit unfortunate that the last part is so short, taking up maybe twenty pages, because in <abbr>DDD</abbr> systems it seems like that indeed is the most complicated part.

I was concerned about how understandable the code listings would be in the book - F# is a language I hadn't seen before and while the book did not venture into any obscure territory and it was on the whole quite easy to follow, though this was very much helped by getting familiar with OCaml during last year's Advent of Code. Without that I think some elements of the language would be quite a bit harder to understand.

F# itself seems to be quite similar to OCaml on the Lisp-Haskell spectrum of the functional strictness, which makes me wonder how this topic could be approached in a more strict language (like indeed Haskell), versus a more dynamic language like Clojure or Elixir.

Another concern that I had about the code presented in the book is that the domain that was explored was on the whole rather simple and while the exploration of the concepts was presented clearly, the code itself became quite verbose. Especially the transformation logic for serialising and deserialising data occupies what feels like unjust volumes of content. I believe part of it is due to the relative immaturity of the F# ecosystem - I suppose in other languages much of this ceremony would be handled by some kind of library. It does have the benefit of exposing the process to the reader, though it is worrying how verbose the code for a more complex domain process would be.

On the whole I found the book much more interesting than _Learning <abbr>DDD</abbr>_ and would certainly recommend it to any functional programmer who is struggling to transform the concepts of the business into the code.

## Notes

- Persistence ignorance is the idea that you avoid thinking about <abbr>DB</abbr> design while designing your domain.
- Just because the design is strict doesn't mean that the implementation has to be strict.
- <abbr>DDD</abbr> concepts and terminology.
	- **Domain object** is an object designed for use only within the boundaries of a context, as opposed to a <abbr>DTO</abbr>.
	- **<abbr>DTO</abbr>** (data transfer object) is an object designed to be serialized and shared between contexts.
	- **Shared kernel**, **customer/supplier**, and **conformist** are different kinds of relationships between bounded contexts.
	- **Anti-corruption layer** (<abbr>ACL</abbr>) translates concepts from one domain to another to reduce coupling and allow domains to evolve independently.
- Aggregates.
	- A collection of domain objects that can be treated as a single unit, with the top-level entity acting as the "root."
	- All changes to objects inside an aggregate must be applied via the root, which acts as a consistency boundary.
	- An aggregate is the atomic unit of persistence, database transactions, and data transfer.
- Smart constructors: make the constructor private and have a separate function that creates valid values and rejects invalid values, returning an error instead.
	- In F#: `type UnitQuantity = private UnitQuantity of int`—the `private` keyword prevents construction from outside the containing module.
- Ensuring data integrity.
	- Smart constructors for simple types + "making illegal states unrepresentable" for complex types = many integrity rules enforced by the type system itself.
	- Leads to more self-documenting code and less need for unit tests.
	- Unless you are working within a single aggregate, design for eventual consistency rather than immediate consistency.
- Modelling workflows with types.
	- Use types to model each substep of a workflow, representing input and output states, and document dependencies and effects of each step.
	- State machines can model documents and other entities with life cycles.
	- The goal is executable documentation—code that communicates the domain.
	- If we didn't create distinct types for e.g. a validated order vs. a priced order, we'd still have to document the difference somewhere—why not in the code itself?
- Total functions: functions where every possible input has a corresponding output, with no exceptions.
	- We want to make things explicit, with all effects documented in the type signature.
	- A function `twelveDividedBy : int -> int` that throws on zero is lying—the signature implies every int returns an int, but sometimes you get an exception instead.
	- Two techniques to make a function total:
		- Restrict the input: use a constrained type like `NonZeroInteger` so that zero is not a valid input at all—the signature `NonZeroInteger -> int` doesn't lie.
		- Extend the output: accept any int but return `int option`—the signature `int -> int option` is honest about the possibility of no result.
- Function composition and type mismatches.
	- A common problem: one function outputs e.g. `Option<int>` but the next function needs a plain `int`, or vice versa—similar issues arise with lists, Result, async, etc.
	- The approach is to convert both sides to a common type—the "lowest common multiple."
	- E.g. if `add1` returns an `int` but `printOption` expects an `Option<int>`, wrap the output with `Some`: `5 |> add1 |> Some |> printOption`.
- Implementation techniques—three important <abbr>FP</abbr> patterns for composing pipeline steps:
	- **Adapter functions**: transform a function's "shape" to match what's needed—e.g. converting a bool output to a domain type.
	- **Lifting**: convert disparate types into a common type so they can be composed.
	- **Partial application**: bake dependencies into a function so it composes more easily and hides implementation details from callers.
- Error classification—three groups:
	- **Domain errors**: expected as part of the business process, must be included in domain design (e.g. order rejected by billing).
	- **Panics**: errors that leave the system in an unknown state (out of memory, divide by zero, null reference).
	- **Infrastructure errors**: expected as part of the architecture but not part of the business domain (network timeout, auth failure).
- Applicatives are similar to monads, but rather than chaining monadic functions in series, they combine monadic values in parallel.
	- Useful for validation: collect all errors rather than short-circuiting on the first one.
	- In the presented examples, applicatives work by lifting a multi-argument function into a context (using `map`), then feeding it wrapped arguments one at a time (using `apply`)—each `apply` peels off one parameter and combines the contexts independently—no value needs to be unwrapped before the next one can proceed.

```haskell
createUser :: Name -> Email -> Age -> User

validateName  :: String -> Validation [Error] Name
validateEmail :: String -> Validation [Error] Email
validateAge   :: String -> Validation [Error] Age

fmap createUser (validateName "Bob")
-- :: Validation [Error] (Email -> Age -> User)
-- The partially applied function is now inside the `Validation`.

createUser <$> validateName "Bob"
           <*> validateEmail "bob@example.com"
           <*> validateAge "30"
-- :: Validation [Error] User
```

- Type-safe error handling: using Result types in function signatures adds some awkwardness to composition, but pays for itself in confidence that all pipeline components work together.
	- The main pipeline implementation stays clear—no ugly error-handling code disrupting the flow.
- Persistence guidelines.
	- Push persistence to the edges.
	- Separate commands (updates) from queries (reads).
	- Bounded contexts must own their own data store.
- Persisting domain data into a database.
	- For a non-relational database like Mongo, you can just serialize the objects into <abbr>JSON</abbr> and save it this way.
	- For a relational database.
		- Product types can just be stored as columns, specific type aliases need to be mapped on entry and exit to their primitive counterparts.
		- When mapping sum types there are two ways to do it.
			- All cases live in the same table—there are additional bool columns that indicate which branch of the sum type is used, and the actual values are set to nullable.
			- Each case gets its own table, the main table still has bool columns that act as flags, but the data is joined instead—the benefit is that we can enforce e.g. non-nullable constraints.
		- Mapping nested types to tables.
			- If the inner type is a <abbr>DDD</abbr> entity with its own identity, it should be stored in a separate table.
			- If the inner type is a value object, it should be stored inline with its parent data.
		- The suggested approach for reading from the database is to use a `toDomain` function that deserialises the data from the database into a domain object.
			- The deserialisation logic can either return a result type or, if we are reasonably certain that the validation ought to pass, it can panic.
		- Similarly, to write to a database we write the serialisation logic ourselves and build the required "primitive" object that can be inserted by our database driver.
	- If we are tempted to do transactions across aggregate boundaries, the better approach is to instead do a compensating action in case one of the inserts fails.
- Evolving an existing design.
	- In short: use the type system to guide you, whenever you update anything the types should tell you what the errors are.
