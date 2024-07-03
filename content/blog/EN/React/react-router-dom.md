---
title: '[React] react-router-dom 사용법'
date: 2021-05-20 15:05:60
category: React
thumbnail: { thumbnailSrc }
draft: false
---

[React-Router-Dom 공식문서](https://reactrouter.com/web/api/withRouter)

# SPA

SPA(Single Page Application)는 말 그대로 한 개의 페이지로 이루어진 어플리케이션이라는 의미이다. 전통적인 웹 페이지는 사용자가 다른 페이지로 이동할 때마다 새로운 html을 받아오고, 페이지를 로딩할 때 마다 서버에 리소스를 전달 받아 해석한 뒤 화면에 보여주었다. 요즘은 웹에서 제공되는 정보가 많기 때문에 새로운 화면을 보여 주어야 할 때마다 서버측에서 모든 뷰를 준비한다면 성능상의 문제가 발생할 수 있다. 이러한 방식은 비효율적이다.
![](https://images.velog.io/images/chaerin00/post/97128c05-d089-4db0-9fa2-f26e09209ac8/image.png)

그래서 React 같은 라이브러리 혹은 프레임워크를 사용하여 View렌더링을 사용자의 브라우저가 담당하도록 하고, 우선 어플리케이션을 브라우저에 불러와서 실행시킨 후에 사용자와의 인터랙션이 발생하면 필요한 부분만 자바스크립트를 사용하여 업데이트 해준다. 만약 새로운 데이터가 필요하다면 서버 API를 호출하여 필요한 데이터만 새로 불어와 어플리케이션에서 사용할 수 있다.
![](https://images.velog.io/images/chaerin00/post/d25a95ee-0dc8-462b-a412-46ed434f0a80/image.png)
요즘 웹페이지는 제공되는 정보의 양이 많은 만큼 페이지 수도 많고 화면도 다양하다. 그렇기 때문에 SPA에서도 다른 페이지를 보여주는 Routing이 필요하다. 하지만 React 자체에는 이 기능이 내장되어 있지 않기 때문에 react-router-dom이라는 라이브러리를 사용하여 구현하게 된다

# Router

> 모든 Router 컴포넌트들의 기본형(low-level interface)이며, 실제 app에서는 주로 아래 5가지의 Router들중 하나를 사용한다.

- `<BrowserRouter>`
- `<HashRouter>`
- `<MemoryRouter>`
- `<NativeRouter>`
- `<StaticRouter>`

저 중 주로 사용되는 것은 `<BrowserRouter>`와 `<HashRouter>`이고
Router로 가장 상위 컴포넌트를 감싸야 페이지 전환이 가능하다.

## BrowserRouter

> HTML5의 history API를 활용하여 UI를 업데이트하는 `<Router/>`의 종류 중 하나이다.

`<HashRouter>`는 URL의 hash를 활용한 라우터이기 때문에 정적인(static)페이지에 적합하다.

보통 request와 response로 이루어지는 동적인 페이지를 제작하므로 `<BrowserRouter>`가 보편적으로 쓰인다.

# Link

Link 컴포넌트는 클릭하면 다른 주소로 이동시키는 컴포넌트이다.

```
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
  );
}
```

## &lt;Link&gt; vs &lt;a&gt;

html에서 &lt;a&gt역시 다른 주소로 이동시키는 컴포넌트이다. 하지만 React에서는 &lt;a&gt를 사용하지 않는다. 그 이유는 &lt;a&gt를 사용하게 되면 페이지가 리렌더링되기 때문이다. 반면에 &lt;Link&gt는 단순히 브라우저의 주소, 즉 URL만 변경시킨다.

# Route

`<Link>`가 단순히 URL만 변경시키면 그 URL에 해당하는 컴포넌트를 렌더링 해주는 것이 바로 `<Route>`이다

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

Route로 render된 컴포넌트는 props를 전달받게 된다.

props 출력 결과👇
![](https://images.velog.io/images/chaerin00/post/26800b50-3357-4756-9dbd-910d98d13c21/image.png)

## Route props

Route의 props에는 다음과 같은 3가지 객체가 있다.

- match
- location
- history

### match

match는 어떻게 `<Route path>`와 URL이 매칭되었는지를 담고 있다.
match 객체는 다음과 같은 property를 가진다.
![](https://images.velog.io/images/chaerin00/post/3245d4d5-5480-4344-baeb-e6af30c5927f/image.png)

- params - `directory/:id`에서 id와 같은 dynamic segment에 대응된 URL
- isExact - 전체 경로가 완전히 매칭되었을 때 true
- path - `<Route>`에 정의된 path
- url - 실제 URL

### history

history 객체는 스택(stack)에 현재까지 이동한 url 경로들이 담겨있는 형태로 주소를 임의로 변경하거나 되돌아갈 수 있도록 해준다.
![](https://images.velog.io/images/chaerin00/post/e35cf30c-6bbf-4ab5-9186-5d87de734d1e/image.png)

- length : 전체 history 스택의 길이

- action : 최근에 수행된 action (PUSH, REPLACE or POP)

- location : 최근 경로 정보

- **push**(path, [state]) : 새로운 경로를 history 스택으로 푸시하여 페이지를 이동

- replace(path, [state]) : 최근 경로를 history 스택에서 교체하여 페이지를 이동

- go(n) : history 스택의 포인터를 n번째로 이동

- **goBack**() : 이전 페이지로 이동

- **goForward**() : 앞 페이지로 이동

- block(prompt) : history 스택의 PUSH/POP 동작을 제어

### location

location 객체에는 현재 페이지의 정보를 가지고 있다.
![](https://images.velog.io/images/chaerin00/post/15b2c097-08ff-4bf5-beb0-e7d73c5a6db5/image.png)

```
<Link to='/1?name=kim'>users</Link>
```

- pathname: 현재 page의 경로명
- search: 현재 url의 쿼리 스트링

- hash: 현재 page의 hash

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

Switch문을 뺀 결과는 어떻게 될까?
![](https://images.velog.io/images/chaerin00/post/d274c1c5-4c9a-4c3c-bc47-43e6f76d7768/image.png)
User를 눌렀지만 User와 Home이 같이 렌더링된다.

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
switch는 path가 맞으면 그 뒤는 검사하지 않는다. 따라서 /user는
`<Route path="/users" component={User} />`에 걸려서 뒤에 따라오는
`<Route path="/" component={Home} />`는 확인하지 않고 바로 User를 render하고 끝낸다.

# withRouter

`<Route component={컴포넌트 이름}>`를 통해 렌더링 되지 않은 컴포넌트에서 라우터에서 사용하는 객체 - location, match, history 를 사용하려면, withRouter를 사용해야 한다.

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

Side 컴포넌트는 Route에 의해 렌더링된 컴포넌트는 아니지만 withRouter를 사용해서 history객체를 이용하여 페이지 이동을 가능하게 했다.

<hr/>
참고자료<br/>
https://reactrouter.com/web/api/Link<br/>
https://velog.io/@daybreak/React-SPA-Router
