---
emoji: ⚛️
title: React 톺아보기를 톺아보기 - 1
date: '2023-10-14 16:30:00'
author: 제이든
tags: 글 문서 요약
categories: 스터디 아티클
---

이 글은 스터디에서 [리액트 톺아보기 1. Preview](https://goidle.github.io/react/in-depth-react-preview/)를 읽고 정리하며 주관적으로 정리한 글입니다. 글을 읽고 핵심적이거나 더 깊게 보고 싶은 부분을 정리하였습니다. 원문보다 더 가독성이 좋지 못할(?) 수 있으니 원문도 읽어보시는 것을 추천드립니다.

또한, 글을 읽고 이해한 내용을 바탕으로 작성한 글이기 때문에 틀린 내용이 있을 수 있습니다. 틀린 내용이 있다면 댓글로 알려주시면 감사하겠습니다.

# ⚛️ 리액트 톺아보기

## 왜 `리액트 톺아보기`를 보는가

Next.js를 통해 한층 더 추상화된 React를 사용하다보니, 아이러니하게도 React에 대한 더 깊은 이해가 필요하겠다는 갈증이 들었다. 리액트 공식문서도 혼자서 1번, 스터디에서 1번 읽었지만 뭐랄까... 전반적인 React의 컨셉과 api 사용법은 알겠으나 그 내부 구현에 대한 건 생각보다 깊이 있게 들어가기가 힘들었다. 그러던 중 `리액트 톺아보기` 글을 발견하였고 한국말로 정리된 글 중 가장 깊이있는 글이라고 생각하여 해당 글을 읽기로 했다! 부디 지금 내가 느끼는 리액트에 대한 갈증이 해결되었으면 좋겠다.

## 1. 글의 목적

리액트를 사용할 줄은 알지만, 아직도 리액트가 마법처럼 느껴지는 사람들을 위해 작성된 글이다.(나잖아..?) 그렇기에 리액트 응용, 에러 디버깅 등에 어려움을 겪을 수 있다.(난데..?)

시리즈는 유저와의 인터렉션으로부터 훅을 통해 컴포넌트가 업데이트되고 DOM에 마운트되기까지의 과정을 실제 코드를 까보면서 진행될 예정이다.

이 시리즈를 다 읽고나면 `Virtual DOM이 무엇인지, 컴포넌트 상태가 바뀌었을 때 리액트는 어떻게 해당 컴포넌트를 리렌더링시키는지, 어떻게 변경된 부분만 DOM에 마운트되는지, hook은 컴포넌트와 어떤 방식으로 매핑되어 사용되는지, 이벤트 구현은 어떻게 되어있는지 등`에 대한 큰 흐름을 이해할 수 있게 될 것이다. (🥳)

> 저자는 글에 들어가기 앞서 리액트 패키지 폴더구조와 그 안에 무엇이 있는지 간단하게 살펴볼 것을 권장하고 있다.

버전 16.3의 리액트 패키지 구조는 아래와 같다.

![리액트 패키지 폴더 구조](src/1-react-structure.png)

아래에도 나오겠지만, 일단 눈에 띄는 건 `react`, `react-dom`, `react-reconciler`, `scheduler`, `react-cache`, `events` 정도가 되지 않을까 싶다.

각 폴더를 들어가보면 아래와 같은 내용이 나온다.

`react`

```
React is a JavaScript library for creating user interfaces.
리액트는 UI를 생성하기 위한 라이브러리임

The react package contains only the functionality necessary to define React components. It is typically used together with a React renderer like react-dom for the web, or react-native for the native environments.
리액트 패키지는 오직 리액트 컴포넌트를 정의하기 위한 기능적 필요한 것들만 포함한다. 이건 보통 웹을 위한 react-dom이나 네이티브 환경을 위한 react-native와 함께 사용된다.

Note: by default, React will be in development mode. The development version includes extra warnings about common mistakes, whereas the production version includes extra performance optimizations and strips all error messages. Don't forget to use the production build when deploying your application.
```

`react-dom`

```
This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm.
이 패키지는 리액트를 위한 DOM과 서버 렌더러의 진입점 역할을 한다. 이건 보통 npm에 react로 배포되는 일반적인 리액트 패키지와 함께 사용된다.
```

`react-reconciler`

```
This is an experimental package for creating custom React renderers.
이건 커스텀 리액트 렌더러를 만들기 위한 실험적인 패키지임

Its API is not as stable as that of React, React Native, or React DOM, and does not follow the common versioning scheme.
이 패키지의 API는 React, React Native, React DOM보다 안정적이지 않고, 일반적인 버전 관리 방식을 따르지 않는다.

...? 일단 패스
```

`scheduler`

```
This is a package for cooperative scheduling in a browser environment. It is currently used internally by React, but we plan to make it more generic.
이건 브라우저 환경에서 협력적인 스케줄링을 위한 패키지임. 현재는 리액트 내부에서만 사용되지만, 더 일반적인 용도로 사용할 계획이다.

The public API for this package is not yet finalized.
이 패키지의 공개 API는 아직 최종화되지 않았다.

흠... 스케쥴러도 아직 뭔지는 잘 모르겠다. 패스
```

`react-cache`

```
A basic cache for React applications. It also serves as a reference for more advanced caching implementations.
리액트 애플리케이션을 위한 기본적인 캐시. 더 고급진 캐싱 구현을 위한 참고자료로도 사용된다.

This package is meant to be used alongside yet-to-be-released, experimental React features. It's unlikely to be useful in any other context.
이 패키지는 아직 릴리즈되지 않은 실험적인 리액트 기능들과 함께 사용하기 위해 만들어졌다. 다른 컨텍스트에서는 유용하지 않을 것이다.

Do not use in a real application. We're publishing this early for demonstration purposes.
진짜 애플리케이션에서는 사용하지 마라. 우리는 이걸 데모 목적으로 일찍 배포하고 있다.

여기도 아직은... (16버전이 나왔을 당시에는..!)
```

우선 위와 같은 역할들이 나누어져 있다는 것만 인지하고 시작해보자.

## 2. 리액트 패키지 구조

### react

- 컴포넌트 정의와 관련된 패키지
- React Element를 만드는 `createElement()`와 개발자에게 다른 패키지 모듈을 제공하는 중간 역할
- 다른 패키지에 대한 의존가 없기 때문에 여러 플랫폼에서 사용 가능

### renderer

- react-dom, react-native-renderer 등 호스트의 렌더링 환경에 의존하는 패키지
- 호스트와 react를 연결하는 역할

### event

- SyntheticEvent(합성 이벤트)라는 명칭으로 내부적으로 개발된 이벤트 시스템
- 개발자가 event를 제어하기 위해 기존 이벤트 시스템에 wrapping한 방식으로 이벤트 풀링, 이벤트 위임 등을 사용하여 구현됨

```
Chat GPT

리액트(React)에서 SyntheticEvent는 웹 애플리케이션 개발에서 이벤트 처리를 도와주는 중요한 개념 중 하나입니다. SyntheticEvent는 React에서 이벤트 처리를 추상화한 것으로, 웹 브라우저의 네이티브 이벤트를 래핑하여 제공합니다. 이를 통해 브라우저 간 호환성 문제를 해결하고, React 애플리케이션에서 이벤트 핸들링을 간단하게 만들어줍니다.

SyntheticEvent의 주요 특징과 동작 방식을 자세히 설명하겠습니다:

1. 브라우저 호환성 처리: SyntheticEvent는 브라우저 간 이벤트 핸들링의 차이를 추상화하므로, 다양한 브라우저에서 동일한 방식으로 이벤트를 처리할 수 있게 도와줍니다.

2. 이벤트 풀링(Event Pooling): React는 이벤트 풀링을 통해 SyntheticEvent를 재사용합니다. 이것은 이벤트가 처리된 후에 해당 이벤트 객체를 재설정하고 다시 사용할 수 있게 합니다. 이로 인해 메모리 사용량을 줄이고 성능을 향상시킵니다.

3. 이벤트 핸들러 작성: 컴포넌트에서 이벤트 핸들러를 작성할 때, SyntheticEvent를 사용하여 이벤트 정보에 접근할 수 있습니다. 예를 들어, 버튼 클릭 이벤트를 처리하는 핸들러 함수 내에서 `event.target`을 사용하여 이벤트가 발생한 DOM 요소에 접근할 수 있습니다.

4. 이벤트 전파 방지: SyntheticEvent를 사용하여 이벤트 전파를 조절할 수 있습니다. 예를 들어, `event.stopPropagation()`을 호출하여 이벤트의 상위 요소로의 전파를 막을 수 있습니다.

5. 동기 처리: SyntheticEvent는 비동기적으로 처리되지 않으며, 이벤트 핸들러가 실행 중일 때에만 유효합니다. 따라서 이벤트 핸들러 내에서 상태 업데이트 및 렌더링과 관련된 작업을 안전하게 수행할 수 있습니다.

간단히 말해, SyntheticEvent는 React에서 이벤트 처리를 간편하게 만들어주고 브라우저 간 호환성 문제를 처리하는데 도움을 주는 중요한 도구입니다. 이를 통해 React 애플리케이션을 더 효율적으로 작성하고 유지보수할 수 있습니다.
```

### scheduler

- 리액트는 여러가지 이유로 작업을 비동기로 진행함
- Task란 이름으로 우선순위에 따라 스케쥴링됨
- 이 때, Task를 실행하기에 가장 적절한 시점을 결정하는 것이 스케쥴러
- 즉, 리액트는 비동기 실행의 책임을 스케쥴러에게 위임하고 있다.
- 호스트 환경에 의존적이다.

### react-reconciler: 리액트의 VDOM과 관련된 패키지

- 리액트의 핵심 패키지
- v15 이전에는 `stack` 기반으로 구현
- v16 이후에는 `fiber architecture` 기반으로 구현

## 3. 용어 정리

### 컴포넌트 구분

- 스태틱 컴포넌트: 리액트에서 자체 제공하는 컴포넌트
- 호스트 컴포넌트: 플랫폼에서 제공하는 컴포넌트
- 커스텀 컴포넌트: 개발자가 직접 만든 컴포넌트

### 렌더링?

- 일반적으로 `컴포넌트 렌더링 === 컴포넌트 호출`
- 하지만 세부적으로 가면 여러 단계가 더 존재하기 때문에 세분화가 필요하다.
- 컴포넌트의 호출은 `reconciler`에서 한다. 그 다음 VDOM 재조정 과정이 진행되고 이후에 `renderer`에서 마운트를 한다. 즉, `컴포넌트의 호출 !== DOM 삽입`이다. 심지어 리액트에서는 DOM 삽입과 화면에 그려지는 것 또한 별개로 다룬다. 🤔

정리해보자면

- `렌더링`: 컴포넌트가 호출되어 자식을 반환하고 VDOM에 적용하는 과정 => reconciler가 하는 일
- `마운트`: VDOM을 실제 DOM에 적용하는 과정 => renderer가 하는 일
- `페인트`: 브라우저가 마운트된 DOM을 화면에 그리는 과정

흠... 흔히 우리가 리액트에서 `렌더링이 일어난다`고 표현하는 것도 개발자마다 조금씩 다른 느낌으로 쓰는 것 같다. 위의 정의대로 일단 기억하도록 하자!!

> `컴포넌트 호출`: 그저 React Element를 반환하는 함수를 호출하는 것! 그 이상도, 그 이하도 아니다.

### Virtual DOM(VDOM; 가상돔)

1. reactElement, fiber

   - reactElement: 컴포넌트의 정보를 담은 모델 `객체`, 컴포넌트가 반환하는 것은 JSX가 아니라 reactElement(객체)이다.
   - fiber: VDOM의 노드 객체, reactElement를 VDOM에 올리기 위해 확장한 객체이다. fiber를 통해 컴포넌트의 상태, 훅, 라이프 사이클 등 대부분의 것들이 관리된다.
     - (GPT) 컴포넌트의 정보를 담은 모델 `트리`, 컴포넌트의 정보를 담은 reactElement를 트리 구조로 관리하는 것이 fiber이다.

2. current, workInProgress

- 리액트는 더블 버퍼링 형태로 VDOM을 설계하였다.
- current: 마운트가 끝난 트리 => 현재 VDOM
- workInProgress: 업데이트가 적용중인 트리 => 변경된(변경 중인) VDOM

> 버퍼란 `어떤 장치에서 다른 장치로 데이터를 송신할 때 일어나는 시간의 차이나 데이터 흐름의 속도 차이를 조정하기 위해 일시적으로 데이터를 기억시키는 장치`이다.([위키백과](https://ko.wikipedia.org/wiki/%EB%8B%A4%EC%A4%91_%EB%B2%84%ED%8D%BC%EB%A7%81))<br/>
> 더블 버퍼링이란 `데이터를 기억시키는 장치를 2개 사용하여 데이터를 송신하는 장치와 수신하는 장치의 속도 차이를 조정하는 방식`이다.<br/>
> 즉, 리액트의 VDOM은 현재의 VDOM과 변경 중인 VDOM을 따로 관리하여 변경 중인 VDOM이 완성되면 현재의 VDOM과 교체하는 방식으로 동작한다.

# 출처

- [리액트 톺아보기 1. Preview](https://goidle.github.io/react/in-depth-react-preview/)
- [React v16.3.0 packages](https://github.com/facebook/react/tree/16.3-dev/packages)
- [위키백과: 버퍼](https://ko.wikipedia.org/wiki/%EB%8B%A4%EC%A4%91_%EB%B2%84%ED%8D%BC%EB%A7%81)
- [더블 버퍼링이란](https://coding-factory.tistory.com/692)

```toc

```
