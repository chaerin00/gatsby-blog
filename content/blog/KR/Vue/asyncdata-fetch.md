---
title: '[Nuxt] asyncData와 fetch의 차이'
date: 2022-02-23 17:05:09
category: Vue
thumbnail: { thumbnailSrc }
draft: false
---

# Nuxt의 Data Fetching

이전의 vue에서는 data fetch 로직을 주로 `created()`나 `mounted()`에 넣어서 필요한 data를 가져왔습니다.
Nuxt에서는 server-side에서 페이지나 컴포넌트에 필요한 데이터를 불러올 수 있도록 하는 두 가지 훅을 사용할 것을 권장하고 있습니다.

> - **asyncData**

- **fetch** (Nuxt 2.12 이후 버전)

이 둘은 모두 server-side rendering에서 사용되는 data fetching hook이지만 차이점이 있습니다.

# asyncData() vs fetch()

![](https://images.velog.io/images/chaerin00/post/801bfdff-e973-4b10-a730-4935876f901f/91926d.png)

Nuxt의 lifecycle에서 보게 되면 `fetch()`는 `created()`가 실행된 후 즉, server-side에서 component instance가 생성된 후 불리게 됩니다. 반면에 `asyncData()`는 `created()`불리기 이전에 실행됩니다. 이 호출 시점의 차이 때문에 `fetch()`에서는 **this의 사용이 가능**하고 `asyncData()`에서는 **this 사용이 불가능**합니다.

둘의 차이점을 정리해보면 다음과 같습니다.

## asyncData

1. page-level component에서만 사용가능합니다.
2. this 사용이 불가능합니다.
3. return을 통해 로컬 data에 추가가 가능합니다.

```js
export default {
  async asyncData(context) {
    const data = await context.$axios.$get(...)
    // `todos` 는 data() 안에 선언되어 있지 않아도 됩니다.
    return { todos: data.Item }
    // `todos` 는 local data에 병합(merge)됩니다.
  }
}
```

## fetch

1. 컴포넌트와 페이지 모두에서 사용가능합니다.
2. this 사용이 가능합니다.
3. return을 통해 로컬 data에 추가가 불가능합니다. ( fetch 결과를 local data에 mutate 시켜줘야 함 )

```javascript
export default {
  data: () => ({
      todos: []
  }),
  async fetch() {
    const { data } = await axios.get(...)
    // `todos` data()에 선언되어 있어야합니다.
    this.todos = data
  }
}
```

# fetch hook 더 알아보기

fetch hook은 Nuxt 2.12에서 많은 변화가 있었습니다. https://nuxtjs.org/announcements/understanding-how-fetch-works-in-nuxt-2-12/

fetch 훅에 대해서 더 알아보도록 하겠습니다.

## fetchState

fetch hook과 함께 `this.$fetchState`를 활용할 수 있는데 fetchState는 세가지 property를 가집니다.

1.** pending**

2. **error**
3. **timestamp** (cache와 관련해 activated hook에서 사용)

이를 이용하면 쉽게 로딩뷰와 에러 뷰를 구현할 수 있습니다.

```js
<template>
  <div>
    <p v-if="$fetchState.pending">Fetching mountains...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      ...
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({

  	}),
    async fetch() {

    }
  }
</script>
```

## fetchOnServer

fetch 훅을 사용해서 data를 불러오게 되면 처음 페이지 로딩할 때 chrome의 network tab에서는 해당 내용을 확인할 수 없었습니다. 이유를 확인해보니 network tab은 브라우저에서 **client-side**에서 발생하는 network 활동을 감지하기 때문에 **server-side**에서 실행된 fetch의 동작은 확인할 수 없는 것이였습니다.

`fetchOnServer: false` 로 설정하게 되면 fetch hook을 **client-side**로 변경시킬 수 있습니다.

```javascript
  async fetch () {

  },
  fetchOnServer: false,
  data: () => ({

  }),
```

## \$fetch

Nuxt 2.12이후에 fetch는 $fetch를 통해 method처럼 사용할 수 있습니다.
이전에는 page에 필요한 data를 다시 불러오기 위해서 data fetch 로직을 반복하거나 함수로 분리해야 했는데, $fetch를 이용하면 이를 더욱 쉽게 구현할 수 있습니다.

```javascript
export default {
  methods: {
    refresh() {
      this.$fetch()
    },
  },
}
```

# fetch 활용

프로젝트 진행 중 브랜드마다 style을 다르게 적용해야하는 경우가 있었는데, 이를 위해 fetch hook에서 theme api를 호출하고 css variable을 설정하여 theme color를 페이지에 적용시킨 코드입니다.

```js
<template>
  <div :style="cssVariable">
    <nuxt />
  </div>
</template>

<script>
export default {
  async fetch () {
    const {
      main_color: mainColor,
      sub_color: subColor,
    } = await this.fetchBrandTheme()
    this.cssVariable = {
      '--main': mainColor,
      '--sub': subColor,
    }
  },
  data: () => ({
    cssVariable: {
      '--main': '',
      '--sub': '',
    },
  }),
  ...
}
</script>
```

<hr/>
이 포스팅을 하면서 asyncData는 return을 통해 local data에 merge되는게 Next의 getInitialProps와 조금 유사하다는 생각이 들었습니다.

fetch()는 v2.12 이후 this 사용이 가능해지면서 아주 편리한 hook이 된 것 같습니다. 앞으로 Nuxt 프로젝트에서 data fetch logic 구현할 때 많은 도움이 될 것 같습니다 👍🏻

**참고자료📕**

https://nuxtjs.org/announcements/understanding-how-fetch-works-in-nuxt-2-12/
https://nuxtjs.org/docs/features/data-fetching/#accessing-the-fetch-state
