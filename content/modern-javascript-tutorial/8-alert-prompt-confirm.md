---
emoji: 🍊
title: alert, prompt, confirm(feat. modal)
date: '2022-08-03 20:12:00'
author: 제이든
tags: js alert prompt confirm
categories: JAVASCRIPT
---

# 🍍 들어가기에 앞서

이 글은 [모던 JavaScript 튜토리얼](https://ko.javascript.info/)을 공부하며 기억해둘 내용들을 기록 및 추가 정리한 글입니다.<br/>

## 📚 상호작용

브라우저에서 사용자와 최소한의 상호작용을 하는 3가지 인터페이스 기능이 있습니다.<br/>
`alert`, `prompt`, `confirm`이 그 주인공입니다. 😀

### alert

실행 시 사용자가 `확인(ok)`를 누를 때까지 메시지를 보여주는 창이 등장합니다.

```js
alert('Hello World! Hello Jayden!');
```

> 이 때, 메시지가 있는 작은 창을 `모달 창(modal window)`라고 합니다.<br/> > `모달`은 해당 페이지 외에는 상호 작용이 불가능하다는 의미가 내포되어있으므로 모달 창을 해결하기 전까진 바깥에 있는 페이지를 누를 수 없습니다.<br/>
> 모달 창이 떠 있는 동안에는 `스크립트의 실행이 일시 중단`됩니다.

### prompt

실행 시 전달한 메시지와 입력 필드, 확인(ok) 및 취소(cancel) 버튼으로 구성된 모달 창이 등장합니다.

```js
let name = prompt('당신의 이름은 무엇입니까?', [default]);
```

> 여기서 default에는 띄워지는 모달 창의 입력값에 기본으로 넣을 값을 의미하며, []로 대괄호 처리가 되어있는 이유는 필수 인자가 아닌 선택 인자이기 때문입니다.<br/>
> 사용자가 값을 입력하고 확인(ok)를 누르면 그 값을 반환하여 변수에 저장할 수도 있습니다. 단, 취소(cancel)을 클릭 시 `null`이 반환됩니다.

### confirm

실행 시 전달한 메시지와 확인(ok) 및 취소(cancel) 버튼만 있는 모달 창이 등장합니다.

```js
let isRed = confirm('붉은 색깔인가요?');
```

> 확인(ok)를 누르면 `true`, 취소(cancel)을 누르면 `false`가 반환됩니다.

#### 예시

prompt를 통해 입력값을 변수로 받고 그 변수를 활용할 수 있습니다.

```js
let name = prompt('너의 이름은?');
alert(`당신의 이름은 ${name}입니다. 📛`);
```

```toc

```
