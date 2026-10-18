import React from "react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";

import { STATS } from "./constants";
import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"section"> {}

const TrackRecord: React.FunctionComponent<Props> = (props) => {
  return (
    <Section {...props}>
      <Container>
        <Eyebrow quiet className={styles.trackEyebrow}>
          Track record
        </Eyebrow>
        <div className={styles.grid3}>
          {STATS.map((stat) => (
            <div key={stat.id}>
              <div className={styles.statNum}>
                {stat.value}
                {stat.unit && <span className={styles.statUnit}>{stat.unit}</span>}
              </div>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default TrackRecord;
