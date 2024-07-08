---
title: '[React] How to Use react-router-dom'
date: 2021-05-20 15:05:60
category: React
thumbnail: { thumbnailSrc }
draft: false
---

[React-Router-Dom Official Documentation](https://reactrouter.com/web/api/withRouter)

# SPA

SPA (Single Page Application) literally means an application consisting of a single page. Traditional web pages fetch new HTML from the server and re-render the entire page whenever a user navigates to a different page. This method becomes inefficient with the increasing amount of information available on the web. Hence, modern web applications delegate the responsibility of rendering views to the user's browser using libraries like React. The initial application is loaded and executed in the browser, and JavaScript updates only the necessary parts when user interactions occur. If new data is needed, only specific data is fetched from the server through APIs.

![](https://images.velog.io/images/chaerin00/post/97128c05-d089-4db0-9fa2-f26e09209ac8/image.png)

Today's web pages have many pages and diverse screens due to the vast amount of information they provide. Therefore, even in SPAs, routing to different pages is essential. React itself does not include this functionality, so we use the `react-router-dom` library to implement it.

# Router

> The basic form (low-level interface) of all Router components, and in actual app, one of the 5 Router components is used mostly.

- `<BrowserRouter>`
- `<HashRouter>`
- `<MemoryRouter>`
- `<NativeRouter>`
- `<StaticRouter>`

Among them, `<BrowserRouter>` and `<HashRouter>` are mainly used.
You need to wrap the highest-level component with Router in order to switch between pages.

## BrowserRouter

> One of the `<Router/>` types that uses HTML5's history API to update UI.

Since `<HashRouter>` uses URL hashes, it is suitable for static pages.
Since dynamic pages are usually created with requests and responses, `<BrowserRouter>` is commonly used.

# Link

The Link component navigates to a different address when clicked.

```jsx
export default function App() {
  return (
    <>
      <div>header</div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/1?name=kim">Users</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Router>
    </>
  )
}
```

## &lt;Link&gt; vs &lt;a&gt;

In HTML, &lt;a&gt; also navigates to a different address. However, in React, &lt;a&gt; is not used because it triggers page reloading. Instead, &lt;Link&gt; only changes the browser's address (URL).

# Route

`<Link>` simply changes the URL, while `<Route>` renders the component corresponding to that URL.

App.js

```jsx
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import User from './components/User'

export default function App() {
  return (
    <>
      <div>header</div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/1">Users</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/about" component={About} />

            <Route path="/:id" component={User} />

            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </>
  )
}
```

About.js

```jsx
import React, { useEffect } from 'react'

function About(props) {
  useEffect(() => console.log(props), [])
  return <div>About...</div>
}

export default About
```

The component rendered by Route receives props.

Props Output👇
![](https://images.velog.io/images/chaerin00/post/26800b50-3357-4756-9dbd-910d98d13c21/image.png)

## Route props

The Route props include the following three objects:

- match
- location
- history

### match

match contains information on how `<Route path>` matched with the URL.

The match object has properties like:
![](https://images.velog.io/images/chaerin00/post/3245d4d5-5480-4344-baeb-e6af30c5927f/image.png)

- params - Corresponds to dynamic segments like `directory/:id` in the URL
- isExact - true when the entire path matches completely
- path - Path defined in `<Route>`
- url - Actual URL

### history

history object holds the stack of URLs navigated so far, allowing manipulation like arbitrary path changes or going back.

![](https://images.velog.io/images/chaerin00/post/e35cf30c-6bbf-4ab5-9186-5d87de734d1e/image.png)

- length : Total length of history stack

- action : Recent action performed (PUSH, REPLACE or POP)

- location : Recent path information

- **push**(path, [state]) : Pushes a new path to history stack for navigation

- replace(path, [state]) : Replaces recent path in history stack for navigation

- go(n) : Moves history stack pointer to nth position

- **goBack**() : Moves back to previous page

- **goForward**() : Moves forward to next page

- block(prompt) : Controls PUSH/POP actions in history stack

### location

location object contains current page's information.

![](https://images.velog.io/images/chaerin00/post/15b2c097-08ff-4bf5-beb0-e7d73c5a6db5/image.png)

```
<Link to='/1?name=kim'>users</Link>
```

- pathname: Current page's path
- search: Current URL's query string

- hash: Current page's hash

# switch

App.js

```jsx
import React from "react";
import { BrowserRouter
        as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import User from "./components/User";

export default function App() {
  return (
    <>
      <Router>
      		.
      		.
      		.

        {/* <Switch>*/}
            <Route path="/about" component={About} />

            <Route path="/users" component={User} />

            <Route path="/" component={Home} />
        {/*</Switch>*/}
        </div>
      </Router>
    </>
  );
}
```

What will happen if you remove the switch statement?
![](https://images.velog.io/images/chaerin00/post/d274c1c5-4c9a-4c3c-bc47-43e6f76d7768/image.png)
Although "User" is clicked, both "User" and "Home" are rendered.

```jsx
import React from "react";
import { BrowserRouter
        as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import User from "./components/User";

export default function App() {
  return (
    <>
      <Router>
      		.
      		.
      		.

        <Switch>
            <Route path="/about" component={About} />

            <Route path="/users" component={User} />

            <Route path="/" component={Home} />
        </Switch>
        </div>
      </Router>
    </>
  );
}
```

![](https://images.velog.io/images/chaerin00/post/20422f30-b0dd-4809-90f9-2197ebafcc85/image.png)
The switch statement checks the path and renders the first match. Therefore, /user matches `<Route path="/users" component={User} />` and ignores `<Route path="/" component={Home} />`.

# withRouter

To access `location`, `match`, and `history` objects used in unrendered components by `<Route component={component name}>`, withRouter must be used.

```jsx
import React from 'react'
import { withRouter } from 'react-router-dom'

function Side({ history }) {
  const clickHandler = () => {
    history.push('/')
  }
  return <button onClick={clickHandler}>Go Home!</button>
}

export default withRouter(Side)
```

![](https://images.velog.io/images/chaerin00/post/231592f6-3094-425b-a0ef-aa2e8a46c21e/Animation_2021-05-20-04-48-07.gif)

Although Side component is not rendered by Route, withRouter is used to enable page navigation using history object.

<hr/>
References<br/>
https://reactrouter.com/web/api/Link<br/>
https://velog.io/@daybreak/React-SPA-Router
