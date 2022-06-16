import React from "react";
import { light } from "../styles/theme";
import { dark } from "../styles/theme";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global-style";

const GlobalLayout = ({ children }) => {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default GlobalLayout;
