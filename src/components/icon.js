import * as React from "react";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
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
  { name: "email", value: faEnvelope },
  { name: "github", value: faGithubSquare },
  { name: "letterV", value: faCircleCheck },
];
export const ICON_MAP = new Map(ICON.map((icon) => [icon.name, icon.value]));
