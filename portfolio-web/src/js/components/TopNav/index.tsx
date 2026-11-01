import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Constants
import { SECTIONS } from './constants';

// Components
import StatusPill from '@/components/StatusPill';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'header'> {}

const TopNav: React.FunctionComponent<Props> = ({ className, ...props }) => {
    const classes = classNames(styles.root, className);
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useStore();
    const visibleSections = SECTIONS.filter((section) => {
        return state.sections[section.key];
    });

    // Tapping a link on mobile should close the panel it was in.
    const handleNavClick = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleToggle = useCallback(() => {
        setIsOpen((current) => {
            return !current;
        });
    }, []);

    return (
        <header className={classes} {...props}>
            <div className={styles.inner}>
                <Link className={styles.logo} to="/">
                    Radu Stoica <span>Software engineer</span>
                </Link>

                <nav className={styles.nav} id="site-nav" aria-label="Primary" data-open={isOpen ? 'true' : 'false'} onClick={handleNavClick}>
                    {visibleSections.map((section) => {
                        return (
                            <Link key={section.to} to={section.to}>
                                {section.label}
                            </Link>
                        );
                    })}
                    {/* NavLink sets aria-current="page" on its own, which is what the active-link rule keys off. */}
                    <NavLink to="/contact">Contact</NavLink>
                </nav>

                <StatusPill size="sm" navOnly />

                <button className={styles.toggle} type="button" aria-expanded={isOpen} aria-controls="site-nav" onClick={handleToggle}>
                    <span className={styles.srOnly}>Toggle navigation</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default TopNav;
