import React, { type ChangeEvent } from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import TextAreaField from '@/components/TextAreaField';
import TextField from '@/components/TextField';

// Containers
import ExperienceEditor from '../ExperienceEditor';
import Group from '../Group';

// Helpers
import { fieldPatch } from '../helpers';

// Styles
import styles from '../styles.module.css';

// Types
import type { SiteContent } from '@/store/types';
import type { TextKey } from '../types';

type ExperienceContent = SiteContent['experience'];

export interface Props {
    active?: ContentSection;
    value: ExperienceContent;
    onChange: (patch: Partial<ExperienceContent>) => void;
}

const ExperienceSection: React.FunctionComponent<Props> = ({ active, value, onChange }) => {
    const handleField = (key: TextKey<ExperienceContent>, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(fieldPatch(key, event.target.value));
    };

    return (
        <Group active={active} name={ContentSection.Experience}>
            <h3>Experience</h3>
            <div className={styles.fields}>
                <TextField id="content-experience-eyebrow" label="Eyebrow" type="text" value={value.eyebrow} onChange={handleField.bind(undefined, 'eyebrow')} />
                <TextField id="content-experience-heading" label="Heading" type="text" value={value.heading} onChange={handleField.bind(undefined, 'heading')} />
                <TextField id="content-experience-cvLabel" label="CV label" type="text" value={value.cvLabel} onChange={handleField.bind(undefined, 'cvLabel')} />
                <TextField id="content-experience-educationLabel" label="Education label" type="text" value={value.educationLabel} onChange={handleField.bind(undefined, 'educationLabel')} />
                <TextAreaField id="content-experience-education" label="Education" full rows={3} value={value.education} onChange={handleField.bind(undefined, 'education')} />
            </div>

            <ExperienceEditor experience={value} onChange={onChange} />
        </Group>
    );
};

export default ExperienceSection;
