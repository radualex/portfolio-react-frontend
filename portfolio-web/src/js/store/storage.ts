// Store
import { DEFAULT_STATE } from '@/store/defaults';
import type { PortfolioState, SiteContent } from '@/store/types';

export const STORAGE_KEY = 'rs-portfolio-v1';

const clone = <T>(value: T): T => {
    return structuredClone(value);
};

/* Saved content predates the Delft move and the Twitter removal; both are rewritten on load so existing visitors see the current site. */
const toDelft = (value: string): string => {
    return value.replaceAll('Amsterdam', 'Delft');
};

const migrateContent = (content: SiteContent): SiteContent => {
    return {
        ...content,
        hero: {
            ...content.hero,
            eyebrow: toDelft(content.hero.eyebrow),
            location: toDelft(content.hero.location)
        },
        contact: {
            ...content.contact,
            channels: content.contact.channels
                .filter((channel) => { return !channel.href?.includes('twitter.com'); })
                .map((channel) => {
                    return {
                        ...channel,
                        detail: toDelft(channel.detail)
                    };
                })
        },
        footer: {
            ...content.footer,
            copyright: toDelft(content.footer.copyright)
        }
    };
};

export const seededState = (): PortfolioState => {
    return clone(DEFAULT_STATE);
};

export const readState = (): PortfolioState => {
    let raw: string | undefined;

    try {
        raw = globalThis.localStorage.getItem(STORAGE_KEY) ?? undefined;
    } catch {
        return seededState();
    }

    if (!raw) {
        return seededState();
    }

    try {
        const parsed = JSON.parse(raw) as Partial<PortfolioState>;
        const defaults = clone(DEFAULT_STATE.content);
        const content = parsed.content;

        return {
            availability: parsed.availability ?? clone(DEFAULT_STATE.availability),
            projects: Array.isArray(parsed.projects) ? parsed.projects : clone(DEFAULT_STATE.projects),
            inbox: Array.isArray(parsed.inbox) ? parsed.inbox : [],
            content: migrateContent(content ? {
                hero: {
                    ...defaults.hero,
                    ...content.hero
                },
                capabilities: {
                    ...defaults.capabilities,
                    ...content.capabilities
                },
                trackRecord: {
                    ...defaults.trackRecord,
                    ...content.trackRecord
                },
                experience: {
                    ...defaults.experience,
                    ...content.experience
                },
                projects: {
                    ...defaults.projects,
                    ...content.projects
                },
                references: {
                    ...defaults.references,
                    ...content.references
                },
                closingCta: {
                    ...defaults.closingCta,
                    ...content.closingCta
                },
                contact: {
                    ...defaults.contact,
                    ...content.contact
                },
                footer: {
                    ...defaults.footer,
                    ...content.footer
                }
            } : defaults),
            sections: {
                ...clone(DEFAULT_STATE.sections),
                ...parsed.sections
            }
        };
    } catch {
        return seededState();
    }
};

export const writeState = (state: PortfolioState) => {
    try {
        globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        /* Memory only for this session. */
    }
};

export const uid = (prefix: string) => {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
};

export const formatDate = (iso: string) => {
    const date = new Date(iso);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const day = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const time = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return `${day} · ${time}`;
};
