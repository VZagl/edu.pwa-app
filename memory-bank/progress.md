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

## [2026-08-10]: step-home-lesson-ui — ЗАВЕРШЕНО

Экран «Главная» заменён с `LessonStubScreen` на «Карту лаборатории»: intro, модули из `lessonRoutes`, краткий чеклист PWA, «Как пользоваться», «Почему HTTPS». TDD: 5 unit-тестов, E2E `home-lesson.spec.ts`. Verify: lint ✅, build ✅, unit 64 ✅, e2e 13 ✅.

**Completed:** [memory-bank/completed-tasks/2026/08/step-home-lesson-ui_2026-08-10.md](completed-tasks/2026/08/step-home-lesson-ui_2026-08-10.md)
