import * as React from "react";
import { Link } from "gatsby";
import GlobalLayout from "../../components/root-wrapper";
import styled from "styled-components";
import BlogCard from "../../components/blogCard";
import { graphql } from "gatsby";

const BlogIndex = ({ data }) => {
  const { id } = data.markdownRemark;
  const { tags, date, title, slug } = data.markdownRemark.frontmatter;
  return (
    <GlobalLayout>
      <BlogTop>
        <BlogTitleBox>
          <BlogTitle>기록 모음</BlogTitle>
        </BlogTitleBox>
      </BlogTop>
      <div>
        <ul>{tags && tags.map((item) => <li> {item}</li>)}</ul>
      </div>
      <BlogList>
        <Link to={slug}>{title}</Link>
      </BlogList>
    </GlobalLayout>
  );
};

export default BlogIndex;
const BlogTop = styled.section``;
const BlogTitleBox = styled.div``;
const BlogTitle = styled.h2`
  font-size: 30px;
`;
const BlogList = styled.section``;

export const pageQuery = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        tags
      }
      id
    }
  }
`;
