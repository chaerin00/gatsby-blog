---
title: '[JS] Optional Chaining Utilization'
date: 2021-06-18 16:10:67
category: Javascript
thumbnail: { thumbnailSrc }
draft: false
---

## Scenario 🤯

![](https://images.velog.io/images/chaerin00/post/3742d49f-22de-425f-9281-9651b655ebc2/Animation_2021-06-18-18-09-40.gif)

The screen I was trying to create was as shown in the image above: when entering a new directory name in an input field and clicking the save button, the overlay on the card disappears, and a save screen should appear. However, after clicking the save button, the overlay disappeared but the save screen did not appear. The reason was that the event for removing the overlay when the input field loses focus happened before the event triggered when clicking the save button, preventing the save operation.

To address this, I modified the code as follows:

```jsx
<ButtonWrap isShow={isShow} inputChange={inputChange}>
  <input
    className="addInput"
    placeholder="Enter a new directory name"
    onChange={(e) => {
      inputText.onChange(e)
      setInputChange(true)
    }}
    onFocus={(e) => {
      e.stopPropagation()
      setCardHoverInputState(true)
    }}
    onBlurCapture={(e) => {
      e.stopPropagation()
      console.log(e.relatedTarget.className)
      if (e.relatedTarget.className !== 'addBtn') {
        setCardHoverInputState(false)
      }
    }}
    value={inputText.value}
    maxLength={20}
    onKeyPress={onKeyPress}
  />
  <button className="addBtn" onClick={addDirHandler}>
    Save
  </button>
</ButtonWrap>
```

The overlay disappears only when the clicked component's className is not "addBtn", ensuring that it doesn't disappear when clicking the save button. However, this approach caused an error... 😂 The issue arose because sometimes the clicked location was null, and accessing className on null caused an error.

In thinking about how to solve this, **Optional Chaining** came to mind.

## Problem Resolution 🤗

> If the object before ?. is null or undefined, the evaluation stops and undefined is returned.

This is from my previous [Optional Chaining posting](https://velog.io/@chaerin00/JS%EC%98%B5%EC%85%94%EB%84%90-%EC%B2%B4%EC%9D%B4%EB%8B%9D). Optional chaining stops evaluation and returns undefined if the object being evaluated is null, avoiding errors.

By modifying `e.relatedTarget.className` to `e?.relatedTarget?.className`, even if the event target is null, it returns undefined instead of trying to access className on null, preventing errors.

I applied this to update the code:

```jsx
<ButtonWrap isShow={isShow} inputChange={inputChange}>
  <input
    className="addInput"
    placeholder="Enter a new directory name"
    onChange={(e) => {
      inputText.onChange(e)
      setInputChange(true)
    }}
    onFocus={(e) => {
      e.stopPropagation()
      setCardHoverInputState(true)
    }}
    onBlurCapture={(e) => {
      e.stopPropagation()
      console.log(e?.relatedTarget?.className)
      if (e?.relatedTarget?.className !== 'addBtn') {
        setCardHoverInputState(false)
      }
    }}
    value={inputText.value}
    maxLength={20}
    onKeyPress={onKeyPress}
  />
  <button className="addBtn" onClick={addDirHandler}>
    Save
  </button>
</ButtonWrap>
```

**Console Output Result**
![](https://images.velog.io/images/chaerin00/post/7a6879bd-6ea7-4c36-97c8-877e4191d841/image.png)

I confirmed that the optional chaining returned undefined, avoiding the error.

## Reflection

Honestly, I hadn't been able to use optional chaining much beyond receiving results from the server. This experience showed me how useful it can be in practical scenarios.

Without knowing optional chaining, I might have used `? :` or `&&` or structured `if { ... } else { ... }` to handle this situation. Using `?.` is much cleaner and simpler, resulting in more elegant code!
