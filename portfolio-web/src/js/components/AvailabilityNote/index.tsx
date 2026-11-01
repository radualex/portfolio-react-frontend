import React from 'react';
import classNames from 'classnames';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.css';

// Types
import type { Availability } from '@/store/types';

export interface Props extends React.ComponentProps<'p'> {
    availability?: Availability;
}

const AvailabilityNote: React.FunctionComponent<Props> = ({ availability, className, ...props }) => {
    const classes = classNames(styles.root, className);
    const { state } = useStore();
    const current = availability ?? state.availability;

    if (!current.note) {
        return;
    }

    return (
        <p className={classes} {...props}>
            {current.note}
        </p>
    );
};

export default AvailabilityNote;
