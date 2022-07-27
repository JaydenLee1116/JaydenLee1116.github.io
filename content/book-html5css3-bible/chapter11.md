---
emoji: 📖
title: 모던 웹을 위한 HTML5+CSS3 바이블 - ch 11
date: '2022-07-27 21:25:00'
author: 제이든
tags: book html css web
categories: 책 HTML CSS WEB
---

## 🍎 들어가기에 앞서

이 글은 `모던 웹을 위한 HTML5+CSS3 바이블`을 공부하며 기억해둘 내용들을 간단하게 기록한 글입니다. <br/>
책에 대한 자세한 사항은 [링크](https://www.hanbit.co.kr/store/books/look.php?p_code=B8371709349)를 참고해주세요. 👏

## 📖 1. CSS 추가 규칙과 반응형 웹

CSS3로 넘어오면서 반응형 웹을 위해 많이 사용되는 것이 규칙(@-rule)입니다.<br/>
반응형 웹을 사용하여 데스크탑 전용 웹 페이지와 모바일 전용 웹 페이지를 따로 구분해서 만들지 않아도 됩니다.<br/>
사용자가 사용하고 있는 기기의 종류에 따라서 다른 형태의 화면을 보여주는 방법입니다.<br/>
(반응형 웹과는 반대로 따로 만드는 웹을 적응형 웹이라고 부릅니다.)

### @import 규칙

CSS 파일에서 다른 CSS 파일을 추가하는 방법입니다.<br/>
link보다 좀더 깔끔합니다.

```html
<head>
  <title>Link stylesheet</title>
  <link rel="stylesheet" href="StyleSheetA.css" />
  <link rel="stylesheet" href="StyleSheetB.css" />
</head>

<!-- 🌟 위와 아래는 표현의 차이만 있을 뿐 같은 결과를 냅니다. -->

<title>Import Query</title>
<style>
  @import url(StyleSheetA.css);
  @import url(StyleSheetB.css);

  /*🌟 일반 스타일 사용과 병행할 수 있습니다.*/

  h1 {
    background-color: gold;
  }
</style>
```

### @font-face 규칙

로컬에 있는 폰트 파일을 통해 폰트를 만드는 규칙입니다.

```html
<style>
  @font-face {
    font-family: 'jayden'; /* 🌟 원하는 이름으로 지어줍니다. */
    src: local('NanumGothic'), url('NanumGothic.eot'), url('NanumGothic.ttf'),
      url('NanumGothic.woff');
    /* 🌟 로컬에 있는 폰트 파일 경로를 지정합니다. */
    /* 🌟 브라우저 별로 지원하는 폰트 확장자가 달라 여러 개의 확장자가 있는 것입니다. */
  }

  * {
    font-family: 'jayden'; /* 🌟 지어준 폰트를 이렇게 사용할 수 있습니다. */
  }
</style>
```

### @media 규칙

다양한 장치에서 HTML 문서가 적절한 형태를 갖추게 만들어주는 규칙입니다.<br/>
최근 HTML 페이지가 다양한 장치에서 실행되면서 중요하게 부각된 규칙입니다.

#### 1. link stylesheet에서 media 적용

```html
<title>Media Query Basic</title>
<!-- 🌟 일반 웹 페이지에선 desktop.css 적용 -->
<link rel="stylesheet" href="desktop.css" media="screen" />
<!-- 🌟 웹 페이지 프린트할 땐 print.css 적용 -->
<link rel="stylesheet" href="print.css" media="print" />
```

#### 2. media query

🔥 여기서 기준이 되는 숫자는 아래와 같습니다.

- `768px` : 아이패드가 수직 상태일 때의 너비입니다.
- `960px` : 일반적인 현대 웹 페이지의 너비입니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Media Query Basic</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* 🌟 최대 너비가 767px ➡️ 767px 이하에선 아래 style 적용*/
      @media screen and (max-width: 767px) {
        html {
          background: red;
          color: white;
          font-weight: bold;
        }
      }

      /* 🌟 768px 이상 959px 이하에선 아래 style 적용*/
      @media screen and (min-width: 768px) and (max-width: 959px) {
        html {
          background: green;
          color: white;
          font-weight: bold;
        }
      }

      /* 🌟 960px 이상에선 아래 style 적용*/
      @media screen and (min-width: 960px) {
        html {
          background: blue;
          color: white;
          font-weight: bold;
        }
      }
    </style>
  </head>
  <body>
    <h1>Lorem ipsum</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p>Aenean luctus congue scelerisque. Maecenas aliquet ante.</p>
  </body>
</html>
```

#### 3. import query에 media query 사용

@import 규칙에도 @media 규칙을 사용할 수 있습니다.

```css
@import url(desktop.css) screen;
@import url(print.css) print;
```

#### ➕. 화면 방향 전환(feat. @media)

미디어 쿼리를 사용하여 기기가 수평/수직 상태에 따라 다른 스타일을 적용할 수 있습니다.<br/>
즉, 수평/수직을 구분할 수 있습니다.

```html
<title>Media Query Basic</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  /* 🌟 portrait : 초상화 모드 즉, 수직으로 세워져 있는 경우 */
  @media screen and (orientation: portrait) {
    html {
      background: red;
      color: white;
      font-weight: bold;
    }
  }

  /* 🌟 landscape : 풍경 모드 즉, 수평으로 놓여 있는 경우 */
  @media screen and (orientation: landscape) {
    html {
      background: green;
      color: white;
      font-weight: bold;
    }
  }
</style>
```

```toc

```
