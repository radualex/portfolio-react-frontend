import React, { type ChangeEvent } from 'react';

// Constants
import { ContentSection } from '@/admin/constants';

// Components
import TextField from '@/components/TextField';

// Containers
import Group from '../Group';

// Helpers
import { fieldPatch } from '../helpers';

// Styles
import styles from '../styles.module.scss';

// Types
import type { SiteContent } from '@/store/types';
import type { TextKey } from '../types';

type FooterContent = SiteContent['footer'];

export interface Props {
    active?: ContentSection;
    value: FooterContent;
    onChange: (patch: Partial<FooterContent>) => void;
}

const FooterSection: React.FunctionComponent<Props> = ({ active, value, onChange }) => {
    const handleField = (key: TextKey<FooterContent>, event: ChangeEvent<HTMLInputElement>) => {
        onChange(fieldPatch(key, event.target.value));
    };

    return (
        <Group active={active} name={ContentSection.Footer}>
            <h3>Footer</h3>
            <div className={styles.fields}>
                <TextField id="content-footer-copyright" label="Copyright" type="text" full value={value.copyright} onChange={handleField.bind(undefined, 'copyright')} />
            </div>
        </Group>
    );
};

export default FooterSection;
