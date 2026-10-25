import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'input'> {
    id: string;
    label: string;
    optional?: boolean;
    hint?: React.ReactNode;
    error?: string;
    full?: boolean;
}

const TextField: React.FunctionComponent<Props> = ({ id, label, optional, hint, error, full, className, ...props }) => {
    const classes = classNames(styles.root, className, {
        [styles.full]: full
    });

    return (
        <div className={classes} data-invalid={error ? 'true' : 'false'}>
            <label htmlFor={id}>
                {label}
                {optional && <span className={styles.optional}>optional</span>}
            </label>
            <input className={styles.control} id={id} aria-invalid={error ? 'true' : 'false'} {...props} />
            {hint ? <p className={styles.hint}>{hint}</p> : undefined}
            <p className={styles.error} aria-live="polite">
                {error ?? ''}
            </p>
        </div>
    );
};

export default TextField;
