import React from "react";
import classNames from "classnames";
import { useStore } from "@/store/StoreContext";
import type { Availability } from "@/store/types";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"span"> {
  size?: "md" | "sm";
  navOnly?: boolean;
  // The admin preview passes an unsaved draft; everything else reads the store.
  availability?: Availability;
}

const StatusPill: React.FunctionComponent<Props> = ({ size = "md", navOnly, availability, className, ...props }) => {
  const classes = classNames(
    styles.root,
    className,
    {
      [styles.sm]: size === "sm",
      [styles.navOnly]: navOnly,
    },
  );
  const { state } = useStore();
  const current = availability ?? state.availability;

  return (
    <span className={classes} data-state={current.state} {...props}>
      <span className={styles.dot} aria-hidden="true" />
      <span>
        {current.state === "available" ? "Available for work" : "Not available"}
      </span>
    </span>
  );
};

export default StatusPill;
