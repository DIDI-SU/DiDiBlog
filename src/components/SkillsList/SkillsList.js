import React from "react";
import styled from "styled-components";
import SKILLSTOOLS from "../../data/skillTools/skillTools";
import SkillsCard from "../SkillsCard/SkillsCard";

const SkillsList = () => {
  return (
    <ListArticle>
      {SKILLSTOOLS.map(({ id, name, description }) => {
        return <SkillsCard id={id} name={name} description={description} />;
      })}
    </ListArticle>
  );
};

export default SkillsList;

const ListArticle = styled.article``;
