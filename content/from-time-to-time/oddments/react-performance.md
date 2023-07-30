---
emoji: 📦
title: useEffect vs useMemo vs useCallback vs useRef vs React.memo
date: '2023-05-02 16:20:00'
author: 제이든
tags:
categories: 잡동사니
---

## 📦 잡동사니

하나의 키워드를 잡고 좀 편하게 정리하고 싶어 만든 `잡동사니`<br/>

> 잡동사니는 조선 후기 학자 `안정복`이 편찬한 `잡동산이(雜同散異)`에서 유래된 말이다.<br/>
> 잡동산이는 `잡기(雜記)`의 형태를 빌려온 책으로 구체적인 체계가 잡혀있지 않은 형식이다.<br/>
> 항목이 다소 난잡하고 내용의 구분이 혼동되어있다고 한다. 🤣

## 🗂️ useEffect vs useMemo vs useCallback vs useRef vs React.memo

- 훅들을 다시 복습하는데... 이 녀석들 정말 묘하게 아주 묘하게 다르다.
- 각각의 목적 그리고 이름에 담긴 의미, 활용을 간단하게 기록해두려 한다.

### useEffect

- 여기서 Effect란 `Side Effect`를 의미한다.
- 리액트는 렌더링 결과물을 화면에 반영하는 것이 주목적이다.
- 이 때, 렌더링과 무관한 작업들을 `Side Effect`라고 할 수 있다.
- `useEffect`는 이러한 `Side Effect`를 수행하기 위해 사용한다.
- 예를 들어 `useEffect`를 사용하여 `fetch` 요청을 보내거나, `로그`를 남기거나, `타이머`를 설정할 수 있다.

```jsx
import { useEffect } from 'react';

function Example() {
  // ...
  useEffect(() => {
    fetch('https://api.example.com/items')
      .then((res) => res.json())
      .then((data) => {});
    return () => {
      // cleanup
    };
  }, [x]);
  return <div></div>;
}
```

위의 예시 코드에서 useEffect 내의 함수는 `fetch` 요청을 보내고, `cleanup` 함수를 반환한다.
이 때, x가 없이 빈 배열이라면 첫 mount 때 fetch 함수가 실행되고 unmount 때 cleanup 함수가 실행된다.
x가 있을 경우, 첫 마운트 때 그리고 x가 변경될 때마다 fetch 함수가 실행되고, x가 변경되기 직전에 그리고 unmount 때 cleanup 함수가 실행된다.

즉, useEffect는 렌더링과 무관한 작업을 수행하기 위해 사용되는 hook이다.

### useMemo

- Memo란 Memory의 약자로, `메모리`를 의미한다. 즉, 잠시 기억해두기 위한 용도로 사용된다.
- useMemo는 전달되는 함수의 반환값을 기억한다.

```jsx
const memoValue = useMemo(() => {
  return 'memo value!';
}, [x]);
```

- x의 값이 변경되기 전까지는 'memo value!'를 기억하고 있다가, x의 값이 변경되면 다시 함수를 실행하여 반환값을 기억한다.
- 파라미터로 전달된 `콜백 함수가 실행되어 반환하는 값`을 기억한다.

### useCallback

- Callback이란 `함수`를 의미한다. 즉, 함수를 기억하기 위한 용도로 사용된다.

```jsx
const callback = useCallback(() => {
  return 'callback function!';
}, [x]);
```

- x의 값이 변경되기 전까지는 `전달된 콜백 함수 자체를 기억`하고 있다가, x의 값이 변경되면 다시 그 콜백 함수를 기억한다.

```jsx
const memoCallback = useMemo(
  () => () => {
    return 'callback function!';
  },
  [x],
);
```

- useMemo를 통해 콜백 함수를 기억하고, 그 콜백 함수를 useCallback을 통해 기억하는 것과 동일하다.

### useRef

- Ref란 `참조`를 의미한다. 즉, 참조를 위한 용도로 사용된다.
- useRef는 전달되는 값의 `참조`를 기억한다.

```jsx
const ref = useRef('ref value!');

// ref.current === 'ref value!'
```

- ref.current는 전달된 값의 참조를 기억한다.
- ref.current는 변경되지 않는다.(디펜던시가 없다.)
- 주로 `DOM`을 참조하기 위해 사용된다.

### React.memo

- 컴포넌트를 화살표 함수로 작성했을 때 사용 가능하다.
- 해당 컴포넌트 자체의 `렌더링 결과물`을 기억한다.
- 변수가 변경되지 않는 한, 해당 컴포넌트는 다시 렌더링되지 않는다.

```jsx
const MemoComponent = React.memo(({ value, handleFunction }) => {
  return <div>MemoComponent</div>;
});
```

- value와 handleFunction이 변경되지 않는 한, MemoComponent는 다시 렌더링되지 않는다.
- value는 변경되지 않지만, handleFunction은 변경될 수 있으므로, handleFunction은 useCallback을 통해 기억해두도록 한다.

### 참고

- [리액트 공식문서 업데이트 버전 - hooks](https://react.dev/reference/react)
- [리액트 공식문서 업데이트 버전 - memo](https://react.dev/reference/react/memo)

```toc

```
