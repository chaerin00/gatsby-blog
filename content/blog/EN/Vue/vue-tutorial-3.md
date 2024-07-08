---
title: '[Vue.js Tutorial] #2. Vue <script> tag'
date: 2021-11-29 16:20:37
category: Vue
thumbnail: { thumbnailSrc }
draft: false
---

In the previous post, we explored Vue instances and file structure basics. A `.vue` file is divided into template, script, and style sections. In this post, we'll focus on the script section and its contents.

```vue
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

> 📍 Due to the breadth of topics, we'll cover only data, methods, computed, watch, and created in this post.

### Data

Vue instance data is an object that can hold strings, numbers, arrays, objects, booleans, etc.

```js
data() {
  return {
    a: 1,
    something: [],
    isVue: false,
    name: {
      first: '채린',
      last: '안',
    },
  };
}
```

### Methods

Let's add an `openAlert` method and a button to trigger an alert.

```vue
<template>
  <div class="hello">
    <h1 class="hello-text">{{ msg }}</h1>
    <button @click="openAlert">open alert</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
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

### Computed

Compute processed data in the `computed` section.

```vue
<template>
  <div>
    <h1>Fruits</h1>
    <p>{{ filteredFruits }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      fruits: ['apple', 'orange', 'grape', 'banana'],
    }
  },
  computed: {
    filteredFruits() {
      return this.fruits.filter((fruit) => fruit !== 'grape').join(' and ')
    },
  },
}
</script>
```

### Watch

Detect changes in data using the `watch` property.

```vue
<template>
  <div>
    <h1>Fruits</h1>
    <p>{{ filteredFruits }}</p>
    <input v-model="newFruit" />
    <p>{{ isTyping ? '입력중....' : '' }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      isTyping: false,
      fruits: ['apple', 'orange', 'grape', 'banana'],
      newFruit: '',
    }
  },
  computed: {
    filteredFruits() {
      return this.fruits.filter((fruit) => fruit !== 'grape').join(' and ')
    },
  },
  watch: {
    newFruit: {
      handler() {
        this.isTyping = this.newFruit !== ''
      },
    },
  },
}
</script>
```

### Lifecycle Hooks

Explore the Vue instance lifecycle hooks.

```vue
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
  data() {
    return {
      name: '',
      image: '',
      followers: 0,
      following: 0,
    }
  },
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
