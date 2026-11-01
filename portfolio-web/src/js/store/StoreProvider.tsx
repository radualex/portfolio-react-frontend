import { omit } from 'lodash-es';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Constants
import { ConflictChoice } from '@/store/constants';

// Store
import { appendMessage, ContentConflict, loadInbox, loadState, saveInbox, saveState } from '@/store/remote';
import { StoreContext } from '@/store/StoreContext';
import { readState, STORAGE_KEY, uid, writeState } from '@/store/storage';

// Types
import type { Message, PersistedState, PortfolioState, Project, SaveOutcome, SiteContent, StoreProviderProps, StoreValue, SyncStatus } from '@/store/types';

const StoreProvider: React.FunctionComponent<StoreProviderProps> = ({ children }) => {
    const [state, setState] = useState<PortfolioState>(readState);
    const [sync, setSync] = useState<SyncStatus>('loading');
    const [conflict, setConflict] = useState<StoreValue['conflict']>();
    const stateRef = useRef<PortfolioState>(state);
    const versionRef = useRef('');
    const isMountedRef = useRef(true);

    const applyLocal = useCallback((next: PortfolioState) => {
        stateRef.current = next;
        setState(next);
        writeState(next);
    }, []);

    const hydrate = useCallback(async () => {
        try {
            const snapshot = await loadState();

            if (isMountedRef.current) {
                if (snapshot) {
                    versionRef.current = snapshot.version;

                    const next = {
                        ...stateRef.current,
                        ...snapshot.state
                    };

                    stateRef.current = next;
                    setState(next);
                }

                setSync('ready');
            }
        } catch {
            if (isMountedRef.current) {
                setSync('error');
            }
        }
    }, []);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        isMountedRef.current = true;

        void hydrate();

        return () => {
            isMountedRef.current = false;
        };
    }, [hydrate]);

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

    const commit = useCallback(async (patch: Partial<PersistedState>): Promise<SaveOutcome> => {
        if (sync !== 'ready') {
            return 'error';
        }

        const next = {
            ...stateRef.current,
            ...patch
        };

        try {
            const version = await saveState(omit(next, 'inbox'), versionRef.current);

            versionRef.current = version;
            applyLocal(next);

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

    const resolveConflict = useCallback(async (choice: ConflictChoice) => {
        const pending = conflict;

        if (!pending) {
            return;
        }

        setConflict(undefined);

        if (choice === ConflictChoice.Discard) {
            versionRef.current = pending.version;
            applyLocal({
                ...stateRef.current,
                ...pending.theirs
            });

            return;
        }

        try {
            const version = await saveState(pending.mine, pending.version);

            versionRef.current = version;
            applyLocal({
                ...stateRef.current,
                ...pending.mine
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
                return commit({
                    availability: {
                        state: next.state ?? stateRef.current.availability.state,
                        note: typeof next.note === 'string'
                            ? next.note.slice(0, 160)
                            : stateRef.current.availability.note
                    }
                });
            },

            saveProject: ({ id, ...fields }) => {
                const current = stateRef.current.projects;
                const index = current.findIndex((project) => {
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

                    return commit({
                        projects: [...current, created]
                    });
                }

                const projects = [...current];

                projects[index] = {
                    ...projects[index],
                    ...fields
                };

                return commit({
                    projects
                });
            },

            removeProject: (id) => {
                return commit({
                    projects: stateRef.current.projects.filter((project) => {
                        return project.id !== id;
                    })
                });
            },

            moveProject: (id, delta) => {
                const current = stateRef.current.projects;
                const from = current.findIndex((project) => {
                    return project.id === id;
                });
                const to = from + delta;

                if (from === -1 || to < 0 || to >= current.length) {
                    return Promise.resolve('saved');
                }

                const projects = [...current];
                const [moved] = projects.splice(from, 1);

                projects.splice(to, 0, moved);

                return commit({
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
                const inbox = stateRef.current.inbox.map((message) => {
                    if (message.id !== id) {
                        return message;
                    }

                    return {
                        ...message,
                        ...patch
                    };
                });

                applyLocal({
                    ...stateRef.current,
                    inbox
                });
                void saveInbox(inbox);
            },

            removeMessage: (id) => {
                const inbox = stateRef.current.inbox.filter((message) => {
                    return message.id !== id;
                });

                applyLocal({
                    ...stateRef.current,
                    inbox
                });
                void saveInbox(inbox);
            },

            refreshInbox,

            setContent: (next: SiteContent) => {
                return commit({
                    content: next
                });
            },

            resolveConflict,

            toggleSection: (key) => {
                const { sections } = stateRef.current;
                const isVisible = sections[key];

                return commit({
                    sections: {
                        ...sections,
                        [key]: !isVisible
                    }
                });
            }
        };
    }, [applyLocal, commit, conflict, refreshInbox, resolveConflict, state, sync]);

    return (
        <StoreContext value={value}>
            {children}
        </StoreContext>
    );
};

export default StoreProvider;
