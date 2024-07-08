---
title: '[HTML] HTML SVG Tags'
date: 2021-04-06
category: 'HTML'
draft: false
---

Original Velog Posting
https://velog.io/@chaerin00/HTML-HTML-SVG

Let's delve into the SVG tag 😊

### What is SVG?

> Scalable Vector Graphics (SVG) is an XML-based file format for representing 2D vector graphics. It is an open standard vector graphic file format developed under the leadership of W3C (World Wide Web Consortium) in 1999. SVG images and their behavior are defined by XML text files, allowing them to be searched, indexed, scripted, and optionally compressed.
> SVG is the standard for representing vector images developed by W3C.

<br/>
<br/>

### SVG vs PNG

PNG files are bitmap-based, whereas SVG files are vector-based, resulting in differences when the image is scaled up.
![PNG example](https://t1.daumcdn.net/cfile/tistory/2164A34957DA1B9512)
![SVG example](https://t1.daumcdn.net/cfile/tistory/246D8E4957DA1B940A)

### Using SVG Files

- <img/>
- <embed/>
- <object/>
- <iframe/>
- **<svg/>**

1. Using img tag
   ```
   <img src="sopt.svg" alt="react study 최고">
   ```
2. Using embed tag
   ```
   <embed src="king.svg" type="image/svg+xml" aria-label="King (Chess Piece)">
   ```
3. Using object tag
   ```
   <object data="king.svg" type="image/svg+xml" aria-label="King (Chess Piece)"></object>
   ```
4. Using iframe tag
   ```
   <iframe src="king.svg" aria-label="King (Chess Piece)"></iframe>
   ```
5. Using svg tag

   ```
   <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
   <!-- Code for king.svg -->
   </svg>
   ```

### SVG Tag Attributes

The `<svg>` element marks the beginning of inline SVG. There are various attributes that can be added to the svg element. Typically, the following attributes are set:

- version
- xmlns
- xmlns:xlink
- viewbox
- width, height

```
<svg
  version="1.1"
  xmlns=http://www.w3.org/2000/svg
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="520" height="520"
  viewBox="0 0 520 520">
  ...
</svg>
```

However, for inline SVG code, the following attributes are not required by web browsers:

- version
- xmlns
- xmlns:xlink

```
<svg width="520" height="520" viewBox="0 0 520 520">
  ...
</svg>
```

#### viewBox

The viewBox attribute accepts a numeric array of `min-x`, `min-y`, `width`, and `height` values, specifying the space mapped to the viewport and its relationship with the preserveAspectRatio attribute.

#### preserveAspectRatio

Details regarding this attribute can be found here:
https://a11y.gitbook.io/graphics-aria/svg-graphics/svg-layout

### Drawing Basic Shapes with SVG

#### Rectangle

<svg>
  <rect width="200" height="100" fill="#3d87fb" />
</svg>

```
<svg>
  <rect width="480" height="240" fill="#3d87fb" />
</svg>
```

<svg>
  <rect width="200" height="100" fill="#3d87fb" x="20" y="40" rx="20" ry="20" />
</svg>

```
<svg>
  <rect width="480" height="240" fill="#3d87fb" x="20" y="40" rx="20" ry="20" />
</svg>
```

#### Circle

<svg width="200" height="200">
  <circle 
    cx="100" cy="100" r="50" 
    fill="none" stroke="#f9b10a" stroke-width="14" />
</svg>

```
<svg width="200" height="200">
  <circle
    cx="100" cy="100" r="50"
    fill="none" stroke="#f9b10a" stroke-width="14" />
</svg>
```

<br/>

### Drawing Path Shapes with SVG

<br/>
<svg width="400" height="200">
  <path 
    d="M248.761,92c0,9.801-7.93,17.731-17.71,17.731c-0.319,0-0.617,0-0.935-0.021c-10.035,37.291-51.174,65.206-100.414,65.206 c-49.261,0-90.443-27.979-100.435-65.334c-0.765,0.106-1.531,0.149-2.317,0.149c-9.78,0-17.71-7.93-17.71-17.731 c0-9.78,7.93-17.71,17.71-17.71c0.787,0,1.552,0.042,2.317,0.149C39.238,37.084,80.419,9.083,129.702,9.083c49.24,0,90.379,27.937,100.414,65.228h0.021c0.298-0.021,0.617-0.021,0.914-0.021C240.831,74.29,248.761,82.22,248.761,92z" 
    fill="#f9ef21" stroke="#f9cf01" stroke-width="7" stroke-linejoin="round" />
</svg>

```
<svg width="400" height="200">
  <path
    d="M248.761,92c0,9.801-7.93,17.731-17.71,17.731c-0.319,0-0.617,0-0.935-0.021c-10.035,37.291-51.174,65.206-100.414,65.206 c-49.261,0-90.443-27.979-100.435-65.334c-0.765,0.106-1.531,0.149-2.317,0.149c-9.78,0-17.71-7.93-17.71-17.731 c0-9.78,7.93-17.71,17.71-17.71c0.787,0,1.552,0.042,2.317,0.149C39.238,37.084,80.419,9.083,129.702,9.083c49.24,0,90.379,27.937,100.414,65.228h0.021c0.298-0.021,0.617-0.021,0.914-0.021C240.831,74.29,248.761,82.22,248.761,92z"
    fill="#f9ef21" stroke="#f9cf01" stroke-width="7" stroke-linejoin="round" />
</svg>
```

For more information about path, visit the blog:
https://a11y.gitbook.io/graphics-aria/svg-graphics/svg-paths-shape
