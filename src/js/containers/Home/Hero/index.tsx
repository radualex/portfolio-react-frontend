import React from "react";
import AvailabilityBlock from "@/components/AvailabilityBlock";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Lead from "@/components/Lead";
import Section from "@/components/Section";
import { CV_PATH } from "@/store/defaults";

import portrait from "../../../../assets/radu-stoica.jpg";
import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"section"> {}

const Hero: React.FunctionComponent<Props> = (props) => {
  return (
    <Section hero {...props}>
      <Container className={styles.heroSplit}>
        <div>
          {/* One of only two accent eyebrows on the whole site. */}
          <Eyebrow>Freelance software engineer · Amsterdam</Eyebrow>
          <h1 className={styles.heroHeading}>
            Ten years of frontend work in places where bugs are expensive.
          </h1>
          <Lead>
            React and TypeScript, mostly. I've shipped production interfaces for
            lithography machines, medical instruments, SWIFT payments and
            ocean-going vessels — and usually ended up in the backend too.
          </Lead>

          <AvailabilityBlock />

          <div className={styles.heroCta}>
            <Button variant="primary" to="/contact">
              Start a project
            </Button>
            <Button arrow href={CV_PATH} target="_blank" rel="noopener">
              Read the CV
            </Button>
          </div>
        </div>

        <figure className={styles.portrait}>
          <img src={portrait} width="720" height="720" alt="Radu Alexandru Stoica" />
          <figcaption>Amsterdam, NL · CET (UTC+1)</figcaption>
        </figure>
      </Container>
    </Section>
  );
};

export default Hero;
