import React, { useState } from "react";
import styled from "styled-components";
import Header from "./header";
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
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header handleMode={handleMode} themeMode={themeMode} />
      <MainWrapper>
        <MainCenter>{children}</MainCenter>
      </MainWrapper>
    </ThemeProvider>
  );
};

export default GlobalLayout;

//전체감싸주는 메인
const MainWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainTitleWrapper = styled.header`
  margin-bottom: 70px;
  border: 1px solid red;
  height: 120px;
  width: 500px;
`;
const MainTitle = styled.h1``;

const MainCenter = styled.article`
  min-width: 1200px;
`;
