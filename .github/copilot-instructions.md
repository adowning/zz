# Copilot Instructions for zero-varlet-hono

## Project Overview
- **Monorepo** with a frontend (Vue/Vite) and backend API (Bun, Hono, Drizzle, Zod, Zero ORM).
- Main backend code is in `api/` (entry: `api/index.ts`), frontend in `src/`.
- Database schema and types are managed with Drizzle ORM (`api/db/schema.ts`, `api/db/types.ts`).
- Zod schemas for validation are in `api/db/zod/`.
- Modular route structure: each domain (e.g., `user`, `wallet`, `blackjack`) has its own folder in `api/modules/`.
- Shared logic and types are in `shared/` and `api/lib/`.

## Key Workflows
- **Dev server (full stack):** `bun dev` (runs both frontend and API)
- **API only dev:** `bun --cwd api/ dev` or `cd api && bun dev`
- **Frontend only dev:** `bun dev:frontend`
- **Build:** `bun build` (frontend), `bun --cwd api/ build` (API)
- **Type checking:** `bun type-check` (frontend), `bun --cwd api/ typecheck` (API)
- **Lint/Format:** `bun lint`, `bun format`, or use `lint:fix`/`format` scripts
- **Tests:** `bun test` (API), `bun test` or `vitest` (frontend)
- **DB reset/seed:** `bun db:reset` or `bun --cwd api/ db:reset`, see `scripts/seed.ts`

## Patterns & Conventions
- **API routes:** Use Hono routers in `api/modules/*/*.router.ts` and controllers in `*.controller.ts`.
- **Validation:** Zod schemas in `api/db/zod/` and per-module `*.schema.ts`.
- **Services:** Business logic in `*.service.ts` files per module.
- **Middleware:** Auth, session, and logging in `api/middlewares/`.
- **Shared types:** Use `shared/` and `api/db/types.ts` for cross-module types.
- **Environment:** Config in `api/env.ts` and `shared/env.ts`.
- **Seeding:** See `scripts/seed/` and `scripts/seed_better/` for DB seeding logic.
- **Utilities:** Common helpers in `api/utils/` and `scripts/utils/`.

## Integration & External
- **Drizzle ORM** for DB, see `drizzle.config.ts` and Drizzle scripts in package.json.
- **Zero ORM** for some models, see `api/db/zero.ts`.
- **Zod** for validation, see `api/db/zod/`.
- **Hono** for API routing, see `api/app.ts`.
- **Bun** as runtime for both API and scripts.
- **Frontend** uses Vite, Vue 3, and TanStack Query.

## Examples
- Add a new API route: create a router/controller/service in `api/modules/<domain>/` and register in `api/app.ts`.
- Add a new DB model: update `api/db/schema.ts`, run `bun generate`, update Zod schemas.
- Add a new frontend page: add to `src/pages/`, register in router.

## References
- See `package.json` and `api/package.json` for all scripts.
- See `scripts/utils/README.md` for DB and seeding scripts.
- See `api/db/zod/` for validation patterns.
- See `api/modules/` for route/service structure.

---

For unclear workflows or missing conventions, check for scripts in `scripts/` and `api/`, or ask a maintainer.
