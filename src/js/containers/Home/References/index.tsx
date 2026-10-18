import React from "react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Lead from "@/components/Lead";
import Section from "@/components/Section";
import SectionHead from "@/components/SectionHead";

import { REFERENCE_SLOTS } from "./constants";
import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"section"> {}

const References: React.FunctionComponent<Props> = (props) => {
  return (
    <Section id="references" {...props}>
      <Container>
        <SectionHead className={styles.referencesHead}>
          <Eyebrow quiet>References</Eyebrow>
          <h2>Three client quotes, currently being collected.</h2>
          <Lead>
            These slots stay visibly empty until the real words arrive. Nothing on
            this page is invented — if you want to speak to someone I've worked
            with, ask and I'll make the introduction.
          </Lead>
        </SectionHead>

        <div className={styles.grid3}>
          {REFERENCE_SLOTS.map((slot) => (
            <figure className={styles.quoteCard} key={slot}>
              <span className={styles.quotePending}>Awaiting quote</span>
              <blockquote>
                Reserved for a reference from a recent engagement.
              </blockquote>
              <figcaption className={styles.quoteAuthor}>
                — Slot {slot} of {REFERENCE_SLOTS.length}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default References;
