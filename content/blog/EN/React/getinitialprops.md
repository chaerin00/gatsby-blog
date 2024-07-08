---
title: Customizing getInitialProps in Next.js _app.tsx
date: 2022-04-18 17:05:62
category: React
thumbnail: { thumbnailSrc }
draft: false
---

## Automatic Static Optimization

Since Next.js v9.3, `getInitialProps` used for data fetching has been divided into `getStaticProps` and `getServerSideProps`. According to the Next.js official documentation regarding custom App, using `getInitialProps` in `_app.tsx` disables the feature of Automatic Static Optimization and is discouraged.

```javascript
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

Automatic Static Optimization refers to Next.js recognizing pages without `getInitialProps` or `getServerSideProps` as static pages during build time, rendering them as HTML files. This pre-rendering process enables users to quickly view the pages without requiring server-side rendering upon each request.

> Example of Next.js build output

```
.next/server/static/about.html
```

Conversely, if `getInitialProps` or `getServerSideProps` exists, Next.js generates `.js` files instead of `.html` during build. When a user makes a request, Next.js then performs server-side rendering to fetch necessary data before returning the completed HTML.

> Example of Next.js build output

```
.next/server/static/about.js
```

Thus, including `getInitialProps` in `_app.tsx` prevents any page from being recognized as a static page during build, thereby disabling Automatic Static Optimization.

## Using getInitialProps in \_app.tsx

In my case, to implement a dynamic web application, I was invoking `getServerSideProps` across all pages. This setup prevented any static pages from being created, disabling Automatic Static Optimization and resulting in repetitive code and complex logic. To address this, I decided to use `getInitialProps` in `_app.tsx`.

Here's the Server-Side Cycle for loading pages:

1. Next.js server receives a GET request.
2. It identifies the matching page.
3. Executes `getInitialProps` in `_app.tsx` if defined.
4. Executes `getInitialProps` in the Page Component if defined, fetching `pageProps`.
5. Executes `getInitialProps` in `_document.js` if defined, fetching `pageProps`.
6. Renders in the order: `_app.js` > Page Component.
7. Constructs all content and runs `_document.js`, outputting the HTML format.

In this process, if both `_app.tsx` and `page.tsx` define `getInitialProps` or `getServerSideProps`, the `pageProps` fetched from `page.tsx` will overwrite those from `_app.tsx`. Therefore, `_app.tsx`'s `getInitialProps` needs to be customized accordingly.

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

As shown above, `{...pageProps, data}` combines the `pageProps` received from fetching `page.tsx` with the theme data fetched from `_app.tsx`, ensuring they are passed together.

---

### References 📕

https://velog.io/@cyranocoding/Next-js-%EA%B5%AC%EB%8F%99%EB%B0%A9%EC%8B%9D-%EA%B3%BC-getInitialProps
https://nextjs.org/docs/advanced-features/custom-app
https://simsimjae.medium.com/next-js-automatic-static-optimization-b56ba8febea8
