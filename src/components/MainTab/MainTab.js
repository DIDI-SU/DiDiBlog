import React from "react";
import styled from "styled-components";
import PostList from "../PostList/PostList";
import ProjectList from "../../container/ProjectList/ProjectList";
import SkillsList from "../SkillsList/skillsList";
const MainTab = ({ title }) => {
  return (
    <Conatiner>
      {title === "post" && <PostList />}
      {title === "project" && <ProjectList />}
      {title === "skills&tools" && <SkillsList />}
    </Conatiner>
  );
};

export default MainTab;

const Conatiner = styled.article`
  margin: 0px 25px;
`;
