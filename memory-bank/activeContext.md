# Active Context

## Current Focus

`step-playwright-setup` — подключение Playwright E2E (фаза 0, Order: 0.1.2).

**Git Branch:** `feat/step-playwright-setup` (из `develop`)

## Current Mode

VAN COMPLETE → следующий шаг: `/plan`

## Complexity

Level 2 — Simple Enhancement (как `step-test-environment`).

## Next Steps

1. Запустить `/plan` — детальный план (зависимости, `webServer`, smoke, docs).
2. После PLAN — `/build` (TDD: smoke E2E → green → verify).
3. CREATIVE не требуется: стек и предпочтения уже в `testing-guidelines-frontend.md`.
4. После REFLECT — `/close-task`; merge в `develop` через `/git-merge-to-develop` (по запросу).

## Context for AI

Учебный PWA на React + Vite (frontend only). Менеджер пакетов — **pnpm**. Vitest закрыт. В `package.json` пока нет Playwright / `test:e2e`. Guidelines: `webServer` предпочтительно на `pnpm preview`; тесты в `e2e/*.spec.ts`; `describe`/`it` на русском. Все коммиты задачи — только в `feat/step-playwright-setup`.
