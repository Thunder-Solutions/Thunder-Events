# Thunder Events

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A package for event scheduling needs and more.

This package allows you to cover event scheduling and more as built-in features of your website - no third parties necessary.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Future Plans](#future-plans)
- [Maintainers](#maintainers)
- [License](#license)

## Install

```
npm i @thundersolutions/events
```

## Usage

The main object is a default export.
```js
import ThunderEvents from '@thundersolutions/events'
```

There are two major steps to get your most basic needs up and running fast:
 1. The program-guide component
    - This is a convenient pre-built (theme-able) component that displays a schedule of events and more.
 2. The init function
    - This initializes the required data used by ThunderEvents.

First, define the component as a custom element in your JavaScript.
```js
customElements.define('program-guide', ThunderEvents.Components.ProgramGuideNative)
```
Next, simply add the component wherever it makes sense in your HTML.
```html
<program-guide></program-guide>
```
That's it for basic setup!  Now you just need some data to load into it.  ThunderEvents is built to be compatible with any project, as long as you provide the object in the shape it expects.  To do so, pass an async function as an argument to `ThunderEvents.init()`.

```js
ThunderEvents.init(async () => {
  const response = await fetch('/getDemoEvent')
  const data = await response.json()
  return {
    guide: {
      events: data.events.map(event => ({
        name: event.title,
        location: event.room,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        description: event.desc,
        host: event.hostedBy,
        category: event.label,
      })),
    }
  }
})
```
Seen above, the data is being mapped to the expected structure.  The only required field is `guide.events`, however there are multiple others that keep adding more power to your easy built-in schedule.

As far as theming goes, there are plenty of custom css properties which can be overridden, but here are a few basic ones to get started.
```css
/* general fonts */
--font: inherit;
--font-secondary: var(--font);

/* general colors */
--color-primary: lightsteelblue;
--color-primary-contrast: black;
--color-secondary: steelblue;
--color-secondary-contrast: white;
--color-tertiary: midnightblue;
--color-tertiary-contrast: white;
```

Read more in the [documentation](https://github.com/thunder-solutions/thunder-events/wiki).

## Future Plans

This project will soon expand to encompass more concerns of event organizing, such as managing tickets and check-in, and easy integration with a Thunder Solutions hosting service.

In addition to the native web components, we plan to add options for React, Vue, and possibly more.

## Maintainers

[@jonathandewitt-dev](https://github.com/jonathandewitt-dev)

## License

MIT © 2022 Jonathan DeWitt
