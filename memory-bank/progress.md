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
| Экран урока offline (step-offline-lesson-ui)             | ✅ ЗАВЕРШЕНО (2026-08-06)       |
| Install prompt (step-install-prompt)                     | ✅ ЗАВЕРШЕНО (2026-08-06)       |
| Lighthouse PWA checklist (step-lighthouse-pwa-checklist) | ✅ ЗАВЕРШЕНО (2026-08-07)       |
| Экран урока Главная (step-home-lesson-ui)                | ✅ ЗАВЕРШЕНО (2026-08-10)       |
| Экран урока Service Worker (step-sw-lesson-ui)           | ✅ ЗАВЕРШЕНО (2026-08-10)       |
| Экран урока Install (step-install-lesson-ui)             | ✅ ЗАВЕРШЕНО (2026-08-11)       |
| Cache Storage урок (step-cache-storage-lesson-ui)        | ✅ ЗАВЕРШЕНО (2026-08-11)       |
| Storage quota урок (step-storage-quota-lesson-ui)        | ✅ ЗАВЕРШЕНО (2026-08-11)       |
| Web Push урок (step-push-notifications)                  | ✅ ЗАВЕРШЕНО (2026-08-11)       |
| Версия в header (step-app-version-header)                | ✅ ЗАВЕРШЕНО (2026-08-11)       |
| GitHub Pages deploy (step-github-pages-deploy)           | ✅ ЗАВЕРШЕНО (2026-08-11)       |
| Быстрый apply SW update (step-sw-update-apply-fast)      | ✅ ЗАВЕРШЕНО (2026-08-12)       |
| Удаление LessonStubScreen (step-remove-lesson-stub)      | ✅ ЗАВЕРШЕНО (2026-08-12)       |
| Прогресс precache SW (step-sw-update-download-progress)  | ✅ ЗАВЕРШЕНО (2026-08-12)       |
| README для ученика (step-readme-learner-guide)           | 🔄 В работе (2026-08-12)        |

## [2026-08-12]: step-readme-learner-guide — PLAN complete

План README зафиксирован (Level 2, docs-only). Рекомендуемый старт ученика: `build` + `preview`, не `dev`. Creative не нужен. Следующий шаг: `/build`.

## [2026-08-12]: step-readme-learner-guide — В РАБОТЕ

VAN: ветка `feat/step-readme-learner-guide`, Level 2.

## [2026-08-12]: step-sw-update-download-progress — ЗАВЕРШЕНО

Индикатор фонового install/precache (indeterminate) → «Обновить» → «Обновляется…». Lifecycle клиента в `swUpdateController`; UI в `SwUpdateBanner`. Verify: lint ✅, typecheck ✅, unit 164 ✅, build ✅.

**Completed:** [memory-bank/completed-tasks/2026/08/step-sw-update-download-progress_2026-08-12.md](completed-tasks/2026/08/step-sw-update-download-progress_2026-08-12.md)
