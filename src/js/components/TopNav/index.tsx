import React, { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import StatusPill from "@/components/StatusPill";
import { SECTIONS } from "./constants";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"header"> {}

const TopNav: React.FunctionComponent<Props> = ({ className, ...props }) => {
  const classes = classNames(styles.root, className);
  const [open, setOpen] = useState(false);

  // Tapping a link on mobile should close the panel it was in.
  const handleNavClick = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  return (
    <header className={classes} {...props}>
      <div className={styles.inner}>
        <Link className={styles.logo} to="/">
          Radu Stoica <span>Software engineer</span>
        </Link>

        <nav
          className={styles.nav}
          id="site-nav"
          aria-label="Primary"
          data-open={open ? "true" : "false"}
          onClick={handleNavClick}
        >
          {SECTIONS.map((section) => (
            <Link key={section.to} to={section.to}>
              {section.label}
            </Link>
          ))}
          {/* NavLink sets aria-current="page" on its own, which is what the active-link rule keys off. */}
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <StatusPill size="sm" navOnly />

        <button
          className={styles.toggle}
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={handleToggle}
        >
          <span className={styles.srOnly}>Toggle navigation</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TopNav;
