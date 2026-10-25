import React from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import Container from '@/components/Container';
import EditableText from '@/components/EditableText';
import Eyebrow from '@/components/Eyebrow';
import Lead from '@/components/Lead';
import ProjectCard from '@/components/ProjectCard';
import Section from '@/components/Section';
import SectionEditButton from '@/components/SectionEditButton';
import SectionHead from '@/components/SectionHead';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'section'> {}

const Projects: React.FunctionComponent<Props> = ({ ...props }) => {
    const { projects } = useStore();
    const visible = projects();

    return (
        <Section id="projects" {...props}>
            <SectionEditButton target={ContentSection.Projects} label="projects" />
            <Container>
                <SectionHead>
                    <Eyebrow quiet>
                        <EditableText section={ContentSection.Projects} path="projects.eyebrow" />
                    </Eyebrow>
                    <h2>
                        <EditableText section={ContentSection.Projects} path="projects.heading" />
                    </h2>
                    <Lead>
                        <EditableText section={ContentSection.Projects} path="projects.lead" />
                    </Lead>
                </SectionHead>

                {visible.length === 0 ? (
                    <Lead>
                        <EditableText section={ContentSection.Projects} path="projects.empty" />
                    </Lead>
                ) : (
                    <div className={styles.grid3}>
                        {visible.map((project) => {
                            return (
                                <ProjectCard key={project.id} project={project} />
                            );
                        })}
                    </div>
                )}
            </Container>
        </Section>
    );
};

export default Projects;
