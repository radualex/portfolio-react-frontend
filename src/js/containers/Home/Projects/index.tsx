import React from "react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Lead from "@/components/Lead";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import SectionHead from "@/components/SectionHead";
import { useStore } from "@/store/StoreContext";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"section"> {}

const Projects: React.FunctionComponent<Props> = (props) => {
  const { projects } = useStore();
  /* Hidden projects are withheld here, not filtered in the card. */
  const visible = projects();

  return (
    <Section id="projects" {...props}>
      <Container>
        <SectionHead>
          <Eyebrow quiet>Built outside office hours</Eyebrow>
          <h2>Side projects, shipped and public.</h2>
          <Lead>
            Where I try the patterns before they turn up in client work. One of
            them ended up on npm.
          </Lead>
        </SectionHead>

        {visible.length === 0 ? (
          <Lead>No projects are published right now.</Lead>
        ) : (
          <div className={styles.grid3}>
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default Projects;
