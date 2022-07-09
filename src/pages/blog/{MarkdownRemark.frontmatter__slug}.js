import React from "react";
import GlobalLayout from "../../components/root-wrapper";
import sanitizeHtml from "sanitize-html";
import { graphql } from "gatsby";
import styled from "styled-components";

const Posts = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  const Html = sanitizeHtml(html);
  return (
    <GlobalLayout>
      <TitleSection>
        <Title>{frontmatter.title}</Title>
        <PostDate>{frontmatter.date}</PostDate>
      </TitleSection>
      <div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: Html }} />
        </div>
      </div>
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
