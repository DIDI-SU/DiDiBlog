import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global-style";

const theme = {
  Background: "#EAE7C7",
  MainColor: "#74917F",
  PointColor: "#0B0D07",
  TextColor: "#475135",
};

const GlobalLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default GlobalLayout;
