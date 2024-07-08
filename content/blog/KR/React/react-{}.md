---
title: '[React] React에서 중괄호의 사용 규칙'
date: 2021-05-20 15:05:45
category: React
thumbnail: { thumbnailSrc }
draft: false
---

리액트 스터디를 하던 중 도대체 중괄호**{ }**는 어디에 쓰이는 건지에 대한 모호함이 우리에게 있다는 것을 알게 되었다.
공부해본 결과, 중괄호**{ }**의 사용에는 뚜렷한 규칙이 있다는 사실을 알게 되었다.

# {}의 의미

## JSX

**{ }**의 의미를 이해하려면 먼저 React를 처음배울때 다 이해하지 못하고 넘어갔던 **JSX**에 대한 이해가 있어야한다.

```jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

react에서 다음과 같이 쓰인 코드는 [@babel](https://babeljs.io/docs/en/)이라는 자바스크립트 컴파일러를 통해 다음과 같이 javascript로 변환된다.

```javascript
React.createElement('div', { className: 'sidebar' })
```

> react에서는 JSX를 javascript로 변환하기 때문에 javascript문법을 사용하기 위해서는 따로 mark를 해주어야 한다. 그것이 바로 **{ }**인 것이다!

## Javascript 코드

다음 내용은 [공식문서](https://ko.reactjs.org/docs/jsx-in-depth.html)의 내용을 참고했다.
{ }안에 쓰인 코드들이 정말 javascript 코드인지 살펴보자

```jsx
<MainWrap>
      { userData && <Card/> }
    </MainWrap>코드를 입력하세요
```

대표적인 예시로 조건부 렌더링이다. 다음 코드는 javascript의 &&연산자를 이용한 javascipt 코드인 것이다.

```jsx
<div className="card__top--weather">{weather}</div>
```

weather는 왜 { }에 감싸져 있는걸까? 그 이유는 weather가 javascript의 변수이기 때문이다.

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

다음 구문이 { }로 둘러싸여 있는 이유는 map이 javascript의 함수이기 때문이다.

javascript 코드는 { }로 감싼다는 규칙만으로는 이해되지 않는 몇몇 예시들을 밑에서 따로 정리해봤다.

## props와 state

```jsx
 const [year, setYear] = useState(getCurrDate().year);
 const [month, setMonth] = useState(getCurrDate().month);
 return (
        <Calendar
          currYear={year}
          setCurrYear={setYear}
          currMonth={month}
          setCurrMonth={setMonth}
        />
```

우리는 예시와 같이 props를 넘겨주고 state를 넘겨줄 때 { }를 사용한다. 그 이유는 props와 state 둘 다 javascript 객체이기 때문이다.

> state와 props의 차이점은 무엇인가요?
> props (“properties”의 줄임말) 와 state 는 일반 **JavaScript 객체**입니다. 두 객체 모두 렌더링 결과물에 영향을 주는 정보를 갖고 있는데, 한 가지 중요한 방식에서 차이가 있습니다. props는 (함수 매개변수처럼) 컴포넌트에 전달되는 반면 state는 (함수 내에 선언된 변수처럼) 컴포넌트 안에서 관리됩니다.

다음은 [react 공식문서](https://ko.reactjs.org/docs/faq-state.html)에서 설명하는 state와 props의 차이이다.

## inline style

```jsx
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
    </>
  );
```

인라인 스타일은 javascript 객체 형태로 작성해야 한다. 따라서 Javascript객체인 style을 `{style}`로 사용하는 것이다. 위의 코드를 조금 변형해보면 다음과 같다.

```jsx
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'react';

  return (
    <>
      <Hello />
      <div style={{
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: 24, // 기본 단위 px
        padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  	}}>{name}</div>
    </>
  );
```

style을 굳이 선언하지 않고 객체를 바로 JSX문법 안에 넣어버린 것이다.

## import

```jsx
import Footer from './components/common/Footer'
import React, { useState } from 'react'
```

우리가 흔히 보는 import문이다. 여기서 { }는 어떤 기준으로 사용될까?
이것은 위의 경우들과는 다르게 이해해야 한다.

### export default

{ }가 쓰이는 기준은 export 방식의 차이이다.

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

export default로 export 된 것은 따로 { } 로 감싸지 않고 import 해오고, 나머지 그냥 export한 것들은 { }로 감싸서 import 해야한다.

<hr/>
긴 포스팅을 정리하자면 React에서 { }가 쓰이는 큰 규칙은 JSX문법 속 javascript 코드를 { }로 감싼다는 것이였다.  이것을 알고나서 코드를 살펴보니 왜 그 많은 경우들에 { }가 사용되었는지 이해하게 되었다.

React에서 조건부 렌더링이나 map과 같은 수식 혹은 함수를 사용하게 된다면 { }로 감싸는 것이라고 생각해두면 편할 것 같다.
