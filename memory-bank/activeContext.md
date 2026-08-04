# Active Context

## Current Focus

**step-service-worker-register** — регистрация Service Worker (фаза 3)  
**Git Branch:** `feat/step-service-worker-register`

## Current Mode

PLAN pending — после инициализации VAN

## Next Steps

1. Запустить `/plan` для детального плана реализации
2. TDD: unit-тест регистрации → `public/sw.js` → `src/pwa/registerSw.ts` → `main.tsx`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 2 (Web App Manifest) завершена ✅
- Текущая задача: минимальный ручной SW в `public/sw.js` (install + activate, логи); регистрация из `src/pwa/registerSw.ts` с проверкой `'serviceWorker' in navigator`
- Разработка по TDD: Vitest + Playwright
- Продуктовые изменения только в feature-ветке `feat/step-service-worker-register`
