---
title: '[Vue] Uncaught TypeError: Vue is not a constructor'
date: 2022-02-24 17:05:79
category: BugFix
thumbnail: { thumbnailSrc }
draft: false
---

One of the ways to install Vue in an HTML file is by using a CDN.
https://kr.vuejs.org/v2/guide/installation.html#CDN

In our POS program, we were using a CDN to install Vue in popup.html, but recently, a bug occurred where the popup was not displaying correctly. Upon investigation, we found the following error:
![](https://images.velog.io/images/chaerin00/post/6ef3a5e9-456e-4495-9063-0d0f5faabc60/j4SVk.png)

The code in the file was as follows:

```js
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<body>
	<script type="text/javascript">
    	const app = new Vue({
        	el: '#app',
        	...
        })
    </script>
</body>
```

### Problem

```js
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

When you use the above code, the latest version of Vue is installed. Recently, Vue 3 has become the default version.
(Related blog post: https://yohanpro.com/posts/vue3/vue3-default)

In Vue3, it uses `createApp` instead of using `new Vue()` as in Vue2.

_📍 Vue3_

```js
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

_📍 Vue2_

```js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: (h) => h(App),
}).$mount('#app')
```

Since the CDN was installing Vue3, which does not use the Vue constructor, and the code was using `new Vue({})`, the "Vue is not a constructor" error occurred.

### Solution

A simple solution is to modify the `<script>` tag to install a specific version of Vue from the CDN.

```js
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
```

While this can resolve the issue, a more reliable solution is to save the `vue.min.js` file in the static folder.

Copy the content from https://cdn.jsdelivr.net/npm/vue@2.6.12 and create `static/js/vue.min.js` file in your project.

Then, modify the HTML file to load Vue from the static folder instead of the CDN.

```js
<script src="/static/js/vue-2.6.0.min.js"></script>
```

<hr/>

I was aware that Vue 3 had become the default, but I never imagined that such an issue could arise. This issue taught me the importance of specifying the version explicitly.
