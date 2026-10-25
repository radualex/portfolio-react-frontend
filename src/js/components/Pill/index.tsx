import React from 'react';
import classNames from 'classnames';
import { X } from 'lucide-react';

// Styles
import styles from './styles.module.css';

export interface Props extends Omit<React.ComponentProps<'span'>, 'ref'> {
    as?: 'span' | 'li';
    onRemove?: () => void;
}

const Pill: React.FunctionComponent<Props> = ({ as: Element = 'span', onRemove, 'aria-label': ariaLabel = 'Remove item', className, children, ...props }) => {
    const classes = classNames(styles.root, {
        [styles.removable]: Boolean(onRemove)
    }, className);

    return (
        <Element className={classes} {...props}>
            {children}
            {onRemove && (
                <button className={styles.remove} type="button" aria-label={ariaLabel} onClick={onRemove}>
                    <X size="0.75rem" aria-hidden />
                </button>
            )}
        </Element>
    );
};

export default Pill;
