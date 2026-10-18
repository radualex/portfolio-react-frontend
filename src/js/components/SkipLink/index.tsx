import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"a"> {}

const SkipLink: React.FunctionComponent<Props> = ({ className, ...props }) => {
  const classes = classNames(styles.root, className);

  return (
    <a className={classes} href="#content" {...props}>
      Skip to content
    </a>
  );
};

export default SkipLink;
