import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "styled-components";
import BlogCard from "../BlogCard/blogCard";

const PostList = () => {
  const recentPosts = useStaticQuery(QUERY);
  return (
    <Posts>
      {recentPosts.allMarkdownRemark.nodes.map(({ frontmatter, html }) => {
        return (
          <Link to={"/blog" + frontmatter.slug}>
            <BlogCard frontmatter={frontmatter} html={html} />
          </Link>
        );
      })}
    </Posts>
  );
};

export default PostList;

const Posts = styled.section``;

const QUERY = graphql`
  {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 5
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
