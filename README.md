# Radu Stoica — Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/c24b30b9-d280-4f35-9055-e84baecc564e/deploy-status)](https://app.netlify.com/sites/agitated-lamarr-c83b74/deploys)

Monorepo with two independently deployed packages:

| Package | What it is | Runs on |
| --- | --- | --- |
| `portfolio-web` | React + TypeScript + Vite single-page portfolio | Netlify |
| `content-service` | Zero-dependency JSON store for site content and the contact inbox | Coolify — `portfolio.api.radualex.me` |

Neither package imports the other. `content-service` treats the content document as an opaque JSON blob, so there is no shared code and no build step.

## Setup

```bash
npm install
```

One lockfile, one `node_modules` at the root. Workspaces are linked automatically.

## Development

```bash
npm run dev          # portfolio-web on http://localhost:3000
npm run dev:service  # content-service on http://localhost:4000, data in ./.data
```

`content-service` needs credentials before it will accept writes:

```bash
ADMIN_CREDENTIALS=admin:dev ALLOWED_ORIGIN=http://localhost:3000 npm run dev:service
```

## Checks

```bash
npm run typecheck          # tsc -b --noEmit
npm run lint               # eslint + stylelint
npm run build              # tsc -b && vite build -> portfolio-web/dist
npm test -w content-service
```

## Deployment

Both hosts deploy only the package that changed.

- **Netlify** — `netlify.toml` sets `[build] ignore` so a push touching only `content-service/` skips the build entirely.
- **Coolify** — each application has its own watch paths (`portfolio-web/**`, `content-service/**`).

GitHub Actions runs typecheck, lint, build and tests for the changed package only. It never triggers a deploy.

## Environment

`portfolio-web` — build-time variables live in `portfolio-web/.env` (see `.env.example`; file is gitignored).

`content-service` — runtime variables are documented in `content-service/.env.example`.

| Variable | Purpose |
| --- | --- |
| `ADMIN_CREDENTIALS` | `user:pass` guarding `PUT /api/content` and `GET /api/content/inbox` |
| `ALLOWED_ORIGIN` | Comma-separated browser origins allowed by CORS |
| `DATA_DIR` | Where `content.json` and `inbox.json` are stored |
| `PORT` | Listen port (container default 3000) |
