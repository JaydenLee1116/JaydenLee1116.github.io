---
emoji: 📦
title: Proxy in JS
date: '2023-07-26 19:00:00'
author: 제이든
tags:
categories: 잡동사니
---

## 📦 잡동사니

하나의 키워드를 잡고 좀 편하게 정리하고 싶어 만든 `잡동사니`<br/>

> 잡동사니는 조선 후기 학자 `안정복`이 편찬한 `잡동산이(雜同散異)`에서 유래된 말이다.<br/>
> 잡동산이는 `잡기(雜記)`의 형태를 빌려온 책으로 구체적인 체계가 잡혀있지 않은 형식이다.<br/>
> 항목이 다소 난잡하고 내용의 구분이 혼동되어있다고 한다. 🤣

## 🗂️ 작성하게 된 이유

바닐라 JS로 간단한 기능을 구현하다가 Proxy 객체를 알게 되었다. 이전에도 살짝 공부는 했었지만, 개념은 기억이 나도 객체 자체의 사용방법은 기억이 나질 않아서 정리하게 되었다.

## 🗂️ Proxy

Proxy는 주로 `대리하다.`, `가로채다.`, `훔치다.` 등의 의미를 갖는다. 흔히 우리가 `쁘락지`라고 부르는 스파이 느낌의 단어도 Proxy에서 유래된 것이다.

IT 용어로 Proxy(프록시)가 사용되는 다양항 상황이 있다.
우선 Proxy 서버라고 하면 `대리 서버`라고 생각하면 된다. 클라이언트가 서버에 요청을 보내면 Proxy 서버가 요청을 받아서 서버에 요청을 보내고, 서버가 응답을 보내면 Proxy 서버가 응답을 받아서 클라이언트에게 응답을 보내는 방식이다. 이렇게 Proxy 서버를 두는 이유는 여러가지가 있지만, 주로 보안과 성능을 위해 사용한다.

그렇다면 JS에서의 Proxy는 어떤 역할을 할지 알아보자!

### 🗂️ Proxy in JS

JS에서의 Proxy는 객체의 기본적인 동작(JS의 객체에서 값을 읽어오는 것은 get, 값을 변경하는 것은 set이라고 한다.)을 가로채서 다른 동작을 할 수 있게 해준다. 이를 통해 객체의 동작을 수정하거나, 객체에 접근하는 방식을 변경할 수 있다.

아래와 같은 상황을 가정해보자.

```js
const target = { name: 'jayden' };

target.name; // jayden
```

알다시피 `target.name`으로 name 프로퍼티의 값을 `get`할 수 있다. 그런데 여기서 만약에 이 값을 읽어올 때, 어떤 무언가를 추가적으로 작업해주고 싶다면 어떻게 해야할까..? Proxy를 알지 못한다면 아래와 같이 코드를 작성할 수 있을 것이다.

```js
const target = { name: 'jayden' };

const doSomething = (target, callback) => {
  const result = target.name;
  callback(result);
  return result;
};

doSomething(target, (result) => {
  console.log(result); // jayden
});
```

`doSomething`에 target과 어떤 콜백을 전달하여 name에 해댕하는 값을 반환함과 동시에 해당 값을 log로 찍는 행위를 할 수 있다.
이제 Proxy를 사용해보자.

```js
const target = { name: 'jayden' };
const handleTarget = {
  get(target, prop, receiver) {
    console.log({ target, prop, receiver });
    return target[prop]; // 이렇게 반환하는 게 기본적인 getter 동작
  },
  set(target, prop, newValue) {
    console.log({ target, prop, newValue });
    target[prop] = newValue; // 이게 setter의 기본 동작
  },
};

const proxyObj = new Proxy(target, handleTarget);
```

Proxy 객체에 target과 handler를 전달하면, handler에 정의된 동작을 수행하게 된다. 위의 코드에서는 get과 set을 정의했기 때문에 target의 값을 읽어오거나 변경할 때, handler에 정의된 동작을 수행하게 되는 것이다.

처음 보면 복잡해보이지만 코드를 한 번 작성해보면 생각보다 간단한 것을 알 수 있다.

Proxy라는 객체가 있음을 기억하고 코드를 작성하다가 필요한 상황이 생기면 Proxy를 사용해보자!

```toc

```
