import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, test } from 'node:test';

// Service
import { createApp } from '../src/app.mjs';

const credentials = 'admin:test';
const authorization = `Basic ${Buffer.from(credentials).toString('base64')}`;

let base;
let dataDir;
let server;

before(async () => {
    dataDir = await mkdtemp(join(tmpdir(), 'content-service-'));

    server = createApp({ dataDir, credentials, origins: ['http://localhost:3000'], rateWindowMs: 0 });
    await new Promise((resolve) => {
        server.listen(0, resolve);
    });

    base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    await new Promise((resolve) => {
        server.close(resolve);
    });
    await rm(dataDir, { recursive: true, force: true });
});

test('GET /api/content is 204 before the first write', async () => {
    const response = await fetch(`${base}/api/content`);

    assert.equal(response.status, 204);
});

test('PUT /api/content rejects missing and wrong credentials', async () => {
    const missing = await fetch(`${base}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
    });

    assert.equal(missing.status, 401);

    const wrong = await fetch(`${base}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Basic bm9wZTpub3Bl' },
        body: '{}'
    });

    assert.equal(wrong.status, 401);
});

test('PUT /api/content rejects a non-JSON content type', async () => {
    const response = await fetch(`${base}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'text/plain', Authorization: authorization },
        body: 'x'
    });

    assert.equal(response.status, 415);
});

test('PUT then GET round-trips the document', async () => {
    const document = { hero: { heading: 'hello' } };
    const put = await fetch(`${base}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: authorization },
        body: JSON.stringify(document)
    });

    assert.equal(put.status, 200);

    const get = await fetch(`${base}/api/content`);

    assert.equal(get.status, 200);
    assert.deepEqual(await get.json(), document);
});

test('POST /api/content/inbox appends and GET requires auth', async () => {
    const post = await fetch(`${base}/api/content/inbox`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'enquiry', body: 'hi', name: 'Ada' })
    });

    assert.equal(post.status, 201);

    const unauthenticated = await fetch(`${base}/api/content/inbox`);

    assert.equal(unauthenticated.status, 401);

    const list = await fetch(`${base}/api/content/inbox`, { headers: { Authorization: authorization } });
    const inbox = await list.json();

    assert.equal(inbox.length, 1);
    assert.equal(inbox[0].name, 'Ada');
    assert.equal(inbox[0].read, false);
});

test('POST ignores client-supplied bookkeeping fields', async () => {
    const post = await fetch(`${base}/api/content/inbox`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: 'enquiry',
            body: 'forged',
            name: 'Mallory',
            id: 'forced-id',
            at: '1999-01-01T00:00:00.000Z',
            read: true,
            archived: true
        })
    });

    assert.equal(post.status, 201);

    const list = await fetch(`${base}/api/content/inbox`, { headers: { Authorization: authorization } });
    const [message] = await list.json();

    assert.equal(message.name, 'Mallory');
    assert.equal(message.read, false);
    assert.equal(message.archived, false);
    assert.notEqual(message.id, 'forced-id');
    assert.notEqual(message.at, '1999-01-01T00:00:00.000Z');
    assert.equal(message.body, 'forged');
});

test('POST caps every field and drops unknown ones', async () => {
    const post = await fetch(`${base}/api/content/inbox`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'feedback', body: 'x'.repeat(9000), name: 'n'.repeat(500), extra: 'dropped' })
    });

    assert.equal(post.status, 201);

    const list = await fetch(`${base}/api/content/inbox`, { headers: { Authorization: authorization } });
    const [message] = await list.json();

    assert.equal(message.body.length, 5000);
    assert.equal(message.name.length, 120);
    assert.equal(message.extra, undefined);
});

test('POST rejects an empty body and an unknown type', async () => {
    const empty = await fetch(`${base}/api/content/inbox`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'enquiry', body: '   ' })
    });

    assert.equal(empty.status, 400);

    const unknown = await fetch(`${base}/api/content/inbox`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'spam', body: 'x' })
    });

    assert.equal(unknown.status, 400);
});

test('POST is throttled per client address', async () => {
    const throttledDir = await mkdtemp(join(tmpdir(), 'content-service-throttle-'));
    const throttled = createApp({ dataDir: throttledDir, credentials, origins: [], rateWindowMs: 60_000 });

    await new Promise((resolve) => {
        throttled.listen(0, resolve);
    });

    const url = `http://127.0.0.1:${throttled.address().port}/api/content/inbox`;
    const payload = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'enquiry', body: 'first' })
    };

    try {
        assert.equal((await fetch(url, payload)).status, 201);

        const second = await fetch(url, { ...payload, body: JSON.stringify({ type: 'enquiry', body: 'second' }) });

        assert.equal(second.status, 429);
        assert.equal(second.headers.get('retry-after'), '60');

        const other = await fetch(url, {
            ...payload,
            headers: { ...payload.headers, 'X-Forwarded-For': '203.0.113.7' },
            body: JSON.stringify({ type: 'enquiry', body: 'other client' })
        });

        assert.equal(other.status, 201);
    } finally {
        await new Promise((resolve) => {
            throttled.close(resolve);
        });
        await rm(throttledDir, { recursive: true, force: true });
    }
});

test('OPTIONS preflight is answered without auth', async () => {
    const response = await fetch(`${base}/api/content`, {
        method: 'OPTIONS',
        headers: { Origin: 'http://localhost:3000' }
    });

    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:3000');
});
