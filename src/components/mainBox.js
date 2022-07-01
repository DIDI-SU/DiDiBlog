import * as React from "react";

import styled, { useTheme, ThemeContext } from "styled-components";

const MainBox = ({ children, title }) => {
  const isBrowser = typeof window !== "undefined";
  const [isDarkTheme, setIsDarkTheme] = React.useState(
    isBrowser && localStorage.getItem("theme")
  );

  const theme = useTheme(ThemeContext);
  React.useEffect(() => {
    setIsDarkTheme(isBrowser && localStorage.getItem("theme"));
  }, [theme]);

  return (
    <MainContentBox isDarkTheme={isDarkTheme}>
      <MainContentTextContainerDiv>
        <MainContentCenterTitle>{title}</MainContentCenterTitle>
      </MainContentTextContainerDiv>
      {children}
    </MainContentBox>
  );
};

export default MainBox;

const MainContentBox = styled.section`
  padding: 20px 30px;
  background-color: ${({ theme, isDarkTheme, id }) =>
    isDarkTheme !== "dark" ? theme.BrightGreen : theme.Black[50]};
  border-radius: 15px;
  margin-bottom: 20px;
`;

const MainContentTextContainerDiv = styled.div`
  padding-right: 20px;
`;

const MainContentCenterTitle = styled.h2`
  font-size: 20px;
`;
