import * as React from "react";
import Card from "../components/card";
import MainBox from "../components/mainBox";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pofile from "../images/pic/KERO.jpg";
import ICON_MAP from "../components/icon";

const ICON_NAME = ["html5", "js", "css", "react", "styled"];
const TAG_NAME = [
  { id: 0, name: "전체" },
  { id: 1, name: "react" },
  { id: 2, name: "js" },
];

const PROJECT = [
  {
    id: 0,
    name: "💚인스타그램 클론💚",
    tech: ["all", "REACT"],
    link: "https://hellojisoo.notion.site/b407b539ba8545f0a3f3f6a5aeee13b6",
  },
  {
    id: 1,
    name: "💚프로젝트 취하노💚",
    tech: ["all", "REACT"],
    link: "https://hellojisoo.notion.site/1-f8303c86cae340ed9e50081bc1cf5f6c",
  },
  {
    id: 2,
    name: "💚프로젝트 we eats💚",
    tech: ["all", "REACT"],
    link: "https://hellojisoo.notion.site/2-b82a793325944e2096d445d8c9d1372b",
  },
  {
    id: 3,
    name: "💚JS로 만드는 todo💚",
    tech: ["all", "JS"],
    link: "https://github.com/DIDI-SU/todojsch",
  },
  {
    id: 4,
    name: "(진행중)기술 면접 문제 은행",
    tech: ["all", "REACT", "NEXT"],
    link: "",
  },
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
    <MainArticle>
      <MainContentTop>
        <MainContentContainer>
          <MainContentContainerImg alt="자고 있는 캐로피사진" src={pofile} />
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
              <DownLoadResume>이력서 확인하기</DownLoadResume>
            </MainTitleTopBox>
            <MainTitleTopBox>
              <Ul>
                <Li>
                  <FontAwesomeIcon icon={ICON_MAP.get("email")} />
                  <MainContentText>jisoodidi86@gmail.com</MainContentText>
                </Li>
                <Li>
                  <FontAwesomeIcon icon={ICON_MAP.get("github")} />
                  <MainContentText>https://github.com/DIDI-SU</MainContentText>
                </Li>
                <Li>
                  <FontAwesomeIcon icon={ICON_MAP.get("letterV")} />
                  <MainContentText>https://velog.io/@soojiv</MainContentText>
                </Li>
              </Ul>
            </MainTitleTopBox>
          </MainTitleContainer>
        </MainContentContainer>
      </MainContentTop>
      <MainContentTop>
        <MainBox title="Skills " id="middle">
          <MainContentCenterTechContainer>
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
          </MainContentCenterTechContainer>
        </MainBox>
        <MainBox title="Tools " id="middle">
          <MainContentCenterTechContainer>
            <MainContentCenterTechBox>
              <MainContentTechImg alt="gitlogo" src={ICON_MAP.get("gitlogo")} />
            </MainContentCenterTechBox>
            <MainContentCenterTechBox>
              <MainContentTechImg alt="trello" src={ICON_MAP.get("trello")} />
            </MainContentCenterTechBox>
          </MainContentCenterTechContainer>
        </MainBox>
      </MainContentTop>

      <MainBox title="프로젝트">
        <MainContentTagContainer>
          <MainContentTagSelector onChange={(e) => handleSelect(e)}>
            {TAG_NAME.map((item) => {
              const { id, name } = item;
              return (
                <MainContentTag id={id} key={id}>
                  {name.toUpperCase()}
                </MainContentTag>
              );
            })}
          </MainContentTagSelector>
        </MainContentTagContainer>
        <MainCardBox>
          {isLoading &&
            projectList.map((item) => {
              const { id, name, tech, link } = item;
              return <Card id={id} name={name} tech={tech} link={link} />;
            })}
        </MainCardBox>
      </MainBox>
    </MainArticle>
  );
};

export default Main;

const MainContentTop = styled.section`
  display: flex;
  justify-content: center;
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

const MainArticle = styled.article`
  max-width: 1100px;
`;

const DownLoadResume = styled.button`
  border: 1px solid black;
  border-radius: 5px;
`;
