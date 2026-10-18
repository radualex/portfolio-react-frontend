import React from "react";
import classNames from "classnames";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Lead from "@/components/Lead";
import Section from "@/components/Section";
import { useStore } from "@/store/StoreContext";

import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"section"> {}

const ClosingCta: React.FunctionComponent<Props> = ({ className, ...props }) => {
  const classes = classNames(styles.root, className);
  const { state } = useStore();

  return (
    <Section className={classes} {...props}>
      <Container className={styles.ctaInner}>
        <h2>Got something that has to work on the first try?</h2>
        <Lead className={styles.ctaLead}>
          Tell me what you're building, what's blocking it, and when you need it
          done.
        </Lead>
        <p className={styles.ctaNote}>{state.availability.note}</p>
        <Button variant="primary" to="/contact">
          Start a project
        </Button>
      </Container>
    </Section>
  );
};

export default ClosingCta;
