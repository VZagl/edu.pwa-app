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
| Экран урока Manifest (step-manifest-lesson-ui) | 🔨 BUILD ✅ (2026-08-03)        |
| SW / Offline / Install                         | ⏳ Не начато                    |

## [2026-08-03]: step-manifest-lesson-ui — BUILD

Экран урока «Manifest»: объяснение + fetch `/manifest.webmanifest` + `<dl>` с MVP-полями. TDD: `fetchManifest.test.ts`, `ManifestScreen.test.tsx`, `e2e/manifest-lesson.spec.ts`.

**Файлы:**

- `src/screens/ManifestScreen/types.ts` — типы по config-schema
- `src/screens/ManifestScreen/fetchManifest.ts` — pure fetch + parse
- `src/screens/ManifestScreen/ManifestScreen.tsx` — экран с loading/error/success
- `src/screens/ManifestScreen/ManifestScreen.scss` — стили BEM
- `e2e/manifest-lesson.spec.ts` — E2E сценарий урока

**Verify:** lint ✅, build ✅, test (14) ✅, e2e (5) ✅

## [2026-08-03]: step-web-app-manifest — ЗАВЕРШЕНО

Web App Manifest по `config-schema.md`. TDD: `e2e/web-app-manifest.spec.ts` (red → green). Реализация: `public/manifest.webmanifest`, иконки книга + edu/PWA (`icon-192.png`, `icon-512.png`), подключение в `index.html`.

**Verify:** lint ✅, build ✅, test (8) ✅, e2e (4) ✅

**Completed:** [memory-bank/completed-tasks/2026/08/step-web-app-manifest_2026-08-03.md](completed-tasks/2026/08/step-web-app-manifest_2026-08-03.md)
