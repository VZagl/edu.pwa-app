# Active Context

## Current Focus

`feat/step-app-version-header` — версия приложения в `app-shell__header`

## Current Mode

PLAN COMPLETE → следующий шаг: `/build`

## Next Steps

1. `/build` — TDD: тест → `define` + `appVersion.ts` → UI header → verify
2. `/reflect` → при необходимости `/archive`
3. `/close-task` — финализация

## Context for AI

- Task ID: `step-app-version-header`
- Complexity: Level 2 — Simple Enhancement
- Git Branch: `feat/step-app-version-header`
- Зависимость `step-app-shell` закрыта
- Проброс версии: Vite `define` (`__APP_VERSION__`) + `src/appVersion.ts` (`APP_VERSION`)
- Источник: `package.json` → `version` (не SW `scriptURL`)
- Creative-фаза не требуется
- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
