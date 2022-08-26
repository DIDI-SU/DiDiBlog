import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainTab from "../components/MainTab/MainTab";
import CONACT from "../data/contactList/contactList";
import pofile from "../images/pic/KERO.jpg";
import ICON_MAP from "../data/IconList/iconList";

const TAB = [
  { id: 1, name: "post" },
  { id: 2, name: "project" },
  { id: 3, name: "skills" },
  { id: 4, name: "tools" },
];

const TOOLS = ["trello", "gitlogo"];

const Main = () => {
  const [isSelect, setIsSelect] = useState({ id: "post", choosen: true });
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
            <MainContentText>
              꾸준함을 노력하는 프론트엔드 개발자 디디입니다
            </MainContentText>
            <MainContentText>
              어디에서라도, 긍정적인면을 발견하는 것을 좋아합니다😊
            </MainContentText>
            <DownLoadResume>이력서 확인하기</DownLoadResume>
          </MainTitleContainer>
        </MainContentContainer>
        <MainContentContainer id="contact">
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
        <MainTab title={isSelect.id} />
      </MainMiddle>
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

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const MainContentContainer = styled.div`
  display: flex;
  padding-right: 20px;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    width: ${({ id }) => id === "contact" && "100%"};
    padding: ${({ id }) => id === "contact" && "0px 15px"};
    align-items: ${({ id }) => id === "contact" && "flex-end"};
  }
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
  flex-direction: column;
  align-items: flex-start;
`;

const MainContentTextContainerTitle = styled.h1`
  font-size: 30px;
  padding-bottom: 10px;
`;

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
