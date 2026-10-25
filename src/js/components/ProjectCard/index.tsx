import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.scss';

// Types
import type { Project } from '@/store/types';

export interface Props extends React.ComponentProps<'article'> {
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
                    <a className={styles.link} href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.linkLabel || 'View project'}
                    </a>
                ) : (
                    <span className={styles.stack}>Private repository</span>
                )}
            </div>
        </article>
    );
};

export default ProjectCard;
