---
title: '[HTML] HTML svg 태그'
date: 2021-04-06
category: 'HTML'
# thumbnail: { thumbnailSrc }
draft: false
---

기존 벨로그 포스팅
https://velog.io/@chaerin00/HTML-HTML-SVG

svg 태그에 대해 알아보겠습니다😉

### SVG란?

> 스케일러블 벡터 그래픽스(Scalable Vector Graphics, SVG)는 2차원 벡터 그래픽을 표현하기 위한 XML 기반의 파일 형식으로, 1999년 W3C(World Wide Web Consortium)의 주도하에 개발된 오픈 표준의 벡터 그래픽 파일 형식이다. SVG 형식의 이미지와 그 작동은 XML 텍스트 파일들로 정의 되어 검색화·목록화·스크립트화가 가능하며 필요하다면 압축도 가능하다.
> svg는 벡터(vector) 이미지를 표현하기 위한 포맷으로 w3c에서 만든 벡터 이미지 표준입니다.

<br/>
<br/>

### SVG vs PNG

PNG파일은 Bitmap으로 되어있고, SVG파일은 Vector로 되어있어서 이미지 확대시 차이가 발생합니다.
![PNG example](https://t1.daumcdn.net/cfile/tistory/2164A34957DA1B9512)
![SVG example](https://t1.daumcdn.net/cfile/tistory/246D8E4957DA1B940A)

### SVG 파일 사용법

- <img/&gt;
- <embed/&gt;
- <object/&gt;
- <iframe/&gt;
- **<svg/&gt;**

1. img 태그 사용
   ```
   <img src="sopt.svg" alt="react study 최고">
   ```
2. embeded 태그 사용
   ```
   <embed src="king.svg" type="image/svg+xml" aria-label="킹 (체스 말)">
   ```
3. object 태그 사용
   ```
   <object data="king.svg" type="image/svg+xml" aria-label="킹 (체스 말)"></object>
   ```
4. iframe 태그 사용
   ```
   <iframe src="king.svg" aria-label="킹 (체스 말)"></iframe>
   ```
5. svg 태그 사용

   ```
   <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
   <!-- king.svg 코드 -->
   </svg>
   ```

### SVG 태그 속성

`<svg>` 요소는 인라인 SVG의 시작입니다. svg 요소에 추가 할 수 있는 속성은 다양합니다. 일반적으로 다음 속성들이 설정됩니다.

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

하지만 인라인 SVG 코드의 경우, 웹 브라우저에서 렌더링 하는데 다음 속성은 필요하지 않습니다.

- version
- xmlns
- xmlns:xlink

```
<svg width="520" height="520" viewBox="0 0 520 520">
  ...
</svg>
```

#### viewBox

viewBox 속성은 값으로 `min-x`, `min-y`, `width`, `height`숫자 배열 값을 전달 받습니다. 이 값은 뷰포트에 맵핑 되는 공간을 명시 하며, **preserveAspectRatio** 속성과 관계를 가집니다.

#### preserveAspectRatio

이 속성과 관련한 내용은 아래에 첨부해두었습니다
https://a11y.gitbook.io/graphics-aria/svg-graphics/svg-layout

### SVG 기본도형 그리기

#### 사각형

<svg>
  <rect width="200" height="100" fill="#3d87fb" />
</svg>

```<svg>
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

#### 원

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

### SVG 패스 도형 그리기

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

path 관련 블로그
https://a11y.gitbook.io/graphics-aria/svg-graphics/svg-paths-shape
