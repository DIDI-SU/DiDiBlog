---
slug: "/blog/my-second-post"
date: "2022-06-30"
title: "Gatsby 블로그 만들기 :DAY01"
tags: ["React", "Gatsby", "Styled-Component", "ALL"]
---

> 이전에 만들었던 갯츠비 블로그를 조금 더 좋은 방향으로 만들고자 진행하게 되었습니다

> 아래의 갯츠비 공식 튜토리얼을 기반으로 진행 되었습니다

[Part 1: Create and Deploy Your First Gatsby Site](https://www.gatsbyjs.com/docs/tutorial/part-1/)

## 🌟사용 기술

⚠️ Gatsby

⚠️ styled-components

## 🌟목표

✅ 이번에는 제발 빌드에러를 피해봅시다 ^^…

✅ 다크 모드를 추가 합니다

✅ 시멘틱을 최대한 지켜보도록 노력합니다

✅ 단기적인 블로그가 아닌 장기적인 블로그를 만들어 봅니다.

---

## 🌟기본 세팅

튜토리얼대로 갯츠비를 설치, 기본 파일 세팅을 진행해 주었습니다. 그런데 이전에는 튜토리얼 내에서 css 모듈을 이용해 주었으나. 사용 목적이 잘 와 닿지 않아. 새롭게 공부하게 된 `styled-component` 를 적용하게 되었습니다.

## 시작부터 막히다

### 간단한 페이지 구조 설정

- 단순히 제 정보와 간단 포트폴리오를 보여줄 메인 페이지
- 블로그 내용이 들어가게 될 , 블로그
- 상세한 정보를 보여줄 about

블로그 구조는 1차적으로는 위의 세 구조로 크게 잡게 되었습니다. 블로그의 경우에는 별도의 게시글이 들어가야 하므로, 이후로 폴더로 변경해줄 예정입니다.

### 문제의 styeld-Component

이전에 `styled-component`을 이용해 준 것처럼, 이번에도 글로벌 스타일과 `theme` 을 이용해 적용해주려 했으나. 렌더링부터 되지 않는 문제가 발생하게 되었습니다.

✅ 당시의 코드

✅ theme을 사용하기 위한 `theme.js` 파일 내 코드

```jsx
export const theme = {
  Background: "#EAE7C7",
  MainColor: "#74917F",
  PointColor: "#0B0D07",
  TextColor: "#475135",
};
```

🌱 `index.js` 에서 사용해 주기 위한 레이아웃 파일 내 코드

```jsx
import React from "react";
import { theme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global-style";

const GlobalLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
```

그런데 다시 웃긴 건, 동일한 에러를 만들고자 다시 동일한 상황으로 만들었을 때 자연스럽게 나오는 게 의문스러운 것 같습니다 🤔 진짜 뭐야 …ㅋㅋㅋㅋㅋ 거의 두 시간 동안 고쳤는데 기록을 안 하니 이렇게 허망하게 지나가는 것 같습니다.. 잊지 말자 에러 기록 😉

## 메인 페이지 기본 틀 만들기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/38cc0985-5066-47dd-a639-9787fbdca555/Untitled.png)

현재는 제목과 간단히 컨텐츠가 들어갈 구역 정도로 나누어 놓은 상태 입니다. 그런데 매번 해왔던 고민은 이렇게 나누어도 괜찮을 지가 될 것 같습니다.

### 페이지 구조 :메인 페이지

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/73eaa3d1-ae80-4615-8790-9b757428c874/Untitled.png)

1차적으로는 위와 같은 모습이 될 것 같은데, 프로젝트 내용을 링크로 걸어서 깃으로 이동하게 할지 아니면, 바로 프로젝트 내용을 보여줄지 가 좀 고민이긴하지만… 약간 만들면서 고민하지 했읍니다…

### Div 와 Section 무엇이 무난할까

항상 페이지를 만들 때 마다 article> section >div로 접근을 하는 편인데, 개인적으로 고민이 되는 지점은 여러 div를 감싸주는 것도 section으로 진행해도 되지 않을까 하는 애매함이 항상 남아있게 되는 것 같습니다 🤔

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eba33de8-2fa3-4132-af6d-80abd1918b84/Untitled.png)

현재는 단순 레이아웃 작업을 진행해 주며, 섹션에 div를 감싸 주기 위한 div를 이용해 주고 있으나, 최근 프로젝트를 진행하며 느낀점은 너무!! 더럽다!! 라는 생각이 들었습니다.

그래서 일단은 틀을 잡아 놓고, 재 사용이 가능해 보이는 요소들을 mixin으로 만들어 이용해 주고,

2차적으로는 section내 section을 한번 더 넣는 방향으로 진행을 할까 하는 생각이 들고 있습니다
