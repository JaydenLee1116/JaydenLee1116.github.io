---
emoji: 🎾
title: (Vanilla JS로 웹 컴포넌트 만들기 by 황준일님) 1편
date: '2023-04-19 23:30:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 스터디
---

## 🎾 기술책 스터디

23년 1월부터 활동 중인 교육에서, 뜻이 맞는 동료들과 함께 진행하게 된 스터디<br/>
앞으로도 꾸준히 기술 서적을 읽고 함께 발전하는 시간이 되었으면 좋겠다!

## 들어가기에 앞서

이 내용은 [개발자 황준일 - Vanilla Javascript로 웹 컴포넌트 만들기 1편](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/)을
공부하며 작성한 글입니다. 대부분의 내용을 황준일님의 블로그를 참고하였고 몇개의 개념 내용 정도만 추가 혹은 내용 요약이 되어있습니다. 자세한 사항은 황준일님의 블로그를 참고해주세요!(정말 너무 좋은 글이에요~!)

# Vanilla Javascript로 웹 컴포넌트 만들기 - 1

## 1. 컴포넌트와 상태관리

### 크로스 브라우징

- 웹 제작 시에 모든 브라우저에서 깨지지 않고 의도한 대로 올바르게 나오는 작업(호환성 해결)
- 표준 웹 기술을 채용하여 다른 기종 혹은 플랫폼에 따라 달리 구현되는 기술을 비슷하게 만듦과 동시에 어느 한쪽으로 최적화 되어 치우치지 않도록 공통 요소를 사용하여 웹페이지를 제작하는 기
- 단순하게 말하자면 컴퓨터, 스마트폰 등등 어떤 기기로 접속해도 사용자가 동일한 경험을 할 수 있게끔 해주는 것이다.

### GraphQL(Graph Query Language; gql)

- sql과 마찬가지로 쿼리 언어
- sql은 `데이터베이스`에 저장된 데이터를 효율적으로 가져오는 것이 목적. 주로 백엔드 시스템에서 작성
- gql은 `웹 클라이언트`가 데이터를 서버로부터 효율적으로 가져오는 것이 주된 목적. 주로 클라이언트 시스템에서 작성


### 클라이언트 렌더링의 흐름

브라우저와 JS가 발전하는 과정에서 아예 `브라우저(클라이언트)단에서 렌더링`을 하고, `서버에서는 REST API 또는 GraphQL 같이 브라우저 렌더링에 필요한 데이터를 제공하는 형태`로 변화하였다.
즉, 직접적으로 DOM을 조작하는 행위가 급격하게 감소했다. `상태(state)`를 기준으로 `DOM`을 렌더링하는 형태로 발전했다.
다르게 생각하면 DOM이 변하는 경우가 State에 종속되었고 이 말은 즉, State가 변하지 않을 경우 DOM이 변하면 안된다는 의미이다.

### SSR과 CSR

#### SSR(Server-Side-Rendering)

- 서버에서 HTML을 만들어서 클라이언트에 넘겨준다. 말 그대로 서버쪽에서 렌더링을 한다.
- 그렇기 때문에 클라이언트에서는 데이터를 깊은 단계까지 관리하고 다룰 필요가 없었다.

#### CSR(Client-Side-Rendering)

- JS의 발전에 따라 클라이언트 단에서 모든 렌더링을 처리하려는 시도가 생겼다.(React, Vue, Angular 등)
- 클라이언트 단에서 렌더링을 하기 위해, 렌더링에 필요한 데이터(상태)를 세밀하게 관리해야할 필요가 생겼다.
- 그래서 Redux와 같은 상태관리 라이브러리(프레임워크)가 생겨났다.

### 컴포넌트

- Angular가 CSR의 시작이었다면 React는 컴포넌트 기반 개발의 시작!
- 현 시점의 웹 어플리케이션은 대부분 컴포넌트 단위로 설계되고 개발된다.
- 또한 컴포넌트마다 컴포넌트를 렌더링할 때 필요한 상태를 관리한다.
  - `Proxy` 혹은 `Observer Pattern` 등을 이용하여 구현한다.

## 2. state - setState - render

### 2-1. 구현해보기

`setState`를 통해서 `state`를 기반으로 `render`를 해주는 코드를 만들어보기

```html
<div id="app"></div>
<script>
const $app = document.querySelector('#app');

let state = {
  items: ['item1', 'item2', 'item3', 'item4']
}

const render = () => {
  const { items } = state;
  $app.innerHTML = `
    <ul>
      ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <button id="append">추가</button>
  `;
  document.querySelector('#append').addEventListener('click', () => {
    setState({ items: [ ...items, `item${items.length + 1}` ] })
  })
}

const setState = (newState) => {
  state = { ...state, ...newState };
  render();
}

render();
</script>
```

- `state`가 변경되면 `render`를 실행한다.
- `state`는 `setState`로만 변경해야 한다.

> 위의 2가지가 정말 정말 핵심 내용이라고 생각한다.

### 2-2. 추상화

class 문법으로 좀더 추상화해보자

```html
<div id="app"></div>
<script>
class Component {
  $target;
  state;
  constructor ($target) { 
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup () {};
  template () { return ''; }
  render () {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent () {}
  setState (newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

class App extends Component {
  setup () {
    this.state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.state;
    return `
        <ul>
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <button>추가</button>
    `
  }
  
  setEvent () {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    }); 
  }
}

new App(document.querySelector('#app'));
</script>
```

class를 사용하여 조금 더 유연하고 그럴듯한(?) 컴포넌트가 작성되었다.

### 2-3. 모듈화

위의 파일들을 아래와 같은 구조로 나눌 수 있다.

```shell
.
├── index.html
└── src
    ├── app.js              # ES Module의 entry file
    ├── components          # Component 역할을하는 것들
    │   └── Items.js
    └── core                # 구현에 필요한 코어들
        └── Component.js
```

src/core/Component.js

- 아래와 같이 Component 역할을 하는 class를 생성한다.

```js
export default class Component {
  $target;
  state;
  constructor ($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup () {};
  template () { return ''; }
  render () {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent () {}
  setState (newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
```

src/components/Items.js

- 위의 Component class를 상속하여 좀더 구체적인 class를 구현한다.

```js
import Component from "../core/Component.js";

export default class Items extends Component {
  setup () {
    this.state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.state;
    return `
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <button>추가</button>
    `
  }

  setEvent () {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });
  }
}
```

index.html

- html에는 아래와 같이 entry 역할(app 혹은 root)을 하는 태그 하나만이 존재한다.

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Simple Component 2</title>
</head>
<body>
<div id="app"></div>
<script src="./src/app.js" type="module"></script>
</body>
</html>
```

src/app.js

- app 태그를 target으로 하여 구현된 Items를 붙인다.

```js
import Items from "./components/Items.js";

class App {
  constructor() {
    const $app = document.querySelector('#app');
    new Items($app);
  }
}

new App();
```

## 3. 이벤트 처리

### 3-1. 불편함 감지

앞의 코드를 보면 render 시마다 새로운 html을 할당함으로 다시 event를 등록해주어야 한다. 또한 반복적인 요소에 대해서 이벤트를 등록해주어야할 때는 더 불편하다.
예를 들어 각각의 아이템을 삭제하는 기능을 추가한다고 하면 아래와 같다.

```js
import Component from "../core/Component.js";

export default class Items extends Component {
  setup () {
    this.state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.state;
    return `
      <ul>
        ${items.map((item, key) => `
          <li>
            ${item}
            <button class="deleteBtn" data-index="${key}">삭제</button>
          </li>
        `).join('')}
      </ul>
      <button class="addBtn">추가</button>
    `
  }

  setEvent () {
    this.$target.querySelector('.addBtn').addEventListener('click', () => {
      const { items } = this.state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });
    // 아래와 같이 모든 deleteBtn에 대해서 다소 복잡한 핸들러를 전달해야한다.
    this.$target.querySelectorAll('.deleteBtn').forEach(deleteBtn =>
      deleteBtn.addEventListener('click', ({ target }) => {
        const items = [ ...this.state.items ];
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }))
  }
}
```

### 3-2. 이벤트 버블링

```js
export default class Items extends Component {
  setup () {/* 생략 */}
  template () { /* 생략 */}
  setEvent () {
    // 모든 이벤트를 this.$target에 등록하여 사용하면 된다.
    // 여기서 { target } 에서 target은 e.target이 된다.
    this.$target.addEventListener('click', ({ target }) => {
      const items = [ ...this.state.items ];

      if (target.classList.contains('addBtn')) {
        this.setState({ items: [ ...items, `item${items.length + 1}` ] });
      }

      if (target.classList.contains('deleteBtn')) {
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }

    });
  }
}
```

위와 같이 이벤트 버블링을 이용하기 위해 $target(컴포넌트가 붙게 되는 element)에 이벤트를 등록했기 때문에 이제 render마다 굳이 setEvent를 호출할 필요가 없어진다.

```js
export default class Component {
   $target;
   state;
   constructor ($target) {
     this.$target = $target;
     this.setup();
+    this.setEvent(); // constructor에서 한 번만 실행한다.
     this.render();
   }
   setup () {};
   template () { return ''; }
   render () {
     this.$target.innerHTML = this.template();
-    this.setEvent(); // render 때마다 이벤트를 붙일 필요가 없어졌다.
   }
   setEvent () {}
   setState (newState) {
     this.state = { ...this.state, ...newState };
     this.render();
   }
 }
```

### 3-3. 이벤트 버블링 추상화

```js
export default class Component {
  $target;
  state;
  constructor ($target) { /* 생략 */ }
  setup () { /* 생략 */ }
  template () { /* 생략 */ }
  render () { /* 생략 */ }
  setEvent () { /* 생략 */ }
  setState (newState) { /* 생략 */ }

  addEvent (eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    this.$target.addEventListener(eventType, event => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    })
  }
}

export default class Items extends Component {
  setup () { /* 생략 */ }
  template () {/* 생략 */ }
  setEvent () {
    this.addEvent('click', '.addBtn', ({ target }) => {
      const { items } = this.state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });
    this.addEvent('click', '.deleteBtn', ({ target }) => {
      const items = [ ...this.state.items ];
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });
  }
}
```

## 4. 컴포넌트 분할하기

### 4-1. 기능 추가

현재의 코드까지는 컴포넌트를 분리할 이유가 없기에, `toggle`, `filter` 등의 기능을 추가

```js
export default class Items extends Component {
  get filteredItems () {
    const { isFilter, items } = this.state;
    return items.filter(({ active }) => (isFilter === 1 && active) ||
                                        (isFilter === 2 && !active) ||
                                        isFilter === 0);
  }

  setup() {
    this.state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        }
      ]
    };
  }

  template() {
    return `
      <header>
        <input type="text" class="appender" placeholder="아이템 내용 입력" />
      </header>
      <main>
        <ul>
          ${this.filteredItems.map(({contents, active, seq}) => `
            <li data-seq="${seq}">
              ${contents}
              <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
                ${active ? '활성' : '비활성'}
              </button>
              <button class="deleteBtn">삭제</button>
            </li>
          `).join('')}
        </ul>
      </main>
      <footer>
        <button class="filterBtn" data-is-filter="0">전체 보기</button>
        <button class="filterBtn" data-is-filter="1">활성 보기</button>
        <button class="filterBtn" data-is-filter="2">비활성 보기</button>
      </footer>
    `
  }

  setEvent() {
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      const {items} = this.state;
      const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
      const contents = target.value;
      const active = false;
      this.setState({
        items: [
          ...items,
          {seq, contents, active}
        ]
      });
    });

    this.addEvent('click', '.deleteBtn', ({target}) => {
      const items = [ ...this.state.items ];;
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      items.splice(items.findIndex(v => v.seq === seq), 1);
      this.setState({items});
    });

    this.addEvent('click', '.toggleBtn', ({target}) => {
      const items = [ ...this.state.items ];
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      const index = items.findIndex(v => v.seq === seq);
      items[index].active = !items[index].active;
      this.setState({items});
    });

    this.addEvent('click', '.filterBtn', ({ target }) => {
      this.setState({ isFilter: Number(target.dataset.isFilter) });
    });
  }
}
```

크게 보면 이것도 컴포넌트라고 볼 수 있지만, 컴포넌트를 나누는 기본적인 이유인 `재활용`이 사실상 어렵다.
하나의 컴포넌트가 최대한 작은 일을 하도록 해야 추후에 재활용하기 좋다.

### 4-2. 폴더 구조

한 번 더 분리하여 좀더 세밀하게 구조를 나눠보자

```shell
.
├── index.html
└── src
    ├── App.js               # main에서 App 컴포넌트를 마운트한다.
    ├── main.js              # js의 entry 포인트
    ├── components
    │   ├── ItemAppender.js
    │   ├── ItemFilter.js
    │   └── Items.js
    └── core
        └── Component.js
```

- App Component 추가
- entry point를 app.js에서 main.js로 변경
- `Items`에서 `ItemAppender`, `ItemFilter`을 분리

### 4-3. Component Core 변경(props와 mounted 추가)

```js
export default class Component {
  $target;
  props;
  state;
  constructor ($target, props) {
    this.$target = $target;
    this.props = props; // props 할당
    this.setup();
    this.setEvent();
    this.render();
  }
  setup () {};
  mounted () {};
  template () { return ''; }
  render () {
    this.$target.innerHTML = this.template();
    this.mounted(); // render 후에 mounted가 실행 된다.
  }
  setEvent () {}
  setState (newState) { /* 생략 */ }
  addEvent (eventType, selector, callback) { /* 생략 */ }
}
```

- `render` 이후에 어떤 함수들을 실행하기 위해 `mounted()` 메서드를 추가한다.
- `props`는 부모 컴포넌트가 자식 컴포넌트에게 상태 혹은 메서드를 넘겨주기 위함이다.

> 리액트의 컴포넌트는 `생명주기`를 갖는다. 단순하게 `생성 -> 업데이트 -> 제거`의 삶을 살게 되는 것이다.<br/>
> 이 때, 생성 단계가 `mounting` 단계이다. 이 단계에서는 Component 함수가 실행되고 결과물로 나온 Element가 가상 DOM에 삽입되고 실제 DOM을 업데이트하기까지의 과정이 일어난다.

### 4-4. Entry Point 변경



```html
 <!doctype html>
 <html lang="ko">
 <head>
   <meta charset="UTF-8">
   <title>Simple Component 8</title>
 </head>
 <body>
 <h1>Example #8</h1>
 <div id="app"></div>
-<script src="src/app.js" type="module"></script>
+<script src="src/main.js" type="module"></script>
 </body>
 </html>
```

```js
import App from './App.js';

new App(document.querySelector('#app'));
```

> 솔직히 이 글에서 위와 같이 entry point를 변경한 명확한 이유는 모르겠다.<br/>
> 일단 이렇게 App도 하나의 컴포넌트로 구분해주면 재활용성이 높아진다는 점, 추후에 App 컴포넌트 외부에서 어떤 작업을 할 때 추가하기 편하다는 점 정도..?!<br/>
> 예를 들어 리액트의 경우도 아래와 같이 처리가 되어있으니 말이다.

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> // 이렇게 strict mode를 걸어주고 싶을 때
    <App />
  </React.StrictMode>
);
```

### 4-5. 컴포넌트 분할

기존 Items에 존재하던 로직을 App으로 넘기고 App에서 여러 메서드를 관리하며 하위 컴포넌트들(Items, ItemAppender, ItemFilter)에게 props로 넘겨준다.

```js
import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {

  setup () {
    this.state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        }
      ]
    };
  }

  template () {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
  mounted () {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');

    // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
    // 다음과 같이 새로운 함수를 만들어줘야 한다.
    // ex) { addItem: contents => addItem(contents) }
    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this)
    });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this)
    });
  }

  get filteredItems () {
    const { isFilter, items } = this.state;
    return items.filter(({ active }) => (isFilter === 1 && active) ||
      (isFilter === 2 && !active) ||
      isFilter === 0);
  }

  addItem (contents) {
    const {items} = this.state;
    const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
    const active = false;
    this.setState({
      items: [
        ...items,
        {seq, contents, active}
      ]
    });
  }

  deleteItem (seq) {
    const items = [ ...this.state.items ];;
    items.splice(items.findIndex(v => v.seq === seq), 1);
    this.setState({items});
  }

  toggleItem (seq) {
    const items = [ ...this.state.items ];
    const index = items.findIndex(v => v.seq === seq);
    items[index].active = !items[index].active;
    this.setState({items});
  }

  filterItem (isFilter) {
    this.setState({ isFilter });
  }

}
```

```js
import Component from "../core/Component.js";

export default class ItemAppender extends Component {

  template() {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
  }

  setEvent() {
    const { addItem } = this.props; // 이렇게 props를 통해 이벤트 핸들러를 전달한다.
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      addItem(target.value);
    });
  }
}
```

```js
import Component from "../core/Component.js";

export default class Items extends Component {

  template() {
    const { filteredItems } = this.props;
    return `
      <ul>
        ${filteredItems.map(({contents, active, seq}) => `
          <li data-seq="${seq}">
            ${contents}
            <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
              ${active ? '활성' : '비활성'}
            </button>
            <button class="deleteBtn">삭제</button>
          </li>
        `).join('')}
      </ul>
    `
  }

  setEvent() {
    const { deleteItem, toggleItem } = this.props;

    this.addEvent('click', '.deleteBtn', ({target}) => {
      deleteItem(Number(target.closest('[data-seq]').dataset.seq));
    });

    this.addEvent('click', '.toggleBtn', ({target}) => {
      toggleItem(Number(target.closest('[data-seq]').dataset.seq));
    });
  }
}
```

```js
import Component from "../core/Component.js";

export default class ItemFilter extends Component {

  template() {
    return `
      <button class="filterBtn" data-is-filter="0">전체 보기</button>
      <button class="filterBtn" data-is-filter="1">활성 보기</button>
      <button class="filterBtn" data-is-filter="2">비활성 보기</button>
    `
  }

  setEvent() {
    const { filterItem } = this.props;
    this.addEvent('click', '.filterBtn', ({ target }) => {
      filterItem(Number(target.dataset.isFilter));
    });
  }
}
```

---

## 스터디 이후

### Template Method Pattern(템플릿 메서드 패턴)

- 객체지향 프로그래밍의 디자인 패턴 중 하나
- 알고리즘의 구조를 메서드에 정의하고, 하위 클래스에서 알고리즘 구조의 변경없이 해당 알고리즘을 재정의하여 사용하는 패턴이다.
- 알고리즘이 단계별로 나누어지는 경우 혹은 같은 역할을 하는 메서드지만 여러 곳에서 다른 형태로 사용이 필요한 경우 유용한 패턴이다.
- 상속을 통해서 슈퍼클래스의 기능을 확장할 때 사용하는 대표적인 방법이다. 변하지 않는 기능은 슈퍼 클래스에 만들어두고 자주 변경되며 확장할 기능은 서브 클래스에서 구현한다.

```ts
class SuperClass {
  constructor() {
    // 컨스트럭터
  }
  
  superLog() {
    console.log('슈퍼클래스에서 정의한 메서드');
    this.subLog();
  }
  
  subLog() {
    console.log('서브클래스에서 변경하며 사용할 메서드')
  }
}

class SubClass extends SuperClass {
  constructor() {
    // 컨스트럭터
    super();
  }

  subLog() {
    console.log('서브클래스에서 지금 변경한 메서드')
  }
}

const sub = new SubClass();
sub.superLog();

/* log
슈퍼클래스에서 정의한 메서드
서브클래스에서 지금 변경한 메서드
 */
```

위와 같이 `SubClass`로 생성된 `sub`객체가 `superLog`를 호출할 경우, SubClass에서 오버라이딩된 `subLog`가 호출되는 것을 볼 수 있다.

### reduce는 언제나 좋을까?(feat. map, join)

스터디원마다 편안한(?) 고차함수가 달랐다. 아래는 이야기를 나누며 나온 예시

```js
const names = ['jayden', 'den', 'zoey', 'lily', 'bakha'];

const literalWithReduce = names.reduce((acc, cur) => {
  return acc + `<li>${cur}</li>`;
}, '');

const literalWithMapJoin = names.map((name) => `<li>${name}</li>`).join('');
```

예시의 경우 2가지 모두 names 배열의 원소들을 받아서 li 태그 형태로 만든 후 문자열을 합친 literal을 반환한다. 정답은 없겠지만 reduce를 활용하는 경우, 고차함수 하나로 문자열을 추가하고 각 배열의 원소를
합칠 수 있다는 점에서 아주 약간의 성능 우위가 있을 것 같다. 반면 map, join은 names라는 배열을 2번 순회하기는 하지만, 함수형 프로그래밍에서 지향하는 선언형의 느낌을 정말 잘 보여준다고 생각한다.
(누가봐도 배열에 mapping을 하고 join을 통해 배열의 각 요소를 합쳐주고 있으니까)

나의 개인적인 결론은 다채롭게 활용가능하고 성능상의 우위를 점할 수 있는 reduce를 사용하되, 그 reduce에 전달하는 callback을 따로 분리하여 좀더 명확한 이름을 지어주는 게 좋다는 것이다.

```js
const names = ['jayden', 'den', 'zoey', 'lily', 'bakha'];
const getListTags = (acc, cur) => acc + `<li>${cur}</li>`;

const literalWithReduce = names.reduce(getListTags, '');
```



# 참고

- [개발자 황준일 - Vanilla Javascript로 웹 컴포넌트 만들기 1편](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/)
- [크로스 브라우징](https://pxd-fed-blog.web.app/cross-browsing/)
- [카카오테크 - GraphQL 개념잡기](https://tech.kakao.com/2019/08/01/graphql-basic/)
- [리액트 컴포넌트 생애주기 다이어그램](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
