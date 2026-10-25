import React, { type ChangeEvent } from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import PillField from '@/components/PillField';
import TextAreaField from '@/components/TextAreaField';
import TextField from '@/components/TextField';

// Containers
import Group from '../Group';

// Helpers
import { fieldPatch } from '../helpers';

// Store
import { SKILL_SUGGESTIONS } from '@/store/defaults';

// Styles
import styles from '../styles.module.scss';

// Types
import type { CapabilityItem, SiteContent } from '@/store/types';
import type { TextKey } from '../types';

type CapabilitiesContent = SiteContent['capabilities'];

export interface Props {
    active?: ContentSection;
    value: CapabilitiesContent;
    onChange: (patch: Partial<CapabilitiesContent>) => void;
}

const CapabilitiesSection: React.FunctionComponent<Props> = ({ active, value, onChange }) => {
    const handleField = (key: TextKey<CapabilitiesContent>, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(fieldPatch(key, event.target.value));
    };

    const handleStack = (next: string[]) => {
        onChange({
            stack: next
        });
    };

    const handleItem = (id: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.target.name as TextKey<CapabilityItem>;
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
        <Group active={active} name={ContentSection.Capabilities}>
            <h3>Approach</h3>
            <div className={styles.fields}>
                <TextField id="content-capabilities-eyebrow" label="Eyebrow" type="text" value={value.eyebrow} onChange={handleField.bind(undefined, 'eyebrow')} />
                <TextField id="content-capabilities-heading" label="Heading" type="text" value={value.heading} onChange={handleField.bind(undefined, 'heading')} />
                <TextField id="content-capabilities-stackLabel" label="Stack label" type="text" value={value.stackLabel} onChange={handleField.bind(undefined, 'stackLabel')} />
                <PillField id="content-capabilities-stack" label="Stack" full value={value.stack} onChange={handleStack} suggestions={SKILL_SUGGESTIONS} hint="Type to search, or press Enter to add a new skill." />
            </div>

            <div className={styles.items}>
                {value.items.map((item) => {
                    return (
                        <div className={styles.item} key={item.id}>
                            <div className={styles.fields}>
                                <TextField id={`content-capability-${item.id}-title`} label="Title" type="text" name="title" value={item.title} onChange={handleItem.bind(undefined, item.id)} />
                                <TextAreaField id={`content-capability-${item.id}-body`} label="Body" full rows={3} name="body" value={item.body} onChange={handleItem.bind(undefined, item.id)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Group>
    );
};

export default CapabilitiesSection;
