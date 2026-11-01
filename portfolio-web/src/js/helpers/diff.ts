import { isArray, isPlainObject, keys, sortBy, toPairs, toString, transform, uniq } from 'lodash-es';

// Types
import type { SiteContent } from '@/store/types';

export interface Change {
    path: string;
    mine: string;
    theirs: string;
}

type Leaves = Record<string, string>;

const isBranch = (value: unknown): value is object => {
    return isArray(value) || isPlainObject(value);
};

const flatten = (value: unknown, prefix = ''): Leaves => {
    if (!isBranch(value)) {
        return {
            [prefix]: toString(value)
        };
    }

    return transform(toPairs(value), (leaves: Leaves, [key, child]) => {
        const path = prefix ? `${prefix}.${key}` : key;

        Object.assign(leaves, flatten(child, path));
    }, {} as Leaves);
};

export const diffContent = (mine: SiteContent, theirs: SiteContent): Change[] => {
    const mineLeaves = flatten(mine);
    const theirsLeaves = flatten(theirs);
    const paths = sortBy(uniq([...keys(mineLeaves), ...keys(theirsLeaves)]));

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
