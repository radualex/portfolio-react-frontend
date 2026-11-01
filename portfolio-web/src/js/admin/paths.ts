const isArray = (value: unknown): value is unknown[] => {
    return Array.isArray(value);
};

export const getByPath = (source: unknown, path: string): unknown => {
    const segments = path.split('.');
    let current: unknown = source;

    for (const segment of segments) {
        if (isArray(current)) {
            current = current[Number(segment)];
            continue;
        }

        if (current && typeof current === 'object') {
            current = (current as Record<string, unknown>)[segment];
            continue;
        }

        return;
    }

    return current;
};

export const setByPath = (source: unknown, path: string, value: string): unknown => {
    const [head, ...rest] = path.split('.');

    if (isArray(source)) {
        const index = Number(head);
        const next = [...source];

        next[index] = rest.length === 0 ? value : setByPath(source[index], rest.join('.'), value);

        return next;
    }

    const record = source as Record<string, unknown>;

    if (rest.length === 0) {
        return {
            ...record,
            [head]: value
        };
    }

    return {
        ...record,
        [head]: setByPath(record[head], rest.join('.'), value)
    };
};
