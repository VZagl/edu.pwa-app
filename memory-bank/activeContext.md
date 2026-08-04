# Active Context

## Current Focus

`feat/step-vite-plugin-pwa` — подключение vite-plugin-pwa (Workbox precache)

## Current Mode

BUILD — реализация по плану (TDD)

## Next Steps

1. `/build` — реализация по плану в `memory-bank/tasks.md` (TDD)
2. `/reflect` — рефлексия
3. `/close-task` — финализация (completed-запись, обновление implementation-plan)

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 2 (Web App Manifest) завершена ✅
- Фаза 3: `step-service-worker-register` завершён ✅ — ручной SW заменяется Workbox
- **PLAN завершён ✅** — решения зафиксированы в `memory-bank/tasks.md`
- Стратегия: `generateSW`, `injectRegister: null`, manifest в `vite.config.ts`
- Удалить: `public/sw.js`, `public/manifest.webmanifest`
- Сохранить: `registerSw.ts` (путь `/sw.js`), паттерн `src/pwa/`
- SW в dev: отключён; E2E через `pnpm build && pnpm preview`
- Новый E2E: `e2e/service-worker-pwa.spec.ts`
- Creative phase не требуется → сразу `/build`
