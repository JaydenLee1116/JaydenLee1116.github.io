---
emoji: 🧷
title: CS-Network. HTTP에 대해
date: '2023-07-17 22:00:00'
author: 제이든
tags: 기록 일지 성장 발전 개발
categories: 스터디
---

## 🧷 CS-Network 스터디

코드스쿼드 과정을 마치고 프론트엔드 개발자로서 알아야될 네트워크 지식을 채우기 위해 시작한 CS 스터디!<br/>
[Tech-Interview-Network](https://github.com/VSFe/Tech-Interview/blob/main/03-NETWORK.md)를 참고하여 스터디를 진행하기로 했다.

# 2. HTTP 응답코드에 대해 설명해 주세요.

HTTP 응답코드는 HTTP 요청에 대한 응답으로 요청의 처리 상태를 알려주는 코드로 클라이언트와 서버 간의 HTTP 통신이 복잡해짐에 따라 이를 간다나게 표현하기 위해 만들어졌습니다. 100번부터 500번대로 크게 5가지의 응답을 코드로 나타냅니다.
100번대는 `요청을 받아 작업을 진행 중`이라는 의미, 200번대는 `요청을 성공적으로 받았고 해당 요청을 성공적으로 완료했다`는 의미, 300번대는 `해당 요청을 완료하기 위해서는 다른 페이지로 리다이렉션 해야한다`는 의미, 400번대는 `클라이언트 측의 오류로, 요청 자체가 올바르지 않다`는 의미, 500번대는 `서버에서 오류가 생겨 요청을 처리할 수 없다`는 의미입니다. 일반적으로 통신이 성공했을 때, 200번 그리고 클라이언트 측의 요청 리소스가 서버에 존재하지 않을 때의 404번을 자주 볼 수 있습니다.

## 1. 401 (Unauthorized) 와 403 (Forbidden)은 의미적으로 어떤 차이가 있나요?

401번은 사용자가 인증되지 않은 상태에서 특정 리소스에 접근할 때 발생하고 403번은 사용자가 인증되어있지만 해당 사용자에게는 부여되지 않은 권한에 접근할 때 발생합니다. 근본적으로 이 둘의 큰 차이는 현재 유저가 인증이 되어있느냐, 되어있지 않느냐입니다.

## 2. 200 (ok) 와 201 (created) 의 차이에 대해 설명해 주세요.

200번은 클라이언트가 서버에게 요청한 작업이 성공적으로 수행되었음을 나타냅니다. 마찬가지로 201번도 클라이언트의 요청이 성공했다는 의미지만 좀더 나아가서 서버에 새로운 리소스가 생성되었음을 나타냅니다.그러므로 보통 POST, PUT 요청 성공에 대한 응답을 나타냅니다.

# 3. HTTP Method 에 대해 설명해 주세요.

HTTP 메서드는 클라이언트가 서버에 어떤 작업을 요청할지 즉, 어떤 종류의 요청인지를 나타냅니다.
일반적으로 GET, POST, PUT, PATCH, DELETE 5가지의 메서드가 자주 사용됩니다.

## 1. HTTP Method의 멱등성에 대해 설명해 주세요.

멱등성은 특정 연산을 1번 한 것과 여러 번 진행한 것이 동일한 결과를 가지는 성질입니다. 즉, HTTP 메서드의 멱등성은 동일한 요청을 1번 보내는 것과 여러 번 보내는 것의 결과가 동일하다는 것을 의미합니다. 즉, 멱등성의 핵심은 '여러번 연산을 진행해도 상관없다.'는 것에 있습니다.
예를 들어 GET 메서드의 경우 1번 요청을 보내거나 여러 번 요청을 보내도 그 결과가 언제나 동일하므로 멱등성을 가집니다. 이렇게 멱등성을 갖는 대표적인 메서드는 GET, PUT, DELETE가 있습니다. 반대로 POST와 같이 1번 보내면 요청에 대해 어떤 데이터를 1번 생성하고 여러 번 보내면 어떤 데이터를 여러 번 생성하기 때문에 둘의 결과가 동일하지 않아 멱등하지 않습니다.
추가로 데이터의 일부를 수정하는 PATCH의 경우, 요청의 조건에 따라 멱등 유무가 달라집니다. '어떤 유저의 이메일을 특저 이메일로 변경하는' PATCH 요청의 경우, 1번 보내나 여러 번 보내나 동일한 이메일로 변경되므로 멱등합니다. 그렇지만 '특정 유저의 방문 횟수를 1씩 증가시키도록 변경하는' PATCH 요청의 경우, 1번 보내는 것과 여러 번 보내는 것의 결과가 달라지므로 멱등하지 않게 됩니다.

> 궁금증. POST가 아닌 GET으로도 데이터를 생성하는 경우도 있는 걸로 알고 있는데, 이런 경우 GET은 멱등성이 없어지는 게 아닌가?
> 해결. GET으로도 서버에 데이터를 생성하는 게 불가능한 것은 아니다. 그렇지만 엄밀히 HTTP 프로토콜에서의 GET 메서드는 안전하고 멱등해야한다. 즉, 애초에 GET으로 데이터를 생성하는 요청을 보내는 것 자체가 HTTP 프로토콜의 원칙을 깬 것이다. 이렇게 되면 웹 스크랩핑, 웹 서버 로그 분석, 캐싱 등에서 문제가 발생할 수 있다.

## 2. GET과 POST의 차이는 무엇인가요?

먼저 데이터를 전송하는 관점에서 말씀드리겠습니다.
GET은 URL의 일부로 데이터를 전송하고 POST는 요청의 본문(body)으로 데이터를 전송합니다. 그렇기에 GET은 본문에 데이터가 노출되어 보안에 비교적 취약하다고 브라우저의 url 제한에 따른 데이터 크기 제한이 있다는 단점이 있습니다. 반면 POST는 요청의 본문에 데이터를 전송하기에 보안이 비교적 강하고 데이터 크기의 제한이 비교적 여유롭다는 장점이 있습니다.

다음으로 안정성과 멱등성의 관점입니다.
GET은 안정하고 멱등하기 때문에 여러 번 요청을 보내도 서버 혹은 DB의 상태를 변경시키지 않습니다. 반면, POST의 경우 요청에 따라 서버의 상태를 변경시키기 때문에 안정하고 멱등하지 않습니다.

앞선 특징들에 따라 GET은 주로 데이터를 조회하는 데 사용되고 POST는 서버에 데이터를 전송하거나 서버의 상태를 변경하는데 사용합니다.

## 3. POST와 PUT, PATCH의 차이는 무엇인가요?

3가지 메서드 모두 서버의 상태를 변경하는 데 사용됩니다.
다만, POST는 주로 서버에 새로운 데이터를 생성할 때 사용됩니다. 즉, 멱등하지 않습니다.
PUT은 기존의 데이터를 완전히 새로운 상태로 업데이트하거나 새로운 데이터를 생성하는 데 사용됩니다. PUT의 경우 멱등성을 가집니다.
PATCH는 기존 데이터의 일부를 변경하는 데 사용되는 메서드로, 요청의 형태에 따라 멱등 유무가 달라집니다. '어떤 유저의 이메일을 특저 이메일로 변경하는' PATCH 요청의 경우, 1번 보내나 여러 번 보내나 동일한 이메일로 변경되므로 멱등합니다. 그렇지만 '특정 유저의 방문 횟수를 1씩 증가시키도록 변경하는' PATCH 요청의 경우, 1번 보내는 것과 여러 번 보내는 것의 결과가 달라지므로 멱등하지 않게 됩니다.

## 4. HTTP 1.1 이후로, GET에도 Body에 데이터를 실을 수 있게 되었습니다. 그럼에도 불구하고 왜 아직도 이런 방식을 지양하는 것일까요?

HTTP는 응용 계층의 프로토콜로서 결국 하나의 약속이기 때문입니다. HTTP의 버전과는 상관없이 GET 메서드는 안정성과 멱등성을 유지해야합니다. 즉, 서버의 상태를 업데이트하면 HTTP라는 약속을 어기는 것이 됩니다. HTTP 1.1부터 명세의 일관성과 유연성을 위해 모든 HTTP 메서드가 요청 라인(request line), 헤더(header), 본문(body) 구조를 갖게 작성되었을 뿐, GET으로 body에 데이터를 담는 게 옳다는 것은 아닙니다.
만약 데이터를 요청 본문(body)에 담아 GET 요청을 보내게 되면 웹 스크랩핑, 웹 서버 로그 분석, 캐싱 등에서 문제가 발생할 수 있습니다. 이를 해결하기 위해 많은 서버와 클라이언트 구현체는 본문(body)을 포함한 GET 요청을 무시하거나 오류를 반환하게 하고 있습니다.


```toc

```