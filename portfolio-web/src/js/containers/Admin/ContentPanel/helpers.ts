// Types
import type { SiteContent } from '@/store/types';
import type { DraftAction, TextKey } from './types';

export const toList = (value: string): string[] => {
    return value
        .split('\n')
        .map((line) => {
            return line.trim();
        })
        .filter(Boolean);
};

export const fieldPatch = <T extends object>(key: TextKey<T>, next: string): Partial<T> => {
    return {
        [key]: next
    } as Partial<T>;
};

export const draftReducer = (current: SiteContent, action: DraftAction): SiteContent => {
    return {
        ...current,
        [action.key]: {
            ...current[action.key],
            ...action.patch
        }
    };
};
