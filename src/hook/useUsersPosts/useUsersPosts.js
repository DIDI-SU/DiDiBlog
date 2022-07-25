import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

const useUsersPosts = (query) => {
  const posts = useStaticQuery(query);

  return [posts];
};

export default useUsersPosts;
