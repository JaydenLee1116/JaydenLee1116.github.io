---
emoji: 🌱
title: 230503(수)
date: '2023-05-03 23:00:00'
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

### 간단한 react todo app 만들기

강의에서 나오는 프로젝트 중 하나지만, 강의를 하나도 보지 않고 구현해보았다. 그러고나서 강의를 보면서 리팩토링을 하는데, 역시나 처음 내가 짠 코드는 다소 지저분했다.
그럼에도 리팩토링하면서 더 효육적인 방법, 더 보기 좋은 방법으로 코드를 정리하는 게 너무 재미있고 흥미로웠다. 오늘 대표적으로 깔끔하다고 느낀 건 부모 컴포넌트에서 특정
setState 함수를 전달하는 방법인데 간단한 예시를 들면 아래와 같다.

내가 작성했던 방식은 아래와 같다.

```jsx
function Parent() {
  const [state, setState] = useState(false);

  return <Child setState={setState} />;
}

function Child() {
  return (
    <button
      onClick={() => {
        setState(prev => !prev);
      }}
    >
      Click
    </button>
  );
}
```

그리고 이를 좀더 리팩토링한 방식은 아래와 같다.

```jsx
function Parent() {
  const [state, setState] = useState(false);
  
  const handleState = () => {
    setState((prev) => !prev);
  }
  return <Child onClick={handleState} />;
}

function Child ({onClick}) {
  return (
    <button onClick={onClick}>
      Click
    </button>
  );
}
```

정말 별거 아닌 거 같지만, React Component에도 `on`으로 시작하는 함수 props로 전달하니 훨씬 보기 편하고 안정적인 느낌이 든다.
또한, state를 관리하는 부분도 부모 컴포넌트에서 관리하고, 자식 컴포넌트에서는 그냥 전달받은 함수를 실행하는 것만으로도 state를 관리할 수 있다는 점이 너무 좋았다.

## 🍀 오늘의 고민 키워드

### 한국어 onKeyDown 시 마지막 글자에 대해 이벤트가 2번 발생하는 이슈

개발 공부를 하면서 느끼는건데, 이제는 `이게 해결이 될까?`하는 생각조차도 들지 않게 되었다. 그냥 문제가 생기면 `어떻게 해결할 수 있으려나?`하는 생각만 든다. 해결하는데
얼마나 시간이 걸리고 얼마나 효율적으로 할 수 있을지는 모르지만, 반드시 해결할 수 있다는 믿음? 자신감?이 생겼다고 해야하나... 암튼 그런 게 생겼다.
오늘의 이슈도 약간 그런 문제였는데, 결국 찾고 찾다보니 해결할 수 있었다. 자세한 건 [이 글](https://jaydenlee1116.github.io/from-time-to-time/oddments/onKeyDown-in-korean/)을 참조하기!

## 📝 요약 및 하루 간단 회고

개발이 참 재미있다. 알면 알수록 재미있고 더 잘하고싶고 욕심이 난다. 솔직히 육체적인 피로는 있지만, 개발 공부를 할 때 정신적인 피로는 상대적으로 덜한 것 같다.(헛소리일 수도 있다. ㅎㅎㅎㅎㅎ)
그래도 확실한 건 매일 개발 생각이 나고 매일 개발을 하고 있고 매일 개발을 하고 싶다는 것이다. 너무 서두르지말고 천천히 내가 원하는 모습의 삶을 더 실현하면서 나아갔으면
좋겠다. 정말 정말 잘하고 있다.


### 오늘의 잘한 점

- 거의 쉬지 않고 몰입해서 공부한 점

### 오늘의 아쉬운 점

- 계획한만큼 다 못한 점... => 요즘 이게 계속 등장하는데, 어떻게 개선할 수 있을까?
  - 정말 딱 할 수 있는 계획들만 적어놔 볼까..? 너무 무리하지 말고..?

## 참고

- [onKeyDown with 한국어](https://jaydenlee1116.github.io/from-time-to-time/oddments/onKeyDown-in-korean/)

```toc

```