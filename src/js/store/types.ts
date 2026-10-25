// Constants
import type { AvailabilityState, MessageType, SectionKey } from './constants';

export interface Availability {
    state: AvailabilityState;
    note: string;
}

export interface Project {
    id: string;
    title: string;
    kind: string;
    description: string;
    stack: string;
    link: string;
    linkLabel: string;
    hidden: boolean;
}

export interface ProjectDraft extends Omit<Project, 'id' | 'hidden'> {
    id?: string;
}

export interface ProjectUpdate extends Partial<Project> {
    id: string;
}

export interface Message {
    id: string;
    at: string;
    read: boolean;
    archived: boolean;
    type: MessageType;
    name: string;
    email: string;
    subject: string;
    body: string;
    detail: string;
}

export type MessageDraft = Omit<Message, 'id' | 'at' | 'read' | 'archived'>;

export interface CapabilityItem {
    id: string;
    title: string;
    body: string;
    path: string;
}

export interface StatItem {
    id: string;
    value: string;
    unit?: string;
    label: string;
}

export interface RoleItem {
    id: string;
    period: string;
    title: string;
    org: string;
    what: string;
    stack: string[];
}

export interface ReferenceItem {
    id: string;
    quote: string;
    author: string;
}

export interface ChannelItem {
    term: string;
    detail: string;
    href?: string;
}

export interface HeroContent {
    eyebrow: string;
    heading: string;
    lead: string;
    location: string;
    primaryCta: string;
    cvCta: string;
}

export interface CapabilitiesContent {
    eyebrow: string;
    heading: string;
    items: CapabilityItem[];
    stackLabel: string;
    stack: string[];
}

export interface TrackRecordContent {
    eyebrow: string;
    stats: StatItem[];
}

export interface ExperienceContent {
    eyebrow: string;
    heading: string;
    cvLabel: string;
    educationLabel: string;
    education: string;
    roles: RoleItem[];
}

export interface ProjectsContent {
    eyebrow: string;
    heading: string;
    lead: string;
    empty: string;
}

export interface ReferencesContent {
    eyebrow: string;
    heading: string;
    lead: string;
    pendingLabel: string;
    placeholderQuote: string;
    items: ReferenceItem[];
}

export interface ClosingCtaContent {
    heading: string;
    lead: string;
    ctaLabel: string;
}

export interface ContactContent {
    eyebrow: string;
    heading: string;
    lead: string;
    enquiryHeading: string;
    feedbackEyebrow: string;
    feedbackHeading: string;
    feedbackBody: string;
    channelsHeading: string;
    channels: ChannelItem[];
    noteLabel: string;
    note: string[];
}

export interface FooterContent {
    copyright: string;
}

export interface SiteContent {
    hero: HeroContent;
    capabilities: CapabilitiesContent;
    trackRecord: TrackRecordContent;
    experience: ExperienceContent;
    projects: ProjectsContent;
    references: ReferencesContent;
    closingCta: ClosingCtaContent;
    contact: ContactContent;
    footer: FooterContent;
}

export type SectionVisibility = Record<SectionKey, boolean>;

export interface PortfolioState {
    availability: Availability;
    projects: Project[];
    inbox: Message[];
    content: SiteContent;
    sections: SectionVisibility;
}
