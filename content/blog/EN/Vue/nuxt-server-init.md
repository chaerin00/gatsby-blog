---
title: '[Nuxt] Utilizing NuxtServerInit with fetch and asyncData'
date: 2022-03-30 17:05:36
category: Vue
thumbnail: { thumbnailSrc }
draft: false
---

## _fetch_ vs _asyncData_

While both fetch and asyncData are SSR data fetching hooks, they differ in usage and invocation timing. For more details on this topic, please refer to the following post: ( 👉🏻 [[Nuxt] Difference Between asyncData and fetch](https://velog.io/@chaerin00/Nuxt-asyncData%EC%99%80-fetch%EC%9D%98-%EC%B0%A8%EC%9D%B4))

Here's a brief summary of their differences:

> ### asyncData

- Only available in page-level components.
- Cannot use `this`, but can use the context object.
- Can add to local data using return.

> ### fetch

- Available in both components and pages.
- Can use `this`.
- Cannot add to local data using return (must mutate local data with fetch result).

## nuxtServerInit

![](https://images.velog.io/images/chaerin00/post/43bb234c-d853-4e5b-9012-7bc6c4511506/91926d.png)

Looking at the Nuxt lifecycle hooks, there are hooks that are called before asyncData and fetch. Today, we'll explore one of those hooks, **NuxtServerInit**, and discuss how to use it effectively.

### What is nuxtServerInit?

> If the action nuxtServerInit is defined in the store and the mode is universal, Nuxt will call it with the context (only from the server-side). It's useful when we have some data on the server we want to give directly to the client-side.

According to the Nuxt documentation, if nuxtServerInit is defined as an action in the store and the mode is universal, Nuxt will call it with the context object on the server-side.

It's useful when there is data on the server that needs to be passed directly to the client-side before rendering.

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

The first argument of nuxtServerInit is vuexContext, similar to regular Vuex actions, and the second argument is the Nuxt context object.

The context object in the second argument is the same as that used in asyncData, plugins, and middleware [context](https://nuxtjs.org/docs/internals-glossary/context)!

Like asyncData, nuxtServerInit can utilize the context object, but since asyncData is only callable in page components, if you want to include logic using the context in all page components, you must add asyncData to all page components.

If you want to add the same logic using the context in all pages, use nuxtServerInit!

## Practical Example

Here's a situation where I needed to use nuxtServerInit:

1. There was an API call that had to be made whenever all pages were rendered.
2. Use the fetch hook in the layout component to call the API. (Since asyncData is only available in page components)
3. The API was implemented to pass different data based on the domain by referring to the header's referer.
4. Before calling the API on the server-side, additional logic was required to set the header.

I used nuxtServerInit to add the logic to set the header before fetch hook was called.

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

When running on localhost, I used the TEST_BRAND_URL defined in env, and for other cases, I referred to req.headers.host and injected it as referer into the axios header.

> ⚠️ Additional Information: You cannot modify the header's referer on the client-side! ⚠️

<hr/>

#### References 📕

- [https://nuxtjs.org/docs/internals-glossary/context](https://nuxtjs.org/docs/internals-glossary/context)
- [https://nuxtjs.org/docs/directory-structure/store#the-nuxtserverinit-action](https://nuxtjs.org/docs/directory-structure/store#the-nuxtserverinit-action)
