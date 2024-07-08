---
title: '[CSS] Exploring CSS Animation'
date: 2021-04-07 18:05:47
category: 'CSS'
thumbnail: { thumbnailSrc }
draft: false
---

Original Velog post: [CSS Animation](https://velog.io/@chaerin00/CSS-CSS-Animation)

<hr/>

CSS3 animations allow for smooth transitions between different CSS styles applied to an element. Animations consist of **CSS styles** that represent the animation and **keyframes** that define the intermediate states of the animation.

### Animation Properties

> Remember, this property does not specify the intermediate states of the animation. These are defined using the **@keyframes** rule discussed below.

The **animation** property includes several sub-properties:

- **animation-delay**: Specifies when the animation will start after the element loads.
- **animation-direction**: Determines whether the animation should start from the beginning or run in reverse after finishing.
- **animation-duration**: Specifies how long one cycle of the animation lasts.
- **animation-iteration-count**: Specifies how many times the animation should repeat. Setting it to `infinite` will make it repeat indefinitely.
- **animation-name**: Specifies the name of the keyframe that defines the intermediate states of the animation.
- **animation-play-state**: Allows the animation to be paused or resumed.
- **animation-timing-function**: Defines the pace at which the animation transitions through the intermediate states.
- **animation-fill-mode**: Specifies what styles should be applied before the animation starts and after it ends.

<br/><br/>

### Defining Intermediate States with @keyframes

To define the intermediate states of an animation, use the @keyframes rule. The percentage values represent when the intermediate states occur during the animation. `0%` signifies the start, and `100%` signifies the end of the animation. You must define at least these two points to let the browser know when the animation starts and ends. You can also use `from` and `to` instead of `0%` and `100%`.

You can define additional keyframes at specific points between the start and end.

<br/><br/>

### Example

Let's look at an example to see how animation works!

```css
p {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```

In this example, the paragraph element will move from the right side of the browser to the left over a duration of 3 seconds.

<br/><br/><br/><hr/><br/><br/>

Additionally, here are some examples from a previous JavaScript study group that included animations!

- [Clock Animation Example](https://github.com/chaerin00/javascript_study/tree/master/clock)
  ![](https://images.velog.io/images/chaerin00/post/967831ff-df39-44c0-ba29-6340fc5a7dbe/Animation_2021-04-06-13-57-09.gif)
- [Other Animation Examples](https://github.com/chaerin00/javascript_study/tree/master/%EB%AA%A9%EC%82%B4%EC%B5%9C%EA%B3%A0)
  ![](https://images.velog.io/images/chaerin00/post/3739ca55-8213-48da-8d30-1af709e20dd7/Animation_2021-04-06-13-54-40.gif)
