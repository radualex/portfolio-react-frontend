import type { StateOption } from "./types";

export const STATES = [
  {
    value: "available",
    label: "Available",
  },
  {
    value: "unavailable",
    label: "Not available",
  },
] as const satisfies ReadonlyArray<StateOption>;

export const LIMIT = 160;
