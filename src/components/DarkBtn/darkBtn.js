import React from "react";
import sun from "../../images/Icon/sun.png";
import moon from "../../images/Icon/moon.png";
import styled from "styled-components";

const ICON = [
  { name: "dark", value: moon },
  { name: "light", value: sun },
];
const ICON_MAP = new Map(ICON.map((icon) => [icon.name, icon.value]));

const DarkBtn = ({ handleMode, mode, isDarkTheme }) => {
  return (
    <BtnContainer
      isDarkTheme={isDarkTheme}
      onClick={() => {
        handleMode();
      }}
    >
      <BtnImg src={ICON_MAP.get("dark")} />
      <Btn
        isDarkTheme={isDarkTheme}
        type="button"
        onClick={() => {
          handleMode();
        }}
      />
      <BtnImg src={ICON_MAP.get(mode)} />
    </BtnContainer>
  );
};

export default DarkBtn;

const BtnContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90px;
  height: 40px;
  background-color: ${({ theme }) => theme.Background};
  border-radius: 80px;
  :hover {
    cursor: pointer;
    background-color: ${({ theme, isDarkTheme }) =>
      isDarkTheme ? theme.Background : theme.Black};
  }

  @media screen and (max-width: 768px) {
    width: 70px;
    height: 30px;
  }
`;

const Btn = styled.button`
  position: absolute;
  left: ${({ isDarkTheme }) => (isDarkTheme ? "50px" : "5px")};
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: ${({ isDarkTheme, theme }) =>
    isDarkTheme ? theme.Black[50] : theme.Yellow};

  @media screen and (max-width: 768px) {
    width: 25px;
    height: 25px;
    left: ${({ isDarkTheme }) => (isDarkTheme ? "40px" : "6px")};
  }
`;

const BtnImg = styled.img`
  height: 30px;
  width: 30px;

  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
