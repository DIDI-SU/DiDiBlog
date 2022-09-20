import React from "react";
import styled from "styled-components";

const SkillsCard = ({ id, name, description }) => {
  return (
    <CardSection key={id}>
      <CardDiv>
        <CardTitle>{name}</CardTitle>
      </CardDiv>
      <CardDiv>
        <Desc>{description}</Desc>
      </CardDiv>
    </CardSection>
  );
};
export default SkillsCard;

const CardSection = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 10px;
`;

const CardDiv = styled.div``;

const CardTitle = styled.h1`
  font-size: 23px;
  padding: 5px 0px;
  margin: 5px 0px;
`;
const Desc = styled.span`
  font-size: 20px;
`;
