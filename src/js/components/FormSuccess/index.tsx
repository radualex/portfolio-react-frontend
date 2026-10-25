import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'div'> {
    label: string;
    action: React.ReactNode;
    children: React.ReactNode;
}

const FormSuccess: React.FunctionComponent<Props> = ({ label, action, className, children, ...props }) => {
    const classes = classNames(styles.root, className);

    return (
        <div className={classes} role="status" tabIndex={-1} {...props}>
            <p className={styles.successLabel}>{label}</p>
            <p className={styles.successBody}>{children}</p>
            {action}
        </div>
    );
};

export default FormSuccess;
