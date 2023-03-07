---
emoji: 🌱
title: 230307(화)
date: '2023-03-07 23:00:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 성장일지
---

## 🎄 성장일지 3.1

책 `행복한 이기주의자(웨인 다이어)`의 내용에 자극받아 시작하는 소박한 `성장기록`

> 살아있는 꽃과 죽은 꽃은 어떻게 구별하는가?<br/>
> 성장하고 있는 것이 살아 있는 것이다.<br/>
> 생명의 유일한 증거는 성장이다!

> 🌳 키워드 (1.0)<br/>
> 최대한 간단하게 정리, 추후에 보면서 스스로 설명<br/>
> 🍉 경험 위주로 (2.0)<br/>
> 단순 정보를 전달하기보다 무엇을 배웠고 어떻게 해결했는지 짧고 간단하게 작성<br/>
> ❄️ 정해진 템플릿에 맞춰서 (3.0)<br/>
> 키워드, 경험 모두 좋다. 다만 매일 작성하기로 마음 먹은만큼 핵심만 간결하게 정리할 수 있게 템플릿을 작성
> (3.1) 230102부터 시작되는 학습에 관한 내용 추가

## 🔑 오늘의 키워드

### css에서 변수를 만들어서 사용하기
  
- 아래와 같이 `:root` 에 변수를 설정해준다.
- 설정한 변수를 `var(변수명)`형태로 사용한다.

```css
/* Global */

:root {
  /* Color */
  --color-white: #ffffff;
  --color-gray-100: #eff2f2;
  --color-gray-200: #e5e9e9;
  --color-gray-300: #dce0e0;
  --color-gray-400: #d5d5d5;
  --color-gray-500: #c1c1c1;
  --color-gray-600: #878787;
  --color-gray-700: #535353;
  --color-gray-800: #2a3648;
  --color-gray-900: #1b232f;
  --color-black: #10141a;
  --color-black-tr40: rgba(16, 20, 26, 0.4);

  --color-yellow-100: #fed15f;
  --color-yellow-200: #febe30;
  --color-yellow-300: #de9408;
  --color-orange-100: #fcb057;
  --color-orange-200: #ff9900;

  --color-purple: #941387;
  --color-navy: #074099;
  --color-green: #0c5e72;

  /* Font size */
  --font-large: 48px;
  --font-medium: 28px;
  --font-regular: 18px;
  --font-small: 16px;
  --font-micro: 14px;
}

div {
  color: var(--color-orange-100);
}
```
### box-sizing 설정
  
- 기본적으로 `content-box`로 설정되어있다.
  - content-box: width, height가 padding 내부의 content를 기준으로 한다.
  - border-box: width, height가 content, padding, border를 포함한 것을 기준으로 한다.

### `reset css` vs `normalize css`

- reset css: 브라우저가 기본적으로 제공하는 내장 스타일을 모두 초기화
  - 최근에는 [new css reset](https://elad2412.github.io/the-new-css-reset/)이 자주 사용된다.
- normalize css: 가능한 브라우저들의 내장 스타일을 건드리지 않는 선에서 브라우저들 간의 차이점을 통일
  - 같은 `h1` 태그라도 브라우저마다 여백의 크기가 조금씩 다를 수 있다. 이런 부분을 동일하게 통일해준다.

### css 상속(inheritance)과 적용 우선 순위(cascading)

- 상속: 상위(부모) 태그에 적용된 스타일이 하위(자식) 태그에도 상속되어 적용되는 것
  - 몇몇 상속이 안되는 스타일이 있는데, 주로 box-model과 관련된 스타일이다. ex) padding
- 적용 우선 순위: css는 어떻게 스타일을 적용하느냐에 따라 그 우선순위가 다르다.
  - 우선순위로는 `사용자 설정` - `inline style` - `internal stylesheet` - `external stylesheet` - `browser default`로 점점 낮아진다.
  - 또한, css의 `specificity`에 따라 `class`보다 `id`가 스타일에 대한 우선순위를 갖는다.(더욱 자세한 선택자일수록 우선순위를 갖는다.)
  - (주의) css의 상속과 캐스케이딩은 엄밀히 다른 개념!!!

### `display: flex`에서 `flex-grow` 속성이란?

- display가 flex로 설정된 태그의 자식 태그들에 사용하며, 각 자식 태그들은 기본적으로 `flex-grow: 0;`이다.
- 더 높은 숫자를 설정하게 되 다른 태그들과의 사이에서 해당 숫자의 크기 비율을 갖는다.

## 참고

- [Box-model: content-box vs border-box](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
- [reset css과 normalize css](https://www.daleseo.com/css-normalize-reset/)
- [css 상속(inheritance)과 적용 우선 순위(cascading)](https://poiemaweb.com/css3-inheritance-cascading)

## 📝 요약 및 하루 간단 회고

오랜만에 html, css를 하려니 생각보다 쉽지가 않다.ㅠㅠ 그래도 좋은 점은 그동안 공부한 것들 덕분에 보이는 게 많은 것..? 이전에 단순하게 html, css를 구성한 것과 다르게
지금은 좀더 의미있는 고민을 하면서 구조를 짤 수 있게 된 것 같다. 쉽지는 않지만, 보면 볼수록 html과 css 만으로도 참 매력적인 페이지를 만들 수 있는 게 신기하다.

## 오늘의 잘한 점

- 내가 계획한 목표치만큼 공부한 점
- 과정 외의 공부도 진행한 점
- 퇴근 후에도 동료(Den)와 함께 샌드위치 먹고 공부한 점

## 오늘의 아쉬운 점

- 열심히 여행 다녀오느라 아픈 나의 무릎... 얼른 나아라!!!

```toc

```
