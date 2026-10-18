import { CV_PATH, EMAIL_ADDRESS, GITHUB, TWITTER } from "@/store/defaults";
import type { Channel } from "./types";

export const EXTERNAL = {
  target: "_blank",
  rel: "noopener",
} as const;

export const CHANNELS: Array<Channel> = [
  {
    term: "Email",
    detail: <a href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</a>,
  },
  {
    term: "GitHub",
    detail: (
      <a href={GITHUB} {...EXTERNAL}>
        github.com/radualex
      </a>
    ),
  },
  {
    term: "Twitter",
    detail: (
      <a href={TWITTER} {...EXTERNAL}>
        @iamradualex
      </a>
    ),
  },
  {
    term: "CV",
    detail: (
      <a href={CV_PATH} {...EXTERNAL}>
        Two pages, PDF
      </a>
    ),
  },
  { term: "Based in", detail: "Amsterdam, NL · CET (UTC+1)" },
  { term: "Languages", detail: "English (proficient) · Romanian (native)" },
];

/* Tells the visitor what makes a brief answerable, cheaper than three rounds of clarifying email. */
export const WORTH_INCLUDING = [
  "The repo or stack you're on today",
  "Who else is on the team",
  'What "done" looks like',
  "Whether it's remote, hybrid or on-site",
];
