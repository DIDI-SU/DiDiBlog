import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TechContainer from "../container/Main/techContainer";
import Card from "../components/MainCard/card";
import CONACT from "../data/contactList/contactList";
import pofile from "../images/pic/KERO.jpg";
import ICON_MAP from "../data/IconList/iconList";
import PROJECT from "../data/ProjectList/projetcList";

const ICON_NAME = ["html5", "js", "css", "react", "styled"];
const TAG_NAME = [
  { id: 0, name: "전체" },
  { id: 1, name: "react" },
  { id: 2, name: "js" },
];
const TAB = [
  { id: 1, name: "skills" },
  { id: 2, name: "tools" },
];

const TOOLS = ["trello", "gitlogo"];
const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState(null);
  const [isSelect, setIsSelect] = useState({ id: "skills", choosen: true });

  const handleClick = (e) => {
    const { id } = e.target;
    if (id === isSelect.id) {
      setIsSelect({ id: id, choosen: true });
    } else {
      setIsSelect({ id: id, choosen: true });
    }
  };

  return (
    <>
      <MainContentTop id="top">
        <MainContentContainer id="img">
          <MainContentContainerImg alt="자고 있는 캐로피사진" src={pofile} />
        </MainContentContainer>
        <MainContentContainer id="topText">
          <MainTitleContainer>
            <MainContentTextContainerTitle>
              Hi🖐 I'm JISOO !
            </MainContentTextContainerTitle>
          </MainTitleContainer>
          <MainTitleContainer>
            <MainTitleTopBox>
              <MainContentText>
                꾸준함을 노력하는 프론트엔드 개발자 디디입니다
              </MainContentText>
              <MainContentText>
                어디에서라도, 긍정적인면을 발견하는 것을 좋아합니다😊
              </MainContentText>

              <DownLoadResume>이력서 확인하기</DownLoadResume>
            </MainTitleTopBox>
          </MainTitleContainer>
        </MainContentContainer>

        <MainContentContainer>
          <Ul>
            {CONACT.map((list) => {
              const { id, name, url } = list;
              return (
                <Li id={id} key={name}>
                  <FontAwesomeIcon icon={ICON_MAP.get(name)} />
                  <MainContentText>{url}</MainContentText>
                </Li>
              );
            })}
          </Ul>
        </MainContentContainer>
      </MainContentTop>
      <MainMiddle>
        <MainMiniNav>
          <MiniNavUl>
            {TAB.map((list) => {
              const { id, name } = list;
              return (
                <MiniNavLi
                  key={id}
                  isSelect={isSelect}
                  onClick={(e) => handleClick(e)}
                  id={name}
                >
                  {name.toUpperCase()}
                </MiniNavLi>
              );
            })}
          </MiniNavUl>
        </MainMiniNav>
        <TechContainer>
          {isSelect.id === "skills"
            ? ICON_NAME.map((title) => {
                return (
                  <MainContentCenterTechBox>
                    <MainContentTechImg
                      alt={title + "아이콘"}
                      src={ICON_MAP.get(title)}
                    />
                  </MainContentCenterTechBox>
                );
              })
            : TOOLS.map((title) => {
                return (
                  <MainContentCenterTechBox>
                    <MainContentTechImg
                      src={ICON_MAP.get(title)}
                      alt={title + "아이콘"}
                    />
                  </MainContentCenterTechBox>
                );
              })}
        </TechContainer>
      </MainMiddle>
      <MainBottom></MainBottom>
    </>
  );
};

export default Main;

const MainContentTop = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  margin-bottom: ${({ id }) => id === "top" && "18px"};
`;

const MainContentContainer = styled.div`
  display: flex;
  padding-right: 20px;
  flex-direction: column;
`;

const MainContentContainerImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 66%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    :last-child {
      align-items: flex-end;
    }
  }
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
  line-height: 100%;
`;
//연락 항목
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  border-left: 1px solid;
  padding-left: 6px;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    margin: 5px 0px;
    border: none;
  }
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 3px;

  svg {
    margin-right: 5px;
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 768px) {
    p {
      display: none;
    }
  }
`;

const DownLoadResume = styled.button`
  border: 1px solid black;
  border-radius: 5px;
`;
const MainMiddle = styled.section``;

const MainMiniNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MiniNavUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const MiniNavLi = styled.li`
  font-size: 25px;
  font-weight: 600;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  border-bottom: ${({ isSelect, id }) =>
    isSelect.id === id && `2px solid black`};

  :hover {
    cursor: pointer;
  }
`;
const MainContentCenterTechBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
const MainContentTechImg = styled.img`
  width: 60px;
  height: 60px;
  margin: 6px;
  padding: 5px;
  background-color: white;
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

const MainBottom = styled.section``;
