// Store
import { normalizeContent } from './storage';

// Types
import type { MessageDraft, SiteContent } from './types';

const BASE = '/api';

export interface Snapshot {
    content: SiteContent;
    version: string;
}

export interface Conflict {
    mine: SiteContent;
    theirs: SiteContent;
    version: string;
}

interface ConflictBody {
    current: SiteContent;
    version: string;
}

export class ContentConflict extends Error {
    readonly conflict: Conflict;

    constructor(conflict: Conflict) {
        super('The content changed on the server.');

        this.name = 'ContentConflict';
        this.conflict = conflict;
    }
}

const readTag = (response: Response): string => {
    return (response.headers.get('ETag') ?? '').replaceAll('"', '');
};

export const loadContent = async (): Promise<Snapshot | undefined> => {
    const response = await fetch(`${BASE}/content`, {
        cache: 'no-store',
        credentials: 'same-origin'
    });

    if (response.status === 204) {
        return;
    }

    if (!response.ok) {
        throw new Error(`GET ${BASE}/content answered ${response.status}`);
    }

    return {
        content: normalizeContent((await response.json()) as Partial<SiteContent>),
        version: readTag(response)
    };
};

export const saveContent = async (content: SiteContent, version: string): Promise<string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (version) {
        headers['If-Match'] = `"${version}"`;
    }

    const response = await fetch(`${BASE}/content`, {
        method: 'PUT',
        cache: 'no-store',
        credentials: 'same-origin',
        headers,
        body: JSON.stringify(content)
    });

    if (response.status === 412) {
        const body = (await response.json()) as ConflictBody;

        throw new ContentConflict({
            mine: content,
            theirs: normalizeContent(body.current),
            version: body.version
        });
    }

    if (!response.ok) {
        throw new Error(`PUT ${BASE}/content answered ${response.status}`);
    }

    return readTag(response);
};

export const loadInbox = async (): Promise<MessageDraft[] | undefined> => {
    const response = await fetch(`${BASE}/content/inbox`, {
        cache: 'no-store',
        credentials: 'same-origin'
    });

    if (response.status === 401) {
        return;
    }

    if (!response.ok) {
        throw new Error(`GET ${BASE}/content/inbox answered ${response.status}`);
    }

    return await response.json();
};

export const appendMessage = async (draft: MessageDraft): Promise<void> => {
    const response = await fetch(`${BASE}/content/inbox`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(draft)
    });

    if (!response.ok) {
        throw new Error(`POST ${BASE}/content/inbox answered ${response.status}`);
    }
};

export const saveInbox = async (messages: unknown[]): Promise<void> => {
    const response = await fetch(`${BASE}/content/inbox`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messages)
    });

    if (!response.ok) {
        throw new Error(`PUT ${BASE}/content/inbox answered ${response.status}`);
    }
};
