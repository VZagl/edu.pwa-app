# Level 2 Enhancement Reflection: Playwright E2E-окружение

**Task ID:** `step-playwright-setup`  
**Дата рефлексии:** 2026-07-30  
**Ветка:** `feat/step-playwright-setup`

## Enhancement Summary

Подключён E2E-слой фазы 0: `@playwright/test@1.62.0`, `playwright.config.ts` (webServer: build+preview, baseURL 4173), `e2e/smoke.spec.ts` (title + `#root`), скрипты `test:e2e` / `test:e2e:install`. Vitest ограничен `src/**` — `e2e/` не подхватывается unit-раннером. Verify: E2E smoke, Vitest, lint, build — OK. Docs: `run-and-build.md`, `techContext.md`.

## What Went Well

- TDD red → green: smoke spec до инфраструктуры, затем deps + config — E2E подтверждён сразу.
- Узкий smoke: `title` из `index.html` + `#root`, без привязки к шаблонному UI Vite — переживёт `step-app-shell`.
- План из рефлексии Vitest-шага (узкий smoke, docs только при расхождении) сработал повторно.
- `webServer` с `pnpm build && pnpm preview` и `timeout: 120_000` — cold start проходит стабильно.
- `testing-guidelines-frontend.md` не менялся — конфиг совпал с guidelines.

## Challenges Encountered

- Vitest по умолчанию подхватывал `e2e/*.spec.ts` — конфликт двух test-раннеров.
- Preview требует предварительной сборки — webServer должен включать build.
- Первая установка без браузеров — Playwright не запускается без `playwright install`.

## Solutions Applied

- Vitest `include: ['src/**/*.{test,spec}...']` в `vite.config.ts` — явное разделение слоёв.
- `webServer.command`: `pnpm build && pnpm preview`; `timeout: 120_000`.
- Скрипт `test:e2e:install` + документирование в `run-and-build.md`.
- `playwright.config.ts` добавлен в `tsconfig.node.json` `include`.

## Key Technical Insights

- Разделение test-раннеров: Vitest — `src/**`, Playwright — `e2e/`; без явного `include` Vitest подхватит E2E-спеки.
- E2E на preview ближе к production/PWA, чем dev с HMR.
- Smoke E2E: стабильные селекторы (`title`, `#root`), не тексты компонентов.
- `reuseExistingServer: !process.env.CI` ускоряет локальные повторные прогоны.

## Process Insights

- Level 2 без CREATIVE уместен при зафиксированном стеке в guidelines.
- Перенос уроков из предыдущей рефлексии (`step-test-environment`) сократил PLAN и BUILD.
- Отдельный скрипт установки браузеров — must-have для onboarding и CI.

## Action Items for Future Work

- `/close-task` — финализация `step-playwright-setup`.
- Следующий backlog: `step-app-shell` (фаза 0 UI).
- В продуктовых E2E — `getByRole` / data-testid; Firefox/WebKit — по необходимости.
- CI: кэш `dist` и кэш браузеров Playwright — вне scope, но ускорит pipeline.

## Time Estimation Accuracy

- Estimated time: ~1–1.5 ч (из PLAN)
- Actual time: одна BUILD-сессия (2026-07-30)
- Variance: в пределах оценки
- Reason: объём совпал с чеклистом; единственное отклонение — fix Vitest `include`
