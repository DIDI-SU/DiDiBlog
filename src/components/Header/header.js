import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import DarkBtn from "../DarkBtn/darkBtn";
import pofile from "../../images/pic/KERO.jpg";

const Header = ({ handleMode, themeMode, isDarkTheme }) => {
  return (
    <Headers isDarkTheme={isDarkTheme}>
      <HeaderNav>
        <HeaderTitleContainer>
          <Link to="/">
            <HeaderImg src={pofile} />
          </Link>
          <Link to="/">
            <HeaderTitle>DIDI'S BLOG</HeaderTitle>
          </Link>
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
          <DarkBtn
            handleMode={handleMode}
            mode={themeMode}
            isDarkTheme={isDarkTheme}
          />
        </HeaderUl>
      </HeaderNav>
    </Headers>
  );
};

export default Header;

const Headers = styled.header`
  padding: 30px 50px;
  margin: 10px 0px;

  @media screen and (max-width: 768px) {
    padding: 10px;
    margin: 10px 20px;
  }
`;

const HeaderTitleContainer = styled.div`
  display: flex;
`;
const HeaderImg = styled.img`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;
const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  margin: 0px auto;
  justify-content: space-between;
  max-width: 900px;
`;

const HeaderTitle = styled.h1`
  font-size: 30px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const HeaderUl = styled.ul`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
    width: 60%;
  }
`;

const HeaderLi = styled.li`
  width: 20%;
`;

const NavText = styled.p`
  font-size: 30px;
`;
