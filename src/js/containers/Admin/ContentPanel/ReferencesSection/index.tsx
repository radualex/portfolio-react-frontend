import React, { type ChangeEvent } from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import TextAreaField from '@/components/TextAreaField';
import TextField from '@/components/TextField';

// Containers
import Group from '../Group';

// Helpers
import { fieldPatch } from '../helpers';

// Styles
import styles from '../styles.module.scss';

// Types
import type { ReferenceItem, SiteContent } from '@/store/types';
import type { TextKey } from '../types';

type ReferencesContent = SiteContent['references'];

export interface Props {
    active?: ContentSection;
    value: ReferencesContent;
    onChange: (patch: Partial<ReferencesContent>) => void;
}

const ReferencesSection: React.FunctionComponent<Props> = ({ active, value, onChange }) => {
    const handleField = (key: TextKey<ReferencesContent>, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(fieldPatch(key, event.target.value));
    };

    const handleItem = (id: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.target.name as TextKey<ReferenceItem>;
        const patch = fieldPatch(field, event.target.value);

        onChange({
            items: value.items.map((item) => {
                return item.id === id ? {
                    ...item,
                    ...patch
                } : item;
            })
        });
    };

    return (
        <Group active={active} name={ContentSection.References}>
            <h3>References</h3>
            <div className={styles.fields}>
                <TextField id="content-references-eyebrow" label="Eyebrow" type="text" value={value.eyebrow} onChange={handleField.bind(undefined, 'eyebrow')} />
                <TextField id="content-references-heading" label="Heading" type="text" value={value.heading} onChange={handleField.bind(undefined, 'heading')} />
                <TextAreaField id="content-references-lead" label="Lead" full rows={3} value={value.lead} onChange={handleField.bind(undefined, 'lead')} />
                <TextField id="content-references-pendingLabel" label="Pending label" type="text" value={value.pendingLabel} onChange={handleField.bind(undefined, 'pendingLabel')} />
                <TextField id="content-references-placeholderQuote" label="Placeholder quote" type="text" value={value.placeholderQuote} onChange={handleField.bind(undefined, 'placeholderQuote')} />
            </div>

            <div className={styles.items}>
                {value.items.map((item) => {
                    return (
                        <div className={styles.item} key={item.id}>
                            <div className={styles.fields}>
                                <TextAreaField id={`content-reference-${item.id}-quote`} label="Quote" full rows={3} name="quote" value={item.quote} onChange={handleItem.bind(undefined, item.id)} />
                                <TextField id={`content-reference-${item.id}-author`} label="Author" type="text" name="author" value={item.author} onChange={handleItem.bind(undefined, item.id)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Group>
    );
};

export default ReferencesSection;
