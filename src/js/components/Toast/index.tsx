import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ToastContext } from "@/components/Toast/ToastContext";
import { DURATION } from "./constants";

import styles from "./styles.module.scss";

export interface Props {
  children: ReactNode;
}

const ToastProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [message, setMessage] = useState("");
  const [shown, setShown] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const toast = useCallback((next: string) => {
    setMessage(next);
    setShown(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShown(false), DURATION);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Always mounted: a live region must exist before its text arrives. */}
      <div
        className={styles.toast}
        data-show={shown ? "true" : "false"}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
