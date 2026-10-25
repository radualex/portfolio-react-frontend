import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'div'> {
    note?: React.ReactNode;
    children: React.ReactNode;
}

const FormActions: React.FunctionComponent<Props> = ({ note, className, children, ...props }) => {
    const classes = classNames(styles.root, className);

    return (
        <div className={classes} {...props}>
            {children}
            {note ? <p className={styles.actionsNote}>{note}</p> : undefined}
        </div>
    );
};

export default FormActions;
