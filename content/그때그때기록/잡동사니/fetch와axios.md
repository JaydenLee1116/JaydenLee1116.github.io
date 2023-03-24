---
emoji: 📦
title: fetch VS axios
date: '2023-03-24 16:00:00'
author: 제이든
tags:
categories: 잡동사니
---

## 📦 잡동사니

하나의 키워드를 잡고 좀 편하게 정리하고 싶어 만든 `잡동사니`<br/>

> 잡동사니는 조선 후기 학자 `안정복`이 편찬한 `잡동산이(雜同散異)`에서 유래된 말이다.
> 잡동산이는 `잡기(雜記)`의 형태를 빌려온 책으로 구체적인 체계가 잡혀있지 않은 형식이다.
> 항목이 다소 난잡하고 내용의 구분이 혼동되어있다고 한다. 🤣

## 🗂️ fetch VS axios

- 두 라이브러리 모두 JS 진영에서 통신을 위해 사용된다.
- 단순하게는 fetch가 좀더 예전 라이브러리, axios가 좀더 최신 라이브러리라고 생각해도 좋다.

### 비교하게 된 계기 그리고 fetch에서의 에러 처리

- 동료인 시저가 아래의 코드에서 왜 굳이 `try...catch...`를 쓰고 나서 또 그 안에서 res.ok로 에러 처리를 하는건지 궁금해하였다.

```js
try {
fetch('https://example.com/api/data')
  .then(res => {
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  })
  .then(data => console.log(data));
} catch (error) {
  console.log(`에러 발생: ${error}`)
}
```

- 얼핏 보면 `if (!res.ok)`가 굳이 있어야하나 싶었다. 어차피 `try...catch`로 에러 처리를 할텐데 굳이 또 조건문을 써줄 필요가 있을까? 하는 생각.
- 잘 생각해보면 `200번대는 통신이 성공한 것`이라는 건 HTTP를 통해 우리끼리 약속한 것이다. 즉, 300번이든 400번이든 함수 입장에서는 아무튼 비동기 처리가 완료되었으니 Promise 객체를 반환한다. 즉, `에러`가 아닌 것이다.
- 그렇기 때문에 따로 `res.ok`가 `false`일 때(200번대가 아닐 때), 일부러 error를 throw해서 `try...catch`가 잡아낼 수 있도록 해줘야하는 것이다.

### fetch와 axios의 차이점

- fetch api는 최신 브라우저에서 제공하는 JavaScript api이기 때문에 웬만하면 그냥 사용 가능하다. 반면 axios는 third-party 라이브러리로 별도의 설치가 필요하다.
- 위의 코드에서 fetch는 따로 `res.ok`를 통해 에러를 핸들링해야하는 반면, axios는 그 자체적으로 `catch()`라는 메서드를 제공하여 좀더 간편하게 에러를 핸들링할 수 있다.
- axios를 사용하면 각 요청 앞과 뒤에 호출되는 함수인 `request interceptor`와 `response interceptor`를 정의할 수 있다. 이를 통해 요청의 헤더, 페이로드 수정 등 오류를 처리할 수 있다.
- axios는 현재 진행 중인 요청을 취소하는 기능을 제공하여 사용자 입력을 처리하고 성능을 최적화하는데 유용하다.

결국에 server와의 통신을 할 때, `fetch`를 쓰느냐 `axios`를 쓰느냐는 본인의 프로젝트가 지향하는 부분 그리고 본인의 선호도에 따라 선택하면 된다.

### 참고

- [fetch](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)
- [axios](https://axios-http.com/kr/docs/intro)


```toc

```
