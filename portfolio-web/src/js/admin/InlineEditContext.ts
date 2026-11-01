import { createContext, useContext } from 'react';

// Types
import type { InlineEditValue } from './types';

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
