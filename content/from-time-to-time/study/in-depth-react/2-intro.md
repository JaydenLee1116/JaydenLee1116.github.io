---
emoji: ⚛️
title: React 톺아보기를 톺아보기 - 2
date: '2023-10-14 20:30:00'
author: 제이든
tags: 글 문서 요약
categories: 스터디 아티클
---

이 글은 스터디에서 [리액트 톺아보기 2. Intro](https://goidle.github.io/react/in-depth-react-intro/)를 읽고 정리하며 주관적으로 정리한 글입니다. 글을 읽고 핵심적이거나 더 깊게 보고 싶은 부분을 정리하였습니다. 원문보다 더 가독성이 좋지 못할(?) 수 있으니 원문도 읽어보시는 것을 추천드립니다.

또한, 글을 읽고 이해한 내용을 바탕으로 작성한 글이기 때문에 틀린 내용이 있을 수 있습니다. 틀린 내용이 있다면 댓글로 알려주시면 감사하겠습니다.

# ⚛️ 리액트 톺아보기

## 왜 `리액트 톺아보기`를 보는가

Next.js를 통해 한층 더 추상화된 React를 사용하다보니, 아이러니하게도 React에 대한 더 깊은 이해가 필요하겠다는 갈증이 들었다. 리액트 공식문서도 혼자서 1번, 스터디에서 1번 읽었지만 뭐랄까... 전반적인 React의 컨셉과 api 사용법은 알겠으나 그 내부 구현에 대한 건 생각보다 깊이 있게 들어가기가 힘들었다. 그러던 중 `리액트 톺아보기` 글을 발견하였고 한국말로 정리된 글 중 가장 깊이있는 글이라고 생각하여 해당 글을 읽기로 했다! 부디 지금 내가 느끼는 리액트에 대한 갈증이 해결되었으면 좋겠다.

![리액트 사이클](https://goidle.github.io/static/83aa2072b273a11e7b733979b439d735/ea64c/react-lifescycle.png)

## 1. Render phase

- 간단히 말하자면 `VDOM 조작 단계`
- 리액트는 element의 추가, 수정, 삭제와 같은 변경점이 생겼을 때, 이를 VDOM에 반영하는 과정을 거친다.
- 이 때, `Work`를 담당하는 함수를 `scheduler`를 통해 실행시킨다.

  - Work란 `reconciler`가 `컴포넌트의 변경을 DOM에 적용하기 위해 수행하는 작업`을 의미함. 이 Work를 통해 Render phase, Commit phase가 진행된다.

- Render phase는 VDOM을 재조정하는 일련의 과정을 말한다.
- 재조정을 담당하는 `reconciler`의 설계가 `stack 기반에서 fiber기반으로 변경되면서` 해당 과정을 abort(중단), stop(일시정지), restart(재시작) 등의 기능을 제공할 수 있게 되었다.
- 위의 기능은 `concurrent mode(동시 모드)`에서만 비동기와 함께 이루어지고 우리가 일반적으로 사용하는 mode(React.render())에서는 동기적으로 Render phase가 진행된다.

> Concurrent란? (vs Parallel)<br/>
> Concurrent는 흔히 `동시성`, Parallel은 `병렬성`으로 표현된다. 둘의 차이는 `동시성은 하나의 코어에서 여러 작업을 번갈아가며 수행하는 것`을 의미하고, `병렬성은 여러 코어에서 여러 작업을 동시에 수행하는 것`을 의미한다. 즉, Concurrent는 `동시에 여러 작업을 수행하는 것처럼 보이는 것`을 의미한다.

(Chat gpt)

```
동시성(Concurrency)과 병렬성(Parallelism)은 두 가지 다른 개념으로, 프로그래밍 및 컴퓨터 시스템에서 중요한 역할을 합니다. 이 두 용어의 차이를 쉽게 설명하겠습니다:

1. 동시성(Concurrency):
   - 동시성은 여러 작업 또는 일련의 작업이 동시에 실행되는 것처럼 보이는 것을 의미합니다.
   - 하나의 작업이 진행 중에 다른 작업이 일어날 수 있고, 작업들 간에 전환을 할 수 있습니다.
   - 실제로는 하나의 CPU 코어에서 번갈아가며 여러 작업을 조금씩 처리합니다.
   - 동시성은 주로 I/O 작업(예: 파일 읽기, 네트워크 요청)과 같이 대기 시간이 발생하는 작업을 효율적으로 처리하는 데 사용됩니다.

2. 병렬성(Parallelism):
   - 병렬성은 여러 작업이 동시에 실제로 독립적인 CPU 코어에서 실행되는 것을 의미합니다.
   - 병렬적으로 실행되는 작업들은 동시에 진행되며, 독립적으로 실행되기 때문에 서로 영향을 주지 않습니다.
   - 병렬성은 다중 코어 CPU 시스템에서 주로 발휘되며, 계산 집약적인 작업(예: 병렬 계산, 렌더링)을 효율적으로 처리하는 데 사용됩니다.

간단히 말하면, 동시성은 여러 작업을 번갈아가며 처리하면서 전환할 수 있는 것을 의미하며, 병렬성은 독립적으로 실행되는 작업을 동시에 처리하는 것을 의미합니다. 이 두 가지 개념은 작업 처리 방식과 하드웨어 환경에 따라 다르게 적용되며, 특정 문제를 효율적으로 해결하기 위해 선택됩니다.
```

(추가) 현재 리액트 18버전을 기준으로는 concurrent mode라는 mode는 따로 존재하지 않는다. 대신 concurrent features(동시 기능들)을 기본적으로 제공한다.

- 1. Concurrent Mode(동시성 모드): Concurrent Features의 핵심입니다. 이 모드에서 리액트는 렌더링 작업을 여러 단계로 나누어 처리하여 더 빠른 렌더링과 반응성을 제공합니다. 예를 들어, 렌더링 작업이 진행 중일 때에도 우선순위가 낮은 다른 작업(예: 사용자 입력 처리)이 중단되지 않고 실행됩니다.

- 2. Suspense(중단): Suspense는 데이터 로딩 및 코드 분할과 같은 비동기 작업을 처리할 때 사용됩니다. 리액트 18에서는 Suspense를 사용하여 데이터를 미리 로딩하고 로딩이 완료될 때까지 대기하거나 대체 컨텐츠를 표시할 수 있습니다.

- 3. Error Boundaries(에러 경계): Concurrent Mode에서는 Error Boundaries가 더욱 강화되었습니다. 에러 경계는 컴포넌트 내에서 발생하는 예외를 캐치하고 처리할 수 있도록 도와줍니다. 이를 통해 애플리케이션의 안정성을 향상시킬 수 있습니다.

- 4. React Server Components: 이것은 리액트 18에서 실험적으로 도입된 기능 중 하나로, 서버 측에서 렌더링되는 컴포넌트를 관리하고 클라이언트와 협력하여 더 나은 성능을 제공합니다.

즉, 위와 같이 concurrent features를 통해서 애플리케이션의 성능과 사용자 경험을 향상시킬 수 있다. 비동기 데이터 로딩, 코드 분할이나 렌더링 중단과 같은 복잡한 작업을 효율적으로 처리할 수 있게 도와준다. 또한 이런 기능들은 개발자 경험 또한 향상시킬 수 있다.(예를 들어 useEffect로 데이터를 fetch 해와서 state로 변경한 뒤에 렌더링을 해야만 했던 걸 Suspense와 같은 기능을 사용해서 해결한다든지!)

- 1편에서 말했듯 `컴포넌트 호출`은 `Render phase`에서 실행이 되고 호출은 화면 반영을 나타내는 것이 아님
- 1편에서 말했던 `렌더링`에 빗대어 설명하면 `컴포넌트가 렌더링 혹은 리렌더링된다`는 것은 `컴포넌트가 호출되어 VDOM에 반영된다`는 것을 의미한다. 즉, DOM에 마운트되어 페인트된다는 의미가 아니다!

## 2. Commit phase

- 간단히 말하자면 `재조정된 VDOM을 DOM에 적용하고 라이프 사이클을 실행하는 단계`
  - VDOM이 DOM에 적용되는 것이지 페인트가 되는 것이 아니다!
- 항상 일관적인 화면 업데이트를 위해서 동기적으로 실행된다.
- 동기적으로 실행된다는 의미는 콜스택을 한 번도 비우지 않고 DOM 조작을 처리한다는 의미이다.
- 즉, Commit phase 중간에 페인트가 일어나지 않는다. 페인트는 Commit phase가 끝난 뒤 콜스택을 비워야지만 브라우저에서 화면을 페인트할 수 있게 된다.

(Chat GPT): Mount와 Commit은 동일한 건가?

```
리액트에서 "mount"와 "commit"은 서로 다른 단계를 나타냅니다. 이 두 개념은 React 컴포넌트의 라이프사이클과 렌더링 프로세스에서 발생하는 다른 시점을 나타냅니다.

1. Mount(마운트):
   - "마운트"는 React 컴포넌트가 처음으로 생성되고 DOM에 삽입되는 시점을 가리킵니다.
   - 컴포넌트의 생명주기(Lifecycle) 메서드 중 `componentDidMount`가 이 시점에 호출됩니다.
   - 주로 초기화 작업 및 외부 데이터 로딩과 같은 작업을 수행합니다.
   - 사용자에게 보여지기 직전에 발생하므로, 컴포넌트가 실제로 화면에 표시되기 전에 실행됩니다.

2. Commit(커밋):
   - "커밋"은 Virtual DOM의 재조정 결과를 실제 DOM에 적용하고 라이프사이클 메서드를 실행하는 단계를 가리킵니다.
   - 재조정된 Virtual DOM의 변경 사항을 실제 DOM에 반영하고, 이후 라이프사이클 메서드 중 `componentDidUpdate`가 호출됩니다.
   - 주로 업데이트와 관련된 작업을 수행하며, 컴포넌트가 화면에 이미 표시되어 있을 때 호출됩니다.
   - 컴포넌트의 상태나 속성이 변경될 때마다 발생합니다.

요약하면, "마운트"와 "커밋"은 React 컴포넌트 라이프사이클에서 서로 다른 시점에 발생하는 단계입니다. "마운트"는 컴포넌트가 처음으로 생성되고 화면에 표시되는 시점에 관련되며, "커밋"은 컴포넌트가 이미 화면에 표시되어 있는 상태에서 상태나 속성이 변경되어 재조정 및 업데이트가 필요한 시점에 관련됩니다.
```

## 3. VDOM(Virtual DOM)

![VDOM](https://goidle.github.io/static/258b43ce623e7b6340fc6aed969199ed/374ac/vDOM.png)

> current tree와 workInProgress tree의 최상단 노드는 엄밀히 Host root node라고 부른다.

- 앞에서 이야기 했듯이 리액트는 VDOM을 더블 버퍼링 형태로 관리한다.
  - current tree: 현재 DOM에 마운트되어 있는 tree
  - workInProgress tree: 현재 변경 중인 tree 즉, Render phase에서 작업중인 tree
    - 이 tree가 Commit phase를 지나 (DOM에 적용되면) current tree가 된다.
  - 더블 버퍼링 형태로 관리하는 이유는 변경 중인 tree가 완성되기 전까지는 사용자에게 보여주지 않기 위함이다.
    - workInProgress에 작업을 하다가도 언제든지 중단하고 다시 작업하거나 중지시켰다가 다시 시작할 수 있다.
    - 즉, 변경 중인 tree가 완성되기 전까지는 사용자에게 보여주지 않는다.
- workInProgress tree는 current tree에서 자기 복제하여 서로를 alternate로 참조하는 방식이다.
- `VDOM 노드`(이게 바로 `fiber`)는 자식을 first child만 참조한다. 그리고 나머지 자식들은 이 first child가 sibling으로 참조하고 있다.
- 모든 자식 노드는 부모를 return으로 참조하고 있다.(`진짜 자식 fiber의 return이라는 속성이 부모 fiber를 참조한다는 의미`)

(Chat GPT): current tree와 workInProgress tree의 복제는 얕은 복사? 깊은 복사?

```
"workInProgress"가 "current"를 복제할 때, 실제로는 얕은 복사(Shallow Copy)를 사용합니다. 얕은 복사는 객체의 내부 구조를 완전히 복사하지 않고 참조만을 복제하는 방식입니다. 이것은 메모리 효율적이며 빠르게 복사할 수 있습니다.

실제로 "workInProgress"와 "current"는 가상 DOM의 구조를 공유하면서, 변경 사항만을 반영합니다. 이렇게 하면 메모리 사용량을 줄이고 렌더링 프로세스를 빠르게 처리할 수 있습니다.

얕은 복사를 사용하므로, "workInProgress"의 변경 사항이 "current"에 영향을 주게 되면서 두 구조가 서로 "alternate"로 교체되는 방식으로 작동합니다. 이러한 동작은 리액트의 효율적인 업데이트와 렌더링을 가능하게 합니다.
```

> 흠... 그런데 어떻게 변경 사항을 workInProgress에서만 반영하고 current에는 아직 반영하지 않을 수 있지..? 동일한 노드를 참조하고 있으면 동일한 메모리를 참조하는 거고 그러면 current에도 반영되지 않을까? 🤔 구글링, 지피팅을 해봐도 명확한 답이 안나온다... 좀더 해외 자료를 찾아보는 게 좋겠다.

## 4. React element

- React element는 컴포넌트의 정보를 담고 있는 모델 객체

```js
const App = ({ content }) => <div>{content}</div>;
ReactDOM.render(<App key="1" content="Deep dive react" />, container);

const element = {
  // React element를 고유하게 식별할 수 있도록 해주는 태그
  $$typeof: REACT_ELEMENT_TYPE,

  // 리액트에서 자체적으로 제공하는 속성
  type: type, // function App()
  key: key, // 1
  props: props, // { content: 'deep dive react' }
  ref: ref, // undefined
};
```

- 우리가 return하는 `JSX`는 `React element`가 아니라 `React element`를 반환하는 `함수`이다.
  - 즉, `JSX` => `react.createElement()` => `React element` 의 과정을 거친다.
  - type에는 컴포넌트의 종류에 따라 다른 값이 사용되는데, 호스트 컴포넌트는 문자열(tag 이름 ex. div, span, button...), 커스텀 컴포넌트는 함수 자체가 사용된다.
  - JSX를 통해 트개의 attribute를 전달할 때 key, ref는 props에 포함되지 않는다.(나머지는 props로 관리한다.)

## 5. Fiber

- 자, 이제 위에서 반환된 React element를 VDOM에 올려야하는데, 그 확장을 `fiber`가 한다.
- 즉, `fiber`는 `VDOM의 노드 객체`이며 컴포넌트가 살아 숨쉬기 위해 모든 정보를 관리하고 있다!!!

```js
// react-reconciler > ReactFiber.js

function FiberNode(tag, pendingProps, key) {
  // Instance
  this.tag = tag; // fiber의 종류를 나타냄
  this.key = key;
  this.type = null; // 추후에 React element의 type을 저장
  this.stateNode = null; // 호스트 컴포넌트에 대응되는 HTML element를 저장

  // Fiber
  this.return = null; // 부모 fiber
  this.child = null; // 자식 fiber
  this.sibling = null; // 형제 fiber
  this.index = 0; // 형제들 사이에서의 자신의 위치

  this.pendingProps = pendingProps; // workInProgress는 아직 작업이 끝난 상태가 아니므로 props를 pending으로 관리
  this.memoizedProps = null; // Render phase가 끝나면 pendingProps는 memoizedProps로 관리
  this.updateQueue = null; // 컴포넌트 종류에 따라 element의 변경점 또는 라이프사이클을 저장
  this.memoizedState = null; // 함수형 컴포넌트는 훅을 통해 상태를 관리하므로 hook 리스트가 저장된다.

  // Effects
  this.effectTag = NoEffect; // fiber가 가지고 있는 side effect를 기록
  this.nextEffect = null; // side effect list
  this.firstEffect = null; // side effect list
  this.lastEffect = null; // side effect list

  this.expirationTime = NoWork; // 컴포넌트 업데이트 발생 시간을 기록
  this.childExpirationTime = NoWork; // 서브 트리에서 업데이트가 발생할 경우 기록

  this.alternate = null; // 반대편 fiber를 참조
}
```

(추가) 궁금해서 React 16.3 버전의 패키지를 찾아봤다. [참고 - Fiber](https://github.com/facebook/react/blob/16.3-dev/packages/react-reconciler/src/ReactFiber.js)

그리고 아래의 경로에서 Fiber의 type을 확인할 수 있었다. 해당 type에 달려있는 주석을 간단하게 번역해보았다.

```js
// react/packages/react-reconciler/src/ReactFiber.js

// Fiber는 컴포넌트에서 수행해야 할 작업 또는 수행된 작업이다. 컴포넌트 당 하나 이상의 Fiber가 있을 수 있다.
export type Fiber = {|
  // 이 첫 번째 필드들은 개념적으로 Instance의 멤버이다. 이것은 이전에 별도의 타입으로 분리되어 다른 Fiber 필드와 교차되었지만, Flow가 교차 버그를 수정할 때까지 하나의 타입으로 병합했다.

  // Instance는 컴포넌트의 모든 버전에서 공유된다. 우리는 이것을 별도의 객체로 쉽게 분리할 수 있다. 트리의 대체 버전에 너무 많은 복사를 피하기 위해. 우리는 초기 렌더링 중에 생성되는 객체의 수를 최소화하기 위해 일단 하나의 객체에 넣었다.

  // fiber의 종류 식별자
  tag: WorkTag,

  // 이 child의 고유 식별자
  key: null | string,

  // 이 child의 reconciliation 중에 identity를 보존하는 데 사용되는 element.type의 값
  elementType: any,

  // 이 fiber와 연관된 함수/클래스
  type: any,

  // 번역: 이 fiber와 연관된 local state
  stateNode: any,

  // Conceptual aliases
  // 부모는 Instance -> return이다. 우리는 fiber와 instance를 병합했기 때문에 부모는 return fiber와 동일하다

  // 나머지 필드는 Fiber에 속한다.

  // 이것을 처리한 후에 반환할 Fiber
  // 이것은 사실상 부모이지만, 부모가 여러 개(두 개)일 수 있다
  // 그래서 이것은 우리가 현재 처리하고 있는 것의 부모에 불과하다
  // 이것은 개념적으로 스택 프레임의 반환 주소와 동일하다
  return: Fiber | null,

  // 단일 연결 리스트 트리 구조 => 위에서 설명한 구조네!!!
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,

  // 여기서부턴 번역 생략... 영어로 보는 게 더 좋을 것 같다.

  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  ref: null | (((handle: mixed) => void) & { _stringRef: ?string }) | RefObject,

  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any, // This type will be more specific once we overload the tag.
  memoizedProps: any, // The props used to create the output.

  // A queue of state updates and callbacks.
  updateQueue: UpdateQueue<any> | null,

  // The state used to create the output
  memoizedState: any,

  // A linked-list of contexts that this fiber depends on
  firstContextDependency: ContextDependency<mixed> | null,

  // Bitfield that describes properties about the fiber and its subtree. E.g.
  // the ConcurrentMode flag indicates whether the subtree should be async-by-
  // default. When a fiber is created, it inherits the mode of its
  // parent. Additional flags can be set at creation time, but after that the
  // value should remain unchanged throughout the fiber's lifetime, particularly
  // before its child fibers are created.
  mode: TypeOfMode,

  // Effect
  effectTag: SideEffectTag,

  // Singly linked list fast path to the next fiber with side-effects.
  nextEffect: Fiber | null,

  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  // Represents a time in the future by which this work should be completed.
  // Does not include work found in its subtree.
  expirationTime: ExpirationTime,

  // This is used to quickly determine if a subtree has no pending changes.
  childExpirationTime: ExpirationTime,

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  alternate: Fiber | null,

  // Time spent rendering this Fiber and its descendants for the current update.
  // This tells us how well the tree makes use of sCU for memoization.
  // It is reset to 0 each time we render and only updated when we don't bailout.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualDuration?: number,

  // If the Fiber is currently active in the "render" phase,
  // This marks the time at which the work began.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualStartTime?: number,

  // Duration of the most recent render time for this Fiber.
  // This value is not updated when we bailout for memoization purposes.
  // This field is only set when the enableProfilerTimer flag is enabled.
  selfBaseDuration?: number,

  // Sum of base times for all descedents of this Fiber.
  // This value bubbles up during the "complete" phase.
  // This field is only set when the enableProfilerTimer flag is enabled.
  treeBaseDuration?: number,

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | null,
  _debugIsCurrentlyTiming?: boolean,
|};
```

## 6. Side effect

- VDOM에서 변경점(추가, 수정, 삭제 등)을 만들거나 만들어낼 수도 있는 작업(라이프 사이클)을 의미
- 아래는 리액트에서 사용되는 side effect tag

```js
// shared > ReactSideEffectTags.js

export const NoEffect = /                / 0b0000000000000;
export const PerformedWork = /           / 0b0000000000001;
export const Placement = /               / 0b0000000000010;
export const Update = /                  / 0b0000000000100;
export const PlacementAndUpdate = /      / 0b0000000000110;
export const Deletion = /                / 0b0000000001000;
export const ContentReset = /            / 0b0000000010000;
export const Passive = /                 / 0b0001000000000;
/*...*/
```

이것도 궁금해서 직접 들어가봤다. [참고 Side effect tags](https://github.com/facebook/react/blob/16.3-dev/packages/shared/ReactSideEffectTags.js)

```js
export type SideEffectTag = number;

// Don't change these two values. They're used by React Dev Tools.
export const NoEffect = /*              */ 0b000000000000;
export const PerformedWork = /*         */ 0b000000000001;

// You can change the rest (and add more).
export const Placement = /*             */ 0b000000000010;
export const Update = /*                */ 0b000000000100;
export const PlacementAndUpdate = /*    */ 0b000000000110;
export const Deletion = /*              */ 0b000000001000;
export const ContentReset = /*          */ 0b000000010000;
export const Callback = /*              */ 0b000000100000;
export const DidCapture = /*            */ 0b000001000000;
export const Ref = /*                   */ 0b000010000000;
export const Snapshot = /*              */ 0b000100000000;
export const Passive = /*               */ 0b001000000000;

// Passive & Update & Callback & Ref & Snapshot
export const LifecycleEffectMask = /*   */ 0b001110100100;

// Union of all host effects
export const HostEffectMask = /*        */ 0b001111111111;

export const Incomplete = /*            */ 0b010000000000;
export const ShouldCapture = /*         */ 0b100000000000;
```

(Chat GPT) 흠... 근데 왜 굳이 이진수로 표현했을까..?

```
리액트 소스 코드에서 side effect (부수 효과) 태그를 이진수로 표현하는 이유는 성능 및 메모리 최적화와 관련이 있습니다. 이진수로 표현함으로써 비트 단위로 각 태그를 활성화 또는 비활성화할 수 있으므로, 메모리 사용을 최적화하고 연산을 빠르게 수행할 수 있습니다.

여기에 몇 가지 이유와 장점이 있습니다:

메모리 최적화: 이진수 표현을 사용하면 각 태그가 메모리에서 고정된 크기를 차지합니다. 이는 리액트가 메모리를 효율적으로 관리할 수 있도록 도와줍니다.

비트 연산의 효율성: 이진수로 표현된 값을 비트 단위로 검사하고 조작할 수 있습니다. 예를 들어, 여러 태그를 병합하거나 필터링하는 등의 작업을 빠르게 수행할 수 있습니다.

디버깅 및 툴 지원: 개발자 도구와 같은 도구들이 이진수로 표현된 값을 해석하고 시각적으로 표현할 수 있습니다. 예를 들어, 이진수 플래그를 디버깅 시에 쉽게 추적하고 이해할 수 있습니다.

확장성: 새로운 태그가 추가될 때 이진수로 표현된 값을 확장하기가 비교적 쉽습니다. 비트 단위로 조작하므로 새로운 태그를 추가하는 데 비교적 적은 노력이 필요합니다.

이진수 표현은 리액트 내부에서 side effect를 효과적으로 관리하고 최적화하는 데 도움을 주는 중요한 기술적 결정 중 하나입니다.
```

- (다시 돌아와서) 이 tag 값들은 fiber의 `effectTag`에 저장된다.
- 해당 tag(위의 tag들)가 달린 fiber는 effect로 취급되어 연결 리스트의 상위로 엮어져 올라가게 된다.
- 최종적으로 최상위 fiber가 하위의 모든 effect를 가지고 있게 되어 Commit phase에서 이를 처리하게 된다.

```js
// 자식의 side effect를 부모로 올린다.
// returnFiber: 부모 fiber, workInProgress: 자식 fiber
if (returnFiber.firstEffect === null) {
  returnFiber.firstEffect = workInProgress.firstEffect;
}
if (workInProgress.lastEffect !== null) {
  if (returnFiber.lastEffect !== null) {
    returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
  }
  returnFiber.lastEffect = workInProgress.lastEffect;
}

// 자신에게도 side effect가 있다면 자기 자신도 effect list에 추가해준다.
if (effectTag > PerformedWork) {
  if (returnFiber.lastEffect !== null) {
    returnFiber.lastEffect.nextEffect = workInProgress;
  } else {
    returnFiber.firstEffect = workInProgress;
  }
  returnFiber.lastEffect = workInProgress;
}
```

> 위의 로직 순서를 보면 알 수 있듯이 effect list는 자식의 effect list를 부모의 effect list에 연결하는 방식으로 구현되어 있다. 이 때, 자식을 먼저 연결한 뒤에 자신을 연결하는 이유는 자식의 effect list가 부모의 effect list보다 먼저 처리되어야 하기 때문이다. 즉, 부모의 effect list는 자식의 effect list보다 나중에 처리되어야 한다. (부모의 effect list가 먼저 처리되면 자식의 effect list가 처리되지 않은 상태에서 부모의 effect list에 의해 DOM이 변경되어 버린다.) 즉, DFS 방식으로 처리되는 것이다.<br/>
> 위의 과정은 Commit phase에서 일어나는 일이다. 이 때, effect list는 side effect를 처리하는 순서를 나타낸다. 즉, effect list의 순서는 side effect의 처리 순서를 나타낸다.

## 7. Bit Masking

- 비트 마스킹은 비트 연산을 통해 특정 비트를 0 또는 1로 설정하는 기법을 의미한다.
- 리액트에선느 effect tag, 여러 상태 값들을 비트 마스킹을 통해 관리한다.
- 현재 실행되고 있는 환경을 나타내는 `context` 또한 비트 마스킹을 통해 관리한다.
  - render context: 16 즉, 10000 => 5번째 자리가 1이면 Render phase에서 실행 중
  - commit context: 32 즉, 100000 => 6번째 자리가 1이면 Commit phase에서 실행 중

이렇게 비트 마스킹을 하는 이유는 비트 연산자를 통해서 특정 비트가 0인지 1인지 확인할 수 있기 때문이다.

- 상태값 확인: and(&) 연산자를 통해 특정 비트가 0인지 1인지 확인할 수 있다.
- 상태값 설정: or(|) 연산자를 통해 특정 비트를 0 또는 1로 설정할 수 있다.
- 상태값 제거: xor(~) 연산자를 통해 특정 비트를 0으로 설정할 수 있다.

예시)

```js
let NoContext = 0b00;
let RenderContext = 0b01;
let CommitContext = 0b10;
let executionContext = NoContext; // 0

// Render phase에서 접어들어 현재 context를 render context로 설정
executionContext |= RenderContext; // 00 | 01 => 01

// 현재 context에 따라 분기처리
// executionContext를 특정 context와 and 처리했을 때, NoContext가 아니라면 특정 context라는 의미!
if (executionContext & (RenderContext !== NoContext)) {
  // Render phase
} else if (executionContext & (CommitContext !== NoContext)) {
  // Commit phase
}

// Render phase가 끝나고 Commit phase에 접어들면 이전 context를 지우고 다음 context를 설정
executionContext &= ~RenderContext; // 01 & ~01 => 00
executionContext |= CommitContext; // 00 | 10 => 10

// 리액트에서의 실제 사용 사례
if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
  //현재 context가 Render phase이거나 Commit phase이면
  return msToExpirationTime(now());
}
```

# 후기...

미쳤다...... 이걸 안다고 해서 리액트 코드를 잘 짤 수 있는 건 아니지만, 이전에는 리액트가 정말 단순하게 옵저버 패턴과 클로저로 구현되어있다... 는 정도만 추상적으로 머리에 있었는데!!!!!! 와... 쉬운 내용은 아니지만 하나하나 열심히 까보니까 정말 재미있고 도움이 많이 된다!!!!!!

# 출처

- [리액트 톺아보기 2. Intro](https://goidle.github.io/react/in-depth-react-intro/)
- [Concurrent vs Parallel](https://m.blog.naver.com/jjoommnn/130036290769)
- [React v16.3.0 packages](https://github.com/facebook/react/tree/16.3-dev/packages)
- [참고 - Fiber](https://github.com/facebook/react/blob/16.3-dev/packages/react-reconciler/src/ReactFiber.js)
- [참고 - Side effect tags](https://github.com/facebook/react/blob/16.3-dev/packages/shared/ReactSideEffectTags.js)

```toc

```
