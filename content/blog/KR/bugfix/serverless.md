---
title: '[Serverless] SSR refresh했을 때 413 error 원인 & 해결'
date: 2022-03-09 17:05:74
category: BugFix
thumbnail: { thumbnailSrc }
draft: false
---

# 문제상황

회사에서 Nuxt 프로젝트를 Serverless를 이용해 배포를 하고 있다. 지난 포스팅에서 Nuxt의 SSR data fetch hook으로 fetch와 asyncData를 소개했는데(📍[[Nuxt] asyncData와 fetch의 차이](https://velog.io/@chaerin00/Nuxt-asyncData%EC%99%80-fetch%EC%9D%98-%EC%B0%A8%EC%9D%B4) )이 중 fetch hook을 사용했을 때 500 error가 나면서 페이지가 렌더링이 되지 않는 문제를 겪었다.
AWS cloudWatch를 이용해서 살펴본 결과 413 에러가 발생하고 있었다.

![](https://images.velog.io/images/chaerin00/post/be89ac46-552c-45ae-8d12-c8585097ac70/413error.png)

## 413 Request Entity too large

413에러는 요청의 크기가 10MB를 초과한 경우 발생하는 에러인데 그냥 get으로 요청에 무슨 10MB를 초과하는지 찾아보니 header에 엄청난 길이의 x-apigateway-event가 들어있었다.
![](https://images.velog.io/images/chaerin00/post/203998f6-7e78-455c-8362-09f9f8e6c892/header.png)

# 해결방법

프론트에서는 x-apigateway-event라는 header를 setHeader하는 코드도 없었고, local에서는 잘 돌아가는데 배포만 하면 저런 문제가 생기는 것으로 보아 배포환경에 문제가 있다고 판단하게 되었다.

그렇게 serverless 관련된 내용을 보던 중 handler.js의 serverless-nuxt 패키지를 npm에 검색해보았는데

```js
const { createNuxtApp } = require('serverless-nuxt')
const config = require('./nuxt.config.js')

module.exports.render = createNuxtApp(config)
```

![](https://images.velog.io/images/chaerin00/post/59e07214-90bf-4f16-a967-102a051d06ca/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-09%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.07.20.png)

해당 패키지가 deprecated 되어있음을 확인할 수 있었다.
그래서 nuxt-aws-lambda를 설치한 후 handler.js를 다음과 같이 수정했다.

```js
const { createNuxtHandler } = require('nuxt-aws-lambda')
const config = require('./nuxt.config.js')

module.exports.render = createNuxtHandler(config)
```

그리고 나서 배포하자 x-apigateway-event는 헤더에서 사라져있고 413에러도 해결이 되었다.

<hr/>
이 문제를 해결하는데 거의 3일 넘게 걸렸는데 처음엔 당연히 fetch훅을 사용하지 않으면 문제가 일어나지 않으니 fetch를 잘못 사용했다고 생각해서 해당 부분로직을 계속 수정했었다. 그런데 배포 시에만 문제가 일어날 때는 배포 로직에 문제가 없는지 살펴보아야한다는 것을 깨닫게 되었다.

또 SSR에서 일어나는 error는 모두 프론트에서는 500에러로 출력이 되어서 정확한 문제상황을 파악하기 힘들었다. 이번 오류를 해결하면서 배포된 app에서 일어난 에러를 aws cloudWatch에서 확인하는 방법도 배울 수 있었다.
