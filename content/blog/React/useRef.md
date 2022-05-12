---
title: 'useRef로 여러 개의 DOM 제어하기'
date: 2022-05-12 16:05:76
category: React
thumbnail: { thumbnailSrc }
draft: false
---

## useRef로 여러개의 DOM을 제어해야 하는 상황🤔

![](https://images.velog.io/images/chaerin00/post/e68b0eb6-dd78-45ec-b0ac-257e88a1f75d/Animation_2021-06-18-17-26-10.gif)
![](https://images.velog.io/images/chaerin00/post/21105603-6895-4b96-9d38-b72300afd10f/image.png)
저 회색 점들이 선택되는 페이지에 따라서 주황색 길쭉한 점으로 바뀌어야 했다. 사실 state를 사용해서 props로 element에 넘겨주고 css조작하는 방법도 있었지만 useRef로도 가능한 방법을 찾아서 useRef를 이용해보았다.

### 1. useRef 선언

```jsx
const carouselRef = useRef([])
```

다음과 같이 useRef의 초기값을 빈 배열로 주면 여러개의 DOM element를 담을 수 있다.

### 2. element에 ref 넘겨주기

```jsx
<Carousel>
  <div className="circle" ref={elem => (carouselRef.current[0] = elem)} />
  <div className="circle" ref={elem => (carouselRef.current[1] = elem)} />
  <div className="circle" ref={elem => (carouselRef.current[2] = elem)} />
  <div className="circle" ref={elem => (carouselRef.current[3] = elem)} />
  <div className="circle" />
</Carousel>
```

위에서 carouselRef를 배열로 초기화했기 때문에 `ref={carouselRef}`가 아닌 `ref={elem => (carouselRef.current[0] = elem)}` 배열의 index를 설정해주어야 한다. 이후에 `console.log(caraouselRef.current[0]`을 출력해보면 `<div className="circle"></div>`첫번째 circle div가 출력된다. 이제 하나의 ref로 4개의 element를 조작할 수 있게 되었다.

### 3. 해당 DOM element 조작

```jsx
useEffect(() => {
  if (currentSlide !== 4) {
    carouselRef.current[currentSlide].style.width = '2.8rem'
    carouselRef.current[currentSlide].style.background = '#FF7134'
    if (currentSlide !== 0) {
      carouselRef.current[currentSlide - 1].style.width = '0.8rem'
      carouselRef.current[currentSlide - 1].style.background = '#F7F0ED'
    }
    if (currentSlide !== 4) {
      carouselRef.current[currentSlide + 1].style.width = '0.8rem'
      carouselRef.current[currentSlide + 1].style.background = '#F7F0ED'
    }
  }
}, [currentSlide])
```

currentSlide는 현재 페이지 번호를 나타내는 state이다. ref를 이용하여 현재 페이지 번호에 해당하는 회색점의 길이와 색상을 변경해준다. 다음 버튼을 눌러주었을 때, currentSlide가 0이 아닐 경우 왼쪽점은 이전 상태로 돌려주어야 한다. 이전 버튼을 누를 때, 마찬가지로 해당 페이지가 마지막 페이지가 아닐 경우 오른쪽 점은 이전 상태로 돌려주어야 한다.

## 마무리😎

사실 useRef로 style을 제어하는건 그닥 좋은 방법이 아니다. 더 좋은 방법은 state를 만들어서 CSS 에서 조작하는 것이지만, CSS 조작이 아닌 다른 경우에 여러개의 DOM element를 제어해야 하는 상황이 있다면 useRef를 다음과 같이 활용해본다면 좋을 것 같다😀

<hr/>
참고자료📕

[https://sukjae.github.io/posts/using-react-ref-for-multiple-dom-element-control](https://sukjae.github.io/posts/using-react-ref-for-multiple-dom-element-control)
