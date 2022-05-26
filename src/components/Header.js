import styled from "styled-components";

import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import * as React from "react";
const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderNav>
        <HeaderUl>
          <Link to="/">
            <StaticImage src="../images/header.png" alt="keroppi" />
          </Link>
          <Link to="/greeting">
            <HeaderLi>Greeting</HeaderLi>
          </Link>
          <Link to="/about">
            <HeaderLi>About</HeaderLi>
          </Link>
          <HeaderLi>Blog</HeaderLi>
        </HeaderUl>
      </HeaderNav>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #79bd9a;
`;

const HeaderNav = styled.nav`
  width: 100%;
`;

const HeaderUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const HeaderLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;

  width: 300px;
  font-weight: 900;
`;
