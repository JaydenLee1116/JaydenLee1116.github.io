---
emoji: 📖
title: 모던 웹을 위한 HTML5+CSS3 바이블 - ch 7
date: '2022-07-24 00:13:00'
author: 제이든
tags: book html css web
categories: 책 HTML CSS WEB
---

## 🍎 들어가기에 앞서

이 글은 `모던 웹을 위한 HTML5+CSS3 바이블`을 공부하며 기억해둘 내용들을 간단하게 기록한 글입니다. <br/>
책에 대한 자세한 사항은 [링크](https://www.hanbit.co.kr/store/books/look.php?p_code=B8371709349)를 참고해주세요. 👏

## 📖 1. 태블릿PC 레이아웃(동적 너비 레이아웃)

> 코드를 쭉 나열하고 주석으로 도움되는 팁들(🌟로 표시해두겠습니다.)을 기록하려 합니다. 코드 원본은 [링크](https://www.hanbit.co.kr/support/supplement_list.html)에서 받으실 수 있습니다.

기존에 width와 margin을 이용하여 중앙 정렬하던 것과 다르게 화면의 너비에 따라 레이아웃이 동적으로 바뀌는 형태입니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Chapter 7</title>
    <!-- 🌟 태블릿PC도 마찬가지로 뷰포트 meta 태그가 필요합니다.  -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        height: 60px;
        line-height: 60px;
        padding-left: 10px;
        border-bottom: 1px solid black;

        background: #1d4088;
        color: white;
      }
    </style>
    <!-- 네비게이션 -->
    <style>
      #main_gnb {
        overflow: hidden;
        border-bottom: 1px solid black;
        background: #32394a;
      }
      #main_gnb > ul.left {
        overflow: hidden;
        float: left;
      }
      #main_gnb > ul.right {
        overflow: hidden;
        float: right;
      }
      #main_gnb > ul.left > li {
        float: left;
      }
      #main_gnb > ul.right > li {
        float: left;
      }

      /* a 태그 설정 */
      #main_gnb a {
        /* 레이아웃 설정 */
        display: block;
        padding: 10px 20px;

        /* 색상 설정 */
        border-left: 1px solid #5f6673;
        border-right: 1px solid #242a37;
        color: white;
        font-weight: bold;
      }
      /* 🌟 너비의 최소값이 760px로 지정해줍니다. 
      즉, 너비가 760px아래로 내려가지 않습니다. */
      body {
        min-width: 760px;
      }
    </style>
    <!-- 콘텐츠 -->
    <style>
      /* 🌟 왼쪽에 위치한 #main_lnb의 너비가 200px이고 오른쪽에 위치한 #content_wrap의 너비가 100%입니다.
      즉, 둘이 합치면 너비가 100%를 넘어가게 되어 레이아웃이 깨지게 됩니다.
      이 때, #content_wrap에 margin-right: -200px;를 통해 오른쪽으로 당기고(양수일 땐 '왼쪽으로 미는 느낌'의 반대라 생각하시면 편합니다.)
      당긴 후 그 안의 #content에 padding-right: 200px;하여 왼쪽으로 밀어줍니다.
      이렇게 하면 너비를 변경해도 너비가 동적으로 늘어나 레이아웃 형태를 유지합니다. */
      #wrap {
        overflow: hidden;
      }
      #wrap > #main_lnb {
        float: left;
        width: 200px;
      }
      #wrap > #content_wrap {
        float: left;
        width: 100%;
        *width: 99.9%;
        margin-right: -200px;
      }
      #wrap > #content_wrap > #content {
        padding-right: 200px;
      }
    </style>
    <!-- 수직 목록 -->
    <style>
      #wrap {
        background: #71b1d1;
      }
      #main_lnb > ul > li > a {
        display: block;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;

        border-top: 1px solid #96d6f6;
        border-bottom: 1px solid #6298b2;
        color: white;
        font-weight: bold;
      }
    </style>
    <!-- 본문 -->
    <style>
      #content {
        background: white;
        border-left: 1px solid black;
      }
      article {
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
    <header id="main_header">
      <h1>Fluid</h1>
    </header>
    <nav id="main_gnb">
      <ul class="left">
        <li><a href="#">Button</a></li>
        <li><a href="#">Button</a></li>
        <li><a href="#">Button</a></li>
        <li><a href="#">Button</a></li>
        <li><a href="#">Button</a></li>
        <li><a href="#">Button</a></li>
      </ul>
      <ul class="right">
        <li><a href="#">Button</a></li>
        <li><a href="#">Button</a></li>
      </ul>
    </nav>
    <div id="wrap">
      <nav id="main_lnb">
        <ul>
          <li><a href="#">Button</a></li>
          <li><a href="#">Button</a></li>
          <li><a href="#">Button</a></li>
          <li><a href="#">Button</a></li>
          <li><a href="#">Button</a></li>
        </ul>
      </nav>
      <div id="content_wrap">
        <div id="content">
          <article>
            <h1>Lorem ipsum dolor sit amet</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus hendrerit mi, at
              pretium purus convallis non. Integer semper magna ac mauris hendrerit iaculis ac
              faucibus turpis. Praesent pharetra sem et nibh auctor auctor adipiscing augue rutrum.
              Ut sapien quam, bibendum eget malesuada non, porta sed ligula. Donec interdum suscipit
              mattis. Praesent dictum odio non nisi pharetra pellentesque. Phasellus nec quam sit
              amet nunc ullamcorper pulvinar nec quis tellus. Pellentesque consectetur tellus ac
              augue tincidunt luctus. Aenean consectetur, justo vel vestibulum cursus, risus arcu
              ornare dolor, nec elementum diam erat ac tortor. Morbi eleifend, erat sit amet posuere
              pretium, purus dui ullamcorper urna, eu rutrum mi augue tristique odio. Proin commodo
              mi non nibh interdum ultricies. Donec vitae leo quis ante vestibulum accumsan ut sed
              nulla. Maecenas ligula orci, fringilla ac elementum eget, congue quis dolor. Cras
              sagittis rhoncus faucibus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus hendrerit mi, at
              pretium purus convallis non. Integer semper magna ac mauris hendrerit iaculis ac
              faucibus turpis. Praesent pharetra sem et nibh auctor auctor adipiscing augue rutrum.
              Ut sapien quam, bibendum eget malesuada non, porta sed ligula. Donec interdum suscipit
              mattis. Praesent dictum odio non nisi pharetra pellentesque. Phasellus nec quam sit
              amet nunc ullamcorper pulvinar nec quis tellus. Pellentesque consectetur tellus ac
              augue tincidunt luctus. Aenean consectetur, justo vel vestibulum cursus, risus arcu
              ornare dolor, nec elementum diam erat ac tortor. Morbi eleifend, erat sit amet posuere
              pretium, purus dui ullamcorper urna, eu rutrum mi augue tristique odio. Proin commodo
              mi non nibh interdum ultricies. Donec vitae leo quis ante vestibulum accumsan ut sed
              nulla. Maecenas ligula orci, fringilla ac elementum eget, congue quis dolor. Cras
              sagittis rhoncus faucibus.
            </p>
          </article>
          <article>
            <h1>Lorem ipsum dolor sit amet</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus hendrerit mi, at
              pretium purus convallis non. Integer semper magna ac mauris hendrerit iaculis ac
              faucibus turpis. Praesent pharetra sem et nibh auctor auctor adipiscing augue rutrum.
              Ut sapien quam, bibendum eget malesuada non, porta sed ligula. Donec interdum suscipit
              mattis. Praesent dictum odio non nisi pharetra pellentesque. Phasellus nec quam sit
              amet nunc ullamcorper pulvinar nec quis tellus. Pellentesque consectetur tellus ac
              augue tincidunt luctus. Aenean consectetur, justo vel vestibulum cursus, risus arcu
              ornare dolor, nec elementum diam erat ac tortor. Morbi eleifend, erat sit amet posuere
              pretium, purus dui ullamcorper urna, eu rutrum mi augue tristique odio. Proin commodo
              mi non nibh interdum ultricies. Donec vitae leo quis ante vestibulum accumsan ut sed
              nulla. Maecenas ligula orci, fringilla ac elementum eget, congue quis dolor. Cras
              sagittis rhoncus faucibus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus hendrerit mi, at
              pretium purus convallis non. Integer semper magna ac mauris hendrerit iaculis ac
              faucibus turpis. Praesent pharetra sem et nibh auctor auctor adipiscing augue rutrum.
              Ut sapien quam, bibendum eget malesuada non, porta sed ligula. Donec interdum suscipit
              mattis. Praesent dictum odio non nisi pharetra pellentesque. Phasellus nec quam sit
              amet nunc ullamcorper pulvinar nec quis tellus. Pellentesque consectetur tellus ac
              augue tincidunt luctus. Aenean consectetur, justo vel vestibulum cursus, risus arcu
              ornare dolor, nec elementum diam erat ac tortor. Morbi eleifend, erat sit amet posuere
              pretium, purus dui ullamcorper urna, eu rutrum mi augue tristique odio. Proin commodo
              mi non nibh interdum ultricies. Donec vitae leo quis ante vestibulum accumsan ut sed
              nulla. Maecenas ligula orci, fringilla ac elementum eget, congue quis dolor. Cras
              sagittis rhoncus faucibus.
            </p>
          </article>
          <article>
            <h1>Lorem ipsum dolor sit amet</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus hendrerit mi, at
              pretium purus convallis non. Integer semper magna ac mauris hendrerit iaculis ac
              faucibus turpis. Praesent pharetra sem et nibh auctor auctor adipiscing augue rutrum.
              Ut sapien quam, bibendum eget malesuada non, porta sed ligula. Donec interdum suscipit
              mattis. Praesent dictum odio non nisi pharetra pellentesque. Phasellus nec quam sit
              amet nunc ullamcorper pulvinar nec quis tellus. Pellentesque consectetur tellus ac
              augue tincidunt luctus. Aenean consectetur, justo vel vestibulum cursus, risus arcu
              ornare dolor, nec elementum diam erat ac tortor. Morbi eleifend, erat sit amet posuere
              pretium, purus dui ullamcorper urna, eu rutrum mi augue tristique odio. Proin commodo
              mi non nibh interdum ultricies. Donec vitae leo quis ante vestibulum accumsan ut sed
              nulla. Maecenas ligula orci, fringilla ac elementum eget, congue quis dolor. Cras
              sagittis rhoncus faucibus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus hendrerit mi, at
              pretium purus convallis non. Integer semper magna ac mauris hendrerit iaculis ac
              faucibus turpis. Praesent pharetra sem et nibh auctor auctor adipiscing augue rutrum.
              Ut sapien quam, bibendum eget malesuada non, porta sed ligula. Donec interdum suscipit
              mattis. Praesent dictum odio non nisi pharetra pellentesque. Phasellus nec quam sit
              amet nunc ullamcorper pulvinar nec quis tellus. Pellentesque consectetur tellus ac
              augue tincidunt luctus. Aenean consectetur, justo vel vestibulum cursus, risus arcu
              ornare dolor, nec elementum diam erat ac tortor. Morbi eleifend, erat sit amet posuere
              pretium, purus dui ullamcorper urna, eu rutrum mi augue tristique odio. Proin commodo
              mi non nibh interdum ultricies. Donec vitae leo quis ante vestibulum accumsan ut sed
              nulla. Maecenas ligula orci, fringilla ac elementum eget, congue quis dolor. Cras
              sagittis rhoncus faucibus.
            </p>
          </article>
        </div>
      </div>
    </div>
    <footer id="main_footer">
      <h3>HTML5 + CSS3 Basic</h3>
      <address>Website Layout Basic</address>
    </footer>
  </body>
</html>
```

## 📕 정리

### 중요한 내용

- 동적으로 너비가 변하는 레이아웃 형태

```toc

```
