import type { Capability } from "./types";

export const CAPABILITIES: Capability[] = [
  {
    id: "architecture",
    title: "Architecture that survives an audit",
    body: "Vessel monitoring at Wärtsilä, SWIFT cash management at ING, medical data at Cytosmart. In regulated domains a front end has to be defensible under review, not just pleasant to look at.",
    path: "M4 20V8l8-4 8 4v12M9 20v-6h6v6",
  },
  {
    id: "fullstack",
    title: "I don't stop at the API boundary",
    body: "Spring Boot at ING and Wärtsilä, .NET Core at Yellowtail and Cytosmart, Node and Nest on my own projects. When the backend is what's blocking the feature, I go and fix the backend.",
    path: "M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01",
  },
  {
    id: "collaboration",
    title: "A collaborator, not a ticket-taker",
    body: "Ten years of sitting with designers and product owners before the handoff rather than after it. I'll flag a flow that will be expensive to build while it's still cheap to change.",
    path: "M8 10h8M8 14h5M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 3V6a2 2 0 0 1 2-2Z",
  },
];

export const WORKING_STACK = [
  "React",
  "TypeScript",
  "Redux",
  "Sass",
  "Lit-html",
  "Angular 2+",
  "Node · Nest · Express",
  "Java · Spring Boot",
  ".NET Core",
  "Jest · Selenium",
  "Docker · Kubernetes",
  "Azure",
  "PostgreSQL · MongoDB",
];
