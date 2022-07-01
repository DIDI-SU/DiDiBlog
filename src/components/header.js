import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import DarkBtn from "./darkBtn";
import { faHome, faBook } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ handleMode, themeMode, isDarkTheme }) => {
  return (
    <Headers isDarkTheme={isDarkTheme}>
      <HeaderNav>
        <HeaderTitleContainer>
          <HeaderTitle>디디가 타고 있어요</HeaderTitle>
        </HeaderTitleContainer>
        <HeaderUl>
          <HeaderLi>
            <Link to="/">
              <NavText>
                <FontAwesomeIcon icon={faHome} />
              </NavText>
            </Link>
          </HeaderLi>
          <HeaderLi>
            <Link to="/blog">
              <NavText>
                <FontAwesomeIcon icon={faBook} />
              </NavText>
            </Link>
          </HeaderLi>
        </HeaderUl>
        <DarkBtn
          handleMode={handleMode}
          mode={themeMode}
          isDarkTheme={isDarkTheme}
        />
      </HeaderNav>
    </Headers>
  );
};

export default Header;

const Headers = styled.header`
  background-color: ${({ theme, isDarkTheme }) =>
    !isDarkTheme ? theme.Green[70] : theme.Black[50]};
  padding: 30px 50px;
`;

const HeaderTitleContainer = styled.div`
  display: flex;
`;

const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-evenly;
`;

const HeaderTitle = styled.h1`
  font-size: 30px;
`;

const HeaderUl = styled.ul`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: flex-end;
`;

const HeaderLi = styled.li`
  width: 20%;
`;

const NavText = styled.p`
  font-size: 30px;
`;
