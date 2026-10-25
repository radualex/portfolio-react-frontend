import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'select'> {
    id: string;
    label: string;
    optional?: boolean;
    hint?: React.ReactNode;
    error?: string;
    full?: boolean;
    options: readonly string[];
}

const SelectField: React.FunctionComponent<Props> = ({ id, label, optional, hint, error, full, options, className, ...props }) => {
    const classes = classNames(styles.root, className, {
        [styles.full]: full
    });
    const controlClasses = classNames(styles.control, styles.select);

    return (
        <div className={classes} data-invalid={error ? 'true' : 'false'}>
            <label htmlFor={id}>
                {label}
                {optional && <span className={styles.optional}>optional</span>}
            </label>
            <select className={controlClasses} id={id} aria-invalid={error ? 'true' : 'false'} {...props}>
                {options.map((option) => {
                    return (
                        <option key={option}>{option}</option>
                    );
                })}
            </select>
            {hint ? <p className={styles.hint}>{hint}</p> : undefined}
            <p className={styles.error} aria-live="polite">
                {error ?? ''}
            </p>
        </div>
    );
};

export default SelectField;
