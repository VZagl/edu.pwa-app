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
| Экран урока Manifest (step-manifest-lesson-ui) | ✅ ЗАВЕРШЕНО (2026-08-03)       |
| SW регистрация (step-service-worker-register)  | ✅ ЗАВЕРШЕНО (2026-08-04)       |
| SW precache / vite-plugin-pwa                  | ✅ ЗАВЕРШЕНО (2026-08-04)       |
| UX обновления SW (step-sw-update-ux)           | ✅ ЗАВЕРШЕНО (2026-08-04)       |
| Offline fallback (step-offline-fallback)       | ✅ BUILD завершён (2026-08-06)  |

## [2026-08-06]: step-offline-fallback — BUILD

Workbox `navigateFallback` + runtime caching в `vite.config.ts`. Хук `useOnlineStatus` (папка `src/hooks/useOnlineStatus/`). Компонент `OfflineIndicator` (chip `[●] offline`, top-right, light/dark). E2E `offline-fallback.spec.ts`. Verify: lint ✅, build ✅, unit 36 ✅, e2e 10 ✅. → `/reflect`.

## [2026-08-04]: step-sw-update-ux — ЗАВЕРШЕНО

`registerType: 'prompt'` + `virtual:pwa-register`; `swUpdateController.ts` (pub/sub) + `useSwUpdate` + `SwUpdateBanner` (fixed bottom). Удалён `registerSw.ts`. Unit: 27 тестов; E2E smoke: баннер скрыт при первой загрузке. Verify: lint ✅, build ✅, test ✅, e2e (9) ✅. Фаза 3 завершена.

**Completed:** [memory-bank/completed-tasks/2026/08/step-sw-update-ux_2026-08-04.md](completed-tasks/2026/08/step-sw-update-ux_2026-08-04.md)
