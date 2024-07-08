---
title: '[JS] optional chaining (?.)'
date: 2021-06-18 16:05:21
category: Javascript
thumbnail: { thumbnailSrc }
draft: false
---

# Optional Chaining

## When is it necessary? 🤔

![](https://images.velog.io/images/chaerin00/post/a6dc5c96-50d6-4c1e-ac59-76fb1c042488/image.png)
When working with React and encountering errors in server communication, you often encounter errors like the one shown above. To prevent such errors, conditional rendering was often used.

```jsx
{
  exp &&
    exp.map((exp) => {
      return (
        <WanderCard
          key={exp.id}
          img={exp.img}
          type={exp.type}
          desc={exp.desc}
        />
      )
    })
}
```

While this method can prevent errors, it's also possible to achieve the same implementation using **optional chaining**.

```jsx
{
  exp?.map((exp) => {
    return (
      <WanderCard key={exp.id} img={exp.img} type={exp.type} desc={exp.desc} />
    )
  })
}
```

Writing like this ensures that no errors are thrown when `exp` contains no values.

## Optional Chaining Syntax

The `?.` operator stops the evaluation if the item before `?.` is `null` or `undefined`, returning `undefined`.

```jsx
let user = null

alert(user?.address) // undefined
alert(user?.address.street) // undefined
```

From this example, we understand that `?.` operates only on the item before it, and does not extend further. It's important to note that `user?.` in the example only handles cases where `user` is `null` or `undefined`.

If `user` is not `null` or `undefined` and contains actual values, `user.address` property must exist. Otherwise, an error will occur with the second dot operator in `user?.address.street`.

## Short-circuit Evaluation

`?.` immediately stops evaluation if the left-hand side has no value. This evaluation method is known as short-circuiting.

Therefore, additional actions on the right-hand side of `?.`, including function calls, do not occur once the evaluation of `?.` stops.

```jsx
let user = null
let x = 0

user?.sayHi(x++) // Nothing happens.

alert(x) // 0, x remains unchanged.
```

## Real-life Example

```jsx
{
  exp?.map((exp) => {
    return (
      <WanderCard key={exp.id} img={exp.img} type={exp.type} desc={exp.desc} />
    )
  })
}
```

Referring back to the server communication example, if `exp` received from the server is `null`, `map` operation is prevented by short-circuit evaluation.

This way, similar to conditional rendering, errors can be prevented effectively.

# References 📕

- [JavaScript.info - Optional Chaining](https://ko.javascript.info/optional-chaining)
