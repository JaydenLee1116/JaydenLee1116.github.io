---
emoji: 🌱
title: 230802(수)
date: '2023-08-02 23:55:00'
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

### monorepo

모노레포는 하나의 저장소에 여러 프로젝트를 관리하는 것을 말한다. 이렇게 하면 여러 프로젝트를 한 번에 관리할 수 있고, 공통된 패키지를 사용할 수 있다.<br/>
오늘 내가 공부한 내용에서 나온 모노레포는 라이브러리를 만드는 경우의 모노레포였다. 간단하게 디렉토리 구조만 살펴보면 아래와 같다.

```
📦 root
├─ apps
│  ├─ docs // 라이브러리 소개하는 문서
│  └─ example // 라이브러리를 사용해보는 예제
├─ packages
│  └─ library // 실제 라이브러리
└─ .gitignore
```

위와 같은 구조가 된다. root에도 package.json이 있고 docs, example, library도 각각 하나의 package.json으로 관리되는 프로젝트이다. 이 프로젝트에서
library는 실제 내가 개발하려는 라이브러리, example은 개발 중인 라이브러리를 사용해보는 예제, docs는 라이브러리를 소개하는 문서를 작성하는 프로젝트이다. 이 프로젝트들을
하나로 관리하기 위해서 workspace라는 개념을 사용하게 된다. workspace는 root의 package.json에 설정을 해주면 된다.

```json
{
  "name": "root",
  "private": true, // private으로 설정해야 npm에 publish되지 않는다.(root project 자체는 publish하지 않는다.)
  "workspaces": ["packages/*", "apps/*"],
  "scripts": {
    "example": "yarn workspace example dev",
    "build": "yarn workspace @jaydenlee/mini-query build",
    "test": "yarn workspace @jaydenlee/mini-query test"
  }
}
```

중요한 점은 해당 root 프로젝트는 철저히 그 아래 프로젝트들을 관리하는 용도라는 점이다. 그렇기 때문에 private은 true로 설정해야한다. 그리고 root의 package.json의 scripts
에서는 workspace 기능을 통해 각 프로젝트의 scripts를 실행할 수 있다.

### 불변성? 아니 가변성!

리트코드에서 문제를 푸는데 다소 어색한 문제가 등장했다. 보통 객체, 배열 등의 불변성을 유지하면서 문제를 풀기 마련인데, 이 문제는 되려 인자로 받은 배열을 변경시키기만해서 문제를 해결할 것을
요구하고 있었다. 문제 자체는 정말 단순한데, 다시 한 번 JS의 불변성을 유지하지 않는 메소드들을 상기시켜주는 계기가 되었다.

```js
const merge = function (nums1, m, nums2, n) {
  nums1.splice(m);
  nums1.push(...nums2);
  nums1.sort((a, b) => a - b);
};
```

## 🫧 오늘의 고민

- 오늘은 딱히 고민이 없었다. 🥳

## 🌈 오늘의 회고

라이브러리를 만드는 과정이 너무 흥미로웠다. 아무래도 보통 웹 공부를 시작하고 프로젝트를 하다보면 웹 어플리케이션 위주로 진행이되는데, 이번에는 라이브러리를 만들어보면서
좀 더 다양한 경험을 할 수 있었다. 취준생 입장에서 이런 말하긴 뭐하지만, 그래도 어느정도는 이 개발 세계를 안다고 생각했음에도 매번 새로운 경험을 하게 되니 너무 재미있다.
간단하지만 유용한 라이브러리를 하나 만들어서 배포해보려 한다.(아마 JS로 구현한 여러 자료구조가 될 것 같다.)

## 🐾 오늘의 교훈

세상은 넓고 배울 건 많다. 앞으로 또 새로운 세상을 만나게 될 것을 기대하고 찾아 나아가자. 너무 두근거리는 개발 세상이다!

## 🪵 참고

- 없당

```toc

```