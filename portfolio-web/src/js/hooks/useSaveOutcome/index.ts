import { useCallback } from 'react';

// Components
import { useToast } from '@/components/Toast/ToastContext';

// Types
import type { SaveOutcome } from '@/store/types';

export const useSaveOutcome = () => {
    const toast = useToast();

    return useCallback((outcome: SaveOutcome, message: string) => {
        if (outcome === 'saved') {
            toast(message);

            return;
        }

        toast(outcome === 'conflict'
            ? 'Review the changes before saving'
            : 'Could not save — the content service is unreachable');
    }, [toast]);
};
