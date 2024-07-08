---
title: 'Getting Started with Redux Toolkit'
date: 2021-12-27 16:46:01
category: React
thumbnail: { thumbnailSrc }
draft: false
---

I received a comment suggesting I delve into redux-toolkit (RTK) when I first wrote about Redux. Subsequently, I began using redux-toolkit in React projects at work.

> The Redux Toolkit package is designed to standardize Redux logic. It was originally created to address three common concerns about Redux:
>
> - "Configuring a Redux store is too complicated"
> - "I have to add a lot of packages to get Redux to do anything useful"
> - "Redux requires too much boilerplate code"

The Redux Toolkit documentation proposes using RTK to address these issues. In my previous article, I found various Redux tutorials suggested slightly different approaches, making it challenging to get started. I had previously written a simple guide on [Basic Redux Usage](https://velog.io/@chaerin00/Redux-%EC%82%AC%EC%9A%A9%EB%B2%95-%EA%B8%B0%EC%B4%88-useState%EC%B2%98%EB%9F%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0).

I find using Redux Toolkit makes managing Redux simpler than the methods I previously suggested, so I'm summarizing it here. 😊

# Redux Toolkit Setup

## 1. Installing Packages

```bash
npm install @reduxjs/toolkit react-redux
yarn add @reduxjs/toolkit react-redux
```

````

Install `@reduxjs/toolkit` and `react-redux`.

## 2. Creating the Store

Create `store/index.ts` with the following content:

```typescript
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

This sets up your Redux store. The `reducer: {}` will contain your Redux state slices.

## 3. Connecting the Store

Add the following code to `_app.tsx` (for Next.js) or `index.js`:

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

## 4. Defining Typed Hooks

To simplify TypeScript usage with `useDispatch` and `useSelector`, define typed hooks in `store/hooks.ts`:

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '.'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

<hr/>

Now, let's try managing global state with Redux Toolkit! 👍🏻

# Managing Global State with Redux Toolkit

I want to store selected items in a shopping cart in the Redux store after they are chosen.
![](https://images.velog.io/images/chaerin00/post/289e3c4c-fb42-4b98-8391-e4764ace309f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-27%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.17.00.png)

I have stored the selected items in the `SelectedItemList` state. Now, I just need to connect this state to the Redux store.

## Creating a Slice

Create a slice in `store/products.ts` to store cart items:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { SelectedSkuType } from '@type/productDetailType'

export type ProductsType = {
  cartItem: SelectedSkuType[]
}

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

When creating a slice, specify:

1. A name to identify the slice.
2. Initial state.
3. Reducer functions to define how values can be updated.

RTK encourages placing mutating logic inside reducers. Additionally, RTK uses the [Immer](https://immerjs.github.io/immer/) library for easier immutable updates.

## Adding Reducer to Root State

Add the reducer to `store/index.ts`, where we defined the root state:

```typescript
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

## Updating Redux Store

```jsx
import { useState } from 'react'
import { useAppDispatch } from '@store/hooks'
import { updateCartItem } from '@store/products'

const Option = () => {
  const [selectedItemList, setSelectedItemList] = useState<object[]>([])

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateCartItem(selectedItemList))
  }, [selectedItemList, dispatch])
}
```

I use `useEffect` to dispatch updates to the store whenever the state changes.

I import `useAppDispatch` defined in `store/hooks.ts` and the `updateCartItem` reducer from `store/products.ts`.

![](https://images.velog.io/images/chaerin00/post/34c43572-8365-4b02-913f-5d6a76c677c1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-27%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.57.23.png)

Using Redux DevTools, you can verify that the values are correctly updated in the store.

## Retrieving Values from Redux Store

Now, let's retrieve values stored in the store.
Add the following code where you need to use the `cartItem` state:

```jsx
import { useAppSelector } from '@store/hooks'
import { selectProduct } from '@store/products'

const Cart = () => {
  const { cartItem } = useAppSelector(selectProduct)
}
```

Use `useAppSelector` to access state defined in `store/products.ts`.

<hr/>

I've summarized using redux-toolkit, finding it much simpler from setting up to referencing and updating values compared to my previous Redux approaches.

Using RTK seems to significantly reduce the inconvenience I felt with Redux. 👍🏻
````
