import React, { useState } from "react";
import sun from "../images/Icon/sun.png";
import moon from "../images/Icon/moon.png";
import styled from "styled-components";

const ICON = [
  { name: "dark", value: moon },
  { name: "light", value: sun },
];
const ICON_MAP = new Map(ICON.map((icon) => [icon.name, icon.value]));

const DarkBtn = ({ handleMode, mode }) => {
  return (
    <BtnContainer
      id={mode}
      onClick={(e) => {
        handleMode(e);
      }}
    >
      <BtnImg src={ICON_MAP.get("dark")} />
      <Btn
        id={mode}
        type="button"
        onClick={(e) => {
          handleMode(e);
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
    id === "light" ? theme.Yellow : theme.Black[100]};
`;

const BtnImg = styled.img`
  height: 30px;
  width: 30px;
`;
