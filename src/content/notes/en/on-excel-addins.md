---
pubDate: 2021-01-21T17:18:45.365Z
updatedDate: 21 Jan 2026
title: On Excel Add-ins in React
---
In the beginning, programmers invented code. But businesspeople found code too complex, and they wanted something simpler. So programmers invented Microsoft Excel.

That's the abridged story of the creation of the world. The longer you work with code, the greater the chance you will meet someone in your day-to-day who uses Excel. And you will, very likely, have to deal with it.

Excel is a wonderful tool for all sorts of wonderful applications and we tend to forget just how ubiquitous it is until we find people who really do work with it every day and have for the past ten years. Only at that point do you start to understand how much can be done in Excel that would otherwise require months of programming in a more general-purpose tool.

Excel is great, but once you've done your fair share of work in it, you will find that it is quite clunky. Turns out most accountants share one trait with programmers in that they are lazy. So to alleviate the problem of repetitive tasks, Excel introduced macros and plugins. Eventually this infrastructure expanded into what ended up being "Office Add-ins".

The de-facto standard language for writing these for the longest time has been [VBA](https://en.wikipedia.org/wiki/Visual_Basic_for_Applications) - Visual Basic for Applications. Originally VBA was a fairly simple scripting language that over time grew into a really powerful solution that can communicate between Office apps, make <abbr>HTTP</abbr> requests and do a lot of other things. It is reminiscent of a similar story that developed with [AutoHotkey](https://en.wikipedia.org/wiki/AutoHotkey) which, too, started as a simple tool for simple purposes and evolved into a gigantic monstrosity of uncertain motivations.

Although unlike AutoHotkey, I suspect VBA might soon follow the path of another (as of this year) thankfully deceased technology - [Flash](https://en.wikipedia.org/wiki/Adobe_Flash_Player). The writing was on the wall for Flash when Apple decided not to include it on early generation iPhones, and the writing is on the wall for VBA when it turns out that it can't really run on browser versions of [Office 365](https://en.wikipedia.org/wiki/Office_365). So, instead of trying to port VBA, Microsoft decided to move to web technologies in order to support all the platforms. This is accomplished via a JS library called [Office.js](https://github.com/OfficeDev/office-js) that allows you to interact with different bits of Office UI. This is called "Office add-ins", not to be confused with the VBA Office Add-ins or another kind called COM Add-ins.

Yeah, Microsoft has never been great with naming things.

### Background

This is a case study of a commercial product that we did at work for an accounting company. The general point of this add-in was to communicate with another product that we have which exposes an API. The add-in pokes that API to download and upload various bits of data into the main app, effectively serving as a second front-end. We did not use any dedicated back-end for the add-in itself, opting to serve a compiled React app with Nginx. It also uses a third-party authentication service, since every user's data is individual to him or her. We've been working on this project for about a year now.

## Considerations before starting

The way you use the Office.js API inside Excel or any other Office application is through taskbar buttons, or an embedded iframe running a web app called a taskpane, or both. We attempted to integrate some functionality through the taskbar, but as of writing this post we couldn't figure out how to preserve authentication data or any kind of stateful information inside the functions that these buttons called. Seems like the taskbar buttons should probably only be used if you have fairly simple functionality.

Instead, we opted to package our add-in into a React single page application that is run from inside the Excel taskpane. From inside this app we can call our main application API just as if it were another front-end for it and we can make things happen inside Excel using the Office.js API.

There are a few advantages to this. The first being that we only really have to worry about Office integration once. The add-in, as mentioned previously, is a single page application that is deployed without a dedicated back-end somewhere on AWS. The way Office knows what page to load, and what domains should be considered a part of the app, is via a little file called [manifest.xml](https://docs.microsoft.com/en-us/office/dev/add-ins/develop/add-in-manifests?tabs=tabid-1). By opting to only use a single taskpane screen, we effectively eliminated the need to ever update that manifest file once it is in the user's hands. This means that any updates to the add-in can be done really quickly, without the need to update anything on the user's computer — our CI pipeline deploys new versions automatically and the user just needs to refresh the taskpane to get new changes.

There are a couple technical limitations as well. If you intend to run this on desktop Excel, it is important to remember that the taskpane is a browser iframe and as such your code will run in the operating system's default browser - Safari on Mac, IE11 on Windows. So you have to make sure that your build (e.g. Babel and Webpack) is configured to work with both of these browsers. You also have to ensure that all of your API requests are served over <abbr>HTTP</abbr>S. This might be a problem if you're running your API locally, so you might need to use something like [https-localhost](https://www.npmjs.com/package/https-localhost).

The taskpane also is about the size of a smartphone screen, so you might have to adjust your UI building patterns (there is a component library called [Fluent UI](https://github.com/microsoft/fluentui) from Microsoft that contains components consistent with Office design language). It is an interesting challenge, to design a UI with a screen size of a smartphone but that uses mouse and keyboard.

The distribution of these add-ins to end users is a little confusing. To start using the add-in on a Mac you need to place the manifest.xml file in the [appropriate directory](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-ipad-and-mac#sideload-an-add-in-in-office-on-mac). On Windows (which I did not have the misfortune to use for this) it seems a [little more complicated](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins). These are marked as "for development" in the documentation but frankly, we've been distributing the add-in like this to users and it seems to work for them without a hitch.

## Development tips

Developing an Excel add-in was a new experience for all of us and we had to come up with a number of solutions to problems which don't exist in regular web or mobile applications.

### State management

The default method of global state management in large React web applications these days tends to be [Redux](https://react-redux.js.org/). Although it tends to lose favour these days due to easier state management with hooks and [react-query](https://github.com/tannerlinsley/react-query), it's still a common sight to see every little bit of data downloaded from an API haphazardly thrown into global Redux state.

Global state has its uses in Excel, but you must remember that there is another state container that you have access to when developing an Excel add-in: Excel itself. Since the usage flow of our add-in is that the user loads data, modifies it and uploads it back to the API, we have decided not to save any data that might get modified in the add-in in Redux. There are some bits like global authentication state or some global data that gets fetched and stored in Redux, but typically that is not modifiable from within the add-in itself. All modifiable data is loaded into the grid and promptly forgotten by the web app.

### State persistence

One of the nice-to-have feature requests that we received was persisting state of the forms across loads inside the Excel files. In other words, whenever a user opened a workbook and made some changes inside the add-in, saved the workbook and sent it to another user, the second user would see exactly the same state as the first user when the workbook was saved.

To accomplish this, we used Excel [custom properties](https://docs.microsoft.com/en-us/javascript/api/excel/excel.customproperty?view=excel-js-preview), which are saved into the workbook on every form submission. What's crucial is that we only save the data that was entered by the user that is relatively small — parameters to download requests, mappings (more about these a bit further down), current location in the app. Everything else would be fetched from the API on load, however with this data we are able to retrace the user's steps every time the taskpane is opened and closed, and after a short loading screen we can get to exactly the same spot.

It is crucial that we do not save too much data inside the custom properties (so no automatic loading of Redux state, for instance), because these are saved into the Excel workbook file. Persisting too much data would cause the filesize to bloat significantly.

It's also worth remembering that the longest a custom property can be is 255 characters, so we ended up stringifying the state that we wanted to persist as <abbr>JSON</abbr> and cutting it up into 255-character-long chunks on save, and doing the reverse on retrieval.

### Error display

Fluent UI offers a [MessageBar](https://developer.microsoft.com/en-us/fluentui#/controls/web/messagebar) component for displaying errors and other various bits of information. With React, you can also use [my open source hook](https://github.com/intercaetera/react-use-message-bar) to simplify working with the library components.

### Automated testing

Apparently the automated testing of Office Add-ins is still an [unsolved problem](https://github.com/OfficeDev/office-js-docs-pr/issues/584). However, direct testing of library code is unlikely to be possible anytime soon, so for the moment I would just suggest to keep Office.js functions as encapsulated and separate from the rest of your React code as possible and then test everything else.

## Form handling

The application that we developed the add-in for was for the most part just a very robust <abbr>[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)</abbr>. Since we wanted to use Excel to cover the niche of directly loading large amounts of data into the app, we had to figure out some kind of way to map it from real world bookkeeping documents to data that could be consumed by our API.

To illustrate the issue more clearly, let us assume the following problem. Let's say that we have an Excel file with some data about restaurants in our area. We also have a model in our application for businesses of various types.

Our spreadsheet `Restaurants_in_Fakeville.xlsx` looks like this:

<table>
    <tr><td style="border: none;"></td><td style="border: none;">A</td><td style="border: none;">B</td><td style="border: none;">C</td></tr>
    <tr><td style="border: none;">1</td><td><em>Restaurants</em></td><td><strong>City:</strong></td><td>Fakeville</td></tr>
    <tr><td style="border: none;">2</td><td><strong>Name</strong></td><td><strong>Owner</strong></td><td><strong>Street Address</strong></td></tr>
    <tr><td style="border: none;">3</td><td>Alpha Restaurant</td><td>Alice</td><td>1626 Beeghley Street</td></tr>
    <tr><td style="border: none;">4</td><td>Bravo Foods</td><td>Bob</td><td>4052 Sundown Lane</td></tr>
    <tr><td style="border: none;">5</td><td>Charlie's Café</td><td>Charlie</td><td>4862 Marie Street</td></tr>
    <tr><td style="border: none;">6</td><td>Delta Grub Shack</td><td>Dan</td><td>3143 Brookview Drive</td></tr>
    <tr><td style="border: none;">7</td><td>Echo Takeaway</td><td>Eve</td><td>4633 Meadow View Drive</td></tr>
</table>

Whereas our model looks like this:

```typescript
type Business = {
    name: string,
    owner: string,
    streetAddress: string,
    city: string,
    type: 'RES' | 'SHP' | ...,
}
```

This presents us with two unique problems:

* The data in the Excel file might not be complete. In this case, there is no direct information about the type of the business (let's say that the restaurant type has a specific ID in our database, like `RES`). We also don't have the information about the city in every row, because all of the restaurants are in "Fakeville".
* The format of data inside the Excel files is not standardised. We cannot assume that the first row will always have headers (as is often the case with CSV files).

To remedy this, we created a form to define a mapping for every model that would be imported through the Excel add-in. We used [Formuj](https://formuj.intercaetera.com/) to generate these forms—and the library is especially well suited for this since every form consisted just of multiple instances of the same field.[+formuj]

[+formuj]: A note from the future: I strongly recommend _against_ using Formuj or any kind of mini-framework over forms that you think will make you write forms faster. This never ends well.

The `<FormField />` component that represented each field of the model consists of three parts.

* A `type` dropdown with options of "Manual", "Range" or "Cell".
* A `value` input which provides the link between what is in the sheet and what should end up passed to the model. The correct format of a value is determined by the `type` selected.
* A helpful button called `Set to selected`. This will set the value to whatever is currently selected inside the Excel window, with the format determined by the `type` selected.

The behaviour of the types is as follows:

* "Manual" — populates every field of the request with the literal value of the input field.
* "Range" — populates the fields with the values found in the range at the specified address. Before the values are sent off, we run a validation check that ensures that all range-type values have the same length.
* "Cell" — populates every field of the request with the value of the cell at the specified address.

This might be a little confusing, but once we apply this to the example above you will see how useful this kind of abstraction is.

First of all, we have data in a table for the business name, owner and street address. We will create Range mappings for each of them, respectively as `A3:A7`, `B3:B7` and `C3:C7`. We can type this manually or select the Range data type, highlight the range inside the Excel window and click `Set to selected`. (We might also want to be more specific, in which case `Sheet1!A3:A7` would be a correct mapping as well).

Secondly, we have data in the table for the city, but it's in one cell. We want to populate the value of that cell to all rows that we send to be saved, so we will map it as Cell type in `C1`.

Finally, we need to specify the business type as `RES` for all of these. Since we don't have that kind of data anywhere in the sheet, we will use the Manual type and put in `RES` as the value.

The final state of our form would therefore look like this:

```jsx
name: Range<"A3:A7">
owner: Range<"B3:B7">
streetAddress: Range<"C3:C7">
city: Cell<"C1">
type: Manual<"RES">
```

With some clever parsing afterwards (using the [Office.js API](https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-ranges)) to read values from ranges on submit we can send this data off to our API in the correct format to be validated and saved.

## Conclusion

Office add-ins are an interesting new area for web development. Working with Excel doesn't sound super cool in these days of machine learning, cloud native applications, [supersonic hedgehog brothers and ready-sliced golf shots](https://youtu.be/HBURlcNpfoo?t=218), but the challenge is definitely there and a lot of it is still unexplored territory. Once you can get past the initial pain of setting it up, working with Office add-ins can definitely be very rewarding.
