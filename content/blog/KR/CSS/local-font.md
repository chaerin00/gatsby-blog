---
title: '[CSS] 로컬 폰트 적용 방법'
date: 2022-03-18 17:05:27
category: CSS
thumbnail: { thumbnailSrc }
draft: false
---

오늘은 로컬 폰트 적용방법에 대해 알아보도록 하겠습니다. 폰트를 적용하는 방법은 크게 웹폰트와 로컬폰트를 사용하는 방법이 있습니다. 그 중 웹폰트는 다음과 같이 주로 css 파일에서 import 해와서 사용하거나 head 태그에 넣어서 사용합니다.

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

그럼 저 링크 ([spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css](spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css))에는 어떤 내용이 있을까요? 파일 이름에서도 알 수 있듯이 우리가 import 해오는 것은 바로 css 파일입니다. 링크에 들어가보면 다음과 같은 css파일 내용이 나옵니다.
![](https://images.velog.io/images/chaerin00/post/32304939-daca-4861-a3fe-f5edcf3052c2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.42.57.png)

코드를 자세히 살펴보면 다음과 같은 구문이 반복됨을 알 수 있습니다.

```css
@font-face {
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  src: local('Spoqa Han Sans Neo Bold'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2')
      format('woff2'), url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff')
      format('woff'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf')
      format('truetype');
}
```

로컬 폰트 적용 역시 원하는 폰트 파일과 이와 동일한 css를 작성해주면 됩니다.

## 1. 폰트 파일 다운로드

만약에 원하는 폰트가 [구글 폰트](https://fonts.google.com/)에 있다면 다음 사진과 같이 원하는 굵기의 폰트를 선택하여 저장해줍니다. 만약에 font-weight를 300, 400, 700만 사용한다면 해당하는 파일만 저장해주면 됩니다.
![](https://images.velog.io/images/chaerin00/post/cc1b15c8-386a-486a-bca9-5cfd65dcc8f6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.53.50.png)

구글 폰트에서 다운받게 되면 otf 파일로 다운로드가 되는데, 폰트 파일에는 다양한 종류가 있는데, 브라우저마다 호환성이 다르기 때문에 자신의 필요에 맞는 폰트 파일을 선택하여 사용해야 합니다.

>

- TTF
  Mac 및 Windows 운영 체제에서 가장 일반적인 글꼴. IE8은 TTF를 지원하지 않음. IE9부터는 부분적 지원.
  단점: 글꼴이 압축되지 않아 결과적으로 파일 크기가 큼(로딩속도 문제발생).

> - OTF
>   Mac 및 Windows 운영 체제에서 사용 가능하며 화면 및 프린터 글꼴 데이터를 하나의 구성 요소에 포함. 여러 플랫폼 및 확장 된 문자 집합에 대한 지원을 포함. 최대 65,000 자의 저장 공간을 허용함.
>   단점: 글꼴이 압축되지 않아 결과적으로 파일 크기가 큼(로딩속도 문제발생).

> - EOT
>   Microsoft에서 웹에서 사용하는 글꼴. Internet Explorer에서만 지원.

> - WOFF
>   모든 주요 브라우저에서 지원하는 메타 데이터 및 압축 기능을 갖춤 글꼴이 압축되어 있기 때문에로드가 더 빠름. 메타 데이터를 사용하면 저작권 문제를 해결하기 위해 글꼴 파일에 라이센스 데이터를 포함 할 수 있음.
>   장점: 글꼴이 압축되어있어 로드속도가 빠름.

> - WOFF2
>   WOFF 차세대버전. WOFF2 형식은 원래 WOFF보다 평균 30 %의 압축적 이득을 제공함. 여전히 권장 업그레이드이기 때문에 WOFF를 광범위하게 지원하지는 않음.

## 2. css 파일 작성

위에서 다운받은 폰트 파일들을 프로젝트의 `assets/fonts` 폴더에 넣어준 후 `global.css` 또는 `index.css`와 같은 css 파일에 다음 내용을 추가해줍니다. 이 css 코드가 의미하는 바를 하나씩 알아보도록 하겠습니다.

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

우리가 흔히 사용하는 font-family라는 style 속성은 이 @font-face로 정의된 폰트들이 합쳐져 있는 것이라고 이해할 수 있습니다. 예를 들면 아까 우리가 다운로드한 폰트도 파일이 하나가 아닌 Bold, Light, Medium등 여러 개임을 알 수 있는데, 이러한 다양한 파일들을 `font-family: NotoSansKR` 로 묶어서 사용할 수 있게 하려면 @font-face를 이용해 `font-family: NotoSansKR; font-weight:400` 이라는 style에는 어떤 폰트파일을 사용해야 하는지 지정해야합니다.
![](https://images.velog.io/images/chaerin00/post/dedb55ae-832d-433c-88b0-b394136c5277/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.10.46.png)

### font-family

`@fontface { }`안에 font-family를 이용해 우리가 사용할 font의 이름을 지정해줄 수 있습니다. 만약 다음과 같이 작성한다면 src의 폰트 파일은 `font-family: chearin00`으로 사용할 수 있는 것입니다.

```css
@font-face {
  font-family: chaerin00;
  src: local('Helvetica Neue Bold'), url(MgOpenModernaBold.ttf);
}
```

### font-weight

font-family와 유사하게 `@fontface { }`안에 font-weight를 이용하면 해당 굵기에 어떤 파일이 사용될 지 지정해줄 수 있습니다. 다음과 같이 지정하면 `font-family: chaerin00; font-weight: 400`의 style은 아래 src의 폰트 파일이 적용됩니다.

```css
@font-face {
  font-family: chaerin00;
  font-weight: 400;
  src: local('Helvetica Neue Bold'), url(MgOpenModernaBold.ttf);
}
```

> 📕 참고
> normal : 보통 굵기입니다. 숫자 400과 같습니다.
> bold : 굵은 굵기입니다. 숫자 700과 같습니다.

### font-style

`@fontface { }`안에 font-style를 이용하면 해당 font-style에 (ex. normal, italic...)에 어떤 파일이 사용될 지 지정해줄 수 있습니다. 다음과 같이 지정하면 `font-family: chaerin00; font-style: normal`의 style은 아래 src의 폰트 파일이 적용됩니다.

```css
@font-face {
  font-family: chaerin00;
  font-style: normal;
  src: local('Helvetica Neue Bold'), url(MgOpenModernaBold.ttf);
}
```

### src

src 속성은 파일을 지정할 때 사용됩니다. 다음과 같이 src 속성을 지정하면 아래 적혀있는 폰트파일을 모두 불러오는 것이 아닌 첫번째부터 차례대로 해당 브라우저에서 사용가능한 폰트를 찾아 제일 첫번째 폰트파일만을 사용합니다.

그렇기 때문에 만약 cdn에 폰트파일을 올려놓고 쓰는 경우라면 가장 크기가 작은 파일부터 순서대로 쓰는 것이 좋습니다. (woff2 -> woff -> ...)

```css
src: local('Spoqa Han Sans Neo Medium'),
  url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2')
    format('woff2'), url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff')
    format('woff'),
  url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf')
    format('truetype');
```

- `local()`
  사용자의 로컬환경(local computer)에 설치된 폰트는 local() 이라는 구문을 사용하여 지정이 가능합니다.
- `url()`
  원격 폰트(remote font) 파일의 위치를 나타내는 URL 값을 지정합니다.
- `format()`
  파일에 맞게 글꼴 형식을 지정해줍니다. `woff | woff2 | truetype | opentype | embedded-opentype | svg` 중에 선택
  ![](https://images.velog.io/images/chaerin00/post/64d319b4-c4e1-4400-adc6-a128925ac2f1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.54.45.png)

## + 추가 ) CDN에 폰트파일 올려놓고 사용하기

만약에 원하는 폰트가 웹폰트로 없다면 폰트파일과 css파일을 한 폴더에 넣어 cdn에 올려서 사용할 수 있습니다.
한 프로젝트에서 client가 요청한 폰트를 지정 해야하는 일이 있었는데 그 때 cdn을 활용하여 이후에 해당 CDN url을 import 해와서 사용했습니다.
![](https://images.velog.io/images/chaerin00/post/d6a683de-7cb0-4ead-be36-c10d21ca8375/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.03.28.png)

<hr/>

참고자료
[https://developer.mozilla.org/ko/docs/Web/CSS/@font-face](https://developer.mozilla.org/ko/docs/Web/CSS/@font-face)
