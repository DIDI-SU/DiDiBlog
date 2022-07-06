import React from "react";
import GlobalLayout from "../../components/root-wrapper";
import sanitizeHtml from "sanitize-html";
import { graphql } from "gatsby";

const Posts = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  const Html = sanitizeHtml(html);
  return (
    <GlobalLayout>
      <div>
        <div>
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
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
