import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pofile from "../images/pic/KERO.jpg";
import { ICON_MAP } from "../components/icon";
import { light } from "../styles/theme";

const ICON_NAME = ["html5", "js", "css", "react", "styled"];
const Main = () => {
  return (
    <>
      <MainContentTop>
        <MainContentContainer>
          <MainContentContainerImg alt="이미지 들어갈 예정" src={pofile} />
        </MainContentContainer>
        <MainContentContainer>
          <MainTitleContainer>
            <MainContentTextContainerTitle>디디</MainContentTextContainerTitle>
          </MainTitleContainer>
          <MainTitleContainer>
            <MainTitleTopBox>
              <MainContentText>
                꾸준함을 노력하는 프론트엔드 개발자 디디입니다
              </MainContentText>
              <MainContentText>
                어디에서라도, 긍정적인면을 발견하는 것을 좋아합니다😊
              </MainContentText>
            </MainTitleTopBox>
            <MainTitleTopBox>
              <Ul>
                <Li>
                  <FontAwesomeIcon icon={ICON_MAP.get("email")} />
                  <MainContentText>jisoodidi86@gmail.com</MainContentText>
                </Li>
                <Li>
                  <FontAwesomeIcon icon={ICON_MAP.get("github")} />
                  <MainContentText>link</MainContentText>
                </Li>
                <Li>
                  <FontAwesomeIcon icon={ICON_MAP.get("letterV")} />
                  <MainContentText>link</MainContentText>
                </Li>
              </Ul>
            </MainTitleTopBox>
          </MainTitleContainer>
        </MainContentContainer>
      </MainContentTop>
      <MainContentMiddle>
        <MainContentTextContainerDiv id="skils">
          <MainContentCenterTitle>Skills</MainContentCenterTitle>
        </MainContentTextContainerDiv>
        <MainContentCenterTechContainer>
          <MainContentCenterTechBox>
            {ICON_NAME.map((title) => {
              return (
                <MainContentTechImg
                  alt={title + "아이콘"}
                  src={ICON_MAP.get(title)}
                />
              );
            })}
          </MainContentCenterTechBox>
          <MainContentCenterTechBox></MainContentCenterTechBox>
        </MainContentCenterTechContainer>
      </MainContentMiddle>
      <MainContentBottom></MainContentBottom>
    </>
  );
};

export default Main;

const MainContentTop = styled.section`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const MainContentContainer = styled.div`
  padding-right: 20px;
`;
const MainContentContainerImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 66%;
`;

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MainContentTextContainerTitle = styled.h1`
  font-size: 30px;
  padding-bottom: 10px;
`;

const MainTitleTopBox = styled.div``;

const MainContentText = styled.p`
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  padding-right: 5px;
`;
//연락 항목
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  border-left: 1px solid;
  padding-left: 6px;
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 3px;
  svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
`;
//기술 항목이 들어갈 중단

const MainContentTextContainerDiv = styled.div`
  padding-right: 20px;
`;
const MainContentMiddle = styled.section`
  display: flex;
  background-color: ${({ theme }) =>
    theme === light ? theme.BrightGreen : theme.Black[50]};
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 30px;
  border-radius: 15px;
`;
const MainContentCenterTitle = styled.h2`
  font-size: 20px;
`;
//이미지 들어갈 박스
const MainContentCenterTechContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
`;

const MainContentCenterTechBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: white;
`;

const MainContentTechImg = styled.img`
  width: 60px;
  height: 60px;
  margin: 6px;
`;

const MainContentBottom = styled.section`
  height: 120px;
`;
