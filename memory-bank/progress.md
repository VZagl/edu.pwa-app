# Memory Bank: Progress

## Статус проекта

| Область                                        | Состояние                       |
| ---------------------------------------------- | ------------------------------- |
| Репозиторий Vite + React + TS                  | ✅ Готов (2026-07-23)           |
| Memory Bank (ядро)                             | ✅ Инициализирован (2026-07-24) |
| Vitest (step-test-environment)                 | ✅ ЗАВЕРШЕНО (2026-07-30)       |
| Playwright (step-playwright-setup)             | ✅ ЗАВЕРШЕНО (2026-07-30)       |
| Каркас UI (step-app-shell)                     | ✅ ЗАВЕРШЕНО (2026-08-01)       |
| Навигация уроков                               | ✅ ЗАВЕРШЕНО (2026-08-03)       |
| Web App Manifest (step-web-app-manifest)       | ✅ ЗАВЕРШЕНО (2026-08-03)       |
| Экран урока Manifest (step-manifest-lesson-ui) | ✅ ЗАВЕРШЕНО (2026-08-03)       |
| SW регистрация (step-service-worker-register)  | ✅ ЗАВЕРШЕНО (2026-08-04)       |
| SW precache / vite-plugin-pwa                  | 🔄 В работе (feat/step-vite-plugin-pwa) |

## [2026-08-04]: step-service-worker-register — ЗАВЕРШЕНО

Регистрация Service Worker: `public/sw.js` (install/activate + логи), `src/pwa/registerSw.ts`, вызов из `main.tsx`. TDD: `registerSw.test.ts` (2 теста). Verify: lint ✅, build ✅, test (16) ✅; `dist/sw.js` в сборке.

**Completed:** [memory-bank/completed-tasks/2026/08/step-service-worker-register_2026-08-04.md](completed-tasks/2026/08/step-service-worker-register_2026-08-04.md)
