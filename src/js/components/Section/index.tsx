import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'section'> {
    hero?: boolean;
    children: React.ReactNode;
}

const Section: React.FunctionComponent<Props> = ({ hero = false, className, children, ...props }) => {
    const classes = classNames(styles.root, className, {
        [styles.hero]: hero
    });

    return (
        <section className={classes} {...props}>
            {children}
        </section>
    );
};

export default Section;
