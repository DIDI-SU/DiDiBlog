import React from "react";
import styled from "styled-components";
import PostList from "../PostList/PostList";
import ProjectList from "../../container/ProjectList/ProjectList";

const MainTab = ({ title }) => {
  return (
    <Conatiner>
      {title === "post" && <PostList />}
      {title === "project" && <ProjectList />}
    </Conatiner>
  );
};

export default MainTab;

const Conatiner = styled.article``;
