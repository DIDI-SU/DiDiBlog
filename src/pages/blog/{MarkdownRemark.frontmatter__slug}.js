import React, { useEffect } from "react";
import { document } from "browser-monads";
import GlobalLayout from "../../components/root-wrapper";
import sanitizeHtml from "sanitize-html";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import styled from "styled-components";
const Posts = () => {
  const PostsData = useStaticQuery(pageQuery);
  const pre = document.getElementsByTagName("pre");
  const addClass = document.getElementsByTagName("code");
  const { markdownRemark } = PostsData;
  const { frontmatter, html } = markdownRemark;
  const Html = sanitizeHtml(html);
  const { alt, src } = frontmatter.featuredimage;
  const image = getImage(src);
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
      <GatsbyImage image={image} alt={alt} />
      <PostSection dangerouslySetInnerHTML={{ __html: Html }} />
    </GlobalLayout>
  );
};

export default Posts;

const pageQuery = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        featuredimage {
          alt
          src {
            childImageSharp {
              gatsbyImageData(width: 768, height: 400)
            }
          }
        }
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

  table {
    border: 1px solid black;
    border-radius: 4px;
  }
  tr {
    border: 1px solid black;
  }
  td {
    border: 1px solid black;
    padding: 3px 0px;
    text-align: center;
  }
`;
