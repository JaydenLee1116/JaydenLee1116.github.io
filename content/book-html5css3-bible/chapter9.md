---
emoji: 📖
title: 모던 웹을 위한 HTML5+CSS3 바이블 - ch 9
date: '2022-07-25 19:48:00'
author: 제이든
tags: book html css web
categories: 책 HTML CSS WEB
---

## 🍎 들어가기에 앞서

이 글은 `모던 웹을 위한 HTML5+CSS3 바이블`을 공부하며 기억해둘 내용들을 간단하게 기록한 글입니다. <br/>
책에 대한 자세한 사항은 [링크](https://www.hanbit.co.kr/store/books/look.php?p_code=B8371709349)를 참고해주세요. 👏

## 📖 1. CSS3 변형과 애니메이션

> 코드를 쭉 나열하고 주석으로 도움되는 팁들(🌟로 표시해두겠습니다.)을 기록하려 합니다. 코드 원본은 [링크](https://www.hanbit.co.kr/support/supplement_list.html)에서 받으실 수 있습니다.

CSS 변형(transition)을 사용하면 화면에 애니메이션(animation)을 구현할 수 있습니다.<br/>
또한, CSS3 변형과 React, Vue.js와의 결합을 통해 더 다양한 애니메이션을 구성할 수 있습니다.

### 변형(transition) 속성

CSS3에서 움직임을 구현하는 방법에는 크게 transition(변형)과 animation(애니메이션) 속성으로 나누어집니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS3 Transition</title>
    <style>
      #graph {
        width: 610px;
        border: 3px solid black;
      }

      .bar {
        width: 10px;
        height: 50px;
        background-color: orange;
        margin: 5px;

        background-color: orange;

        /* 🌟 transition-duration: 변형이 진행되는 시간을 나타냅니다. */
        transition-duration: 5s;

        /*
        🌟 transition-property 와 transition-duration 사용법
        예시)
        transition-property: background-color, width;
        transition-duration: 11s, 16s;
        -> 변형을 적용할 속성을 정하고 각각의 속성에 변형 진행 시간을 정해줄 수 있습니다.
        */
      }

      #graph:hover > .bar {
        width: 600px;
      }

      .bar:nth-child(1) {
        /* 
        🌟 transition-delay: 이벤트(ex. hover)가 발생 후 몇 초 뒤에 변형이 시작될 것인지를 나타냅니다.
        */
        transition-delay: 0s;

        /* 
        🌟 transition-timing-function: 변형 진행 정도에 대한 시간의 함수입니다. 
        cubic-beizer(x0, y0, x1, y1)과 같이 사용자 지정 함수도 가능합니다.
        참고: http://cubic-bezier.com/
         */
        transition-timing-function: linear;
      }
      .bar:nth-child(2) {
        transition-delay: 1s;
        transition-timing-function: ease;
      }
      .bar:nth-child(3) {
        transition-delay: 2s;
        transition-timing-function: ease-in;
      }
      .bar:nth-child(4) {
        transition-delay: 3s;
        transition-timing-function: ease-in-out;
      }
      .bar:nth-child(5) {
        transition-delay: 4s;
        transition-timing-function: ease-out;
      }

      #graph:hover > .bar:nth-child(1) {
        background-color: red;
        width: 100px;
      }
      #graph:hover > .bar:nth-child(2) {
        background-color: blue;
        width: 300px;
      }
      #graph:hover > .bar:nth-child(3) {
        background-color: green;
        width: 400px;
      }
      #graph:hover > .bar:nth-child(4) {
        background-color: yellow;
        width: 200px;
      }
      #graph:hover > .bar:nth-child(5) {
        background-color: pink;
        width: 400px;
      }
    </style>
  </head>
  <body>
    <h1>CSS3 Transition Graph</h1>
    <div id="graph">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </body>
</html>
```

변형 속성을 한번에 나타내면 다음과 같이 적을 수 있습니다.

```css
div {
  /*
  🌟 property duration function delay 순서입니다.
  각각의 property에 다른 변형을 적용할 수 있습니다.
  */
  transition: background-color 5s ease 2s, width 10s linear 5s;
}
```

### 키 프레임과 애니메이션(animation) 속성

변형(transition)과 속성 및 키워드의 차이가 있을 뿐, 양식이 거의 비슷합니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS3 Animation</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        position: relative;
      }
      #box {
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 100px;
        text-align: center;
        background: linear-gradient(to bottom, #cb60b3, #db36a4);

        animation-name: jayden; /* 🌟 적용할 애니메이션 이름을 지정합니다. */
        animation-duration: 2s; /* 🌟 애니메이션의 지속 시간을 지정합니다. */
        animation-iteration-count: infinite; /* 🌟 애니메이션이 반복될 횟수를 정합니다. */

        animation-direction: alternate;
        /* 
        🌟 애니메이션의 진행방향으로 
        `alternate` - from에서 to로 진행 후 to에서 from으로 다시 진행합니다.
        `normal` - from에서 to로만 진행합니다.
        */

        animation-timing-function: linear;
        /* 
        🌟 애니메이션 진행 정도에 대한 시간의 함수입니다. 
        cubic-beizer(x0, y0, x1, y1)과 같이 사용자 지정 함수도 가능합니다.
        참고: http://cubic-bezier.com/
         */

        /*
        🌟 animation-play-state
        애니메이션의 플래이 상태를 지정하는 것으로 다음과 같이 사용할 수 있습니다.
        
        .box:hover {
          animation-play-state: paused;
        }

        즉, 마우스를 올리면 애니메이션이 정지(paused)가 됩니다.
        이외에도 inherit, initial, running, unset 등의 여러 키워드가 있습니다.(MDN 공식문서 참고)
        */
      }

      #box > h1 {
        line-height: 200px;
      }

      /*
      🌟 키 프레임 규칙(keyframes @-rule)이라고 부르며 CSS3에서 애니메이션을 지정하는 방식입니다.
      `@keyframes 이름` 형태로 입력합니다.
      또한, 키 프레임 안에서는 퍼센트 단위(시간 기준)로 애니메이션을 적용합니다.
      from은 시작(0%)이며 to는 끝(100%)를 나타냅니다.

      ex) duration이 10s일 때, 50%에 해당하는 건 5s입니다. 
      즉 50%에 해당하는 스타일로 애니메이션되는데 5s가 걸린다는 뜻입니다.
      */
      @keyframes jayden {
        from {
          left: 0;
          transform: rotate(0deg);
        }
        50% {
          left: 500px;
        }
        to {
          left: 500px;
          transform: rotate(360deg);
        }
      }
    </style>
  </head>
  <body>
    <div id="box">
      <h1>Rotation</h1>
    </div>
  </body>
</html>
```

애니메이션 속성을 한번에 나타내면 다음과 같이 적을 수 있습니다.

```css
div {
  /* 🌟 name duration function delay count direct 순서로 적습니다. */
  animation: jayden 2s linear 1s infinite alternate;
}
```

```toc

```
