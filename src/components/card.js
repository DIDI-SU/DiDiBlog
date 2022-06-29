import React from "react";
import styled from "styled-components";

const Card = ({ id, name, tech }) => {
  return (
    <CardDiv id="card" key={id}>
      adasd
      <CardBottom>
        <CardTitle>{name}</CardTitle>
      </CardBottom>
    </CardDiv>
  );
};

export default Card;

const CardDiv = styled.div`
  width: 40%;
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
  border: 1px solid black;
  width: 100%;
  height: 20%;
  bottom: 0px;
  background-color: white;
  border-radius: 0px 0px 3px 3px;
`;
const CardTitle = styled.span`
  font-size: 15px;
  color: black;
  font-weight: 700;
`;
