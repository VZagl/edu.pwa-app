# Memory Bank: Progress

## Статус проекта

| Область                                                  | Состояние                                                                  |
| -------------------------------------------------------- | -------------------------------------------------------------------------- |
| Репозиторий Vite + React + TS                            | ✅ Готов (2026-07-23)                                                      |
| Memory Bank (ядро)                                       | ✅ Инициализирован (2026-07-24)                                            |
| Vitest (step-test-environment)                           | ✅ ЗАВЕРШЕНО (2026-07-30)                                                  |
| Playwright (step-playwright-setup)                       | ✅ ЗАВЕРШЕНО (2026-07-30)                                                  |
| Каркас UI (step-app-shell)                               | ✅ ЗАВЕРШЕНО (2026-08-01)                                                  |
| Навигация уроков                                         | ✅ ЗАВЕРШЕНО (2026-08-03)                                                  |
| Web App Manifest (step-web-app-manifest)                 | ✅ ЗАВЕРШЕНО (2026-08-03)                                                  |
| Экран урока Manifest (step-manifest-lesson-ui)           | ✅ ЗАВЕРШЕНО (2026-08-03)                                                  |
| SW регистрация (step-service-worker-register)            | ✅ ЗАВЕРШЕНО (2026-08-04)                                                  |
| SW precache / vite-plugin-pwa                            | ✅ ЗАВЕРШЕНО (2026-08-04)                                                  |
| UX обновления SW (step-sw-update-ux)                     | ✅ ЗАВЕРШЕНО (2026-08-04)                                                  |
| Offline fallback (step-offline-fallback)                 | ✅ ЗАВЕРШЕНО (2026-08-06)                                                  |
| Экран урока offline (step-offline-lesson-ui)             | ✅ ЗАВЕРШЕНО (2026-08-06)                                                  |
| Install prompt (step-install-prompt)                     | ✅ ЗАВЕРШЕНО (2026-08-06)                                                  |
| Lighthouse PWA checklist (step-lighthouse-pwa-checklist) | ✅ ЗАВЕРШЕНО (2026-08-07)                                                  |
| Экран урока Главная (step-home-lesson-ui)                | ✅ ЗАВЕРШЕНО (2026-08-10)                                                  |
| Экран урока Service Worker (step-sw-lesson-ui)           | ✅ ЗАВЕРШЕНО (2026-08-10)                                                  |
| Экран урока Install (step-install-lesson-ui)             | ✅ ЗАВЕРШЕНО (2026-08-11)                                                  |
| Cache Storage урок (step-cache-storage-lesson-ui)        | 🔄 BUILD complete → `/reflect` (ветка `feat/step-cache-storage-lesson-ui`) |

## [2026-08-11]: step-cache-storage-lesson-ui — BUILD complete

Реализован раздел `/cache-storage`: хук `useCacheStorage` (`readCacheNames` / `readCacheUrls`, refresh, selectCache), экран с секциями intro / API / демо живых кэшей / Workbox / DevTools, маршрут в `lessonRoutes`. TDD: unit хука и экрана; E2E урок + навигация. Verify: lint ✅, typecheck ✅, unit 106 ✅, build ✅, e2e ✅. Следующий шаг — `/reflect`.

## [2026-08-11]: step-cache-storage-lesson-ui — PLAN complete

Детальный план Level 2: хук `useCacheStorage`, экран `CacheStorageScreen` (intro / API / демо / Workbox / DevTools), маршрут `/cache-storage`, unit + E2E. CREATIVE не требуется. Следующий шаг — `/build` (TDD).

## [2026-08-11]: step-cache-storage-lesson-ui — СТАРТ (VAN)

Инициализация Level 2: feature-ветка `feat/step-cache-storage-lesson-ui`, Memory Bank обновлён. Следующий шаг — `/plan`.

## [2026-08-11]: step-install-lesson-ui — ЗАВЕРШЕНО

Экран «Установка PWA» заменён с `LessonStubScreen` на полноценный учебный раздел: intro, условия installability, живое демо (`useInstallPrompt`: canInstall / fallback / installed), display-mode, инструкции по платформам, DevTools, связь с `InstallBanner`. TDD: 9 unit + E2E. Verify: lint ✅, unit 88 ✅, build ✅, e2e install-lesson ✅.

**Completed:** [memory-bank/completed-tasks/2026/08/step-install-lesson-ui_2026-08-11.md](completed-tasks/2026/08/step-install-lesson-ui_2026-08-11.md)
