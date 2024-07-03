---
title: '[CSS] CSS animation 알아보기'
date: 2021-04-07 18:05:47
category: 'CSS'
thumbnail: { thumbnailSrc }
draft: false
---

기존 velog 포스팅 https://velog.io/@chaerin00/CSS-CSS-Animation

<hr/>

CSS3 애니메이션은 엘리먼트에 적용되는 CSS 스타일을 다른 CSS 스타일로 부드럽게 전환시켜 줍니다. 애니메이션은 애니메이션을 나타내는 **CSS 스타일**과 애니메이션의 중간 상태를 나타내는 **키프레임**들로 이루어집니다.

### animation 속성

> 이 속성은 애니메이션의 중간상태를 기술하지 않는다는걸 명심하세요. 애니메이션의 중간 상태는 아래에서 다룰 **@keyframes** 규칙을 이용하여 기술합니다.

**animation** 속성의 하위 속성은 다음과 같습니다.

**animation-delay**
엘리먼트가 로드되고 나서 언제 애니메이션이 시작될지 지정합니다.
**animation-direction**
애니메이션이 종료되고 다시 처음부터 시작할지 역방향으로 진행할지 지정합니다.
**animation-duration**
한 싸이클의 애니메이션이 얼마에 걸쳐 일어날지 지정합니다.
**animation-iteration-count** (en-US)
애니메이션이 몇 번 반복될지 지정합니다. infinite로 지정하여 무한히 반복할 수 있습니다.
**animation-name** (en-US)
이 애니메이션의 중간 상태를 지정합니다. 중간 상태는 @keyframes 규칙을 이용하여 기술합니다.
**animation-play-state** (en-US)
애니메이션을 멈추거나 다시 시작할 수 있습니다.
**animation-timing-function** (en-US)
중간 상태들의 전환을 어떤 시간간격으로 진행할지 지정합니다.
**animation-fill-mode**
애니메이션이 시작되기 전이나 끝나고 난 후 어떤 값이 적용될지 지정합니다.
<br/><br/>

### @keyframes를 이용한 애니매이션의 중간상태 기술

CSS 스타일을 이용해 중간 상태에 어떻게 보일지 정의했다면 이 중간 상태가 전체 애니메이션에서 언제 등장할 지 <percentage> 를 이용해 지정합니다. 0%는 애니메이션이 시작된 시점을 의미하고 100%는 애니메이션이 끝나는 시점을 의미합니다. 최소한 이 두 시점은 기술되어야 브라우저가 언제 애니메이션이 시작되고 끝나는지 알 수 있습니다. **0%**와 **100%** 대신 **from** 과 **to**로 사용할 수도 있습니다.

시작 시점과 종료 시점 사이의 특정 시점에도 중간 상태를 지정할 수 있습니다.

<br/><br/>

### 실제 예제

실제 예제를 통해 animation이 어떻게 작동하는지 보겠습니다!

```
p {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```

위의 코드는 p가 3초동안 브라우저의 오른쪽에서 왼쪽으로 이동하는 애니메이션입니다.

<br/><br/><br/><hr/><br/><br/>

+)지난 기수 js 스터디에서 했던 예제 중에 animation이 적용된 것들을 가져와봤습니다!

https://github.com/chaerin00/javascript_study/tree/master/%EB%AA%A9%EC%82%B4%EC%B5%9C%EA%B3%A0
![](https://images.velog.io/images/chaerin00/post/3739ca55-8213-48da-8d30-1af709e20dd7/Animation_2021-04-06-13-54-40.gif)
https://github.com/chaerin00/javascript_study/tree/master/clock
![](https://images.velog.io/images/chaerin00/post/967831ff-df39-44c0-ba29-6340fc5a7dbe/Animation_2021-04-06-13-57-09.gif)
