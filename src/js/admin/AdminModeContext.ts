import { createContext, useContext } from 'react';

// Constants
import type { EditorTarget } from './constants';

export type AdminStatus = 'checking' | 'on' | 'off';

export interface AdminModeValue {
    status: AdminStatus;
    isAdmin: boolean;
    enable: () => Promise<boolean>;
    exit: () => void;
    openEditor: (target: EditorTarget) => void;
}

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
