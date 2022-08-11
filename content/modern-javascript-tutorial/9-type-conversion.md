---
emoji: 🍊
title: 형 변환(type conversion)
date: '2022-08-11 19:01:00'
author: 제이든
tags: js data type conversion
categories: JAVASCRIPT
---

# 🍍 들어가기에 앞서

이 글은 [모던 JavaScript 튜토리얼](https://ko.javascript.info/)을 공부하며 기억해둘 내용들을 기록 및 추가 정리한 글입니다.<br/>

## 📚 형 변환

말 그대로 자료의 타입이 바뀌는 것을 의미합니다. 자바스크립트에선 함수와 연산자에 전달되는 값은 그에 맞게 적절한 자료형으로 자동 변환됩니다.

### 문자형으로 변환

```js
let value = 111;
value = String(value); // '111'
```

### 숫자형으로 변환

문자열의 처음과 끝 공백을 제거 후, 남아있는 문자열에 대해서 값이 없다면('') `0`, 그렇지 않다면 문자열 내에 숫자만 있다면 `숫자`, 문자형이 있다면 `NaN`을 반환합니다.

```js
// 1. 수학과 관련한 함수 및 표현식에서 자동으로 변환
'6' / '2'; // 3

// 2. Number() 함수
let value = '123';
value = Number(value); // 123

let str = '123회';
str = Number(str); // NaN

// 3. 특이한 칭구들
Number(undefined); // NaN
Number(null); // 0 🙄
```

### 불린형으로 변환

```js
// false로 변환되는 경우만 알고 있으면 됩니다.('비어있다고 느껴지는 값들')
Boolean(0);
Boolean(null);
Boolean(undefined);
Boolean(NaN);
Boolean('');

// 주의 : '0'은 문자열로서는 채워져있기 때문에 true
Boolean('0');
```

```toc

```
