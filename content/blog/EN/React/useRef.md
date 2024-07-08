---
title: 'Using useRef to Control Multiple DOM Elements'
date: 2021-06-18 16:05:76
category: React
thumbnail: { thumbnailSrc }
draft: false
---

## Situation Requiring useRef for Multiple DOM Control 🤔

![](https://images.velog.io/images/chaerin00/post/e68b0eb6-dd78-45ec-b0ac-257e88a1f75d/Animation_2021-06-18-17-26-10.gif)
![](https://images.velog.io/images/chaerin00/post/21105603-6895-4b96-9d38-b72300afd10f/image.png)

I needed the grey circles to change to elongated orange dots depending on the selected page. While it's possible to achieve this using state and passing elements via props for CSS manipulation, I opted to explore using useRef.

### 1. useRef Declaration

```jsx
const carouselRef = useRef([])
```

Initialize useRef with an empty array to store multiple DOM elements.

### 2. Passing Ref to Elements

```jsx
<Carousel>
  <div className="circle" ref={(elem) => (carouselRef.current[0] = elem)} />
  <div className="circle" ref={(elem) => (carouselRef.current[1] = elem)} />
  <div className="circle" ref={(elem) => (carouselRef.current[2] = elem)} />
  <div className="circle" ref={(elem) => (carouselRef.current[3] = elem)} />
  <div className="circle" />
</Carousel>
```

Since carouselRef was initialized as an array, instead of `ref={carouselRef}`, set `ref={elem => (carouselRef.current[0] = elem)}` with respective index for each element. For instance, `console.log(caraouselRef.current[0]` will log the first `<div className="circle"></div>`. Now, we can manipulate four elements with a single ref.

### 3. Manipulating the DOM Elements

```jsx
useEffect(() => {
  if (currentSlide !== 4) {
    carouselRef.current[currentSlide].style.width = '2.8rem'
    carouselRef.current[currentSlide].style.background = '#FF7134'
    if (currentSlide !== 0) {
      carouselRef.current[currentSlide - 1].style.width = '0.8rem'
      carouselRef.current[currentSlide - 1].style.background = '#F7F0ED'
    }
    if (currentSlide !== 4) {
      carouselRef.current[currentSlide + 1].style.width = '0.8rem'
      carouselRef.current[currentSlide + 1].style.background = '#F7F0ED'
    }
  }
}, [currentSlide])
```

`currentSlide` represents the current page number stored in state. Using useRef, adjust the width and background color of the grey circles corresponding to the current page number. When the next button is clicked, revert the left circle to its previous state if `currentSlide` isn't 0. Similarly, when the previous button is clicked, revert the right circle if `currentSlide` isn't 4.

## Conclusion 😎

While manipulating styles with useRef isn't ideal, using state for CSS manipulation is generally better. However, useRef is useful for scenarios where you need to control multiple DOM elements in contexts other than CSS manipulation. If you encounter such situations, consider utilizing useRef as demonstrated here 😄

<hr/>
Reference 📕

[https://sukjae.github.io/posts/using-react-ref-for-multiple-dom-element-control](https://sukjae.github.io/posts/using-react-ref-for-multiple-dom-element-control)
