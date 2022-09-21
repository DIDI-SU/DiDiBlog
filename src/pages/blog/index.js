import * as React from "react";
import GlobalLayout from "../../components/root-wrapper";
import { graphql, Link, useStaticQuery } from "gatsby";

import styled from "styled-components";
import BlogCard from "../../components/BlogCard/blogCard";
const BlogIndex = () => {
  const data = useStaticQuery(pageQuery);
  const { group } = data.allMarkdownRemark;
  const postList = data.allMarkdownRemark.nodes;
  console.log(data);
  return (
    <GlobalLayout>
      <BlogTop>
        <BlogTitleBox>
          <BlogTitle>📕 기록장</BlogTitle>
        </BlogTitleBox>
        <BlogTitleBox>
          <span>노션에 있던 글들을 조금씩 옮기고 있습니다.</span>
          <span>
            더 많은 글은{" "}
            <a href="https://hellojisoo.notion.site/84cfca016b7d45a09496818ce1024f84">
              여기
            </a>
            에 있어요!
          </span>
        </BlogTitleBox>
      </BlogTop>
      <BlogTagList>
        <BlogTagUl>
          {group &&
            group.map(({ tag, totalCount }) => (
              <BlogTagLi key={tag}>
                <BlogTagText>
                  {tag}({totalCount})
                </BlogTagText>
              </BlogTagLi>
            ))}
        </BlogTagUl>
        <BlogFilter>
          {group.map(({ tag, totalCount }) => {
            return (
              <option key={tag}>
                {tag}({totalCount})
              </option>
            );
          })}
        </BlogFilter>
      </BlogTagList>
      <BlogList>
        {postList &&
          postList.map(({ frontmatter, html }) => {
            return (
              <Link to={frontmatter.slug}>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
const BlogTitleBox = styled.div`
  margin: 8px 0px;
  span {
    margin: 8px 0px;
    padding: 5px;
    a {
      font-weight: 800;
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    span {
      margin: 0px;
    }
  }
`;
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

const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 10
    ) {
      nodes {
        frontmatter {
          slug
          title
          tags
          date
          featuredimage {
            src {
              childImageSharp {
                gatsbyImageData(height: 200, width: 200)
              }
            }
            alt
          }
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
