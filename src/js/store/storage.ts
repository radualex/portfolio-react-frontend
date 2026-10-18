/* Every storage call is wrapped: sandboxed preview iframes throw on access rather than returning null. */

import { DEFAULT_STATE } from "@/store/defaults";
import type { PortfolioState } from "@/store/types";

export const STORAGE_KEY = "rs-portfolio-v1";

const clone = <T>(value: T): T => structuredClone(value);

export const seededState = (): PortfolioState => clone(DEFAULT_STATE);

export const readState = (): PortfolioState => {
  let raw: string | null = null;

  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }

  if (!raw) {
    return seededState();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PortfolioState>;

    return {
      availability: parsed.availability ?? clone(DEFAULT_STATE.availability),
      projects: Array.isArray(parsed.projects)
        ? parsed.projects
        : clone(DEFAULT_STATE.projects),
      inbox: Array.isArray(parsed.inbox) ? parsed.inbox : [],
    };
  } catch {
    /* Corrupt payload: fall back to the seed rather than crashing. */
    return seededState();
  }
};

export const writeState = (state: PortfolioState) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Memory only for this session. */
  }
};

export const uid = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const formatDate = (iso: string) => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} · ${time}`;
};
