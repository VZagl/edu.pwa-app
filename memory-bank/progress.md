# Memory Bank: Progress

## Статус проекта

| Область                                        | Состояние                                           |
| ---------------------------------------------- | --------------------------------------------------- |
| Репозиторий Vite + React + TS                  | ✅ Готов (2026-07-23)                               |
| Memory Bank (ядро)                             | ✅ Инициализирован (2026-07-24)                     |
| Vitest (step-test-environment)                 | ✅ ЗАВЕРШЕНО (2026-07-30)                           |
| Playwright (step-playwright-setup)             | ✅ ЗАВЕРШЕНО (2026-07-30)                           |
| Каркас UI (step-app-shell)                     | ✅ ЗАВЕРШЕНО (2026-08-01)                           |
| Навигация уроков                               | ✅ ЗАВЕРШЕНО (2026-08-03)                           |
| Web App Manifest (step-web-app-manifest)       | ✅ ЗАВЕРШЕНО (2026-08-03)                           |
| Экран урока Manifest (step-manifest-lesson-ui) | ✅ ЗАВЕРШЕНО (2026-08-03)                           |
| SW / Offline / Install                         | ⏳ В работе (step-service-worker-register BUILD ✅) |

## [2026-08-04]: step-service-worker-register — BUILD

Регистрация Service Worker: `public/sw.js` (install/activate + логи), `src/pwa/registerSw.ts`, вызов из `main.tsx`. TDD: `registerSw.test.ts` (2 теста). Verify: lint ✅, build ✅, test (16) ✅; `dist/sw.js` в сборке.

**Файлы:**

- `src/pwa/registerSw.test.ts` — создан
- `src/pwa/registerSw.ts` — создан
- `public/sw.js` — создан
- `src/main.tsx` — вызов `registerSw()`

**Next:** `/reflect`, ручная проверка SW в DevTools

## [2026-08-03]: step-manifest-lesson-ui — ЗАВЕРШЕНО

Экран урока «Manifest»: объяснение + fetch `/manifest.webmanifest` + `<dl>` с MVP-полями. TDD: `fetchManifest.test.ts`, `ManifestScreen.test.tsx`, `e2e/manifest-lesson.spec.ts`. Verify: lint ✅, build ✅, test (14) ✅, e2e (5) ✅.

**Completed:** [memory-bank/completed-tasks/2026/08/step-manifest-lesson-ui_2026-08-03.md](completed-tasks/2026/08/step-manifest-lesson-ui_2026-08-03.md)
