import classNames from 'classnames';
import React from 'react';

// Constants
import type { ContentSection } from '@/admin/constants';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'div'> {
    active?: ContentSection;
    name: ContentSection;
}

const Group: React.FunctionComponent<Props> = ({ active, name, children, className, ...props }) => {
    if (active && active !== name) {
        return;
    }

    const classes = classNames(styles.root, className);

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

export default Group;
