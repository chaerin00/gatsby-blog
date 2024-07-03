---
title: '[CSS] CSS Media Query와 반응형'
date: 2021-04-10 15:05:98
description: 'hi'
category: CSS
thumbnail: { thumbnailSrc }
draft: false
---

### 반응형 웹(responsive Web)이란?

반응형 웹은 태블릿, PC, 모바일 등 다양한 해상도로 접근할 때에도 동일한 서비스를 제공하기 위한 웹입니다.
이를 위해서는 각 해상도에 따라서 레이아웃과 스타일에 변화를 주어야 합니다.

<br/><br/>

### Media Query

#### Media Query 적용법

1. &lt;link&gt;
   link태그는 &lt;head&gt;안에 위치하여 media 속성 안 조건에 만족할 때 해당 CSS파일을 불러옵니다.

```
<link href="style.css" media="screen and (min-width: 512px) rel="stylesheet"/>
```

(media 속성에 대해서는 뒤에서 마저 설명하도록 하겠습니다.)

2. &lt;style&gt;
   &lt;style&gt;태그는 &lt;link&gt;태그와 거의 유사한데 미디어 속성 안 조건을 만족할 때 해당 스타일을 적용합니다.

```
<style href="style.css" media="screen and (min-width: 512px) rel="stylesheet">
/*style*/
    p{
    	width: 300px;
        height: 100px;
    }
</style>

```

3. &lt;style&gt;- @import
   &lt;style&gt;태그 안에서 @import 뒷부분의 미디어 쿼리를 만족할 때 해당 css 파일을 불러옵니다.

```
<style>
	@import url(style.css) screen and (min-width: 512px);
</style>

```

4. CSS파일
   불러온 CSS파일 안 혹은 &lt;style&gt;태그 안에서 직접 미디어 쿼리를 작성하여 만족할 때 해당 스타일을 적용시킵니다.

```css
@media screen and (min-width: 512px) and (max-width: 1024px) {
  p {
    width: 200px;
    backgroud: #ffffff;
  }
}
```

<br/>

#### Media Query 구문

미디어 쿼리는 선택 사항인 **미디어 유형**과, 자유로운 수의 **미디어 특성 표현식**으로 이루어집니다. 논리 연산자를 사용해 다수의 쿼리를 다양한 방법으로 결합할 수도 있습니다. 미디어 쿼리는 대소문자를 구분하지 않습니다.

1.  미디어 유형

    - all
      모든 장치에 적합합니다.
    - print
      인쇄 결과물 및 출력 미리보기 화면에 표시 중인 문서입니다.
    - screen
      주로 화면이 대상입니다.
    - speech
      음성 합성장치 대상입니다.

    미디어 유형은 장치의 일반적인 범주를 나타냅니다. 미디어 유형은 not이나 only 논리연산자를 사용할 때를 제외하면 선택사항이며 지정하지 않으면 all을 사용합니다.

2)  미디어 특성 표현식

미디어 특성은 사용자 에이전트, 출력 장치, 환경 등의 특징을 나타냅니다. 미디어 특성 표현식은 선택 사항이며 특성의 존재 여부와 값을 판별합니다. 각각의 미디어 특성 표현식은 괄호로 감싸야 합니다. - width: 스크롤바를 포함한 뷰포트 넓이 - height: 뷰포트의 높이 - aspect-ratio: 뷰포트의 가로세로비

+) 삭제된 표현식

- - device-aspect-ratio: 출력장치의 가로세로비
  - device-width: 출력 장치 렌더링 표면의 넓이
  - devive-height: 출력 장치 렌더링 표면의 높이

  미디어쿼리 속성은 속성명 앞에 min-, max-를 붙여서 최솟값, 최대값을 판단합니다.
  미디어쿼리 Level 4 사양은 향상된 구문을 포함하는데 그를 통해 미디어쿼리가 '범위' 유형을 가진 기능을 사용할 수 있습니다.

  ```css
  @media (min-width: 30em) and (max-width: 50em) {
    ...;
  }
  ```

  ```css
  @media (30em <= width <= 50em) {
    ...;
  }
  ```

<br/><br/>

### rem 단위

`1rem = html의 폰트크기` 입니다.
예를 들자면 html의 폰트크기가 12px일 때, `1rem = 12px`이 되는 것입니다.

```css
html {
  font-size: 10px;
}
.image {
  width: 12rem;
} //120px
.item {
  font-size: 1.6rem;
} //16px
.copyright {
  margin-top: 5rem;
} //50px

@media all and (max-width: 750px) {
  html {
    font-size: 5px;
  } // 이제 문서 내 모든 rem 단위가 영향을 받습니다.
}
```

위의 예제에서 html의 font-size는 10px이기 때문에 `12rem = 120px`이 됩니다.

미디어 쿼리의 적용을 받는다면(뷰포트 750px이하) 모든 rem단위들은 그 절반의 크기로 줄어들게 됩니다. 왜냐하면 html의 font-size가 10px의 절반인 5px이 되었기 때문입니다.

브라우저의 기본 폰트 사이즈는 16px입니다. 하지만 작은 글씨가 불편한 사용자는 웹 브라우저 설정에서 '폰트 기본 사이즈: 크게'와 같이 지정할 수 있습니다.

이런 식으로 Large 사이즈를 지정하면 기본 폰트 사이즈가 16px이 아닌 20px이 됩니다.

`html { font-size: 10px; }`대신 `html { font-size: 62.5%; }`를 쓰게 된다면 사용자가 어떤 폰트 사이즈를 사용하든지 같은 효과를 볼 수 있게 됩니다. `100% = 16px` ,`62.5% = 10px` 와 같은 수식이 성립하기 때문입니다.
<br/><br/>

### react-responsive

반응형 웹을 만들고 디자인하다 보면 구조나 기능 자체를 다르게 해야하는 경우가 있습니다.
그런 경우에는 react-resposive의 훅을 통해 구현가능합니다.

https://www.npmjs.com/package/react-responsive
<br/>

#### useMediaQuery

다음은 공식문서에 나와있는 Easy Mode 예제를 가져와봤습니다.

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
    <Default>Not mobile (desktop or laptop or tablet)</Default>
  </div>
)

export default Example
```

다음 코드를 적용시키면 Desktop에서는 Desktop or laptop이라는 글자가, 태블릿에서는 Tablet이라는 글자가 모바일에서는 Mobile이라는 나오게 됩니다.

다음 코드를 적용시킨 예제를 보겠습니다.

_mediaQuery.js_

```js
import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  })
  return <React.Fragment>{isMobile && children}</React.Fragment>
}

const PC = ({ children }) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px) ',
  })
  return <React.Fragment>{isPc && children}</React.Fragment>
}

export { Mobile, PC }
```

_App.js_

```js
import { PC, Mobile } from '../mediaQuery.js';
...
return(
  ...
  <PC>
      <Loginpage/>
  </PC>

  <Mobile>
      <MobilePreparePage/>
  </Mobile>
  ...
  )
```

다음과 같이 적용하게 되면 PC에서는 로그인 페이지가 뜨지만 Mobile에서는 모바일 준비 중 페이지가 뜨게 됩니다.
