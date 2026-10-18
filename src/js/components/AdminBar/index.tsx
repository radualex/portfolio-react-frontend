import React from "react";
import classNames from "classnames";
import Button from "@/components/Button";
import StatusPill from "@/components/StatusPill";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"header"> {}

const AdminBar: React.FunctionComponent<Props> = ({ className, ...props }) => {
  const classes = classNames(styles.root, className);

  return (
    <header className={classes} {...props}>
      <div className={styles.inner}>
        <span className={styles.logo}>
          Radu Stoica <span>Admin</span>
        </span>
        <StatusPill size="sm" navOnly />
        <span className={styles.spacer} />
        <Button variant="ghost" size="sm" arrow to="/">
          View site
        </Button>
      </div>
    </header>
  );
};

export default AdminBar;
