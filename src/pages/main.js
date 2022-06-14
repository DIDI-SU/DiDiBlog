import * as React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <MainWrapper>
      <MainSide>
        <MainSideLinkBox></MainSideLinkBox>
        <MainSideLinkBox></MainSideLinkBox>
        <MainSideLinkBox></MainSideLinkBox>
      </MainSide>
      <MainCenter>
        <MainTitleWrapper>
          <MainTitle></MainTitle>
        </MainTitleWrapper>
        <MainCenterSection>
          <MainContentTop></MainContentTop>
        </MainCenterSection>
      </MainCenter>
    </MainWrapper>
  );
};

export default Main;
//전체감싸주는 메인
const MainWrapper = styled.main`
  display: flex;
`;
//사이드 네비게이션
const MainSide = styled.article`
  width: 18%;
  height: 100vh;
  background-color: ${({ theme }) => theme.MainColor};
`;
const MainSideLinkBox = styled.div``;

//메인 센터
const MainCenter = styled.article`
  margin-left: 130px;
`;
//제목
const MainTitleWrapper = styled.section`
  margin-bottom: 70px;
  border: 1px solid red;
  height: 120px;
  width: 500px;
`;
const MainTitle = styled.h1``;
//컨텐츠 들어갈 곳들
const MainCenterSection = styled.section`
  min-width: 1200px;
`;

const MainContentTop = styled.div`
  border: 1px solid red;
  height: 120px;
`;
