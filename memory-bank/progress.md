# Memory Bank: Progress

## Статус проекта

| Область                            | Состояние                                        |
| ---------------------------------- | ------------------------------------------------ |
| Репозиторий Vite + React + TS      | ✅ Готов (2026-07-23)                            |
| Memory Bank (ядро)                 | ✅ Инициализирован (2026-07-24)                  |
| Vitest (step-test-environment)     | ✅ BUILD complete (`feat/step-test-environment`) |
| Playwright (step-playwright-setup) | ⏳ В backlog (средний)                           |
| Каркас UI (step-app-shell)         | ⏳ В backlog (блокирован фазой 0)                |
| Навигация уроков                   | ⏳ Не начато                                     |
| Manifest / SW / Offline / Install  | ⏳ Не начато                                     |

## Последняя завершённая задача

(нет — история будет в `memory-bank/completed-tasks/`)

## Вехи (кратко)

| Дата       | Событие                                                              | Статус |
| ---------- | -------------------------------------------------------------------- | ------ |
| 2026-07-23 | Инициализация репозитория, адаптация docs под учебное PWA            | ✅     |
| 2026-07-24 | Инициализация Memory Bank; TDD + фаза 0 (Vitest/Playwright) в планах | ✅     |
| 2026-07-30 | BUILD: Vitest + Testing Library + jsdom (`step-test-environment`)    | ✅     |

## Build: step-test-environment (2026-07-30)

- **Файлы:** `vite.config.ts`, `vitest.setup.ts`, `src/test-environment.test.ts`, `package.json`, `tsconfig.app.json`, `pnpm-lock.yaml`
- **Deps:** vitest `^4.1.10`, jsdom `^30.0.1`, @testing-library/react/jest-dom/user-event
- **Testing:** `pnpm test --run` — 2 passed; lint/build — OK
- **Docs:** `testing-guidelines-frontend.md` без правок (совпадает с конфигом)
- **Next:** `/reflect`

Полный журнал продуктовых вех: `docs/project/product-roadmap.md` §9.
