import * as React from "react";
import GlobalLayout from "../../components/root-wrapper";
import { graphql } from "gatsby";
import styled from "styled-components";

const BlogIndex = ({ data }) => {
  const { group } = data.allMarkdownRemark;
  const tags = group && group.map((item) => item.tag);

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
      <BlogList></BlogList>
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
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
