---
emoji: 🌱
title: 230406(목)
date: '2023-04-06 23:30:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 성장일지
---

## 🎄 성장일지 4.0

책 `행복한 이기주의자(웨인 다이어)`의 내용에 자극받아 시작하는 소박한 `성장기록`

> 살아있는 꽃과 죽은 꽃은 어떻게 구별하는가?<br/>
> 성장하고 있는 것이 살아 있는 것이다.<br/>
> 생명의 유일한 증거는 성장이다!

> 🌳 (1.0)키워드<br/>
> 최대한 간단하게 정리, 추후에 보면서 스스로 설명<br/>
> 🍉 (2.0)경험 위주로<br/>
> 단순 정보를 전달하기보다 무엇을 배웠고 어떻게 해결했는지 짧고 간단하게 작성<br/>
> ❄️ (3.0)정해진 템플릿에 맞춰서<br/>
> 키워드, 경험 모두 좋다. 다만 매일 작성하기로 마음 먹은만큼 핵심만 간결하게 정리할 수 있게 템플릿을 작성<br/>
> (3.1)230102부터 시작되는 학습에 관한 내용 추가<br/>
> (3.2)230313부터 좀더 경험, 감정 위주의 내용도 담기!<br/>
> 🌾 (4.0)학습 키워드에서 최대한 간단한 정보 제공, 고민에서 내 경험을 자세히 적자!<br/>

## 🔑 오늘의 학습 키워드

## 고민 사항

### 1. 각 컴포넌트 별 스타일을 어떻게 입힐까?

각각의 MVC 패턴을 적용한 컴포넌트마다 독립적인 스타일을 적용하고 싶은데... 보통 react와 함께 쓰는 styled-component나 emotion 같은 css in JS는 조사해보니 vanilla JS와 사용은 가능하지만 굉장히 불편하다고 한다. 해서 지금 생각 중인건 아주 작은 나만의 tailwind를 만들어보면 어떨까..?!(아직 생각은 여러 간단한 클래스들을 만드는 것 뿐이지만!!)

=> tailwind CSS를 사용해보기로 결정!
처음엔 순수 css로 여러 class를 만들어서 마치 작은 tailwind처럼 사용해보기로 했지만, 이번 프로젝트에는 크게/많이 규격화할 style들이 많이 있진 않아서 tailwind를 사용하면서 그 안에서 custom한 스타일 몇개를 만들어서 적용해보기로 결정했다.

### 2. tsconfig.json path 설정...!!!

```
"paths": {
       "@src/*": ["src/*"],
       "@components/*": ["src/components/*"],
       "@styles/*": ["src/styles/*"],
       "@utils/*": ["src/utils/*"],
     }, 
```
위와 같이 경로를 설정했지만, js로 컴파일 시에도 @가 그대로 남아서 에러가 발생했다..! 이게 왜 컴파일 때 알아서 안바뀌지...!!!!

해결: typescript의 'tsc' 명령어 만으로는 컴파일 시에 설정해놓은 path를 바꿔주지 못한다. 이 때 필요한 게, tsc-alias라는 라이브러리!!! 인스톨 후, `tsc && tsc-alias` 를 해주면 지정해둔 path까지 알아서 상대경로로 js에 반영된다.

### 3. tsc, tsc-alias, tailwind 변환 모두 한번에 watch로 할 수 없을까???

위의 컴파일 과정을 모두 저장 시 마다 반영되게 watch mode를 켜두고 싶었다. 해서 아래와 같이 스크립트를 짰다.

```
"scripts": {
    "watch": "tsc --watch && tsc-alias --watch ....."
  },
```

헌데 watch 모드는 위와 같이 한번에 실행이 안된다! 그러다 발견한 게 `npm-run-all`이라는 라이브러리!

설치 후 아래와 같이 scripts를 짜면 해결된다.

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch:ts": "tsc --watch",
    "watch:tw": "npx tailwindcss -i ./src/styles/global.css -o ./dist/styles/output.css --watch",
    "watch:tsa": "tsc-alias --watch",
    "watch": "npm-run-all -p watch:*"
  },
```

그리고 `npm run watch`를 실행하면 3가지 동시에 watch 모드가 적용되어 실행된다.

## 📝 요약 및 하루 간단 회고

오늘 하루는 정말 더 빨리 갔다. 일단 원하는대로 컴포넌트 별로 스타일을 주는 방법을 적용했다. 그리고 어느정도 기본 컴포넌트들을 만들어서 틀도 완성했다. 다만 이제 또 고민은
이렇게 각각 구현된 컴포넌트들을 어떻게 좀더 가독성있고 보기 좋게 트리 구조로 만들어주느냐, 그리고 마치 리액트의 props를 전달하여 자식 컴포넌트가 렌더링되듯이 구현하느냐이다.
완성해야될 컴포넌트들도 한 두개가 아니고, 서버도 만들어야하고...(이건 그냥 `json-server`해야하나... ㅠ 그래도 express 또 써보고 싶은데..!), 심지어 데이터도 크롤링해와야한다.
일단 지레 겁먹으면 생각할 게 너무 많아지니까..! 일단 하루하루 작게 쪼개서 완성해나가보자 :)~! 그래도 재미있게 행복하게 공부하고 있으니까!

### 오늘의 잘한 점

- 각 컴포넌트 스타일 적용 방법을 고민하고 찾고 적용한 점(feat. tailwindCSS)
- 기본 틀이 되는 컴포넌트들을 구현 완료한 점
- 번들러없이 typescript, type-alias로 절대경로 해결한 점(진짜 속이 다 시원하네)

### 오늘의 보완할 점

- yarn 버전... 흑

## 참고

- [tailwindCSS](https://tailwindcss.com/docs/installation)
- [워니님 - tailwindCSS 장단점](https://wonny.space/writing/dev/hello-tailwind-css)
- [type-alias stack overflow](https://stackoverflow.com/questions/59179787/tsc-doesnt-compile-alias-paths)

```toc

```
