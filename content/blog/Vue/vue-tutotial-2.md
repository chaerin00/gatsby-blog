---
title: '[Vue.js 시작하기] #1. Vue 인스턴스와 파일구조'
date: 2021-11-29 16:06:05
category: Vue
thumbnail: { thumbnailSrc }
draft: false
---

## 프로젝트 세팅

튜토리얼을 시작하기 앞서 기본적인 eslint, scss 사용을 위한 세팅을 해놓은 vue template을 github에 올려놓았습니다.

> https://github.com/chaerin00/vue-template

```
git clone https://github.com/chaerin00/vue-template
```

일단 클론을 받은 후 프로젝트를 시작시켜 줍니다.

```
// package install
yarn

// project start localhost:8080
yarn start
```

![](https://images.velog.io/images/chaerin00/post/2c481751-c4ea-46e8-b085-0f1bb1a34289/image.png)

그럼 다음과 같이 프로젝트가 실행됩니다.
이제 이 프로젝트를 통해 Vue instance와 Vue Component, 파일구조를 살펴보겠습니다.

(❗ 현재 프로젝트에서는 eslint와 prettier의 설정이 충돌이 날 수 있기 때문에 prettier는 꺼주셔야합니다 ❗)

## Vue instance

src/main.js에서는 다음과 같이 Vue instance를 생성시켜 주고 있습니다.

```javascript
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
```

> 모든 Vue 앱은 Vue 함수로 새 Vue 인스턴스를 만드는 것부터 시작합니다.

뷰 인스턴스에는 다양한 옵션들([전체 옵션 목록](https://kr.vuejs.org/v2/api/#propsData))이 있습니다. 이 튜토리얼에서는 모든 옵션들은 다루지 못하지만 많이 사용되는 옵션들에 대해 설명할 것입니다. 그리고 이 포스팅에서는 data에 대해 먼저 간략하게 설명하도록 하겠습니다.

### data

> Vue 인스턴스가 생성될 때 data 객체에 있는 모든 속성이 Vue의 반응형 시스템에 추가됩니다. 각 속성값이 변경될 때 뷰가 “반응”하여 새로운 값과 일치하도록 업데이트됩니다.

```javascript
var data = { a: 1 }

// Vue인스턴스에 데이터 객체를 추가합니다.
var vm = new Vue({
  data: data,
})

// 인스턴스에 있는 속성은
// 원본 데이터에 있는 값을 반환합니다.
vm.a === data.a // => true

// 인스턴스에 있는 속성값을 변경하면
// 원본 데이터에도 영향을 미칩니다.
vm.a = 2
data.a // => 2

// ... 반대로 마찬가지입니다.
data.a = 3
vm.a // => 3
```

위의 내용은 공식문서의 vue instance의 data에 대한 설명입니다. vue instance에는 data라는 객체가 있습니다. 이 객체의 속성값(value)가 변하게 되면 변경된 속성값을 참조하는 element들은 변경된 값으로 UI의 업데이트가 일어납니다. React의 state와 유사하다고 생각하시면 됩니다.

### Vue Component

우리가 vue 파일구조를 이해하기 위해서 알아야하는 것이 바로 Vue component 입니다.

> 컴포넌트는 Vue의 가장 강력한 기능 중 하나입니다. ...
> Vue 컴포넌트는 Vue 인스턴스이기도 합니다. 그러므로 모든 옵션 객체를 사용할 수 있습니다. (루트에만 사용하는 옵션은 제외) 그리고 같은 라이프사이클 훅을 사용할 수 있습니다.

Vue 컴포넌트는 Vue 인스턴스이기도 하기 때문에 vue instance가 가지는 template, data 등의 옵션을 가집니다. 하지만 vue compoenent가 vue instance와 다른 점은 data가 객체가 아닌 함수여야 한다는 점입니다.

```javascript
var data = { counter: 0 }

Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  data: function() {
    return data
  },
})
```

## .vue 파일구조

위의 내용은 .vue 파일구조를 이해하기 위한 개념이였고, 이제 본격적으로 파일구조를 살펴보겠습니다.

아래 코드는 `src/components/HelloWorld.vue` 파일의 내용입니다.

```
<template>
  <div class="hello">
    <h1 class="hello-text">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Vue.js 시작하기'
    }
  }
}
</script>

<style scoped lang="scss">
.hello {
  &-text {
    color: green;
  }
}
</style>
```

### template

> Vue.js는 렌더링 된 DOM을 기본 Vue 인스턴스의 데이터에 선언적으로 바인딩 할 수있는 HTML 기반 템플릿 구문을 사용합니다. 모든 Vue.js 템플릿은 스펙을 호환하는 브라우저 및 HTML 파서로 구문 분석 할 수있는 유효한 HTML입니다.

위의 내용은 Vue.js 공식 튜토리얼 문서에 나와있는 template에 대한 설명입니다.
`<template> </template>` 안에 들어가는 내용은 Vue instance의 template 옵션에 해당하는 부분이자, 화면에 나오는 내용들을 구성하는 HTML이라고 이해하면 됩니다.
template 문법은 크게 뷰 인스턴스에서 관리하는 데이터를 화면에 연결하는 **데이터 바인딩**과 DOM 조작을 쉽게할 수 있는 문법인 **디렉티브**로 나뉩니다.

#### 데이터바인딩

```js
<h1 class="hello-text">{{ msg }}</h1>
```

“Mustache” 문법인 “{{ }}”를 활용하여 인스턴스의 data, computed, props 속성을 연결할 수 있습니다. 위의 예시는 뷰 인스턴스의 data를 데이터바인딩하여 문자열을 화면에 보여주는 것입니다.

문자열 외에도 Vue.js는 모든 데이터 바인딩 내에서 JavaScript 표현식의 모든 기능을 지원합니다.

```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

```

#### 디렉티브

> 디렉티브는 v- 접두사가 있는 특수 속성입니다. 디렉티브 속성 값은 단일 JavaScript 표현식 이 됩니다. (나중에 설명할 v-for는 예외입니다.) 디렉티브의 역할은 표현식의 값이 변경될 때 사이드이펙트를 반응적으로 DOM에 적용하는 것 입니다.

위의 글은 vue 공식문서의 디렉티브에 대한 설명입니다. 템플릿에 코드를 추가하면서 디렉티브에 대해 이해해보겠습니다.

HelloWorld.vue의 template부분의 코드를 다음과 같이 수정해줍니다.

```js
<template>
  <div class="hello">
    <h1 v-if="false" class="hello-text">
      {{ msg }}
    </h1>
  </div>
</template>
```

이제 화면에 아무것도 없이 빈화면이 나오게 됩니다. v-if의 값이 false로 지정하여 DOM에서 해당 element를 제거한 것입니다. v-if안에 들어가는 값은 상수값이 아닌 변수로도 지정이 가능합니다. 화면에 버튼을 추가하여 변수를 조작해보겠습니다.

```js
<template>
  <div class="hello">
    <h1 v-if="show" class="hello-text">{{ msg }}</h1>
    <button v-on:click="show = !show">click</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Vue.js 시작하기',
      show: false
    }
  }
}
</script>

<style scoped lang="scss">
.hello {
  &-text {
    color: green;
  }
}
</style>
```

![](https://images.velog.io/images/chaerin00/post/99bff814-28df-480a-a011-c8858e03d339/Animation_2021-11-29-17-30-38.gif)

`v-on:click`을 사용하여 버튼에 클릭 이벤트가 발생했을 때 show 변수를 변경하고 show 변수를 v-if로 참조하고 있는 element의 변경사항이 생기고 DOM에 변경이 일어나게 됩니다.

> 디렉티브의 역할은 표현식의 값이 변경될 때 사이드이펙트를 반응적으로 DOM에 적용하는 것 입니다.

이제 위의 공식문서의 설명이 이해가 가실 겁니다.
나중에 v-model, v-bind 등을 설명하면서 더 다양한 디렉티브들을 살펴보도록 하겠습니다.

### script

Vue 인스턴스의 template과 style을 제외한 나머지 옵션들이(data, mounted, created, method...) 여기 들어가게 됩니다.

### style

template에서 사용된 html 태그들의 스타일을 지정하는 부분입니다. css문법을 사용하고 설정에 따라 scss도 사용가능합니다. (현재 사용중인 vue template에는 scss적용이 완료된 상태)

<hr/>
이 다음 포스팅에서는 아까 다 설명하지 못하고 넘어간 Vue instance의 옵션들(mounted, created, methods, props...)에 대해 살펴보도록 하겠습니다!

![](https://images.velog.io/images/chaerin00/post/2162c8b9-04d5-44e8-9445-73de364ebaa4/image.png)

<hr/>

참고: [Vue instance 공식문서](https://kr.vuejs.org/v2/guide/instance.html)
