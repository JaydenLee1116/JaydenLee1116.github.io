---
emoji: 📖
title: 모던 웹을 위한 HTML5+CSS3 바이블 - 부록 A
date: '2022-07-28 19:42:00'
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

### 설정

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
       id="navbar-content"인 태그를 버트은 통해 열고 닫을 대상으로 지정합니다. -->
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

## 📕 정리

부트스트랩은 웹 페이지 디자인 프레임워크로 간편하게 웹 페이지를 만들기 좋습니다. 다만, 그만큼 다소 무겁고 정형화된 페이지를 만들어낸다는 단점도 있습니다.<br/>
부트스트랩은 그 내용을 하나하나 외우고 하기보단 [부트스트랩 공식문서](https://getbootstrap.com/docs/5.2/getting-started/introduction/)를 보면서 필요한 기능들을
구현하는 게 좋습니다.

```toc

```
