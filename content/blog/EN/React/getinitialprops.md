---
title: Next.js _app.tsx에서 getInitialProps 커스텀하기
date: 2022-04-18 17:05:62
category: React
thumbnail: { thumbnailSrc }
draft: false
---

## Authomatic Static Optimization

Next.js v9.3 이후로는 data fetching을 위해 사용하던 getInitialProps가 getStaticProps, getServerSideProps로 분리되었습니다.
Next 공식 문서의 custom App에 대한 내용을 살펴보면 \_app.tsx에서 getInitialProps를 사용할 시 Automatic Static Optimization의 기능이 사용불가능해지기 때문에 사용하지 말 것을 권장하고 있습니다.

```js
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
```

Automatic Static Optimization란 무엇인지 살펴보겠습니다.

Next에서는 페이지에 getInitialProps 또는 getServerSideProps가 없을 때 해당 페이지를 static 페이지라고 인식하여 build시에 html 파일로 만들어버립니다. 이것을 build시에 pre-render한다고 하는 것입니다.
이렇게 html 파일을 만들면 유저의 요청이 들어왔을 때 서버에서 html을 만들지 않아도 되기 때문에 유저가 빠르게 페이지를 볼 수 있도록 해줍니다.

> next build 결과

```
.next/server/static/about.html
```

반대로 getInitailProps나 getServerSideProps가 있으면 build시에 html파일을 만드는 것이 아닌 js파일을 만들고, 유저의 요청이 들어오면 next 서버는 필요한 데이터를 서버사이드렌더링으로 가져온 후 완성된 html을 반환합니다.

> next build 결과

```
.next/server/static/about.js
```

그렇기때문에 \_app.tsx에 getInitialProps를 넣으면 build시에 어떠한 페이지도 static page로 인식되지 않기 때문에 Automatic Static Optimization이 불가능해지는 것입니다.

## \_app.tsx에서 getInitialProps 사용하기

저의 경우에는 동적 웹을 구현하기 위해 모든 페이지에서 동일한 getServerSideProps를 불러오고 있었습니다. static 페이지가 하나도 만들어지지 않기 때문에 Automatic Static Optimization이 불가능한 구조였습니다. 그래서 코드가 모든 페이지에서 반복되고 로직이 복잡해지는 것을 막기 위해 \_app.tsx에서 getInitialProps를 사용하기로 했습니다.

페이지를 불러오는 과정(Server Side Cycle)은 다음과 같습니다.

1. Next Server가 GET 요청을 받는다.
2. 요청에 맞는 Page를 찾는다.
3. \_app.tsx의 getInitialProps가 있다면 실행한다.
4. Page Component의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
5. \_document.js의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
6. 모든 props들을 구성하고, \_app.js > page Component 순서로 rendering.
7. 모든 Content를 구성하고 \_document.js를 실행하여 html 형태로 출력한다.

이 과정에서 \_app.tsx와 page.tsx에 모두 getInitialProps와 getServerSideProps가 정의 되어있다면 page.tsx에서 불러온 pageProps가 덮어씌워지게 됩니다. 그렇기 때문에 \_app.tsx의 getInitialProps를 커스텀해주어야 합니다.

```typescript
import type { AppContext } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const queryClient = new QueryClient()
  const { theme } = pageProps as { theme: Theme }

  return (
    ...
  )
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  const theme = await fetchTheme(ctx.req?.headers.referer)

  pageProps = { ...pageProps, theme }

  return { pageProps }
}

export default MyApp

```

위와 같이 `{...pageProps, data}` 받아오는 pageProps들을 합쳐주어야 app에서 불러온 theme 데이터와 이후 page.tsx에서 불러온 props가 합쳐져서 전달되게 됩니다.

<hr>

### 참고자료 📕

https://velog.io/@cyranocoding/Next-js-%EA%B5%AC%EB%8F%99%EB%B0%A9%EC%8B%9D-%EA%B3%BC-getInitialProps
https://nextjs.org/docs/advanced-features/custom-app
https://simsimjae.medium.com/next-js-automatic-static-optimization-b56ba8febea8
