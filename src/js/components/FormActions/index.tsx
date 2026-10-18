import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"div"> {
  note?: React.ReactNode;
  children: React.ReactNode;
}

const FormActions: React.FunctionComponent<Props> = ({ note, className, children, ...props }) => {
  const classes = classNames(styles.root, className);

  return (
    <div className={classes} {...props}>
      {children}
      {note && <p className={styles.actionsNote}>{note}</p>}
    </div>
  );
};

export default FormActions;
