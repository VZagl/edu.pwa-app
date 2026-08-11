# Memory Bank: Progress

## Статус проекта

| Область                                                  | Состояние                        |
| -------------------------------------------------------- | -------------------------------- |
| Репозиторий Vite + React + TS                            | ✅ Готов (2026-07-23)            |
| Memory Bank (ядро)                                       | ✅ Инициализирован (2026-07-24)  |
| Vitest (step-test-environment)                           | ✅ ЗАВЕРШЕНО (2026-07-30)        |
| Playwright (step-playwright-setup)                       | ✅ ЗАВЕРШЕНО (2026-07-30)        |
| Каркас UI (step-app-shell)                               | ✅ ЗАВЕРШЕНО (2026-08-01)        |
| Навигация уроков                                         | ✅ ЗАВЕРШЕНО (2026-08-03)        |
| Web App Manifest (step-web-app-manifest)                 | ✅ ЗАВЕРШЕНО (2026-08-03)        |
| Экран урока Manifest (step-manifest-lesson-ui)           | ✅ ЗАВЕРШЕНО (2026-08-03)        |
| SW регистрация (step-service-worker-register)            | ✅ ЗАВЕРШЕНО (2026-08-04)        |
| SW precache / vite-plugin-pwa                            | ✅ ЗАВЕРШЕНО (2026-08-04)        |
| UX обновления SW (step-sw-update-ux)                     | ✅ ЗАВЕРШЕНО (2026-08-04)        |
| Offline fallback (step-offline-fallback)                 | ✅ ЗАВЕРШЕНО (2026-08-06)        |
| Экран урока offline (step-offline-lesson-ui)             | ✅ ЗАВЕРШЕНО (2026-08-06)        |
| Install prompt (step-install-prompt)                     | ✅ ЗАВЕРШЕНО (2026-08-06)        |
| Lighthouse PWA checklist (step-lighthouse-pwa-checklist) | ✅ ЗАВЕРШЕНО (2026-08-07)        |
| Экран урока Главная (step-home-lesson-ui)                | ✅ ЗАВЕРШЕНО (2026-08-10)        |
| Экран урока Service Worker (step-sw-lesson-ui)           | ✅ ЗАВЕРШЕНО (2026-08-10)        |
| Экран урока Install (step-install-lesson-ui)             | ✅ ЗАВЕРШЕНО (2026-08-11)        |
| Cache Storage урок (step-cache-storage-lesson-ui)        | ✅ ЗАВЕРШЕНО (2026-08-11)        |
| Storage quota урок (step-storage-quota-lesson-ui)        | ✅ ЗАВЕРШЕНО (2026-08-11)        |
| Web Push урок (step-push-notifications)                  | ✅ ЗАВЕРШЕНО (2026-08-11)        |
| Версия в header (step-app-version-header)                | 🔄 REFLECT COMPLETE (2026-08-11) |

## [2026-08-11]: step-app-version-header — REFLECT COMPLETE

Рефлексия L2: [reflection/reflection-step-app-version-header.md](reflection/reflection-step-app-version-header.md). Версия из `package.json` → Vite `define` → `appVersion.ts` → header. TDD + verify OK. Далее: `/close-task`.

## [2026-08-11]: step-app-version-header — BUILD COMPLETE

Версия из `package.json` проброшена через Vite `define` (`__APP_VERSION__`) и `src/appVersion.ts`; в `app-shell__header` справа от названия. TDD: unit header + версия. Verify: lint ✅, typecheck ✅, unit 145 ✅, build ✅.

## [2026-08-11]: step-push-notifications — ЗАВЕРШЕНО

Учебный раздел `/push`: гибрид Web Push без backend; SW через `importScripts`; lesson-ui + TDD; E2E без grant. Verify: lint ✅, typecheck ✅, unit 145 ✅, build ✅, e2e 18 ✅.

**Completed:** [memory-bank/completed-tasks/2026/08/step-push-notifications_2026-08-11.md](completed-tasks/2026/08/step-push-notifications_2026-08-11.md)
