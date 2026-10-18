import type { Role } from "./types";

export const ROLES: Role[] = [
  {
    id: "wartsila",
    period: "Apr 2021 — present",
    title: "Software engineer",
    org: "Wärtsilä · 's-Hertogenbosch, NL",
    what: "Frontend solutions for the marine industry that let operators maintain and monitor vessels at sea. Took architectural decisions inside the team and across the company's frontend guild, and worked daily alongside backend engineers and data scientists.",
    stack: [
      "React · TypeScript",
      "Redux · Sass · Jest",
      "Java · Spring Boot",
      "Docker · Kubernetes",
    ],
  },
  {
    id: "ing",
    period: "Sep 2019 — Mar 2021",
    title: "Software engineer",
    org: "ING Bank NV · Amsterdam, NL",
    what: "Cash management for SWIFT payments, which cut a substantial amount of manual handling out of the stakeholders' day. Built the Spring Boot API behind it, contributed to the shared component library, and moved the delivery pipeline off Jenkins onto Azure.",
    stack: [
      "React · Lit-html",
      "Web components",
      "Spring Boot · Kafka",
      "Azure · Ansible",
    ],
  },
  {
    id: "yellowtail",
    period: "Jul 2018 — Jun 2019",
    title: "Software engineer",
    org: "Yellowtail B.V. · Amsterdam, NL",
    what: "The front end of a chatbot product, designed jointly with UX and the rest of the frontend team. Wrote the .NET Web API that wrapped IBM Watson's conversational engine and migrated the existing Node service to C#.",
    stack: [
      "React · TypeScript",
      ".NET Core · Node.js",
      "IBM Watson",
      "Azure · Jest",
    ],
  },
  {
    id: "cytosmart",
    period: "Aug 2017 — Jun 2018",
    title: "Software engineer",
    org: "Cytosmart B.V. · Eindhoven, NL",
    what: ".NET Core services handling large volumes of medical data, with Azure Functions on the ingestion side. Contributed the React dashboard researchers used to read that data, and mentored the team's interns through their projects.",
    stack: [
      ".NET Core · Web API",
      "React.js · NUnit",
      "Azure Functions",
      "MongoDB",
    ],
  },
  {
    id: "asml",
    period: "2016 — 2017",
    title: "Software engineer",
    org: "ASML B.V. · Eindhoven, NL",
    what: "An image visualisation and processing tool for analysing lithography output, plus a simulation tool for driving the main lithography machine. Desktop work, close to the hardware, where a wrong pixel is a real-world defect.",
    stack: ["C# · WPF · MVVM", "OpenGL", "Git"],
  },
];
