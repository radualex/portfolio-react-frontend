import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'p'> {
    children: React.ReactNode;
}

const Lead: React.FunctionComponent<Props> = ({ className, children, ...props }) => {
    const classes = classNames(styles.root, className);

    return (
        <p className={classes} {...props}>
            {children}
        </p>
    );
};

export default Lead;
