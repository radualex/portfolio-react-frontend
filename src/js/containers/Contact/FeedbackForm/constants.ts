import type { Key } from "./types";

export const TOPICS = [
  "The work",
  "This website",
  "Something's broken",
  "Other",
] as const;

export const BLANK: Record<Key, string> = {
  name: "",
  topic: TOPICS[0],
  message: "",
};
