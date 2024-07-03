---
title: '[JS] Promise 객체와 Promise의 method들'
date: 2021-04-23 15:05:54
category: Javascript
thumbnail: { thumbnailSrc }
draft: false
---

## Promise란?

![](https://poiemaweb.com/img/block_nonblock.png)
위에 그림은 동기, 비동기에 대한 설명을 담은 그림입니다. 데이터를 요청하고 응답이 올 때까지 다른 task들을 처리할 수 있도록 하는게 비동기입니다.
**promise**는 위의 비유에서 **진동벨**과 같은 역할을 한다고 생각할 수 있을 것 같습니다. 사장님과 손님을 진동벨이 연결해주는 것처럼, 프라미스(promise) 는 '제작 코드’와 '소비 코드’를 연결해 주는 특별한 자바스크립트 객체입니다. '제작 코드'와 '소비 코드'에 대한 설명은 아래에서 코드를 보며 설명하도록 하겠습니다.

```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve('done!'), 1000)
  //executor, 제작코드
})

promise.then(
  result => alert(result),
  error => alert(error)
  //소비 코드
)
```

위 코드의 결과는 1초 후에 "done!"이 출력되는 것 입니다. 그 이유를 천천히 알아보도록 하겠습니다.

executor의 인수 resolve와 reject는 자바스크립트가 자체적으로 제공하는 콜백입니다. 개발자는 resolve와 reject를 신경 쓰지 않고 executor 안 코드만 작성하면 됩니다.

대신 executor에선 결과를 즉시 얻든, 늦게 얻든 상관없이 상황에 따라 인수로 넘겨준 콜백 중 하나를 반드시 호출해야 합니다.

- resolve(value) — 일이 성공적으로 끝난 경우, 그 결과를 나타내는 value와 함께 호출
- reject(error) — 에러 발생 시 에러 객체를 나타내는 error와 함께 호출

result는 promise객체의 내부 poperty로 처음엔 undefined이었다, resolve(value)가 호출되면 value로, reject(error)가 호출되면 error로 변합니다.

위의 코드의 결과가 "done"이 되는 이유는 resolve("done")에 의해 result의 값이 resolve함수의 인수인 "done!"으로 변했기 때문입니다.

위에서 언급했던 카페 사장님과 손님의 관계를 다시 생각해보자면, **제작코드**(executor)는 **사장님**입니다. 그 사장님이 완성한 **커피**는 **result**가 되겠죠. 그리고 그 커피를 받는 **손님**은 **소비코드**가 되는 것입니다. 그리고 이 과정에서 커피의 완성을 알려주는 **진동벨**이 바로 **Promise**가 되는 것입니다!

state와 같은 promise에 대한 더 많은 내용이 있지만 간단히 하고 본격적으로 promise.all(), promise.race(), promise.finally()에 대해 다뤄보겠습니다.
<br/>

## Promise.all()

```javascript
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo1')
})
const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo2')
})

Promise.all([promise1, promise2, promise3, promise4]).then(values => {
  console.log(values)
})
//output: Array [3, 42, "foo1","foo2"]
```

처리하고자 하는 프로미스들을 배열로 담아 Promise.all에 인자로 전달하면 배열에 있는 모든 프로미스들이 거의 동시에 트리거 됩니다.
그래서 promise3, promise4의 결과는 각각 1초가 걸리지만 동시에 트리거 되기 때문에 2초후에 결과가 나오는 것이 아닌 1초 후에 결과가 나오게 되는 것입니다.

promise.all()을 사용할 때 주의해야할 점은 배열 내 요소 중 어느 하나라도 거부하면 즉시 거부한다는 것입니다.

```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('하나'), 1000)
})
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('둘'), 2000)
})
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('셋'), 3000)
})
var p4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('넷'), 4000)
})
var p5 = new Promise((resolve, reject) => {
  reject(new Error('거부'))
})

// .catch 사용:
Promise.all([p1, p2, p3, p4, p5])
  .then(values => {
    console.log(values)
  })
  .catch(error => {
    console.log(error.message)
  })

// 콘솔 출력값:
// "거부"
```

위의 코드에서 p5가 Error를 반환하기 때문에 p1, p2, p3, p4의 결과는 출력되지 못하게 됩니다.
만일 p1, p2, p3, p4의 결과를 보고 싶다면 발생할 수 있는 거부를 사전에 처리하면 됩니다.

```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('p1_지연_이행'), 1000)
})

var p2 = new Promise((resolve, reject) => {
  reject(new Error('p2_즉시_거부'))
})

Promise.all([
  p1.catch(error => {
    return error
  }),
  p2.catch(error => {
    return error
  }),
]).then(values => {
  console.log(values[0]) // "p1_지연_이행"
  console.log(values[1]) // "Error: p2_즉시_거부"
})
```

위의 코드를 해석하면 p2에서 발생하는 거부를 .catch()를 이용하여 미리 처리 하였기 때문에 결과 배열에 p1의 결과와 p2의 error내용이 담기게 된 것입니다.
<br/>

## Promise.race()

Promise.all()이 실행한 모든 프로미스들의 결과값을 배열로 받는 것과 달리 Promise.race()는 가장 빨리 응답을 받은 결과값만 resolve합니다.
쉽게 생각해보자면 프로미스들끼리 경주를 해서 가장 빨리 도착한 promise의 result만이 .then() 구문으로 넘어갈 수 있는 것입니다!

```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('하나'), 1000)
})
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('둘'), 2000)
})
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('셋'), 3000)
})
var p4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('넷'), 4000)
})

Promise.race([p1, p2, p3, p4, p5]).then(value => {
  console.log(value)
})

// 콘솔 출력값:
// "하나"
```

위의 코드에서 보면 가장 빨리 실행이 완료된 p1의 result인 '하나'만 콘솔에 찍힌 것을 확인할 수 있습니다.

에러가 발생할 때도 마찬가지로 가장 빨리 발생한 error만 catch구문으로 넘어갑니다.

```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject('하나'), 1000)
})
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject('둘'), 2000)
})
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => reject('셋'), 3000)
})
var p4 = new Promise((resolve, reject) => {
  setTimeout(() => reject('넷'), 4000)
})

Promise.race([p1, p2, p3, p4, p5])
  .then(value => {
    console.log(value)
  })
  .catch(error => {
    console.log('error', error)
  })

// 콘솔 출력값:
// error 하나
```

<br/>

## Promise.finally()

finally() 메소드는 Promise 객체를 반환합니다. Promise가 처리되면 충족되거나 거부되는지 여부에 관계없이 지정된 콜백 함수가 실행됩니다. 이것은 Promise가 성공적으로 수행 되었는지 거절되었는지에 관계없이 Promise가 처리 된 후에 코드가 무조건 한 번은 실행되는 것을 제공합니다.

```javascript
let isLoading = true

//fetch는 promise 객체를 반환하는 함수
fetch(myRequest)
  .then(function(response) {
    var contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    }
    throw new TypeError("Oops, we haven't got JSON!")
  })
  .then(function(json) {
    /* process your JSON further */
  })
  .catch(function(error) {
    console.log(error)
  })
  .finally(function() {
    isLoading = false
  })
```

다음 코드를 살펴보면 fetch의 결과에 상관없이 .finally()구문이 실행되어서 isLoading의 상태는 false가 됩니다.
<br/><br/><br/>

<hr/>

출처:
https://poiemaweb.com/js-async
https://ko.javascript.info/promise-basics
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
