import React, { useEffect, useState } from "react";
import PROJECT from "../../data/projectList/projectList";
import Card from "../../components/MainCard/card";
import styled from "styled-components";
const ProjectList = () => {
  return (
    <Projects>
      {PROJECT.map((items) => {
        const { id, name, tech, link } = items;
        return <Card id={id} name={name} tech={tech} link={link} />;
      })}
    </Projects>
  );
};

export default ProjectList;

const Projects = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
