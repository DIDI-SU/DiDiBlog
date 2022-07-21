import * as React from "react";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Styled from "../../assets/icon/GitHub.svg";
import css from "../../assets/icon/css.svg";
import LogoReact from "../../assets/icon/react.svg";
import LogoHTML from "../../assets/icon/html.svg";
import LogoJS from "../../assets/icon/js.svg";
import Trello from "../../assets/icon/Trello.svg";
import Git from "../../assets/icon/GitHub.svg";

const ICON = [
  { name: "react", value: LogoReact },
  { name: "js", value: LogoJS },
  { name: "html5", value: LogoHTML },
  { name: "css", value: css },
  { name: "styled", value: Styled },
  { name: "email", value: faEnvelope },
  { name: "github", value: faGithubSquare },
  { name: "letterV", value: faCircleCheck },
  { name: "trello", value: Trello },
  { name: "gitlogo", value: Git },
];

const ICON_MAP = new Map(ICON.map((icon) => [icon.name, icon.value]));
export default ICON_MAP;
