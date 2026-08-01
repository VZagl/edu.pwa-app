# Memory Bank: Progress

## Статус проекта

| Область                            | Состояние                                                 |
| ---------------------------------- | --------------------------------------------------------- |
| Репозиторий Vite + React + TS      | ✅ Готов (2026-07-23)                                     |
| Memory Bank (ядро)                 | ✅ Инициализирован (2026-07-24)                           |
| Vitest (step-test-environment)     | ✅ ЗАВЕРШЕНО (2026-07-30)                                 |
| Playwright (step-playwright-setup) | ✅ ЗАВЕРШЕНО (2026-07-30)                                 |
| Каркас UI (step-app-shell)         | 🔄 В работе (VAN QA → BUILD), ветка `feat/step-app-shell` |
| Навигация уроков                   | ⏳ Не начато                                              |
| Manifest / SW / Offline / Install  | ⏳ Не начато                                              |

## [2026-08-01]: step-app-shell — creative phase (CREATIVE)

Design decisions зафиксированы: stacked layout (header → nav → main), NavLink «Главная», SCSS `index.scss` + `App.scss` (BEM `app-shell__*`), маршруты `/` + catch-all 404. Документ: `memory-bank/creative/creative-app-shell.md`. Следующий шаг: VAN QA → `/build`.

## [2026-08-01]: step-app-shell — планирование (PLAN)

Детальный план реализации Level 2: оболочка header/nav/main, React Router (library mode), миграция CSS→SCSS, TDD (`App.test.tsx` + E2E smoke). `BrowserRouter` в `main.tsx`, один маршрут `/`. Creative phases: layout, nav, SCSS. Следующий шаг: `/creative`.

## [2026-08-01]: step-app-shell — инициализация (VAN)

Задача взята из backlog. Создана feature-ветка `feat/step-app-shell` от `develop`. Complexity Level 2. Навигация — React Router (установка на VAN QA).

## [2026-07-30]: step-playwright-setup — ЗАВЕРШЕНО

Подключён Playwright E2E: `@playwright/test@1.62.0`, `playwright.config.ts` (webServer: build+preview), `e2e/smoke.spec.ts`, скрипты `test:e2e` / `test:e2e:install`. Vitest ограничен `src/**`. Verify: E2E smoke, Vitest, lint, build — OK. Фаза 0 закрыта.

**Completed:** [memory-bank/completed-tasks/2026/07/step-playwright-setup_2026-07-30.md](memory-bank/completed-tasks/2026/07/step-playwright-setup_2026-07-30.md)

## Вехи (кратко)

| Дата       | Событие                                                              | Статус |
| ---------- | -------------------------------------------------------------------- | ------ |
| 2026-07-23 | Инициализация репозитория, адаптация docs под учебное PWA            | ✅     |
| 2026-07-24 | Инициализация Memory Bank; TDD + фаза 0 (Vitest/Playwright) в планах | ✅     |
| 2026-07-30 | Закрыт `step-test-environment` (Vitest)                              | ✅     |
| 2026-07-30 | Закрыт `step-playwright-setup` (Playwright); фаза 0 завершена        | ✅     |
| 2026-08-01 | Старт `step-app-shell`; ветка `feat/step-app-shell`                  | 🔄     |
| 2026-08-01 | CREATIVE `step-app-shell` завершён; следующий — VAN QA → `/build`    | ✅     |
| 2026-08-01 | PLAN `step-app-shell` завершён; следующий — `/creative`              | ✅     |

Полный журнал продуктовых вех: `docs/project/product-roadmap.md` §9.
