import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'p'> {
    quiet?: boolean;
    children: React.ReactNode;
}

const Eyebrow: React.FunctionComponent<Props> = ({ quiet = false, className, children, ...props }) => {
    const classes = classNames(styles.root, className, {
        [styles.quiet]: quiet
    });

    return (
        <p className={classes} {...props}>
            {children}
        </p>
    );
};

export default Eyebrow;
