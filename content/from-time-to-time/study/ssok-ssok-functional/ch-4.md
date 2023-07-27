---
emoji: 🖍️
title: 쏙쏙 들어오는 함수형 코딩 Chapter 4
date: '2023-07-27 21:00:00'
author: 제이든
tags: 글 문서 요약
categories: 스터디 책
---

# 🖍 쏙쏙 들어오는 함수형 코딩 - 심플한 코드로 복잡한 소프트웨어 길들이기

이 글은 [쏙쏙 들어오는 함수형 코딩 - 심플한 코드로 복잡한 소프트웨어 길들이기](https://product.kyobobook.co.kr/detail/S000001952246)를 읽고 작성한 글입니다.
함수형도 함수형이지만, 이 책을 통해 좀더 깔끔하고 직관적인 코드를 작성할 수 있을 것이란 팀원들의 의견을 토대로 이번 스터디 서적으로 선정하였습니다.

## Chap 4. 액션에서 계산 빼내기

- 함수로 정보가 어떻게 들어가고 나오는지 이해하기
- 테스트하기 쉽고 재사용성이 좋은 코드를 만들기 위한 함수형 프로그래밍 이해하기
- 액션에서 계산을 분리하는 방법 알기

### 1) 변경 전 코드

```js
let shoppingCart = []; // 액션(A): 전역변수는 변경 가능하기 때문
let shoppingCartTotal = 0; // 액션(A): 전역변수는 변경 가능하기 때문

const addItemToCart = (name, price) => {
  shoppingCart.push({ name, price }); // 액션(A): 전역변수를 변경하고 있음
  calcCartTotal();
};

const updateShippingIcons = () => {
  let buyButtons = getBuyButtonsDom(); // 액션(A): DOM을 읽어오고 있음
  for (let i = 0; i < buyButtons.length; i++) {
    let button = buyButtons[i];
    let item = button.item;
    if (item.price + shoppingCartTotal >= 20) {
      button.showFreeShippingIcon(); // 액션(A): DOM을 변경하고 있음
    } else {
      button.hideFreeShippingIcon(); // 액션(A): DOM을 변경하고 있음
    }
  }
};

const updateTaxDom = () => {
  setTaxDom(shoppingCartTotal * 0.1); // 액션(A): DOM을 변경하고 있음
};

const calcCartTotal = () => {
  shoppingCartTotal = 0; // 액션(A): 전역변수를 변경하고 있음
  for (let i = 0; i < shoppingCart.length; i++) {
    shoppingCartTotal += shoppingCart[i].price;
  }
  updateTotalDom(); // 액션(A): DOM을 변경하고 있음
  updateShippingIcons(); // 액션(A): DOM을 변경하고 있음
  updateTaxDom(); // 액션(A): DOM을 변경하고 있음
};
```

### 2) 명시적 입력/출력, 암묵적 입력/출력

- 명시적 입력: 함수의 인자로 전달되는 값
- 명시적 출력: 함수의 반환값
- 암묵적 입력: 전역변수를 읽는 등 인자 외의 다른 모든 입력값
- 암묵적 출력: console.log(), DOM 변경, 전역변수 변경 등 반환값 외의 다른 모든 출력값

> 암묵적 입력과 출력: `부수효과`

### 3) 변경 절차

1. 계산에 해당하는 코드를 분리한다.
2. 계산에 해당하는 코드를 함수로 추출한다.
   - (처음부터 이것저것 변경하려하지 말고 그냥 그대로 함수를 분리하기만 한다.)
3. 해당 함수를 그대로 기존 코드에서 호출한다.
4. 추출한 함수에서 입력값은 인자로, 출력값은 리턴값으로 변경한다.

#### 3-1) 변경 전 calcCartTotal() 함수

```js
const calcCartTotal = () => {
  let shoppingCartTotal = 0; // 액션(A): 전역변수를 변경하고 있음
  for (let i = 0; i < shoppingCart.length; i++) {
    shoppingCartTotal += shoppingCart[i].price;
  }
  updateTotalDom(); // 액션(A): DOM을 변경하고 있음
  updateShippingIcons(); // 액션(A): DOM을 변경하고 있음
  updateTaxDom(); // 액션(A): DOM을 변경하고 있음
};
```

#### 3-2) 변경 후 calcCartTotal() 함수

```js
const calcTotal = (cart) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return total;
};

const calcCartTotal = () => {
  let total = calcTotal(shoppingCart);

  updateTotalDom(); // 액션(A): DOM을 변경하고 있음
  updateShippingIcons(); // 액션(A): DOM을 변경하고 있음
  updateTaxDom(); // 액션(A): DOM을 변경하고 있음
};
```

> Tip) 인자로 받는 객체를 불변성을 유지해야한다. 그렇지 않으면 인자라 해도 바깥에 존재하는 값은 변경할 수 있기 때문이다.<br/>
> 주로 `카피-온-라이트(copy-on-write)` 방법으로 객체를 복사해서 사용한다.

### 4) 변경 후 코드

```js
let shoppingCart = [];
let shoppingCart = 0;

const addItemToCart = ({ cart, name, price }) => {
  addItem({ cart, name, price });
  calcCartTotal();
};

const addItem = ({ cart, name, price }) => {
  cart.push({ name, price });
};

const updateShippingIcons = () => {
  let buyButtons = getBuyButtonsDom();
  for (let i = 0; i < buyButtons.length; i++) {
    let button = buyButtons[i];
    let item = button.item;
    if (isOverTwentyDollars({ item, shoppingCartTotal })) {
      button.showFreeShippingIcon();
    } else {
      button.hideFreeShippingIcon();
    }
  }
};

const isOverTwentyDollars = ({ item, shoppingCartTotal }) => {
  const newItem = { ...item };
  return newItem.price + shoppingCartTotal >= 20;
};

const updateTaxDom = () => {
  setTaxDom(calcTax(shoppingCartTotal));
};

const calcTax = (cartTotal) => {
  return cartTotal * 0.1;
};

const calcCartTotal = () => {
  const shoppingCartTotal = calcTotal(shoppingCart);
  updateTotalDom();
  updateShippingIcons();
  updateTaxDom();
};

const calcTotal = ({ cart }) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return total;
};
```

```toc

```
