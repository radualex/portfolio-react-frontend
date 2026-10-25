import React from 'react';
import classNames from 'classnames';

// Constants
import { ButtonGroupVariant } from './constants';

// Styles
import styles from './styles.module.scss';

// Types
import type { GroupOption } from './types';

export interface Props<T extends string> extends Omit<React.ComponentProps<'div'>, 'onChange'> {
    label: string;
    variant?: ButtonGroupVariant;
    value: T;
    options: readonly GroupOption<T>[];
    onChange: (next: T) => void;
}

const ButtonGroup = <T extends string,>({ label, variant = ButtonGroupVariant.Segmented, value, options, onChange, className, ...props }: Props<T>) => {
    const classes = classNames(styles.root, styles[variant], className);

    const handleClick = (next: T) => {
        onChange(next);
    };

    return (
        <div className={classes} role="group" aria-label={label} {...props}>
            {options.map((option) => {
                return (
                    <button key={option.value} type="button" aria-pressed={option.value === value} onClick={handleClick.bind(undefined, option.value)}>
                        {option.label}
                        {option.count !== undefined && (
                            <span className={styles.count}>{option.count}</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ButtonGroup;
