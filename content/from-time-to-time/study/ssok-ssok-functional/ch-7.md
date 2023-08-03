---
emoji: 🖍️
title: 쏙쏙 들어오는 함수형 코딩 Chapter 7
date: '2023-08-03 15:00:00'
author: 제이든
tags: 글 문서 요약
categories: 스터디 책
---

# 🖍 쏙쏙 들어오는 함수형 코딩 - 심플한 코드로 복잡한 소프트웨어 길들이기

이 글은 [쏙쏙 들어오는 함수형 코딩 - 심플한 코드로 복잡한 소프트웨어 길들이기](https://product.kyobobook.co.kr/detail/S000001952246)를 읽고 작성한 글입니다.
함수형도 함수형이지만, 이 책을 통해 좀더 깔끔하고 직관적인 코드를 작성할 수 있을 것이란 팀원들의 의견을 토대로 이번 스터디 서적으로 선정하였습니다.

## Chap 7. 신뢰할 수 없는 코드를 쓰면서 불변성 지키기

- 레거시 코드 혹은 신뢰할 수 없는 코드로부터 코드를 보호하기 위한 방어적 복사
- 얕은 복사와 깊은 복사의 차이
- `카피-온-라이트`와 `방어적 복사` 구분

### 우리가 신뢰할 수 없는 코드와 소통할 때, 방어적 복사를 사용한다.

앞에서 배운 `카피-온-라이트`는 안전한 코드 내에서 불변성을 지키면서 코드를 작성하는 방법이다.

직접 내부 코드를 `카피-온-라이트`로 변경하여 불변성을 지키는 방법도 있겠지만, 그렇지 못한 상황들이 있다. 예를 들면우리가 직접 코드를 수정할 수 없는 라이브러리 혹은 레거시 코드를 사용하여 데이터를 변경해야할 때이다. 그렇다면 우리가 불변성을 지킨 안전한 코드에서 불안전한 코드로 데이터를 오고 갈 때, 어떻게 불변성을 지킬 수 있을까?

그 해답이 방어적 복사에 있다. 간단하게 말하면 객체에 대한 `깊은 복사`를 통해 불안전한 코드로 전달할 때도 복사를 해서 전달하고, 불안전한 코드로부터 데이터를 받을 때도 복사를 해서 받는 것이다. 아래는 아주 간단한 예제이다.

```js
// 여기서 push() 함수는 기존의 array를 변경하는 함수다.
function push(array, value) {
  array.push(value);
}

const nums = [1, 2, 3, 4, 5];
push(nums, 6); // 기존 nums 배열에 6이 추가된다. => 불변성이 깨진다.

// 방어적 복사를 통해 불변성을 지키는 방법
const numsCopy = deepCopy(nums);
push(numsCopy, 6); // 불변성을 지키기 위해 deepCopy를 사용한다.
const newNums = deepCopy(numsCopy); // 불변성을 지키기 위해 deepCopy를 사용한다.

// 방어적 복사를 통한 방법을 함수로 만들기
function pushSafe(array, value) {
  const copy = deepCopy(array);
  copy.push(value);
  return deepCopy(copy);
}
```

### 깊은 복사 구현해보기

타입까지 고려하면 완벽하지 않지만 재귀를 통해 깊은 복사를 구현할 수 있다.

```js
const getDeepCopy = (target) => {
  if (target === null) return null;
  if (target === undefined) return undefined;
  if (Array.isArray(target)) return target.map((item) => getDeepCopy(item));
  if (typeof target === 'object') {
    const copy = {};
    for (const key in target) {
      copy[key] = getDeepCopy(target[key]);
    }
    return copy;
  }
  return target;
```

### `카피-온-라이트`와 `방어적 복사` 비교해보기

#### 카피-온-라이트

- 주로 통제할 수 있는 데이터를 바꿀 때 사용
- 안전한 코드에서 불변성을 지키면서 코드를 작성할 수 있다.
  - 사실 카피-온-라이트를 통해 안전한 코드가 만들어 진다.
- `얕은 복사`를 사용하므로 비교적 비용이 적게 든다.

```
1. 바꿀 데이터의 얕은 복사본을 만든다.
2. 복사본을 변경한다.
3. 복사본을 반환한다.
```

#### 방어적 복사

- 주로 신뢰할 수 없는 코드와 데이터를 주고받을 때 사용
- 안전한 코드와 불안전한 코드의 경계에서 사용한다.
- `깊은 복사`를 사용하므로 비교적 비용이 많이 든다.

```
1. 안전지대에서 나가는 데이터에 깊은 복사를 해서 내보낸다.
2. 안전지대로 들어오는 데이터에 깊은 복사를 해서 들여온다.
```

```toc

```
