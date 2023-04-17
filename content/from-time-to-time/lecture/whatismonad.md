---
emoji: 📖
title: Monad란 무엇인가?
date: '2023-01-31 14:00:00'
author: 제이든
tags: 글 문서 요약
categories: 강의
---

## 📚 Monad란 무엇인가?

이 글은 [Monad란 무엇인가?](https://www.youtube.com/watch?v=jI4aMyqvpfQ)를 시청 후 개인 공부 및 정리용으로 작성한 글입니다.<br/>

### Scala(Scalable Language)

- 사용자가 언어를 확장하면서도 원래 언어가 지원하는 것처럼 사용 가능

### Functional Language
 
- 함수가 1급 계층
- 변수 불변
- 타입클래스
- 패턴 매칭
- Currying

### Monad?

- 수학의 범주론에서 사용되는 구조로 Haskel, Scala에서 이를 프로그래밍에 적용

> map()을 단순하게 배열의 원소에 어떤 함수를 적용하고 그 반환값으로 새로운 배열을 만든다고 생각하면 고통이 시작된다.<br/>
> 모나드를 이해하는 데 이렇게 생각하는 건 좋지 못하다!<br/>
> (자바스크립트에서 flatMap()은 먼저 map을 하고 이후에 flat을 해주는 역할)<br/>

### Monad는 어떤 경우에 필요한가?

- 비동기 연산 처리 => Promise가 사실 Monad의 일종
- 값이 미래에 존재하거나 값이 null인 경우를 모델링할 때 Monad를 사용한다.

### Monad의 정의(발표자님 표현)

- Monad는 값을 담는 컨테이너의 일종
- Functor를 기반으로 구현되었음
- flatMap() 메소드를 제공한다.
- Monad Laws를 만족시키는 구현체를 말한다.

#### Functor란?

- 함수를 인자로 받는 map 메소드만 가진다.
- 타입인자 <T>를 가진다.
- 전달인자인 함수는 <T> 타입 값을 받아 <R> 타입 값을 반환하는 함수
- Functor는 map함수를 거쳐 <R>타입의 Functor를 반환

> map의 진정한 의미<br/>
> - 컬렉션의 원소를 순화하는 방법 X<br/>
> - <T>타입의 Functor를 <R> 타입의 Functor로 바꾸는 기능

##### Functor를 왜 쓰는걸까?

값을 꺼낼 수도 없고 할 수 있는 일이라고는 map() 메소드로 값을 변경하는 것뿐인데 왜 사용할까?

- 일반적으로 모델링할 수 없는 상황을 모델링할 수 있다.
- 값이 없는 케이스
- 값이 미래에 준비될 것으로 예상되는 케이스
- 함수들을 손쉽게 합성할 수 있다.

##### Functor - 값이 없는 케이스

- 사용하는 쪽에서 null check 불필요
- null인 경우, 그냥 로직이 실행되지 않음
- 즉, 타입안정성을 유지하면서 null을 인코딩하는 방법

##### Functor - 값이 미래에 준비되는 케이스
 
- Promise들에 map을 적용해도 계속 Promise로 나온다.
- 즉, non-blocking임을 의미 => 비동기 연산들의 합성이 가능

### 그래서 Monad가 뭔데?

- Functor에 flatMap()만 추가한 것
- Functor의 문제점이 있어서 등장한 게 Monad
- Functor가 Functor에 감싸져 있으면 Functor안에 Functor를 갖는 타입이 되어버린다.

### Monad의 의의

값이 없는 상황, 값이 미래에 이용 가능해질 상황 등의 일반적으로는 할 수 없는 여러 상황을 모델링할 수 있다.<br/>
비동기 로직을 동기 로직 구현처럼 동일한 형태로 구현하면서도, 함수의 합성 및 완전한 non-blocking pipeline을 구현할 수 있다.

### Reference

- [Monad란 무엇인가?](https://www.youtube.com/watch?v=jI4aMyqvpfQ)

#### 느낀점

아직 잘 모르겠다... 뭔가 그 타입을 일정하게 유지하면서 계속 파이프라인을 유지하게끔 하기 위한 거 같은데...ㅠ <br/>
이곳저곳 내용을 찾아봐도 뭔가 명쾌하지 않다고 해야하나... 아무래도 좀더 공부를 해봐야 조금씩 느낌일 올 것 같다.

```toc

```
