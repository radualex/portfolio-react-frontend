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
import styles from '../styles.module.css';

// Types
import type { SiteContent } from '@/store/types';
import type { TextKey } from '../types';

type ClosingCtaContent = SiteContent['closingCta'];

export interface Props {
    active?: ContentSection;
    value: ClosingCtaContent;
    onChange: (patch: Partial<ClosingCtaContent>) => void;
}

const ClosingCtaSection: React.FunctionComponent<Props> = ({ active, value, onChange }) => {
    const handleField = (key: TextKey<ClosingCtaContent>, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(fieldPatch(key, event.target.value));
    };

    return (
        <Group active={active} name={ContentSection.ClosingCta}>
            <h3>Closing CTA</h3>
            <div className={styles.fields}>
                <TextField id="content-closingCta-heading" label="Heading" type="text" value={value.heading} onChange={handleField.bind(undefined, 'heading')} />
                <TextAreaField id="content-closingCta-lead" label="Lead" full rows={3} value={value.lead} onChange={handleField.bind(undefined, 'lead')} />
                <TextField id="content-closingCta-ctaLabel" label="Button label" type="text" full value={value.ctaLabel} onChange={handleField.bind(undefined, 'ctaLabel')} />
            </div>
        </Group>
    );
};

export default ClosingCtaSection;
