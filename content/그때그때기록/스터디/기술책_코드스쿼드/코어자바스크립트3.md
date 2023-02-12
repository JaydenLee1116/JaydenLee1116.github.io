---
emoji: 🏀
title: (코어 자바스크립트) 5. 클로저
date: '2023-02-03 23:00:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 스터디
---

## 🏀 기술책 스터디

23년 1월부터 활동 중인 교육에서, 뜻이 맞는 동료들과 함께 진행하게 된 스터디<br/>
처음 `코어 자바스크립트` 서적을 읽자고 제안하면서 시작!<br/>
앞으로도 꾸준히 기술 서적을 읽고 함께 발전하는 시간이 되었으면 좋겠다!

> 책에 있는 내용보단, 읽으면서 혼자 정리한 내용들 위주로 작성하자!

# 🏅 코어 자바스크립트 5. 클로저

일시: 2월 3일 20시

---

## 클로저

- MDN: 함수(inner)와 그 함수가 선언될 당시(outer)의 lexical environment의 상홍관계에 따른 현상
- `어떤 함수(외부함수) A`에서 선언한 `변수 a`를 참조하는 `내부함수 B`를 외부로 전달할 경우, A의 실행 컨텍스트가 종료된 이후에도 `변수 a`가 사라지지 않는(가비지 콜렝팅되지 않는) 현상
- **Quiz1) p119. 예제 5-3. 말로 설명해보기**

    ```jsx
    var outer = function () {
    	var a = 1;
    	var inner = function () {
    		return ++a;
    	};
    	return inner; // 함수 호출이 아닌 함수 자체를 반환
    };
    var outer2 = outer(); 
    // outer함수는 함수가 종료됐음에도 이후에 반환되는 inner로 인해서 outer의 값 중 하나인 a가 계속 참조됨
    ```


## bind()

- call, apply와의 차이
- **Quiz2) p127. 예제 5-8. 말로 설명해보기**

    ```jsx
    fruits.forEach(function(fruit) {
    	var $li = document.createElement('li');
    	$li.innerText = fruit;
    	$li.addEventListener('click', alertFruit.bind(null, fruit);
    	$ul.appendChild($li);
    });
    
    // bind의 첫번째 인자는 . 앞의 함수의 this로 전달되고 그 뒤부터 함수의 매개변수로 전달된다.
    // 여기서 bind는 this를 지정하는 목적보다는 bind가 this 지정 후 그 뒤 인자로 특정 매개변수를 미리 전달해줄 수 있다는
    // 특성을 활용해서 event 객체가 자동으로 전달되는 것을 막는 것이다.
    ```

- **Quiz3) p128. 예제 5-9. 화살표 함수로 변경해보기**

    ```jsx
    var alertFruitBuilder = function (fruit) {
    	return function () {
    		alert('your choice is ' + fruit);
    	};
    };
    
    ---
    
    const alertFruitBuilder = (fruit) => () => alert('your choice is ' + fruit);
    ```


## public, private, protected 찾아보기

- 정보 은닉 = 캡슐화

## 부분적용함수

- 어떤 함수의 인자를 한번에 전달하지 않고 나눠서 전달하는 방법
- 쉬운 예제

    ```jsx
    function exampleOne() {
    	console.log(arguments);
    	}
    
    const a = exampleOne.bind(null, 1, 2, 3, 4, 5);
    
    // a를 호출하면 어떤 결과가 나올까요?
    ```

  - **Quiz4) p134관련) 위의 `쉬운 예제`를 화살표함수로 표현해주세요.**

      ```jsx
      const exampleOne = () => {
        console.log(arguments);
        }
      
      const a = exampleOne.bind(null, 1, 2, 3, 4, 5);
      
      // a를 호출하면 어떤 결과가 나올까요?
      // 왜 그런 결과가 나올까요?
      // 어떻게 알아볼 수 있을까요?
      ```

## 디바운스

- 짧은 시간 동안 동일한 이벤트가 너무 많이 발생할 경우, 이를 처음 혹은 마지막에 발생한 것에 대해서만 처리하는 방법.
- 클로저를 활용하여 디바운스를 구현할 수 있다!
- 가볍게 이해한 것 설명해보기

## 커링함수

- 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출 될 수 있게 체인 형태로 구성한 것

```jsx
// 일반 함수
const func1 = (a, b, c, d, e) => a + b + c + d + e;

// 커링 함수
const func2 = a => b => c => d => e => a + b + c + d + e;
const sumFourParameter5 = func2(5);
const sumFourParameter8 = func2(8);

// 추후 파라미터 4개만 전달해서 sumFourParameter 함수들을 실행할 수 있다.
// 즉, 지금 아직 파라미터가 4개 전달되어야 함수가 호출 완료되므로, 클로저가 현상이 일어나고 있는 것!
```

```toc

```