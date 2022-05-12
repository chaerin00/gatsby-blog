---
title: '[Nuxt] fetch, asyncData와 함께 NuxtServerInit 활용하기'
date: 2022-03-30 17:05:36
category: Vue
thumbnail: { thumbnailSrc }
draft: false
---

## _fetch_ vs _asyncData_

fetch와 asyncData는 같은 SSR data fetch 훅이긴 하지만 활용방법도 호출시점도 다릅니다. 이 내용을 다룬 포스팅도 있으니 확인해주세요! ( 👉🏻 [[Nuxt] asyncData와 fetch의 차이](https://velog.io/@chaerin00/Nuxt-asyncData%EC%99%80-fetch%EC%9D%98-%EC%B0%A8%EC%9D%B4))

간단하게 정리하자면 둘의 차이점은 다음과 같습니다.

> ### asyncData

- page-level component에서만 사용가능합니다.
- this 사용이 불가능하지만 context 객체를 사용할 수 있습니다.
- return을 통해 로컬 data에 추가가 가능합니다.

> ### fetch

- 컴포넌트와 페이지 모두에서 사용가능합니다.
- this 사용이 가능합니다.
- return을 통해 로컬 data에 추가가 불가능합니다. ( fetch 결과를 local data에 mutate 시켜줘야 함 )

## nuxtServerInit

![](https://images.velog.io/images/chaerin00/post/43bb234c-d853-4e5b-9012-7bc6c4511506/91926d.png)

Nuxt Lifecycle hooks 호출순서를 보면 asyncData와 fetch보다 먼저 호출되는 훅들이 있는데 오늘은 그 중 하나인 **NuxtServerInit**에 대해 살펴보고 활용법을 소개해보겠습니다.

### nuxtServerInit이란?

> If the action nuxtServerInit is defined in the store and the mode is universal, Nuxt will call it with the context (only from the server-side). It's useful when we have some data on the server we want to give directly to the client-side.

Nuxt 공식문서에 따르면 nuxtServerInit이 action에 정의되어있고, nuxt universal모드일 경우 Nuxt는 context객체와 함께 server-side에서 nuxtServerInit 훅을 호출한다고 합니다.

client-side에 바로 전달해야하는 server에 있는 data가 있을 때 사용하면 유용하다고 하는데, client에서 화면이 그려지기전 server-side에서 처리해야하는 로직들을 **nuxtServerInit**에 정의할 수 있습니다.

### nuxtServerInit 사용법

> nuxtServerInit은 store의 root에 정의되어야만 동작할 수 있습니다. **store/index.js** 또는 **store/actions.js에** 정의해주세요!

```javascript
nuxtServerInit(vuexContext, context) {
   const { commit, state } = vuexContext

   const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
    $config
  } = context

  // Server-side
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }
},
```

nuxtServerInit의 첫번째 인자는 보통의 vuex actions와 동일하게 vuexContext가 들어가고 두번째 인자로 Nuxt의 context 객체가 들어옵니다.

두번째 인자의 context 객체는 `asyncData`, `plugins`, `middleware`의 인자로 들어가는 [context](https://nuxtjs.org/docs/internals-glossary/context) 와 동일한 것입니다!

nuxtServerInit은 asyncData와 동일하게 context 객체를 활용할 수 있지만, asyncData는 페이지 컴포넌트에서만 호출가능하기 때문에 만약에 context를 활용한 로직을 모든 페이지에 넣고 싶다면 모든 페이지 컴포넌트에 asyncData를 넣어주어야할 것 입니다.

모든 페이지에서 context를 활용한 동일한 로직을 추가하고 싶다면 nuxtServerInit을 사용하면 되는 것입니다!

## 활용예제

제가 nuxtServerInit을 사용해야했던 상황은 다음과 같았습니다.

1. 모든 페이지가 렌더링될 때 무조건 호출돼야하는 api가 있음
2. layout 컴포넌트에서 fetch 훅을 이용해 해당 api를 호출. (asyncData는 page 컴포넌트에서만 가능하기 때문)
3. 해당 api는 header의 referer을 참조해 domain에 따라 다른 data를 넘겨주도록 구현되어있음
4. server-side에서 api를 호출하면 referer가 포함되지 않기 때문에 호출전에 setHeader 로직을 추가해줘야 함

fetch훅이 호출되기 전 setHeader를 해주는 logic을 어딘가에 추가해줘야 했는데 그 때 nuxtServerInit을 사용해주었습니다.

`store/actions.js`

```javascript
export default {
  nuxtServerInit(_, { req, app, env }) {
    if (process.server) {
      const isLocalhost = req.headers.host.includes('localhost')
      const referer = isLocalhost
        ? env.TEST_BRAND_URL
        : 'https://' + req.headers.host
      app.$axios.setHeader('referer', referer)
    }
  },
}
```

localhost로 실행시켰을 때는 env에 적용한 TEST_BRAND_URL을 사용했고, 이외에는 req.headers.host를 참조해 axios header에 referer로 주입해주었습니다.

> ⚠️ 추가정보: client-side에서는 header의 referer를 수정할 수 없습니다! ⚠️

<hr/>

#### 참고자료 📕

- [https://nuxtjs.org/docs/internals-glossary/context
  ](https://nuxtjs.org/docs/internals-glossary/context)
- [https://nuxtjs.org/docs/directory-structure/store#the-nuxtserverinit-action](https://nuxtjs.org/docs/directory-structure/store#the-nuxtserverinit-action)
