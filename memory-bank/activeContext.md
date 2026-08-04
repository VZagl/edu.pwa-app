# Active Context

## Current Focus

`feat/step-vite-plugin-pwa` — подключение vite-plugin-pwa (Workbox precache)

## Current Mode

PLAN — детальное планирование перед BUILD

## Next Steps

1. `/plan` — детальный план: конфиг плагина, судьба ручного SW, manifest, регистрация, dev/prod, тесты
2. `/build` — реализация по плану (TDD)
3. `/reflect` — рефлексия
4. `/close-task` — финализация (completed-запись, обновление implementation-plan)

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 2 (Web App Manifest) завершена ✅
- Фаза 3: `step-service-worker-register` завершён ✅ — ручной `public/sw.js` + `src/pwa/registerSw.ts`
- Текущая задача: `step-vite-plugin-pwa` — Workbox precache через vite-plugin-pwa
- Предыдущий SW: `public/sw.js` (install/activate, без кэша); регистрация `/sw.js`
- Reflection step-web-app-manifest: не дублировать manifest в двух местах
- `vite-plugin-pwa` в package.json пока отсутствует
