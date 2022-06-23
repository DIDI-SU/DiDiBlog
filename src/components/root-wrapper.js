import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./header";
import { light, dark } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global-style";

const GlobalLayout = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const isDarkTheme = themeMode === "dark";
  const handleMode = () => {
    const updatedTheme = isDarkTheme ? "light" : "dark";
    setThemeMode(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  };

  useEffect(() => {
    const saveTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (saveTheme && ["dark", "light"].includes(saveTheme)) {
      setThemeMode(saveTheme);
    } else if (prefersDark) {
      setThemeMode("dark");
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? dark : light}>
      <GlobalStyles />
      <Header
        handleMode={handleMode}
        themeMode={themeMode}
        isDarkTheme={isDarkTheme}
      />
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
  padding: 50px 0px;
`;

const MainTitleWrapper = styled.header`
  margin-bottom: 70px;
  border: 1px solid red;
  height: 120px;
  width: 500px;
`;
const MainTitle = styled.h1``;

const MainCenter = styled.article`
  max-width: 1000px;
`;