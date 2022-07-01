import * as React from "react";
import GlobalLayout from "../components/root-wrapper";
import Main from "./main";
import Blog from "./blog";

const IndexPage = () => {
  return (
    <GlobalLayout>
      <Main />
    </GlobalLayout>
  );
};

export default IndexPage;
