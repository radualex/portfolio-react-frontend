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

type HeroContent = SiteContent['hero'];

export interface Props {
    active?: ContentSection;
    value: HeroContent;
    onChange: (patch: Partial<HeroContent>) => void;
}

const HeroSection: React.FunctionComponent<Props> = ({ active, value, onChange }) => {
    const handleField = (key: TextKey<HeroContent>, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(fieldPatch(key, event.target.value));
    };

    return (
        <Group active={active} name={ContentSection.Hero}>
            <h3>Hero</h3>
            <div className={styles.fields}>
                <TextField id="content-hero-eyebrow" label="Eyebrow" type="text" value={value.eyebrow} onChange={handleField.bind(undefined, 'eyebrow')} />
                <TextField id="content-hero-heading" label="Heading" type="text" value={value.heading} onChange={handleField.bind(undefined, 'heading')} />
                <TextAreaField id="content-hero-lead" label="Lead" full rows={3} value={value.lead} onChange={handleField.bind(undefined, 'lead')} />
                <TextField id="content-hero-location" label="Location" type="text" value={value.location} onChange={handleField.bind(undefined, 'location')} />
                <TextField id="content-hero-primaryCta" label="Primary button" type="text" value={value.primaryCta} onChange={handleField.bind(undefined, 'primaryCta')} />
                <TextField id="content-hero-cvCta" label="CV button" type="text" value={value.cvCta} onChange={handleField.bind(undefined, 'cvCta')} />
            </div>
        </Group>
    );
};

export default HeroSection;
