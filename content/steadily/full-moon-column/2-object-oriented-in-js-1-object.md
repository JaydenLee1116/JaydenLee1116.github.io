---
emoji: 🌑
title: JS로 보는 객체지향 - 1.객체편
date: '2023-02-22 20:00:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 보름칼럼
---

# 🌕 보름칼럼

단순 기록보단 좀 더 양질의, 정리된 글을 쓰고자 시작하는 `보름칼럼`<br/>
부담없이 매 보름 하나의 주제를 깊게 들여다볼 수 있는 기회가 되었으면 좋겠다.<br/>
가수 윤종신님이 월간 윤종신을 통해 꾸준히 음악을 내시는 것과 같이 보름칼럼을 적어보자!

> 보름칼럼 규칙
>
> 1. 매일을 기록하는 성장일지보다 좀더 깊은 내용의 글을 작성할 수 있도록 하자.
> 2. 너무 욕심부리지말고 하나의 주제(키워드)에 집중한다.
> 3. 2주에 한 번 다듬어진 칼럼 형태의 글을 작성한다.
> 4. 마감은 매주 일요일을 기준으로 한다.

## 📃 글또 8기

개발자들이 모여 함께 글을 쓰고 피드백하는 커뮤니티인 [글또(글쓰는 또라이가 세상을 바꾼다.)](https://www.notion.so/zzsza/ac5b18a482fb4df497d4e8257ad4d516)에서
활동하게 되어 보름칼럼의 규칙은 글또의 규칙을 따르기로 한다.<br/>
2주마다 글을 작성하는 규칙은 동일하며, 그 마감 날짜는 아래와 같다. 마감 날짜를 체크하며 매번 글 작성에 대해 인지하도록 하자!<br/>

## 🚈 들어가기에 앞서...

- [JS로 보는 객체지향 - 1.객체편](https://jaydenlee1116.github.io/%EA%BE%B8%EC%A4%80%ED%9E%88%EA%B8%B0%EB%A1%9D/%EB%B3%B4%EB%A6%84%EC%B9%BC%EB%9F%BC/2-JS%EB%A1%9C%EB%B3%B4%EB%8A%94%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-1%EA%B0%9D%EC%B2%B4%ED%8E%B8/)
- [JS로 보는 객체지향 - 2.상속합성편](https://jaydenlee1116.github.io/%EA%BE%B8%EC%A4%80%ED%9E%88%EA%B8%B0%EB%A1%9D/%EB%B3%B4%EB%A6%84%EC%B9%BC%EB%9F%BC/3-JS%EB%A1%9C%EB%B3%B4%EB%8A%94%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-2%EC%9C%84%EC%9E%84%ED%95%A9%EC%84%B1%ED%8E%B8/)

처음 프로그래밍을 배우고 가장 이해가 안되고 공감되지 않았던 개발자분들의 말이 있었다. `어떤 실체화된 현실 세계의 것을 코드로 구현하고 현실의 문제를 해결하는 게 개발자다.`와 같은 말들이었다.
당장 화면에 `Hello, Wolrd!`를 찍어내고, 몇몇 계산을 편하게 하는 정도의 나에겐 전혀 공감이 되질 않았다. 이후 공부를 하며 그 말을 따라가다보니 `객체지향`에 도달했다.<br/>
처음 책 `객체지향의 사실과 오해`를 읽었을 때, 읽다가 중간에 포기했었다. 너무 좋은 책이라고 이야기는 들었지만, 기본적인 객체에 대한 개념이 없는 상태에서
읽었기 때문이다. 내용이 너무 추상적으로 다가왔고 읽을수록 더 헷갈리는 느낌이었다. 그렇게 시간이 조금 더 흐르고 어느정도 절차지향에서 함수, 모듈을 나누고 클래스를
사용하기 시작하면서 다시 이 책을 펼쳐들었다. 그리고 이 책은 짧은 개발자로서의 인생에서 내 최애 서적이 되었다. 정말 정말 재미있게 마치 빨려들어가듯이 읽었고 다 읽고 난 뒤,
정말 현실에 있는 모든 걸 다 코드로 구현할 수 있을 것만 같았다.(물론 실제로 그렇진 않다. 🤪)<br/>
처음 `객체`라는 개념으로 코드를 작성했던 기쁨을 기억하고 동시에 이제 처음 `객체지향`에 궁금증이 생기신 분들이 쉽게 그 느낌(?)을 받으셨으면 하는 마음으로 이 글을 작성한다.

## 🐜 사전적 객체지향 프로그래밍

`객체지향 프로그래밍`이란 뭘까? 먼저 단어를 분리해보자. `객체`와 `지향` 그리고 `프로그래밍`. 사전에서 이 3가지 단어의 정의를 찾아보면 아래와 같다.

- 객체: (명사) 행위가 미치는 대상
- 지향: (명사) 어떤 목표로 뜻이 쏠리어 향함
- 프로그래밍: (명사) 컴퓨터 프로그램을 작성하는 일. 프로그램 작성 방법 및 코딩 등 일련의 작업을 아우른다.

단순하게 사전적 의미이다보니 아주 직관적으로 와닿지는 않는다. 다만, 대략적으로 `어떤 대상이라는 것을 목표로 하며 코딩하는 것` 정도로 정리해볼 수 있다. 조금더 나아가서
`무언가 각각의 역할을 하는 대상들로 나누는 것을 목표로 코드를 작성하는 방법`이라고도 생각해볼 수 있을 것이다. 사전적으로 최대한 유추해보는 것은 여기까지가 한계인 것 같다.
그렇다면 컴퓨터공학적으로(?) 객체지향이라는 것은 무엇일까?

## 🐜 컴퓨터공학적(?) 객체지향 프로그래밍

일단 잘모르겠으니 위키백과에서의 설명을 찾아보자.

```
객체지향 프로그래밍(Object-Oriented Programming, OOP)은 컴퓨터 프로그래밍의 패러다임 중 하나이다.
객체지향 프로그래밍은 컴퓨터 프로그램을 명령어의 목록으로 보는 시각에서 벗어나 여러 개의 독립된 단위, 즉 "객체"들의 모임으로 파악하고자 하는 것이다.
각각의 객체는 메시지를 주고받고, 데이터를 처리할 수 있다.
객체지향 프로그래밍은 프로그램을 유연하고 변경이 쉽게 만들기 때문에 대규모 소프트웨어 개발에 많이 사용된다.
또한 프로그래밍을 더 배우기 쉽게 하고 소프트웨어 개발과 보수를 간편하게 하며, 보다 직관적인 코드 분석을 가능하게 하는 장점이 있다.
그러나 지나친 프로그램의 객체화 경향은 실제 세계의 모습을 그대로 반영하지 못한다는 비판을 받기도 한다.
```

위의 내용을 조금 쉽고 간단하게 정리해보자.

> 객체지향 프로그래밍은 프로그래밍을 하는 하나의 방법이다.<br/> 
> 한 줄 한 줄 명령어를 작성하는 것이 아닌, "객체"라는 하나의 단위이자 덩어리로 나눈다.<br/>
> 이 단위들은 서로 영향을 주고 받을 수 있으며 데이터를 처리할 수 있다.<br/>
> 코드 변경(수정)이 쉽기 때문에 큰 프로그램을 개발할 때 많이 사용한다.<br/>
> 프로그래밍을 더 배우기 쉽게 하고 유지보수를 간편하게 하며, 좀더 직관적으로 코드를 분석할 수 있게 해준다.<br/>
> 하지만 너무 지나치게 객체를 나누는 것은 실제 세계의 모습을 그대로 반영하지 못한다.

위의 문장이 객체지향을 전부 설명해주지는 못한다. 다만, 아주 대략적으로라도 그 느낌은 뭔지 알 것 같다. 뭔가 코드를 하나하나 명령 내리듯이 짜는 게 아니라, 하나의 객체라는
덩어리로 나눠서 작성하는 느낌 정도로만 이해하면 된다. 그렇다면 코드로 아주 간단하게 작성해보면 어떨까?

## 🐜 JavaScript 코드로 보는 객체지향 프로그래밍

먼저 `개미(ant)`를 코드로 구현해보고 싶다고 해보자. 시작은 정말 단순하게 해보자.

```js
let ant;
```

이게 뭐지..? 할 수 있지만, 말 그대로 ant를 구현했다. 그렇지만 현재 ant라는 변수는 어떠한 유의미한 값을 갖고 있지 않다. 천천히 이 ant에게 생기를 불어넣어보자.

```js
let ant = { name: 'ant1', age: 1 };
```

이제는 어떤가? ant를 name, age를 프로퍼티(속성)로 갖는 object로 표현함으로써 개미가 이름과 나이를 갖게 됐다.<br/>
헌데 여기서 또 욕심이 난다. 지금 이 개미는 정적인 상태(프로퍼티)만 갖고 있을 뿐 뭔가 어떤 동적인 행동(메서드)을 갖고 있지 않다.<br/>
좀더 살아있는(?) 개미를 만들어보자.

```js
let ant = { 
  name: 'ant1',
  age: 1,
  move() {
    console.log('ant is moving!') 
  }
};
```

ant의 메서드로 move를 작성해줌으로써 ant가 마치 움직이는 듯한 동작을 할 수 있게 됐다. 다만, 여기서 move 메서드는 단순히 'ant is moving!'이라는 문자열만 console에 출력해주는 역할을 한다.
즉, 개미의 move 행동이 개미 스스로에게 어떠한 영향도 주지 않는다.(개미의 상태가 변하지 않는다.) 일단 이 점은 넘어가고 개미를 좀더 동적인 어떤 무언가(객체)로 만들었음을 기억하자.<br/>

자, 그럼 이제 또다른 욕심이 스물스물 생긴다. 세상에 개미는 단 1마리만 존재하지 않는다.(추정상 지구에 개미는 약 2경 마리 서식한다고 한다. ㅎㄷㄷ) 그런데 우리가 구현한 코드로는 개미를 하나 하나
작성하며 생성해야한다. 여간 번거로운 일이 아닐 수 없다. 이제 여기서 생성자 함수가 등장할 수 있지만, 객체를 구현하는 대표적인 방법인 class를 써보려고 한다.

> 자바스크립트의 class는 2015년 ES6에서 도입되었다. 그 내부의 구현이 결국엔 자바스크립트의 prototype을 기반으로 하기에 비꼬는 이야기를 많이 듣는다.(찐 class로 인정할 수 없다는 뭐 그런 이야기...)

거두절미하고 class를 이용해서 ant를 표현해보자.

```js
// 보통 class는 첫글자를 대문자로 쓴다.
// (소문자로 쓴다고 뭐 큰일나는건 아니지만, 하나의 약속이라 생각하자.)
class Ant {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  move() {
    console.log('ant is moving!');
  }
}

const ant1 = new Ant('ant1', 1);
const ant2 = new Ant('ant2', 3);
const ant3 = new Ant('ant3', 8);
```

짠! 이제 우리는 Ant라는 class를 선언해줌으로써, 정말 간단하게 여러마리의 ant를 구현할 수 있게 되었다. 개미들은 각자의 name이 있고, age가 있으며 move 메서드를 통해 움직일 수 있다.<br/>
여기서 잠깐 쉬어가기 위해 위의 코드를 살펴보자.

- Ant class가 갖는 name과 age, 즉 프로퍼티는 개미의 `상태`를 나타내며 instance 생성 시, 우리가 원하는 값(이름, 나이)을 전달해줄 수 있다.
- Ant class가 갖는 move는 메서드, 즉 개미의 `행동(동작)`을 나타내며 instance 생성 시, 모든 개미 instance는 move를 갖고 있다.

다시 말해서 우리는 `개미`라는 곤충을 표현할 수 있는 어떤 추상적인 개념의 class를 만들고 이 class를 통해서 실체화된 하나 하나의 개미를 만들어낼 수 있는 것이다.<br/>
여기서 한가지 실제 우리가 살아가는 세상에서의 개념과 차이를 생각해보자. 우리가 아직 `개미`라는 단어가 존재하지 않았던 시절, 우리는 주위에 돌아다니는 실제 검고 3등신의 다리가 달린 아주 작은 곤충들(현재의
우리가 개미라고 부르는)을 보면서 "이런 애들을 개미라고 부르자"했을 것이다. 하지만 객체지향 프로그래밍에서는 이 접근이 반대라고 생각하면 된다. 먼저 우리가 큰 개념인 Ant class 라는 개념을 만들어두고
그 class에서 실체화된 하나하나의 개미들을 만들어내는 것이다. 이런 관점으로 생각하면 조금은 객체지향으로 무언가를 만들어내는 행위가 이해될 것이다.<br/>

그럼 이제 아까 언급했던 어딘가 아쉬운 move 메서드를 좀더 현실과 맞게 바꿔보자. 우선, 이를 위해 개미의 초기 위치를 받고 move할 때마다 그 위치에서 랜덤으로 +1 혹은 -1만큼 이동하게 만들어보자.

```js
class Ant {
  constructor(name, age, position) {
    this.name = name;
    this.age = age;
    this.position = position;
  }
  
  move() {
    if (Math.random() < 0.5) {
      this.position--;
    } else {
      this.position++;
    }
    
    console.log(`${this.name} 개미의 위치는 ${this.position} 지점 입니다.`)
  }
}

const ant1 = new Ant('ant1', 2, 0);
const ant2 = new Ant('ant2', 3, -5);
const ant3 = new Ant('ant3', 5, 15);
```

자, 이제 move라는 메서드(행동)를 통해 각각의 개미 객체의 position 프로퍼티(상태)를 변경하면서, 마치 실제 개미가 이리저리 움직이는 걸 표현할 수 있다. 아주 간단한 예시지만, 처음 만들었던 어떤 값도
들어있지 않은(물론 undefined로 초기화되겠지만) ant 변수에 비하면 많은 걸 할 수 있는 개미가 만들어졌다.

## 🚉 글을 마치며...

요즘 정말 정말 글을 잘 쓰고 싶은 욕심이 많이 든다. 글 작성과 코드 작성은 언어만 다르지 그 행위 자체는 정말 똑같은 것 같다. 특히 요즘은 사람이 읽기 편한, 가동성 좋은 코드를
많이 강조하는만큼 더 그런 것 같다. 조금 웃긴 건 코드를 최대한 분리하고 재활용 가능하게 하고 좀더 나은 문법을 체크하다보니 이상하게 글을 작성할 때도 그런 습관이 생긴다.
어떻게 좀더 파트를 잘 나누고, 흐름을 잘 가져가면서 좀더 좋은 표현을 쓸까 생각하면서 써내려가게 된다. 아주 아주 좋은 시너지라고 생각한다. 🥳</br>

이번 글은 각각의 파트들을 개미 이모지로 표현해봤다. 개미 파트 하나하나가 모여서 이 글 전체를 완성해주는 것을 통해 객체지향에서 여러 객체들이 모여 큰 소프트웨어가 완성되는 느낌을
표현해보고 싶었다.(잘 전달되었을지는 모르겠다.) 이렇듯 객체지향에선 객체들이 그들만의 `역할`과 `책임`을 갖고 서로를 도와가며(`협동`하며) 거대한 프로그램을 만들어간다. 이번 글을 통해
`객체` 하나에 대해 집중했다면, 다음 편에선 각 객체들이 어떻게 서로 도와가며 좀더 스케일업된 무언가를 만들어가는지 살펴보려 한다. 

> 아직 많이 부족한 개발자입니다. 내용에 대한 오류가 있다면, 언제든 편하게 말씀해주세요! 감사합니다! 

## 🎁 참고

- [네이버 국어사전](https://ko.dict.naver.com/#/main)
- [위키백과 - 객체지향 프로그래밍](https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)
- [책 - 객체지향의 사실과 오해](https://product.kyobobook.co.kr/detail/S000001628109)

```toc

```