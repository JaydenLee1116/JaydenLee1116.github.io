---
emoji: 📖
title: 모던 웹을 위한 HTML5+CSS3 바이블 - ch 12
date: '2022-07-29 23:22:00'
author: 제이든
tags: book html css web
categories: 책 HTML CSS WEB
---

## 🍎 들어가기에 앞서

이 글은 `모던 웹을 위한 HTML5+CSS3 바이블`을 공부하며 기억해둘 내용들을 간단하게 기록한 글입니다. <br/>
책에 대한 자세한 사항은 [링크](https://www.hanbit.co.kr/store/books/look.php?p_code=B8371709349)를 참고해주세요. 👏

## 📖 1. 그리드 시스템

그리드 시스템은 의미 그대로 마치 바둑판같은 격자를 만들어 그 격자를 조율하여 자리를 만들고 컨텐츠를 배치하는 방법입니다.

> 정적 그리드, 동적 그리드, 반응형 그리드 모두 float 속성을 그리드 레이아웃을 구성해왔습니다.<br/>
> 그러나 float 속성은 문서 내부에 이미지 등을 띄워 출력하기 위해 만들어진 속성입니다.<br/>
> 어쩌다보니 이를 레이아웃에 활용하게 되다보니 20년이 넘는 세월동안 사용하게 되었습니다. 🙃

### 그리드 레이아웃

위와 같은 이유로 CSS3에서 아예 레이아웃을 구성할 때 사용할 수 있는 display 키워드로 `flex`와 `grid`를 추가하였습니다.<br/>
그리드 레이아웃에 관해 간단한 동작들을 아래 코드와 함께 보도록 하겠습니다.

```html
<head>
  <style>
    .container {
      /* 🌟 grid 레이아웃을 적용합니다. */
      display: grid;
      /* 🌟 레이아웃의 열(세로)을 200px씩 3개로 나눕니다. */
      grid-template-columns: 200px 200px 200px;
      /* 🌟 레이아웃의 행(가로)을 2:1의 비율로 나눕니다. */
      grid-template-rows: 1fr 2fr 1fr;
      /* 🌟 행과 열 구분을 한번에 나타내는 표현법입니다.(위의 2개 줄을 한번에 표현) */
      grid-template: 1fr 2fr 1fr / 200px 200px 200px;
    }

    /* ⭐🌟🤩 여기까지 보면 총 3x3으로 총 9개의 격자가 만들어진 것을 알 수 있습니다.
    헌데, 아래 셀은 4개만 존재합니다. 다음과 같이 격자를 결합시켜 4개의 칸으로 만들도록 하겠습니다. */

    .ceall-a {
      grid-row-start: 1;
      grid-row-end: 4;
      /* grid-row: 1 / 4; 이렇게도 표현 가능 */
      grid-column-start: 1;
      grid-column-end: 3;
      /* grid-column: 1 / 3; 이렇게도 표현 가능 */

      /* 🌟 위의 모든 요소를 다음과 같이 한번에 표현도 가능합니다.
      grid-area: 1 / 1 / 4 / 3; 
      (grid-row-start/grid-column-start/grid-row-end/grid-column-end)
      */
    }

    /* 🌟 총 9개의 격자가 있을 때, 시작과 끝의 경계선을 포함해서 세로 가로 모두 4개씩의 경계선을 갖게 됩니다.
    이 때 각 경계선의 처음부터 끝까지 1~4의 번호를 갖게됩니다. 이 번호를 통해 위와 같이 스타일을 적용하면
    cell-a는 가로로는 3/4, 세로로는 전부 를 차지하는 모양을 갖게 되어 2*3의 영역을 차지합니다.
    그리고 나머지 한 칸씩의 총 3개의 칸을 b, c, d가 차지하게 됩니다. */
  </style>
</head>
<body>
  <div class="container">
    <div class="cell-a">cell-a</div>
    <div class="cell-b">cell-b</div>
    <div class="cell-c">cell-c</div>
    <div class="cell-d">cell-d</div>
  </div>
</body>
```

#### 문자열로 배치하기

grid-template-areas 속성과 grid-area 속성을 조합하면 문자열을 통해 그 배열을 마치 볼 수 있듯이 레이아웃을 구성할 수 있습니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS3 Grid System</title>
    <style>
      * {
        /* 기본 초기화 */
        margin: 0;
        padding: 0;
      }
      .container {
        /* 너비 고정 and 중앙 정렬*/
        width: 960px;
        margin: 0 auto;
        /* 그리드 구성하기 */
        display: grid;
        grid-template: 70px 1fr 70px / 200px 1fr;
        grid-gap: 5px;
        /* 🌟 서로 접하는 헤더 그리고 푸터는 그 둘이 합쳐지게 되어 셀 하나가 2개의 격자를 차지하게 됩니다. */
        grid-template-areas:
          'header header'
          'aside content'
          'footer footer';
      }
      [class*='cell'] {
        box-sizing: border-box;
        border: 5px solid black;
        padding: 10px;
        border-radius: 10px;
      }
      /* 🌟 다소 낯설지만, ''로 감싸지 않습니다. 마치 변수처럼 그대로 적어줍니다. */
      .cell-header {
        grid-area: header;
      }
      .cell-aside {
        grid-area: aside;
      }
      .cell-content {
        grid-area: content;
      }
      .cell-footer {
        grid-area: footer;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="cell-header">
        <h1>Lorem ipsum dolor sit amet</h1>
      </div>
      <div class="cell-aide">
        <p>Lorem ipsum</p>
        <p>dolor sit amet</p>
        <p>Lorem ipsum</p>
        <p>dolor sit amet</p>
      </div>
      <div class="cell-content">
        <h1>Lorem ipsum dolor sit amet</h1>
        <p>Lorem ipsum dolor sit amet</p>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div class="cell-footer">Lorem ipsum dolor sit amet</div>
    </div>
  </body>
</html>
```

### 📕 정리

그리드는 말 그대로 마치 바둑판 모양으로 격자를 형성하고 그 안에서 격자들을 자유자재로 결합하여 레이아웃을 구성하는 방법입니다.<br/>
이후 각 요소(컨텐츠)를 그 레이아웃에 적용시키게 됩니다.(마치 자리를 미리 다 만들고 그 안에 꾸겨넣는 느낌)<br/>

> 개인적으로 그리드에 대해서 정말 쉽고 재미있게 배울 수 있는 사이트라고 생각합니다.<br/> > [Grid Garden](https://cssgridgarden.com/#ko) 강추! 👍

```toc

```
