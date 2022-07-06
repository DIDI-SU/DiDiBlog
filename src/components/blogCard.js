import React from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
const BlogCard = ({ frontmatter, html }) => {
  const { title, date, tags } = frontmatter;
  const Html = sanitizeHtml(html);
  return (
    <Card>
      <TitleDiv>
        <Title>{title}</Title>
      </TitleDiv>
      <BlogTagList>
        <BlogTagUl>
          {tags.map((item) => (
            <BlogTagLi key={item}>
              <BlogTagText>{item}</BlogTagText>
            </BlogTagLi>
          ))}
        </BlogTagUl>
      </BlogTagList>
      <DateDiv>
        <p>{date}</p>
      </DateDiv>
      <Post>
        <div dangerouslySetInnerHTML={{ __html: Html }} />
      </Post>
    </Card>
  );
};

export default BlogCard;

const Card = styled.section`
  padding: 10px 0px;
  border-bottom: 1px solid black;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const TitleDiv = styled.div``;

const BlogTagList = styled.section`
  padding: 15px 0px;
`;
const BlogTagUl = styled.ul`
  display: flex;
  flex-direction: row-reverse;
`;
const BlogTagLi = styled.li``;

const BlogTagText = styled.p`
  padding: 5px;
  border-radius: 8px;
`;
const DateDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Post = styled.section`
  margin: 10px 0px;
  padding: 10px;
  border: 1px solid red;
  border-radius: 8px;
  div {
    height: 150px;
    width: auto;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
