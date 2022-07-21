import * as React from "react";
import GlobalLayout from "../../components/root-wrapper";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import BlogCard from "../../components/BlogCard/blogCard";

const BlogIndex = ({ data }) => {
  const { group } = data.allMarkdownRemark;
  const postList = data.allMarkdownRemark.nodes;

  return (
    <GlobalLayout>
      <BlogTop>
        <BlogTitleBox>
          <BlogTitle>📕 기록장</BlogTitle>
        </BlogTitleBox>
      </BlogTop>
      <BlogTagList>
        <BlogTagUl>
          {group.map((item) => (
            <BlogTagLi key={item.tag}>
              <BlogTagText>
                {item.tag}({item.totalCount})
              </BlogTagText>
            </BlogTagLi>
          ))}
        </BlogTagUl>
        <BlogFilter>
          {group.map((item) => {
            return (
              <option key={item.tag}>
                {item.tag}({item.totalCount})
              </option>
            );
          })}
        </BlogFilter>
      </BlogTagList>
      <BlogList>
        {postList &&
          postList.map((item) => {
            const { frontmatter, html } = item;

            return (
              <Link to={"/blog/" + frontmatter.slug}>
                <BlogCard frontmatter={frontmatter} html={html} />
              </Link>
            );
          })}
      </BlogList>
    </GlobalLayout>
  );
};

export default BlogIndex;
const BlogTop = styled.section`
  padding: 0px 10px;
`;
const BlogTitleBox = styled.div``;
const BlogTitle = styled.h2`
  font-size: 30px;
`;
const BlogList = styled.section`
  padding: 0px 10px;
`;

const BlogTagList = styled.section`
  padding: 15px 0px;
  @media screen and (max-width: 768px) {
    padding: 15px;
    display: flex;

    justify-content: flex-end;
  }
`;
const BlogTagUl = styled.ul`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const BlogFilter = styled.select`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;
const BlogTagLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const BlogTagText = styled.p`
  padding: 5px;
  border-radius: 8px;
`;

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          slug
          title
          tags
          date
        }
        html
      }
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
