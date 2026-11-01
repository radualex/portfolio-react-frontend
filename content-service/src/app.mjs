import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { readFile, rename, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join } from 'node:path';

const MAX_BODY = 1024 * 1024;
const MAX_INBOX = 500;
const RATE_WINDOW_MS = 10_000;
const RATE_MAX_KEYS = 5000;
const MESSAGE_TYPES = ['enquiry', 'feedback'];
const MESSAGE_FIELDS = {
    type: 32,
    name: 120,
    email: 200,
    subject: 200,
    body: 5000,
    detail: 500
};

export const createApp = ({ dataDir, credentials, origins, maxBody = MAX_BODY, rateWindowMs = RATE_WINDOW_MS }) => {
    const contentFile = join(dataDir, 'content.json');
    const inboxFile = join(dataDir, 'inbox.json');
    const expectedAuth = credentials ? `Basic ${Buffer.from(credentials).toString('base64')}` : '';

    let queue = Promise.resolve();

    const enqueue = (task) => {
        const run = queue.then(task, task);

        queue = run.then(() => undefined, () => undefined);

        return run;
    };

    const writeJson = async (file, value) => {
        const temporary = `${file}.tmp`;

        await writeFile(temporary, JSON.stringify(value));
        await rename(temporary, file);
    };

    const readJson = async (file, fallback) => {
        try {
            return JSON.parse(await readFile(file, 'utf8'));
        } catch (error) {
            if (error.code === 'ENOENT') {
                return fallback;
            }

            throw error;
        }
    };

    const readText = async (file) => {
        try {
            return await readFile(file, 'utf8');
        } catch (error) {
            if (error.code === 'ENOENT') {
                return null;
            }

            throw error;
        }
    };

    const versionOf = (text) => {
        return createHash('sha256').update(text).digest('hex').slice(0, 32);
    };

    const normalizeTag = (header) => {
        return (header ?? '').replace(/^W\//, '').replaceAll('"', '').trim();
    };

    const isAuthorized = (request) => {
        if (!expectedAuth) {
            return false;
        }

        const provided = Buffer.from(request.headers.authorization ?? '');
        const expected = Buffer.from(expectedAuth);

        if (provided.length !== expected.length) {
            timingSafeEqual(expected, expected);

            return false;
        }

        return timingSafeEqual(provided, expected);
    };

    const readBody = (request) => new Promise((resolve, reject) => {
        const chunks = [];
        let size = 0;

        request.on('data', (chunk) => {
            size += chunk.length;

            if (size > maxBody) {
                request.destroy();
                reject(Object.assign(new Error('Payload too large'), { status: 413 }));

                return;
            }

            chunks.push(chunk);
        });

        request.on('end', () => {
            resolve(Buffer.concat(chunks).toString('utf8'));
        });

        request.on('error', reject);
    });

    const send = (response, status, body) => {
        response.writeHead(status, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
        });
        response.end(JSON.stringify(body));
    };

    const sendUnauthorized = (response) => {
        response.setHeader('WWW-Authenticate', 'Basic realm="Admin", charset="UTF-8"');
        send(response, 401, { error: 'Authentication required' });
    };

    const sendEmpty = (response, status) => {
        response.writeHead(status, { 'Cache-Control': 'no-store' });
        response.end();
    };

    const isJson = (request) => {
        return (request.headers['content-type'] ?? '').split(';')[0].trim() === 'application/json';
    };

    const isRecord = (value) => {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    };

    const clientKey = (request) => {
        const forwarded = request.headers['x-forwarded-for'];

        if (typeof forwarded === 'string' && forwarded.length > 0) {
            const hops = forwarded.split(',');

            return hops[hops.length - 1].trim();
        }

        return request.socket.remoteAddress ?? 'unknown';
    };

    const lastSeen = new Map();

    const isThrottled = (request) => {
        const now = Date.now();
        const key = clientKey(request);
        const previous = lastSeen.get(key) ?? 0;

        if (now - previous < rateWindowMs) {
            return true;
        }

        lastSeen.set(key, now);

        if (lastSeen.size > RATE_MAX_KEYS) {
            for (const [entry, at] of lastSeen) {
                if (now - at >= RATE_WINDOW_MS) {
                    lastSeen.delete(entry);
                }
            }
        }

        return false;
    };

    const toMessage = (draft) => {
        const message = {};

        for (const [field, limit] of Object.entries(MESSAGE_FIELDS)) {
            const value = draft[field];

            if (typeof value === 'string') {
                message[field] = value.trim().slice(0, limit);
            }
        }

        return message;
    };

    const applyCors = (request, response) => {
        const { origin } = request.headers;

        if (origin && origins.includes(origin)) {
            response.setHeader('Access-Control-Allow-Origin', origin);
            response.setHeader('Vary', 'Origin');
        }

        response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        response.setHeader('Access-Control-Max-Age', '86400');
    };

    const parseBody = async (request, response, accepts = isRecord) => {
        if (!isJson(request)) {
            send(response, 415, { error: 'Content-Type must be application/json' });

            return;
        }

        const raw = await readBody(request);

        let parsed;

        try {
            parsed = JSON.parse(raw);
        } catch {
            send(response, 400, { error: 'Invalid JSON' });

            return;
        }

        if (!accepts(parsed)) {
            send(response, 400, { error: 'Unexpected JSON shape' });

            return;
        }

        return parsed;
    };

    return createServer(async (request, response) => {
        applyCors(request, response);

        const { pathname } = new URL(request.url ?? '/', 'http://localhost');

        try {
            if (request.method === 'OPTIONS') {
                sendEmpty(response, 204);

                return;
            }

            if (pathname === '/health' && request.method === 'GET') {
                send(response, 200, { ok: true });

                return;
            }

            if (pathname === '/api/content') {
                if (request.method === 'GET') {
                    const text = await readText(contentFile);

                    if (text === null) {
                        sendEmpty(response, 204);

                        return;
                    }

                    const version = versionOf(text);

                    response.setHeader('ETag', `"${version}"`);
                    send(response, 200, JSON.parse(text));

                    return;
                }

                if (request.method === 'PUT') {
                    if (!isAuthorized(request)) {
                        sendUnauthorized(response);

                        return;
                    }

                    const content = await parseBody(request, response);

                    if (!content) {
                        return;
                    }

                    const recorded = await enqueue(async () => {
                        const text = await readText(contentFile);
                        const version = text === null ? '' : versionOf(text);
                        const condition = normalizeTag(request.headers['if-match']);

                        if (condition && condition !== version) {
                            return {
                                current: text === null ? null : JSON.parse(text),
                                version
                            };
                        }

                        const next = JSON.stringify(content);

                        await writeJson(contentFile, content);

                        return { version: versionOf(next) };
                    });

                    if ('current' in recorded) {
                        send(response, 412, { current: recorded.current, version: recorded.version });

                        return;
                    }

                    response.setHeader('ETag', `"${recorded.version}"`);
                    send(response, 200, { version: recorded.version });

                    return;
                }
            }

            if (pathname === '/api/content/inbox') {
                if (request.method === 'GET') {
                    if (!isAuthorized(request)) {
                        sendUnauthorized(response);

                        return;
                    }

                    send(response, 200, await readJson(inboxFile, []));

                    return;
                }

                if (request.method === 'PUT') {
                    if (!isAuthorized(request)) {
                        sendUnauthorized(response);

                        return;
                    }

                    const next = await parseBody(request, response, Array.isArray);

                    if (!next) {
                        return;
                    }

                    await enqueue(() => {
                        return writeJson(inboxFile, next.slice(0, MAX_INBOX));
                    });
                    send(response, 200, { ok: true });

                    return;
                }

                if (request.method === 'POST') {
                    if (isThrottled(request)) {
                        response.setHeader('Retry-After', String(Math.ceil(rateWindowMs / 1000)));
                        send(response, 429, { error: 'Too many messages' });

                        return;
                    }

                    const draft = await parseBody(request, response);

                    if (!draft) {
                        return;
                    }

                    const message = toMessage(draft);

                    if (!MESSAGE_TYPES.includes(message.type)) {
                        send(response, 400, { error: 'Unknown message type' });

                        return;
                    }

                    if (!message.body) {
                        send(response, 400, { error: 'Message body is required' });

                        return;
                    }

                    const record = {
                        ...message,
                        id: randomUUID(),
                        at: new Date().toISOString(),
                        read: false,
                        archived: false
                    };

                    await enqueue(async () => {
                        const inbox = await readJson(inboxFile, []);

                        inbox.unshift(record);
                        await writeJson(inboxFile, inbox.slice(0, MAX_INBOX));
                    });
                    send(response, 201, { ok: true });

                    return;
                }
            }

            send(response, 404, { error: 'Not found' });
        } catch (error) {
            const status = error.status ?? 500;

            if (status >= 500) {
                console.error(error);
            }

            send(response, status, { error: status >= 500 ? 'Internal error' : error.message });
        }
    });
};
