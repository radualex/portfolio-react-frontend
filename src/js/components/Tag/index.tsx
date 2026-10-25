import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.scss';

export interface Props extends Omit<React.ComponentProps<'span'>, 'ref'> {
    as?: 'span' | 'li';
    children: React.ReactNode;
}

const Tag: React.FunctionComponent<Props> = ({ as = 'span', className, children, ...props }) => {
    const classes = classNames(styles.root, className);
    const Element: React.ElementType = as;

    return (
        <Element className={classes} {...props}>
            {children}
        </Element>
    );
};

export default Tag;
