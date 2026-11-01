import { createContext, useContext } from 'react';

// Constants
import type { ContentSection } from './constants';

// Store
import type { SiteContent } from '@/store/types';

export type EditScope = ContentSection | 'site';

export interface InlineEditValue {
    content: SiteContent;
    editingSection: EditScope | undefined;
    start: (scope: EditScope) => void;
    update: (path: string, value: string) => void;
    save: () => void;
    cancel: () => void;
}

export const InlineEditContext = createContext<InlineEditValue | undefined>(
    undefined
);

export const useInlineEdit = (): InlineEditValue => {
    const value = useContext(InlineEditContext);

    if (!value) {
        throw new Error(
            'useInlineEdit must be called inside <InlineEditProvider>.'
        );
    }

    return value;
};
