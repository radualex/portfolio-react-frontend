// Types
import type { SiteContent } from '@/store/types';

export type TextKey<T> = {
    [K in keyof T]-?: NonNullable<T[K]> extends string ? K : never;
}[keyof T];

export type DraftAction = {
    [K in keyof SiteContent]: {
        key: K;
        patch: Partial<SiteContent[K]>;
    };
}[keyof SiteContent];
