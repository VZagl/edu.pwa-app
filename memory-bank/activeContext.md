# Active Context

## Current Focus

`step-playwright-setup` — подключение Playwright E2E (фаза 0, Order: 0.1.2).

**Git Branch:** `feat/step-playwright-setup` (из `develop`)

## Current Mode

PLAN COMPLETE → следующий шаг: `/build`

## Complexity

Level 2 — Simple Enhancement (как `step-test-environment`).

## Next Steps

1. Запустить `/build` — TDD: `e2e/smoke.spec.ts` (red) → deps + `playwright.config.ts` + `test:e2e` / `test:e2e:install` (green) → verify.
2. CREATIVE **не требуется** — стек в `testing-guidelines-frontend.md`.
3. После BUILD — `/reflect`, затем `/close-task`; merge в `develop` через `/git-merge-to-develop` (по запросу).

## Context for AI

Учебный PWA на React + Vite (frontend only). Менеджер пакетов — **pnpm**. Vitest закрыт.

**PLAN-решения:**

- `webServer`: `pnpm build && pnpm preview`, baseURL `http://localhost:4173`
- Smoke: title `edu.pwa-app` + `#root` видим (без текстов шаблонного `App.tsx`)
- Один проект Chromium; `describe`/`it` на русском
- Скрипты: `test:e2e`, `test:e2e:install` (`playwright install chromium`)
- Docs: `run-and-build.md` — убрать оговорку, добавить `test:e2e:install`; guidelines — только при расхождении

Все коммиты задачи — только в `feat/step-playwright-setup`.
