# Active Context

## Current Focus

`feat/step-sw-update-ux` — UX обновления SW: REFLECT ✅

## Current Mode

REFLECT ✅ → ARCHIVE

## Next Steps

1. `/archive` — архивация задачи
2. `/close-task` — финализация (completed-запись, обновление implementation-plan)

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 3: `step-vite-plugin-pwa` завершён ✅ — Workbox precache, `registerSw.ts`, `registerType: 'autoUpdate'`
- Текущая задача: `step-sw-update-ux` — REFLECT ✅; баннер «Доступно обновление» + `registerType: 'prompt'`
- **Reflection:** [memory-bank/reflection/reflection-step-sw-update-ux.md](reflection/reflection-step-sw-update-ux.md)
- **PLAN решения:** `registerType: 'prompt'` + `virtual:pwa-register`; controller + hook + banner; fixed bottom bar; E2E smoke only
- Регистрация SW: `src/pwa/swUpdateController.ts` (`injectRegister: null`, `immediate: true`)
- SW в dev отключён; E2E через preview
- E2E SW: `e2e/service-worker-pwa.spec.ts` (3 теста)
- ui-conventions.md: «ненавязчивый баннер с действием „Обновить“»
