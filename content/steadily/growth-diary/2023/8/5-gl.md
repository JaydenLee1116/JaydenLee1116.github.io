---
emoji: 🌱
title: 230805(토)
date: '2023-08-05 23:55:00'
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

### 요구 사항을 잘 보고 오버코딩하지 말자

오늘도 알고리즘 문제를 풀었다. 문제 자체는 number[]와 number가 주어지고 number[]에서 주어진 number와 같은 숫자들을 제외하는 문제였다. 사실 평소에 익숙한 고차함수(filter)를 사용해서 불변성을 유지하는 방향으로 하면 어렵지 않게 풀 수 있다.
다만 문제는 기존에 주어진 변수 number[] 자체의 값을 변화시켜서 filtering하라는 문제였다. 아래는 내가 푼 코드이다.

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let index;
    while (index !== -1) {
        index = nums.findIndex(v => v === val);
        if (index < 0) break;
        nums.splice(index, 1);
        index = nums.findIndex(v => v === val);
    }
};
```

조금 지저분하긴 하지만 findIndex와 splice를 통해 number[]의 메모리를 유지하면서 filtering할 수 있다.

아래는 다 풀고나서 본 다른 분의 solution이다.

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    var j = 0;
    for(var i=0;i<nums.length;i++)
    {
        if(nums[i]!=val)
        {
            nums[j++] = nums[i];
        }
    }
    return j;
};
```

위의 코드를 쭉 따라서 보면 nums가 내 코드와는 다르게 [2, 2]와 같은 식으로 깔끔하게 떨어지지 않는다. 그래서 처음엔 잘못된 코드인 줄 알았는데, 문제의 요구조건을 보니 number[]의 0번째 index부터 filtering된 값들이 채워지기만 하면 된다고 적혀있었다.

즉, 나는 결과를 [2, 2]같은 형태를 생각했는데 실제로는 [2, 2, _, _]이 되어도 괜찮은 것이다. 그래서 내가 푼 코드는 문제의 요구조건을 잘못 이해해서 오버코딩을 한 것이다. 앞으론 좀더 문제를 꼼꼼히 보고 요구사항에 맞춰서 최대한의 효율로 풀어야겠다.

## 🫧 오늘의 고민

### 리액트 handle 함수 네이밍

그동안 리액트 컴포넌트 하나에서 handle 함수가 늘어날수록 너무 가독성이 안좋다고 느꼈다. 이번에 인턴십 과제를 구현하면서 컴포넌트 하나에 비스무리한 이름으로 여러개의 handle 함수 작성하게 되어서
내 나름대로의 규칙을 가질 필요가 있다고 느꼈다. 예시를 통해서 간단하게 정리해둔다.(편의상 반환되는 JSX 코드는 생략했다.)

먼저 아래와 같은 코드는 문제가 없어보인다.

```jsx
const [value, setValue] = useState('');
const handleInput = (e) => {
  setValue(e.target.value);
};
```

하지만 컴포넌트 내에서 동일한 input 태그이면서 조금은 다르게 동작하는 경우가 생길 수 있다.

아래와 같이 작성하면 정말 최악이다. 일단 당장의 handle 함수들이 어떤 로직을 수행하는지 전혀 감이 오질 않는다. 그나마 위의 코드처럼 컴포넌트 내에 input 태그가 하나만 존재한다면
어느정도 금방 감이 올 수 있다.

```jsx
const [value, setValue] = useState('');
const [value2, setValue2] = useState('');
const handleInput = (e) => {
  setValue(e.target.value);
};
const handleInput2 = (e) => {
  setValue2(e.target.value);
};
```

그래서 앞으로는 아래와 같이 작성하려 한다.

```jsx
const handleEmailInputChange = (e) => {
  setEmail(e.target.value);
};
const handlePasswordInputChange = (e) => {
  setPassword(e.target.value);
};
```

handle 함수이므로 `handle`을 맨앞에 붙이고(이 부분은 리액트 공식문서에도 컨벤션으로 나온다.) 끝에는 이 함수가 어떤 이벤트에서 쓰이는지 알기위해 `이벤트 타입`을 붙여준다.
그리고 그 가운데에는 이 함수가 사용되는 `태그의 이름`을 붙여준다. 이렇게까지만 작성해도 가독성이 충분하다면 멈춘다. 그렇지만 이와 같이 작성해서 그 내용이 겹치게 될 때에는
`handle` 뒤에 이 함수가 어떤 비즈니스 로직과 관련이 있는지 짧은 단어로 적어준다.

사실 이 방법이 좋은지는 모르겠지만, 적어도 내가 작성한 코드들을 봤을 때 JSX를 보지 않고도 빠르게 컴포넌트가 돌아가는 로직이 파악이 되어서 좋았다. 조금 길어지더라도 이런 컨벤션을
유지해서 코드를 작성해보려 한다.

## 🌈 오늘의 회고

오늘은 거의 하루종일 과제 구현에 초점을 맞춘 것 같다. 기능 구현은 사실상 거의 다 해서 아주 만족스럽다. 요즘 정말 바쁘게
열심히 살고 있는데, 딱 하나 잠만 잘 자도록 하면 좋을 것 같다..! 에어컨비도 아까워서 안켰는데... 이제는 좀 켜고 자야지.

## 🐾 오늘의 교훈

밤에 잘 때, 에어컨 켜고 자자..!ㅋㅋㅋ

## 🪵 참고

- 없음

```toc

```
