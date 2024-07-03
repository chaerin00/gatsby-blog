---
title: 'Uncaught TypeError: Vue is not a constructor 에러 해결'
date: 2022-02-24 17:05:79
category: BugFix
thumbnail: { thumbnailSrc }
draft: false
---

HTML파일에서 Vue를 설치하는 방법 중 CDN을 활용하는 방법이 있습니다.
https://kr.vuejs.org/v2/guide/installation.html#CDN

회사의 POS 프로그램의 popup.html에서 CDN을 이용해 Vue를 설치하는 방식을 사용하고 있었는데, 최근 팝업이 제대로 뜨지 않는 버그가 생겨서 확인해보니 다음과 같은 Error가 발생하고 있었습니다.
![](https://images.velog.io/images/chaerin00/post/6ef3a5e9-456e-4495-9063-0d0f5faabc60/j4SVk.png)

해당 파일의 코드는 다음과 같았습니다.

```js
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<body>
	<script type="text/javascript">
    	const app = new Vue({
        	el: '#app',
        	...
        })
    </script>
</body>
```

### 문제 상황

```js
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

위와 같이 입력을 하게 되면 최신 버전의 Vue가 설치되게 되는데, 최근 Vue3가 default로 변경이 되었습니다.
(관련 블로그: https://yohanpro.com/posts/vue3/vue3-default)

Vue3 문법에서는 Vue2에서 사용하는 `new Vue()` 대신 `createApp`을 사용합니다.

_📍 Vue3_

```js
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

_📍 Vue2_

```js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App),
}).$mount('#app')
```

CDN에서는 Vue 생성자를 사용하지 않는 Vue3를 설치하고 코드에서는 `new Vue({})`를 사용했기에 `Vue is not a constructor` 라는 오류가 발생한 것입니다.

### 해결방법

간단한 해결방법은 CDN에서 특정버전을 설치하도록 `<script>`를 수정하는 것입니다.

```js
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
```

이렇게도 문제를 해결할 수 있긴 하지만 더 확실한 방법은 `vue.min.js` static 폴더에 저장하는 것입니다.

https://cdn.jsdelivr.net/npm/vue@2.6.12 의 내용을 복사하여 프로젝트의 `static/js/vue.min.js` 파일을 생성해주었습니다.

그리고 HTML 파일에서 CDN에서 설치하는 내용 대신 static 폴더에서 불러오도록 수정합니다.

```js
<script src="/static/js/vue-2.6.0.min.js"></script>
```

<hr/>
Vue3가 default로 바뀌었다는 것은 알고 있었지만 이런 문제가 발생할 수 있다는 건 상상도 못하고 있었습니다. 버전을 명시해주는 것이 얼마나 중요한지 모르고 있었는데 이번 일을 계기로 확실히 깨달을 수 있었던 것 같습니다 🥲
