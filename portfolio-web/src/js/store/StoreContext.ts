import { createContext, useContext } from 'react';

// Types
import type { StoreValue } from '@/store/types';

export const StoreContext = createContext<StoreValue | undefined>(undefined);

export const useStore = (): StoreValue => {
    const value = useContext(StoreContext);

    if (!value) {
        throw new Error('useStore must be called inside <StoreProvider>.');
    }

    return value;
};
