import React, { useEffect } from "react";
import { window, document } from "browser-monads";
import GlobalLayout from "../../components/root-wrapper";
import sanitizeHtml from "sanitize-html";
import { graphql } from "gatsby";
import styled from "styled-components";
const Posts = ({ data }) => {
  const pre = document.getElementsByTagName("pre");
  const addClass = document.getElementsByTagName("code");
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const Html = sanitizeHtml(html);

  useEffect(() => {
    const lengths = addClass.length;
    const preLength = pre.length;
    for (let i = 0; i < lengths; i++) {
      addClass[i].classList.add("language-");
    }
    for (let i = 0; i < preLength; i++) {
      pre[i].classList.add("language-");
    }
  }, []);

  return (
    <GlobalLayout>
      <TitleSection>
        <Title>{frontmatter.title}</Title>
        <PostDate>{frontmatter.date}</PostDate>
      </TitleSection>

      <PostSection dangerouslySetInnerHTML={{ __html: Html }} />
    </GlobalLayout>
  );
};

export default Posts;

export const pageQuery = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;

const TitleSection = styled.section`
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: 30px;
  padding: 10px 0px;

  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`;
const PostDate = styled.p`
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const PostSection = styled.section`
  border-top: 1px solid;
  padding: 10px 0px;
  line-height: 150%;
  h2 {
    font-size: 25px;
    margin: 8px 0px;
  }
  h3 {
    font-size: 18px;
    padding: 5px 5px;
    border-left: 2px solid black;
    line-height: 150%;
  }
  p {
    line-height: 150%;
    padding: 5px 0px;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;
