import React from "react";
import styled from "styled-components";
import SKILLSLIST from "../../data/skillTools/skillTools";
import SkillsCard from "../SkillsCard/SkillsCard";

const SkillsList = () => {
  return (
    <ListArticle>
      {SKILLSLIST.map(({ id, name, description }) => {
        return <SkillsCard id={id} name={name} description={description} />;
      })}
    </ListArticle>
  );
};
export default SkillsList;
const ListArticle = styled.article`
  background-color: grey;
`;
