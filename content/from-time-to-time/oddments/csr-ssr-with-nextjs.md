---
emoji: 📦
title: CSR/SSR with Next.js
date: '2023-07-02 22:30:00'
author: 제이든
tags:
categories: 잡동사니
---

## 📦 잡동사니

하나의 키워드를 잡고 좀 편하게 정리하고 싶어 만든 `잡동사니`<br/>

> 잡동사니는 조선 후기 학자 `안정복`이 편찬한 `잡동산이(雜同散異)`에서 유래된 말이다.
> 잡동산이는 `잡기(雜記)`의 형태를 빌려온 책으로 구체적인 체계가 잡혀있지 않은 형식이다.
> 항목이 다소 난잡하고 내용의 구분이 혼동되어있다고 한다. 🤣

## 들어가기에 앞서

이 글은 [원티드](https://www.wanted.co.kr/jobsfeed)에서 주관하는 
[프리온보딩 프론트엔드 챌린지 7월 직접 만져보는 Next.js 해부학 교실 - CSR / SSR with Next.js](https://www.wanted.co.kr/events/pre_challenge_fe_11)
에 제출할 사전과제를 기반으로 작성한 글입니다.

## 🗂️CSR(Client-side Rendering)이란? 그리고 장단점

서버와의 최초 통신에서 HTML, CSS, JS를 응답받아온 후 JS의 코드에 따라 데이터만 요청하여 `클라이언트의 브라우저에서 화면을 렌더링하는 방식`<br/>
웹 페이지가 복잡해짐에 따라 매번 페이지마다 새로운 HTML을 받아오는 방식에서 벗어나 한번에 받아온 후 동작하는 CSR 방식이 많아졌다.

### 장점

1. 유저와의 인터렉션에 따라 필요한 데이터만 요청하여 받아오기 때문에 부분적으로 빠르게 인터렉션할 수 있다.
  - 서버의 부하를 줄일 수 있다는 의미이기도 하다.
2. 페이지를 이동할 때마다 네트워크 통신으로 HTML을 받아오는 형태가 아니기 때문에 깜빡임없이 데이터 변경이 가능하고 모바일 환경에서도 빠른 속도를 자랑한다.
3. `Lazy loading`을 지원한다.
  - Lazy loading: 페이지 로딩 시 중요하지 않은 리소스는 나중에 로딩하는 기술 ex) 스크롤을 내렸을 때, 새로운 데이터가 보이는 것

### 단점

1. `root` 태그만 있는 비어있는 HTML을 가져와서 JS로 렌더링하기 때문에, 크롤링봇에게 해당 웹에 대한 정보를 줄 수가 없다. 즉, SEO에 대해 최적화 하기가 어렵다.
  - 다시 말해서, CSR로 구현된 웹의 경우 검색어 최상단에 노출되기가 어렵다는 의미이다.
  - 단, 구글의 검색엔진은 JS까지 실행시켜 판단하는 검색엔진이기 때문에 예외이다.
2. 초기에 HTML, CSS, JS 코드를 모두 받아오기 때문에 모든 컨텐츠가 유저에게 노출되는데 시간이 걸린다.

## 🗂️SSR(Server-side Rendering)이란? 그리고 장단점

CSR과 반대로 서버에서 렌더링을 진행한다. 클라이언트가 페이지를 요청하면 서버측에서 데이터를 가져와서(주로 DB) 페이지를 구성한 후 브라우저에게 전달한다.<br>
유저가 페이지를 이동할 때마다 서버에게 다시 HTML, CSS, JS 등의 파일을 응답받아서 보여준다.

### 장점

1. 사용자가 느끼기에 CSR보다 빠르게 첫 페이지를 볼 수 있다.
2. SEO(검색 엔진 최적화)가 좋다.

### 단점

1. 서버의 부하가 심한 편이다.
2. 개발자가 신경써야할 부분들이 CSR보다 다소 많다.

## 🗂️SPA(Single Page Application)로 구성된 웹 앱에서 SSR(Server-side Rendering)이 필요한 이유?

CSR만을 이용하여 SPA를 구성하게 되면 첫 통신에서 번들된 HTML, CSS, JS를 받아와서 렌더링하기 때문에 모든 컨텐츠를 보여주는데 다소 시간이 오래 걸리게 되는 단점이 존재한다.<br/>
또한 HTML 파일에는 JS 코드가 진입하게 될 entry root를 제외하곤 어떤 내용도 없기 때문에 검색 엔진 최적화가 좋지 않게 된다.<br/>
이 때, 초기에 필요한 부분들만 SSR을 통해 유저에게 보여주고 그 뒤에는 CSR처럼 유저의 인터렉션에 따라 데이터를 가져오는 식으로 처리하게 되면 위의 단점들을 해결할 수 있게 된다.

## 🗂️ Next.js 까보기

### Next.js 프로젝트에서 `npm run start`를 하게 되면 어떤 코드들이 실행될까?

먼저 Next.js의 repo를 가보자. 그곳에서 잘 찾아보면 `packages/next/src/cli/next-start.ts`가 있는 걸 확인할 수 있다. 즉, next로 작성된 프로젝트에서
`npm run start`를 입력하게 되면 실행되는 코드가 이 파일에 작성되어있는 것이다.

코드를 보기 전에, `npm run start`는 어떤 명력어를 실행하게 될까?

이를 알아보기 위해 `npx create-next-app@latest`을 실행하여 최신 버전의 next 프로젝트를 생성해주었다. 그리고 `package.json`을 보면 아래와 같이 스크립트에 대해 정의하는 걸
볼 수 있다.

```json
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
}
```

즉, `npm run start`는 `next start`를 실행시켜주는 것이다. `next start`는 production 레벨에서 어플리케이션을 띄워준다. 우리가 리액트에서 `npm run start`하게 되면
포트 3000번으로 우리의 앱이 띄워지게 되는 것처럼 말이다. 이 때, 주의할 점은 순수 react에서의 `npm run start`는 next에서의 `npm run dev`와 같다는 것이다.(이 둘 모두 development 레벨에서
포트 3000번으로 앱을 띄운다.)

자, 그럼 이제 한 번 코드를 봐보자.

```ts
#!/usr/bin/env node

// jayden: 뭔가 많은 것들을 import 중... 일단 무시하자
import arg from 'next/dist/compiled/arg/index.js'
import { startServer } from '../server/lib/start-server'
import { getPort, printAndExit } from '../server/lib/utils'
import isError from '../lib/is-error'
import { getProjectDir } from '../lib/get-project-dir'
import { CliCommand } from '../lib/commands'
import { resolve } from 'path'
import { PHASE_PRODUCTION_SERVER } from '../shared/lib/constants'
import loadConfig from '../server/config'

const nextStart: CliCommand = async (argv) => {
  // jayden: next start 명령어 뒤에 붙일 수 있는 옵션에 대한 타입 지정같다.
  const validArgs: arg.Spec = {
    // Types
    '--help': Boolean,
    '--port': Number,
    '--hostname': String,
    '--keepAliveTimeout': Number,

    // Aliases
    '-h': '--help',
    '-p': '--port',
    '-H': '--hostname',
  }
  // jayden: 명령어 뒤의 옵션을 argv로 받고 그에 대한 어떤 객체를 만들어서 args로 초기화하는 것 같다.
  let args: arg.Result<arg.Spec>
  try {
    args = arg(validArgs, { argv })
  } catch (error) {
    if (isError(error) && error.code === 'ARG_UNKNOWN_OPTION') {
      return printAndExit(error.message, 1)
    }
    throw error
  }
  // jayden: args 객체에서 key가 `--help`인 value가 있다면 아래의 코드를 실행한다.
  if (args['--help']) {
    console.log(`
      Description
        Starts the application in production mode.
        The application should be compiled with \`next build\` first.

      Usage
        $ next start <dir> -p <port>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
        --port, -p          A port number on which to start the application
        --hostname, -H      Hostname on which to start the application (default: 0.0.0.0)
        --keepAliveTimeout  Max milliseconds to wait before closing inactive connections
        --help, -h          Displays this message
    `)
    process.exit(0)
  }

  const dir = getProjectDir(args._[0])
  const host = args['--hostname']
  const port = getPort(args)

  // jayden: keepAliveTimeout 값에 대해서 에러처리
  const keepAliveTimeoutArg: number | undefined = args['--keepAliveTimeout']
  if (
      typeof keepAliveTimeoutArg !== 'undefined' &&
      (Number.isNaN(keepAliveTimeoutArg) ||
          !Number.isFinite(keepAliveTimeoutArg) ||
          keepAliveTimeoutArg < 0)
  ) {
    printAndExit(
        `Invalid --keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`,
        1
    )
  }

  const keepAliveTimeout = keepAliveTimeoutArg
      ? Math.ceil(keepAliveTimeoutArg)
      : undefined

  const config = await loadConfig(
      PHASE_PRODUCTION_SERVER,
      resolve(dir || '.'),
      undefined,
      undefined,
      true
  )

  // jayden: 위의 조건들에 따라서 서버 시작
  await startServer({
    dir,
    isDev: false,
    hostname: host,
    port,
    keepAliveTimeout,
    useWorkers: !!config.experimental.appDir,
  })
}

export { nextStart }
```

## 참고

- [Rendering on the web](https://web.dev/rendering-on-the-web/?hl=ko)
- [SPA vs MPA 그리고 CSR vs SSR](https://velog.io/@kykim_dev/WEB-12-SPA-vs-MPA-CSR-vs-SSR)
- [CSR과 SSR 톺아보기](https://80000coding.oopy.io/fde38c6f-e65d-4c1a-af45-176abee40389)
- [Next.js repo](https://github.com/vercel/next.js/)

```toc

```
