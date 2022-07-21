import * as React from "react";

import styled, { useTheme, ThemeContext } from "styled-components";

const TechContainer = ({ children, title }) => {
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
      <MainContentCenterTechContainer>
        {children}
      </MainContentCenterTechContainer>
    </MainContentBox>
  );
};
export default TechContainer;

const MainContentBox = styled.section`
  flex-grow: 1;
  padding: 20px 30px;
  background-color: ${({ theme, isDarkTheme, id }) =>
    isDarkTheme !== "dark" ? theme.BrightGreen : theme.Black[50]};
  border-radius: 15px;
  margin: 0px 10px 20px 0px;
`;

const MainContentTextContainerDiv = styled.div`
  padding-right: 20px;
`;

const MainContentCenterTitle = styled.h2`
  font-size: 20px;
`;
const MainContentCenterTechContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;