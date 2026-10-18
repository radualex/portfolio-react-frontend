import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"textarea"> {
  id: string;
  label: string;
  optional?: boolean;
  hint?: React.ReactNode;
  error?: string;
  full?: boolean;
  short?: boolean;
}

const TextAreaField: React.FunctionComponent<Props> = ({ id, label, optional, hint, error, full, short, className, ...props }) => {
  const classes = classNames(styles.root, className, { [styles.full]: full });
  const controlClasses = classNames(styles.control, styles.textarea, {
    [styles.short]: short,
  });

  return (
    <div className={classes} data-invalid={error ? "true" : "false"}>
      <label htmlFor={id}>
        {label}
        {optional && <span className={styles.optional}>optional</span>}
      </label>
      <textarea
        className={controlClasses}
        id={id}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
      {hint && <p className={styles.hint}>{hint}</p>}
      {/* Always mounted: a live region must exist before its text arrives. */}
      <p className={styles.error} aria-live="polite">
        {error ?? ""}
      </p>
    </div>
  );
};

export default TextAreaField;
