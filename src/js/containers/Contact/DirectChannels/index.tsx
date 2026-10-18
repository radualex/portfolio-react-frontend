import React from "react";
import classNames from "classnames";
import { CHANNELS, WORTH_INCLUDING } from "./constants";
import styles from "./styles.module.scss";

export interface Props extends React.ComponentProps<"aside"> {}

const DirectChannels: React.FunctionComponent<Props> = ({ className, ...props }) => {
  const classes = classNames(styles.root, className);

  return (
    <aside className={classes} {...props}>
      <h3 className={styles.channelsHeading}>Direct</h3>
      <dl className={styles.channelList}>
        {CHANNELS.map((channel) => (
          <div className={styles.channel} key={channel.term}>
            <dt>{channel.term}</dt>
            <dd>{channel.detail}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.channelNote}>
        <p className={styles.channelNoteLabel}>Worth including</p>
        <ul>
          {WORTH_INCLUDING.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default DirectChannels;
