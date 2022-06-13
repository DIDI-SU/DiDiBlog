import * as React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const Main = () => {
  return (
    <MainWrapper>
      <MainSide>
        <MainSideLinkBox></MainSideLinkBox>
        <MainSideLinkBox></MainSideLinkBox>
        <MainSideLinkBox></MainSideLinkBox>
      </MainSide>
      <title>Home Page</title>
      <h1>Welcome to my Gatsby site!</h1>
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.main``;

const MainSide = styled.article`
  background-color: #79bd9a;
`;
const MainSideLinkBox = styled.div`
  width: 200px;
`;
