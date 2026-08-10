# Memory Bank: Progress

## Статус проекта

| Область                                                  | Состояние                       |
| -------------------------------------------------------- | ------------------------------- |
| Репозиторий Vite + React + TS                            | ✅ Готов (2026-07-23)           |
| Memory Bank (ядро)                                       | ✅ Инициализирован (2026-07-24) |
| Vitest (step-test-environment)                           | ✅ ЗАВЕРШЕНО (2026-07-30)       |
| Playwright (step-playwright-setup)                       | ✅ ЗАВЕРШЕНО (2026-07-30)       |
| Каркас UI (step-app-shell)                               | ✅ ЗАВЕРШЕНО (2026-08-01)       |
| Навигация уроков                                         | ✅ ЗАВЕРШЕНО (2026-08-03)       |
| Web App Manifest (step-web-app-manifest)                 | ✅ ЗАВЕРШЕНО (2026-08-03)       |
| Экран урока Manifest (step-manifest-lesson-ui)           | ✅ ЗАВЕРШЕНО (2026-08-03)       |
| SW регистрация (step-service-worker-register)            | ✅ ЗАВЕРШЕНО (2026-08-04)       |
| SW precache / vite-plugin-pwa                            | ✅ ЗАВЕРШЕНО (2026-08-04)       |
| UX обновления SW (step-sw-update-ux)                     | ✅ ЗАВЕРШЕНО (2026-08-04)       |
| Offline fallback (step-offline-fallback)                 | ✅ ЗАВЕРШЕНО (2026-08-06)       |
| Экран урока Offline (step-offline-lesson-ui)             | ✅ ЗАВЕРШЕНО (2026-08-06)       |
| Install prompt (step-install-prompt)                     | ✅ ЗАВЕРШЕНО (2026-08-06)       |
| Lighthouse PWA checklist (step-lighthouse-pwa-checklist) | ✅ ЗАВЕРШЕНО (2026-08-07)       |
| Экран урока Главная (step-home-lesson-ui)                | ✅ ЗАВЕРШЕНО (2026-08-10)       |
| Экран урока Service Worker (step-sw-lesson-ui)           | ✅ ЗАВЕРШЕНО (2026-08-10)       |
| Экран урока Install (step-install-lesson-ui)             | 🔄 BUILD завершён (2026-08-10)  |

## [2026-08-10]: step-install-lesson-ui — BUILD

Экран «Установка PWA» заменён с `LessonStubScreen` на полноценный учебный раздел: intro, условия installability, живое демо (`useInstallPrompt`: canInstall / fallback / installed), display-mode (`matchMedia`, `navigator.standalone`), инструкции по платформам, DevTools, связь с `InstallBanner`. TDD: 9 unit-тестов экрана, E2E `install-lesson.spec.ts`. Verify: lint ✅, build ✅, unit 88 ✅, e2e install-lesson ✅.

## [2026-08-10]: step-sw-lesson-ui — ЗАВЕРШЕНО

Экран «Service Worker» заменён с `LessonStubScreen` на полноценный учебный раздел: intro, lifecycle, живое демо (`useServiceWorkerInfo`: scope, states, controller, revision/scriptURL), update flow (`useSwUpdate` + `swUpdateController`/`SwUpdateBanner`), кнопка «Сбросить SW и кэш» (`resetServiceWorkerLab`), ссылка на Offline. TDD: 6 unit-тестов хука, 2 unit-теста утилиты, 7 unit-тестов экрана, E2E `sw-lesson.spec.ts`. Verify: lint ✅, build ✅, unit 79 ✅, e2e 14 ✅.

**Completed:** [memory-bank/completed-tasks/2026/08/step-sw-lesson-ui_2026-08-10.md](completed-tasks/2026/08/step-sw-lesson-ui_2026-08-10.md)
