---
title: 'Redux 사용법 기초 useState처럼 사용하기'
date: 2021-07-16 16:05:49
category: React
thumbnail: { thumbnailSrc }
draft: false
---

# Redux를 시작하기 어려운 이유🚫

최근 시작한 프로젝트에서 전역 state 관리를 Redux로 하기로 결정했었다.
그 뒤로 Redux 공식문서부터 다양한 블로그글들을 살펴보았는데 설치해야하는 모듈도 사용하는 방식도 사람들마다 다 다른 것 같았다.

사람들마다 Redux를 사용하는 방식이 너무 달라서 어떤 게 가장 간단한 것인지 알 수 없다는게 Redux를 사용하는 진입장벽을 높이는 것 같았다. 사실 이번에 진행한 프로젝트와 같이 작은 product에서는 그렇게 다양한 동작이 필요없고 단순히 변경된 state를 저장하는 정도의 기능만 필요했다.

### Redux를 사용해야하는 경우

![](https://images.velog.io/images/chaerin00/post/aea7a08d-8ae6-42da-9772-7205d7d60eb1/Animation_2021-07-16-19-21-56.gif)

이번 프로젝트에서 Redux로 구현한 기능은 검색기능이였다.

> 1.  메인뷰에서 나라와 공항을 선택하고 검색버튼을 클릭
> 2.  대상견 찾기 페이지로 이동
> 3.  대상견 찾기 페이지에서 검색결과 나타내기

다음과 같은 기능을 구현하려고 했는데 searchbar에서 나라와 공항을 검색한 결과를 다른 페이지로 넘겨줄 방법이 없었다. 만일 저 데이터를 props로 전달하려면 searchbar ➡ mainpage ➡ app ➡ dog page ➡ searchbar 의 과정을 거쳐야했다. searchbar에서 검색을 클릭하면 그걸 Redux store에 저장하고 대상견 찾기 페이지에서 store에 저장되어있는 정보를 가져오면 간단하게 해결이 가능했다.

# Redux 사용하기

우리의 목표는 Redux를 **useState**처럼 사용하는 것이다. useState를 사용할 때 setState를 이용하여 값을 변경하는 것처럼 모든 파일에서 접근할 수 있는 state가 있고 그걸 원하는 값으로 변경하는 기능만 있으면 된다.

> 1. store: 전역으로 관리하는 state를 담는 곳

2. action: store에 있는 state를 변경하기 위해 보내는 신호
3. reducer: action과 state를 파라미터로 받아 처리하는 자바스크립트 함수

store는 state를 저장하고 action을 보내면 reducer에서 store에 있는 state를 변경해준다.

## 1. 모듈설치

필요한 모듈은 **redux**와 **react-redux** 두가지이다.
`npx create-react-app "프로젝트이름"`으로 만들어준 프로젝트에 다음 모듈을 설치한다.

```
yarn add redux react-redux
```

## 2. 파일 생성

redux폴더를 만들고 그 안에 총 4가지 파일을 만들 예정이다.

### store.js

```javascript
import { createStore } from 'redux'
import rootReducer from './rootReducer'

const store = createStore(rootReducer)

export default store
```

store.js에서는 다음과 같은 코드로 store를 생성해준다. createStore는 첫번째 인자로 reducer를 받는다. 여기서는 rootReducer이다.

### rootReducer.js

```javascript
const initialState = {
  dogData: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DOGS':
      return { ...state, dogData: action.payload }
    default:
      return state
  }
}

export default rootReducer
```

rootReducer에는 state와 action이 들어간다. state에는 초기값을 지정해줄 수 있다. 이 경우에 action을 setState와 같은 기능을 하는 SET_DOGS를 만들어주었다. 기존에 state 객체를 복사해와서 그안에 dogData라는 key와 action에서 받아오는 payload를 value로 state를 바꿔주는 역할을 한다.

### action.js

```javascript
export const setDogs = dog => ({
  type: 'SET_DOGS',
  payload: dog,
})
```

setDogs는 dog라는 새로 변경해줄 데이터를 받아서 reducer에 전달해주는 action이다.

## 3. Store에 있는 state사용하기

### index.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from 'redux/store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
```

index.js파일에서 Provider를 통해 store를 하위 컴포넌트들에 전달해준다.

### DogPage.jsx (store의 state를 사용하는 곳)

```jsx
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DogCardContainer } from 'components'
//redux
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    dogData: state.dogData,
  }
}
const Styled = {
  Wrapper: styled.section`
    .container {
      margin-top: 3.6rem;
    }
  `,
}
const DogPage = ({ dogData }) => {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    //강아지 검색을 했을 때
    if (dogData.length !== 0) {
      setDogs(dogData)
    }
  }, [pageNum, dogData, selectedFilter])

  return (
    <Styled.Wrapper>
      <DogCardContainer dogs={dogs} />
    </Styled.Wrapper>
  )
}

export default connect(mapStateToProps)(DogPage)
```

컴포넌트에서 store에 있는 state(이 경우는 dogData)를 사용하려면 connect함수를 이용하여 mapStateToProps와 DogPage를 연결해줘야 한다. 연결해주고나면 해당 컴포넌트에서 props.dogData로 state를 사용할 수 있게 된다.

핵심적인 코드만 남기면 다음과 같다.

```jsx
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    dogData: state.dogData,
  };
};
const DogPage = ({ dogData }) => {
	...
  return (
    ...
  );
};

export default connect(mapStateToProps)(DogPage);
```

### Searchbar.jsx (store에 있는 state를 변경하는 곳)

```jsx
import React, { useState, useEffect } from 'react'
import { getSearchDogs } from 'lib/api/sample'
import { Button } from 'components'
import { connect } from 'react-redux'
import { setDogs } from 'redux/actions'

const mapDispatchToProps = dispatch => {
  return {
    setDogs: dog => dispatch(setDogs(dog)),
  }
}

const Searchbar = ({ setDogs }) => {
  const searchHandler = async () => {
    if (currAirport) {
      const data = await getSearchDogs(currAirport)
      console.log(data)
      setDogs(data.data)
      if (location.pathname === '/') {
        history.push('/dogSearch')
      }
    }
  }

  return (
    <>
      <div className="button" onClick={() => searchHandler()}>
        <span className="text">검색</span>
        <SearchImg />
      </Button>
    </>
  )
}

export default connect(null, mapDispatchToProps)(Searchbar)
```

컴포넌트에서 action을 통해 store에 있는 state를 변경해주려면 connet를 사용해서 mapDispatchToProps와 Searchbar를 연결해주어야 한다. connect의 첫번째 인자는 아까 보았던 mapStateToProps인데 state를 변경만 시키는 것이기 때문에 null로 둔다.

connect로 연결해준 뒤 props.setDogs로 dogData를 변경할 수 있다. 버튼을 클릭했을 때 서버에 data를 요청하고 reponse를 dogData에 넣어주었다.

# 마무리

Redux를 이용하여 useState를 사용하듯이 전역 State를 사용하는 방법을 알아보았다.
이전 프로젝트에서 사용했던 Recoil보다 훨씬 어렵고 복잡했지만 그래도 동작원리는 거의 유사했고, props로 전달하는 것보다는 복잡하지 않게 구현할 수 있었다.
앞으로는 더 다양한 동작이 가능하도록 Redux에 대해 공부해봐야할 것 같다💥
