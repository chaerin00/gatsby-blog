---
title: 'Implementing a Mobile Page Using react-device-detect in React'
date: 2022-03-31 17:05:93
category: React
thumbnail: { thumbnailSrc }
draft: false
---

During the recent deployment of [Takeus](https://www.take-us.kr/), it was suggested to view the site on a PC due to potential issues on mobile devices. However, leaving the mobile view broken didn't seem ideal to us. Therefore, we decided to display a mobile-friendly "Under Construction" page for users accessing the site via mobile devices.

In my search for ways to detect mobile devices in React, I came across the `react-device-detect` library, which provides a simple method to detect mobile access.

https://www.npmjs.com/package/react-device-detect

Let's explore how to implement a mobile preparation view using this library!

### 1. Install react-device-detect

```
yarn add react-device-detect
```

### 2. Mobile Preparation View Design

Rather than simply showing a message that the mobile view is under construction, I proposed adding a button that users can copy the link for later sharing, such as on KakaoTalk or Facebook.

```javascript
import React from 'react'
import styled from 'styled-components'
import mobilePreparingImg from 'assets/img/img_mobile_preparing.png'

const MobilePage = () => {
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(document.location.href)
    alert('Link copied!')
  }

  return (
    <MobilePageWrapper>
      <img src={mobilePreparingImg} alt="mobile icon" />
      <p className="title">Please Access from a PC</p>
      <p className="description">
        Unfortunately, mobile access is not supported 😥 <br />
        Please use Takeus on a PC!
      </p>
      <button className="link-copy-button" onClick={handleLinkCopy}>
        Copy Link
      </button>
    </MobilePageWrapper>
  )
}

/** styled components */

export default MobilePage
```

### 3. Adding Mobile View Logic to `App.jsx`

- Using `isMobile`

```javascript
import React from 'react'
import { isMobile } from 'react-device-detect'

import GlobalStyle from './styles/GlobalStyle'
import styled from 'styled-components'

import { Header, Footer } from './components/index'
import LoginProvider from './lib/context/provider'
import { MobilePage } from 'pages'

function App() {
  return (
    <>
      <GlobalStyle />
      {isMobile ? (
        <MobilePage />
      ) : (
        <Router>
          <LoginProvider>
            <Header />
            /** content */
            <Footer />
          </LoginProvider>
        </Router>
      )}
    </>
  )
}

export default App
```

The first approach uses `isMobile` with a ternary operator for conditional rendering. While simple, this method may clutter `App.jsx` as it grows.

- Using `MobileView` and `BrowserView`

```javascript
import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'

import GlobalStyle from './styles/GlobalStyle'
import styled from 'styled-components'

import { Header, Footer } from './components/index'
import LoginProvider from './lib/context/provider'
import { MobilePage } from 'pages'

function App() {
  return (
    <>
      <GlobalStyle />
      <MobileView>
        <MobilePage />
      </MobileView>
      <BrowserView>
        <Router>
          <LoginProvider>
            <Header />
            /** content */
            <Footer />
          </LoginProvider>
        </Router>
      </BrowserView>
    </>
  )
}

export default App
```

The second approach uses `BrowserView` and `MobileView`, which offers a cleaner structure in `App.jsx`, especially when handling multiple tags.

### Execution Result

Using `react-device-detect`, you can verify that the implementation also applies when viewing the site through the mobile view in Chrome's developer tools.
![](https://images.velog.io/images/chaerin00/post/6085c556-a608-4517-bba0-142c214f5739/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-31%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.12.50.png)

<hr/>

Using `react-device-detect`, we've successfully implemented a simple mobile page. This package also offers other functionalities like `isIE`, which might be worth exploring for your specific needs!
https://github.com/duskload/react-device-detect#readme
