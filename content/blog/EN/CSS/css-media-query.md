---
title: '[CSS] CSS Media Queries and Responsive Design'
date: 2021-04-10 15:05:98
category: CSS
thumbnail: { thumbnailSrc }
draft: false
---

### What is Responsive Web Design?

Responsive web design ensures that a website provides an optimal viewing experience across a wide range of devices, from desktop to mobile phones. This involves adjusting the layout and styles according to the device's screen size.

<br/><br/>

### Media Queries

#### Applying Media Queries

1. **Using &lt;link&gt; Tag**
   The `<link>` tag in the `<head>` section applies a CSS file when the conditions specified in the `media` attribute are met.

```html
<link href="style.css" media="screen and (min-width: 512px)" rel="stylesheet" />
```

2. **Using &lt;style&gt; Tag**
   The `<style>` tag can directly apply styles when the conditions in the `media` attribute are met.

```html
<style>
  @media screen and (min-width: 512px) {
    p {
      width: 300px;
      height: 100px;
    }
  }
</style>
```

3. **Using &lt;style&gt; Tag with @import**
   The `@import` rule within a `<style>` tag loads a CSS file when the media query conditions are met.

```html
<style>
  @import url(style.css) screen and (min-width: 512px);
</style>
```

4. **Directly in CSS Files**
   Write media queries directly within CSS files to apply styles when conditions are met.

```css
@media screen and (min-width: 512px) and (max-width: 1024px) {
  p {
    width: 200px;
    background: #ffffff;
  }
}
```

<br/>

#### Media Query Syntax

Media queries consist of an optional **media type** and any number of **media feature expressions**. You can combine multiple queries using logical operators. Media queries are case-insensitive.

1. **Media Types**

   - **all**: Suitable for all devices.
   - **print**: Intended for paged material and documents viewed on a screen in print preview mode.
   - **screen**: Intended primarily for screens.
   - **speech**: Intended for speech synthesizers.

   Media types are optional unless using logical operators like `not` or `only`.

2. **Media Feature Expressions**

   Media features describe the characteristics of the user agent, output device, or environment. Each feature expression is wrapped in parentheses and may include:

   - **width**: The viewport width including scrollbars.
   - **height**: The viewport height.
   - **aspect-ratio**: The ratio of the viewport width to its height.

   Media features can be prefixed with `min-` or `max-` to set minimum and maximum values. Media Query Level 4 includes enhanced syntax for range features.

   ```css
   @media (min-width: 30em) and (max-width: 50em) {
     /* styles */
   }

   @media (30em <= width <= 50em) {
     /* styles */
   }
   ```

<br/><br/>

### The rem Unit

`1rem` equals the font size of the root (html) element. For example, if the root font size is 12px, then `1rem = 12px`.

```css
html {
  font-size: 10px;
}
.image {
  width: 12rem; /* 120px */
}
.item {
  font-size: 1.6rem; /* 16px */
}
.copyright {
  margin-top: 5rem; /* 50px */
}

@media all and (max-width: 750px) {
  html {
    font-size: 5px;
  }
}
```

In this example, the root font size is initially set to 10px, so `1rem = 10px`. When the viewport width is 750px or less, the root font size becomes 5px, and all `rem` units adjust accordingly.

To ensure consistent scaling regardless of user settings, you can use `html { font-size: 62.5%; }`, making `1rem = 10px` based on the default 16px font size.

<br/><br/>

### react-responsive

For complex responsive designs where the structure or functionality needs to change, you can use the `react-responsive` hook.

[react-responsive](https://www.npmjs.com/package/react-responsive)

#### useMediaQuery

Here's an example from the official documentation:

```js
import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

const Example = () => (
  <div>
    <Desktop>Desktop or laptop</Desktop>
    <Tablet>Tablet</Tablet>
    <Mobile>Mobile</Mobile>
    <Default>Not mobile (desktop, laptop, or tablet)</Default>
  </div>
)

export default Example
```

This code will display "Desktop or laptop" on desktops, "Tablet" on tablets, and "Mobile" on mobile devices.

Here's an applied example:

_mediaQuery.js_

```js
import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ query: '(max-width:767px)' })
  return <>{isMobile && children}</>
}

const PC = ({ children }) => {
  const isPc = useMediaQuery({ query: '(min-width:768px)' })
  return <>{isPc && children}</>
}

export { Mobile, PC }
```

_App.js_

```js
import { PC, Mobile } from '../mediaQuery.js'

const App = () => (
  <>
    <PC>
      <Loginpage />
    </PC>
    <Mobile>
      <MobilePreparePage />
    </Mobile>
  </>
)

export default App
```

In this setup, the `Loginpage` will be displayed on PCs, while the `MobilePreparePage` will be shown on mobile devices.
