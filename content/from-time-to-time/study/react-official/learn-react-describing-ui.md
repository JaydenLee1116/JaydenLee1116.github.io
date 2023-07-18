---
emoji: 📜
title: react - Learn React(Describing the UI)
date: '2023-05-28 10:00:00'
author: 제이든
tags: 글 문서 요약
categories: 스터디 공식문서
---

## 📎 React

이 글은 [리액트 공식문서 - 함수 컴포넌트](https://react.dev/)를 읽고 작성한 글입니다. 모든 내용을 다루지는 않고 개인적으로 부족했다고 느꼈던 부분, 새롭게
알게 된 부분들을 간단하게 정리할 예정입니다.

## Learn React - Describing the UI

리액트는 UI(User Interface)를 렌더링하기 위한 자바스크립트 라이브러리이다. UI는 버튼, 텍스트 그리고 이미지들과 같은 작은 단위로부터 구성된다.
리액트는 그 작은 단위들을 재사용 가능하고, 중첩 가능하게 결합할 수 있게 해준다. 웹 사이트에서부터 폰 앱들까지 화면에 있는 모든 것들은 컴포넌트로 분해할 수 있다.
이번 챕터에서 리액트 컴포넌트들을 만들고, 커스터마이즈하고 조건적으로 보여지게하는 방법을 배울 것이다.

> Describing the UI 텝의 요약 내용은 짧게 작성하고 넘어가겠습니다.

1) 당신의 첫 컴포넌트

리액트 어플리케이션은 컴포넌트라고 불리는 독립된 UI 조각들로 구성된다. 리액트 컴포넌트는 `마크업을 뿌리는 자바스크립트 함수`이다. 컴포넌트들은 버튼처럼 작을 수도,
전체 페이지처럼 클 수도 있다.

2) 컴포넌트를 불러오고 내보내기(Importing and Exporting Components)

당신은 하나의 파일에서 많은 컴포넌트들을 선언할 수 있지만 매우 큰 파일은 유지보수하기 힘들다. 이런 문제를 해결하기 위해 esm(import, export)를 사용할 수 있다.

> 이건 ecmascript의 규격인데, 이게 react의 장점인 것처럼 쓴 게 맞나 싶긴하다.(결국엔 리액트 컴포넌트도 그냥 JS 함수이고 이 함수를 esm으로 관리하는 것 뿐인데..!)

3) JSX를 통해 markup을 작성 가능

각 리액트 컴포넌트는 리액트가 브라우저로 렌더링하는 마크업들을 포함하고 있는 JS 함수이다. 리액트 컴포넌트들은 JSX라고 불리는 syntax extension을 사용하여 markup을 표현한다.
JSX는 HTML이랑 비슷하지만, 좀더 엄격하고 동적인 정보를 보여줄 수 있다.

4) `{}(중괄호)`를 통해 JSX에 JS 문법 사용하기

JSX는 자바스크립트 파일 안에서 (HTML 같은) markup을 작성할 수 있게 한다. 그리고 이것은 같은 곳에서 렌더링 로직과 컨텐츠를 유지하게 해준다. 때로는 당신은 markup에 작은 JS 로직 혹은
동적인 값을 넣고 싶을 수 있다. 이럴 때, 당신은 중괄호를 사용하여 JSX에 JS 문법을 넣을 수 있다.

5) 컴포넌트를 통과하는 props

리액트 컴포넌트들은 서로 소통하기 위해 `props`를 사용한다. 모든 부모 컴포넌트는 그들의 props를 자식 컴포넌트에게 전달함으로써 몇몇 정보를 줄 수 있다. props는 HTML attributes를
생각나게 하지만, props를 통해서는 object, array, function, 심지어 JSX까지도 전달 할 수 있다.

6) 조건부 렌더링

당신의 컴포넌트는 종종 조건에 따라서 다른 화면을 보여주고 싶을 것이다. 리액트에선, JS의 if 조건문처럼 `&&` 혹은 `? :`을 사용하여 조건부 렌더링을 할 수 있다.

7) 리스트 렌더링

당신은 어떤 데이터의 묶음으로부터 다수의 비슷한 컴포넌트들을 보여주길 원할 것이다. 당신은 리액트와 함께 JS의 `filter`과 `map`을 사용하여 데이터 배열을 컴포넌트 배열로 변환할 수 있다.
각각의 배열 아이템들에는 특정한 `key`가 필요하다.(중요) 보통은 Database의 id를 key로 사용한다. 리액트는 `Key`를 통해 배열이 변하더라도 배열 내부의 각 아이템들을 추적할 수 있게 된다.

8) 컴포넌트들을 순수하게 두어라

리액트 컴포넌트들은 순수한 함수처럼 작동해야 한다.

- 순수한 함수는 동일한 인자를 받으면 항상 동일한 결과를 반환한다.
- 순수한 함수는 부작용(side effect)이 없다.

컴포넌트들을 엄격하게 순수함수로 작성함으로써, 예상치 못한 버그들과 코드베이스가 커짐에 따라 생기는 예측불가능한 상황을 피할 수 있다.

## 1. Your First Component

`컴포넌트`는 리액트의 핵심적인 컨셉이다. 컴포넌트들은 UI를 완성함에 있어서 기초가 되고, 그것은 당신의 리액트 여행을 시작하는데 있어서 가장 중요한 부분이다.

### Components: UI building blocks

HTML에서 정해진 태그를 제공하듯, 리액트에서는 당신만의 컴포넌트를 만들 수 있다. 또한, Chakra UI와 Material UI 같은 리액트 오픈소스 커뮤니트를 통해
수천개의 컴포넌트를 사용할 수 있다. 즉, 당신만의 재사용가능한 UI element를 만들 수 있다는 것이다.

### Defining a component

리액트 컴포넌트는 마크업과 함께 뿌릴 수 있는 자바스크립트 함수이다.

## Using a component

당신이 만든 컴포넌트를 다른 컴포넌트의 내부에서 사용할 수 있다.(`이걸 composition 혹은 nesting이라고 한다.`) 이것은 당신이 만든 컴포넌트를 재사용할 수 있게 해준다.
HTML tag는 소문자로 제공되게에 리액트가 알아차릴 수 있다. 그래서 당신이 만든 컴포넌트는 대문자로 시작해야 한다.

- 컴포넌트 함수 내부에서 다른 컴포넌트 함수를 정의하는 것은 절대 금지다! 모든 컴포넌트는 반드시 최상단에서 정의되어야 한다.

> React 어플리케이션은 `root` 컴포넌트에서 시작된다. CRA를 사용하는 경우, `src/App.jsx`가 root 컴포넌트이며 Next.js 프레임워크를 사용하는 경우, `pages/inex.jsx`가 root 컴포넌트이다.
> 대부분의 React 앱은 모든 부분에서 컴포넌트를 사용한다. 아주 작은 단위부터 페이지와 같은 큰 단위까지! 컴포넌트가 단 한번만 사용된다고 하더라도 리액트 컴포넌트를 통해 작성하는 것은
> UI 코드와 마크업을 정리하는 편리한 방법이다.<br/>
> React 기반의 많은 프레임워크들은 빈 HTML 파일을 사용하고 JS로 페이지 관리를 대신 수행하도록 하는 대신, React 컴포넌트에서 HTML을 자동으로 생성하기도 한다.
> 그럼으로써 JS 코드가 로드되기 전에 앱에서 일부 컨텐츠를 표시할 수 있다.

## 2. Importing and Exporting Components

### The root component file

- React에서는 `App.js`라는 `root 컴포넌트 파일`이 존재한다. 설정에 따라서 다른 파일에 존재할 수도 있다. 한편 NEXT.js에서는 페이지 별로 root 컴포넌트가 다를 수 있다.

### Exporting and importing a component

- 컴포넌트를 다른 파일에서 사용하려면, 컴포넌트를 `export`해야 한다. 그리고 그 컴포넌트를 사용하고 싶은 파일에서 `import`해야 한다.

> React에서는 'Gallery.js'와 './Gallery' 모두 사용 가능하지만, 전자의 경우가 ESM 방식에 더 가깝다.<br/>

### Exporting and importing multiple components from the same file

- 하나의 파일에서 `default export`와 `named export`를 동시에 사용 가능하다.

## Writing Markup with JSX

- JSX는 JS를 확장한 문법이다. JS 파일 안에 HTML과 유사한 마크업을 작성할 수 있도록 해준다. 컴포넌트를 작성하는 다른 방법도 있지만, 보편적으로 JSX가 사용된다.

> `React.createElement('div', null, `Hello ${this.props.toWhat}`);`과 같이 JSX를 사용하지 않고 컴포넌트를 작성할 수도 있다.

### JSX: Putting markup into JavaScript

- 기존의 웹은 HTML로 컨텐츠, CSS로 디자인, JS로 로직을 작성해왔다. 이렇드 보통은 분리된 파일로 각각 관리하였다.
- 웹이 발전하고 더욱더 interactive해지면서 `로직이 컨텐츠를 결정하는 경우`가 증가했다. 그러면서 JS가 HTML도 담당하게 되었고 이게 바로 React 컴포넌트에 렌더링 로직과 마크업이 함께 들어가게 된 이유이다.
- 각 React 컴포넌트는 브라우저에 렌더링될 마크업을 반환하는 함수이다. React 컴포넌트는 JSX라는 구문 확장자(JS 객체)를 사용하여 해당하는 마크업을 표현한다. HTML과 유사해보이지만 더 엄격하고 동적으로 정보를 표시할 수 있다.

> JSX와 React는 별개의 개념이다. 사실상 함께 사용되기는 하지만 독립적으로 사용도 가능하다. JSX는 `구문 확장`, React는 JS 라이브러리이다.

### The Rules of JSX

#### 1. Return a single root element

- JSX는 반드시 하나의 루트 엘리먼트를 반환해야 한다. 여러 엘리먼트를 반환하려면, `React.Fragment`(`<></>`)를 사용하면 된다.

> 왜 하나의 엘리먼트를 반환해야할까??<br/>
> JSX는 결국 `JS 객체`이다. 헌데 하나의 엘리먼트로 감싸지 않으면 마치 배열을 감싸지 않고 한번에 여러개의 원소를 return하겠다는 것과 동일하다.

#### 2. Close all the tags

- 반드시 태그를 명시적으로 닫아야 한다.

#### 3. camelCase all most of the things!

- JSX는 결국 JS 객체이고 이 안에서 작성된 어트리뷰트들은 이 객체의 key가 된다. 그렇기 때문에 camelCase로 작성하는 것을 권장한다.
- 또한 일반 HTML 태그의 어트리뷰트 중 `class`를 대체하는 것은 `className`으로 이는 JS에 이미 존재하는 `class` 예약어때문이다.

## JavaScript in JSX with Curly Braces

- JSX로 작성한 마크업 안에 JS 로직을 추가하거나 동적인 값을 표현하고 싶을 때, 중괄호`{}`를 사용한다.

### Using “double curlies”: CSS and other objects in JSX

- 종종 중괄호 안에 중괄호를 사용해야 할 때가 있다. 예를 들어, CSS를 작성할 때, 중괄호 안에 객체를 작성해야 한다. 이때, 중괄호를 두번 사용하면 된다.(은근 잘 헷갈린다.)
- 반드시 JSX에서 가장 바깥 `{}`는 JS 코드를 작성하기 위한 것이고, 안쪽 `{}`는 객체를 작성하기 위한 것이라는 것을 기억하자.

> style 전달을 위한 객체의 key값은 camelCase로 작성해야 한다.

## Passing Props to a Component

- React 컴포넌트는 props를 이용해 서로 통신한다.(값을 주고 받는다.) 부모 컴포넌트는 props를 전달함으로써 정보를 자식 컴포넌트에게 전달할 수 있다.
- props는 HTML 어트리뷰트(속성)을 떠오르게 하지만, JS의 모든 `값`을 전달할 수 있다.

### Familiar props

```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}
```

- 위의 코드에서 `src`, `alt`, `width`, `height`는 모두 props이다. 이는 HTML의 어트리뷰트와 유사하다.

아래와 같은 방식으로 부모가 전달한 props를 받아서 자식이 사용할 수 있다.

```jsx
import { getImageUrl } from './utils.js';

// 개인적으로 내가 좋아하는 방법
function Avatar(props) {
  const { person, size } = props;
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

// 파라미터로 바로 구조분해할당하는 방법
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </div>
  );
}
```

- props는 컴포넌트에서 전달할 수 있는 유일한 `함수의 파라미터`이다.

### Forwarding props with the JSX spread syntax

- props를 전달할 때, `전달하고 싶은 props의 개수가 많아지면` 번거롭다. 이때, `JSX spread syntax`를 사용하면 편리하다.

```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}

// 부모 컴포넌트의 모든 props를 전달한다면 아래와 같이 쓰는 게 더 깔끔할 수 있다.
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

### Passing JSX as children

- 컴포넌트를 사용할 때, `<Avatar />`처럼 태그를 사용하는 것이 아니라, `<Avatar></Avatar>`처럼 사용할 수도 있다. 이때, 컴포넌트의 `children`이라는 props에 JSX를 전달할 수 있다.

```jsx
import Avatar from './Avatar.js';

// Card 컴포넌트는 내부에서 무엇이 렌더링되는지 알 필요가 없다.
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

- 시각적 래퍼에 대한 컴포넌트를 만들 때, `children`을 사용하면 유용하다.

```jsx
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

function CardWithAvatar({ children }) {
  return (
    <Card>
      <Avatar size={100} />
      {children}
    </Card>
  );
}

export default function Profile() {
  return (
    <CardWithAvatar>
      <h1>Katsuko Saruhashi</h1>
      <p>Chemist</p>
    </CardWithAvatar>
  );
}
```

### How props change over time

- 컴포넌트는 `props`를 통해 정보를 전달받는다. 이때, `props`는 `immutable`하다. 즉, 컴포넌트가 렌더링되는 동안 `props`는 변하지 않는다.
- 반드시 props에 대한 변경을 시도하지 말자. 컴포넌트가 렌더링되는 동안 props는 변하지 않는다는 것을 기억하자.
- 어떤 변경을 위한 정보를 전달하고 싶다면, `state`를 사용하자.

## Conditional Rendering

- 어떤 조건에 따라 다른 UI를 보여줘야하는 경우로 리액트에서는 주로 `if` 문, `&&` 연산자(논리 연산자), `?`와 `:` 연산자(삼항 연산자)를 사용한다.
- `null`!!! 리액트에서 `null`은 아무것도 렌더링하지 않는다.(null은 아무것도 렌더링하지 않겠다는 의미이다.)

> `null`은 아무것도 렌더링하지 않는다는 점을 이용하면, 조건부 렌더링을 할 수 있다.

```jsx
function Profile({ person }) {
  if (person === null) {
    return null;
  }

  return (
    <div>
      <Avatar person={person} />
      <div>{person.name}</div>
    </div>
  );
}
```

- 삼항연산자를 사용하여 조건부 렌더링을 할 수 있다. 단, 너무 잦은 삼항연산자 사용은 가독성을 낮출 수 있기에 자식 컴포넌트를 추출하여 정리하는 것을 고려하는 게 좋다.

```jsx
function Profile({ person }) {
  return (
    <div>
      {person !== null ? (
        <>
          <Avatar person={person} />
          <div>{person.name}</div>
        </>
      ) : null}
    </div>
  );
}
```

- 논리연산자(&&)는 주로 조건이 참일 때 일부 JSX를 렌더링하고 그렇지 않으면 아무것도 렌더링하지 않으려 할 때 자주 사용된다.

```jsx 
function Profile({ person }) {
  return (
    <div>
      {person !== null && (
        <>
          <Avatar person={person} />
          <div>{person.name}</div>
        </>
      )}
    </div>
  );
}
```

> &&의 왼쪽에 숫자가 오게 하지 말자! 예를 들어 우리는 흔히 `0`이 falsy하기 때문에 `0`이 오면 `0`이 렌더링되지 않는다고 생각할 수 있다. 하지만 `0`은 falsy하지만 `false`는 아니기 때문에 `0`이 렌더링된다.

```jsx
function Example() {
  return (
    <div>
      {0 && <div>zero</div>}
      {false && <div>zero</div>}
    </div>
  );
}
```

이럴 땐 0의 표현을 true/false로 바꿔주면 된다.

```jsx
function Example() {
  return (
    <div>
      {!!0 && <div>zero</div>}
      {!!false && <div>zero</div>}
    </div>
  );
}
```

## Rendering Lists

- 우리가 갖고 있는 데이터 모음에서 유사한 컴포넌트를 여러 개 렌더링하고 싶을 때가 있다. 이때, `map` 혹은 `filter`을 사용하면 된다.

```jsx
function ProfileList({ profiles }) {
  return (
    <div>
      {profiles.map((profile) => (
        <Profile person={profile} />
      ))}
    </div>
  );
}
```

### Keeping list items in order with `key`

- 배열 형태의 데이터를 map, filter 등으로 컴포넌트로 표현할 때, `key`를 지정해주지않으면 아래와 같은 경고 메시지를 확인할 수 있다.

```shell
Warning: Each child in a list should have a unique “key” prop. 
경고: 목록의 각 자식에는 고유한 “key” prop이 있어야 합니다.
```

- map() 호출 내부의 JSX 요소에는 항상 고유한 `key` prop을 지정해야 한다.
- `key`는 각 컴포넌트가 어떤 배열 항목에 해당하는지 리액트에 알려주어 나중에 매칭할 수 있도록 한다. 배열이 정렬되어 그 내부 데이터가 이동하거나, 삽입, 삭제되는 경우 key를 기반으로 추적한다.
- key값은 프론트엔드에서 즉석으로 생성하는 것이 아닌, 데이터베이스에서 가져온 데이터의 고유한 식별자를 사용하는 것이 좋다.(로컬에서 생성된 데이터를 사용하는 경우 `crypto.randomUUID()` 혹은 `uuid`를 사용하는 것이 좋다.)

```jsx
function ProfileList({ profiles }) {
  return (
    <div>
      {profiles.map((profile) => (
        <Profile key={profile.id} person={profile} />
      ))}
    </div>
  );
}
```

> Fragment(<></>)에는 key값을 전달할 수 없으므로, 리액트에서 사용하는 Fragment를 사용할 수 있다.

### Rules of keys

- key는 형제 간에 고유해야 한다. 당연히 다른 데이터 배열의 JSX 노드에는 동일한 key를 사용해도 괜찮다.
- key가 변경되지 않아야 한다. key는 컴포넌트의 `props`와 `state`에 의존해서는 안된다. key는 컴포넌트가 렌더링될 때마다 고유한 값이어야 한다.

### Why does React need keys???

- 데스크톱 파일에 이름 대신 순서가 적혀있다고 생각해보자. 처음엔 나쁘지 않지만, 첫번째 파일이 지워지면 `두번째 파일이 곧 첫번째 파일이 된다.` 즉, 헷갈리게 된다.(그냥 배열의 index로 key를 지정하면 이런 문제가 발생한다.)
- 이 때, 폴더의 파일 이름과 JSX key는 비슷한 역할을 한다. key를 사용하면 형제 항목 사이에서 특정 항목을 고유하게 식별할 수 있다. 데이터 내의 고유한 id를 통해 key를 지정하게 되면 재정렬로 인해 데이터의 위치가 변경되더라도 key는 변하지 않기 때문에 문제가 발생하지 않는다.

> 절대로 key를 `Math.random()`과 같이 즉석에서 생성하면 안된다. 렌더링될 때마다 새로운 key가 생성되기 때문에 컴포넌트가 불필요하게 리렌더링되고 성능이 저하된다.<br/>
> 컴포넌트는 `key`를 prop으로 받지 않는다. 만약 자식 컴포넌트에게 어떤 고유한 id를 전달해주고 싶다면 별도의 prop으로 전달해야 한다. `<Profile key ={id} userId={id} />`

## Keeping Components Pure

- 컴포넌트는 `props`와 `state`에 의존해서는 안된다. 컴포넌트는 `props`와 `state`가 변경되지 않으면 항상 동일한 결과를 렌더링해야 한다. 이를 `순수 컴포넌트`라고 한다.

### Purity: Components as formulas

- 순수 컴포넌트는 수학적인 함수와 비슷하다. 함수는 입력값이 같으면 항상 동일한 결과를 반환한다. 컴포넌트도 `props`가 같으면 항상 동일한 결과를 렌더링한다.

```jsx
function Profile({ person }) {
  return (
    <div>
      <p>{person.name}</p>
      <p>{person.age}</p>
    </div>
  );
}
```

- 위의 컴포넌트는 순수 컴포넌트이다. `props`가 같으면 항상 동일한 결과를 반환한다. 만약 `props`가 변경되면 컴포넌트는 다시 렌더링된다.

### Side Effects: (un)intended consequences

- React의 렌더링 과정은 항상 순수해야 한다. 컴포넌트는 JSX만을 반환하며, 렌더링 전에 존재해던 객체나 변수를 변경해서는 안된다. 이를 `부수 효과`라고 한다.

### Detecting impure calculations with `StrictMode`

- 리액트에서는 렌더링하는 동안 읽을 수 있는 입력값이 3가지 있다. `props`, `state`, `context`. 이 3가지 값은 렌더링 중에만 읽을 수 있으며, 렌더링 이후에는 읽을 수 없다. 이를 `읽기 전용`이라고 한다.
- 사용자 입력에 대한 응답으로 무언가를 바꾸려면 변수 대신 `state`를 설정해야 한다. 컴포넌트가 렌더링되는 동안엔 기존 변수, 객체를 절대 변경해서는 안된다.
- 리액트는 `개발 환경`에서 각 컴포넌트의 함수를 두 번 호출하는 `Strict Mode`를 제공한다. `Strict Mode`는 컴포넌트 함수를 `두 번` 호출함으로써 규칙을 위반하는 컴포넌트를 찾아내는 데 도움이 된다.

### Where you can cause side effects

- 함수형 프로그래밍은 `순수성`에 크게 의존하지만, 언젠가 어디에선가 무언가는 바뀌어야 한다. `화면 업데이트`, `애니메이션 시작`, `데이터 변경`과 같은 이러한 변경을 `사이드 이펙트(부수 효과)`라고 한다.
- 사이드 이펙트는 렌더링 중에 일어나는 것이 아니라 `부수적으로` 일어나는 일을 말한다.
- 리액트에서 사이드 이펙트는 주로 `이벤트 핸들러`에 속한다. 이벤트 핸들러는 유저가 어떤 동작을 수행할 때(ex) 버튼을 클릭 할 때) React가 실행하는 함수이다.
- 이벤트 핸들러가 컴포넌트의 내부에 정의되어있긴 하지만, 렌더링 중에는 실행되지 않는다. 즉, 이벤트 핸들러는 순수할 필요가 없다.

> 다른 모든 옵션을 다 시도했는데도 사이드 이펙트에 적합한 이벤트 핸들러를 찾을 수 없다면, `useEffect` 훅을 사용하여 반환된 JSX에 이벤트 핸들러를 추가할 수 있다.<br/>
> 그렇게되면 나중에 렌더링 후 사이드 이펙트가 허용될 때 React가 이것을 실행한다. 단, 이 방법은 최후의 수단으로 두어야 한다!!!<br/>
> 가능하면 렌더링만으로 로직을 표현하고자 해보아라! 많은 것을 배울 수 있을 것이다!

### Why does React care about purity?

- 컴포넌트를 다른 환경(ex) 서버)에서 실행할 수 있다. 이 때, 동일한 입력에 대해 동일한 결과를 반환하기에 하나의 컴포넌트가 많은 사용자 요청을 처리할 수 있다.
- 입력이 변경되지 않은 컴포넌트는 이전에 렌더링된 결과를 재사용할 수 있다. 이를 `리액트의 재조정`이라고 한다.(순수 함수는 동일한 입력에 대해 동일한 출력이 나오기 때문에 가능하다.)
- 깊은 컴포넌트 트리를 렌더링하는 도중에 어떤 데이터가 변경되면 React는 오래된 렌더링을 완료하지 않고 렌더링을 다시 시작할 수 있다.

# 참고

- [React 공식 문서 - describing the ui](https://react-ko.dev/learn/describing-the-ui)

```toc

```