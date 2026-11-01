export enum ContentSection {
    Hero = 'hero',
    Capabilities = 'capabilities',
    TrackRecord = 'trackRecord',
    Experience = 'experience',
    Projects = 'projects',
    References = 'references',
    ClosingCta = 'closingCta',
    Contact = 'contact',
    Footer = 'footer'
}

export enum EditorTarget {
    Hero = 'hero',
    Capabilities = 'capabilities',
    TrackRecord = 'trackRecord',
    Experience = 'experience',
    Projects = 'projects',
    References = 'references',
    ClosingCta = 'closingCta',
    Contact = 'contact',
    Footer = 'footer',
    Sections = 'sections',
    Availability = 'availability',
    Content = 'content',
    Inbox = 'inbox'
}

export const EDITOR_TARGET_BY_SECTION: Record<ContentSection, EditorTarget> = {
    [ContentSection.Hero]: EditorTarget.Hero,
    [ContentSection.Capabilities]: EditorTarget.Capabilities,
    [ContentSection.TrackRecord]: EditorTarget.TrackRecord,
    [ContentSection.Experience]: EditorTarget.Experience,
    [ContentSection.Projects]: EditorTarget.Projects,
    [ContentSection.References]: EditorTarget.References,
    [ContentSection.ClosingCta]: EditorTarget.ClosingCta,
    [ContentSection.Contact]: EditorTarget.Contact,
    [ContentSection.Footer]: EditorTarget.Footer
};

export const SECTION_BY_EDITOR_TARGET: Partial<Record<EditorTarget, ContentSection>> = {
    [EditorTarget.Hero]: ContentSection.Hero,
    [EditorTarget.Capabilities]: ContentSection.Capabilities,
    [EditorTarget.TrackRecord]: ContentSection.TrackRecord,
    [EditorTarget.Experience]: ContentSection.Experience,
    [EditorTarget.Projects]: ContentSection.Projects,
    [EditorTarget.References]: ContentSection.References,
    [EditorTarget.ClosingCta]: ContentSection.ClosingCta,
    [EditorTarget.Contact]: ContentSection.Contact,
    [EditorTarget.Footer]: ContentSection.Footer
};

export const SECTION_LABELS: Record<ContentSection, string> = {
    hero: 'Hero',
    capabilities: 'Approach',
    trackRecord: 'Track record',
    experience: 'Experience',
    projects: 'Projects',
    references: 'References',
    closingCta: 'Closing call to action',
    contact: 'Contact page',
    footer: 'Footer'
};
