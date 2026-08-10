# Memory Bank: Progress

## Статус проекта

| Область                                                  | Состояние                                 |
| -------------------------------------------------------- | ----------------------------------------- |
| Репозиторий Vite + React + TS                            | ✅ Готов (2026-07-23)                     |
| Memory Bank (ядро)                                       | ✅ Инициализирован (2026-07-24)           |
| Vitest (step-test-environment)                           | ✅ ЗАВЕРШЕНО (2026-07-30)                 |
| Playwright (step-playwright-setup)                       | ✅ ЗАВЕРШЕНО (2026-07-30)                 |
| Каркас UI (step-app-shell)                               | ✅ ЗАВЕРШЕНО (2026-08-01)                 |
| Навигация уроков                                         | ✅ ЗАВЕРШЕНО (2026-08-03)                 |
| Web App Manifest (step-web-app-manifest)                 | ✅ ЗАВЕРШЕНО (2026-08-03)                 |
| Экран урока Manifest (step-manifest-lesson-ui)           | ✅ ЗАВЕРШЕНО (2026-08-03)                 |
| SW регистрация (step-service-worker-register)            | ✅ ЗАВЕРШЕНО (2026-08-04)                 |
| SW precache / vite-plugin-pwa                            | ✅ ЗАВЕРШЕНО (2026-08-04)                 |
| UX обновления SW (step-sw-update-ux)                     | ✅ ЗАВЕРШЕНО (2026-08-04)                 |
| Offline fallback (step-offline-fallback)                 | ✅ ЗАВЕРШЕНО (2026-08-06)                 |
| Экран урока Offline (step-offline-lesson-ui)             | ✅ ЗАВЕРШЕНО (2026-08-06)                 |
| Install prompt (step-install-prompt)                     | ✅ ЗАВЕРШЕНО (2026-08-06)                 |
| Lighthouse PWA checklist (step-lighthouse-pwa-checklist) | ✅ ЗАВЕРШЕНО (2026-08-07)                 |
| Экран урока Главная (step-home-lesson-ui)                | 🔄 BUILD COMPLETE → /reflect (2026-08-10) |

## [2026-08-10]: step-home-lesson-ui — BUILD COMPLETE

Реализован экран «Карта лаборатории»: intro, модули из `lessonRoutes` (без `/`), краткий чеклист PWA, «Как пользоваться», «Почему HTTPS». Стили BEM по образцу OfflineScreen. TDD: `HomeScreen.test.tsx` (5), E2E `home-lesson.spec.ts`. Обновлены ожидания в App/smoke/lessons-navigation/offline-fallback. Verify: lint ✅, build ✅, unit 64 ✅, e2e 13 ✅. Следующий шаг: `/reflect`.

## [2026-08-07]: step-lighthouse-pwa-checklist — ЗАВЕРШЕНО

Чеклист `docs/project/pwa-checklist.md`: Lighthouse PWA audit, Application panel, установка, offline, troubleshooting, регрессия. Перекрёстные ссылки в README, tech-stack-pwa, run-and-build. Код не менялся. Verify: lint ✅, build ✅, unit 59 ✅, e2e 12 ✅.

**Completed:** [memory-bank/completed-tasks/2026/08/step-lighthouse-pwa-checklist_2026-08-07.md](completed-tasks/2026/08/step-lighthouse-pwa-checklist_2026-08-07.md)
