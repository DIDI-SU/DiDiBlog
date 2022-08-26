import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import ICON_MAP from "../../data/IconList/iconList";

const Card = ({ id, name, tech, link }) => {
  return (
    <CardDiv id="card" key={id}>
      <Link to={link}>
        <img src={ICON_MAP.get((tech[1] + "").toLowerCase())} />
        <CardBottom>
          <CardTitle>{name}</CardTitle>
        </CardBottom>
      </Link>
    </CardDiv>
  );
};

export default Card;

const CardDiv = styled.div`
  width: 50%;
  height: 190px;
  border-radius: 3px;
  margin: 10px;
  position: relative;
  cursor: pointer;
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 20%;
  bottom: 0px;
  background-color: white;
  border-radius: 0px 0px 3px 3px;
  background-color: beige;
`;
const CardTitle = styled.span`
  font-size: 15px;
  color: black;
  font-weight: 700;
  padding: 5px;
`;
