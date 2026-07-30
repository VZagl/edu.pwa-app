# Memory Bank: Progress

## Статус проекта

| Область                            | Состояние                       |
| ---------------------------------- | ------------------------------- |
| Репозиторий Vite + React + TS      | ✅ Готов (2026-07-23)           |
| Memory Bank (ядро)                 | ✅ Инициализирован (2026-07-24) |
| Vitest (step-test-environment)     | ✅ ЗАВЕРШЕНО (2026-07-30)       |
| Playwright (step-playwright-setup) | ✅ ЗАВЕРШЕНО (2026-07-30)       |
| Каркас UI (step-app-shell)         | ⏳ В backlog (Высокий)          |
| Навигация уроков                   | ⏳ Не начато                    |
| Manifest / SW / Offline / Install  | ⏳ Не начато                    |

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

Полный журнал продуктовых вех: `docs/project/product-roadmap.md` §9.
