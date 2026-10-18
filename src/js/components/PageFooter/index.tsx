import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { CV_PATH, EMAIL_ADDRESS, GITHUB, TWITTER } from "@/store/defaults";
import { EXTERNAL } from "./constants";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"footer"> {
  firstLink?: "email" | "home";
}

// The landing page leads with Email, the contact page with Home.
const PageFooter: React.FunctionComponent<Props> = ({ firstLink = "email", className, ...props }) => {
  const classes = classNames(styles.root, className);

  return (
    <footer className={classes} {...props}>
      <div className={styles.inner}>
        <span>© 2026 Radu Alexandru Stoica · Amsterdam, The Netherlands</span>
        <span className={styles.links}>
          {firstLink === "email" ? (
            <a href={`mailto:${EMAIL_ADDRESS}`}>Email</a>
          ) : (
            <Link to="/">Home</Link>
          )}{" "}
          ·{" "}
          <a href={GITHUB} {...EXTERNAL}>
            GitHub
          </a>{" "}
          ·{" "}
          <a href={TWITTER} {...EXTERNAL}>
            Twitter
          </a>{" "}
          ·{" "}
          <a href={CV_PATH} {...EXTERNAL}>
            CV
          </a>
        </span>
      </div>
    </footer>
  );
};

export default PageFooter;
