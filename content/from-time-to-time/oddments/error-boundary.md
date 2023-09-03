---
emoji: 📦
title: Error Boundary(feat. React)
date: '2023-09-03 23:00:00'
author: 제이든
tags:
categories: 잡동사니
---

## 📦 잡동사니

하나의 키워드를 잡고 좀 편하게 정리하고 싶어 만든 `잡동사니`<br/>

> 잡동사니는 조선 후기 학자 `안정복`이 편찬한 `잡동산이(雜同散異)`에서 유래된 말이다.<br/>
> 잡동산이는 `잡기(雜記)`의 형태를 빌려온 책으로 구체적인 체계가 잡혀있지 않은 형식이다.<br/>
> 항목이 다소 난잡하고 내용의 구분이 혼동되어있다고 한다. 🤣

## 🗂️ Error Boundary

Error Boundary란 `에러에 대한 경계`를 의미한다. 즉, 특정 Error Boundary로 감싸여진 구간에서 에러가 발생하면 그 에러를 잡아내서 처리할 수 있다는 것이다. 이에 대한 개념을 적용한 Error Boundary 컴포넌트를 리액트에서는 공식문서를 통해 제공하고 있다. 먼저 리액트 공식문서에서 설명하는 Error Boundary를 살펴보자.

> 아래는 리액트 공식문서를 번역하여 정리한 내용이다.

리액트는 기본적으로 어플리케이션에서 `렌더링 중에` 에러를 던진다면 화면으로부터 UI를 지울 것이다. 이것을 방지하기 위해서는 컴포넌트들을 Error Boundary로 감싸야한다. Error Boundary는 특별한 컴포넌트이다. 이 컴포넌트는 에러로 인한 충돌일 발생했을 때, 에러를 잡아내서 fallback UI를 보여줄 수 있다.

Error Boundary는 클래스 컴포넌트로 구현된다. 이 때, `static getDerivedStateFromError()` 메서드를 제공해야 한다. 이 메서드를 통해 에러가 발생했을 때, 에러에 대한 응답으로 state를 업데이트할 수 있다. 또한 선택적으로 `componentDidCatch()`를 통해서 에러가 발생했을 때, 에러를 기록하거나 에러 리포팅 서비스에 에러를 기록할 수 있다.(에러에 관한 어떤 행위를 할 수 있다.)

아래는 Error Boundary를 구현한 예시이다.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // optional
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // ex) logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
```

> 현재는 함수 컴포넌트로 Error Boundary를 구현할 수 없다. 만약 매번 직접 위의 class component를 작성하고 싶지 않다면 [react-error-boundary](https://github.com/bvaughn/react-error-boundary) 라이브러리를 사용하면 된다.

## 🗂️ Error Boundary 적용해보기

- 작성 예정

### 참고

- [리액트 공식문서: 에러바운더리](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [벨로그: 에러 바운더리(Error Boundary)](https://velog.io/@bbaa3218/React-%EC%97%90%EB%9F%AC-%EB%B0%94%EC%9A%B4%EB%8D%94%EB%A6%ACError-Boundary)
- [카카오: React의 Error Boundary를 이용하여 효과적으로 에러 처리하기](https://fe-developers.kakaoent.com/2022/221110-error-boundary/)

```toc

```
