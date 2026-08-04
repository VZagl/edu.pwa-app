# Active Context

## Current Focus

**step-service-worker-register** — регистрация Service Worker (фаза 3)  
**Git Branch:** `feat/step-service-worker-register`

## Current Mode

PLAN complete — план и tech validation готовы  
**Next recommended mode:** `/build`

## Next Steps

1. Запустить `/build` (TDD)
2. Red: `src/pwa/registerSw.test.ts`
3. Green: `src/pwa/registerSw.ts` + `public/sw.js` + вызов в `main.tsx`
4. Verify: lint, build, `pnpm test --run`; ручная проверка SW в DevTools

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 2 (Web App Manifest) завершена ✅
- План: ручной SW в `public/sw.js` (install + activate, логи); регистрация из `src/pwa/registerSw.ts` с проверкой `'serviceWorker' in navigator`; без новых deps / без vite-plugin-pwa
- Creative phases: не требуются
- Продуктовые изменения только в feature-ветке `feat/step-service-worker-register`
