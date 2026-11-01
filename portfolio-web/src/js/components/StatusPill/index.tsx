import React from 'react';
import classNames from 'classnames';

// Constants
import { AvailabilityState } from '@/store/constants';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.css';

// Types
import type { Availability } from '@/store/types';

export interface Props extends React.ComponentProps<'span'> {
    size?: 'md' | 'sm';
    navOnly?: boolean;
    availability?: Availability;
}

const StatusPill: React.FunctionComponent<Props> = ({ size = 'md', navOnly, availability, className, ...props }) => {
    const classes = classNames(styles.root, className, {
        [styles.sm]: size === 'sm',
        [styles.navOnly]: navOnly
    });
    const { state } = useStore();
    const current = availability ?? state.availability;

    return (
        <span className={classes} data-state={current.state} {...props}>
            <span className={styles.dot} aria-hidden="true" />
            <span>
                {current.state === AvailabilityState.Available ? 'Available for work' : 'Not available'}
            </span>
        </span>
    );
};

export default StatusPill;
