import * as React from "react";
import styled from "styled-components";
import GlobalLayout from "../components/root-wrapper";
import BlogCard from "../components/blogCard";

const Blog = () => {
  return (
    <GlobalLayout>
      <BlogTop>
        <BlogTitleBox>
          <BlogTitle>기록 모음</BlogTitle>
        </BlogTitleBox>
      </BlogTop>
      <BlogList>
        <BlogCard />
        <BlogCard />

        <BlogCard />

        <BlogCard />
      </BlogList>
    </GlobalLayout>
  );
};

export default Blog;
const BlogTop = styled.section``;
const BlogTitleBox = styled.div``;
const BlogTitle = styled.h2``;
const BlogList = styled.section``;
