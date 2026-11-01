import { createContext, useContext } from 'react';

// Types
import type { AdminModeValue } from './types';

export const AdminModeContext = createContext<AdminModeValue | undefined>(undefined);

export const useAdminMode = (): AdminModeValue => {
    const value = useContext(AdminModeContext);

    if (!value) {
        throw new Error(
            'useAdminMode must be called inside <AdminModeProvider>.'
        );
    }

    return value;
};
