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
import type { SiteContent, StatItem } from '@/store/types';
import type { TextKey } from '../types';

type TrackRecordContent = SiteContent['trackRecord'];

export interface Props {
    active?: ContentSection;
    value: TrackRecordContent;
    onChange: (patch: Partial<TrackRecordContent>) => void;
}

const TrackRecordSection: React.FunctionComponent<Props> = ({ active, value, onChange }) => {
    const handleField = (key: TextKey<TrackRecordContent>, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(fieldPatch(key, event.target.value));
    };

    const handleItem = (id: string, event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name as TextKey<StatItem>;
        const patch = fieldPatch(field, event.target.value);

        onChange({
            stats: value.stats.map((stat) => {
                return stat.id === id ? {
                    ...stat,
                    ...patch
                } : stat;
            })
        });
    };

    return (
        <Group active={active} name={ContentSection.TrackRecord}>
            <h3>Track record</h3>
            <div className={styles.fields}>
                <TextField id="content-trackRecord-eyebrow" label="Eyebrow" type="text" value={value.eyebrow} onChange={handleField.bind(undefined, 'eyebrow')} />
            </div>

            <div className={styles.items}>
                {value.stats.map((stat) => {
                    return (
                        <div className={styles.item} key={stat.id}>
                            <div className={styles.fields}>
                                <TextField id={`content-stat-${stat.id}-value`} label="Value" type="text" name="value" value={stat.value} onChange={handleItem.bind(undefined, stat.id)} />
                                <TextField id={`content-stat-${stat.id}-unit`} label="Unit" type="text" name="unit" optional value={stat.unit ?? ''} onChange={handleItem.bind(undefined, stat.id)} />
                                <TextField id={`content-stat-${stat.id}-label`} label="Label" type="text" name="label" full value={stat.label} onChange={handleItem.bind(undefined, stat.id)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Group>
    );
};

export default TrackRecordSection;
