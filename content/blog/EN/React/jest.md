---
title: 'React Unit Testing with Jest'
date: 2021-11-22 16:05:67
category: React
thumbnail: { thumbnailSrc }
draft: false
---

## What is Unit Testing?

Before diving into unit testing, let's first understand why we write test code. It's to ensure that the code we write functions correctly as intended.

There are three main types of tests in frontend development:
![](https://images.velog.io/images/chaerin00/post/7dc1ac69-3ded-471d-b4b0-ef51870fa344/image.png)

- **Unit Testing**:
  This is the smallest unit of testing, typically at the method level. It tests things like when function A is called, result B is expected.

- **Integration Testing**:
  This tests the compatibility issues between modules during the integration process. Unlike unit tests, integration tests are not independent from other components.

- **E2E Testing**:
  This tests the entire system including its build and deployment process.

In simpler terms, **unit testing** focuses on testing individual components to ensure that the methods inside them produce the intended results.

## Jest Syntax

### Setting up Jest

To perform unit testing with Jest, you need to first install necessary packages in your project. Run `yarn add jest enzyme enzyme-adapter-react-16`.

Once installed, add the following script to your `package.json`:

```json
"scripts": {
    ...
    "test": "jest",
    ...
  },
```

Create a `tests` folder and add a file named `sample.spec.js` or `sample.test.js`:

```javascript
// tests/sample.spec.js
test('This is a sample', () => {
  expect(true).toBe(true)
})
```

Running `yarn test` will produce the following output:
![](https://images.velog.io/images/chaerin00/post/1a945557-bed7-4ca9-89ea-3c24b70f7fa7/image.png)

To use JSX syntax, add the following code to `babel.config.js`:

```
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
```

### Writing Test Code

Here's an example of test code using a simple Counter component:
![](https://images.velog.io/images/chaerin00/post/e4f55d33-1385-4e03-976a-1fec34ad57ef/image.png)

```jsx
import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button className="prev" onClick={() => setCount(count - 1)}>
        &lt;
      </button>
      <p className="page">{count}</p>
      <button className="next" onClick={() => setCount(count + 1)}>
        &gt;
      </button>
    </div>
  )
}

export default Counter
```

```js
import { configure, shallow } from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Counter from '../src/components/Counter'

configure({ adapter: new Adapter() })

describe('<Counter/>', () => {
  it('is rendered', () => {
    const wrapper = shallow(<Counter />)
    expect(wrapper).toBeTruthy()
  })
  it('click left arrow', () => {
    const wrapper = shallow(<Counter />)
    wrapper.find('.prev').simulate('click')
    expect(wrapper.find('.page').text()).toBe('-1')
  })
  it('click right arrow', () => {
    const wrapper = shallow(<Counter />)
    wrapper.find('.next').simulate('click')
    expect(wrapper.find('.page').text()).toBe('1')
  })
})
```

The results will look like this when executed:
![](https://images.velog.io/images/chaerin00/post/53713293-1a4f-42dd-8791-df03f6d56037/image.png)

### Code Explanation

- describe: Groups tests together.
- it: Represents each test.
- shallow: Renders React components.
- Matchers:
  In the above code, matchers like `toBeTruthy()`, `toBe()` are used. Jest provides various matchers (https://jestjs.io/docs/using-matchers).

```js
it("click right arrow", () => {
    const wrapper = shallow(<Counter />);
    wrapper.find(".next").simulate("click");
    expect(wrapper.find(".page").text()).toBe("1");
```

In the code snippet above, it tests that when the element with className 'next' in the Counter component is clicked, the text content of the element with className 'page' should be '1'.
