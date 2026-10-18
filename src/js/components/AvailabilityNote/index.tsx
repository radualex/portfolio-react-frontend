import React from "react";
import classNames from "classnames";
import { useStore } from "@/store/StoreContext";
import type { Availability } from "@/store/types";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"p"> {
  availability?: Availability;
}

const AvailabilityNote: React.FunctionComponent<Props> = ({ availability, className, ...props }) => {
  const classes = classNames(styles.root, className);
  const { state } = useStore();
  const current = availability ?? state.availability;

  if (!current.note) {
    return null;
  }

  return (
    <p className={classes} {...props}>
      {current.note}
    </p>
  );
};

export default AvailabilityNote;
