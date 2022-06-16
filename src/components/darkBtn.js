import React, { useState } from "react";
import sun from "../images/Icon/sun.png";
import moon from "../images/Icon/moon.png";
import styled from "styled-components";

const ICON = [
  { name: "dark", value: moon },
  { name: "light", value: sun },
];
const ICON_MAP = new Map(ICON.map((icon) => [icon.name, icon.value]));

const DarkBtn = () => {
  const [isDark, setIsDark] = useState("light");
  const handleClick = (e) => {
    const { id } = e.target;
    setIsDark(id === "light" ? "dark" : "light");
  };

  return (
    <BtnContainer
      id={isDark}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <BtnImg src={ICON_MAP.get("dark")} />
      <Btn
        id={isDark}
        type="button"
        onClick={(e) => {
          handleClick(e);
        }}
      />
      <BtnImg src={ICON_MAP.get(isDark)} />
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
    background-color: ${({ id, theme }) =>
      id !== "light" ? theme.Background : theme.Black};
  }
`;

const Btn = styled.button`
  position: absolute;
  left: ${({ id }) => (id !== "light" ? "50px" : "5px")};
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: ${({ id, theme }) =>
    id === "light" ? theme.Yellow : theme.Black};
`;

const BtnImg = styled.img`
  height: 30px;
  width: 30px;
`;
