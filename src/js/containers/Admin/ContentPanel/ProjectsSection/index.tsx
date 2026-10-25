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

type ProjectsContent = SiteContent['projects'];

export interface Props {
    active?: ContentSection;
    value: ProjectsContent;
    onChange: (patch: Partial<ProjectsContent>) => void;
}

const ProjectsSection: React.FunctionComponent<Props> = ({ active, value, onChange }) => {
    const handleField = (key: TextKey<ProjectsContent>, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(fieldPatch(key, event.target.value));
    };

    return (
        <Group active={active} name={ContentSection.Projects}>
            <h3>Projects</h3>
            <div className={styles.fields}>
                <TextField id="content-projects-eyebrow" label="Eyebrow" type="text" value={value.eyebrow} onChange={handleField.bind(undefined, 'eyebrow')} />
                <TextField id="content-projects-heading" label="Heading" type="text" value={value.heading} onChange={handleField.bind(undefined, 'heading')} />
                <TextAreaField id="content-projects-lead" label="Lead" full rows={3} value={value.lead} onChange={handleField.bind(undefined, 'lead')} />
                <TextField id="content-projects-empty" label="Empty state" type="text" full value={value.empty} onChange={handleField.bind(undefined, 'empty')} />
            </div>
        </Group>
    );
};

export default ProjectsSection;
