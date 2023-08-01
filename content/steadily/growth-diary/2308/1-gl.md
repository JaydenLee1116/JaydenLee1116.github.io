---
emoji: 🌱
title: 230801(화)
date: '2023-08-01 23:55:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 성장일지
---

## 🚤 성장일지 6.0

책 `행복한 이기주의자(웨인 다이어)`의 내용에 자극받아 시작하는 소박한 `성장기록`

> 살아있는 꽃과 죽은 꽃은 어떻게 구별하는가?<br/>
> 성장하고 있는 것이 살아 있는 것이다.<br/>
> 생명의 유일한 증거는 성장이다!

> 🌾 (4.0)학습 키워드에서 최대한 간단한 정보 제공, 고민에서 내 경험을 자세히 적자!<br/>
> 🥊 (5.0)학습 키워드는 한줄의 핵심으로만 정리, 성공/실패 일지 작성하기! 이 때, 실패의 경험은 자세히 적기!<br/>
> 🍉 (6.0)<완전 개편!!!> 매일 습관적으로 핵심만 적을 수 있게 프레임 변경. 성공보단 실패에 초점을 맞추기.<br/>
>
> - 🍉 (6.1)<수정> 매번 성공, 실패를 따로 적는 것보단 경험으로 표현하자!
> - 🍉 (6.2)<수정> 일지 카테고리 수정 변경!(경험 -> 고민 -> 회고 -> 교훈)

## ☀️ 오늘의 경험

### 웹소켓 프로토콜

- HTML5 표준 기술
- HTTP 환경에서 클라이언트와 서버 사이에 하나의 TCP 연결을 기반으로 `실시간 전이중 통신`을 가능하게 한다.
  - 전이중 통신: 일반적인 HTTP 통신과 다르게 양방향으로 진행되는 통신
- 웹소켓 기술이 없을 때는 `Polling`이나 `Long Poliing` 의 방식으로 구현
  - Polling: 클라이언트가 주기적으로 요청을 보낸다.
  - Long Poling: 서버가 의도적으로 요청에 대한 응답을 지연시킨다. 클라이언트가 요청을 보내고 서버는 데이터가 준비되면 응답을 하며 그 응답을 받는 즉시 클라는 다시 요청을 걸어놓는다.

---

초기 웹의 탄생 목적은 `문서 전달` 그리고 `하이퍼링크`를 통한 문서 연결이었다.
그런 의미에서 HTTP 프로토콜은 목적에 매우 부합하는 모델이었다.
그러나 시대가 변하면서 웹에게 좀더 동적인 동작이 요구되었고 이로 인해 여러 새로운 기술이 탄생하였다.
그 중 실시간 양방향 통신을 위한 스펙이 바로 `웹 소켓` 프로토콜이다.

### left, right index를 통해 배열을 순회하는 방법

물건 가격이 배열로 주어지고 각 인덱스는 날짜를 의미한다. 이 때, 최대 이익을 구하는 문제를 푸는 방법이다.

```js
const maxProfit = (prices) => {
  let left = 0;
  let right = 1;
  let maxProfit = 0;
  while (right < prices.length) {
    const first = prices[left];
    const second = prices[right];
    if (first < second) {
      const profit = second - first;
      if (profit > maxProfit) maxProfit = profit;
    } else {
      left = right;
    }
    right++;
  }
  return maxProfit;
};
```

## 🫧 오늘의 고민

### 배열 순회 시간 초과

위의 경험에서 적은 문제를 푸는데, 처음 나의 구현은 아래와 같았다.

```js
let maxProfit = function (prices) {
  let initialValue = 0;
  const callbackFn = (result, item, index, arr) => {
    const afterArr = arr.slice(index);
    const maxPrice = Math.max(...afterArr);
    const maxProfit = maxPrice - item;
    if (maxProfit > result) return maxProfit;
    return result;
  };
  const totalMaxProfit = prices.reduce(callbackFn, initialValue);
  return totalMaxProfit;
};
```

처음엔 reduce를 활용해서 풀어서 너무 신났는데, 몇몇 테스트 케이스에서 시간 초과가 발생했다. 알아보니 reduce에서 loop를 돌고, 그 안에 slice()와 Math.max()도 loop를 돌기 때문에 O(N^2)의 시간 복잡도를 가지게 되어 시간 초과가 발생했다.

결국 풀이를 보게 되었는데, left, right index를 활용해서 loop를 한번만 돌면서 풀 수 있었다. 그게 경험란에 적은 풀이이다.

## 🌈 오늘의 회고

후... 쉬운 알고리즘 문제라고 생각했는데 아예 관점을 바꾸지 못하니 쉽게 풀지 못했던 것 같다. 이래서 많이 풀어보고 공부해서 어느정도 경험을 하는 게 중요한 것 같다.

## 🐾 오늘의 교훈

고민하지말고 풀어보고 구현하면서 경험을 쌓고 배우자. 한 번 경험한다고 해서 다 되는건 아니지만 한 번이라도 경험하는 게 중요하다.

## 🪵 참고

- [MDN 웹소켓](https://developer.mozilla.org/ko/docs/Web/API/WebSockets_API)
- [웹 소켓에 대해 알아보자 - 이론편](https://tecoble.techcourse.co.kr/post/2021-08-14-web-socket/)
- [left, right index를 통해 배열을 순회하는 방법](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/solutions/1735550/python-javascript-easy-solution-with-very-clear-explanation/)

```toc

```
