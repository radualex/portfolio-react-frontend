import { createContext, useContext } from 'react';

// Constants
import type { SectionKey } from '@/store/constants';

// Types
import type { Availability, ConflictState, Message, MessageDraft, PortfolioState, Project, ProjectDraft, ProjectUpdate, SaveOutcome, SiteContent, SyncStatus } from '@/store/types';

export interface ProjectListOptions {
    includeHidden?: boolean;
}

export interface StoreValue {
    state: PortfolioState;
    sync: SyncStatus;
    canEdit: boolean;
    conflict: ConflictState | undefined;
    projects: (options?: ProjectListOptions) => Project[];
    unreadCount: number;

    setAvailability: (next: Partial<Availability>) => void;

    saveProject: (draft: ProjectDraft | ProjectUpdate) => void;
    removeProject: (id: string) => void;
    moveProject: (id: string, delta: number) => void;

    addMessage: (draft: MessageDraft) => Promise<boolean>;
    updateMessage: (id: string, patch: Partial<Message>) => void;
    removeMessage: (id: string) => void;
    refreshInbox: () => Promise<void>;

    setContent: (next: SiteContent) => Promise<SaveOutcome>;
    resolveConflict: (choice: 'discard' | 'overwrite') => Promise<void>;
    toggleSection: (key: SectionKey) => void;
}

export const StoreContext = createContext<StoreValue | undefined>(undefined);

export const useStore = (): StoreValue => {
    const value = useContext(StoreContext);

    if (!value) {
        throw new Error('useStore must be called inside <StoreProvider>.');
    }

    return value;
};
