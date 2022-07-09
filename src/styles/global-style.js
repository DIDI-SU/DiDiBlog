import * as React from "react";
import { createGlobalStyle } from "styled-components";
import { light } from "./theme";

const GlobalStyles = createGlobalStyle`
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  * {
    box-sizing: border-box;
  }
  
  body {

    line-height: 1;
    font-family: 'Spoqa Han Sans Neo';
    background-color: ${({ theme }) =>
      theme === light ? theme.Background : theme.Black[100]};
    color: ${({ theme }) =>
      theme === light ? theme.FontColor : theme.Background};
      #card{ background-color: ${({ theme }) =>
        theme === light ? theme.Background : theme.Background};
        border:none}


  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    color: ${({ theme }) =>
      theme === light ? theme.FontColor : theme.Background};
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;

  }

  ol, ul,li {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color: black;
  }
  button {
    border: none;
    background-color: inherit;
    vertical-align: middle;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
  
  img {
    width: 100%;
    height: 100%;
  }
  `;
export default GlobalStyles;
