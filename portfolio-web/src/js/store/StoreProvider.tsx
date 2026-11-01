import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

// Store
import { appendMessage, ContentConflict, loadContent, loadInbox, saveContent, saveInbox } from '@/store/remote';
import { StoreContext, type StoreValue } from '@/store/StoreContext';
import { readState, STORAGE_KEY, uid, writeState } from '@/store/storage';
import type { Message, PortfolioState, Project, SaveOutcome, SiteContent, SyncStatus } from '@/store/types';

export interface StoreProviderProps {
    children: ReactNode;
}

const StoreProvider: React.FunctionComponent<StoreProviderProps> = ({ children }) => {
    const [state, setState] = useState<PortfolioState>(readState);
    const [sync, setSync] = useState<SyncStatus>('loading');
    const [conflict, setConflict] = useState<StoreValue['conflict']>();
    const stateRef = useRef<PortfolioState>(state);
    const versionRef = useRef('');

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        let isCancelled = false;

        const hydrate = async () => {
            try {
                const snapshot = await loadContent();

                if (!isCancelled) {
                    if (snapshot) {
                        versionRef.current = snapshot.version;

                        const next = {
                            ...stateRef.current,
                            content: snapshot.content
                        };

                        stateRef.current = next;
                        setState(next);
                    }

                    setSync('ready');
                }
            } catch {
                if (!isCancelled) {
                    setSync('error');
                }
            }
        };

        void hydrate();

        return () => {
            isCancelled = true;
        };
    }, []);

    useEffect(() => {
        const syncTab = (event: StorageEvent) => {
            if (event.key !== STORAGE_KEY) {
                return;
            }

            setState(readState());
        };

        addEventListener('storage', syncTab);

        return () => {
            removeEventListener('storage', syncTab);
        };
    }, []);

    const applyLocal = useCallback((next: PortfolioState) => {
        stateRef.current = next;
        setState(next);
        writeState(next);
    }, []);

    const setContent = useCallback(async (next: SiteContent): Promise<SaveOutcome> => {
        if (sync !== 'ready') {
            return 'error';
        }

        try {
            const version = await saveContent(next, versionRef.current);

            versionRef.current = version;
            applyLocal({
                ...stateRef.current,
                content: next
            });

            return 'saved';
        } catch (error) {
            if (error instanceof ContentConflict) {
                setConflict(error.conflict);

                return 'conflict';
            }

            setSync('error');

            return 'error';
        }
    }, [applyLocal, sync]);

    const resolveConflict = useCallback(async (choice: 'discard' | 'overwrite') => {
        const pending = conflict;

        if (!pending) {
            return;
        }

        setConflict(undefined);

        if (choice === 'discard') {
            versionRef.current = pending.version;
            applyLocal({
                ...stateRef.current,
                content: pending.theirs
            });

            return;
        }

        try {
            const version = await saveContent(pending.mine, pending.version);

            versionRef.current = version;
            applyLocal({
                ...stateRef.current,
                content: pending.mine
            });
        } catch {
            setSync('error');
        }
    }, [applyLocal, conflict]);

    const refreshInbox = useCallback(async () => {
        let messages: Message[] | undefined;

        try {
            messages = await loadInbox();
        } catch {
            return;
        }

        if (!messages) {
            return;
        }

        const next = {
            ...stateRef.current,
            inbox: messages
        };

        stateRef.current = next;
        setState(next);
    }, []);

    const value = useMemo<StoreValue>(() => {
        const commit = (next: PortfolioState) => {
            applyLocal(next);
        };

        return {
            state,
            sync,
            canEdit: sync === 'ready',
            conflict,
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

            addMessage: async (draft) => {
                try {
                    await appendMessage(draft);

                    return true;
                } catch {
                    return false;
                }
            },

            updateMessage: (id, patch) => {
                const inbox = state.inbox.map((message) => {
                    if (message.id !== id) {
                        return message;
                    }

                    return {
                        ...message,
                        ...patch
                    };
                });

                commit({
                    ...state,
                    inbox
                });
                void saveInbox(inbox);
            },

            removeMessage: (id) => {
                const inbox = state.inbox.filter((message) => {
                    return message.id !== id;
                });

                commit({
                    ...state,
                    inbox
                });
                void saveInbox(inbox);
            },

            refreshInbox,

            setContent,

            resolveConflict,

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
    }, [applyLocal, conflict, refreshInbox, resolveConflict, setContent, state, sync]);

    return (
        <StoreContext value={value}>
            {children}
        </StoreContext>
    );
};

export default StoreProvider;
