// Constants
import { AvailabilityState } from '@/store/constants';

// Store
import type { PortfolioState, SiteContent } from '@/store/types';

export const GITHUB = 'https://github.com/radualex';
export const EMAIL_ADDRESS = 'radu.stoica1994@gmail.com';

/* Served from public/, so the path is absolute from the site root. */
export const CV_PATH = '/radu-stoica-resume.pdf';

export const DEFAULT_SKILLS = [
    'React',
    'TypeScript',
    'Redux',
    'Sass',
    'Lit-html',
    'Angular 2+',
    'Node · Nest · Express',
    'Java · Spring Boot',
    '.NET Core',
    'Jest · Selenium',
    'Docker · Kubernetes',
    'Azure',
    'PostgreSQL · MongoDB'
];

export const SKILL_SUGGESTIONS = [
    ...DEFAULT_SKILLS,
    'Vue',
    'Svelte',
    'GraphQL',
    'Next.js'
];

// TODO: This needs to go after DB.
const DEFAULT_CONTENT: SiteContent = {
    hero: {
        eyebrow: 'Freelance software engineer · Delft',
        heading: 'Ten years of frontend work in places where bugs are expensive.',
        lead: 'React and TypeScript, mostly. I\'ve shipped production interfaces for lithography machines, medical instruments, SWIFT payments and ocean-going vessels — and usually ended up in the backend too.',
        location: 'Delft, NL · CET (UTC+1)',
        primaryCta: 'Start a project',
        cvCta: 'Read the CV'
    },
    capabilities: {
        eyebrow: 'How I work',
        heading: 'Three things you\'ll notice in the first sprint.',
        items: [{
            id: 'architecture',
            title: 'Architecture that survives an audit',
            body: 'Vessel monitoring at Wärtsilä, SWIFT cash management at ING, medical data at Cytosmart. In regulated domains a front end has to be defensible under review, not just pleasant to look at.',
            path: 'M4 20V8l8-4 8 4v12M9 20v-6h6v6'
        }, {
            id: 'fullstack',
            title: 'I don\'t stop at the API boundary',
            body: 'Spring Boot at ING and Wärtsilä, .NET Core at Yellowtail and Cytosmart, Node and Nest on my own projects. When the backend is what\'s blocking the feature, I go and fix the backend.',
            path: 'M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01'
        }, {
            id: 'collaboration',
            title: 'A collaborator, not a ticket-taker',
            body: 'Ten years of sitting with designers and product owners before the handoff rather than after it. I\'ll flag a flow that will be expensive to build while it\'s still cheap to change.',
            path: 'M8 10h8M8 14h5M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 3V6a2 2 0 0 1 2-2Z'
        }],
        stackLabel: 'Working stack',
        stack: DEFAULT_SKILLS
    },
    trackRecord: {
        eyebrow: 'Track record',
        stats: [{
            id: 'years',
            value: '10',
            unit: 'yrs',
            label: 'of production frontend work, starting at ASML in 2016.'
        }, {
            id: 'teams',
            value: '5',
            label:
          'engineering teams — ASML, Cytosmart, Yellowtail, ING and Wärtsilä.'
        }, {
            id: 'domains',
            value: '4',
            label: 'regulated domains: semiconductor, medtech, banking and marine.'
        }]
    },
    experience: {
        eyebrow: 'Where the work happened',
        heading: 'Five teams, one consistent brief: make the hard thing usable.',
        cvLabel: 'Full CV',
        educationLabel: 'Education',
        education:
      'MSc Computer Science, Technical University of Eindhoven (TU/e) · BSc ICT & Software Engineering, Fontys University of Applied Sciences · English (proficient), Romanian (native)',
        roles: [{
            id: 'wartsila',
            period: 'Apr 2021 — present',
            title: 'Software engineer',
            org: 'Wärtsilä · \'s-Hertogenbosch, NL',
            what: 'Frontend solutions for the marine industry that let operators maintain and monitor vessels at sea. Took architectural decisions inside the team and across the company\'s frontend guild, and worked daily alongside backend engineers and data scientists.',
            stack: [
                'React · TypeScript',
                'Redux · Sass · Jest',
                'Java · Spring Boot',
                'Docker · Kubernetes'
            ]
        }, {
            id: 'ing',
            period: 'Sep 2019 — Mar 2021',
            title: 'Software engineer',
            org: 'ING Bank NV · Amsterdam, NL',
            what: 'Cash management for SWIFT payments, which cut a substantial amount of manual handling out of the stakeholders\' day. Built the Spring Boot API behind it, contributed to the shared component library, and moved the delivery pipeline off Jenkins onto Azure.',
            stack: [
                'React · Lit-html',
                'Web components',
                'Spring Boot · Kafka',
                'Azure · Ansible'
            ]
        }, {
            id: 'yellowtail',
            period: 'Jul 2018 — Jun 2019',
            title: 'Software engineer',
            org: 'Yellowtail B.V. · Amsterdam, NL',
            what: 'The front end of a chatbot product, designed jointly with UX and the rest of the frontend team. Wrote the .NET Web API that wrapped IBM Watson\'s conversational engine and migrated the existing Node service to C#.',
            stack: [
                'React · TypeScript',
                '.NET Core · Node.js',
                'IBM Watson',
                'Azure · Jest'
            ]
        }, {
            id: 'cytosmart',
            period: 'Aug 2017 — Jun 2018',
            title: 'Software engineer',
            org: 'Cytosmart B.V. · Eindhoven, NL',
            what: '.NET Core services handling large volumes of medical data, with Azure Functions on the ingestion side. Contributed the React dashboard researchers used to read that data, and mentored the team\'s interns through their projects.',
            stack: [
                '.NET Core · Web API',
                'React.js · NUnit',
                'Azure Functions',
                'MongoDB'
            ]
        }, {
            id: 'asml',
            period: '2016 — 2017',
            title: 'Software engineer',
            org: 'ASML B.V. · Eindhoven, NL',
            what: 'An image visualisation and processing tool for analysing lithography output, plus a simulation tool for driving the main lithography machine. Desktop work, close to the hardware, where a wrong pixel is a real-world defect.',
            stack: ['C# · WPF · MVVM', 'OpenGL', 'Git']
        }]
    },
    projects: {
        eyebrow: 'Built outside office hours',
        heading: 'Side projects, shipped and public.',
        lead: 'Where I try the patterns before they turn up in client work. One of them ended up on npm.',
        empty: 'No projects are published right now.'
    },
    references: {
        eyebrow: 'References',
        heading: 'Three client quotes, currently being collected.',
        lead: 'These slots stay visibly empty until the real words arrive. Nothing on this page is invented — if you want to speak to someone I\'ve worked with, ask and I\'ll make the introduction.',
        pendingLabel: 'Awaiting quote',
        placeholderQuote: 'Reserved for a reference from a recent engagement.',
        items: [{
            id: 'reference-1',
            quote: '',
            author: ''
        }, {
            id: 'reference-2',
            quote: '',
            author: ''
        }, {
            id: 'reference-3',
            quote: '',
            author: ''
        }]
    },
    closingCta: {
        heading: 'Got something that has to work on the first try?',
        lead: 'Tell me what you\'re building, what\'s blocking it, and when you need it done.',
        ctaLabel: 'Start a project'
    },
    contact: {
        eyebrow: 'Contact for work',
        heading: 'Tell me what you\'re building.',
        lead: 'The more concrete the brief, the more useful my first reply will be. I read every message myself — there is no agency inbox in between.',
        enquiryHeading: 'Project enquiry',
        feedbackEyebrow: 'Feedback',
        feedbackHeading: 'Not hiring, but have a note?',
        feedbackBody:
      'Something broken, something unclear, an opinion on the work — it all lands in the same place and I read it.',
        channelsHeading: 'Direct',
        channels: [{
            term: 'Email',
            detail: EMAIL_ADDRESS,
            href: `mailto:${EMAIL_ADDRESS}`
        }, {
            term: 'GitHub',
            detail: 'github.com/radualex',
            href: GITHUB
        }, {
            term: 'CV',
            detail: 'Two pages, PDF',
            href: CV_PATH
        }, {
            term: 'Based in',
            detail: 'Delft, NL · CET (UTC+1)'
        }, {
            term: 'Languages',
            detail: 'English (proficient) · Romanian (native)'
        }],
        noteLabel: 'Worth including',
        note: [
            'The repo or stack you\'re on today',
            'Who else is on the team',
            'What "done" looks like',
            'Whether it\'s remote, hybrid or on-site'
        ]
    },
    footer: {
        copyright: '© 2026 Radu Alexandru Stoica · Delft, The Netherlands'
    }
};

export const DEFAULT_STATE: PortfolioState = {
    availability: {
        state: AvailabilityState.Available,
        note: 'Taking on contract and freelance work from November 2026.'
    },
    projects: [{
        id: 'p-datepicker',
        title: 'date-picker-vue3',
        kind: 'Published package',
        description:
        'A Vue 3 date picker, published to npm and maintained as a standalone package.',
        stack: 'Vue 3 · TypeScript',
        link: 'https://www.npmjs.com/package/date-picker-vue3',
        linkLabel: 'View on npm',
        hidden: false
    }, {
        id: 'p-webcomponents',
        title: 'Web component library',
        kind: 'Open source',
        description:
        'Over ten reusable web components, each implemented three times — React, Vue and Angular 2+ — to compare framework ergonomics.',
        stack: 'React · Vue · Angular',
        link: GITHUB,
        linkLabel: 'View on GitHub',
        hidden: false
    }, {
        id: 'p-bunq',
        title: 'bunq payments backend',
        kind: 'Open source',
        description:
        'A payment integration API built on top of the bunq banking API, covering account access and transaction flows.',
        stack: 'Node.js · TypeScript',
        link: GITHUB,
        linkLabel: 'View on GitHub',
        hidden: false
    }, {
        id: 'p-shopify',
        title: 'Shopify backend',
        kind: 'Open source',
        description:
        'The server side of an e-commerce application — catalogue, cart and order handling against the Shopify API.',
        stack: 'Node.js · TypeScript',
        link: GITHUB,
        linkLabel: 'View on GitHub',
        hidden: false
    }, {
        id: 'p-mumble',
        title: 'Mumble',
        kind: 'Open source',
        description:
        'Music pattern recognition software — analyses audio input and matches it against known rhythmic patterns.',
        stack: 'Node.js · Express',
        link: GITHUB,
        linkLabel: 'View on GitHub',
        hidden: false
    }, {
        id: 'p-shoe',
        title: 'Shoe application',
        kind: 'Mobile',
        description:
        'A mobile e-commerce app with product browsing and checkout, built cross-platform from one codebase.',
        stack: 'React Native · TypeScript',
        link: GITHUB,
        linkLabel: 'View on GitHub',
        hidden: false
    }, {
        id: 'p-taskmanager',
        title: 'Task manager',
        kind: 'Open source',
        description:
        'A responsive task management app — the testing ground for component patterns that later went into client work.',
        stack: 'React.js',
        link: GITHUB,
        linkLabel: 'View on GitHub',
        hidden: true
    }],
    inbox: [],
    content: DEFAULT_CONTENT,
    sections: {
        hero: true,
        capabilities: true,
        trackRecord: true,
        experience: true,
        projects: true,
        references: true,
        closingCta: true,
        contactHero: true,
        contactEnquiry: true,
        contactFeedback: true,
        footer: true
    }
};
