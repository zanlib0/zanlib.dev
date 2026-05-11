---
title: Number Inputs in React
pubDate: 11 May 2026
description: The perils of restricted input
---

Inputs in React are conceptually very simple creatures. The user types something, that value lives in the form state until ready to be submitted, optionally there is some validation, and the form is submitted with some data. As long as you follow this pattern, there are very few things that are likely to break.

The most common case when one has to deviate away from the simple ways of unrestricted input is when the user is required to type in a number. Ideally, we would have a native element, or perhaps an [input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number) that could be used for this purpose, in a platform-native, accessible, and useful way. Regrettably, [no such input type exists](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers).

There is quite a lot of advice on the internet on how to use native <abbr>HTML</abbr> inputs to provide numbers, and it seems like the industry consensus has landed on `<input type="text" inputmode="numeric" pattern="[0-9]*">` as the sensible default. However, in a rich client application there are many more concerns that we have to handle. In a React app, the user's input is threaded through multiple change event handlers, client-side state, form library validation and finally the final submit event. During this time, the user expects some guarantees: such as a typo not being accepted, or potentially unwanted copy-paste artefacts being cleaned up.

Unfortunately, the pattern I've seen far too often is just this:

```jsx
<input onChange={e => setState(Number(e.target.value))} />
```

And then there were bug reports of `NaN`s spotted in production. Fiddlesticks.

## Kinds of inputs

In general, there are two main cases that shape how much ceremony is required when dealing with number inputs.

The first case is the standard form field, when the user manifestly means to perform data entry to the server by means of a form. This means primarily keyboard-centric flow, unrestricted input, ample space for validation messages, accessibility requirements and final big parse and submit at the end.

The second case is a restricted input in some kind of rich workflow or tool. Consider some kind of [`react-flow`](https://reactflow.dev/) node with coordinate inputs, parameter editor in some kind of professional video-editing software, a spreadsheet cell, and so on. There is not much space to display error messages and repeated calling of the <abbr>API</abbr> is cumbersome and impractical.

It's a good idea to think which of these two worlds our input is meant to inhabit, as that will concentrate logic in different stages.

## Lifecycle

There are roughly eight relevant stages of input lifecycle, which this article will go through in order and outline concerns present for each of them. Not all of the concerns need to be immediately addressed; it might be a good idea to think critically on whether they even have a chance of impacting the application's intended audience.

- Stage 0: Attributes on the input itself and the kinds of inputs to use
- Stage 1: `onBeforeInput`—keystroke not yet committed
- Stage 2: `onChange`—value just changed, draft state updates
- Stage 3: `onPaste`—clipboard cleanup
- Stage 4: `onBlur`—the user goes to another input
- Stage 5: Form-level validation on change
- Stage 6: Parsing on submit
- Stage 7: Server-side data model and validation

When dealing with validated inputs, most of the effort will be shifted towards the later stages, because they carry more information at a greater <abbr>UI</abbr> cost, while restricted inputs will focus more on the earlier ones since there is much less wiggle room with the screen real estate.

## Attributes on input

This is what is set declaratively on the input before anything has a chance to fire.

`type="text"`, not `type="number"`, is generally favoured even for pure number inputs. There is hardly ever a reason for the latter, because it provides almost no guarantees about the value inside, while causing much grief to the developer and the user. If you _have_ to use `type="number"`, it's important to know that `min`, `max` and `step` values don't constrain typed or pasted input, only spinner buttons—validating that the input value conforms to the expectations is still on you.

The `inputMode` attribute hints to the browser what kind of virtual keyboard to display, hence it's chiefly aimed at mobile users. `numeric` and `decimal` are the most common options, used for integers and floats respectively. Take care that `decimal` input mode might show either `.` or `,` as the decimal point, depending on the user's locale.

 `pattern="[0-9]*"` reportedly nudges i<abbr>OS</abbr> into showing the numeric keypad reliably, as a life-long Android user I couldn't possibly comment.
 
`enterkeyhint` can be used to relabel the mobile Enter key if necessary. This is rarely needed, but a cool party trick. Note that only a [limited set of values](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/enterkeyhint#value) is allowed.

The `name` field is frequently used by form libraries to automatically derive field keys, but is also used by the browser's autocomplete when filling in saved forms.

`autoComplete`, apart from commonly known on and off values, also accepts a few others which hint at how the field might be pre-filled. A value worth knowing here is `"one-time-code"`. If using an <abbr>SMS</abbr> one-time code, the code from a received message will be automatically displayed on the virtual keyboard for one-tap fill.

`autoCorrect="off"` and `autoCapitalize="off"` (and to a lesser extent `spellCheck={false}`) are useful attributes to add when dealing with identifier-like fields such as usernames or codes, which might also have restricted character sets.

Label association: either `htmlFor` or wrapped in `<label>`. This is very important. Also avoid using `placeholder` as a label.[+placeholder]

[+placeholder]: Placeholder text disappears the moment the user starts typing—there is no reminder of what the field is for. It also tends to have poor contrast against the input background, and screen readers don't reliably announce it. The "floating label" pattern from Material was an attempt to recover the affordance, with mixed results.

Aria attributes `aria-describedby` and `aria-invalid` for helper text and validation state respectively. Some component libraries handle this out of the box; otherwise, it's good to set them by hand.

When dealing with dates, it's [usually better](https://design-system.service.gov.uk/components/date-input/) to use three separate number inputs for day, month, and year instead of using complicated date pickers. Especially when you're asking for dates far in the past: when putting in my date of birth, I'm not particularly keen to scroll decades into the past in your fancy date picker.

## Before input

In the `onBeforeInput` handler, the keystroke is not yet committed. It can be used to decide whether an input is to be allowed. There are two key fields on this event: `data`, which tells you _what_ the user is trying to input (or delete, in which case it's going to be `null`) and `inputType`, which is _how_ he is trying to do it. There are [quite a few](https://w3c.github.io/input-events/#interface-InputEvent-Attributes) options for the `inputType`; however, unless you're building some kind of rich-text editor that does advanced manipulation of the user's inputs, it's unlikely that you're going to need to handle all of them.

When working in a form-validated input, this event handler can be skipped in most circumstances. It comes in handy for filtering invalid characters in restricted inputs, though, because it's a good place to allow only whitelisted characters (digits, optionally hyphen and dot).

An overlooked, though uncommon, pitfall here is <abbr>IME</abbr> composition, which is the input method used chiefly in East Asian languages like Chinese, Japanese or Korean, to compose characters. <abbr>IME</abbr> composition can also be used to input numbers, though it's up to you and your intended audience whether you choose to allow inputs like "１２３" instead of "123."[+normalisation] You can look at the `inputType` value `insertCompositionText` to check this. To test <abbr>IME</abbr> composition on your own machine, typically just installing a Japanese keyboard is enough. On Linux, [Fcitx5](https://wiki.archlinux.org/title/Fcitx5) is a common piece of software used for this. やった！

[+normalisation]: If you're likely to support this kind of usage, consider [normalising](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) the strings as they hit your state. Alternatively, for a truly world-wide audience, you can take the [base-ui approach](https://github.com/mui/base-ui/blob/master/packages/react/src/number-field/utils/parse.ts) of normalising absolutely everything.

When dealing with an input with known length, such as a credit card number, <abbr>PIN</abbr> or a one-time password, this handler a good place to prevent the user from typing too many digits.

## Change

`onChange` is the React event handler most commonly associated with inputs. This is the code a student of React first writes, a showcase of the magic of reactivity:

```jsx
const App = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        value={value} 
        onChange={e => setValue(e.target.value)}
      />
      {value}
    </div>
  )
}
```

Yet, sometimes it seems like `onChange` is the _only_ event handler that seasoned React developers know, and as such try to use it to do everything. That is not a good idea.

Typically, it's a bad idea to store anything other than the raw string input as state. Doing any kind of `Number` casting, or `parseInt` inside the state setter is a recipe for disaster. You can handle parsing later—for now, the value of the input should be a string, just as the user is typing it.

Similarly, you should take care to allow mid-typing states, like "`1.`," "`-`," "`0.0`," or, perhaps most importantly, the humble empty string "`""`". There are few things as frustrating as not being able to clear a number input because the developer assumed that it will always contain a valid number.

The `onChange` handler is sometimes used to handle validation, and there are good and bad reasons to run validation on change (rather than on blur). However, when validating on change, it's important to avoid sudden interface jumps, for example when the user is in the middle of typing and one of the mid-typing states trips the validator. If you're validating on change, make sure the space for potential errors is reserved in the vicinity of the input.

It's also a bad idea to reformat the value (for example by adding brackets and hyphens in the case of phone number or credit card number inputs) unless you're also managing the caret. In practice, these kinds of inputs are significantly more involved than simple restricted inputs, and most common cases have existing libraries. That said, if you're keen on building your own, it's very important to avoid jank by correctly handling the position of the caret when typing, deleting, and pasting.

## Paste

`onPaste` handler can be used to intercept the user's deliberate action of pasting a value and doing some cleanup.

Usually the user will be pasting from a plain-text source, but sometimes the text might have been copied from a <abbr>PDF</abbr> file, a rich-text document, or maybe an Excel spreadsheet, which can pollute the paste data with additional characters such as white space, formatting Unicode characters or other invisible rubbish. It's a good practice to clean that up. Same caveat as live reformatting mentioned in the previous stage: if you reformat the pasted value, make sure to manage the caret.

If the number comes attached with a unit, such as a currency symbol or a percent sign, and you expect the user only to input, say, `50`, while the `%` is a label hint somewhere to the side, if the user pastes `50%`, the `%` from the pasted value should probably be stripped as well.

Another often-overlooked, though significantly more common, culture-specific phenomenon is locale-aware decimal parsing. While <abbr>IME</abbr> composition is a fairly niche use-case, English-speaking continental Europeans are more common users of `en-US` software, and we might be pasting `12,50` from our bank statement <abbr>PDF</abbr>s, intending it to mean `12.50` in your application. `1,234` is a different number in Poland, and a different number in the <abbr>US</abbr>.

In validated inputs, paste should generally always work, cleaning up the user-submitted data from common problems, and if there are other issues, that is a task for the validator. In restricted inputs, on the other hand, if there is anything wrong with the data after cleanup, it should be rejected—possibly with some additional feedback, like a shake animation.

## Blur

`onBlur` fires when the user moves focus away from the input and is the first chance to format the value without interrupting the user. There are trade-offs, though: if you surface validation at this point, the user has to move back to correct it. There are some advanced <abbr>UI</abbr> patterns to mitigate that, such as debounced input, or validation firing when the expected length of the input has been typed in, but on the whole we seem to have accepted this as a reasonable approach.

Some developers choose to run form-wide validation only on blur, instead of on change, which typically leads to better perceived performance in large forms, since only the input has to be re-rendered as the user types, and a validation re-render happens after the user moves away from the input. However, as mentioned, it delays the feedback.

This is a good point to parse the string draft into a canonical value and surface errors that couldn't have been caught by looking just at the string, for instance the number being too large, or not allowed.

In restricted inputs, this is a good point to clamp the value to a desired range. This is not a good idea in validated inputs—in those cases it's typically better to inform the user of an error, but when screen real estate is at a premium, the change can be performed silently.

When running validation on blur, we can also choose to cache string values in local state, while lifting the canonical value to the parent state (i.e. parent component, form library, global state, &c.). It's also a valid approach, but we need to be aware of the trade-off of delayed validation feedback. For forms where performance is at a premium, and we cannot compromise on user experience by delaying feedback, we can rely on field-level validation performed locally on the string draft on change, while delaying form-level validation to the `onBlur` handler.

## Form-level validation

This is what form libraries like React Hook Form or Formik do continuously. There are many different approaches to this, each with its own benefits and drawbacks, so it's a good idea to consider what is important.

The most straightforward method, from the development point of view, is to use a schema validation library such as [Yup](https://github.com/jquense/yup), and define the entire validation logic inside the schema. This seems to also be the most commonplace. The downside to this approach is degraded performance, as the entire form is validated every time.[+validation]

[+validation]: The industry practice for on-change validation is to continuously validate, but to show the error only after the field has been blurred at least once. Formik, for instance, handles this by means of the "touched" prop, in which case error messages are not to be displayed until the corresponding field has been touched. After that, any edits will trigger validation as the user is typing. Since the validation runs for the entire form, every time the user types a character, the parent component rerenders numerous times, once for each keystroke.

If the form library distinguishes field-level (on change) and form-level (on blur) validation, it's important to keep field-level validators as simple as possible and prevent expensive computation running on every keystroke. If the form library does not support that natively (Formik, e.g.), this can be approximated by running validation on blur, caching values in local field state, and hand-rolling validation there.

This is also the point where field-dependent validation is defined, such as the `min` field being less than the `max` field, and so on.

## Form submission

`onSubmit` is the point where we parse our own form state into the format expected by the backend. 

Any kind of transformation of the data should happen here. As far as type coercion is concerned, generally schema validation libraries will have a function to convert the types of individual fields into those defined inside the schema (Zod has `z.coerce.number()`, Yup has `.transform()`). Apart from that, we might change more complex values into formats expected by the backend, for instance converting <abbr>JS</abbr> maps and sets into <abbr>JSON</abbr> objects or arrays.

This is also the last point where concerns such as locale parsing or string draft clean-up can happen. Just like in the `onPaste` stage, if your application supports multiple locales, here you must clean the inputs up and make sure that something like continental `"1,234"` is converted into `en-US` `1.234`.

Here also we can apply defaults to optional fields. It might be tempting to populate default values from optional fields from the start, but that's rarely a good idea. An empty optional field means something different from an invalid one. Besides, seeing a form pre-populated with data might signal to the user that he is actually editing some pre-existing state, even if he might actually be adding something new. Not to mention that screen readers will pick it up as if the user had entered it.

By this point, every concern from the earlier stages has either been resolved, or deliberately deferred to here. The pattern of keeping a string draft in our form state instead of a number pays off here: parsing happens once, with full context. If anything fails, we have a string that can be handed back to the user unchanged to be fixed without resetting the entire form.

## Server-side validation

Finally, the data reaches the server and needs to be validated one final time, using all the business rules that concern it. It goes without saying, but we must never trust the client, even if validation passed. The client can be bypassed: the easiest way to do this is by going into the dev tools, choosing the request that was submitted, selecting "Copy as fetch," pasting into the console, changing some values and submitting again. In case of the client being deployed separately from the server, the client code might just also be out-of-date.

Before validating, it's important to consider how the value is stored—whether to store it as a number or as a string. A good rule of thumb is: "if you don't do arithmetic on it, it's not a number." Rather, it's a string that happens to use digits. The list of things that fall under this is longer than many realise, and includes many things ordinarily called "numbers." Credit card numbers, phone numbers, zip codes,[+zipcodes] postal codes, order numbers, version numbers, bank account numbers, employee identifiers, numbers of bus or train lines are all called "numbers," but are in fact strings.

[+zipcodes]: In the <abbr>US</abbr> many New England zip codes start with zero, giving yet another reason to avoid storing it as a number.

While we still use numeric `inputMode` for many of these values, the data is a string. On-the-wire format matters here, too. The backend expects a string, ideally with a clear schema.

If there are field-level errors, they should be returned in a structured shape, so that the form library can map them back to the right input, and they can be displayed where relevant to the user. Forms usually should also include a dedicated message bar indicating a larger form-level error if present, without resorting to an ephemeral toast that disappears after a few seconds.

Finally, there's the matter of race conditions. The "submit" button (or whatever else is used to confirm that the data is to be sent to the backend) should become immediately disabled while the form is submitting. If the form has asynchronous validation running in earlier stages, such as debounced server checks for username availability, the submit handler can race against it. The two kinds of validation can arrive in the wrong order. It can be mitigated by always treating the form-level validation as authoritative, or by using newer browser <abbr>API</abbr>s such as `AbortController`.

## Picking your battles

That seems like a lot of work for the simple task of handling a _number_! But the point of my walking through the lifecycle this way is not to suggest that every number input deserves the full treatment. Instead, it's a rough sketch of where each concern naturally lives, so that when you do encounter one, you put it in the right place, rather than wedging it into `onChange`, because that's the one handler everyone remembers. 

Likewise, for highly specialised and customised use cases, this list merely scratches the surface of the concerns that might be particular to them. There are somewhere in the neighbourhood of thirty different event handlers that are practically relevant to a simple `<input>`—most developers have likely never heard of them.

For restricted inputs—minor fields in more complex tools or a parameter knob—where screen real estate is at a premium and there is nowhere to reliably display error messages, most of your work happens in stages 0 through 4, and you can largely ignore the form-library machinery further down. For a typical validated form, the heavy lifting is in stages 4 through 7, and the earlier stages are mostly about not getting in the user's way. For high-stakes forms, wherever there is something that might cost the user real money, you do all of it, and you don't cut corners. If a user submits something wrong because of badly designed or implemented <abbr>UI</abbr>, it might not be your _fault_, but it certainly will be your _problem_.

The pattern that ties it all together, if there is one, is: keep the user's input as a string for as long as possible. Everything else is just plumbing.
