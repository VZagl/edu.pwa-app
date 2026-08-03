# Memory Bank: Progress

## Статус проекта

| Область                            | Состояние                               |
| ---------------------------------- | --------------------------------------- |
| Репозиторий Vite + React + TS      | ✅ Готов (2026-07-23)                   |
| Memory Bank (ядро)                 | ✅ Инициализирован (2026-07-24)         |
| Vitest (step-test-environment)     | ✅ ЗАВЕРШЕНО (2026-07-30)               |
| Playwright (step-playwright-setup) | ✅ ЗАВЕРШЕНО (2026-07-30)               |
| Каркас UI (step-app-shell)         | ✅ ЗАВЕРШЕНО (2026-08-01)               |
| Навигация уроков                   | ✅ ARCHIVED (`step-lessons-navigation`) |
| Manifest / SW / Offline / Install  | ⏳ Не начато                            |

## [2026-08-01]: step-app-shell — ЗАВЕРШЕНО

Заменён шаблон Vite на учебную оболочку PWA: stacked layout, React Router v8, SCSS, маршруты `/` + 404. TDD: `App.test.tsx`, E2E smoke. Verify: lint, build, test (6), e2e — OK.

**Completed:** [memory-bank/completed-tasks/2026/07/step-app-shell_2026-08-01.md](completed-tasks/2026/07/step-app-shell_2026-08-01.md)

## [2026-08-03]: step-lessons-navigation — ARCHIVED

Навигация по 5 учебным разделам (Главная + Manifest, Service Worker, Offline, Install). TDD: расширен `App.test.tsx`, добавлен `e2e/lessons-navigation.spec.ts`. Реализация: `LessonStubScreen`, экраны в `src/screens/`, конфиг `src/routes/lessonRoutes.ts`, рефакторинг `App.tsx`, horizontal scroll nav. Удалён `router-poc.test.tsx`.

**Verify:** lint ✅, build ✅, test (8) ✅, e2e (2) ✅

**Archive:** [memory-bank/archive/archive-step-lessons-navigation.md](archive/archive-step-lessons-navigation.md)
