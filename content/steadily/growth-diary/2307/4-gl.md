---
emoji: 🌱
title: 230704(화)
date: '2023-07-04 23:55:00'
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
> - 🍉 (6.1)<수정> 매번 성공, 실패를 따로 적는 것보단 경험으로 표현하자

## 🌈 오늘의 감정

- 조금 피곤하지만 매우 매우 좋음! 내가 원하던 회사에 다녀와볼 수 있어서!

## 🫧 오늘의 고민

- Array의 map 함수 구현 시, this에 대한 타입을 어떻게 지정할지?

## ☀️ 오늘의 실패

- Array의 map 함수로 구현하는 방법... this를 써서 하고 싶은데 타입 에러가 난다.

## ✨ 오늘의 성공

- 일반 함수로 map 함수 구현하기 => 제네릭을 배우는데 도움이 돼서 진짜 좋은듯!
  - 테스트 코드부터 작성도 성공
  - 그리고 여차하면 `d.ts`에 있는 타입에서 힌트를 얻으면 되긴하니까!(봐도 잘 모르겠네... 이런ㅋㅋㅋㅋㅋㅋ)

```ts
describe('map 함수 숫자 배열', () => {
  test('주어진 배열 [1, 2, 3]에 대해서 각 원소에 +1을 한 새로운 배열 [2, 3, 4] 객체를 반환한다.' ,() => {
    expect(map([1, 2, 3], (v) => v + 1)).toEqual([2, 3, 4]);
  });
})

describe('map 함수 문자 배열', () => {
  test("주어진 배열 ['jayden', 'sori', 'hodu']에 대해서 각 원소의 앞에 'hi, '를 더한 새로운 배열 ['hi, jayden', 'hi, sori', 'hi, hodu'] 객체를 반환한다." ,() => {
    expect(map(['jayden', 'sori', 'hodu'], (v) => `hi, ${v}`)).toEqual(['hi, jayden', 'hi, sori', 'hi, hodu']);
  });
})


describe('map 함수 숫자에서 문자 배열', () => {
  test("주어진 배열 [1, 2, 3]에 대해서 각 원소를 문자열로 바꾼 ['1', '2', '3'] 객체를 반환한다." ,() => {
    expect(map([1, 2, 3], (v) => `${v}`)).toEqual(['1', '2', '3']);
  });
})
```

```ts
interface CallbackFn<T, U> {
  (value: T, index?: number, array?: T[]): U;
}

function map<T, U>(targetArray: T[], callback: CallbackFn<T, U>) {
  const returnArray: U[] = [];
  for (let i = 0; i < targetArray.length; i++) {
    returnArray.push(callback(targetArray[i]));
  }
  return returnArray;
}
```

## 🪵 참고

- 없음

```toc

```
