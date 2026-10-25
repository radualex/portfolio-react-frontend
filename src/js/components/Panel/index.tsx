import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'section'> {
    title: string;
    note?: React.ReactNode;
    action?: React.ReactNode;
    children: React.ReactNode;
}

const Panel: React.FunctionComponent<Props> = ({ title, note, action, className, children, ...props }) => {
    const classes = classNames(styles.root, className);

    return (
        <section className={classes} {...props}>
            <div className={styles.head}>
                <div>
                    <h2>{title}</h2>
                    {note ? <p className={styles.note}>{note}</p> : undefined}
                </div>
                {action}
            </div>
            <div className={styles.body}>{children}</div>
        </section>
    );
};

export default Panel;
