import type { PortfolioState } from "@/store/types";

export const GITHUB = "https://github.com/radualex";
export const TWITTER = "https://twitter.com/iamradualex";
export const EMAIL_ADDRESS = "radu.stoica1994@gmail.com";

/* Served from public/, so the path is absolute from the site root. */
export const CV_PATH = "/radu-stoica-resume.pdf";

export const DEFAULT_STATE: PortfolioState = {
  availability: {
    state: "available",
    note: "Taking on contract and freelance work from November 2026.",
  },
  projects: [
    {
      id: "p-datepicker",
      title: "date-picker-vue3",
      kind: "Published package",
      description:
        "A Vue 3 date picker, published to npm and maintained as a standalone package.",
      stack: "Vue 3 · TypeScript",
      link: "https://www.npmjs.com/package/date-picker-vue3",
      linkLabel: "View on npm",
      hidden: false,
    },
    {
      id: "p-webcomponents",
      title: "Web component library",
      kind: "Open source",
      description:
        "Over ten reusable web components, each implemented three times — React, Vue and Angular 2+ — to compare framework ergonomics.",
      stack: "React · Vue · Angular",
      link: GITHUB,
      linkLabel: "View on GitHub",
      hidden: false,
    },
    {
      id: "p-bunq",
      title: "bunq payments backend",
      kind: "Open source",
      description:
        "A payment integration API built on top of the bunq banking API, covering account access and transaction flows.",
      stack: "Node.js · TypeScript",
      link: GITHUB,
      linkLabel: "View on GitHub",
      hidden: false,
    },
    {
      id: "p-shopify",
      title: "Shopify backend",
      kind: "Open source",
      description:
        "The server side of an e-commerce application — catalogue, cart and order handling against the Shopify API.",
      stack: "Node.js · TypeScript",
      link: GITHUB,
      linkLabel: "View on GitHub",
      hidden: false,
    },
    {
      id: "p-mumble",
      title: "Mumble",
      kind: "Open source",
      description:
        "Music pattern recognition software — analyses audio input and matches it against known rhythmic patterns.",
      stack: "Node.js · Express",
      link: GITHUB,
      linkLabel: "View on GitHub",
      hidden: false,
    },
    {
      id: "p-shoe",
      title: "Shoe application",
      kind: "Mobile",
      description:
        "A mobile e-commerce app with product browsing and checkout, built cross-platform from one codebase.",
      stack: "React Native · TypeScript",
      link: GITHUB,
      linkLabel: "View on GitHub",
      hidden: false,
    },
    {
      id: "p-taskmanager",
      title: "Task manager",
      kind: "Open source",
      description:
        "A responsive task management app — the testing ground for component patterns that later went into client work.",
      stack: "React.js",
      link: GITHUB,
      linkLabel: "View on GitHub",
      hidden: true,
    },
  ],
  inbox: [],
};
