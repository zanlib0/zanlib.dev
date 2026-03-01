---
pubDate: 19 Feb 2025
updatedDate: 1 Mar 2026
title: Zustand Architecture Patterns
description: A short guide on how to make Zustand work in a team.
---

> Note: This article was originally posted on the engineering blog of my former employer, [Brainhub](https://brainhub.eu/library/zustand-architecture-patterns-at-scale).

Since the beginning of widespread React usage, the de facto standard state management library was Redux. It was almost synonymous with React—whenever you needed anything beyond the simplest state, you reached out for Redux. Application global state, data fetching logic and even forms were handled in Redux. It was often criticised for the large amounts of boilerplate, but regardless, Redux with its store folder, actions, reducers, selectors and thunks was almost omnipresent.

Over the years, other solutions to most common Redux patterns were introduced. SSR frameworks and [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) took over data fetching, [Formik](https://formik.org/) and [React Hook Form](https://www.react-hook-form.com/) are now the main ways to handle forms, and React hooks and context are the preferred solution to global state. The use case for a global state like Redux has slowly waned, but there still are some cases where a centralised data store with fine-grained subscriptions would be handy. Redux is still around (the boilerplate matter addressed with [Redux Toolkit](https://redux-toolkit.js.org/)), but the niche for its usage has shrunk significantly. It also has its own, more modern competitors, in libraries like [Zustand](https://github.com/pmndrs/zustand) or [Jotai](https://jotai.org/).

Over the past couple years, we experimented with various state management patterns across multiple large-scale React applications. We aimed to find solutions that give structure to the code and bring out the ergonomic benefits from separating state logic from the <abbr>UI</abbr> in React components. The patterns we'll discuss have not only scaled well technically but have also been easily adopted by new team members and have significantly reduced the cognitive overhead typically associated with state management.

While Redux has long been the de facto solution for React state management, our experience has shown that Zustand's flexibility and simplicity can offer significant advantages, particularly when dealing with complex state interactions. In this article, we'll explore these patterns in detail and show how they've helped us build more maintainable applications.

## State management architecture

Before diving into Zustand-specific patterns, it's worth examining what made Redux's architecture so compelling, and which parts of it are worth preserving. The event-based architecture pioneered by Redux remains valuable even as we move to more modern tools.

There are many different approaches to event-based state management systems, some inheriting their terminology from event sourcing or <abbr>CQRS</abbr>, others coming up with their own. The main element of this architecture is an _event_, which is a description of something that has occurred or will occur.

Once an event is to be processed, a _reducer_ is called, which is a function that describes the state change in response to an event. Reducers take the previous state and the event and return a new state. Reducers are also pure, meaning that they do not cause side effects, such as <abbr>API</abbr> requests or throwing exceptions. Whether there is one reducer for one or multiple events is an implementation detail. With Zustand there typically is one reducer per event, but other systems (like Redux) may have one reducer handling multiple events.

Events are created by _actions_ which are functions that are called from the view and decide which events should be created and sent to be processed by reducers. The difference between actions and reducers is that actions are not required to be pure. One action can create any number of events, all the way down to zero, if, for example, some kind of validation fails. Put another way, actions decide which events to dispatch, while reducers say what should happen to the state once an event has been dispatched.

There are further complexities to event-based systems—like timing concerns, actions creating events in the future, and so on—but these kinds of complexities are rarely, if ever, encountered when using them to manage state in front-end applications. The terminology varies between existing solutions (for example, in Redux the concepts described as events and actions above are called actions and action creators respectively), but this architecture is pretty universal to all of them.

## Zustand

Zustand is a bare-bones state management solution primarily used in React, though it can be used outside of React as well. While its most obvious point of comparison is Redux, Zustand preserves many of the architectural benefits while eliminating much of the ceremony. It provides a minimal <abbr>API</abbr> surface that can be built upon to create whatever level of structure your application needs. It is great in client-focused applications when the built-in state primitives like `useState`, `useReducer` and `useContext` don't cut it.

Let's take a look at an example Zustand store:

```js
const useStore = create((set) => ({
  widgets: 0,
  gizmos: 0,
  increase: () => {
    set((state) => ({
      widgets: state.widgets + 1,
    }));

    set((state) => ({
      gizmos: state.gizmos + 3,
    }));
  },
}));

function App() {
  const widgets = useStore((s) => s.widgets);
  const gizmos = useStore((s) => s.gizmos);
  const increase = useStore((s) => s.increase);

  return (
    <>
      <button onClick={increase}>Increase</button>
      Widgets: {widgets}, Gizmos: {gizmos}
    </>
  );
}
```

There are a few interesting features of Zustand on display here. The state and references to actions actually live in the same place. The boundary between actions, events and reducers is quite blurred—it's not like Redux's action creators and reducers that are often split into separate files, here everything is together (though it is possible to change it). With Zustand, we get pretty much everything we need out of a state management solution in a neat little package.

Unfortunately, there is also quite a lot of duplication. Each `set` function call looks quite alike, having the form:

```js
set(state => ({ ...state, /_ something _/ }));
```

Also, the state changes should be immutable. Unfortunately, <abbr>JS</abbr> makes this quite difficult, because we can either preemptively deep clone the entire state and make our modifications (which is inefficient) or we can use a load of spread operators to shallowly clone every level until we get to the desired depth (which is very verbose). Zustand recommends the use of some kind of immutability solution such as Immer or lenses to address this.

## Analysing the store

Looking at the `increase` function again:

```js
increase: () => {
  set((state) => ({
    widgets: state.widgets + 1,
  }));

  set((state) => ({
    gizmos: state.gizmos + 3,
  }));
},
```

We can identify the elements of the architecture outlined earlier here. `increase` is an action and the functions passed to `set` are reducers. The events in this case are anonymous: each `set` call creates a new event, and the event is handled by the function.

When using Redux devtools to inspect Zustand state, we can add event names and payloads by passing the third parameter to `set`, however this is only for development purposes. (The second parameter specifies whether to replace or shallowly merge state.)

```js
set(state => ({ /_ ... _/ }), false, { type: 'INCREASE_WIDGETS' });
```

There is a case to be made that the `increase` action shouldn't dispatch two events but actually the entire thing should be one event that is handled by one reducer.

```js
increase: () => {
  set((state) => ({
    widgets: state.widgets + 1,
    gizmos: state.gizmos + 3,
  }));
};
```

Whether to have an action dispatch multiple events, or have one action always correspond to one event is something of a philosophical question. In general, actions should only create multiple events if the events are unrelated to one another. In this case we are using completely made up state with no bearing on reality so it does not matter, but in real world we find that having one action create one event to be a good pattern.

This is further compounded by the React context in which we are calling actions and dispatching events. The component in which the action will be called has its own state that would help us decide whether an event should be dispatched. For example, the component might contain information about the validity of a form, and we should only dispatch an event if the form is valid. Passing all the information about the component state into an action and then having the action decide whether to dispatch the event is often unnecessary—having the component decide whether to call the action at all is much more ergonomic.

## Converting reducers to actions

Having one reducer handle only one event and assuming the convention of one action dispatching exactly one event allows us to cleverly abstract out the entire initial architecture. We can write the business logic of our state transitions in reducers and then use a simple mapper to convert them to actions. This is really nice because we can think of our state management logic completely separately from the <abbr>UI</abbr> and we can test it very easily since we are just dealing with pure functions that exist outside of any context.

```js
// reducers.js
export const increase = state => ({
  widgets: state.widgets + 1,
  gizmos: state.gizmos + 3,
})

// store.js
import \* as reducers from './reducers'

export const useStore = create(set => ({
  widgets: 0,
  gizmos: 0,
  ...convertReducersToActions(set, reducers)
}))

// component.js
import { useStore } from './store'

const Component = () => {
  const increase = useStore(s => s.increase)
  return (
    <button onClick={increase}>Increase</button>
  )
}
```

Here we can see that the logic inside the reducers is completely isolated from the <abbr>UI</abbr>. The reducers are also conventional, pure functions, that can be imported directly in our tests. They are not wrapped in a hook or dependent on some external `set` function. We do not need to do any complicated dependency injection or mocking to test them, they can just be imported in a test file and verified that they work as expected. We can also test compound <abbr>UI</abbr> patterns that consist of multiple events by sequentially applying the reducers to some kind of state.

On the other hand, assuming that the actions always dispatch events inside the React components allows us to ergonomically connect them to other sources of state, such as form or fetching libraries. We can dispatch actions conditionally based on Formik's form validation status or synchronise Zustand state with React Query. We delegate state-dependent conditional logic to those other sources of state, treating actions as simple side effect callbacks that we can run and forget.

The important glue between these two worlds—reducers as pure, testable <abbr>JS</abbr> functions and actions as fully integrated React callbacks—is the `convertReducersToActions` utility function. It looks like this:

```js
export const convertReducersToActions = (set, reducers) => {
  const entries = Object.entries(reducers);

  const actions = entries.map(([type, fn]) => [
    type,
    (...args) => set((state) => fn(state, ...args), false, { type, ...args }),
  ]);

  return Object.fromEntries(actions);
};
```

Fundamentally, given the `set` function from Zustand and an object of reducers, this utility converts reducers that have the form `(state, ...args) => state` into action callbacks with the form `(...args) => void`.

## Multiple stores

One of Zustand's greatest strengths compared to Redux is its ability to create multiple independent stores with minimal boilerplate. While Redux encourages a single store with multiple slices, Zustand's approach allows for more natural separation of concerns.

```js
// userStore.js
const setUser = (state, user) => ({ ...state, user });
const updatePreferences = (state, prefs) => ({
  ...state,
  preferences: {
    ...state.preferences,
    ...prefs,
  },
});

export const useUserStore = create((set) => ({
  user: null,
  preferences: {},
  ...convertReducersToActions(set, { setUser, updatePreferences }),
}));

// cartStore.js
export const addItem = (state, item) => ({
  items: [...state.items, item],
});

export const removeItem = (state, itemId) => ({
  items: state.items.filter((item) => item.id !== itemId),
});

export const useCartStore = create((set) => ({
  items: [],
  ...convertReducersToActions(set, { addItem, removeItem }),
}));
```

This separation provides several benefits. Each store can be tested and maintained independently, they can be lazy-loaded as needed, different teams can own different stores and performance optimisations become more granular.

Generally we've found it best to separate state into different stores when there is a guarantee that they will never need to interact, but because Zustand can be used outside of React, it's possible if there is such a need. In general, though, it is best avoided since that introduces very tight coupling between the stores. Instead we can get individual actions from different `useStore` hooks inside components and connect them on the component level.

## Lenses for immutability

While JavaScript makes immutable state updates verbose and error-prone, we've found functional lenses to be an elegant solution. Rather than reaching for libraries like Immer, we use a small collection of lens utilities that make working with nested state ergonomic, scalable and future-proof. If you're new to lenses, check out [our webinar on functional lenses in JavaScript](https://www.youtube.com/watch?v=uqXJoBFOdjw).[+lenses]

[+lenses]: Or, if you prefer to read, there is a comprehensive introduction to lenses [on this blog](/blog/lenses/).

In addition to lenses we can use function composition (such as lodash's `flow` function) that lets us compose individual pure reducers into compound state updates.

```js
import { flow } from "lodash";
import { lensForProp, over } from "./lens";

const widgetsL = lensForProp("widgets");
const gizmosL = lensForProp("gizmos");

const add = (a) => (b) => a + b;

const increase = (state) =>
  flow([
    (state) => over(widgetsL, state, add(1)),
    (state) => over(gizmosL, state, add(3)),
  ])(state);
```

We can also compose lenses for deep object access:

```js
import { lensForProp, set, compose } from "./lens";

const userPreferencesL = compose(
  lensForProp("user"),
  lensForProp("preferences"),
  lensForProp("theme"),
);

const updateTheme = (state, theme) => set(userPreferencesL, state, theme);
```

Lenses are an abstraction over immutable object access and as such provide several advantages over manual state updates or immutability libraries. Composable operations for complex state paths make it easier to separate the logic of accessing a nested field from the logic of updating it. Lenses can be reused across different reducers and if a field name changes, only a single lens needs to be updated rather than access logic across the code. We can also define more complex data access patterns using custom lenses and reuse them. Finally, lenses are simple yet powerful, there are no runtime dependencies and the entire implementation is about 15 lines of code.

## Conclusion

The patterns we've explored have proven themselves in production across multiple applications. By leveraging Zustand's flexibility while maintaining clear architectural boundaries, we've been able to build maintainable, scalable state management solutions that our teams enjoy working with.

The combination of pure reducers, automatic action creation, and granular stores has given us the best of both worlds: the simplicity and ergonomics of modern React state management with the predictability and testability of more traditional approaches.

Remember that these patterns are guidelines rather than strict rules. Adapt them to your specific needs, and don't be afraid to deviate where it makes sense for your application.
