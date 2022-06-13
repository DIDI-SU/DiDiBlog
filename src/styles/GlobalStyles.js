import * as React from "react";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
${reset}
*{box-sizing: border-box;}
body{
  font-family:  'Noto Sans KR', sans-serif;
}
a{text-decoration: none;
    color: inherit;
    }
`;

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <GlobalStyle />
      {children}
    </React.Fragment>
  );
}
