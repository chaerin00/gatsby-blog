---
title: '[JS] Optional Chaining 활용'
date: 2021-06-18 16:10:67
category: Javascript
thumbnail: { thumbnailSrc }
draft: false
---

## 문제상황🤯

![](https://images.velog.io/images/chaerin00/post/3742d49f-22de-425f-9281-9651b655ebc2/Animation_2021-06-18-18-09-40.gif)
내가 만들려는 화면은 사진과 같이 input 창에 새 디렉토리명을 입력하고 저장버튼을 누르면 카드 위에 떠있는 화면이 사라지고 저장화면이 나오는 것이였다.
하지만 저장버튼을 누르고 카드 위에 떠있는 화면은 사라졌지만 저장화면이 나오질 않았다. 그 이유는 바로 input창에 focus가 꺼지면 카드 위에 떠있는 화면이 사라지도록 만들어놨는데 그 이벤트가 저장버튼을 눌렀을 때 실행되는 이벤트보다 먼저 일어나서 저장이 일어나지 않고 바로 화면이 꺼져버린 것이였다.

그래서 코드를 다음과 같이 수정했다.

```jsx
<ButtonWrap isShow={isShow} inputChange={inputChange}>
  <input
    className="addInput"
    placeholder="새 디렉토리 명을 입력하세요"
    onChange={e => {
      inputText.onChange(e)
      setInputChange(true)
    }}
    onFocus={e => {
      e.stopPropagation()
      setCardHoverInputState(true)
    }}
    onBlurCapture={e => {
      e.stopPropagation()
      console.log(e.relatedTarget.className)
      if (e.relatedTarget.className !== 'addBtn') {
        setCardHoverInputState(false)
      }
    }}
    value={inputText.value}
    maxLength={20}
    onKeyPress={onKeyPress}
  />
  <button className="addBtn" onClick={addDirHandler}>
    저장
  </button>
</ButtonWrap>
```

클릭 이벤트가 일어난 컴포넌트의 className이 "addBtn"이 아닐 때 저장 버튼이 눌리지 않았을 때만 카드 위에 떠있는 화면을 사라지도록 구성한 것이다.
이렇게 실행시키자 에러가 났다...😂 그 이유는 사용자가 클릭한 곳이 null로 찍히는 경우가 있었기 때문이다. null의 클래스 이름은 가져올 수 없기 때문에 error가 난 것이다.

어떻게 해결할까 고민하다가 **옵셔널 체이닝**이 떠올랐다.

## 문제해결🤗

> ?.은 ?.'앞’의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환한다.

저번 [옵셔널 체이닝 포스팅](https://velog.io/@chaerin00/JS%EC%98%B5%EC%85%94%EB%84%90-%EC%B2%B4%EC%9D%B4%EB%8B%9D)에서 가져온 문장이다. 옵셔널체이닝에서 ?.앞의 평가대상이 null이면 undefined를 반환하고 끝나기 때문에 오류가 나지 않는다.

`e.relatedTarget.className`을 `e?.relatedTarget?.className`로 수정해주면 이벤트가 발생한 곳이 null로 찍혀도 className을 불러오지 않고 undefined를 반환하기 때문에 오류를 피할 수 있는 것이다.

이를 적용하여 코드를 수정해보았다.

```jsx
<ButtonWrap isShow={isShow} inputChange={inputChange}>
  <input
    className="addInput"
    placeholder="새 디렉토리 명을 입력하세요"
    onChange={e => {
      inputText.onChange(e)
      setInputChange(true)
    }}
    onFocus={e => {
      e.stopPropagation()
      setCardHoverInputState(true)
    }}
    onBlurCapture={e => {
      e.stopPropagation()
      console.log(e?.relatedTarget?.className)
      if (e?.relatedTarget?.className !== 'addBtn') {
        setCardHoverInputState(false)
      }
    }}
    value={inputText.value}
    maxLength={20}
    onKeyPress={onKeyPress}
  />
  <button className="addBtn" onClick={addDirHandler}>
    저장
  </button>
</ButtonWrap>
```

**console 출력결과**
![](https://images.velog.io/images/chaerin00/post/7a6879bd-6ea7-4c36-97c8-877e4191d841/image.png)

옵셔널 체이닝의 결과로 undefined를 반환한 것을 확인할 수 있었다!

## 느낀점

사실 옵셔널체이닝 포스팅을 하면서 서버에서 결과를 받아오는 것 이외에 다른 예시는 찾아보기 힘들어서 활용을 거의 못하고 있었는데, 이런 식으로 유용하게 사용될 수 있는 개념이라는 걸 느꼈다.

옵셔널 체이닝을 몰랐다면 `? :`나 `&&` `if{...}else{...}`를 활용해야 했을텐데 그것보다 훨씬 간결한 `?.`으로 해결해서 코드가 더 깔끔해진 것 같다!
