import * as React from "react";
import pofile from "../images/pic/KERO.jpg";
import LogoReact from "../assets/icon/react.svg";
import LogoHTML from "../assets/icon/html.svg";
import LogoJS from "../assets/icon/js.svg";
import styled from "styled-components";

const ICON = [
  { name: "react", value: LogoReact },
  { name: "js", value: LogoJS },
  { name: "html5", value: LogoHTML },
  { name: "css", value: "a" },
];
const ICON_MAP = new Map(ICON.map((icon) => [icon.name, icon.value]));
const ICON_NAME = ["html5", "js", "react"];

const Main = () => {
  console.log(pofile);
  return (
    <>
      <MainContentTop>
        <MainContentContainer>
          <MainContentContainerImg alt="이미지 들어갈 예정" src={pofile} />
        </MainContentContainer>
        <MainContentTextContainer>
          <MainContentTextContainerTitle>DIDI</MainContentTextContainerTitle>
          <MainContentTextContainerDiv>
            <MainContentText>
              꾸준함을 노력하고자하는 프론트엔드 개발자 디디에요
            </MainContentText>
            <MainContentText>
              어디에서라도 긍정적인면을 발견하는 것을 좋아합니다😊
            </MainContentText>
          </MainContentTextContainerDiv>
        </MainContentTextContainer>
      </MainContentTop>
      <MainContentMiddle>
        {/* <MainContentTextContainerDiv>
          <MainContentCenterTitle>
            Tech 항목이 들어갈거에요!
          </MainContentCenterTitle>
        </MainContentTextContainerDiv>
        <MainContentCenterTechContainer>
          {ICON_NAME.map((title) => {
            return <MainContentTechImg alt={title} src={ICON_MAP.get(title)} />;
          })}
        </MainContentCenterTechContainer> */}
      </MainContentMiddle>
      <MainContentBottom></MainContentBottom>
    </>
  );
};

export default Main;

//상단 컨테이너
const MainContentTop = styled.section`
  display: flex;
  align-items: center;
  padding: 20px 0px;
  border-bottom: 1px solid;
`;

const MainContentContainer = styled.div``;
const MainContentContainerImg = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 66%;
`;
const MainContentTextContainer = styled.div`
  padding: 20px 25px;
`;
const MainContentTextContainerTitle = styled.h1`
  font-size: 30px;
  padding-bottom: 10px;
`;
const MainContentTextContainerDiv = styled.div``;
const MainContentText = styled.p`
  padding-bottom: 8px;
`;
//기술 항목이 들어갈 중단
const MainContentMiddle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
`;

const MainContentBottom = styled.section`
  height: 120px;
`;
