import React from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import Container from '@/components/Container';
import EditableText from '@/components/EditableText';
import Eyebrow from '@/components/Eyebrow';
import Pill from '@/components/Pill';
import Section from '@/components/Section';
import SectionEditButton from '@/components/SectionEditButton';
import SectionHead from '@/components/SectionHead';
import { useInlineEdit } from '@/admin/InlineEditContext';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'section'> {}

const Capabilities: React.FunctionComponent<Props> = ({ ...props }) => {
    const { content } = useInlineEdit();
    const { capabilities } = content;

    return (
        <Section id="capabilities" {...props}>
            <SectionEditButton target={ContentSection.Capabilities} label="approach" />
            <Container>
                <SectionHead>
                    <Eyebrow quiet>
                        <EditableText section={ContentSection.Capabilities} path="capabilities.eyebrow" />
                    </Eyebrow>
                    <h2>
                        <EditableText section={ContentSection.Capabilities} path="capabilities.heading" />
                    </h2>
                </SectionHead>

                <div className={styles.grid3}>
                    {capabilities.items.map((capability, index) => {
                        return (
                            <div className={styles.feature} key={capability.id}>
                                <div className={styles.featureMark} aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                        <path d={capability.path} />
                                    </svg>
                                </div>
                                <h3>
                                    <EditableText section={ContentSection.Capabilities} path={`capabilities.items.${index}.title`} />
                                </h3>
                                <p>
                                    <EditableText section={ContentSection.Capabilities} path={`capabilities.items.${index}.body`} />
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className={styles.stackStrip}>
                    <p className={styles.stackLabel}>
                        <EditableText section={ContentSection.Capabilities} path="capabilities.stackLabel" />
                    </p>
                    <ul className={styles.pillRow}>
                        {capabilities.stack.map((_, index) => {
                            return (
                                <Pill as="li" key={index}>
                                    <EditableText section={ContentSection.Capabilities} path={`capabilities.stack.${index}`} />
                                </Pill>
                            );
                        })}
                    </ul>
                </div>
            </Container>
        </Section>
    );
};

export default Capabilities;
