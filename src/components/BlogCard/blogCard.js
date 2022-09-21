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
        <PostSummary dangerouslySetInnerHTML={{ __html: finalHtml }} />
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
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0px 20px;
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
    img {
      display: none;
      height: 40px;
    }
  }
`;

const PostSummary = styled.div`
  max-width: 700px;
  line-height: 150%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
