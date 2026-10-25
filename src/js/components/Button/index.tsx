import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// Constants
import { ButtonSize, ButtonVariant } from './constants';

// Styles
import styles from './styles.module.scss';

// Types
import type { AnchorProps, ButtonProps, LinkProps } from './types';

export type Props = LinkProps | AnchorProps | ButtonProps;

// Three elements, one look: an in-app destination stays a router Link, an external or mailto target stays a plain anchor, an action a real button — semantics the keyboard and screen reader depend on.
const Button: React.FunctionComponent<Props> = ({ variant = ButtonVariant.Secondary, size = ButtonSize.Md, arrow, block, className, children, ...props }) => {
    const classes = classNames(styles.root, className, {
        [styles.sm]: size === ButtonSize.Sm,
        [styles.arrow]: arrow,
        [styles.block]: block
    }, styles[variant]);

    if (props.to !== undefined) {
        const { to, ...anchorProps } = props;

        return (
            <Link className={classes} to={to} {...anchorProps}>
                {children}
            </Link>
        );
    }

    if (props.href !== undefined) {
        return (
            <a className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button className={classes} type="button" {...props}>
            {children}
        </button>
    );
};

export default Button;
