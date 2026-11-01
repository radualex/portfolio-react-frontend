// Constants
import type { ContentSection, EditorTarget } from './constants';

// Store
import type { SiteContent } from '@/store/types';

export type AdminStatus = 'checking' | 'on' | 'off';

export interface AdminModeValue {
    status: AdminStatus;
    isAdmin: boolean;
    enable: () => Promise<boolean>;
    exit: () => void;
    openEditor: (target: EditorTarget) => void;
}

export type EditScope = ContentSection | 'site';

export interface InlineEditValue {
    content: SiteContent;
    editingSection: EditScope | undefined;
    start: (scope: EditScope) => void;
    update: (path: string, value: string) => void;
    save: () => void;
    cancel: () => void;
}

export type EditingSectionAction = { type: 'clear'; } | { type: 'clearUnlessSite'; } | { type: 'scope'; scope: EditScope; };
