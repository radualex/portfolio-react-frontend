import React, { Fragment } from "react";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import SectionHead from "@/components/SectionHead";
import { CV_PATH } from "@/store/defaults";

import { ROLES } from "./constants";
import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"section"> {}

const Experience: React.FunctionComponent<Props> = (props) => {
  return (
    <Section id="experience" {...props}>
      <Container>
        <div className={styles.experienceHead}>
          <SectionHead className={styles.experienceHeadText}>
            <Eyebrow quiet>Where the work happened</Eyebrow>
            <h2>Five teams, one consistent brief: make the hard thing usable.</h2>
          </SectionHead>
          <Button
            variant="ghost"
            arrow
            href={CV_PATH}
            target="_blank"
            rel="noopener"
          >
            Full CV
          </Button>
        </div>

        <div>
          {ROLES.map((role) => (
            <article className={styles.logRow} key={role.id}>
              <span className={styles.period}>{role.period}</span>
              <div>
                <h3>{role.title}</h3>
                <p className={styles.org}>{role.org}</p>
                <p className={styles.what}>{role.what}</p>
              </div>
              <span className={styles.pull}>
                {role.stack.map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </span>
            </article>
          ))}
        </div>

        <p className={styles.education}>
          <strong>Education</strong> — MSc Computer Science, Technical University
          of Eindhoven (TU/e) · BSc ICT &amp; Software Engineering, Fontys
          University of Applied Sciences · English (proficient), Romanian (native)
        </p>
      </Container>
    </Section>
  );
};

export default Experience;
