---
pubDate: 2020-10-11T13:50:12.164Z
title: On React's Imperative Handles
---
By this point everyone invested in React should be familiar with hooks. Thanks to hooks we don't really need to use class components anymore, and the most common three: `useState`, `useEffect` and `useCallback` are second nature to many React developers at this point.

There are a few other built-in React hooks that are used far less and one of these is `useImperativeHandle`. Now, given that React prides itself in being very declarative, it might be quite surprising to see the i-word in there, but it is actually a really interesting case that might be the tool you need to get out of a situation where you need to modify a component from the outside or create a two-way binding and access its props from the top rather than from the bottom of the component hierarchy.

Note, though, that this is not something that you should do often. `useImperativeHandle` uses refs, and to paraphrase React docs on the usage of refs: you don't want to use them to "make things happen". It is also somewhat counterintuitive, given that refs are usually presented to intermediate React developers as the React equivalent of `getElementById`—a way to access a DOM node and operate on it directly.

With the `useImperativeHandle` hook we can use refs to access arbitrary properties using a mutable object.

## Example use case

This is an issue we faced in a real-life production React app.

I have two forms: one to provide params to download data from a third-party service into our application and another to upload that data, modified by the user. The forms are in tabs that don't get unmounted while the user stays on the page and are both mounted in the DOM tree at the same time.

The functionality we wanted to introduce was to modify the upload form once the user downloads data so as to save clicks—when the user targets a specific service to send the data to, the upload form will be automatically modified so that when a user opens it, it will already include some of the data.

That turns out a little more complicated than it sounds, mostly because the forms are siblings in the hierarchy and there is no logical way to share state between the two. And we don't really want to share state, either—the form modification operation is a "fire-and-forget" thing. The form state will be persisted if the page is closed, but if the user instead decides to open the upload form, she can modify it without impediment and no "parent state" should interfere.

We also use [formuj](https://github.com/intercaetera/formuj), my own React form framework based on [formik](https://formik.org/). Formuj has recently been updated with the ability to pass in an `innerRef`, somewhat similar to what formik has. That functionality uses React's `useImperativeHandle` under the covers.

## Solution

The API for the hook in question looks like this:

```jsx
useImperativeHandle(ref, () => value);
```

If we provide a `ref` from the outside, we can expect that it will have the `ref.current` key set to whatever we provide as `value`. That `value` does not have to be an actual value, but it can actually be a callback function from inside the component.

Indeed, it is as [easy as this](https://codesandbox.io/s/useimperativehandle-demo-9vid9?file=/src/App.js):

```jsx
const ref = React.createRef();

const InnerText = ({ innerRef }) => {
	const [text, setText] = useState('before');
	useImperativeHandle(innerRef, () => ({ setText }));

	return <p>{text}</p>;
}

const RefHandler = ({ innerRef }) => {
	const handleClick = () => innerRef.current.setText('after');

	return <button onClick={handleClick}>Handle Refs</button>;
}

const Outer = () => (
	<InnerText innerRef={ref} />
	<RefHandler innerRef={ref} />
);
```

Upon clicking the "Handle Refs" button the text will be modified by the `useState` function.
