import React from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogCard = ({ frontmatter, html }) => {
  const { title, date, tags, featuredimage } = frontmatter;
  const { src, alt } = featuredimage;
  const images = getImage(src);
  const fullHtml = sanitizeHtml(html);
  const finalHtml = fullHtml.replace(/<[^>]+>/g, "");

  return (
    <Card>
      <TitleDiv>
        <div>
          <Title>{title}</Title>
        </div>
        <BlogTagList>
          <BlogTagUl>
            {tags.map((item) => (
              <BlogTagLi key={item}>
                <BlogTagText>{item}</BlogTagText>
              </BlogTagLi>
            ))}
          </BlogTagUl>
        </BlogTagList>
      </TitleDiv>
      <Post>
        <PostSummary
          dangerouslySetInnerHTML={{ __html: finalHtml.substring(0, 500) }}
        />
        <GatsbyImage image={images} alt={alt} />
      </Post>
      <DateDiv>
        <p>{date}</p>
      </DateDiv>
    </Card>
  );
};

export default BlogCard;

const Card = styled.section`
  padding: 10px 0px;

  border-bottom: 1px solid black;

  :hover {
    cursor: pointer;
  }
`;

const Title = styled.h2`
  font-size: 20px;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BlogTagList = styled.section`
  padding: 15px 0px;
`;
const BlogTagUl = styled.ul`
  display: flex;
  flex-direction: row-reverse;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const BlogTagLi = styled.li``;

const BlogTagText = styled.p`
  padding: 5px;
  border-radius: 8px;
`;
const DateDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 0px;
`;

const Post = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    padding: 10px 0px;
  }
`;

const PostSummary = styled.div`
  max-width: 700px;
  padding: 0;
  line-height: 150%;
  overflow: hidden;
  position: relative;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: wrap;
`;
