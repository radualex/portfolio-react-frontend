import React from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import Container from '@/components/Container';
import EditableText from '@/components/EditableText';
import Eyebrow from '@/components/Eyebrow';
import Section from '@/components/Section';
import SectionEditButton from '@/components/SectionEditButton';
import { useInlineEdit } from '@/admin/InlineEditContext';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'section'> {}

const TrackRecord: React.FunctionComponent<Props> = ({ ...props }) => {
    const { content } = useInlineEdit();
    const { trackRecord } = content;

    return (
        <Section {...props}>
            <SectionEditButton target={ContentSection.TrackRecord} label="track record" />
            <Container>
                <Eyebrow quiet className={styles.trackEyebrow}>
                    <EditableText section={ContentSection.TrackRecord} path="trackRecord.eyebrow" />
                </Eyebrow>
                <div className={styles.grid3}>
                    {trackRecord.stats.map((stat, index) => {
                        return (
                            <div key={stat.id}>
                                <div className={styles.statNum}>
                                    <EditableText section={ContentSection.TrackRecord} path={`trackRecord.stats.${index}.value`} />
                                    {stat.unit && (
                                        <span className={styles.statUnit}>
                                            <EditableText section={ContentSection.TrackRecord} path={`trackRecord.stats.${index}.unit`} />
                                        </span>
                                    )}
                                </div>
                                <p className={styles.statLabel}>
                                    <EditableText section={ContentSection.TrackRecord} path={`trackRecord.stats.${index}.label`} />
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
};

export default TrackRecord;
