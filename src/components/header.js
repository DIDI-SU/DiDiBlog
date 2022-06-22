import React from "react";

import { light } from "../styles/theme";
import styled from "styled-components";
import DarkBtn from "./darkBtn";

const Header = ({ handleMode, themeMode }) => {
  return (
    <Headers themeMode={themeMode}>
      <HeaderNav>
        <HeaderTitleContainer>
          <img alt="블로그아이콘" />
          <HeaderTitle>디디가 타고 있어요</HeaderTitle>
        </HeaderTitleContainer>
        <DarkBtn handleMode={handleMode} mode={themeMode} />
      </HeaderNav>
    </Headers>
  );
};

export default Header;

const Headers = styled.header`
  background-color: ${({ theme }) =>
    theme === light ? theme.Green[70] : theme.Black[50]};
  padding: 30px 50px;
`;

const HeaderTitleContainer = styled.div`
  display: flex;
`;

const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.p`
  font-size: 30px;
`;
