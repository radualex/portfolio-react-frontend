import React, { useCallback, useState, type ChangeEvent } from 'react';

// Constants
import { LIMIT, STATES } from './constants';
import { ButtonSize, ButtonVariant } from '@/components/Button/constants';
import { AvailabilityState } from '@/store/constants';

// Components
import AvailabilityNote from '@/components/AvailabilityNote';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import Panel from '@/components/Panel';
import StatusPill from '@/components/StatusPill';
import TextField from '@/components/TextField';
import { useToast } from '@/components/Toast/ToastContext';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.css';

export interface Props extends Omit<React.ComponentProps<typeof Panel>, 'title' | 'note' | 'action' | 'children'> {};

const AvailabilityPanel: React.FunctionComponent<Props> = ({ ...props }) => {
    const { state, setAvailability } = useStore();
    const toast = useToast();

    const [note, setNote] = useState(state.availability.note);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setNote(event.target.value);
    }, []);

    const handlePick = useCallback((next: AvailabilityState) => {
        const picked = STATES.find((option) => {
            return option.value === next;
        })?.value;

        if (picked === undefined) {
            return;
        }

        setAvailability({
            state: picked,
            note
        });
        toast(
            picked === AvailabilityState.Available ? 'Shown as available' : 'Shown as not available'
        );
    }, [note, setAvailability, toast]);

    const handleSave = useCallback(() => {
        setAvailability({
            note
        });
        toast('Note saved');
    }, [note, setAvailability, toast]);

    const availabilityDraft = {
        state: state.availability.state,
        note
    };
    const filterAction = (
        <ButtonGroup label="Availability state" value={state.availability.state} options={STATES} onChange={handlePick} />
    );
    const hint = (
        <React.Fragment>
            <span className={styles.num}>{note.length}</span>/{LIMIT} characters. Leave empty to show the pill on its own.
        </React.Fragment>
    );

    return (
        <Panel {...props} title="Availability" note="Drives the pill on every public page." action={filterAction}>
            <TextField id="availability-note" label="Line shown under the pill" type="text" maxLength={LIMIT} value={note} onChange={handleChange} hint={hint} />

            <div className={styles.previewBox}>
                <p className={styles.previewLabel}>Live preview</p>
                <StatusPill availability={availabilityDraft} />
                <AvailabilityNote availability={availabilityDraft} className={styles.previewNote} />
            </div>

            <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm} onClick={handleSave}>
                Save note
            </Button>
        </Panel>
    );
};

export default AvailabilityPanel;
