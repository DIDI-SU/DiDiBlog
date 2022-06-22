import React, { useState } from "react";
import styled from "styled-components";
import DarkBtn from "./darkBtn";
import { light, dark } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global-style";

const GlobalLayout = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const theme = themeMode === "light" ? light : dark;
  const handleMode = (e) => {
    const { id } = e.target;
    setThemeMode(id !== "light" ? "light" : "dark");
  };

  return (
    <ThemeProvider themeMode={themeMode} theme={theme}>
      <GlobalStyles />
      <MainWrapper>
        <title>디디의 블로그</title>
        <MainSide>
          <DarkBtnDiv>
            <DarkBtn handleMode={handleMode} mode={themeMode} />
          </DarkBtnDiv>
          <MainSideLinkBox></MainSideLinkBox>
          <MainSideLinkBox></MainSideLinkBox>
          <MainSideLinkBox></MainSideLinkBox>
        </MainSide>
        <MainCenter>{children}</MainCenter>
      </MainWrapper>
    </ThemeProvider>
  );
};

export default GlobalLayout;

//전체감싸주는 메인
const MainWrapper = styled.main`
  display: flex;
  flex-direction: row-reverse;
  background-color: ${({ theme }) =>
    theme === light ? theme.Background[70] : theme.Black[100]};
`;
//사이드 네비게이션
const MainSide = styled.aside`
  width: 18%;
  height: 100vh;
  background-color: ${({ theme }) =>
    theme === light ? theme.Green[70] : theme.Black[50]};
`;
const MainSideLinkBox = styled.div``;

//버튼 네비게이션
const DarkBtnDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 20px;
`;

const MainTitleWrapper = styled.header`
  margin-bottom: 70px;
  border: 1px solid red;
  height: 120px;
  width: 500px;
`;
const MainTitle = styled.h1``;

const MainCenter = styled.article`
  margin-right: 130px;
`;
