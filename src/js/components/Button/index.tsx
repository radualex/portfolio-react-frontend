import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import type { AsAnchor, AsButton, AsLink } from "./types";

import styles from "./styles.module.scss";

export type Props = AsLink | AsAnchor | AsButton;

// Three elements, one look: an in-app destination stays a router Link, an external or mailto target stays a plain anchor, an action a real button — semantics the keyboard and screen reader depend on.
const Button: React.FunctionComponent<Props> = ({ variant = "secondary", size = "md", arrow, block, className, children, ...rest }) => {
  const classes = classNames(
    styles.root,
    className,
    {
      [styles.sm]: size === "sm",
      [styles.arrow]: arrow,
      [styles.block]: block,
    },
    styles[variant],
  );

  if ("to" in rest) {
    const { to, ...anchorProps } = rest;

    return (
      <Link className={classes} to={to} {...anchorProps}>
        {children}
      </Link>
    );
  }

  if ("href" in rest) {
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
