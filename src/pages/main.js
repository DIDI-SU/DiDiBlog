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
          <MainTitle>타이틀 </MainTitle>
        </MainTitleWrapper>
        <MainCenterSection>
          <MainContentTop>
            <MainContentContainer>
              <MainContentContainerImg alt="이미지 들어갈 예정" />
            </MainContentContainer>
            <MainContentTextContainer>
              <MainContentTextContainerTitle>
                소개 타이틀이 들어갈 거에요
              </MainContentTextContainerTitle>
              <MainContentTextContainerDiv>
                <MainContentText>
                  간단한 자기소개가 들어갈거에요!
                </MainContentText>
              </MainContentTextContainerDiv>
            </MainContentTextContainer>
          </MainContentTop>
          <MainContentMiddle>
            <ainContentTextContainerDiv>
              <MainContentCenterTitle>
                Tech 항목이 들어갈거에요!
              </MainContentCenterTitle>
            </ainContentTextContainerDiv>
            <MainContentCenterTechContainer>
              <MainContentTechImg />
              <MainContentTechImg />
              <MainContentTechImg />
            </MainContentCenterTechContainer>
          </MainContentMiddle>
          <MainContentBottom>
            <MainContentTextContainerTitle>
              프로젝트 내용들이 들어갈거에요
            </MainContentTextContainerTitle>
          </MainContentBottom>
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
//상단 컨테이너
const MainContentTop = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid red;
`;

const MainContentContainer = styled.div`
  border: 1px solid blue;
`;
const MainContentContainerImg = styled.img`
  border: 1px solid red;
  width: 300px;
  height: 300px;
`;
const MainContentTextContainer = styled.div`
  border: 1px solid red;
  padding-left: 10px;
`;
const MainContentTextContainerTitle = styled.h1``;
const MainContentTextContainerDiv = styled.div`
  border: 1px solid blue;
`;
const MainContentText = styled.p``;
//기술 항목이 들어갈 중단
const MainContentMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid green;
  height: 200px;
`;
const MainContentCenterTitle = styled.h2``;

const MainContentCenterTechContainer = styled.div`
  border: 1px solid green;
`;

const MainContentTechImg = styled.img`
  border-radius: 66px;
  width: 40px;
  height: 40px;
  border: 1px solid yellow;
`;

const MainContentBottom = styled.div`
  border: 1px solid black;
  height: 120px;
`;
