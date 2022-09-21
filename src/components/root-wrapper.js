import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header/header";
import { light, dark } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/global-style";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

const GlobalLayout = ({ children }) => {
  const isBrowser = typeof window !== "undefined";
  const [themeMode, setThemeMode] = useState("light");
  const isDarkTheme = themeMode === "dark";
  const handleMode = () => {
    const updatedTheme = isDarkTheme ? "light" : "dark";
    setThemeMode(updatedTheme);
    if (isBrowser) {
      localStorage.setItem("theme", updatedTheme);
    }
  };
  useEffect(() => {
    if (isBrowser) {
      const saveTheme = localStorage.getItem("theme");
      const prefersDark =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
      if (saveTheme && ["dark", "light"].includes(saveTheme)) {
        setThemeMode(saveTheme);
      } else if (prefersDark) {
        setThemeMode("light");
      }
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

const MainWrapper = styled.main`
  padding: 30px 0px;
`;

const MainCenter = styled.article`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  max-width: 900px;
`;
