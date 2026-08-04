# Active Context

## Current Focus

`feat/step-sw-update-ux` — UX обновления Service Worker (баннер + перезагрузка)

## Current Mode

BUILD — реализация по плану (TDD)

## Next Steps

1. `/build` — TDD: `swUpdateController` → `useSwUpdate` → `SwUpdateBanner` → интеграция → E2E smoke → verify
2. `/reflect` — рефлексия
3. `/close-task` — финализация (completed-запись, обновление implementation-plan)

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 3: `step-vite-plugin-pwa` завершён ✅ — Workbox precache, `registerSw.ts`, `registerType: 'autoUpdate'`
- Текущая задача: `step-sw-update-ux` — явный UX при обновлении SW
- **PLAN решения:** `registerType: 'prompt'` + `virtual:pwa-register`; controller + hook + banner; fixed bottom bar; E2E smoke only
- Регистрация SW сейчас: `src/pwa/registerSw.ts` (`injectRegister: null`); будет заменена на `swUpdateController.ts`
- SW в dev отключён; E2E через preview
- E2E SW: `e2e/service-worker-pwa.spec.ts` (3 теста)
- ui-conventions.md: «ненавязчивый баннер с действием „Обновить“»
