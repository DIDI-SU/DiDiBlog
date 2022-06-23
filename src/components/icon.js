import email from "../images/Icon/gmail.png";
import git from "../images/Icon/github.png";
import letterV from "../images/Icon/letter-v.png";
import Styled from "../assets/icon/styled.svg";
import css from "../assets/icon/css.svg";
import LogoReact from "../assets/icon/react.svg";
import LogoHTML from "../assets/icon/html.svg";
import LogoJS from "../assets/icon/js.svg";

const ICON = [
  { name: "react", value: LogoReact },
  { name: "js", value: LogoJS },
  { name: "html5", value: LogoHTML },
  { name: "css", value: css },
  { name: "styled", value: Styled },
  { name: "email", value: email },
  { name: "github", value: git },
  { name: "letterV", value: letterV },
];
export const ICON_MAP = new Map(ICON.map((icon) => [icon.name, icon.value]));
