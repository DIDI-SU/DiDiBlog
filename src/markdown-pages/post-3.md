---
slug: "my-third-post"
date: "2022-07-04"
title: "React & Next"
tags: ["React", "Next", "ALL"]
---

<aside>
💡  리액트와 넥스트간의 차이점이 궁금해 아래의 블로그를 번역하게 되었습니다

</aside>

<aside>
💡  블로그글들과 넥스트  공식 문서의 짬뽕어쩌구…

</aside>

[Next.js vs React: What are the differences?](https://www.imaginarycloud.com/blog/next-js-vs-react/)

[Server-Side Rendering (SSR) Vs Client-Side Rendering (CSR)](https://dev.to/codewithtee/server-side-rendering-ssr-vs-client-side-rendering-csr-3m24)

## **Next.js vs React: What are the differences?**

넥스트와 리액트 무엇이 다를까?

---

리액트와 넥스트는 프론트 엔드 개발자들에게 가장 유명한 도구일 것입니다. 이 둘은사용자 인터페이스 즉 UI를 구축하는데 사용되는 표준 도구로 , 사용 하기에도 즐겁습니다.

우리는 넥스트의 특징을 확인하고, 리액트와 어떻게 비교 되며 프론트엔드 개발을 위한 견고하고, 빠른 프레임 워크로의 성능에 대해 알아보겠습니다.

---

## 목차

### 넥스트와 리액트

---

## 넥스트와 리액트

일단 우리는, 리액트와 넥스트에 대한 근본적인 차이에 대해서 확인해 보아야 합니다.

- 리액트 : UI를 만들기 위한 자바스크립트 라이브러리
- 넥스트: 리액트를 위한 프레임 워크(**production framework)**

넥스트는 리액트의 기능을 확장하고 개발 프로세스를 간소화하기 위해서 사용 되지만, 리액트는 넥스트를 이용하지 않아도 괜찮습니다.

리액트는 ESlint와 같은 도구가 포함된, 프로젝트를 세팅하는 데 사용되는 CRA라는 전용 프레임 워크가 존재합니다.

넥스트는 서버 사이드 렌더링 앱을 만드는, 리액트 기반의 프레임 워크 입니다. 여기서 리액트는 여전히 앱의 기반이지만, 구조나 navigational mechanisms(?) , 진행 방식은 넥스트에 의해서 정의 됩니다

그런데 왜 우리는 CRA와 넥스트가 아닌, 리액트와 넥스트를 비교할까요?

넥스트는 CRA와 다른 접근 방식을 가지고 있습니다. 넥스트는 서버사이드 렌더링이기 때문에, 클라이언트가 해당 정보를 처리할 필요가 없습니다.

서버가 페이지를 미리 렌더링 한 후에 최종 HTML을 클라이언트에 보내기 때문에 SEO 와 퍼포먼스가 향상 되어 최소한의 코드를 로딩하기위한 JS를 생성하게 됩니다 . 이것은 웹 사이트가 좀더 빨라질 뿐만 아니라, 크롤러 역시 웹사이트를 좀더 쉽게 보게 되어, 색인을 달기에 조금더 용이해 집니다 .

## 넥스트의 사전 렌더링 (Pre-rendering)

넥스트에서의 Pre-rendering(사전 렌더링) 은 모든 페이지에서 사용 되며, 이에 대해 두가지 접근법이 존재합니다. **Static Generation** 과 **Server-side rendering (SSR) 입니다.**

이둘의 차이점은 페이지를 위한 HTML의 생성 기점이라 할 수 있습니다.

### **Static Generation?**

![static-generation.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c632a71d-986d-4fcc-b9d3-34ac08b0ef1d/static-generation.png)

**Static Generation**은 \***\*템플릿과 원시 데이터를 기반으로 정적 HTML 웹사이트를 생성하는 도구 입니다. 기본적으로 **Static Generation**은 \*\***개별 HTML 페이지를 코딩하는 작업을 자동화하고, 해당 페이지를 미리 사용자에게 제공할 수 있도록 준비합니다. 이는 HTML 페이지를 미리 구축 해 놓기 때문에, 빠른 속도로 사용자에게 로드해준다는 것입니다 .

여기서 **Pre-rendering은 빌드시 페이지가 생성 된 후에 모든 요청에 대해 다시 사용 되는 것**을 이야기 합니다.

![server-side-rendering.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0a4cf6c0-ec26-44af-9904-e855ae5514f7/server-side-rendering.png)

### **Server-side rendering (SSR)**

SSR은 자주 업데이트 되는 동적 데이터를 사용 하는 것 같은, 특정 상황에서 주로 선호 됩니다. : **페이지는 매 요청마다 생성 되고 클라이언트에 보내질 것 입니다.**

SSR이 CSR 보다는 좋은 성능을 지니고 있으나, 여전히 SG 보다는 낮은 성능을 지니고 있어 SSR 을 언제 사용해야 하는지 알고 사용하는 것이 좋습니다

넥스트에서는 한번 작성하고 CDN에서 제공할 수있으므로 , 매 요청마다 페이지를 렌더링 하는 것보다 빠르기 때문에 SG를 사용하는 것을 추천합니다 .

S.G를 추천하는 경우

- 마케팅 페이지
- 블로그 포스트나 포트 폴리오
- 이커머셜의 상품 리스트
- 도움말 및 문서

만약, 유저의 요청 없이 미리 렌더링이 불가능 하다면 당연히 SG를 사용하지 않는 것을 추천합니다. 만약 페이지가 지속해서 정보를 업데이트 해야하거나, 매 요청에 대해서 페이지의 요소를 바꿔야한다면 CSS나 SSR을 선택해 진행할 수도 있습니다. 넥스트는 각 페이지 에 대해서 어느 페이지를 사전에 렌더링할지 고를수 있습니다.

## 사전 렌더링에서의 Data Fetching

### 데이터가 없는 경우

**Static Generation**은 데이터가 없이도 사용 될 수 있습니다. 더해서 모든 생성 된 페이지는 추가적인 데이터를 요청하지 않으며, 페이지들은 앱이 빌드될때 마다 자동으로 정적으로 생성 됩니다
