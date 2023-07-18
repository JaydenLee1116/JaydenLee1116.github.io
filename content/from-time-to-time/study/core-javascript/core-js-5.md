---
emoji: 🏀
title: (코어 자바스크립트) 3. this
date: '2023-02-12 23:00:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 스터디 책
---

## 🏀 기술책 스터디

23년 1월부터 활동 중인 교육에서, 뜻이 맞는 동료들과 함께 진행하게 된 스터디<br/>
처음 `코어 자바스크립트` 서적을 읽자고 제안하면서 시작!<br/>
앞으로도 꾸준히 기술 서적을 읽고 함께 발전하는 시간이 되었으면 좋겠다!

> 책에 있는 내용보단, 읽으면서 혼자 정리한 내용들 위주로 작성하자!

# 🏅 코어 자바스크립트 3. this

일시: 2월 12일 20시

---

## Quiz 1 p79. class의 this 생각해보기

```jsx
class Test {
	constructor() {}
	
	method1() {
		console.log(this)
	}
}

const test = new Test();

test.method1(); // 1. 무엇이 출력되나요? 왜 그렇게 될까요?

const method2 = test.method1;

method2(); // 2. 무엇이 출력되나요? 왜 그렇게 될까요?

// 3. mehtod2에 다른 this를 지정하는 방법이 있을까요?
```

### 예상 답안

1. test 객체
2. undefined - 함수로서 호출했으므로 전역 객체일 것 같지만, class는 es6에 도입되어 기본적으로 `use strict` 가 적용되기 때문입니다.
3. call, apply, bind 메소드

## Quiz 2 p83. 예제 3-18-(1)

```jsx
// 위의 코드를 es6 이후의 문법으로 표현해주세요!

function a() {
	var argv = Array.prototype.slice.call(arguments);
	argv.forEach(function(arg) {
		console.log(arg);
	});
}
a(1, 2, 3);
```

### 예상 답안 2가지

```jsx
// 1. Array.from 사용하기
function a() {
	var argv = Array.from(arguments);
	argv.forEach(function(arg) {
		console.log(arg);
	});
}
a(1, 2, 3);

// 2. rest parameter 사용하기
function a(...argv) {
	argv.forEach(arg => console.log(arg))
}
a(1, 2, 3);
```

## Quiz 3 p87. 예제 3-25

```jsx
var func = function(a, b, c) {
	console.log(a + b + c);
};
func(1, 2, 3);

// 1. bind를 사용하여 위의 함수의 파라미터를 나눠서 받는 함수들로 나눠주세요!
```

### 1. 예상 답안

```jsx
var binding1 = func.bind(null, 1);
var binding2 = binding1.bind(null, 2);
var binding3 = binding2.bind(null, 3);

/*
binding1(2, 3); // 6
binding2(3); // 6
binding3(); // 6
*/

// 2. (추가) 위의 binding함수들을 보시고 떠오르시는 개념이 있나요?(힌트: FP)
```

### 2. 예상답안

```jsx
// 우리가 배웠던 함수형 프로그래밍에서의 `currying`이 떠오르시면 했어요!
var currying = (a) => (b) => (c) =>{
	console.log(a + b + c);
};

var currying1 = currying(1);
var currying2 = currying1(2);

/*
currying1(2)(3); // 6
currying2(3); // 6
*/
```

## Quiz 4 p93. 개념 + p77. 예제 3-12-(2)

```jsx
[1, 2, 3, 4, 5].forEach(function(x) {
	console.log(this, x);
});

// 1. 위의 예제에서 this는 무엇을 가리키고 있나요?
// 2. this를 바꾸는 코드를 작성해주세요!
```

### 1, 2. 예상 답안

```jsx
var self = '내가 지정한 this';
[1, 2, 3, 4, 5].forEach(function(x) {
	console.log(this, x);
}, self);

// 3. (추가) 위의 forEach가 받는 콜백 함수를 화살표 함수로 작성하면 어떤 결과가 나올까요? 
```

### 3. 예상 답안

```jsx
var self = '내가 지정한 this';
[1, 2, 3, 4, 5].forEach(x => 
	console.log(this, x)
, self);

// this가 전역 객체를 가리키고 있습니다. 화살표 함수는 따로 this를 바인딩하지 않기 떄문!
```

```toc

```
