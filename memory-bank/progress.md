# Memory Bank: Progress

## Статус проекта

| Область                            | Состояние                         |
| ---------------------------------- | --------------------------------- |
| Репозиторий Vite + React + TS      | ✅ Готов (2026-07-23)             |
| Memory Bank (ядро)                 | ✅ Инициализирован (2026-07-24)   |
| Vitest (step-test-environment)     | ✅ ЗАВЕРШЕНО (2026-07-30)         |
| Playwright (step-playwright-setup) | 🔄 VAN → PLAN (2026-07-30)        |
| Каркас UI (step-app-shell)         | ⏳ В backlog (блокирован фазой 0) |
| Навигация уроков                   | ⏳ Не начато                      |
| Manifest / SW / Offline / Install  | ⏳ Не начато                      |

## [2026-07-30]: step-playwright-setup — VAN INIT

Инициализирована задача Playwright E2E (Level 2). Зависимость Vitest закрыта. Ожидается `/plan`.

## [2026-07-30]: step-test-environment — ЗАВЕРШЕНО

Подключено окружение unit/integration-тестов (Vitest + Testing Library + jsdom); smoke без `App`; verify OK.

**Completed:** [memory-bank/completed-tasks/2026/07/step-test-environment_2026-07-30.md](memory-bank/completed-tasks/2026/07/step-test-environment_2026-07-30.md)

## Вехи (кратко)

| Дата       | Событие                                                              | Статус |
| ---------- | -------------------------------------------------------------------- | ------ |
| 2026-07-23 | Инициализация репозитория, адаптация docs под учебное PWA            | ✅     |
| 2026-07-24 | Инициализация Memory Bank; TDD + фаза 0 (Vitest/Playwright) в планах | ✅     |
| 2026-07-30 | Закрыт `step-test-environment` (Vitest)                              | ✅     |

Полный журнал продуктовых вех: `docs/project/product-roadmap.md` §9.
