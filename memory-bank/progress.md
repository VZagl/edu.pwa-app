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
| Storage quota урок (step-storage-quota-lesson-ui)        | 🔄 REFLECT complete (2026-08-11) |

## [2026-08-11]: step-storage-quota-lesson-ui — REFLECT complete

Добавлен учебный раздел `/storage`: квоты (`estimate` usage/quota), Persistent Storage (`persisted` / `persist`), лимиты/вытеснение, DevTools, ссылка на Cache Storage. Хук `useStorageQuota`, экран `StorageScreen` (BEM). TDD: unit (моки `navigator.storage` + мок хука) + E2E. Verify: lint ✅, typecheck ✅, unit ✅, build ✅, e2e ✅.

**Reflection:** [memory-bank/reflection/reflection-step-storage-quota-lesson-ui.md](reflection/reflection-step-storage-quota-lesson-ui.md)

**Next:** `/close-task` (без `/archive`)

## [2026-08-11]: step-cache-storage-lesson-ui — ЗАВЕРШЕНО

Добавлен учебный раздел `/cache-storage`: описание Cache Storage API и живой блок (`caches.keys()`, выбор кэша, URL, «Обновить»). Хук `useCacheStorage`, экран с регионами intro / API / демо / Workbox / DevTools. TDD: unit + E2E. Verify: lint ✅, typecheck ✅, unit 106 ✅, build ✅, e2e ✅.

**Completed:** [memory-bank/completed-tasks/2026/08/step-cache-storage-lesson-ui_2026-08-11.md](completed-tasks/2026/08/step-cache-storage-lesson-ui_2026-08-11.md)
