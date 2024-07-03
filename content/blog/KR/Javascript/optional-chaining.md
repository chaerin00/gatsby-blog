---
title: '[JS] optional chaining (?.)'
date: 2021-06-18 16:05:21
category: Javascript
thumbnail: { thumbnailSrc }
draft: false
---

# 옵셔널 체이닝

## 언제 필요할까?🤔

![](https://images.velog.io/images/chaerin00/post/a6dc5c96-50d6-4c1e-ac59-76fb1c042488/image.png)
React로 작업하다가 서버와의 통신에서 오류가 생기면 저런 오류를 자주 보고는 한다.
이런 오류를 막아주기 위해서 주로 사용했던 방법은 조건부 렌더링이였다.

```jsx
{
  exp &&
    exp.map(exp => {
      return (
        <WanderCard
          key={exp.id}
          img={exp.img}
          type={exp.type}
          desc={exp.desc}
        />
      )
    })
}
```

이런 방법으로 오류를 막을 수도 있지만 **옵셔널 체이닝**을 사용해서도 이런 구현이 가능하다.

```jsx
{
  exp?.map(exp => {
    return (
      <WanderCard key={exp.id} img={exp.img} type={exp.type} desc={exp.desc} />
    )
  })
}
```

다음과 같이 작성하여도 exp에 아무런 값이 들어있지 않을 때 오류를 발생시키지 않는다.

## 옵셔널 체이닝 문법

?.은 ?.'앞’의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환한다.

```jsx
let user = null

alert(user?.address) // undefined
alert(user?.address.street) // undefined
```

위 예시를 통해 우리는 ?.은 ?. ‘앞’ 평가 대상에만 동작되고, 확장은 되지 않는다는 사실을 알 수 있다.

참고로 위 예시에서 사용된 user?.는 user가 null이나 undefined인 경우만 처리할 수 있다.

user가 null이나 undefined가 아니고 실제 값이 존재하는 경우엔 반드시 user.address 프로퍼티는 있어야 합니다. 그렇지 않으면 user?.address.street의 두 번째 점 연산자에서 에러가 발생한다.

## 단락평가

?.는 왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춘다. 이런 평가 방법을 단락 평가(short-circuit)라고 부른다.

그렇기 때문에 함수 호출을 비롯한 ?. 오른쪽에 있는 부가 동작은 ?.의 평가가 멈췄을 때 더는 일어나지 않는다.

```jsx
let user = null
let x = 0

user?.sayHi(x++) // 아무 일도 일어나지 않습니다.

alert(x) // 0, x는 증가하지 않습니다.
```

## 실제 예시

```jsx
{
  exp?.map(exp => {
    return (
      <WanderCard key={exp.id} img={exp.img} type={exp.type} desc={exp.desc} />
    )
  })
}
```

아까 보았던 서버와의 통신 예시를 다시 한번 살펴보면 서버에서 받아오는 exp가 null이면 단락평가에 의해 map이 작동되지 않는다.

그래서 조건부렌더링과 같은 효과를 내서 오류를 막아낼 수 있는 것이다.

# 참고자료📕

https://ko.javascript.info/optional-chaining
