# Active Context

## Current Focus

`feat/step-app-version-header` — версия приложения в `app-shell__header`

## Current Mode

VAN COMPLETE → следующий шаг: `/plan`

## Next Steps

1. `/plan` — детальный план (источник версии: Vite `define` vs `src/appVersion.ts`, layout header, тесты)
2. `/build` — реализация по TDD
3. `/reflect` → при необходимости `/archive`
4. `/close-task` — финализация

## Context for AI

- Task ID: `step-app-version-header`
- Complexity: Level 2 — Simple Enhancement
- Git Branch: `feat/step-app-version-header`
- Зависимость `step-app-shell` закрыта
- Версия из `package.json` (`version`), не путать с SW `scriptURL`
- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
