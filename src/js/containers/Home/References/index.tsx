import React from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import Container from '@/components/Container';
import EditableText from '@/components/EditableText';
import Eyebrow from '@/components/Eyebrow';
import Lead from '@/components/Lead';
import Section from '@/components/Section';
import SectionEditButton from '@/components/SectionEditButton';
import SectionHead from '@/components/SectionHead';
import { useInlineEdit } from '@/admin/InlineEditContext';

// Styles
import styles from './styles.module.scss';

// Types
import type { ReferenceItem } from '@/store/types';

export interface Props extends React.ComponentProps<'section'> {}

const References: React.FunctionComponent<Props> = ({ ...props }) => {
    const { content, editingSection } = useInlineEdit();
    const { references } = content;
    const isEditing = editingSection === ContentSection.References;

    const renderQuote = (item: ReferenceItem, index: number) => {
        return (
            <figure className={styles.quoteCard} key={item.id}>
                <blockquote>
                    <EditableText section={ContentSection.References} path={`references.items.${index}.quote`} />
                </blockquote>
                {(item.author.trim() || isEditing) && (
                    <figcaption className={styles.quoteAuthor}>
                        — <EditableText section={ContentSection.References} path={`references.items.${index}.author`} />
                    </figcaption>
                )}
            </figure>
        );
    };

    const renderPending = (item: ReferenceItem, index: number) => {
        return (
            <figure className={styles.quoteCard} key={item.id}>
                <span className={styles.quotePending}>
                    {references.pendingLabel}
                </span>
                <blockquote>{references.placeholderQuote}</blockquote>
                <figcaption className={styles.quoteAuthor}>
                    — Slot {index + 1} of {references.items.length}
                </figcaption>
            </figure>
        );
    };

    return (
        <Section id="references" {...props}>
            <SectionEditButton target={ContentSection.References} label="references" />
            <Container>
                <SectionHead className={styles.referencesHead}>
                    <Eyebrow quiet>
                        <EditableText section={ContentSection.References} path="references.eyebrow" />
                    </Eyebrow>
                    <h2>
                        <EditableText section={ContentSection.References} path="references.heading" />
                    </h2>
                    <Lead>
                        <EditableText section={ContentSection.References} path="references.lead" />
                    </Lead>
                </SectionHead>

                <div className={styles.grid3}>
                    {references.items.map((item, index) => {
                        return item.quote.trim() || isEditing ? renderQuote(item, index) : renderPending(item, index);
                    })}
                </div>
            </Container>
        </Section>
    );
};

export default References;
