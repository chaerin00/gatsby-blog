---
title: 'Basic Usage of Redux: Using it Like useState'
date: 2021-07-16 16:05:49
category: React
thumbnail: { thumbnailSrc }
draft: false
---

# Why Starting with Redux is Challenging 🚫

I recently decided to manage global state in my project using Redux. As I explored Redux, I found that the required modules for installation and usage methods seemed to vary significantly among the official Redux documentation and various blog posts.

The diversity in how people use Redux seemed to raise the entry barrier, making it difficult to determine the simplest approach. In reality, for small projects like the one I'm currently working on, only basic functionality to store and manage state changes was needed.

### When to Use Redux

![](https://images.velog.io/images/chaerin00/post/aea7a08d-8ae6-42da-9772-7205d7d60eb1/Animation_2021-07-16-19-21-56.gif)

In this project, the feature implemented with Redux was a search function.

> 1. Select a country and airport in the main view and click the search button.
> 2. Navigate to the dog search page.
> 3. Display search results on the dog search page.

I wanted to implement these features, but I couldn't find a way to pass search results from the search bar to another page. If I were to pass this data via props, I would have to go through a process like: search bar ➡ main page ➡ app ➡ dog page ➡ search bar. By storing the search result in the Redux store when clicking the search button in the search bar, and then retrieving the stored information in the dog search page, I could solve this issue simply.

# Using Redux

Our goal is to use Redux like **useState**. Just like when using `useState` where you change values using `setState`, we want a state accessible from anywhere in the files and the ability to change it to the desired value.

> 1. store: A place to store global state

2. action: A signal sent to change the state in the store
3. reducer: A JavaScript function that accepts action and state as parameters and processes them

The store stores the state, and when an action is sent, the reducer changes the state in the store.

## 1. Installing Modules

The necessary modules are **redux** and **react-redux**. Install these two modules in your project created with `npx create-react-app "project name"`.

```
yarn add redux react-redux
```

## 2. Creating Files

Create a `redux` folder and create a total of 4 files inside it.

### store.js

```javascript
import { createStore } from 'redux'
import rootReducer from './rootReducer'

const store = createStore(rootReducer)

export default store
```

In `store.js`, create the store with the following code. `createStore` takes the reducer as the first argument, which is `rootReducer` here.

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

`rootReducer` receives `state` and `action`. You can specify initial values for `state`. In this case, an action `SET_DOGS`, similar to `setState`, is created. It copies the existing state object and changes the state inside it to `dogData`, which is received from the action `payload`.

### action.js

```javascript
export const setDogs = (dog) => ({
  type: 'SET_DOGS',
  payload: dog,
})
```

`setDogs` is an action that receives new data `dog` to change and sends it to the reducer.

## 3. Using State in the Store

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

In `index.js`, use `Provider` to pass the store to the child components.

### DogPage.jsx (Where the state in the store is used)

```jsx
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DogCardContainer } from 'components'
//redux
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
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
    // When searching for dogs
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

To use the state in the store (in this case `dogData`) in components, use `connect` to connect `mapStateToProps` and `DogPage`. Once connected, you can use the state as `props.dogData` in the component.

Here are the essential parts of the code:

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

### Searchbar.jsx (Where the state in the store is changed)

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
        <span className="text">Search</span>
        <SearchImg />
      </Button>
    </>
  )
}

export default connect(null, mapDispatchToProps)(Searchbar)
```

To change the state in the store using an action, connect `mapDispatchToProps` and `Searchbar` using `connect`. The first argument of `connect` is `mapStateToProps`, which we do not need here since we are only changing the state. Once connected, you can change `dogData` with `props.setDogs`. After clicking the button, request `data` from the server and put the response into `dogData`.

# Conclusion

I explored how to use Redux to handle global state like `useState`. It was more difficult and complex than using Recoil in previous projects, but the principles were similar, and it was simpler to implement than passing data via props. In the future, I should study Redux more to enable a wider range of operations 💥
