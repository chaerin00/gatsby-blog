---
title: '[Nuxt] Using nuxtServerInit with fetch and asyncData'
date: 2022-03-30 17:05:36
category: Vue
thumbnail: { thumbnailSrc }
draft: false
---

## _fetch_ vs _asyncData_

While both fetch and asyncData are SSR data fetch hooks, they differ in usage and invocation timing. Please check out my previous post for more details! (👉🏻 [[Nuxt] Difference between asyncData and fetch](https://velog.io/@chaerin00/Nuxt-asyncData%EC%99%80-fetch%EC%9D%98-%EC%B0%A8%EC%9D%B4))

To summarize briefly:

> ### asyncData

- Can only be used in page-level components.
- Cannot use `this` but can use the `context` object.
- Can add data to the local data using `return`.

> ### fetch

- Can be used in both components and pages.
- Can use `this`.
- Cannot add data to local data using `return` (need to mutate local data with fetch results).

## nuxtServerInit

![](https://images.velog.io/images/chaerin00/post/43bb234c-d853-4e5b-9012-7bc6c4511506/91926d.png)

When looking at the Nuxt Lifecycle hooks invocation order, there are hooks that are called before asyncData and fetch. Today, we will explore one of those, **nuxtServerInit**, and discuss how to utilize it.

### What is nuxtServerInit?

> If the action nuxtServerInit is defined in the store and the mode is universal, Nuxt will call it with the context (only from the server-side). It's useful when we have some data on the server we want to give directly to the client-side.

According to the Nuxt official documentation, if the nuxtServerInit action is defined in the store and the mode is universal, Nuxt calls it with the context object from the server-side. It is useful for scenarios where we need to process logic on the server-side before rendering on the client-side.

### Usage of nuxtServerInit

> nuxtServerInit must be defined at the root of the store. Please define it in **store/index.js** or **store/actions.js**!

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

````

The first argument of nuxtServerInit is usually `vuexContext`, similar to regular Vuex actions, and the second argument is the Nuxt context object.

The context object in the second argument is the same as the one passed to `asyncData`, `plugins`, and `middleware` ([context](https://nuxtjs.org/docs/internals-glossary/context)).

Similar to asyncData, nuxtServerInit can utilize the context object. However, since asyncData can only be called in page components, if you want to include logic using context in all page components, you would need to include asyncData in all page components.

To include the same logic using context in all pages, you can use nuxtServerInit!

## Example Usage

Here's a situation where I needed to use nuxtServerInit:

1. There was an API that needed to be called unconditionally when every page was rendered.
2. Use the fetch hook in the layout component to call the API. (asyncData is only available in page components)
3. The API was implemented to pass different data based on the domain by referencing the header's referer.
4. Since the referer is not included when calling the API on the server-side, a setHeader logic needed to be added before calling.

I used nuxtServerInit to add the logic before calling the fetch hook.

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

When running on localhost, I used the TEST_BRAND_URL defined in env, and for other cases, I referenced req.headers.host and injected it as the referer into axios headers.

> ⚠️ Additional Info: You cannot modify the header's referer on the client-side! ⚠️

<hr/>

#### References 📕

- [https://nuxtjs.org/docs/internals-glossary/context](https://nuxtjs.org/docs/internals-glossary/context)
- [https://nuxtjs.org/docs/directory-structure/store#the-nuxtserverinit-action](https://nuxtjs.org/docs/directory-structure/store#the-nuxtserverinit-action)
````
