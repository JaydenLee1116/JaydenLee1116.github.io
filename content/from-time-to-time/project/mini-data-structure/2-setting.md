---
emoji: 💾
title: Mini Data Structure(1. Setting)
date: '2023-08-20 20:30:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 프로젝트
---

# 💾 Mini Data Structure

평소에 자료구조를 공부하면서 JS에는 없는 자료구조에 대해서는 다소 이해하기가 어려웠다. 예를 들어, JS의 Array는 이미 동적 배열이고 LinkedList는 따로 존재하지도 않기 때문이다. 그러다 마침 라이브러리로 npm 배포하는 것도 해보고 싶었고, 모노레포도 다뤄보고싶어서 이번에 자료구조 라이브러리를 만들어보기로 했다.

## 📝 2. Setting

대략적인 디렉토리 구조를 잡았으니, 본격적으로 어떻게 라이브러리 저장소를 세팅할지 생각해보자. 그에 앞서서 나는 번들러로 vite를 사용하기로 했기 때문에 vite로 프로젝트를 세팅하고 vite에서 지원하는
라이브러리 모드를 살펴보기로 했다.

### library

이전글의 `library` 폴더를 만들 때는 아래의 명령어를 통해 생성한다.

```bash
yarn create vite
```

그러면 cli에서 프로젝트 세팅과 관련한 몇가지 질문이 나온다. 기본적으로 타입을 지원할 것이기 때문에 `Vanilla TypeScript`로 세팅해주었다.(JavaScript로도 타입 지원이 가능하지만, 조금 번거롭다.)

## 참고

- [vite build: 라이브러리 모드](https://ko.vitejs.dev/guide/build.html)

```toc

```
