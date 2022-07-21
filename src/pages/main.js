import * as React from "react";
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

const Main = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [projectList, setProjectList] = React.useState(null);
  const [isSelect, setIsSelect] = React.useState("전체");

  const handleSelect = (e) => {
    setIsSelect(e.target.value);
  };

  const selectedFilter = () => {
    if (isSelect === "전체") {
      setProjectList(PROJECT);
      setIsLoading(true);
    } else {
      const copy = [...PROJECT];
      const final = copy.filter((info) => info.tech.includes(isSelect));
      setProjectList(final);
      setIsLoading(true);
    }
  };

  React.useEffect(() => {
    selectedFilter();
  }, [isSelect]);

  return (
    <>
      {" "}
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
      <MainContentTop>
        <TechContainer title="Skills " id="middle">
          {ICON_NAME.map((title) => {
            return (
              <MainContentCenterTechBox>
                <MainContentTechImg
                  alt={title + "아이콘"}
                  src={ICON_MAP.get(title)}
                />
              </MainContentCenterTechBox>
            );
          })}
        </TechContainer>

        <TechContainer title="Tools " id="middle">
          <MainContentCenterTechBox>
            <MainContentTechImg alt="gitlogo" src={ICON_MAP.get("gitlogo")} />
          </MainContentCenterTechBox>
          <MainContentCenterTechBox>
            <MainContentTechImg alt="trello" src={ICON_MAP.get("trello")} />
          </MainContentCenterTechBox>
        </TechContainer>
      </MainContentTop>
      <TechContainer title="프로젝트"></TechContainer>
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
//기술 항목이 들어갈 중단

//이미지 들어갈 박스
const MainContentCenterTechContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 10px;
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
const MainContentTagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MainContentTagSelector = styled.select``;

const MainContentTag = styled.option``;

const MainCardBox = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const MainArticle = styled.article``;

const DownLoadResume = styled.button`
  border: 1px solid black;
  border-radius: 5px;
`;
