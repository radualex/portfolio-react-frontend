import React from "react";
import classNames from "classnames";
import type { Project } from "@/store/types";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"article"> {
  project: Project;
}

const ProjectCard: React.FunctionComponent<Props> = ({ project, className, ...props }) => {
  const classes = classNames(styles.root, className);

  return (
    <article className={classes} {...props}>
      <div className={styles.top}>
        <h3>{project.title}</h3>
        <span className={styles.kind}>{project.kind}</span>
      </div>
      <p>{project.description}</p>
      <div className={styles.foot}>
        <span className={styles.stack}>{project.stack}</span>
        {project.link ? (
          <a
            className={styles.link}
            href={project.link}
            target="_blank"
            rel="noopener"
          >
            {project.linkLabel || "View project"}
          </a>
        ) : (
          // Admin can save a project without a URL; say so rather than rendering a dead link.
          <span className={styles.stack}>Private repository</span>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
