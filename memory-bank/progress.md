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
| Версия в header (step-app-version-header)                | ✅ ЗАВЕРШЕНО (2026-08-11)        |
| GitHub Pages deploy (step-github-pages-deploy)           | ✅ ЗАВЕРШЕНО (2026-08-11)        |
| Быстрый apply SW update (step-sw-update-apply-fast)      | 🔄 REFLECT COMPLETE (2026-08-12) |

## [2026-08-12]: step-sw-update-apply-fast — REFLECT COMPLETE

Ускорение UX применения обновления PWA: in-flight `isApplying`, одноразовый `applySwUpdate`, проактивный `registration.update()` (visibility/focus/online + интервал 60м), баннер «Обновляется…», docs про CDN `sw.js` на GitHub Pages.

**Verify:** `pnpm lint` ✅ · `pnpm test --run` ✅ · `pnpm build` ✅  
**Ручная проверка mobile:** открыта (нужен стенд Pages).  
**Reflection:** [memory-bank/reflection/reflection-step-sw-update-apply-fast.md](reflection/reflection-step-sw-update-apply-fast.md)

**Файлы:** `src/pwa/swUpdateController.ts`, `src/hooks/useSwUpdate.ts`, `src/components/SwUpdateBanner/*`, `docs/project/pwa-checklist.md`, `docs/project/run-and-build.md`

## [2026-08-11]: step-github-pages-deploy — ЗАВЕРШЕНО

Деплой project site на GitHub Pages: `base: '/edu.pwa-app/'`, гибрид PWA-путей, workflow pnpm на `develop`, docs. Verify OK; ручная проверка HTTPS — после merge/dispatch.

**Completed:** [memory-bank/completed-tasks/2026/08/step-github-pages-deploy_2026-08-11.md](completed-tasks/2026/08/step-github-pages-deploy_2026-08-11.md)
