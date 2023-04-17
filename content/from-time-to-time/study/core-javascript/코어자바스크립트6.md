---
emoji: 🏀
title: (코어 자바스크립트) 4. 콜백함수
date: '2023-02-19 22:00:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 스터디
---

## 🏀 기술책 스터디

23년 1월부터 활동 중인 교육에서, 뜻이 맞는 동료들과 함께 진행하게 된 스터디<br/>
처음 `코어 자바스크립트` 서적을 읽자고 제안하면서 시작!<br/>
앞으로도 꾸준히 기술 서적을 읽고 함께 발전하는 시간이 되었으면 좋겠다!

> 책에 있는 내용보단, 읽으면서 혼자 정리한 내용들 위주로 작성하자!

# 🏅 코어 자바스크립트 4. 콜백함수

일시: 2월 19일 22시

---

## Quiz1)p101. 예제 4-5. / 참고하여 filter 메서드 구현해보기

```jsx
// 예제 4-5
Array.prototype.map2 = function(callback, thisArg) {
  var mappedArr = [];
  for (var i = 0; i < this.length; i++) {
    var mappedValue = callback.call(thisArg || window, this[i], i, this);
    mappedArr[i] = mapppedValue;
  }
  return mappedArr;
}
```

## 예상 답안

```jsx
Array.prototype.filter2 = function(callback, thisArg) {
  var filteredArr = [];
  for (var i = 0; i < this.length; i++) {
    var isTrue = callback.call(thisArg || window, this[i], i, this);
    if (isTrue) {
      filteredArr.push(this[i]);
    }
  }
  return filteredArr;
}
```

## Quiz2)p111. 예제4-15. / 12~15번째 줄 콜백 함수 표현 바꾸기

```jsx
var addCoffee = function(name) {
  return function(prevName) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        var newName = prevName ? (prevName + ', ' + name) : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    });
  };
};
// 이 아래 코드들
addCoffee('에스프레소')()
.then(addCoffee('아메리카노'))
.then(addCoffee('카페모카'))
.then(addCoffee('카페라떼'))
```

## 예상 답안

```jsx
addCoffee('에스프레소')()
.then(prevName => addCoffee('아메리카노')(prevName))
.then(prevName => addCoffee('카페모카')(prevName))
.then(prevName => addCoffee('카페라떼')(prevName))

// 비슷한 예시
[1, 2, 3, 4, 5].forEach(console.log) 
```

## p113. async/await 쉬운 예제

```jsx
async function getDelay(target, second) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(target), second * 1000);
    })
	}

console.log(await getDelay('비동기', 5)); // 5초 뒤에 '비동기' 출력
```

```toc

```
