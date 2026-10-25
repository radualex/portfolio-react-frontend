import type React from 'react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

// Store
import { StoreContext, type StoreValue } from '@/store/StoreContext';
import { readState, STORAGE_KEY, uid, writeState } from '@/store/storage';
import type { Message, PortfolioState, Project } from '@/store/types';

export interface StoreProviderProps {
    children: ReactNode;
}

const StoreProvider: React.FunctionComponent<StoreProviderProps> = ({ children }) => {
    const [state, setState] = useState<PortfolioState>(readState);

    useEffect(() => {
        const sync = (event: StorageEvent) => {
            if (event.key !== STORAGE_KEY) {
                return;
            }

            setState(readState());
        };

        addEventListener('storage', sync);

        return () => {
            removeEventListener('storage', sync);
        };
    }, []);

    const value = useMemo<StoreValue>(() => {
        const commit = (next: PortfolioState) => {
            setState(next);
            writeState(next);
        };

        return {
            state,

            projects: (options) => {
                return options?.includeHidden ? state.projects : state.projects.filter((project) => {
                    return !project.hidden;
                });
            },

            unreadCount: state.inbox.filter((message) => {
                return !message.read && !message.archived;
            }).length,

            setAvailability: (next) => {
                commit({
                    ...state,
                    availability: {
                        state: next.state ?? state.availability.state,
                        note: typeof next.note === 'string' ? next.note.slice(0, 160) : state.availability.note
                    }
                });
            },

            saveProject: ({ id, ...fields }) => {
                const index = state.projects.findIndex((project) => {
                    return project.id === id;
                });

                if (index === -1) {
                    const created: Project = {
                        title: '',
                        kind: '',
                        description: '',
                        stack: '',
                        link: '',
                        linkLabel: '',
                        ...fields,
                        id: uid('p'),
                        hidden: false
                    };

                    commit({
                        ...state,
                        projects: [...state.projects, created]
                    });

                    return;
                }

                const projects = [...state.projects];

                projects[index] = {
                    ...projects[index],
                    ...fields
                };

                commit({
                    ...state,
                    projects
                });
            },

            removeProject: (id) => {
                commit({
                    ...state,
                    projects: state.projects.filter((project) => {
                        return project.id !== id;
                    })
                });
            },

            moveProject: (id, delta) => {
                const from = state.projects.findIndex((project) => {
                    return project.id === id;
                });
                const to = from + delta;

                if (from === -1 || to < 0 || to >= state.projects.length) {
                    return;
                }

                const projects = [...state.projects];
                const [moved] = projects.splice(from, 1);

                projects.splice(to, 0, moved);

                commit({
                    ...state,
                    projects
                });
            },

            addMessage: (draft) => {
                const message: Message = {
                    id: uid('m'),
                    at: new Date().toISOString(),
                    read: false,
                    archived: false,
                    ...draft
                };

                commit({
                    ...state,
                    inbox: [message, ...state.inbox]
                });
            },

            updateMessage: (id, patch) => {
                const index = state.inbox.findIndex((message) => {
                    return message.id === id;
                });

                if (index === -1) {
                    return;
                }

                const inbox = [...state.inbox];

                inbox[index] = {
                    ...inbox[index],
                    ...patch
                };

                commit({
                    ...state,
                    inbox
                });
            },

            removeMessage: (id) => {
                commit({
                    ...state,
                    inbox: state.inbox.filter((message) => {
                        return message.id !== id;
                    })
                });
            },

            setContent: (next) => {
                commit({
                    ...state,
                    content: next
                });
            },

            toggleSection: (key) => {
                const isVisible = state.sections[key];

                commit({
                    ...state,
                    sections: {
                        ...state.sections,
                        [key]: !isVisible
                    }
                });
            }
        };
    }, [state]);

    return (
        <StoreContext value={value}>
            {children}
        </StoreContext>
    );
};

export default StoreProvider;
