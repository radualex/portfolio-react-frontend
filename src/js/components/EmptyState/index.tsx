import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'div'> {
    title: string;
    description: string;
}

const EmptyState: React.FunctionComponent<Props> = ({ title, description, className, ...props }) => {
    const classes = classNames(styles.root, className);

    return (
        <div className={classes} {...props}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default EmptyState;
