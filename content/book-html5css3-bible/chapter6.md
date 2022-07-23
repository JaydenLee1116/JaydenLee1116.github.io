---
emoji: 📖
title: 모던 웹을 위한 HTML5+CSS3 바이블 - ch 6
date: '2022-07-23 23:10:00'
author: 제이든
tags: book html css web
categories: 책 HTML CSS WEB
---

## 🍎 들어가기에 앞서

이 글은 `모던 웹을 위한 HTML5+CSS3 바이블`을 공부하며 기억해둘 내용들을 간단하게 기록한 글입니다. <br/>
책에 대한 자세한 사항은 [링크](https://www.hanbit.co.kr/store/books/look.php?p_code=B8371709349)를 참고해주세요. 👏

## 📖 1. 스마트폰 레이아웃

레이아웃 관련 챕터의 경우 코드를 쭉 나열하고 주석으로 도움되는 팁들(🌟로 표시해두겠습니다.)을 기록하려 합니다. <br/>
코드 원본은 [링크](https://www.hanbit.co.kr/support/supplement_list.html)에서 받으실 수 있습니다.
<br/>
<br/>
최근에는 HTML, CSS, Javascript를 활용해 네이티브 애플리케이션을 만드는 `React Native`, `Vue Native`등의 기술이 활성화되었습니다.<br/>
이와 같은 방법으로 애플리케이션을 만들면, 아이폰 및 안드로이드 등의 애플리케이션을 따로 개발할 필요가 없이 모든 OS에서 실행할 수 있다는 장점이 있습니다. 👍

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Chapter 6</title>
    <!-- 🌟 뷰포트: 모바일 웹 페이지는 화면에 대한 특별한 정보를 제공하기 위해 뷰포트 meta 태그를 사용합니다.
    브라우저의 화면 설정과 관련된 정보를 제공합니다.
    ----
      initial-scale: 초기 확대 비율
      user-scalable: 확대 및 축소 가능 여부
      minimum-scale: 최소 축소 비율
      maximum-scale: 최대 확대 비율
    ----
    -->

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no"
    />
    <!-- 초기화 -->
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        font-family: 'Helvetica', sans-serif;
      }
      li {
        list-style: none;
      }
      a {
        text-decoration: none;
      }
    </style>
    <!-- 헤더 -->
    <style>
      #main_header {
        /* 배경 지정 */
        height: 45px;
        background: url('header_background.png');

        /* 자손 위치 지정 */
        position: relative;
        text-align: center;
        line-height: 45px;
      }
      #main_header > h1 {
        color: white;
      }
      #main_header > a,
      #main_header > label {
        display: block;
        height: 32px;
        position: absolute;
      }
      #main_header > a.left {
        width: 62px;
        left: 5px;
        top: 7px;
      }
      #main_header > label.right {
        width: 32px;
        right: 5px;
        top: 7px;
      }
    </style>
    <!-- 🌟 스프라이트 이미지: 이미지를 여러 개 뭉쳐놓은 것을 의미합니다. 이렇게 여러개의 이미지를 1개의 이미지로 뭉쳐서 사용하면 
    웹 페이지 요청 시간을 줄이고 쉽게 관리할 수 있습니다.
    스프라이트 이미지 만들기: https://www.toptal.com/developers/css/sprite-generator/ -->
    <style>
      #main_header > a.left {
        background: url('sprites.png');
        background-position: 0px 0px;
        text-indent: -99999px;
        /* 🌟 텍스트를 들여쓰기, 내어쓰기하는 용도로, 여기서는 태그 내부 글자를 안보이게 하려 아주 왼쪽 끝으로 보내버린 것입니다.
        글자를 입력하지 않아도 되긴 하지만, 그 자리가 어떠한 용도인지 알기 쉽게 이렇게 사용하기도 합니다. */
      }
      #main_header > label.right {
        background: url('sprites.png');
        background-position: -62px 0px;
        text-indent: -99999px;
      }
    </style>
    <!-- 토글 목록 -->
    <style>
      /* 토글 구현 */
      #toggle {
        display: none;
      }
      #toggle + #wrap > #toggle_gnb_wrap {
        display: none;
      }
      #toggle:checked + #wrap > #toggle_gnb_wrap {
        display: block;
      }

      /* 레이아웃 색상 */
      #toggle_gnb_wrap {
        background: #363636;
        padding: 15px;
      }
      #toggle_gnb {
        background: #ffffff;
        padding: 5px;
      }

      /* 토글 목록 */
      #toggle_gnb > ul {
        overflow: hidden;
      }
      #toggle_gnb > ul > li {
        width: 80px;
        float: left;
      }
    </style>
    <!-- 🌟 네비게이션(1): overflow와 float을 사용하여 nav를 만드는 방법입니다. -->
    <style>
      #top_gnb {
        overflow: hidden;
        border-bottom: 1px solid black;
        background: #b42111;
      }
      #top_gnb > div > a {
        /* 수평 정렬 */
        float: left;
        width: 25%;

        /* 크기 및 색상, 정렬 */
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: white;
      }
    </style>
    <!-- 🌟 네비게이션(2): display에 table 키워드를 사용하여 nav를 만드는 방법입니다. -->
    <style>
      #bottom_gnb {
        display: table;
        width: 100%;
        border-bottom: 1px solid black;
      }
      #bottom_gnb > div {
        display: table-cell;
        position: relative;
      }
      #bottom_gnb > div > a {
        display: block;
        height: 35px;
        line-height: 35px;
        text-align: center;
      }
      /* 🌟 ::before를 사용하여 각 요소 앞(이전)에 검은색 수직선을 만듭니다. */
      #bottom_gnb > div > a::before {
        display: block;
        position: absolute;
        top: 9px;
        left: -1px;
        width: 1px;
        height: 15px;
        border-left: 1px solid black;
        content: '';
      }
    </style>
    <!-- 본문 -->
    <style>
      #section_header {
        padding: 20px;
      }
      #section_article {
        padding: 10px;
      }
    </style>
    <!-- 푸터 -->
    <style>
      #main_footer {
        padding: 10px;
        border-top: 3px solid black;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <input id="toggle" type="checkbox" />
    <!-- 🌟 body 자체에 스타일을 적용하는 것이 위험할 수도 있다고 생각하는 개발자들이 #wrap인 div를 따로 만들기도 합니다.
    물론 반드시 이런 경우가 아니더라도 특별한 경우에 사용하기도 합니다.
    여기서는 일부 스마트폰 웹 브라우저는 ~ 선택자 사용이 불가능하기에 사용하였습니다. -->
    <div id="wrap">
      <header id="main_header">
        <a class="left" href="#">Main</a>
        <h1>Mobile</h1>
        <label class="right" for="toggle" onclick="">Toggle</label>
      </header>
      <div id="toggle_gnb_wrap">
        <div id="toggle_gnb">
          <ul>
            <li><a href="#">버튼</a></li>
            <li><a href="#">버튼</a></li>
            <li><a href="#">버튼</a></li>
            <li><a href="#">버튼</a></li>
            <li><a href="#">버튼</a></li>
            <li><a href="#">버튼</a></li>
            <li><a href="#">버튼</a></li>
            <li><a href="#">버튼</a></li>
          </ul>
        </div>
      </div>
      <nav id="top_gnb">
        <div><a href="#">버튼</a></div>
        <div><a href="#">버튼</a></div>
        <div><a href="#">버튼</a></div>
        <div><a href="#">버튼</a></div>
      </nav>
      <nav id="bottom_gnb">
        <div><a href="#">버튼</a></div>
        <div><a href="#">버튼</a></div>
        <div><a href="#">버튼</a></div>
        <div><a href="#">버튼</a></div>
        <div><a href="#">버튼</a></div>
      </nav>
      <section id="main_section">
        <header id="section_header">
          <h1>Lorem ipsum</h1>
          <time>2012-12-09 - Birthday</time>
        </header>
        <article id="section_article">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in magna libero. Sed
            nec pharetra nunc. Proin eget magna id ipsum eleifend cursus sit amet nec lectus. Nunc
            quis lacus magna. Aliquam blandit, sapien ut viverra fermentum, elit tortor ornare nisi,
            in luctus sem massa pulvinar turpis. Cras tincidunt dictum urna ut ultricies. Nullam
            diam nibh, pellentesque non laoreet ut, bibendum nec mauris. Maecenas pulvinar porttitor
            laoreet. Vivamus bibendum purus nisl, eget aliquam lectus. Maecenas justo libero,
            euismod sit amet suscipit eu, vulputate eget neque. Aliquam quam est, blandit nec
            iaculis non, suscipit vel nunc. Proin et odio aliquam erat pharetra accumsan et quis
            neque. Vivamus interdum accumsan leo eu adipiscing. Integer accumsan elit non turpis
            faucibus porttitor. Aliquam scelerisque nisi et turpis pretium at ultricies turpis
            pharetra.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in magna libero. Sed
            nec pharetra nunc. Proin eget magna id ipsum eleifend cursus sit amet nec lectus. Nunc
            quis lacus magna. Aliquam blandit, sapien ut viverra fermentum, elit tortor ornare nisi,
            in luctus sem massa pulvinar turpis. Cras tincidunt dictum urna ut ultricies. Nullam
            diam nibh, pellentesque non laoreet ut, bibendum nec mauris. Maecenas pulvinar porttitor
            laoreet. Vivamus bibendum purus nisl, eget aliquam lectus. Maecenas justo libero,
            euismod sit amet suscipit eu, vulputate eget neque. Aliquam quam est, blandit nec
            iaculis non, suscipit vel nunc. Proin et odio aliquam erat pharetra accumsan et quis
            neque. Vivamus interdum accumsan leo eu adipiscing. Integer accumsan elit non turpis
            faucibus porttitor. Aliquam scelerisque nisi et turpis pretium at ultricies turpis
            pharetra.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in magna libero. Sed
            nec pharetra nunc. Proin eget magna id ipsum eleifend cursus sit amet nec lectus. Nunc
            quis lacus magna. Aliquam blandit, sapien ut viverra fermentum, elit tortor ornare nisi,
            in luctus sem massa pulvinar turpis. Cras tincidunt dictum urna ut ultricies. Nullam
            diam nibh, pellentesque non laoreet ut, bibendum nec mauris. Maecenas pulvinar porttitor
            laoreet. Vivamus bibendum purus nisl, eget aliquam lectus. Maecenas justo libero,
            euismod sit amet suscipit eu, vulputate eget neque. Aliquam quam est, blandit nec
            iaculis non, suscipit vel nunc. Proin et odio aliquam erat pharetra accumsan et quis
            neque. Vivamus interdum accumsan leo eu adipiscing. Integer accumsan elit non turpis
            faucibus porttitor. Aliquam scelerisque nisi et turpis pretium at ultricies turpis
            pharetra.
          </p>
        </article>
      </section>
      <footer id="main_footer">
        <h3>HTML5 + CSS3 Basic</h3>
        <address>Website Layout Basic</address>
      </footer>
    </div>
  </body>
</html>
```

## 📕 정리

- 뷰포트 meta 태그
- 스프라이트 이미지
- nav 만드는 방법
  1. overflow와 float 속성 활용
  2. display 속성과 table 키워드 활용
- ::before 선택자를 사용하여 수직선 생성하기

### ➕ 글자 감추기 : Ellipsis(생략)하는 기술

화면이 작은 기계에서는 글자가 잘릴 수 있습니다.<br/>
이 때 잘린 부분을 `'...'`으로 대체하여 레이아웃이 깨지지 않도록 해주는 방법입니다.<br/>
block 형식의 태그에 아래와 같이 스타일링을 지정하여 사용합니다.(주로 h1같은 제목 태그에 사용합니다.)

```css
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

```toc

```
