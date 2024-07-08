---
title: '[TS] Typescript Drum Kit'
date: 2022-04-02 17:05:43
category: TypeScript
thumbnail: { thumbnailSrc }
draft: false
---

회사에 계신 분들과 javascript 30일 챌린지에 함께 하게 되었다.
https://courses.wesbos.com/account/access/6246d1e6d3e09a4497112612
코스의 첫번째 과제인 drum kit를 typescipt로 구현해본 예제이다. 원래는 keyboard event로 동작하는 과제로 keyboardEvent의 keyCode를 사용하는데 keyCode는 deprecated 되었다고 해서 click 이벤트로 만들어보았다.
![](https://media.vlpt.us/images/chaerin00/post/d88536ec-b109-40fe-9090-242e30629f73/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.34.53.png)

## 코드

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My drum sounds Du Dung Du Dung</title>
    <link rel="stylesheet" href="style.css" />
    <script defer src="./script.js"></script>
  </head>
  <body>
    <div class="keys">
      <div data-key="clap" class="key">
        <div class="code">A</div>
        <span class="sound">clap</span>
      </div>
      <div data-key="hihat" class="key">
        <div class="code">S</div>
        <span class="sound">hihat</span>
      </div>
      <div data-key="kick" class="key">
        <div class="code">D</div>
        <span class="sound">kick</span>
      </div>
      <div data-key="openhat" class="key">
        <div class="code">F</div>
        <span class="sound">openhat</span>
      </div>
      <div data-key="boom" class="key">
        <div class="code">G</div>
        <span class="sound">boom</span>
      </div>
      <div data-key="ride" class="key">
        <div class="code">H</div>
        <span class="sound">ride</span>
      </div>
      <div data-key="snare" class="key">
        <div class="code">J</div>
        <span class="sound">snare</span>
      </div>
      <div data-key="tom" class="key">
        <div class="code">K</div>
        <span class="sound">tom</span>
      </div>
      <div data-key="tink" class="key">
        <div class="code">L</div>
        <span class="sound">tink</span>
      </div>
    </div>
  </body>
</html>
```

기본으로 주는 html 예제에는 `<audio>`태그가 있었는데 audio 태그를 `querySelect`해서 play하는 것보다 `new Audio` 생성자를 이용하는게 더 깔끔한 코드라고 생각이 돼서 audio 태그는 삭제하였다.

또 data-key에는 keyCode에 해당하는 숫자들이 있었는데, 나중에 new Audio로 파일을 가져오기 쉽도록 sound 파일과 같은 이름으로 수정했다.

### style.css

css는 거의 완전히 똑같은데 기존 html에 `<kbd>` 태그를 이용하는 부분을 삭제했기 때문에 `kbd`로 되어있던 style만 `.code`로 수정했다.

```scss
html {
  font-size: 10px;
  background: url('./background.jpg') bottom center;
  background-size: cover;
}

body,
html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.keys {
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.key {
  border: 0.4rem solid black;
  border-radius: 0.5rem;
  margin: 1rem;
  font-size: 1.5rem;
  padding: 1rem 0.5rem;
  transition: all 0.07s ease;
  width: 10rem;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 0.5rem black;
}

.playing {
  transform: scale(1.1);
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
}

.code {
  display: block;
  font-size: 4rem;
}

.sound {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: #ffc600;
}
```

### script.ts

```ts
const removeTransition = (e: MouseEvent) => {
  const target = e.target as HTMLDivElement
  target.classList.remove('playing')
}

const playSound = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLDivElement
  target.classList.add('playing')
  const sound = target.dataset.key
  const audio = new Audio(`./sounds/${sound}.wav`)
  audio.play()
}

const drumKeys: NodeListOf<Element> = document.querySelectorAll('.key')

drumKeys.forEach(drumKey => {
  drumKey.addEventListener('transitionend', removeTransition)
  drumKey.addEventListener('click', playSound)
})
```

ts파일은 다음과 같이 작성하였다. React의 `MouseEvent` 타입은 제네릭으로 `MouseEvent<HTMLDivElement>` 이렇게 사용할 수 있지만 그냥 ts는 제네릭 타입이 아니기 때문에 target의 타입을 `e.currentTarget as HTMLDivElement` 이렇게 지정해주어야 한다.

React처럼 MouseEvent 타입을 지정해보고 싶어서 React의 MouseEvent 타입을 열어보니 다음과 같이 아주 복잡하게 선언되어있어서 그냥 `as`를 사용하기로 했다...🥲

```ts
interface MouseEvent<T = Element, E = NativeMouseEvent> extends UIEvent<T, E> {
  altKey: boolean
  button: number
  buttons: number
  clientX: number
  clientY: number
  ctrlKey: boolean
  /**
   * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
   */
  getModifierState(key: string): boolean
  metaKey: boolean
  movementX: number
  movementY: number
  pageX: number
  pageY: number
  relatedTarget: EventTarget | null
  screenX: number
  screenY: number
  shiftKey: boolean
}
```

## 실행결과

컴파일된 후에 es6 문법을 사용하도록 tsconfig.json을 설정해주고 `tsc` 명령어를 이용해 `script.js` 로 컴파일 해주었다.

```json
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "commonjs"
  }
}
```

### 컴파일 결과 - script.js

```javascript
const removeTransition = e => {
  const target = e.target
  target.classList.remove('playing')
}
const playSound = e => {
  const target = e.currentTarget
  target.classList.add('playing')
  const sound = target.dataset.key
  const audio = new Audio(`./sounds/${sound}.wav`)
  audio.play()
}
const drumKeys = document.querySelectorAll('.key')
drumKeys.forEach(drumKey => {
  drumKey.addEventListener('transitionend', removeTransition)
  drumKey.addEventListener('click', playSound)
})
```

![](https://media.vlpt.us/images/chaerin00/post/619e98e8-e63d-44bf-b982-1075dbc7ea2e/Apr-02-2022%2017-51-28.gif)

<hr/>
이번 예제는 시간이 좀 걸렸지만 다음엔 더 후다닥 만들 수 있으면 좋겠다...!!😆
