---
title: '[React] Usage Rules of Curly Braces in React'
date: 2021-05-20 15:05:45
category: React
thumbnail: { thumbnailSrc }
draft: false
---

During our React study, we discovered that there's some ambiguity about where exactly curly braces `{}` are used. Upon further investigation, we found that there are distinct rules governing the usage of curly braces `{}`.

# Meaning of {}

## JSX

To understand the meaning of `{}`, it's crucial to first understand JSX, which is a part of learning React.

```jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

In React, code like the above gets compiled into JavaScript through a JavaScript compiler like [@babel](https://babeljs.io/docs/en/):

```javascript
React.createElement('div', { className: 'sidebar' })
```

> In React, JSX is compiled into JavaScript, so to use JavaScript syntax, we need to mark it separately. That's where `{}` comes into play!

## JavaScript Code

According to the [official documentation](https://ko.reactjs.org/docs/jsx-in-depth.html), let's examine the code inside `{}` to see if it's indeed JavaScript code.

```jsx
<MainWrap>{userData && <Card />}</MainWrap>
```

A classic example is conditional rendering. The following code is JavaScript code using the `&&` operator:

```jsx
<div className="card__top--weather">{weather}</div>
```

Why is `weather` wrapped in `{}`? It's because `weather` is a JavaScript variable.

```jsx
{
  tags.map((tag, index) => {
    return (
      <div key={index} className="card__tags--tag">
        {tag}
      </div>
    )
  })
}
```

The reason `{}` is used here is because `map` is a JavaScript function.

Simply stating that JavaScript code is wrapped in `{}` doesn't cover all cases, so let's sort out some specific examples below.

## Props and State

```jsx
const [year, setYear] = useState(getCurrDate().year)
const [month, setMonth] = useState(getCurrDate().month)
return (
  <Calendar
    currYear={year}
    setCurrYear={setYear}
    currMonth={month}
    setCurrMonth={setMonth}
  />
)
```

When passing props and state like in the example above, we use `{}` because both props and state are JavaScript objects.

> What's the difference between state and props?
> Props ("properties" shortened) and state are both regular **JavaScript objects**. They contain information that influences the rendering output. One key difference is that props are passed into the component like function parameters, whereas state is managed inside the component like variables declared within a function.

This is the distinction between state and props as explained in the [React official documentation](https://ko.reactjs.org/docs/faq-state.html).

## Inline Style

```jsx
import React from 'react'
import Hello from './Hello'

function App() {
  const name = 'react'
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // Default unit is px
    padding: '1rem', // Use strings for other units
  }

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
    </>
  )
}
```

Inline styles must be written as JavaScript objects. Therefore, `{style}` represents the JavaScript object `style`. If we slightly modify the above code:

```jsx
import React from 'react'
import Hello from './Hello'

function App() {
  const name = 'react'

  return (
    <>
      <Hello />
      <div
        style={{
          backgroundColor: 'black',
          color: 'aqua',
          fontSize: 24, // Default unit is px
          padding: '1rem', // Use strings for other units
        }}
      >
        {name}
      </div>
    </>
  )
}
```

We directly embed the object into JSX syntax without declaring `style` separately.

## Import

```jsx
import Footer from './components/common/Footer'
import React, { useState } from 'react'
```

Here is a common import statement. What are the criteria for using `{}` in this case?
Unlike the previous examples, this is about understanding export differences.

### Export Default

The criterion for using `{}` is based on the export method.

```jsx
const a = 1
const c = 3
export { a }
export const b = 2
export default c
```

```jsx
import d, { a, b as e } from './Example.js'
console.log(a, e, d) //1,2,3
```

Items exported with `export default` are imported without using `{}`, while other exported items must be imported using `{}`.

<hr/>
In summary, the main rule for using `{}` in React is to enclose JavaScript code within JSX syntax. Understanding this makes it easier to comprehend why `{}` is used in so many different scenarios.

When using expressions like conditional rendering or mapping in React, wrapping them in `{}` is a good rule of thumb.
