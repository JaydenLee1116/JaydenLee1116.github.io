---
emoji: 📦
title: commonjs VS esm
date: '2023-03-25 15:00:00'
author: 제이든
tags:
categories: 잡동사니
---

## 📦 잡동사니

하나의 키워드를 잡고 좀 편하게 정리하고 싶어 만든 `잡동사니`<br/>

> 잡동사니는 조선 후기 학자 `안정복`이 편찬한 `잡동산이(雜同散異)`에서 유래된 말이다.
> 잡동산이는 `잡기(雜記)`의 형태를 빌려온 책으로 구체적인 체계가 잡혀있지 않은 형식이다.
> 항목이 다소 난잡하고 내용의 구분이 혼동되어있다고 한다. 🤣

## Module: commonjs vs esm

### CommonJS(cjs)

```js
// add.js
module.exports.add = (x, y) => x + y;

// app.js
const { sum } = require('./add');

add(11, 16);
```

- `require/module.exports`를 사용한다.
- CJS module loader는 동기적으로 작동한다.
- CJS에서는 ESM을 `require`할 수 없다.(CJS는 `Top-level Await`을 지원하지 않기 때문이다.)
- CJS는 Tree-shaking(필요치 않은 코드와 사용되지 않는 코드를 삭제하여 JS 번들의 크기를 가볍게 만드는 기술) 적용이 어렵다.
  - 이는 빌드 타임에 정적 분석을 적용하기 어렵고 런타임에서만 모듈관계를 파악할 수 있기 때문인데, 단순하게 생각하면 우리가 일반적으로 쓰는 코드처럼 require을 사용할 수 있기 때문이다.(동적으로 사용 가능하다.)

```js
// require
let exampleName; // 동적으로 바뀔 수 있는 값이라고 가정
const util = require(`./utills/${exampleName}`);

// module.exports
function test() {
  if (exampleName === 'jayden') {
    module.exports = /* ... */
  }
}

test();
```

### ECMAScript Modules(ESM)

```js
// add.js
export function add(x, y) {
  return x + y
}

// app.js
import { add } from './add.js';

add(7, 19);
```

- `import/export`를 사용한다.
- ESM module loader는 비동기적으로 작동한다.(ESM module loader는 `Top-level Await`를 지원하기 때문이다.)
  - `Top-level Await`: 간단하게 설명하면 모듈 간에도 async/await를 통한 전달이 가능해지는 것. 더 자세한 사항은 아래 참고자료 보기!
- ESM에서 CJS를 `import`할 수 있다.
- ESM은 동적으로 사용이 불가능하다. 즉, 파일 최상위 스코프에서만 import, export가 가능하다.(정적인 구조의 모듈 의존을 강제한다.)
  - 그렇기 때문에 모듈 간의 의존 관계를 파악하기 쉬우므로 Tree-shaking을 쉽게 사용할 수 있다.

```js
import util from `./utils/${exampleName}.js`; // 불가능

import { add } from "./utils/jayden.js"; // 가능

function foo() {
  export const value = "foo"; // 불가능
}

export const value = "foo"; // 가능
```

### 끝으로

- 일단은 둘의 기본적인 사용법(?)에 있어서의 차이만 정리해보았다.
- 근본적으로 이 둘의 작동원리는 다르며, 실제로 현업에서는 이 둘을 혼용해서 사용할 필요가 있기에 모두 대응하려고도 하는 것 같다.(아래 Toss 아티클 참고)

## 참고

- [Toss tech - CommonJS와 ESM에 모두 대응하는 라이브러리 개발하기: exports field](https://toss.tech/article/commonjs-esm-exports-field)
- [Top-level await](https://fe-developers.kakaoent.com/2022/220728-es2022/)
- [tc39: Top-level await](https://github.com/tc39/proposal-top-level-await#use-cases)

```toc

```