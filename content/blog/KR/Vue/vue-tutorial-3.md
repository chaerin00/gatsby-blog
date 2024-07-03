---
title: '[Vue.js 시작하기] #2. Vue <script> 태그 속 내용들'
date: 2021-11-29 16:20:37
category: Vue
thumbnail: { thumbnailSrc }
draft: false
---

지난 포스팅에서 Vue 인스턴스와 파일구조에 대해 알아보았습니다.
.vue 파일은 크게 template, script, style로 나누어집니다. 이번 포스팅에서는 이 중 script에 들어가는 내용을 살펴보도록 하겠습니다.

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
  data() {
    return {
      msg: 'Vue.js 시작하기',
      show: false,
    }
  },
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

> 📍 저는 이번 포스팅에서는 모든 내용을 다룰 수 없기에 data, methods, computed, watch, created만 다루도록 하겠습니다!

### data

Vue instance의 data는 객체입니다. data 객체 안에는 문자열, 숫자, 배열, 객체, boolean 등의 내용이 들어갈 수 있습니다.

```js
var data = {
  a: 1,
  something: [],
  isVue: false,
  name: {
    first: '채린'
    last: '안'
  }
}

var vm = new Vue({
  data: data
})

console.log(vm.a) // 1
```

data script 내에서 정의하기 위해서는 data 객체를 return하는 함수 형태로 작성해야합니다.

```js
data () {
  return {
    msg: 'Vue.js 시작하기'
  }
}
// 또는
data: () => {
  return {
    msg: 'Vue.js 시작하기'
  }
}
// 또는
data: () => ({
  msg: 'Vue.js 시작하기'
})
```

### methods

HelloWorld.vue 파일에 다음과 같이 openAlert method와 버튼을 추가해줍니다. 버튼을 클릭하면 alert가 뜹니다.

```js
<template>
  <div class="hello">
    <h1 class="hello-text">{{ msg }}</h1>
    <button @click="openAlert">open alert</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      msg: 'Vue.js 시작하기',
    }
  },
  methods: {
    openAlert() {
      alert('open')
    },
  },
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

![](https://images.velog.io/images/chaerin00/post/777f208b-8e2f-4708-a18c-486d2eeadca9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-26%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%201.00.47.png)
여러 개의 메소드를 작성할 수도 있고, async - await를 이용한 비동기 함수도 만들 수 있습니다.

```js
 methods: {
    openAlert () {
      alert('open')
    },
    async openLateAlert () {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert('open late')
    }
  }
```

method에서 Vue instance의 data나 method를 사용하려면 앞에 this를 붙여주어야 합니다! (여기서 this는 Vue instance를 의미함)
다음과 같이 코드를 작성한 후 prompt에 새로운 값을 입력하면 msg가 업데이트 되는 것을 확인할 수 있습니다.

```js
<template>
  <div class="hello">
    <h1 class="hello-text">{{ msg }}</h1>
    <button @click="openPrompt()">update message</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      msg: 'Vue.js 시작하기',
    }
  },
  methods: {
    openPrompt() {
      const newMsg = prompt('open')
      // changeMessage method를 호출
      this.changeMessage(newMsg)
    },
    changeMessage(newMsg) {
      // data의 msg를 인자로 받은 새로운 value로 update
      this.msg = newMsg
    },
  },
}
</script>
```

![](https://images.velog.io/images/chaerin00/post/7442bf6b-ca0e-4359-8899-b1390ad95c7c/Feb-26-2022%2013-20-11.gif)

### computed

```js
<template>
  <div>
    <h1>Fruits</h1>
    <p>{{ fruits.filter(fruit => fruit !== 'grape').join(' and ') }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    fruits: ['apple', 'orange', 'grape', 'banana'],
  }),
}
</script>
```

template 내에서 {{ }}안에 js data를 가공하여 보여줄 수도 있지만, 이런 방식은 template 내의 코드를 복잡하고 유지보수하기 어렵게 만듭니다.
이런 경우에는 computed에서 가공된 data를 return 하여 보여주면 코드를 더 예쁘게 만들어줄 수 있습니다.

```js
<template>
  <div>
    <h1>Fruits</h1>
    <p>{{ filteredFruits }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    fruits: ['apple', 'orange', 'grape', 'banana'],
  }),
  computed: {
    filteredFruits() {
      return this.fruits.filter(fruit => fruit !== 'grape').join(' and ')
    },
  },
}
</script>
```

사실 filteredFruits는 computed가 아닌 method에서도 동일하게 동작하게끔 할 수 있습니다..

```js
<template>
  <div>
    <h1>Fruits</h1>
	// method는 실행시켜주어야 data가 출력됩니다.
    <p>{{ filteredFruits() }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    fruits: ['apple', 'orange', 'grape', 'banana']
  }),
  methods: {
    filteredFruits () {
      return this.fruits
        .filter(fruit => fruit !== 'grape')
        .join(' and ')
    }
  }
}
</script>
```

하지만 computed를 사용하는 이유는 computed는 데이터 캐싱을 통해 참조하고 있는 data가 변경되지 않는 한 연산을 반복하지 않는다는 것입니다.

```js
computed: { filteredFruits () { return this.fruits .filter(fruit => fruit !==
'grape') .join(' and ') } }
```

여기서는 fruits가 변하지 않는 이상 이미 연산한 후 저장한 data를 return 합니다. 이에 비해 method는 참조하고 있는 data가 변하지 않아도 렌더링할 때마다, 호출될 때마다 연산을 합니다.

### watch

watch는 data의 변경을 감지하여 변경될 때마다 실행할 함수를 설정할 수 있도록 하는 속성입니다. (React의 useEffect dependency 배열에 state를 추가하는 것과 유사함)

```js
<template>
  <div>
    <h1>Fruits</h1>
    <p>{{ filteredFruits() }}</p>
    <input v-model="newFruit" />
    <button @click="addFruit()">저장</button>
    <p>{{ isTyping ? '입력중....' : '' }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    isTyping: false,
    fruits: ['apple', 'orange', 'grape', 'banana'],
    newFruit: '',
  }),
  methods: {
    filteredFruits() {
      return this.fruits.filter(fruit => fruit !== 'grape').join(' and ')
    },
    addFruit() {
      this.fruits.push(this.newFruit)
      this.newFruit = ''
    },
  },
  watch: {
    newFruit: {
      handler() {
        if (this.newFruit !== '') {
          this.isTyping = true
        } else {
          this.isTyping = false
        }
      },
    },
  },
}
</script>
```

![](https://images.velog.io/images/chaerin00/post/7fe6cbe8-461d-4d57-a2f4-317a132a3622/Feb-26-2022%2014-07-32.gif)

newFruit라는 data의 변화를 감지하여 input에서 newFruit를 update하고 있을 때는 isTyping을 true로 만들고 newFruit가 빈문자열이 되면 isTyping을 false로 만드는 handler를 추가해보았습니다.

> [**computed 속성 vs watch 속성**](https://kr.vuejs.org/v2/guide/computed.html#computed-%EC%86%8D%EC%84%B1-vs-watch-%EC%86%8D%EC%84%B1)
> Vue는 Vue 인스턴스의 데이터 변경을 관찰하고 이에 반응하는 보다 일반적인 watch 속성을 제공합니다. 다른 데이터 기반으로 변경할 필요가 있는 데이터가 있는 경우, 특히 AngularJS를 사용하던 경우 watch를 남용하는 경우가 있습니다. 하지만 명령적인 watch 콜백보다 computed 속성을 사용하는 것이 더 좋습니다.

Vue 공식문서에서는 computed로 해결이 가능한 경우, watch보다는 computed를 사용할 것을 추천하고 있습니다.

## Lifecycle Hook

이제 Vue의 lifecycle hook을 알아보도록 합니다! Vue의 lifecycle은 다음 이미지와 같습니다.

![](https://images.velog.io/images/chaerin00/post/7657e461-ffd8-491d-b723-303cd4cc33ea/lifecycle.png)

> 각 Vue 인스턴스는 생성될 때 일련의 초기화 단계를 거칩니다. 예를 들어, 데이터 관찰 설정이 필요한 경우, 템플릿을 컴파일하는 경우, 인스턴스를 DOM에 마운트하는 경우, 그리고 데이터가 변경되어 DOM를 업데이트하는 경우가 있습니다. 그 과정에서 사용자 정의 로직을 실행할 수있는 라이프사이클 훅 도 호출됩니다.
> _출처: [Vue 공식문서](https://kr.vuejs.org/v2/guide/instance.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%ED%9B%85)_

Vue에서 사용하는 모든 라이프 사이클 훅은 아래 링크에서 확인할 수 있습니다.
이 포스팅에서 다루기에는 내용이 너무 많아서 링크를 첨부했습니다 🥲
https://v3.ko.vuejs.org/api/options-lifecycle-hooks.html#beforecreate

이 포스팅에서는 created의 활용 예제를 보도록 하겠습니다.
저는 주로 component에 필요한 data를 서버에서 가져올 때 created에서 api를 호출합니다. 저는 오늘 [github user api](https://docs.github.com/en/rest/reference/users#list-users--code-samples)를 활용하여 data를 불러와보도록 하겠습니다.

### 활용 예제: Created

**1. 초기 세팅**

이를 위해 vue-template 프로젝트에서 axios를 설치합니다.

```
yarn add axios
npm install axios
```

HelloWorld.vue 는 기본 코드만 남기고 내용을 모두 지워주겠습니다.

```js
<template>
  <div>reset</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({}),
}
</script>

<style scoped lang="scss"></style>
```

**2. created에서 data 불러오기**
created 를 추가해봅시다!

```js
<template>
  <div>reset</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data: () => ({}),
  // 여기만 추가! velopert대신 자신의 github id 입력
  async created() {
    const { data } = await axios.get('https://api.github.com/users/velopert')
    this.name = data.name
    this.image = data.avatar_url
    this.followers = data.followers
    this.following = data.following
  },
}
</script>

<style scoped lang="scss"></style>
```

network 탭에서 결과를 확인해보면 api 통신 결과를 볼 수 있습니다.
![](https://images.velog.io/images/chaerin00/post/938cb162-4230-46d8-aedb-67ec4a72eb4d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-26%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.42.07.png)

**3. 화면에 데이터 보여주기**

```js
<template>
  <div>
    <h1>My Github</h1>
    <img :src="image" alt="profile-image" />
    <p>
      <span>followers: {{ followers }}</span>
      <span>following: {{ following }}</span>
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data: () => ({
    name: '',
    image: '',
    followers: 0,
    following: 0,
  }),
  methods: {},
  async created() {
    const { data } = await axios.get('https://api.github.com/users/velopert')
    this.name = data.name
    this.image = data.avatar_url
    this.followers = data.followers
    this.following = data.following
  },
}
</script>

<style scoped lang="scss"></style>
```

결과를 보면 다음과 같습니다
![](https://images.velog.io/images/chaerin00/post/77490308-5e5b-4fcc-93ba-d8b0f4cab9f1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-26%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.03.47.png)

<hr/>
이번 포스팅에서는 script 태그 속 내용들을 다루어 보았습니다. 예제 중간에 v-model이 나왔는데 다음 포스팅에서 해당 내용을 자세히 다루어 보도록 하겠습니다 :)
