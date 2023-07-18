---
emoji: 🏀
title: (코어 자바스크립트) 2. 실행 컨텍스트
date: '2023-01-29 23:00:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 스터디 책
---

## 🏀 기술책 스터디

23년 1월부터 활동 중인 교육에서, 뜻이 맞는 동료들과 함께 진행하게 된 스터디<br/>
처음 `코어 자바스크립트` 서적을 읽자고 제안하면서 시작!<br/>
앞으로도 꾸준히 기술 서적을 읽고 함께 발전하는 시간이 되었으면 좋겠다!

> 책에 있는 내용보단, 읽으면서 혼자 정리한 내용들 위주로 작성하자!

# 🏅 코어 자바스크립트 2. 실행 컨텍스트

일시: 1월 29일 19시

---

## 실행 컨텍스트

- 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
- 실행 컨텍스트가 활성화되는 시점에 선언된 변수를 위로 끌어올리고(`호이스팅`), 외부 환경 정보를 구성하고, this 값을 설정하는 등의 동작을 수행
- 실행 컨텍스트 구성 방법: 전역공간, eval() 함수, **함수**
- 구성하는 방법은 오로지 `함수 실행`
- 최상단의 공간(전역공간)은 코드 내부에서 별도의 실행이 없어도 브라우저가 자동으로 실행하여 전역 컨텍스트를 만든다.(anonymous)
- 콜 스택의 가장 위(마지막) 실행 컨텍스트가 쌓이는 순간이 현재 코드에 관여하게 되는 시점
- 실행 컨텍스트 객체 3형제
  - VariableEnvironment: 초기 환경 객체
    - environmentRecord: 내부 환경 정보
    - outerEnvironmentRecord: 외부 환경 정보
  - LexicalEnvironment: 실행함에 따라 변하는 객체
    - environmentRecord: 내부 환경 정보
    - outerEnvironmentRecord: 외부 환경 정보
  - ThisBinding: this를 관리하는 객체

### Quiz 1) p37. 전역공간 관련 반복문

```jsx
// 1번 var
for (var i = 0; i < 5; i++) {
	console.log(i);
	}

// 2번 let
for (let i = 0; i < 5; i++) {
	console.log(i);
	}

// 3번 const
for (const i = 0; i < 5; i++) {
	console.log(i);
	}

// 4번 없음
for (i = 0; i < 5; i++) {
	console.log(i);
	}
```

---

## 호이스팅

- 자바스크립트의 `실행 컨텍스트를 구성한 뒤 코드가 실행되는 독특한 구조` 덕분에 생기는 현상
- 변수의 선언부, 함수 전체(함수 선언문 한정)가 마치 코드 제일 위에서 실행되는 느낌

  → 이렇게 생각해야 우리가 자바스크립트 엔진의 코드 해석 순서를 이해할 수 있다.


### Quiz 2) p42. 예제 2-2

```jsx
function a(x) {
	console.log(x); // (1)
	var x;
	console.log(x); // (2)
	var x = 2;
	console.log(x); // (3)
}

a(1116);
```

---

## 스코프

- 식별자에 대한 유효범위
- 쉽게 말하면 `어떤 변수가 속한 실행 컨텍스트` 라고 생각해도 무방
- 스코프 체인 ⇒ 각 실행 컨텍스트마다 `선언 기준` 상위 실행 컨텍스트를 참조하고 있기 때문에 가능하다.

### Quiz 3) p53. 스코프 체인

```jsx
function a() {
  var answer = 1;
  function c() {
      console.log(answer);
    }
  function b() {
    var answer = 2;
    c();
  }
  b();
}

a();
```

**자바스크립트 엔진은 `콜스택`으로 실행 순서를 관리하고 `실행 컨텍스트`로 스코프를 관리한다.**

### p62 ~ p63) 코드로 구현해보기

```jsx
function X(a, b) {
  const sum = function (a, b) {
    return a + b;
  }
  return sum(a, b);
}

function sum(c, d) {
  return `${c} + ${d} = ${c + d}`
}

// X(3, 4) => 7
// sum(3, 4) => '3 + 4 = 7'

// 여기서 더 나아가서 좀더 안정적으로 하려면 아래와 같이 표현식 사용
const X = (a, b) => {// ...code}
```

# 마무리

## 꼭 찾아보고 생각해보기

### 1. var, let, const

- 호이스팅과 관련 지어서 찾아보기
- 선언, 초기화, 재할당의 개념

### 2. 함수 선언문, 함수 표현식, 화살표 함수 차이점

- 호이스팅과 관련 지어서 찾아보기
- this와 관련 지어서 찾아보기

## 같이 생각해보고 싶은 점

### 1. VariableEnvironment와 LexicalEnvironment를 굳이 나누는 이유가 뭘까요?

```toc

```