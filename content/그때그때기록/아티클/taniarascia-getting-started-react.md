---
emoji: 📖
title: Getting Started With React
date: '2022-11-09 13:55:00'
author: 제이든
tags: 글 문서 요약
categories: 아티클
---

## 📚 Taniarascia의 getting-started-with-react

이 글은 [Taniarascia의 getting-started-with-react](https://www.taniarascia.com/getting-started-with-react/)를 한국어로 요약한 정리 글입니다. 공부 목적으로 요약한 주관적인 내용입니다. 😀

### 리액트란?

- 리액트는 자바스크립트 라이브러리이다.(프레임워크가 아니다.)
- 리액트는 페이스북(현 메타)에서 개발된 오픈소스 프로젝트이다.
- 리엑트는 프론트엔드에서 User Interface(UI)를 제작하기위해 사용된다.
- 리액트는 MVC(Model View Controller) 어플리케이션에서 View를 담당한다.

> 리액트의 가장 중요한 측면은 당신이 당신만의, 재사용가능한 HTML 요소인 `컴포넌트`를 빠르고 효과적으로 만들 수 있다는 것이다. 또한 리액트는 `state`와 `props`를 사용하여 데이터의 저장과 조작을 유연하게 할 수 있다.

### 리액트 앱 만드는 방법

npm과 yarn 모두 리액트 어플리케이션 제작을 지원한다.

```sudo
npx create-react-app [어플리케이션 이름]
yarn create react-app [어플리케이션 이름]
```

기본적으로 index.html 내부에 id가 root인 div 태그가 리액트의 시작점이 된다. 또한, index.js를 보면

```js
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hello, React!</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// 위는 클래스 컴포넌트 기준이다. 최근에는 함수 컴포넌트를 주로 사용하며 이는 직접 찾아보길!
```

즉, App 컴포넌트는 root 요소에 렌더링 되며, 우리는 이 App 컴포넌트에 코드를 작성하면 된다.

### 리액트 DevTools

![리액트 DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

리액트와 관련된 개발도구를 확장시켜주는 크롬 extension이다. 컴포넌트에 대한 내용과 props, state의 흐름을 보기 쉽게 도와준다.

### JSX : JavaScript + XML

리액트 코드에서 HTML과 유사한 코드를 보았을 것이다. 이 부분은 HTML과 유사하긴 하지만, 엄밀히 말하면 JSX로 JavaScript의 확장 문법이라고 생각하면 된다.

아래와 같이 JavaScript에서 HTML을 다룰 수 있게 된다.

```js
const heading = <h1 className="site-heading">Hello, React</h1>;
```

또한, JSX를 사용하지 않고 아래와 같이 써도 된다.

```js
const heading = React.createElement('h1', { className: 'site-heading' }, 'Hello, React!');
```

(그러나 위의 코드는 가독성이 떨어져 직관적이지 않다. 사실상 JSX는 리액트를 사용하면서 필수적인 녀석이다.)

#### JSX의 특징 및 주의사항

JSX는 보이기엔 HTML이지만 실상 JavaScript 코드이다.

- CSS 스타일을 위한 `class`는 `className`으로 표기한다. 왜냐하면 JavaScript에는 이미 `class`라는 예약어가 존재하기 때문이다.
- 속성과 메서드는 CamelCase로 작성한다. ex) onclick => onClick
- Self-closing tags는 반드시 슬래쉬가 뒤에 온다. ex) `<img />`
- JSX 내에서 자바스크립트 표현은 {}로 할 수 있다.(마치 문자 리터럴내에서 ${} 사용하듯이)

### Components(컴포넌트)

리액트는 모두 컴포넌트로 구성되어있다. 컴포넌트 안에 더 작은 컴포넌트들이 들어있고, 그 컴포넌트들 내부도 더더더 작은 컴포넌트들로 구성된다.

- class component

```js
import React, { Component } from 'react';

class ClassComponent extends Component {
  render() {
    return <div>Example</div>;
  }
}

export default ClassComponent;
```

- simple component(함수 컴포넌트)

```js
const SimpleComponent = () => {
  return <div>Example</div>;
};

export default SimpleComponent;
```

### Props

리액트에서 데이터를 처리하는 방법으로 porps라고 하는 속성과 상태를 사용하여 처리합니다.<br/>
(기존 글에서는 class component 예시이지만, 저는 함수 컴포넌트로 작성하였습니다.)

```js
function ParentComponent() {
  const characters = [
    {
      name: 'Charlie',
      job: 'Janitor',
    },
    {
      name: 'Mac',
      job: 'Bouncer',
    },
    {
      name: 'Dee',
      job: 'Aspring actress',
    },
    {
      name: 'Dennis',
      job: 'Bartender',
    },
  ];

  return <ChildComponent characterData={characters} />;
}

function ChildComponent(props) {
  return (
    <>
      {props.characterData.map((v, i) => (
        <div key={i}>
          <p>{v.name}</p>
          <p>{v.job}</p>
        </div>
      ))}
    </>
  );
}
```

- 위와 같이 배열 함수(map)을 사용하여 데이터에 대한 여러 JSX 요소를 반환할 때는 데이터마다의 고유한 값을 통해 key값을 지정해주어야합니다.(랜더링 시 각 항목을 식별하는데 도움이 되기 때문이며 사실 위와같이 배열의 순서인 i를 주는 것도 효율적인 방법은 아닙니다.)
- 여기서 의문이 생깁니다. props를 통해 상위 컴포넌트의 데이터를 하위 컴포넌트에 전달하는 건 좋았는데, 그렇다면 해당 컴포넌트에서 다루는 데이터는 어떻게 제어할 수 있을까요?

### State

state를 사용하면 헤당 컴포넌트에서 데이터를 수정(추가 혹은 삭제 등)을 할 수 있게 됩니다. 함수 컴포넌트는 useState()라는 훅을 사용하여 이러한 상태를 저장하고 조작할 수 있습니다.

### 회고

아무래도 오래전에 리액트의 큰 개념을 정리한 글이라서 함수 컴포넌트로 설명하는 내용이 없었다. 리액트를 사용하는 사람 입장에서는 정말 당연하고 기본적인 내용이지만, 막연하게 '리액트에서 상태가 뭐지??'와 같은 의문이 드는 사람들에게는 좋은 글인 것 같다.

```toc

```
