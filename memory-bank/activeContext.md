# Active Context

## Current Focus

`feat/step-sw-lesson-ui` — Service Worker — учебный экран — BUILD завершён

## Current Mode

REFLECT — рефлексия по задаче

## Next Steps

1. Запустить `/reflect` — рефлексия по step-sw-lesson-ui
2. После рефлексии — `/close-task`

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
- Реализован экран `ServiceWorkerScreen`: intro, lifecycle, живое демо (`useServiceWorkerInfo`), update flow, кнопка сброса (`resetServiceWorkerLab`), ссылка на Offline
- Revision в UI: `active.scriptURL` из регистрации SW
- SW в dev отключён — демо работает после `pnpm build && pnpm preview`
- Verify: lint ✅, build ✅, unit 79 ✅, e2e 14 ✅
