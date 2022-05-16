---
title: 'react-device-detect를 활용하여 모바일 페이지 구현하기'
date: 2022-03-31 17:05:93
category: React
thumbnail: { thumbnailSrc }
draft: false
---

이번에 [Takeus](https://www.take-us.kr/) 배포를 하면서 pc에서 화면을 보는 걸 권장하긴 했지만 모바일로 봤을 때 화면이 깨지게 두는 건 좀 아니라는 생각이 들었습니다. 그래서 모바일 기기에서 접근했을 때는 아예 모바일 준비 중 페이지를 보여주기로 했습니다.

React에서 모바일 기기 접근을 감지할 수 있는 방법을 찾던 중 react-device-detect라는 라이브러리를 발견했는데 아주 간단하게 모바일 접근을 감지할 수 있었습니다.

https://www.npmjs.com/package/react-device-detect

이 라이브러리를 사용해서 모바일 준비 화면 구현 방법을 알아보겠습니다!

### 1. react-device-detect 설치

```
yarn add react-device-detect
```

### 2. mobile 준비 뷰 퍼블리싱

모바일 준비중 화면만 나오는 것보다는, 아래 링크를 복사할 수 있는 버튼을 두어 나중에 공유한 뒤 볼 수 있도록 하는게 좋을 것 같아서 버튼 추가를 PM분께 제안했습니다 🙂 (다음에는 카카오톡 공유하기나 페이스북 공유하기 기능도 추가해도 좋을 것 같습니다!)

```javascript
import React from 'react'
import styled from 'styled-components'
import mobilePreparingImg from 'assets/img/img_mobile_preparing.png'

const MobilePage = () => {
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(document.location.href)
    alert('링크가 복사되었습니다!')
  }

  return (
    <MobilePageWrapper>
      <img src={mobilePreparingImg} alt="mobile icon" />
      <p className="title">PC버전으로 접속해주세요</p>
      <p className="description">
        아쉽게도 모바일은 지원하지 않아요😥 <br />
        PC환경에서 테이커스를 이용해주세요!
      </p>
      <button className="link-copy-button" onClick={handleLinkCopy}>
        링크 복사하기
      </button>
    </MobilePageWrapper>
  )
}

/** styled components */

export default MobilePage
```

### 3. `App.jsx` 에 모바일 뷰 로직 추가

- isMobile 사용하기

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

첫번째 방법은 isMobile과 삼항 연산자를 사용하여 조건부 렌더링을 하는 방법입니다. 이 방법도 간편하긴 하지만 `App.jsx`의 내용이 복잡해지면 코드를 알아보기 힘들어질 수도 있습니다.

- MobileVuew, BrowserView 사용

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

두번째 방법은 BrowserView와 MobileView를 사용하는 방식입니다! `App.jsx` 에 들어가는 태그가 많을 경우에는 두번째 방법이 더 간결하고 깔끔해보이는 것 같습니다 🙂

### 실행결과

`react-device-detect` 을 사용하면 chrome 개발자 도구의 모바일 화면에서도 적용되는 걸 확인할 수 있습니다.
![](https://images.velog.io/images/chaerin00/post/6085c556-a608-4517-bba0-142c214f5739/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-31%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.12.50.png)

<hr/>

`react-device-detect` 를 이용해 아주 간단한 모바일 페이지를 구현해보았습니다! 해당 패키지에는 오늘 소개한 `isMobile` , `MobileView` , `BrowserView`외에도 `isIE`와 같은 다른 기능들도 있으니 확인해보시면 좋을 것 같습니다!
https://github.com/duskload/react-device-detect#readme
