import * as React from "react";
import GlobalLayout from "../../components/root-wrapper";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import BlogCard from "../../components/blogCard";

const BlogIndex = ({ data }) => {
  const { group } = data.allMarkdownRemark;
  const postList = data.allMarkdownRemark.nodes;
  console.log(postList);
  return (
    <GlobalLayout>
      <BlogTop>
        <BlogTitleBox>
          <BlogTitle>기록장</BlogTitle>
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
      </BlogTagList>
      <BlogList>
        {postList &&
          postList.map((item) => {
            const { frontmatter } = item;
            return (
              <Link to={frontmatter.slug}>
                <BlogCard frontmatter={frontmatter} html={item.html} />
              </Link>
            );
          })}
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

const BlogTagList = styled.section`
  padding: 15px 0px;
`;
const BlogTagUl = styled.ul`
  display: flex;
  align-items: center;
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
