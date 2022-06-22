import * as React from "react";
import DarkBtn from "./darkBtn";
import styled from "styled-components";

const CommonLayout = ({ children }) => {
  return (
    <>
      <MainWrapper>
        <MainSide>
          <DarkBtnDiv>
            <DarkBtn />
          </DarkBtnDiv>
          <MainSideLinkBox></MainSideLinkBox>
          <MainSideLinkBox></MainSideLinkBox>
          <MainSideLinkBox></MainSideLinkBox>
        </MainSide>
        <MainCenter>{children}</MainCenter>
      </MainWrapper>
    </>
  );
};

export default CommonLayout;
const Header = styled.header``;
const HeaderTitle = styled.p`
  font-size: 40px;
`;
//전체감싸주는 메인
const MainWrapper = styled.main`
  display: flex;
  flex-direction: row-reverse;
`;
//사이드 네비게이션
const MainSide = styled.aside`
  width: 18%;
  height: 100vh;
  background-color: ${({ theme }) => theme.Green[70]};
`;
const MainSideLinkBox = styled.div``;

//버튼 네비게이션
const DarkBtnDiv = styled.div`
  padding: 10px;
`;

const MainTitleWrapper = styled.header`
  margin-bottom: 70px;
  border: 1px solid red;
  height: 120px;
  width: 500px;
`;
const MainTitle = styled.h1``;

const MainCenter = styled.article``;
