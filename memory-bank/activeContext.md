# Active Context

## Current Focus

`feat/step-sw-lesson-ui` — Service Worker — учебный экран

## Current Mode

BUILD — реализация по плану (TDD)

## Next Steps

1. Запустить `/build` — шаг 1: `swLessonData.ts`, `useServiceWorkerInfo`, `resetServiceWorkerLab` + unit-тесты
2. Шаг 2: `ServiceWorkerScreen.tsx` + SCSS + unit-тесты экрана
3. Шаг 3: `e2e/sw-lesson.spec.ts` + verify (lint, build, unit, e2e)

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
- Референс по стилю: `HomeScreen`, `OfflineScreen` (BEM + `*LessonData.ts`)
- Инфраструктура SW: `src/pwa/swUpdateController.ts`, `src/hooks/useSwUpdate.ts`, `SwUpdateBanner`
- Текущий экран — заглушка: `src/screens/ServiceWorkerScreen/ServiceWorkerScreen.tsx`
- Revision в UI: `active.scriptURL` (меняется при каждой сборке SW)
- SW в dev отключён — демо работает после `pnpm build && pnpm preview`
