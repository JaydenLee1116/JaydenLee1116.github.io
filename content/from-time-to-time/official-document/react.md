---
emoji: 📜
title: React - new
date: '2023-05-03 10:00:00'
author: 제이든
tags: 글 문서 요약
categories: 아티클
---

## 📎 React

이 글은 [리액트 공식문서 - 함수 컴포넌트](https://react.dev/)를 읽고 작성한 글입니다. 모든 내용을 다루지는 않고 개인적으로 부족했다고 느꼈던 부분, 새롭게
알게 된 부분들을 간단하게 정리할 예정입니다.

## Get Started - Quick start

아래와 같은 것을 배울 수 있다.

- How to create and nest components - 컴포넌트 생성하는 방법
- How to add markup and styles - 마크업과 스타일을 추가하는 방법
- How to display data - 데이터를 표시하는 방법
- How to render conditions and lists - 조건과 리스트를 렌더링하는 방법
- How to respond to events and update the screen - 이벤트에 응답하고 화면을 업데이트하는 방법
- How to share data between components - 컴포넌트 간 데이터를 공유하는 방법

### Creating and nesting components

```jsx
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      {/* 아래와 같이 MyButton 컴포넌트를 다른 컴포넌트에서 사용할 수 있다. */}
      <MyButton />
    </div>
  );
}
```

React Component는 반드시 첫글자가 대문자여야 한다.(HTML 태그가 소문자인 반면에)

### Writing markup with JSX

```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

JSX는 HTML보다 더 엄격하다. 반드시 닫는 태그(/)가 있어야 한다. 또한 React Component는 한번에 여러개의 JSX 태그를 반환할 수 없다.
즉, 최상위에 하나의 태그만 존재해야 한다. 주로 `<div></div>` 혹은 `<></>`(Fragment) 를 사용한다.

### Adding styles

```jsx
<img className="avatar" />
```

```css
.avatar {
    border-radius: 50%;
}
```

html 태그에서의 class와 다르게 className을 사용한다. 이는 class가 자바스크립트의 예약어이기 때문이다.<br/>
리액트는 CSS 파일을 추가하는 특정 방법을 규정하지 않는다. 가장 간단하게는 html에 link 태그를 추가하는 방법이 있고 각 컴포넌트에서 css를 import하기도 한다.
혹은 CSS-in-JS 방식으로 스타일을 작성하기도 한다. 참고로 `create-react-app`에는 tailwindCSS가 기본으로 포함되어 있다.

### Displaying data

```jsx
function MyComponent() {
  const user = {
    name: 'jayden',
    imageUrl: 'https://~~~'
  };
  return (
    <>
      <h1>{user.name}</h1>
      <img src={user.imageUrl} />
    </>
  );
}
```

JSX는 JavaScript 안에서 마크업을 할 수 있게 해준다. 또한 `{}`를 사용하면 다시 JS 코드로 돌아올 수 있다.(JS 코드를 사용하기 위해서 중괄호를 사용하는 것을 반드시 기억하자.)

```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        {/* 아래와 같이 중괄호 2개를 많이 헷갈려하는데, 바깥 중괄호는 JS 코드를 사용하기 위함이고 안쪽 중괄호는 객체 리터럴 중괄호이다. */}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

### Conditional rendering

```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

```jsx
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

```jsx
<div>
  {/* 필수는 아니지만 &&와 ||를 통한 조건부 렌더링을 자주 사용한다. */}
  {isLoggedIn && <AdminPanel />}
</div>
```

### Rendering lists

```jsx
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

listItems는 `<li></li>` 형태의 배열이다. 이 배열 형태를 JSX에 전달하면 알아서 여러개의 리스트 태그로 렌더링된다.

> 이렇게 배열을 전달할 때는 key prop을 꼭 사용해야 한다. 이는 React가 각각의 리스트 아이템을 구분할 수 있게 해주는 역할을 한다.

### Responding to events

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

JSX에서 어떤 이벤트에 대한 내용을 전달할 때, 약속된 이름을 사용한다. 예를 들어 onClick, onMouseOver 등이 있다. 또한, 이벤트 핸들러는 함수로 전달해야 한다.(호출하지 않고 함수 자체를 전달하는 점 유의!)

### Updating the screen

```jsx
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

어떤 값(상태; state)을 기억하고 이 값의 변화에 따라 UI를 다르게 하고 싶다면 `useState` 훅을 사용한다.
`useState`는 배열을 반환하는데, 첫번째 원소는 상태 값이고 두번째 원소는 상태 값을 변경하는 함수이다. 이 함수를 호출하면 상태 값이 변경되고 컴포넌트가 다시 렌더링된다.

```jsx
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}
```

위와 같이 컴포넌트를 여러번 사용하면 각각의 컴포넌트는 독립적인 상태를 가지게 된다.(서로 상태를 공유하지 않는다. 당연한 것같지만 다시 한번 기억할 것!)

### Using Hooks

`use`로 시작하는 함수들을 `Hooks`라고 부른다. `useState`는 가장 기본적인 Hook이다. 이 외에도 `useEffect`, `useContext`, `useReducer` 등이 있다.([참고](https://react.dev/reference/react))
또한, 존재하는 훅들을 조합하여 커스텀 훅을 만들 수도 있다.

훅들은 다른 함수들보다 더 제한적이다. 반드시 컴포넌트(혹은 커스텀 훅)의 최상단에서 호출해야만 한다. 또한 조건문이나 반복문 안에서 호출하면 안된다. 이는 훅이 컴포넌트의 상태를 기억하기 때문이다. 만약 조건문이나 반복문 안에서 호출하면, 컴포넌트의 상태가 변경되어도 훅이 이를 감지하지 못한다.
그러므로 조건문이나 반복문 안에서 훅을 호출하고 싶다면, 조건문이나 반복문을 컴포넌트로 추출한 후 훅을 호출하면 된다.

### Sharing data between components

앞에서 살펴봤듯이 동일한 컴포넌트여도 각각의 컴포넌트는 독립적인 상태를 가진다. 그렇다면 컴포넌트 간에 상태를 공유하려면 어떻게 해야 할까?

가장 단순한 방법은 상태를 공유하고자 하는 컴포넌트들의 상위 컴포넌트에서 state를 관리하는 것이다.

```jsx
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

위와 같은 방법을 `lifting state up`(상태 끌어올리기)라고 한다. 이 방법은 컴포넌트 간에 상태를 공유할 수 있게 해주지만, 컴포넌트 간의 관계가 복잡해지면 상태를 공유하기 위해 상위 컴포넌트를 거쳐야 하는 번거로움이 생긴다.