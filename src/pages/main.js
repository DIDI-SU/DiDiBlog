import * as React from "react";
import LogoReact from "../assets/icon/react.svg";
import LogoHTML from "../assets/icon/html.svg";
import LogoJS from "../assets/icon/js.svg";
import styled from "styled-components";
import CommonLayout from "../components/commonLayout";

const ICON = [
  { name: "react", value: LogoReact },
  { name: "js", value: LogoJS },
  { name: "html5", value: LogoHTML },
  { name: "css", value: "a" },
];
const ICON_MAP = new Map(ICON.map((icon) => [icon.name, icon.value]));
const ICON_NAME = ["html5", "js", "react"];

const Main = () => {
  return (
    <CommonLayout>
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
              <MainContentText>간단한 자기소개가 들어갈거에요!</MainContentText>
            </MainContentTextContainerDiv>
          </MainContentTextContainer>
        </MainContentTop>
        <MainContentMiddle>
          <MainContentTextContainerDiv>
            <MainContentCenterTitle>
              Tech 항목이 들어갈거에요!
            </MainContentCenterTitle>
          </MainContentTextContainerDiv>
          <MainContentCenterTechContainer>
            {ICON_NAME.map((title) => {
              return (
                <MainContentTechImg alt={title} src={ICON_MAP.get(title)} />
              );
            })}
          </MainContentCenterTechContainer>
        </MainContentMiddle>
        <MainContentBottom>
          <MainContentTextContainerTitle>
            프로젝트 내용들이 들어갈거에요
          </MainContentTextContainerTitle>
        </MainContentBottom>
      </MainCenterSection>
    </CommonLayout>
  );
};

export default Main;

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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MainContentTechImg = styled.img`
  width: 50px;
  height: 50px;
  border: 1px solid yellow;
`;

const MainContentBottom = styled.div`
  border: 1px solid black;
  height: 120px;
`;
