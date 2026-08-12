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
| Удаление LessonStubScreen (step-remove-lesson-stub)      | 🔨 BUILD COMPLETE (2026-08-12)  |

## [2026-08-12]: step-remove-lesson-stub — BUILD COMPLETE

Cleanup: удалён мёртвый `src/components/LessonStubScreen/` (временный layout из `step-lessons-navigation`). Импортов в `src/`/`e2e` не было. Verify: lint ✅, build ✅, unit 155 ✅. Далее: `/reflect` → `/close-task`.

## [2026-08-12]: step-sw-update-apply-fast — ЗАВЕРШЕНО

Ускорение UX применения обновления PWA: in-flight `isApplying`, одноразовый `applySwUpdate`, проактивный `registration.update()` (visibility/focus/online + интервал 60м), баннер «Обновляется…», docs про CDN `sw.js` на GitHub Pages. Verify: lint / test / build ✅. Ручная проверка mobile — после деплоя.

**Completed:** [memory-bank/completed-tasks/2026/08/step-sw-update-apply-fast_2026-08-12.md](completed-tasks/2026/08/step-sw-update-apply-fast_2026-08-12.md)
