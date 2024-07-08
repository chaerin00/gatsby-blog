---
title: '[Vue.js Tutorial] #1. Vue Instance and File Structure'
date: 2021-11-29 16:06:05
category: Vue
thumbnail: { thumbnailSrc }
draft: false
---

## Project Setup

Before starting the tutorial, I have uploaded a Vue template on GitHub with basic eslint and scss configurations.

> https://github.com/chaerin00/vue-template

```bash
git clone https://github.com/chaerin00/vue-template
```

After cloning, you can start the project with the following commands:

```bash
# Install packages
yarn

# Start the project at localhost:8080
yarn start
```

![Project running screenshot](https://images.velog.io/images/chaerin00/post/2c481751-c4ea-46e8-b085-0f1bb1a34289/image.png)

Now, let's explore Vue instances, Vue components, and the file structure in detail.

(❗ Note: In the current project, please disable prettier as it might conflict with eslint configurations. ❗)

## Vue Instance

In `src/main.js`, the Vue instance is created as follows:

```javascript
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
```

> Every Vue application starts by creating a Vue instance with the Vue function.

There are various options available for Vue instances ([full options list](https://vuejs.org/v2/api/#propsData)). Although we won't cover all options in this tutorial, we'll explain commonly used ones. First, let's briefly discuss `data`.

### data

> When a Vue instance is created, it adds all the properties found in its `data` object to Vue's reactive system. When the values of these properties change, the view will "react" and update to match the new values.

```javascript
var data = { a: 1 }

// Adding the data object to a Vue instance
var vm = new Vue({
  data: data,
})

// The instance accesses properties from the original data
vm.a === data.a // => true

// Modifying properties in the instance affects the original data
vm.a = 2
data.a // => 2

// ... and vice versa
data.a = 3
vm.a // => 3
```

This information is from the official Vue documentation explaining data in Vue instances. The Vue instance has an object called `data`. When the values of properties in this object change, elements referencing these properties will update their UI accordingly, similar to React's state.

### Vue Component

To understand the Vue file structure, it's crucial to grasp Vue components.

> Components are one of the most powerful features in Vue. ...
> Vue components are also Vue instances. Therefore, they accept all the options an instance does (except for a few root-specific options), and have the same lifecycle hooks.

Vue components are Vue instances, but they differ in that their `data` must be a function, not an object.

```javascript
var data = { counter: 0 }

Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  data: function () {
    return data
  },
})
```

## .vue File Structure

The following code is from `src/components/HelloWorld.vue`:

```vue
<template>
  <div class="hello">
    <h1 class="hello-text">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Getting Started with Vue.js',
    }
  },
}
</script>

<style scoped lang="scss">
.hello {
  &-text {
    color: green;
  }
}
</style>
```

### template

> Vue.js uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the Vue instance's data. All Vue.js templates are valid HTML that can be parsed by spec-compliant browsers and HTML parsers.

The content inside `<template></template>` corresponds to the `template` option of the Vue instance. It represents the HTML content that appears on the screen. The template syntax includes **data binding** to manage Vue instance data and **directives** to facilitate DOM manipulation.

#### Data Binding

```html
<h1 class="hello-text">{{ msg }}</h1>
```

Using "Mustache" syntax `{{ }}`, you can bind Vue instance properties like `data`, `computed`, or `props`. The example above binds the `msg` property to display a string on the screen.

Vue.js supports all JavaScript expressions within data bindings:

```html
{{ number + 1 }} {{ ok ? 'YES' : 'NO' }} {{ message.split('').reverse().join('')
}}
```

#### Directives

> Directives are special attributes with the `v-` prefix. Directive attribute values are single JavaScript expressions (except for `v-for`, which is an exception). Their role is to reactively apply side effects to the DOM when the value of the expression changes.

The explanation above is from the Vue official documentation on directives. Let's understand directives by adding them to the template.

Modify the template in `HelloWorld.vue` to hide the element using `v-if`:

```html
<template>
  <div class="hello">
    <h1 v-if="show" class="hello-text">{{ msg }}</h1>
    <button v-on:click="show = !show">click</button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Getting Started with Vue.js',
        show: false,
      }
    },
  }
</script>

<style scoped lang="scss">
  .hello {
    &-text {
      color: green;
    }
  }
</style>
```

Now, the screen will initially display nothing because `v-if` is `false`, effectively removing the element from the DOM. You can manipulate variables with a button on the screen.

> Directives reactively apply side effects to the DOM when the value of the expression changes.

You should now understand the official documentation's explanation.

In the next post, we will cover Vue instance options (`mounted`, `created`, `methods`, `props`, etc.) that were briefly mentioned earlier!

![Next Post Preview](https://images.velog.io/images/chaerin00/post/2162c8b9-04d5-44e8-9445-73de364ebaa4/image.png)

---

Reference: [Vue Instance Official Documentation](https://vuejs.org/v2/guide/instance.html)
