---
title: Storybook @svgr/webpack 에러 해결방법
date: 2021-12-28 17:05:47
category: BugFix
thumbnail: { thumbnailSrc }
draft: false
---

## 문제상황 🚨

storybook에서 svg react component를 사용하기 위해 `@svgr/webpack` 을 설치하고 `.storybook/main.js`에 다음과 같이 웹팩 설정을 해주었다.

```javascript
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
  ],
  webpackFinal: async config => {
    config.resolve.plugins.push(new TsconfigPathsPlugin({}))

    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
```

storybook을 실행시키자 다음과 같은 에러가 발생했다.

> **TypeError: this.getOptions is not a function**

![](https://images.velog.io/images/chaerin00/post/8d3a42c7-385f-438c-8a79-00bd4ecf53e4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.10.19.png)
찾아보니 Vue에서 sass/loader 관련 에러만 나오고 storybook 관련한 문제는 나오지 않았다. storybook github issue에 등록된 솔루션을 다해봤지만 해결이 안되던 중 @svgr/webpack github 이슈에서 동일한 에러를 발견할 수 있었다. https://github.com/gregberge/svgr/issues/631

## 해결방법 🔨

@svgr/webpack v6의 문제로 버전을 v5.5.0으로 낮춰주고 다시 실행시키면 잘 돌아간다.
![](https://images.velog.io/images/chaerin00/post/bc85c316-1698-4c4e-88eb-5cbd048a70ce/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.15.20.png)
![](https://images.velog.io/images/chaerin00/post/1f346ef4-b05b-42a7-a586-58a01afd1249/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.16.23.png)

svg ReactCompoment도 잘 나오는 것을 확인할 수 있다.
![](https://images.velog.io/images/chaerin00/post/46f339bc-a524-4c12-94e7-d7f758963d01/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.17.38.png)
