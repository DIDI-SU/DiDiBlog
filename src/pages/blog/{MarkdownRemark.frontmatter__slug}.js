import React, { useEffect } from "react";
import GlobalLayout from "../../components/root-wrapper";
import sanitizeHtml from "sanitize-html";
import { graphql } from "gatsby";
import styled from "styled-components";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
const Posts = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const Html = sanitizeHtml(html);
  async function componentDidMount() {
    try {
      const deckdeckgoLoader = require("@deckdeckgo/highlight-code/dist/loader");

      await deckdeckgoLoader.defineCustomElements(window);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    componentDidMount();
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
`;
const Title = styled.h1`
  font-size: 40px;
  padding: 10px 0px;
`;
const PostDate = styled.p``;

const PostSection = styled.section`
  border-top: 1px solid;
  padding: 10px 0px;
  line-height: 150%;
  h2 {
    font-size: 19px;
  }
  code {
  }
`;
