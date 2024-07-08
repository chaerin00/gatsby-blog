---
title: '[Serverless] SSR Refresh Causes 413 Error: Diagnosis & Solution'
date: 2022-03-09 17:05:74
category: BugFix
thumbnail: { thumbnailSrc }
draft: false
---

# Problem

My team deploys a Nuxt project using Serverless. In a previous post, I introduced `fetch` and `asyncData` as SSR data fetch hooks in Nuxt ([📍[[Nuxt] The Difference Between asyncData and fetch](https://velog.io/@chaerin00/Nuxt-asyncData%EC%99%80-fetch%EC%9D%98-%EC%B0%A8%EC%9D%B4)). However, when using the `fetch` hook, we encountered a problem where a 500 error occurred, preventing the page from rendering. Using AWS CloudWatch, we discovered that a 413 error was occurring.

![](https://images.velog.io/images/chaerin00/post/be89ac46-552c-45ae-8d12-c8585097ac70/413error.png)

## 413 Request Entity Too Large

A 413 error occurs when the request size exceeds 10MB. Investigating why a simple GET request would exceed 10MB, I found that the header contained an excessively long `x-apigateway-event`.

![](https://images.velog.io/images/chaerin00/post/203998f6-7e78-455c-8362-09f9f8e6c892/header.png)

# Solution

Since there was no code in the frontend setting the `x-apigateway-event` header, and the issue only occurred in the deployment environment (not locally), I deduced that the problem lay in the deployment environment.

While reviewing the serverless-related content, I searched for the `serverless-nuxt` package in `handler.js` on npm and found:

```js
const { createNuxtApp } = require('serverless-nuxt')
const config = require('./nuxt.config.js')

module.exports.render = createNuxtApp(config)
```

![](https://images.velog.io/images/chaerin00/post/59e07214-90bf-4f16-a967-102a051d06ca/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-09%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.07.20.png)

The package was deprecated. Therefore, I installed `nuxt-aws-lambda` and modified `handler.js` as follows:

```js
const { createNuxtHandler } = require('nuxt-aws-lambda')
const config = require('./nuxt.config.js')

module.exports.render = createNuxtHandler(config)
```

After deploying, the `x-apigateway-event` header disappeared, and the 413 error was resolved.

<hr/>

It took me over three days to solve this problem. Initially, I assumed the issue was due to incorrect usage of the `fetch` hook and kept modifying the logic. However, I realized that when a problem only occurs during deployment, it is essential to check the deployment logic.

Additionally, errors occurring in SSR are displayed as 500 errors on the frontend, making it difficult to diagnose the exact issue. Solving this error taught me how to check for errors in the deployed app using AWS CloudWatch.
