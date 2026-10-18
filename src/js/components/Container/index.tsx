import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

const Container: React.FunctionComponent<Props> = ({ className, children, ...props }) => {
  const classes = classNames(styles.root, className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;
