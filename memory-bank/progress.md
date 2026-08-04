# Memory Bank: Progress

## Статус проекта

| Область                                        | Состояние                                       |
| ---------------------------------------------- | ----------------------------------------------- |
| Репозиторий Vite + React + TS                  | ✅ Готов (2026-07-23)                           |
| Memory Bank (ядро)                             | ✅ Инициализирован (2026-07-24)                 |
| Vitest (step-test-environment)                 | ✅ ЗАВЕРШЕНО (2026-07-30)                       |
| Playwright (step-playwright-setup)             | ✅ ЗАВЕРШЕНО (2026-07-30)                       |
| Каркас UI (step-app-shell)                     | ✅ ЗАВЕРШЕНО (2026-08-01)                       |
| Навигация уроков                               | ✅ ЗАВЕРШЕНО (2026-08-03)                       |
| Web App Manifest (step-web-app-manifest)       | ✅ ЗАВЕРШЕНО (2026-08-03)                       |
| Экран урока Manifest (step-manifest-lesson-ui) | ✅ ЗАВЕРШЕНО (2026-08-03)                       |
| SW регистрация (step-service-worker-register)  | ✅ ЗАВЕРШЕНО (2026-08-04)                       |
| SW precache / vite-plugin-pwa                  | ✅ ЗАВЕРШЕНО (2026-08-04)                       |
| UX обновления SW (step-sw-update-ux)           | 🔄 BUILD ✅ → /reflect (feat/step-sw-update-ux) |

## [2026-08-04]: step-sw-update-ux — BUILD завершён

`registerType: 'prompt'` + `virtual:pwa-register`; `swUpdateController.ts` (pub/sub, `immediate: true`) + `useSwUpdate` + `SwUpdateBanner` (fixed bottom). Удалён `registerSw.ts`. Зависимость `workbox-window@^7.4.1`. Unit: 27 тестов (controller 6, hook 4, banner 3 + остальные). E2E smoke: баннер скрыт при первой загрузке (4 теста в `service-worker-pwa.spec.ts`). Verify: lint ✅, build ✅, test ✅, e2e (9) ✅. Следующий шаг: `/reflect`.

## [2026-08-04]: step-sw-update-ux — PLAN завершён

Детальный план: `registerType: 'prompt'` + `virtual:pwa-register`; `swUpdateController.ts` + `useSwUpdate` + `SwUpdateBanner` (fixed bottom); unit-тесты с моками; E2E smoke. Creative phase не требуется. Следующий шаг: `/build`.

## [2026-08-04]: step-vite-plugin-pwa — ЗАВЕРШЕНО

Подключён `vite-plugin-pwa@^1.3.0`: `generateSW`, Workbox precache (11 entries), manifest из `vite.config.ts`. Удалены `public/sw.js` и `public/manifest.webmanifest`; manifest/theme-color инжектируются плагином. Регистрация SW — `registerSw.ts` (`injectRegister: null`). E2E: `e2e/service-worker-pwa.spec.ts` (3 теста). Verify: lint ✅, build ✅, test (16) ✅, e2e (8) ✅.

**Completed:** [memory-bank/completed-tasks/2026/08/step-vite-plugin-pwa_2026-08-04.md](completed-tasks/2026/08/step-vite-plugin-pwa_2026-08-04.md)
