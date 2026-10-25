import React from 'react';
import classNames from 'classnames';

// Components
import StatusPill from '@/components/StatusPill';
import AvailabilityNote from '@/components/AvailabilityNote';

// Styles
import styles from './styles.module.scss';

// Types
import type { Availability } from '@/store/types';

export interface Props extends React.ComponentProps<'div'> {
    availability?: Availability;
}

const AvailabilityBlock: React.FunctionComponent<Props> = ({ availability, className, ...props }) => {
    const classes = classNames(styles.root, className);

    return (
        <div className={classes} {...props}>
            <StatusPill availability={availability} />
            <AvailabilityNote availability={availability} />
        </div>
    );
};

export default AvailabilityBlock;
