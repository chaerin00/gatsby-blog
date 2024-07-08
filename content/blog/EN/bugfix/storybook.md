---
title: '[Storybook] @svgr/webpack Error'
date: 2021-12-28 17:05:47
category: BugFix
thumbnail: { thumbnailSrc }
draft: false
---

## Problem 🚨

To use SVG React components in Storybook, I installed `@svgr/webpack` and configured webpack in `.storybook/main.js` as follows:

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
  webpackFinal: async (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin({}))

    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
```

When I ran Storybook, the following error occurred:

> **TypeError: this.getOptions is not a function**

![](https://images.velog.io/images/chaerin00/post/8d3a42c7-385f-438c-8a79-00bd4ecf53e4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.10.19.png)

I found only issues related to `sass/loader` errors in Vue, but not for Storybook. After trying all the solutions from the Storybook GitHub issues without success, I discovered the same error on the @svgr/webpack GitHub issues page: https://github.com/gregberge/svgr/issues/631.

## Solution 🔨

The issue is with @svgr/webpack v6. Downgrade to v5.5.0 and then rerun Storybook to fix the issue.
![](https://images.velog.io/images/chaerin00/post/bc85c316-1698-4c4e-88eb-5cbd048a70ce/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.15.20.png)
![](https://images.velog.io/images/chaerin00/post/1f346ef4-b05b-42a7-a586-58a01afd1249/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.16.23.png)

I confirmed that the SVG React components were displayed correctly.
![](https://images.velog.io/images/chaerin00/post/46f339bc-a524-4c12-94e7-d7f758963d01/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.17.38.png)
