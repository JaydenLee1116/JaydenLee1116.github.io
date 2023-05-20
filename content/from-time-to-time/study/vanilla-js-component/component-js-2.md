---
emoji: 🎾
title: (Vanilla JS로 상태관리 시스템 만들기 by 황준일님) 2편
date: '2023-04-26 23:30:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 스터디
---

## 🎾 기술책 스터디

23년 1월부터 활동 중인 교육에서, 뜻이 맞는 동료들과 함께 진행하게 된 스터디<br/>
앞으로도 꾸준히 기술 서적을 읽고 함께 발전하는 시간이 되었으면 좋겠다!

## 들어가기에 앞서

이 내용은 [개발자 황준일 - Vanilla Javascript로 상태관리 시스템 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Store/#_7-redux-%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5)을
공부하며 작성한 글입니다. 대부분의 내용을 황준일님의 블로그를 참고하였고 몇개의 개념 내용 정도만 추가 혹은 내용 요약이 되어있습니다. 자세한 사항은 황준일님의 블로그를 참고해주세요!(정말 너무 좋은 글이에요~!)

# Vanilla Javascript로 상태관리 시스템 만들기

## 1. 중앙 집중식 상태관리

- 현대 프론트엔드 개발에서 제일 중요한 것은 `상태관리`
- `상태를 기반으로 DOM을 렌더링하기 때문이다.`
- 어플리케이션의 규모가 커질수록 컴포넌트의 depth가 깊어지며 더불어 상태관리도 굉장히 어려워진다.

> 이 때, 상태를 위에서 아래로 하나하나 전달하지 않고 `중앙 집중소 역할`을 하면서 동시에 `예측 가능한 방식`으로 다룰 수 있다면 어떨까?

- [참고: Redux 공식문서](https://ko.redux.js.org/introduction/getting-started/)

## 2. Observer Pattern에 대해 이해하기

- `중앙 집중식 저장소`를 `Store`라고 해보자.
- `Store`와 `Component`의 관계
  - 하나의 Store가 여러 개의 Component에서 사용될 수 있다.
  - Store가 변경될 때, Store가 사용되고 있는 Component도 변경되어야 한다.

```js
// store에 초기 state를 전달하면서 생성
const store = new Store({
  a: 11,
  b: 16,
});

// 컴포넌트 2개 생성
// Q. 여기서 Component의 parameter로 객체가 전달되는 게 맞나..? 어차피 아래에서 따로 구독하는데?
const component1 = new Component({ subscribe: [store] });
const component2 = new Component({ subscribe: [store] });

// 컴포넌트가 store를 구독
component1.subscribe(store); // a + b = ${store.state.a + store.state.b}
component2.subscribe(store); // a * b = ${store.state.a * store.state.b}

// store의 state를 변경한다.
store.setState({
  a: 7,
  b: 19,
});

// store가 변경되었음을 알린다.
store.notify();
```

위와 같은 형태로 코드를 작성하는 것을 `Observer Pattern`이라고 한다.

- `Observer Pattern`은 객체의 상태 변화를 관찰하는 관찰자들, 즉 옵저버들의 목록을 객체에 등록한다.
- `상태 변화가 있을 때마다 메서드 등을 통해 객체가 직접 목록의 각 옵저버에게 통지하도록 한다.`
- 디자인 패턴의 하나이다.
- `발행/구독 모델`이라고도 부른다.

### 1. Publisher(발행)

```js
class Publisher {
  #state;
  #observers = new Set(); // 여기에 구독자들(관찰자들)이 저장된다.
  
  constructor(state) {
    this.#state = state;
    // Object.defineProperty()
    // state 객체의 key값을 순회하면서 this에 해당 key값으로 `() => this.#state[key]` value를 갖게 한다.
    // Q. 그런데 이걸 왜하는건지 모르겠다. 
    // - 생성된 인스턴스에서 state가 갖는 값들에 바로 접근할 수 있어서..?
    // A. 값 변경이 일어나지 않게 처리하는 것 같다.
    Object.keys(state).forEach(key => Object.defineProperty(this, key, {
      get: () => this.#state[key]
        }
      )
    );
  }
  
  setState(newState) {
    this.#state = {...this.#state, ...newState};
    this.notify();
  }
  
  register(observer) {
    this.#observers.add(observer);
  }
  // Q. notify에 파라미터가 전달되지 않는 부분이 잘 이해가 안된다.
  notify() {
    this.#observers.forEach(observer => observer());
  }
}
```

- Publisher: 발행자
- setState(): 발행자의 상태를 변경하고 구독자를 실행함으로써 상태변화를 알린다.
- register(): 구독자(관찰자)를 등록한다.
- notify(): 구독자(관찰자; 함수)를 실행한다.

> 여기서 핵심은 setState()를 통해 상태 변경 시, notify()가 실행되며 구독자들이 실행된다는 점이다. 즉, `내부 상태가 변할 때 구독자에게 알리는 것`

### 2. Subscriber(구독)

```js
class Subscriber {
  #fn;
  constructor(fn) {
    this.#fn = fn;
  }

  subscribe(publisher) {
    publisher.register(this.#fn);
  }
}
```

- Subscriber: 구독자
- #fn: Publisher 입장에서 observer 된다.
- subscribe(): publisher를 받아서 observer를 등록한다.

> 발행기관을 구독한다.<br/>
> `발행기관에서 변화가 생겼을 때 하는 일`을 정의해야 한다. 이게 사실 publisher에게는 observer가 된다.

### 3. 적용하기

```js
const initailState = {a: 10, b: 20};

// Q. 왜 publisher라고 안하고 상태라고 했을까..?
const publisher = new Publisher(initailState);

// Q-a. publisher는 외부 객체인데, 이걸 참조하고 있는 게 맞나..?
const addCalculator = new Subscriber(() => console.log(`a + b = ${publisher.a + publisher.b}`));

// Q-b. publisher를 구독하는 건 여기서 하면서..? 
addCalculator.subscribe(publisher);
```

## 3. 리팩토링

앞의 코드를 단순하게 `observable`과 `observe`의 관계에만 집중해서 다뤄보자.

- observable은 observe에서 사용된다.
- observable에 변화가 생기면, observe에 등록된 함수가 실행된다.

### 1. [Object.defineProperty](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 이해하기

MDN 문서의 설명은 아래와 같다.

> 객체에 직접 새로운 속성을 정의하거나 이미 존재하는 속성을 수정한 후, 그 객체를 반환합니다.

```js
// 여기서 부터 아래까지의 코드를 class 하나라고 생각하면 이해하기 편하다.
let a = 10;

const state = {};

Object.defineProperty(state, 'a', {
  get() {
    console.log(`현재 a의 값은 ${a} 입니다.`);
    return a;
  },
  set(value) {
    a = value;
    console.log(`변경된 a의 값은 ${a} 입니다.`)
  }
})
```

- `Object.defineProperty(targetObject, property, descriptor)`
  - `object`: 속성을 정의할 객체
  - `property`: 새로 정의하거나 수정하려는 속성의 이름 또는 Symbol
  - `descriptor`: 새로 정의하거나 수정하려는 속성을 기술하는 객체

> `Object.defineProperty(targetObject, property, descriptor)`는 객체를 참조하거나 객체에 어떤 변화가 생길 때,
> 중간에 우리가 원하는 행위를 집어넣을 수 있게 해준다.

### 2. 여러 개의 속성 관리하기

```js
const state = {
  a: 10,
  b: 20,
};

const stateKeys = Object.keys(state);

for (const key of stateKeys) {
  let _value = state[key];
  Object.defineProperty(state, key, {
    get () {
      console.log(`현재 state.${key}의 값은 ${_value} 입니다.`);
      return _value;
    },
    set (value) {
      _value = value;
      console.log(`변경된 state.${key}의 값은 ${_value} 입니다.`);
    }
  })
}

console.log(`a + b = ${state.a + state.b}`);

state.a = 100;
state.b = 200;
```

위의 코드에서 `console.log`만 `observer`라는 함수로 변경해보자.

```js
const state = {
  a: 10,
  b: 20,
};

const stateKeys = Object.keys(state);
const observer = () => console.log(`a + b = ${state.a + state.b}`);

for (const key of stateKeys) {
  let _value = state[key];
  Object.defineProperty(state, key, {
    get () {
      return _value;
    },
    set (value) {
      _value = value;
      observer(); // set할 때 어떤 함수를 실행하게 하는 것이다.
    }
  })
}

observer();

state.a = 100;
state.b = 200;
```

> 지금까지의 과정을 조금 쉽게 설명하면 다음과 같은 흐름이다.
> - obj.a로 어떤 값에 접근할 때(get), 중간에 뭔가 어떤 코드를 실행하고 싶은 것. 옵저버 패턴에서는 이 중간에 구독하는 메서드(subscribe)가 들어간다.
> - obj.a에 어떤 값을 할당할 때(set), 중간에 뭔가 어떤 코드를 실행하고 싶은 것. 옵저버 패턴에서는 이 중간에 알림하는 메서드(notify)가 들어간다.
> - 마치 중간에 과정을 가로채서 무언가를 실행하는 것. Proxy 패턴과 유사하다.

### 3. 여러 개의 Observer 관리하기

```js
let currentObserver = null;

const state = {
  a: 10,
  b: 20,
};

const stateKeys = Object.keys(state);

for (const key of stateKeys) {
  let _value = state[key];
  // Q. 아래 observers는 for 문 밖에서 선언해도 되는데, 굳이 여기에 한 이유가 있을까?
  // A. for문 안에서 각각의 key에 대한 closer로 갖고 있어야 각 key가 get 됐을 때, 본인에게 해당하는 함수에만 접근한다.
  // 만약 밖에 빼두면 모든 key값들에 대한 observers가 공유되므로 그 안에 모든 함수가 실행되어버린다.
  const observers = new Set();
  Object.defineProperty(state, key, {
    get () {
      if (currentObserver) observers.add(currentObserver);
      return _value;
    },
    set (value) {
      _value = value;
      observers.forEach(observer => observer());
    }
  })
}

const 덧셈_계산기 = () => {
  currentObserver = 덧셈_계산기;
  // 아래에서 state.a를 get하는 순간 defineProperty의 get 메서드가 실행된다.
  console.log(`a + b = ${state.a + state.b}`);
}

const 뺄셈_계산기 = () => {
  currentObserver = 뺄셈_계산기;
  console.log(`a - b = ${state.a - state.b}`);
}

덧셈_계산기();
// 아래에서 state.a에 어떤 값을 할당하는 순간 defineProperty의 set 메서드가 실행된다.
state.a = 100;

뺄셈_계산기();
state.b = 200;

state.a = 1;
state.b = 2;
```

> 함수가 실행될 때 `currentObserver가 실행중인 함수를 참조하도록 만든다.`<br/>
> `state`의 프로퍼티가 사용될 때(get을 호출할 때),

### 4. 함수화

위의 코드를 재사용하기 위해 `onserve`와 `observable` 함수로 구현해보자.

```js
let currentObserver = null;

const observe = fn => {
  currentObserver = fn;
  // 아래에서 fn이 실행될 때, currentObserver가 존재하게 되므로 observers에 fn이 등록된다.
  fn();
  currentObserver = null;
}

const observable = obj => {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get () {
        // get일 때는 observers에 currentObserver가 추가되기만 한다.
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },

      set (value) {
        _value = value;
        // set일 때는 observers에 있는 currentObserver들이 하나씩 호출된다.
        observers.forEach(fn => fn());
      }
    })
  })
  return obj;
}
```

아래와 같이 사용한다.

```js
// Q. 아래 코드 다시 한번 생각해보기
const 상태 = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`b = ${상태.b}`));
observe(() => console.log(`a + b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a * b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a - b = ${상태.a} + ${상태.b}`));

상태.a = 100;
상태.b = 200;
```

## 4. DOM에 적용하기

### 1. 일단 구현해보기

구조는 뒤로 하고, 기능만 구현해보기.

- `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Store를 적용해보자</title>
</head>
<body>
	<div id="app"></div>
  <script type="module" src="./src/main.js"></script>
</body>
</html>
```

- `src/main.js`

```js
import { observable, observe } from "./core/observer.js";

const state = observable({
  a: 10,
  b: 20,
});

const $app = document.querySelector('#app');

const render = () => {
  $app.innerHTML = `
    <p>a + b = ${state.a + state.b}</p>
    <input id="stateA" value="${state.a}" />
    <input id="stateB" value="${state.b}" />
  `;

  $app.querySelector('#stateA').addEventListener('change', ({ target }) => {
    state.a = Number(target.value);
  })

  $app.querySelector('#stateB').addEventListener('change', ({ target }) => {
    state.b = Number(target.value);
  })
}

/* observe 함수가 호출되면 render도 호출되면서 그 안에 있는 state.a와 state.b가 getter로 호출될 때
render 함수가 각각의 observers에 등록된다.
그리고 #stateA와 #stateB에 어떤 값을 입력하고 변화를 감지하면 바로 state.a와 state.b의 setter가 호출되면서
그 안에 observer중 하나로 존재하는 render 함수가 실행되면서 ui를 변경한다.
 */
observe(render);
```

### 2. Component로 추상화하기

- `src/core/Component.js`

```js
import { observable, observe } from './observer.js';

export class Component {
  state; 
  props; 
  $el;

  constructor ($el, props) {
    // $el이 부모 엘리먼트이다. 해당 컴포넌트가 추가될 target
    this.$el = $el;
    this.props = props;
    this.setup();
  }

  setup() {
    // 컴포넌트마다 store가 있는 느낌이네. 여기서 state는 store라고 하는 게 좀더 자연스럽지 않나 싶다.
    this.state = observable(this.initState()); // state를 관찰한다.
    observe(() => { // state가 변경될 경우, 함수가 실행된다.
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() { return {} }
  template () { return ''; }
  render () { this.$el.innerHTML = this.template(); }
  setEvent () {}
  mounted () {}
}
```

위 코드를 기반으로 `src/App.js`에 `Component`를 적용해보자.

```js
import {Component} from "./core/Component.js";

export class App extends Component {
  // constructor와 super를 알아서 넣어준다.
  initState () {
    return {
      a: 10,
      b: 20,
    }
  }

  template () {
    // 이 때, this.state는 이미 observable이 적용된 객체이다.
    const { a, b } = this.state;
    return `
      <input id="stateA" value="${a}" size="5" />
      <input id="stateB" value="${b}" size="5" />
      <p>a + b = ${a + b}</p>
    `;
  }

  setEvent () {
    const { $el, state } = this;

    $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
      // state.a에 값일 할당될 때(setter), `render, setEvent, mounted`가 실행된다.
      state.a = Number(target.value);
    })

    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      state.b = Number(target.value);
    })
  }
}
```

### 3. 고민해보기

이렇게 Component 내부에서 관리되는 state(store 느낌...!)에 observable을 씌워서 사용할 경우, `setState`를 사용하는 방식과 크게 다르지 않다고 느낄 수 있다.
setState() 또한 state가 변경될 때마다 `render`를 실행하는 방식이기 때문이다.(직접 사용하느냐, setter를 했을 때 실행하느냐의 차이 느낌)

> `observer`는 이렇게 컴포넌트 내부에서 사용하기보단 `중앙 집중식 저장소`를 관리할 때 매우 효과적이다!!!

### 4. 컴포넌트 외부에 상태 만들어주기

아주 간단한 Store를 만들어서 관리해보자.

- `src/store.js`

```js
import { observable } from './core/observer.js'

export const store = {
  state: observable({
    a: 10,
    b: 20,
  }),

  setState (newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  }
}
```

- `src/App.js`

```js
import { Component } from "./core/Component.js";
import { store } from './store.js';

const InputA = () => `
  <input id="stateA" value="${store.state.a}" size="5" />
`;

const InputB = () => `
  <input id="stateB" value="${store.state.b}" size="5" />
`

const Calculator = () => `
  <p>a + b = ${store.state.a + store.state.b}</p>
`

export class App extends Component {
  template () {
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  setEvent () {
    const { $el } = this;

    $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
      store.setState({ a: Number(target.value) });
    })

    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      store.setState({ b: Number(target.value) });
    })
  }
}
```

- InputA, InputB, Calculator 3개의 컴포넌트가 store를 참조하고 있고, store가 변경되었을 때 컴포넌트가 자동으로 렌더링된다.
- 여기에 `Flux 패턴`을 사용하면 `Redux`나 `Vuex`가 되는 것이다.

## 5. Flux Pattern

- Redux나 Vuex에서 사용되는 Flux 패턴
- `단방향 데이터 흐름`
  - `Dispatcher -> Store`
  - `Store -> View`
  - `View -> Action`
  - `Action -> Dispatcher`
- `단방향 데이터 흐름`은 `데이터의 변화`를 훨씬 예측하기 쉽게 만든다.

> 또한, 우리가 눈으로 보는 UI에 따라 일대일 대응으로 state의 변화를 확인할 수 있다면 얼마나 좋겠는가?!

## 6. Vuex 같은 Store 만들기

Vuex가 어떤 interface를 가지고 있는지 간단하게 살펴보자.

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});
```

- 참고: `Redux reducer과 Vuex mutations의 차이`에 대한 GPT의 답변

> 질문: redux reducer and vuex mutations are simillar, right?<br/>
> 답변: Yes, `Redux reducers and Vuex mutations are similar` in their purpose and functionality.
> `Both Redux and Vuex are state management libraries` used in JavaScript applications, and `reducers/mutations are used to modify the state in a predictable way.`
> Redux is commonly used in React applications, while Vuex is used in Vue.js applications. `Both Redux reducers and Vuex mutations take the current state and an action/payload as input, and return a new state as output.` The new state is based on the current state and the action/payload passed to the reducer/mutation.
> The main difference between the two is in how they are defined and used. In Redux, `reducers are pure functions that take the current state and an action, and return a new state. Reducers are combined together using the combineReducers function, and are called by the Redux store when an action is dispatched.`
> `In Vuex, mutations are functions that directly modify the state.` They are defined as methods in the Vuex store, and are called using the commit method when an action is dispatched.
> Overall, while there are some differences in their implementation, Redux reducers and Vuex mutations serve a similar purpose and are used to achieve similar goals in state management.

- mutations: state를 변경시킨다.

```js
store.commit('increment'); // state의 count 값이 1 증가하게 된다.

console.log(store.state.count); // 1
```

즉, `commit`으로 mutations의 메서드를 실행하는 구조이다.

> Vuex는 개념만 알아보고 구현사항은 생략하겠습니다.

## 7. Redux 만들기

마찬가지로 `Redux`가 사용되는 형태를 살펴보자.

```js
import { createStore } from 'redux'

/**
 * 이것이 (state, action) => state 형태의 순수 함수인 리듀서입니다.
 * 리듀서는 액션이 어떻게 상태를 다음 상태로 변경하는지 서술합니다.
 *
 * 상태의 모양은 당신 마음대로입니다: 기본형(primitive)일수도, 배열일수도, 객체일수도,
 * 심지어 Immutable.js 자료구조일수도 있습니다. 오직 중요한 점은 상태 객체를 변경해서는 안되며,
 * 상태가 바뀐다면 새로운 객체를 반환해야 한다는 것입니다. => 불변성
 *
 * 이 예제에서 우리는 `switch` 구문과 문자열을 썼지만,
 * 여러분의 프로젝트에 맞게
 * (함수 맵 같은) 다른 컨벤션을 따르셔도 좋습니다.
 */
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 앱의 상태를 보관하는 Redux 저장소를 만듭니다.
// API로는 { subscribe, dispatch, getState }가 있습니다.
let store = createStore(counter)

// subscribe()를 이용해 상태 변화에 따라 UI가 변경되게 할 수 있습니다.
// 보통은 subscribe()를 직접 사용하기보다는 뷰 바인딩 라이브러리(예를 들어 React Redux)를 사용합니다.
// 하지만 현재 상태를 localStorage에 영속적으로 저장할 때도 편리합니다.

store.subscribe(() => console.log(store.getState()))

// 내부 상태를 변경하는 유일한 방법은 액션을 보내는 것뿐입니다.
// 액션은 직렬화할수도, 로깅할수도, 저장할수도 있으며 나중에 재실행할수도 있습니다.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

코드를 살펴보면 `createStore`가 `subscribe, dispatch, getState` 등의 메서드를 가진 객체를 반환하는 것을 알 수 있다.

```js
const createStore = (reducer) => {
  return {subscribe, dispatch, getState};
}
```

위의 내용을 기반으로 간단하게 구현을 해보자.

```js
import { observable } from './observer.js';

export const createStore = (reducer) => {

  // reducer가 실행될 때 반환하는 객체(state)를 observable로 만들어야 한다.
  // Q. 여기서 state를 observable하는 게 의미가 있나..???
  // observable을 적용한 initialState를 받는 걸로 이해하면 될까?
  // 어떤 것도 observe 하지 않는다면, observable은 아무런 의미가 없지 않나..?
  const state = observable(reducer());

  // getState가 실제 state를 반환하는 것이 아니라 frozenState를 반환하도록 만들어야 한다.
  // state와 동일한 내용이지만, getter만 되면서 state === frozenState가 false
  const frozenState = {};
  Object.keys(state).forEach(key => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key], // get만 정의하여 set을 하지 못하도록 만드는 것이다.
    })
  });

  // dispatch로만 state의 값을 변경할 수 있다.
  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      // state의 key가 아닐 경우 변경을 생략한다.
      if (!state[key]) continue;
      state[key] = value;
    }
  }

  const getState = () => frozenState;

  // subscribe는 observe로 대체한다.
  return { getState, dispatch };
}
```

위의 `createStore`를 사용하여 store를 만들어보자.

`src/store.js`

```js
import {createStore} from './core/Store.js';

// 초기 state의 값을 정의해준다.
const initState = {
  a: 10,
  b: 20,
};

// dispatch에서 사용될 type들을 정의해준다.
export const SET_A = 'SET_A';
export const SET_B = 'SET_B';

// reducer를 정의하여 store에 넘겨준다.
export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case 'SET_A' :
      return { ...state, a: action.payload }
    case 'SET_B' :
      return { ...state, b: action.payload }
    default:
      return state;
  }
});

/* 아래와 같이 reducer 함수를 정의해서 전달해도 좋을듯
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_A' :
      return { ...state, a: action.payload }
    case 'SET_B' :
      return { ...state, b: action.payload }
    default:
      return state;
  }
}
 */

// reducer에서 사용될 action을 정의해준다.
export const setA = (payload) => ({ type: SET_A, payload });
export const setB = (payload) => ({ type: SET_B, payload });
```

이제 App에서 Store를 사용해보자.

`src/App.js`

```js
import { Component } from "./core/Component.js";
import {setA, setB, store} from './store.js';

const InputA = () => `<input id="stateA" value="${store.getState().a}" size="5" />`;
const InputB = () => `<input id="stateB" value="${store.getState().b}" size="5" />`;
const Calculator = () => `<p>a + b = ${store.getState().a + store.getState().b}</p>`;

export class App extends Component {
  template () {
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  setEvent () {
    const { $el } = this;

    $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
      // dispatch를 통해서 값을 변경시킨다.(commit이라고 오타 있음)
      store.dispatch(setA(Number(target.value)));
    })

    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      // dispatch를 통해서 값을 변경시킨다.(commit이라고 오타 있음)
      store.dispatch(setB(Number(target.value)));
    })
  }
}
```

이렇게 위와 같이 간단한 `redux`를 만들어볼 수 있다.

# 참고

- [개발자 황준일 - Vanilla Javascript로 상태관리 시스템 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Store/)
- [Redux 공식문서 - 시작하기](https://ko.redux.js.org/introduction/getting-started/)
- [MDN - Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)