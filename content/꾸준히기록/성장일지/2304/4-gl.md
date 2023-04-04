---
emoji: 🌱
title: 230404(화)
date: '2023-04-04 23:00:00'
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

### 패턴 설계해보기

이번 기회에 MVC 패턴을 component 방식에 적용해보고 싶어서(MVC도 제대로 배울 겸, component도 만들겸!) 어떻게 하면 효과적으로 이 둘을 적용할 수 있을까 고민해보았다.
결론부터 말하면 MVC에서 `Controller`의 역할을 `Component`에 주는 것으로 하고 Model은 오로지 데이터, View는 화면만 담당하는 것으로 결정했다. 그러던 중 가만히 생각해보니
state에 따른 UI 랜더링이 일어나는 React와 굉장히 닮았다고 느낄 수 있었다. 해서 이 개념을 갖고 `MVC 패턴을 이용한 react class component 만들기`로 나름 거창한 구현을 시작했다.

```ts
export type Props = Record<string, string | number | boolean | []>;

export type State = Record<string, string | number | boolean | []>;

export interface Model {
  setState(newState: State): void;
  get state(): State;
}

export interface View {
  getTemplate(state: State): string;
  render(state: State): void;
  get element(): HTMLElement;
}
```

먼저 Props와 State에 대한 타입을 정의하고 우선 Model, View에 대한 인터페이스를 작성하였다.(추후 작성할 컴포넌트들이 모두 Model, View를 따로 가지기 때문에 인터페이스를 통해 좀더
확장성을 높이고 싶었다.)

## 🍀 오늘의 고민 키워드

Props와 State를 어떻게 나눠서 관리해야할지 애매하다... 일단 State는 Model에서 관리하는 것으로 하면 될 것 같은데 Props는 어떻게 할까... 전역으로 아예 빼도 될 것 같고 아직 고민이 된다.
어렵지만 즐거운 고민이다!!!

## 📝 요약 및 하루 간단 회고

나만의 학습 패턴을 정해둬야겠다.(이미 어느정도 만들어지긴 했지만...) 그리고 그 패턴을 유지하면서 새로운 것들을 계속 시도해보려고 노력해야지. 가끔은 작은 것들까지 개념정리하고 문서화해야되나
고민이 되지만, 나는 나대로 내가 고민했던 부분들 혹은 정말 중요한 개념(이런건 따로 블로그에 작성하자)들만 다듬고 정리하는 것으로 하자!

### 오늘의 잘한 점

- 일단 코드 작성은 시작한 점

### 오늘의 아쉬운 점

- 클래스 다이어그램 설계 못한 점

## 참고

- [MVC + component](https://velog.io/@imnotmoon/MVC-Pattern-vanila-JavaScript)
- [react 공식문서](https://ko.reactjs.org/)

```toc

```
