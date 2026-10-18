import type { Key } from "./types";

export const KINDS = [
  "New product, greenfield",
  "Existing codebase — rescue or refactor",
  "Frontend architecture review",
  "Joining an existing team",
  "Something else",
] as const;

export const BUDGETS = [
  "Not sure yet",
  "Under €10k",
  "€10k — €25k",
  "€25k — €50k",
  "€50k and up",
  "Day rate, ongoing",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within a month",
  "Next quarter",
  "Just exploring for now",
] as const;

export const BLANK: Record<Key, string> = {
  name: "",
  email: "",
  company: "",
  kind: KINDS[0],
  budget: BUDGETS[0],
  timeline: TIMELINES[0],
  message: "",
};
