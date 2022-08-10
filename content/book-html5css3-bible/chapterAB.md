---
emoji: 📖
title: 모던 웹을 위한 HTML5+CSS3 바이블 - 부록 A, B
date: '2022-07-28 23:33:00'
author: 제이든
tags: book html css web
categories: 책 HTML CSS WEB
---

## 🍎 들어가기에 앞서

이 글은 `모던 웹을 위한 HTML5+CSS3 바이블`을 공부하며 기억해둘 내용들을 간단하게 기록한 글입니다. <br/>
책에 대한 자세한 사항은 [링크](https://www.hanbit.co.kr/store/books/look.php?p_code=B8371709349)를 참고해주세요. 👏

## 📖 1. Appendix A - 부트스트랩

[부트스트랩](https://getbootstrap.com/)은 트위치에서 제공하는 웹 페이지 디자인 프레임워크입니다. 부트스트랩을 사용하여 반응형 웹 페이지를 쉽고 빠르게 만들 수 있습니다.<br/>
부트스트랩은 2가지 방법으로 제공됩니다.

1. 자바스크립트와 스타일시트 파일을 다운로드해서 사용
2. `CDN(Content Delivery Network)을 사용`

### 개요

아래의 코드를 `<head>`에 넣어줍니다.

```html
<!-- CSS only -->
<!-- 🌟 head 태그에 둡니다. -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
  crossorigin="anonymous"
/>
<!-- JavaScript Bundle with Popper -->
<!-- 🌟 body 태그 끝에 둡니다. -->
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
  crossorigin="anonymous"
></script>
```

### 레이아웃

#### 1. Fixed 레이아웃

고정된 너비를 사용하는 레이아웃입니다. 화면의 크기를 바꿔도 컨텐츠의 크기가 변하지 않습니다.

- [네이버](www.naver.com)

다음과 같이 class를 "container"로 지정해주면 fixed 레이아웃이 만들어집니다.<br/>
또한, 부트스트랩의 기본 화면 너비는 960px이고 너비가 그 아래로 줄어들면 `반응형 웹 페이지`로 동작합니다.

> 여기서 정적(Fixed) vs 동적(Fluid)와 반응형은 다른 개념입니다. 반응형은 특정 화면 크기에 대해서 다른 레이아웃을 갖게 구성한 것입니다.
> 반응형의 반대는 적응형입니다.([참고 : ch 11](https://jaydenlee1116.github.io/book-html5css3-bible/chapter11/))

```html
<div class="container">
  <h1>Lorem ipsum</h1>
</div>
```

#### 2. Fluid 레이아웃

특정 화면 크기에 따라 레이아웃 크기가 변화합니다. 화면의 크기를 바꾸면 컨텐츠의 크기가 변합니다.

- [트위치tv](www.twitch.tv)

```html
<div class="container-fluid">
  <h1>Lorem ipsum</h1>
</div>
```

### 툴바

웹 페이지 상단에 위치하는 구성 요소입니다.

#### 일반형 툴바

스크롤을 내렸을 때 보이지 않는 툴바입니다. 그냥 일반 div처럼 스크롤 시 위로 올라갑니다.

```html
<div class="navbar navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">Bootstrap</a>
  </div>
</div>
```

#### 고정형 툴바

스크롤을 내렸을 때 따라오는 툴바입니다. 즉, 상단에 계속 고정되어있습니다.

```html
<!-- 🌟 fixed-top: 고정형 툴바를 만듭니다.-->
<!-- 🌟 navbar-expand-lg: 반응형 툴바를 만듭니다.-->

<div class="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
  <div class="container">
    <a class="navbar-brand" href="#">Bootstrap</a>
  </div>
</div>
```

일반적으로 툴바를 적용하면 툴바가 공간을 차지하게 됩니다. 따라서 아래와 같은 처리를 해줍니다.

```css
body {
  padding-top: 70px;
}
```

### 추가(툴바 버튼)

```html
<body>
  <div class="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="#">Bootstrap</a>
      <!-- 🌟 button 태그에 data-target="#navbar-content"를 통해
       id="navbar-content"인 태그를 버튼을 통해 열고 닫을 대상으로 지정합니다. -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-content"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-content">
        <!-- 🌟  mr-auto은 margin-auto의 의미로 그 다음 ul을 뒤로 밀어버리게 됩니다. -->
        <ul class="navbar-nav mr-auto">
          <!-- 🌟 시작: class에 dropdown을 추가하고 그 아래 토글버튼을 통해 드롭다운 아이템을 만듭니다. -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">HTML</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Geolocation</a>
              <a class="dropdown-item" href="#">Drag and Drop</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Motion</a>
            </div>
          </li>
          <!-- 🌟 끝: class에 dropdown을 추가하고 그 아래 토글버튼을 통해 드롭다운 아이템을 만듭니다. -->
          <li class="nav-item"><a class="nav-link" href="#">CSS3</a></li>
          <li class="nav-item"><a class="nav-link" href="#">ECMAScript5</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Node.js</a></li>
          <li class="nav-item"><a class="nav-link" href="#">API</a></li>
        </ul>
        <!-- 🌟 이렇게 입력 형식을 간단하게 만들 수 있습니다. -->
        <form class="form-inline">
          <input type="text" class="form-control" placeholder="Search" />
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item"><a class="nav-link" href="#">Node.js</a></li>
          <li class="nav-item"><a class="nav-link" href="#">API</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container">
    <h1>Jayden</h1>
    <p>안녕하세요</p>
    <p>반갑습니다</p>
    <p>개발자</p>
    <p>프론트엔드</p>
    <p>만세입니다</p>
  </div>
</body>
```

### 📕 부트스트랩 정리

부트스트랩은 웹 페이지 디자인 프레임워크로 간편하게 웹 페이지를 만들기 좋습니다. 다만, 그만큼 다소 무겁고 정형화된 페이지를 만들어낸다는 단점도 있습니다.<br/>
부트스트랩은 그 내용을 하나하나 외우고 하기보단 [부트스트랩 공식문서](https://getbootstrap.com/docs/5.2/getting-started/introduction/)를 보면서 필요한 기능들을
구현하는 게 좋습니다.

## 📖 2. Appendix B - Less 스타일시트

스타일시트를 더 쉽게 사용하기 위해 다양한 스타일시트 엔진들이 등장했습니다.<br/>
스타일시트 엔진은 특정한 형태의 스타일시트를 CSS 스타일시트로 변경해주는 <strong>변환 엔진</strong>`컴파일러`입니다.<br/>
대표적으로 Sass 엔진과 Less 엔진이 있습니다.

### 개요

[Less 공식 홈페이지](http://lesscss.org/)에서 `less.js` 파일을 받습니다.<br/>
이어서 html 파일과 less 확장자를 쓰는 파일을 생성해줍니다. 그럼 아래와 같이 파일이 준비됩니다.

- less-1.3.0.min.js(less 홈페이지에서 받은 파일) -> 변환 엔진 역할
- index.html
- LessStyleSheet.less(마치 style.css처럼 스타일을 적을 파일입니다.)

```html
<head>
  <title>Less StyleSheet Basic</title>
  <link rel="stylesheet/less" type="text/css" href="LessStyleSheet.less" />
  <script src="less-1.3.0.min.js"></script>
</head>
```

LessStyleSheet.less 예제입니다.

```less
// 🌟 javascript와 같이 `/` 2개로 주석을 쓸 수 있습니다.(오예)
// 🌟 선택자 내부에 선택자가 존재합니다. 조금 낯설지만 훨씬 가독성이 좋은 걸 알 수 있습니다.
header {
  width: 800px;
  margin: 0 auto;

  hgroup {
    h1 {
      color: red;
    }

    h2 {
      color: blue;
    }
  }

  nav {
    ul {
      overflow: hidden;
    }

    li {
      float: left;
    }
  }
}
```

### Less 컴파일러

위의 구성처럼 변환 엔진 역할을 하는 Less.js 파일이 편리하긴 하지만, 굳이 유저에게까지 전달하면서 트래픽을 낭비할 필요가 없습니다.<br/>
해서 [온라인 Less 컴파일러](https://jsonformatter.org/less-to-css)에서 less 형식을 css 형식으로 바꿔서 가져올 수 있습니다.(공식 홈페이지에서도 가능합니다.)

### 기본

#### 변수

Less 스타일시트는 변수를 만들 수 있습니다. 변수는 @ 기호를 사용하며 스타일시트에서 사용하는 모든 단위를 사용할 수 있습니다.

```less
@margin: 10px;
@padding: 10px;
@width: 200px;

div {
  width: @width - (@padding * 2);
  padding: @padding;
  margin: @margin;
}
```

#### 내장 선택자

선택자(A) 내부 선택자(B)가 있을 때, A의 내부에서 본인을 가리키는 선택자가 `내장 선택자`이고 `&`로 표현합니다.

```less
div {
  background: black;
  &:hover {
    background: white;
  }

  a {
    background: red;
    color: white;
    &:hover {
      background: blue;
    }
    &:active {
      background: green;
    }
  }
}
```

#### 내장 함수

Less 스타일시트에는 내장 함수도 있습니다. 잘 사용하면 굉장히 유용하지만, 여기에서는 따로 정리하지 않겠습니다. 🌵<br/>
[Less 내장 함수 공식문서](https://lesscss.org/functions/)를 참고해주세요.

#### 믹스인

기본적인 내장 함수도 있지만, 우리가 직접 함수를 만들어 사용할 수도 있습니다!(오마이갓 🙀)<br/>
`.이름(@변수1, @변수2, ...) {}` 형태로 함수를 만들어 사용합니다.

```less
.linearGradient(@start, @end) {
  background: @start;
  background: -moz-linear-gradient(top, @start 0%, @end 100%);
  background: -webkit-linear-gradient(top, @start 0%, @end 100%);
  background: -o-linear-gradient(top, @start 0%, @end 100%);
  background: -ms-linear-gradient(top, @start 0%, @end 100%);
  background: linear-gradient(top, @start 0%, @end 100%);
}

.button(@width, @height, @radius) {
  width: @width;
  height: @height;
  line-height: @height;
  text-align: center;
  border-radius: @radius;
}

* {
  margin: 0;
  padding: 0;
}
div {
  margin: 10px;
  float: left;

  &:nth-child(1) {
    .linearGradient(#0094ff, #004f89);
    .button(200px, 100px, 10px);
  }

  &:nth-child(2) {
    .linearGradient(#0094ff + #CC0000, #004f89 + #CC0000);
    .button(200px, 100px, 10px);
  }

  &:nth-child(3) {
    .linearGradient(#0094ff + #FF0000, #004f89 + #FF0000);
    .button(200px, 100px, 10px);
  }
}
```

또한, 자료형을 확인하는 내장함수를 이용하여 주어진 변수가 원하는 자료형일 때만 함수가 실행되게 할 수 있습니다.

```less
.linearGradient(@start, @end) when (iscolor(@start)) and (iscolor(@end)) {
  background: @start;
  background: -moz-linear-gradient(top, @start 0%, @end 100%);
  background: -webkit-linear-gradient(top, @start 0%, @end 100%);
  background: -o-linear-gradient(top, @start 0%, @end 100%);
  background: -ms-linear-gradient(top, @start 0%, @end 100%);
  background: linear-gradient(top, @start 0%, @end 100%);
}

.max (@a, @b) when (@a > @b) {
  width: @a;
}
.max (@a, @b) when (@a < @b) {
  width: @b;
}

.min (@a, @b) when (@a > @b) {
  width: @b;
}
.min (@a, @b) when (@a < @b) {
  width: @a;
}
```

### 📕 Less 스타일시트 정리

기존 CSS에 프로그래밍 언어같은 기능들(변수, 내장 함수, 믹스인 등)을 통해 훨씬 간편하고 깔끔한 스타일시트를 만들 수 있게 해줍니다.<br/>
개인적으로 이 책을 읽고 공부하면서 가장 신기하게 공부한 내용이었습니다. 🤩

```toc

```
