---
title: 'Jest를 이용한 React Unit Test'
date: 2021-11-22 16:05:67
category: React
thumbnail: { thumbnailSrc }
draft: false
---

## 유닛테스트란?

유닛테스트 이전에 테스트 코드를 작성하는 이유에 대해 먼저 알아보자면 내가 작성한 코드가 내가 원하는 결과대로 잘 작동하는지 알기 위해서이다.

프론트엔드 테스트에는 크게 세가지 테스트가 있다.
![](https://images.velog.io/images/chaerin00/post/7dc1ac69-3ded-471d-b4b0-ef51870fa344/image.png)

- **유닛 테스트**
  : 가장 작은 단위의 테스트이며, 보통 메서드 레벨입니다.
  A라는 함수가 실행되면 B라는 결과가 나온다 정도로 테스트합니다.

- **통합 테스트**
  모듈을 통합하는 과정에서 모듈 간 호환성의 문제를 찾아내기 위해 수행되는 테스트입니다. 유닛 테스트와의 차이점은 유닛 테스트는 다른 컴포넌트들과 독립적인 반면 통합 테스트는 그렇지 않습니다.
- **E2E 테스트**
  해당 시스템과 해당 시스템을 구축하고 배포하는 프로세스를 모두 시험하는 것을 말합니다.

쉽게 생각하면 **유닛테스트**는 우리가 만드는 컴포넌트 하나에 대해 테스트 하는 것이며, 그 안에 들어가는 메소드들이 우리가 의도한 결과값을 내는지 테스트하면 되는 것이다.

## jest 문법

### jest setting

jest를 이용한 유닛테스트를 진행하려면 일단 프로젝트에 패키지들을 설치해줘야 한다. `yarn add jest enzyme enzyme-adapter-react-16`

설치가 끝나면 package.json에 아래 코드를 추가한다.

```json
"scripts": {
    ...
    "test": "jest",
    ...
  },
```

tests 폴더를 만든 후 sample.spec.js 또는 sample.test.js 파일을 만든다.

```javascript
// tests/sample.spec.js
test('This is a sample', () => {
  expect(true).toBe(true)
})
```

`yarn test`를 실행시키면 다음과 같은 결과가 나온다.
![](https://images.velog.io/images/chaerin00/post/1a945557-bed7-4ca9-89ea-3c24b70f7fa7/image.png)

jsx문법을 사용하기 위해 babel.config.js에 다음 코드를 추가해준다.

```
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
```

### 테스트 코드 작성

간단한 Counter 컴포넌트를 활용한 테스트 코드 예시이다.
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

실행결과는 다음과 같다.
![](https://images.velog.io/images/chaerin00/post/53713293-1a4f-42dd-8791-df03f6d56037/image.png)

### 코드 설명

- describe: test들을 블록으로 묶어준다.
- it: 각 test들을 의미한다.
- shallow: 리액트 컴포넌트를 렌더링 시켜준다.
- matcher
  : 위의 코드에서 toBeTruthy(), toBe와 같은 것
  이외에도 다양한 matcher들이 있다(https://jestjs.io/docs/using-matchers)

```js
it("click right arrow", () => {
    const wrapper = shallow(<Counter />);
    wrapper.find(".next").simulate("click");
    expect(wrapper.find(".page").text()).toBe("1");
```

위의 코드는 Counter 컴포넌트를 렌더링하여 className이 next인 element를 찾아 click 이벤트를 실행하였을 때, className이 page인 element의 text가 1이 될 것이라는 test를 실행하는 코드이다.
