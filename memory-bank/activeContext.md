# Active Context

## Current Focus

`feat/step-sw-update-ux` — UX обновления Service Worker (баннер + перезагрузка)

## Current Mode

PLAN — детальное планирование перед BUILD

## Next Steps

1. `/plan` — детальный план: registerType, хук waiting worker, баннер, skipWaiting/clients.claim, тесты
2. `/build` — реализация по плану (TDD)
3. `/reflect` — рефлексия
4. `/close-task` — финализация (completed-запись, обновление implementation-plan)

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 3: `step-vite-plugin-pwa` завершён ✅ — Workbox precache, `registerSw.ts`, `registerType: 'autoUpdate'`
- Текущая задача: `step-sw-update-ux` — явный UX при обновлении SW
- Регистрация SW: `src/pwa/registerSw.ts` (`injectRegister: null`); SW в dev отключён
- E2E SW: `e2e/service-worker-pwa.spec.ts` (3 теста)
- tech-stack-pwa.md: «обрабатывать обновления SW явно (UX «доступна новая версия»)»
