---
emoji: 📖
title: 모던 웹을 위한 HTML5+CSS3 바이블 - ch 4
date: '2022-07-22 20:43:00'
author: 제이든
tags: book html css web
categories: 책 HTML CSS WEB
---

## 🍎 들어가기에 앞서

이 글은 `모던 웹을 위한 HTML5+CSS3 바이블`을 공부하며 기억해둘 내용들을 간단하게 기록한 글입니다.
책에 대한 자세한 사항은 [링크](https://www.hanbit.co.kr/store/books/look.php?p_code=B8371709349)를 참고해주세요. 👏

## 📖 1. CSS3 스타일 속성 기본

### CSS3 단위

#### 크기 단위

em 단위는 배수를 나타내는 단위입니다. `1.5배 = 1.5em = 150%` 입니다.

```css
* {
  font-size: 12px;
}
h1 {
  font-size: 3em;
}
h2 {
  font-size: 1.5em;
}
/* 
전체에 대해서 `12px`,
h1에 대해서 3배인 `36px`,
h2는 1.5배인 `18px`이 적용됩니다.
*/
```

### 가시 속성

#### display 속성

`inline-block`은 마치 inline처럼 한줄로 배치되면서 동시에 block처럼 width, height, margin(상하좌우에 대해서 모두)을 갖습니다.<br/>
🌵 `inline`은 따로 width, height을 갖지 않고 margin에 대해서도 좌우로만 적용이 가능합니다.

```css
#box-frist {
  display: inline;
  background-color: red;
  width: 300px; /* 적용되지않음 */
  height: 50px; /* 적용되지않음 */
  margin: 10px; /* 좌우로만 적용 */
}

#box-second {
  display: inline-block;
  background-color: red;
  width: 300px;
  height: 50px;
  margin: 10px;
}
```

#### visibility 속성

`hidden`은 태그를 보이지 않게 만듭니다. 🚗 보이지 않게만 만들 뿐 그 자리에 존재합니다!(`display: none;`과는 다릅니다.)

```css
#box {
  visibility: hidden;
}
```

### 박스 속성

#### box-sizing 속성

width와 height 속성이 차지하는 범위를 지정합니다.

```css
div {
  margin: 10px;
  padding: 10px;
  width: 100px;
  height: 100px;
  border: 10px solid black;
}
div:first-child {
  background: red;
  box-sizing: content-box;
}
div:last-child {
  background: orange;
  box-sizing: border-box;
}
```

- `content-box` : content를 기준으로 width, height을 지정합니다. 즉, 태그가 차지하는 크기를 구하려면 padding, border, margin의 값을 2배로 더해주어야합니다.(양쪽이기때문)
- `border-box` : border를 기준으로 width, height을 지정합니다. 즉, 태그가 차지하는 크기를 구하려면 margin의 값만 2배로 더해주면 됩니다.(마찬가지로 양쪽이니까)

### 배경 속성

배경 속성은 아래와 같이 예제만 두고 따로 설명은 하지 않도록 하겠습니다.

```css
body {
  background-color: white;
  background-image: url('BackgroundFront.png'), url('BackgroundBack.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: bottom;
}
```

### 글자(폰트) 속성

#### line-height 속성

`line-height` 속성은 글자의 높이를 지정합니다. 사실상 글자의 높이를 지정하는 기능보다 글자를 `수직 중앙 정렬`할 때 사용합니다.

```css
.box {
  width: 150px;
  height: 70px; /* 글자를 감싸는 박스의 높이 */
  background-color: #ff6a00;
  border: 10px solid #ffffff;
  border-radius: 30px;
  box-shadow: 5px 5px 5px #a9a9a9;
}
.box > a {
  display: block;
  line-height: 70px; /* 글자를 감싸는 박스의 높이와 같은 값을 설정하면 수직으로 중앙 정렬됩니다. */
}
```

⭐ 추가로 span과 같은 inline 형식은 `너비`가 존재하지 않습니다. 따라서 `text-align: center;`와 같은 속성을 사용할 수 없습니다.(애초에 중앙이란 기준 자체가 없기 때문입니다.)

### 위치 속성

#### position 속성

- 절대 위치 좌표 : 요소의 X좌표와 Y좌표를 설정하여 절대적인 위치를 지정합니다.
  - absolute : 절대 위치 좌표를 설정합니다.
  - fixed : `화면`을 기준으로 절대 위치 좌표를 설정합니다.
- 상대 위치 좌표 : 요소를 입력한 순서를 통해 상대적인 위치를 지정합니다.
  - static : 태그가 위에서 아래로, 왼쪽에서 오른쪽으로 순서대로 배치됩니다.
  - relative : 초기 위치 상태(효과를 안주면 있을 위치)를 기준으로 상하좌우로 이동합니다.

🥕 단순히 생각해보면 절대 위치 좌표가 훨씬 사용하기 간단합니다.(그저 설계하듯 위치를 숫자로 지정해주면 되기 때문입니다.)<br/>
🍈 하지만 요즘엔 컴퓨터, 테블릿, 스마트폰 등등 다양한 해상도를 가진 디스플레이가 존재하므로 상대 위치 좌표가 훨씬 많이 사용됩니다.

#### z-index 속성

포토샵에서의 레이어 개념으로 생각하면 편합니다. 즉, 우리가 바라보는 시선에 대해 수직인(마치 종이를 포개듯이) 위치를 나타냅니다. 숫자가 클수록 더 위쪽(유저와 가까운 쪽)에 위치합니다.

#### 위치 속성과 관련된 속성

`1.자손의 position 속성에 absolute 키워드를 적용하면 부모는 height 속성을 사용합니다.`

- 부모 태그가 영역을 차지하게 하기 위함입니다.

`2. 자손의 position 속성에 absolute 키워드를 적용하면 부모의 position 속성에 relative 키워드를 적용합니다.`

- 부모 태그를 기준으로 자손 태그가 절대적인 위치를 갖게 하기 위함입니다.

#### overflow 속성

자손 혹은 후손 요소가 부모 요소의 범위를 벗어날 때 이를 처리하는 속성입니다.

- hidden : 영역을 벗어나는 부분을 보이지 않게 합니다.
- scroll : 영역을 벗어나는 부분을 스크롤하여 볼 수 있게 합니다.

> 부모 태그에 relative, 자손 태그에 absolute를 적용하여 자손 태그가 부모 태그의 범위를 벗어날 때 사용하게 됩니다.
> 원래의 목적과 다르게 float 속성과 함께 다른 용도로 사용되는 경우가 더 많습니다.

### float 속성

`부유`하는 대상을 만들 때 사용합니다. 웹 페이지를 만들 때 가장 많이 사용하는 스타일 속성입니다.

```css
img {
  float: left;
}
/* 태그를 왼쪽에 붙입니다. */
```

#### float 속성을 사용한 레이아웃 구성 1(One True Layout 방식)

`자손에 float 속성을 적용하면 부모의 overflow 속성에 hidden 키워드를 적용합니다.`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS3 Property Basic</title>
    <style>
      /* body 태그를 중앙 정렬합니다. */
      body {
        width: 960px;
        margin: 0 auto;
      }
      #aside {
        width: 200px;
        float: left;
      }

      #section {
        width: 760px;
        float: left;
      }

      #wrap {
        overflow: hidden; /* #footer부분이 맨아래 위치하게 하기위함입니다. */
      }
    </style>
  </head>
  <body>
    <div id="header"><h1>Header</h1></div>
    <div id="navigation"><h1>Navigation</h1></div>
    <div id="wrap">
      <div id="aside">
        <h1>Aside</h1>
        <p>안녕하세요.</p>
      </div>
      <div id="section">
        <h1>Section</h1>
        <p>반갑습니다.</p>
      </div>
    </div>
    <div id="footer"><h1>Footer</h1></div>
  </body>
</html>
```

#### float 속성을 사용한 레이아웃 구성 2(clear: both 이용)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS3 Property Basic</title>
    <style>
      body {
        width: 960px;
        margin: 0 auto;
      }
      .clear {
        clear: both;
      }
      #aside {
        float: left;
        width: 260px;
      }
      #section {
        float: right;
        width: 700px;
      }
    </style>
  </head>
  <body>
    <div id="header"><h1>Header</h1></div>
    <div id="navigation"><h1>Navigation</h1></div>
    <div class="clear"></div>
    <!-- 여기는 의미 없습니다. -->
    <div id="aside">
      <h1>Aside</h1>
      <p>안녕하세요.</p>
    </div>
    <div id="section">
      <h1>Section</h1>
      <p>반갑습니다.</p>
    </div>
    <div class="clear"></div>
    <!-- float으로 정렬된 #aide와 #section에 대해 그 아래부터는 부유하지 않게 레이아웃을 잡아줍니다. -->
    <div id="footer"><h1>Footer</h1></div>
    <div class="clear"></div>
    <!-- 여기는 의미 없습니다. -->
  </body>
</html>
```

### 벤더 프리픽스

속성들 중 간혹 `-moz`, `-webkit` 등이 앞에 붙는 경우가 있습니다. 이것이 벤더 프리픽스로 '공급 업체 접두사' 정도로 생각하시면 됩니다.<br/>
단순하게 생각하면 웹 브라우저 공급 업체(구글, 애플 마이크로소프트, 모질라 등등)가 실험적인 기능을 적용한 속성들입니다.

> 특히 `-webkit`이 자주 보이는데, 웹킷은 애플에서 개발하고 있는 레이아웃 엔진입니다. 이를 기반으로 사파리, 크롬, 오페라 등의 여러 웹 브라우저가 구현되었기 때문에 `-webkit` 벤더 프리픽스가 자주 보이는 것 입니다. 👍

```toc

```
