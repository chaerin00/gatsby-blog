---
title: 'Redux Toolkit 시작하기'
date: 2021-12-27 16:46:01
category: React
thumbnail: { thumbnailSrc }
draft: false
---

예전에 처음 리덕스에 관한 글을 쓸 때 redux-toolkit(RTK)에 대해서도 공부해보면 좋겠다는 댓글이 달렸었습니다. 그리고 실제로 회사에서 React로 프로젝트를 시작하고 redux toolkit을 사용하게 되었습니다.

> The Redux Toolkit package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:
>
> - "Configuring a Redux store is too complicated"
> - "I have to add a lot of packages to get Redux to do anything useful"
> - "Redux requires too much boilerplate code"

redux toolkit 공식문서에서는 다음과 같은 문제점들을 보완하기 위해 redux tookit의 사용을 제안하고 있습니다. 이전에 글을 쓸 때도 모든 redux 튜토리얼이라고 하는 글들이 모두 조금씩 다른 방식을 제안하고 있어서 시작하기가 더 어려웠고 제가 찾은 가장 간단한 방법을 글로 작성했던 적이 있습니다. [Redux 사용법 기초](https://velog.io/@chaerin00/Redux-%EC%82%AC%EC%9A%A9%EB%B2%95-%EA%B8%B0%EC%B4%88-useState%EC%B2%98%EB%9F%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

redux toolkit을 사용하면 이전에 제시한 방법보다 더 간단하게 redux를 사용할 수 있는 것 같아서 글로 정리하려고 합니다😊

# Redux Toolkit Setting

## 1. Package 설치

```
npm install @reduxjs/toolkit react-redux
yarn add @reduxjs/toolkit react-redux
```

`@reduxjs/toolkit` 과 `react-redux` 을 설치해줍니다.

## 2. Store 생성

`store/index.ts`를 생성한 후 다음과 같이 내용을 작성해줍니다.

```typescript
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

이렇게 하면 store 생성은 완료가 됩니다. `reducer:{ }`안에 들어갈 내용은 우리가 생성하게 될 **redux state slice**(상태의 일부분)입니다.

위의 코드에서 `ReturnType<typeof store.getState>` `typeof store.dispatch`로 타입을 지정한 것은 RootState와 Dispatch의 타입을 reducer에 state slice를 추가한 store의 타입을 추론하여 지정한 것입니다.

아래 사진을 예시로 들자면 reducer에 products라는 slice를 store에 추가해주면 다음과 같이 type을 추론해줍니다.
![](https://images.velog.io/images/chaerin00/post/91dd7e97-7979-4b7d-bbd3-0a5cf42c28fa/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-27%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.42.08.png)

## 3. Store 연결

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from 'store/index'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

위의 코드를 `_app.tsx`(next.js의 경우) 혹은 `index.js`에 추가해줍니다.

## 4. Typed Hooks 정의

공식문서에서 타입스크립트에서 `useDispatch`와 `useSelector`를 사용할 때 매번 `RootState`와 `AppDispatch`를 불러와 타입을 지정하는 것이 불편하기 때문에 타입을 지정해놓은 `useAppDispatch`와 `useAppSelector`를 선언하여 사용하는 것을 추천하고 있습니다.

`store/hooks.ts`에 다음 코드를 추가해줍니다.

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '.'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

<hr/>

**이제 Redux Toolkik을 이용한 전역상태 관리를 해보도록 하겠습니다👍🏻**

# Redux Toolkit을 이용한 전역 상태 관리

제가 하고 싶은 것은 장바구니에 담을 아이템들을 선택하고 나서 아이템 데이터를 Redux Store에 저장하는 것입니다.
![](https://images.velog.io/images/chaerin00/post/289e3c4c-fb42-4b98-8391-e4764ace309f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-27%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.17.00.png)
저는 선택된 item들을 SelectedItemList라는 state에 저장해두었습니다. 그럼 이 state를 redux store에만 연결하면 됩니다.

## create slice

cart item을 담기 위해 store/products.ts에 다음과 같이 slice를 만들어줍니다.

```jsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { SelectedSkuType } from '@type/productDetailType'

// slice의 타입 지정
export type ProductsType = {
  cartItem: SelectedSkuType[],
}

// 초기값 지정
const initialState: ProductsType = {
  cartItem: [],
}

export const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateCartItem: (state, action: PayloadAction<SelectedSkuType[]>) => {
      state.cartItem = action.payload
    },
  },
})

export const { updateCartItem } = ProductsSlice.actions

export const selectProduct = (state: RootState) => state.products

export default ProductsSlice.reducer
```

create slice를 하기 위해서 추가해야할 3가지 인자는 다음과 같습니다.

> 1. slice를 구분하는 이름(name)

2. 초기값(initail state value)
3. 값이 어떻게 update될 지 정의한 reducer 함수들(reducer)

RTK에서는 mutate(값을 변경시키는)로직은 reducers안에 쓰도록 하고 있습니다. 또한 RTK에서는 [Immer](https://immerjs.github.io/immer/) library를 이용하여 더 쉽게 immutable(불변) 업데이트가 이루어지도록 로직을 간단히 할 수 있습니다.

이전에 redux에서는 `[...state]` 이런 식으로 복사하는 코드를 추가하여 불변성을 지켜줘야 했는데 이제는 `state.cartItem = action.payload` 이제는 이런 간단한 로직으로도 불변성을 지킬 수 있는 것 입니다.

## root state에 reducer 추가

이전에 root state를 지정했던 store/index.ts에 다음과 같이 코드를 추가합니다.

```jsx
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '@store/products'

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
```

## redux store update

```jsx
import { useState } from 'react'
import { useAppDispatch } from '@store/hook'
import { updateCartItem } from '@store/products'

const Option=()=>{
  const [selectedItemList, setSelectedItemList] = useState<object[]>(
    []
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateCartItem(selectedItemList))
  }, [selectedItemList, dispatch])
}
```

저는 useEffect를 사용해 state가 변경될 때마다 dispatch를 하여 store값을 update 해주도록 하였습니다.

이전에 `store/hooks.ts`에 정의해두었던 `useAppDispatch`를 가져오고 `store/product.ts`에서 만들었던 product slice의 `updateCartItem`이라는 reducer를 import 해옵니다.

`const dispatch = useAppDispatch()`로 dispatch 함수를 정의하고 필요한 곳에서 `dispatch(action(payload))`로 값을 update 시켜줍니다.

![](https://images.velog.io/images/chaerin00/post/34c43572-8365-4b02-913f-5d6a76c677c1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-27%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.57.23.png)

Redux DevTools를 이용해 확인해보면 값이 잘 update된 걸 확인할 수 있습니다.

## redux store에 있는 값 가져오기

이제 store에 저장되어있는 값을 가져와보겠습니다.
cart item state를 사용해야 하는 곳에 다음과 같이 코드를 추가합니다.

```jsx
import { useAppSelector } from '@store/hook'
import { selectProduct } from '@store/products'

const Cart = () => {
  const { cartItem } = useAppSelector(selectProduct)
}
```

다음과 같이 `useAppSelector`를 통해 `store/products.ts`안에 있는 state를 가져올 수 있습니다.

<hr/>
redux-toolkit에 대한 내용을 정리해보았는데 이전에 redux를 사용하던 방식보다 기본 세팅에서부터 값을 참조하고 업데이트하는 로직이 훨씬 간단해진 것을 느낄 수 있었습니다.

RTK를 사용하면 Redux를 사용하면서 느꼈던 불편함을 많이 줄일 수 있을 것 같습니다 👍🏻
