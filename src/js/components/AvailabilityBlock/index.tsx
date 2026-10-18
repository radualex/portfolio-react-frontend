import React from "react";
import classNames from "classnames";
import StatusPill from "@/components/StatusPill";
import AvailabilityNote from "@/components/AvailabilityNote";
import type { Availability } from "@/store/types";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"div"> {
  availability?: Availability;
}

const AvailabilityBlock: React.FunctionComponent<Props> = ({ availability, className, ...props }) => {
  const classes = classNames(styles.root, className);

  return (
    <div className={classes} {...props}>
      <StatusPill availability={availability} />
      <AvailabilityNote availability={availability} />
    </div>
  );
};

export default AvailabilityBlock;
