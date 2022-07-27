import React from "react";
import styled from "styled-components";
import PostList from "../PostList/PostList";

const MainTab = ({ title }) => {
  return <Conatiner>{title === "post" && <PostList />}</Conatiner>;
};

export default MainTab;

const Conatiner = styled.article``;
