import React from "react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import SectionHead from "@/components/SectionHead";
import Tag from "@/components/Tag";

import { CAPABILITIES, WORKING_STACK } from "./constants";
import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"section"> {}

const Capabilities: React.FunctionComponent<Props> = (props) => {
  return (
    <Section id="capabilities" {...props}>
      <Container>
        <SectionHead>
          <Eyebrow quiet>How I work</Eyebrow>
          <h2>Three things you'll notice in the first sprint.</h2>
        </SectionHead>

        <div className={styles.grid3}>
          {CAPABILITIES.map((capability) => (
            <div className={styles.feature} key={capability.id}>
              <div className={styles.featureMark} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d={capability.path} />
                </svg>
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.stackStrip}>
          <p className={styles.stackLabel}>Working stack</p>
          <ul className={styles.tagRow}>
            {WORKING_STACK.map((item) => (
              <Tag as="li" key={item}>
                {item}
              </Tag>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
};

export default Capabilities;
