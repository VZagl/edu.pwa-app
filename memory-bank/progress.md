# Memory Bank: Progress

## Статус проекта

| Область                                  | Состояние                       |
| ---------------------------------------- | ------------------------------- |
| Репозиторий Vite + React + TS            | ✅ Готов (2026-07-23)           |
| Memory Bank (ядро)                       | ✅ Инициализирован (2026-07-24) |
| Vitest (step-test-environment)           | ✅ ЗАВЕРШЕНО (2026-07-30)       |
| Playwright (step-playwright-setup)       | ✅ ЗАВЕРШЕНО (2026-07-30)       |
| Каркас UI (step-app-shell)               | ✅ ЗАВЕРШЕНО (2026-08-01)       |
| Навигация уроков                         | ✅ ЗАВЕРШЕНО (2026-08-03)       |
| Web App Manifest (step-web-app-manifest) | 🔄 В работе (2026-08-03)        |
| SW / Offline / Install                   | ⏳ Не начато                    |

## [2026-08-03]: step-lessons-navigation — ЗАВЕРШЕНО

Навигация по 5 учебным разделам (Главная + Manifest, Service Worker, Offline, Install). TDD: расширен `App.test.tsx`, добавлен `e2e/lessons-navigation.spec.ts`. Реализация: `LessonStubScreen`, экраны в `src/screens/`, конфиг `src/routes/lessonRoutes.ts`, рефакторинг `App.tsx`, horizontal scroll nav. Удалён `router-poc.test.tsx`.

**Verify:** lint ✅, build ✅, test (8) ✅, e2e (2) ✅

**Completed:** [memory-bank/completed-tasks/2026/08/step-lessons-navigation_2026-08-03.md](completed-tasks/2026/08/step-lessons-navigation_2026-08-03.md)
