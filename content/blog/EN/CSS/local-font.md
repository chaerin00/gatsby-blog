---
title: '[CSS] Applying Local Fonts'
date: 2022-03-18 17:05:27
category: CSS
thumbnail: { thumbnailSrc }
draft: false
---

Today, we will explore how to apply local fonts in CSS. There are two primary methods to apply fonts: using web fonts and local fonts. Web fonts can be applied by importing them in a CSS file or by including them in the head tag of your HTML.

```css
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
```

```html
<link
  href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
  rel="stylesheet"
  type="text/css"
/>
```

What does the link ([spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css](https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css)) contain? As the file name suggests, we are importing a CSS file. If you open the link, you will see the following content in the CSS file:

```css
@font-face {
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  src:
    local('Spoqa Han Sans Neo Bold'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2')
      format('woff2'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff')
      format('woff'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf')
      format('truetype');
}
```

To apply local fonts, you can download the desired font files and create a similar CSS structure.

## 1. Download Font Files

If your desired font is available on [Google Fonts](https://fonts.google.com/), select and download the weights you need, as shown below. For example, if you only need font weights 300, 400, and 700, download only those files.
![](https://images.velog.io/images/chaerin00/post/cc1b15c8-386a-486a-bca9-5cfd65dcc8f6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.53.50.png)

Google Fonts typically provides font files in the OTF format. Different font formats have varying levels of compatibility with different browsers, so choose the format that best suits your needs.

> - **TTF**: Commonly used on Mac and Windows. Not supported by IE8; partially supported from IE9. Large file size.
> - **OTF**: Used on Mac and Windows, supports a large character set. Large file size.
> - **EOT**: Used by Microsoft for web fonts, supported only by Internet Explorer.
> - **WOFF**: Supported by all major browsers, compressed for faster loading.
> - **WOFF2**: Next-generation version of WOFF with better compression, not as widely supported yet.

## 2. Create CSS File

After downloading the font files, place them in the `assets/fonts` folder of your project. Then, add the following to your `global.css` or `index.css`:

```css
@font-face {
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  src: url('@assets/fonts/SpoqaHanSansNeo-Bold.woff2') format('woff2');
}
@font-face {
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  src: url('@assets/fonts/SpoqaHanSansNeo-Medium.woff2') format('woff2');
}
@font-face {
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
  src: url('@assets/fonts/SpoqaHanSansNeo-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 300;
  src: url('@assets/fonts/SpoqaHanSansNeo-Light.woff2') format('woff2');
}
```

### @font-face

The `@font-face` rule allows you to define custom fonts to be used within your webpages. You can use `@font-face` to load different font files for different font weights and styles.

### font-family

Inside the `@font-face` rule, the `font-family` property specifies the name of the font. For example, you can define a font like this:

```css
@font-face {
  font-family: 'CustomFont';
  src: local('Helvetica Neue Bold'), url('MgOpenModernaBold.ttf');
}
```

### font-weight

The `font-weight` property inside the `@font-face` rule specifies the weight of the font file. For example:

```css
@font-face {
  font-family: 'CustomFont';
  font-weight: 400;
  src: local('Helvetica Neue Bold'), url('MgOpenModernaBold.ttf');
}
```

> 📕 Note:
>
> - `normal`: Normal font weight (400).
> - `bold`: Bold font weight (700).

### font-style

The `font-style` property specifies the style of the font (e.g., normal, italic). For example:

```css
@font-face {
  font-family: 'CustomFont';
  font-style: normal;
  src: local('Helvetica Neue Bold'), url('MgOpenModernaBold.ttf');
}
```

### src

The `src` property specifies the location of the font file. It can contain multiple URLs, with the browser using the first format it supports:

```css
src:
  local('Spoqa Han Sans Neo Medium'),
  url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2')
    format('woff2'),
  url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff')
    format('woff'),
  url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf')
    format('truetype');
```

- `local()`: Specifies a font installed on the user's local computer.
- `url()`: Specifies the URL of the font file.
- `format()`: Specifies the format of the font file (e.g., `woff`, `woff2`, `truetype`).

## Additional Tip: Using CDN for Font Files

If the desired font is not available as a web font, you can upload the font file and CSS to a CDN and use it. This approach was used in a project where a client requested specific fonts. The fonts were uploaded to a CDN and then imported using a CDN URL.

![](https://images.velog.io/images/chaerin00/post/d6a683de-7cb0-4ead-be36-c10d21ca8375/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.03.28.png)

<hr/>

### References

- [MDN Web Docs: @font-face](https://developer.mozilla.org/ko/docs/Web/CSS/@font-face)
