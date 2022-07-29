---
emoji: 🍊
title: script 태그
date: '2022-07-29 15:35:00'
author: 제이든
tags: js script tag
categories: JAVASCRIPT
---

# 🍍 들어가기에 앞서

이 글은 [모던 JavaScript 튜토리얼](https://ko.javascript.info/)을 공부하며 기억해둘 내용들을 기록 및 추가 정리한 글입니다.<br/>

## 📚 코어 자바스크립트(core JavaScript)란

코어 자바스크립트란 `실행 환경`에 독립적인 자바스크립트를 의미합니다.<br/>
예를 들어 `alert` 명령어는 브라우저 환경에서만 작동하는 자바스크립트 명령어입니다.(Node.js와 같은 서버 사이드 환경에서는 작동하지 않습니다.)

## 📔 script 태그`<script>`

### 내부 스크립트

`<script>` 태그를 이용하여 HTML 문서 대부분의 위치에서 자바스크립트 프로그램(스크립트)을 실행할 수 있습니다.<br/>
`<script>` 태그를 만나게 되면 그 즉시 그 안의 자바스크립트 언어를 실행하게됩니다.<br/>
일반적으로는 `<body>` 태그의 맨 마지막에 위치합니다.<br/>
자바스크립트 코드의 양이 적은 경우에만 내부에서 실행하고 보통은 외부에 파일을 따로 두어 실행합니다.

### 외부 스크립트

외부 스크립트를 이용할 경우, 브라우저가 스크립트를 다운받아 `캐시`에 저장하게 됩니다.<br/>
즉, 브라우저는 페이지가 바뀔 때마다 스크립트를 새로 다운받지 않고 캐시에 저장된 스크립트를 가져와 사용할 수 있게 됩니다.이를 통해 트래픽 절약 및 웹 페이지 실제 속도가 향상됩니다.

```html
<!-- 절대 경로 사용 -->
<script src="/path/to/script.js"></script>

<!-- 상대 경로 사용 -->
<script src="script.js"></script>

<!-- url 경로 사용 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>

<!-- 여러 개의 스크립트를 삽입할 때 -->
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>

<!-- ❎ scr속성이 있는 경우 태그 내부의 코드는 무시됩니다. -->
<script src="file.js">
  alert(1);
  // file.js 스크립트가 실행됩니다.
  // src의 주소가 없거나 파일명이 잘못되어도 내부 코드는 실행되지 않습니다.
  // 즉, src가 있기만 하면 무조건 외부 스크립트를 실행합니다.(테스트 완료)
</script>
```

```toc

```
