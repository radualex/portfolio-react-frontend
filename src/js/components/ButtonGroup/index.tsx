import React, { useCallback } from "react";
import classNames from "classnames";
import type { GroupOption } from "./types";

import styles from "./styles.module.scss";

export interface Props<T extends string>
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  label: string;
  variant?: "segmented" | "tabs";
  value: T;
  options: ReadonlyArray<GroupOption<T>>;
  onChange: (next: T) => void;
}

const ButtonGroup = <T extends string>({ label, variant = "segmented", value, options, onChange, className, ...props }: Props<T>) => {
  const classes = classNames(styles.root, className, styles[variant]);

  const handleSelect = useCallback(
    (next: T) => () => {
      onChange(next);
    },
    [onChange],
  );

  // aria-pressed on real buttons rather than a radio group: these act on the view immediately, so "pressed" describes them better than "checked".
  return (
    <div className={classes} role="group" aria-label={label} {...props}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={handleSelect(option.value)}
        >
          {option.label}
          {option.count !== undefined && (
            <span className={styles.count}>{option.count}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
