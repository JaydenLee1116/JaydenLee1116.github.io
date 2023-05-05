---
emoji: 🌱
title: 230505(금)
date: '2023-05-05 23:00:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 성장일지
---

## 🎄 성장일지 4.0

책 `행복한 이기주의자(웨인 다이어)`의 내용에 자극받아 시작하는 소박한 `성장기록`

> 살아있는 꽃과 죽은 꽃은 어떻게 구별하는가?<br/>
> 성장하고 있는 것이 살아 있는 것이다.<br/>
> 생명의 유일한 증거는 성장이다!

> 🌳 (1.0)키워드<br/>
> 최대한 간단하게 정리, 추후에 보면서 스스로 설명<br/>
> 🍉 (2.0)경험 위주로<br/>
> 단순 정보를 전달하기보다 무엇을 배웠고 어떻게 해결했는지 짧고 간단하게 작성<br/>
> ❄️ (3.0)정해진 템플릿에 맞춰서<br/>
> 키워드, 경험 모두 좋다. 다만 매일 작성하기로 마음 먹은만큼 핵심만 간결하게 정리할 수 있게 템플릿을 작성<br/>
> (3.1)230102부터 시작되는 학습에 관한 내용 추가<br/>
> (3.2)230313부터 좀더 경험, 감정 위주의 내용도 담기!<br/>
> 🌾 (4.0)학습 키워드에서 최대한 간단한 정보 제공, 고민에서 내 경험을 자세히 적자!<br/>

## 🔑 오늘의 학습 키워드

### 리액트 쿼리

리액트 쿼리를 아직 짧게 공부했지만... 너무 너무 마음에 든다. ㅋㅋㅋㅋㅋ 공식문서 내용을 아주 조금 살펴보자면

Toss out that granular state management, manual refetching and endless bowls of async-spaghetti code. TanStack Query gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both your developer and user experiences.
> (내 생각) 공식문서를 읽다보면 `mutation(돌연변이)`라는 단어가 자주 등장하는데, 그냥 간단하게 어떤 기능을 사용하기 편하게 제공해주는 api라고 생각하면 될 것 같다. 사용하기 편하게 가공해놓은 변형된 형태를 말하는 듯!

DECLARATIVE & AUTOMATIC
Writing your data fetching logic by hand is over. Tell TanStack Query where to get your data and how fresh you need it to be and the rest is automatic. It handles caching, background updates and stale data out of the box with zero-configuration
> data fetching하는 로직을 작성하는 걸 쉽게 해준다. 캐싱, 백그라운드 업데이트, 케케묵은 데이터 등을 모두 핸들링해준다. 딱히 어떤 설정 없이!

SIMPLE & FAMILIAR
If you know how to work with promises or async/await, then you already know how to use TanStack Query. There's no global state to manage, reducers, normalization systems or heavy configurations to understand. Simply pass a function that resolves your data (or throws an error) and the rest is history.
> 전역 상태 관리, 리듀서, 시스템 노말리제이션, 거대한 설정 등 모두 없다.

EXTENSIBLE
TanStack Query is configurable down to each observer instance of a query with knobs and options to fit every use-case. It comes wired up with dedicated devtools, infinite-loading APIs, and first class mutation tools that make updating your data a breeze. Don't worry though, everything is pre-configured for success!
> 특수한 개발도구, 무한 로딩 api, 당신의 데이터를 업데이트하기 위한 변형된 도구를 제공한다.

번역이라기엔 애매하고 그냥 핵심적인 부분들만 적어두었다. 리액트 쿼리에서 제공하는 정말 다양한 기능들(특히나 서버상태 관련된 캐싱, 데이터 stale 관리 등) 그리고 자체적인 devtool까지... 모두 다 감동이었다.
이런 라이브러리를 개발하는 사람들은 얼마나 재미있을까..? 나도 반드시 나중에 이런 오픈소스에 기여하거나 개발할 수 있는 사람이 되고 싶다..!(뜬금 고백)

### 포스트맨

포스트맨을 간단하게 rest api 요청을 보낼 때만 사용했었는데, 이번 프로젝트에서는 좀 제대로 다뤄보려 한다. 우선 사용하는 api를 손쉽게 관리할 수 있는 점이
참 매력적인 거 같다. 이외에도 다양한 기능들이 있는 것 같은데, 당장은 프로젝트에서 사용하는 api들을 관리하고 mock data 얻어오는 정도로 사용해보려 한다.

## 📝 요약 및 하루 간단 회고

공식문서..! 공식문서를 보자! 모든 게 다 있다! 정말 매력적이고 흥미로운 기술들이 많은 것 같다. 사람의 취향이겠지만, 내가 마음에 드는 기술들은 딱 컨셉을 보자마자
`아 이거 맘에 든다.` 느낌이 온다. ㅋㅋㅋㅋㅋ 그리고 그런 기술들은 배울 때 뭔가 더 애착이 간다. 

오늘은 핑계를 대자면 어린이날, 하루종일 흐리고 비, 금요일, 방학 이라서 그런가~ 공부를 아주 효율적으로 원하는만큼 하진 못했다. 그래도 이런 날치고는 마음 잘 잡고
집중해서 공부했으니 너무 내 자신을 나무라지 말자~

### 오늘의 잘한 점

- 마음에 드는 기술을 발견한 점
- 여러가지 공부 집중을 못할 상황들에도 공부한 점

### 오늘의 아쉬운 점

- 아주 쪼금만 더 공부했었더라도 좋았을듯..?!

## 참고

- [React Query](https://react-query.tanstack.com/overview)
- [Post Man](https://www.postman.com/)

```toc

```
