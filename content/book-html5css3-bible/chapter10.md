---
emoji: 📖
title: 모던 웹을 위한 HTML5+CSS3 바이블 - ch 10
date: '2022-07-26 23:14:00'
author: 제이든
tags: book html css web
categories: 책 HTML CSS WEB
---

## 🍎 들어가기에 앞서

이 글은 `모던 웹을 위한 HTML5+CSS3 바이블`을 공부하며 기억해둘 내용들을 간단하게 기록한 글입니다. <br/>
책에 대한 자세한 사항은 [링크](https://www.hanbit.co.kr/store/books/look.php?p_code=B8371709349)를 참고해주세요. 👏

## 📖 1. CSS3 변환(transform)

### 변환이란?

HTML5가 등장하면서 플래시같은 플러그인 없이 웹 브라우저에 3차원을 구현할 수 있게 되었습니다.<br/>
그 방법은 2가지가 있습니다.

- 자바스크립트를 사용한 WebGL
- ✅ `CSS3를 사용한 3차원 변환`

### 2차원 변환

웹 브라우저를 바라보는 유저의 시선을 기준으로 `좌 -> 우` 방향이 X축, `위 -> 아래` 방향이 Y축입니다.<br/>
또한, `모니터 -> 유저` 방향으로 Z축을 추가하면 3차원 변환을 구현할 수 있습니다.(Z-index를 떠올리시면 됩니다.)

```css
div {
  width: 100px;
  height: 100px;
  background: red;

  transform: rotate(60deg) scale(1.2) skewY(10deg);
  /* 🌟 
  translate: 특정 크기만큼 이동
  scale: 특정 크기만큼 확대 및 축소(배율)
  skew: 특정 각도만큼 기울이기
  rotate: 특정 각도만큼 회전
  */

  /* 🌟
  transform-origin: 변환의 중심을 지정합니다.
  ex) transform-origin: 100% 100%; 
  X축과 Y축에 대해 100%이므로 객체의 가장 오른쪽 아래를 기준으로 합니다.
  */
}
```

🎖️ transform에 입력하는 키워드 순서에 따라서 같은 키워드들을 적어도 다른 결과물이 나올 수 있습니다. 즉, 순서에 따라 다른 변환이 구현되기도 합니다.

### 3차원 변환

- translate3d(`X`, `Y`, `Z`): 특정 크기만큼 이동합니다.
- scale3d(`X`, `Y`, `Z`): 특정 크기만큼 확대 및 축소합니다.
- rotate3d(`X`, `Y`, `Z`): 특정 각도만큼 회전합니다.
- transform-style: 변환을 적용할 때, 그 영향이 자신에게만 적용될지 자손에게도 적용될지 정합니다.

  1. `flat` : 후손의 3차원 속성을 무시합니다.
  2. `preserve-3d` : 후손의 3차원 속성을 유지합니다.

- backface-visibility: 3차원 공간에서 후면을 보이거나 보이지 않게 만드는 속성입니다.

  1. `visible` : 후면을 보이게 만듭니다.
  2. `hidden` : 후면을 보이지 않게 만듭니다.(🌑 마치 달의 뒷면을 볼 수 없듯이 🌕)

### 원근법

이 부분은 개인적으로 [공식문서](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)를 확인하는 게 바로 이해되는 것 같습니다.<br/>
숫자가 작을수록 유저 기준 `앞`에 있는 객체를 더 크게 `뒤`에 있는 객체를 작게 표현합니다.

```toc

```
