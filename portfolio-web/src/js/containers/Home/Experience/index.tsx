import React from 'react';

// Constants
import { ContentSection } from '@/admin/constants';
import { ButtonVariant } from '@/components/Button/constants';

// Components
import Button from '@/components/Button';
import Container from '@/components/Container';
import EditableText from '@/components/EditableText';
import Eyebrow from '@/components/Eyebrow';
import Pill from '@/components/Pill';
import Section from '@/components/Section';
import SectionEditButton from '@/components/SectionEditButton';
import SectionHead from '@/components/SectionHead';
import { useInlineEdit } from '@/admin/InlineEditContext';

// Store
import { CV_PATH } from '@/store/defaults';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'section'> {}

const Experience: React.FunctionComponent<Props> = (props) => {
    const { content } = useInlineEdit();
    const { experience } = content;

    return (
        <Section id="experience" {...props}>
            <SectionEditButton target={ContentSection.Experience} label="experience" />
            <Container>
                <div className={styles.experienceHead}>
                    <SectionHead className={styles.experienceHeadText}>
                        <Eyebrow quiet>
                            <EditableText section={ContentSection.Experience} path="experience.eyebrow" />
                        </Eyebrow>
                        <h2>
                            <EditableText section={ContentSection.Experience} path="experience.heading" />
                        </h2>
                    </SectionHead>
                    <Button variant={ButtonVariant.Ghost} arrow href={CV_PATH} target="_blank" rel="noopener">
                        <EditableText section={ContentSection.Experience} path="experience.cvLabel" />
                    </Button>
                </div>

                <div>
                    {experience.roles.map((role, roleIndex) => {
                        return (
                            <article className={styles.logRow} key={role.id}>
                                <span className={styles.period}>
                                    <EditableText section={ContentSection.Experience} path={`experience.roles.${roleIndex}.period`} />
                                </span>
                                <div>
                                    <h3>
                                        <EditableText section={ContentSection.Experience} path={`experience.roles.${roleIndex}.title`} />
                                    </h3>
                                    <p className={styles.org}>
                                        <EditableText section={ContentSection.Experience} path={`experience.roles.${roleIndex}.org`} />
                                    </p>
                                    <p className={styles.what}>
                                        <EditableText section={ContentSection.Experience} path={`experience.roles.${roleIndex}.what`} />
                                    </p>
                                </div>
                                <div className={styles.pull}>
                                    <ul className={styles.stackList}>
                                        {role.stack.map((_, lineIndex) => {
                                            return (
                                                <Pill as="li" key={lineIndex}>
                                                    <EditableText section={ContentSection.Experience} path={`experience.roles.${roleIndex}.stack.${lineIndex}`} />
                                                </Pill>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <p className={styles.education}>
                    <strong>
                        <EditableText section={ContentSection.Experience} path="experience.educationLabel" />
                    </strong> — <EditableText section={ContentSection.Experience} path="experience.education" />
                </p>
            </Container>
        </Section>
    );
};

export default Experience;
