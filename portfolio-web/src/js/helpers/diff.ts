// Types
import type { SiteContent } from '@/store/types';

export interface Change {
    path: string;
    mine: string;
    theirs: string;
}

type Leaves = Record<string, string>;

const flatten = (value: unknown, prefix: string): Leaves => {
    if (Array.isArray(value)) {
        return value.reduce<Leaves>((leaves, item, index) => {
            return {
                ...leaves,
                ...flatten(item, `${prefix}.${index}`)
            };
        }, {});
    }

    if (value && typeof value === 'object') {
        return Object.entries(value).reduce<Leaves>((leaves, [key, item]) => {
            return {
                ...leaves,
                ...flatten(item, prefix ? `${prefix}.${key}` : key)
            };
        }, {});
    }

    return {
        [prefix]: typeof value === 'string' ? value : String(value)
    };
};

export const diffContent = (mine: SiteContent, theirs: SiteContent): Change[] => {
    const mineLeaves = flatten(mine, '');
    const theirsLeaves = flatten(theirs, '');
    const paths = [...new Set([...Object.keys(mineLeaves), ...Object.keys(theirsLeaves)])].toSorted();

    return paths
        .filter((path) => {
            return mineLeaves[path] !== theirsLeaves[path];
        })
        .map((path) => {
            return {
                path,
                mine: mineLeaves[path] ?? '',
                theirs: theirsLeaves[path] ?? ''
            };
        });
};
