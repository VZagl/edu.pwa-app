# Active Context

## Current Focus

`feat/step-home-lesson-ui` — Главная — учебный экран (step-home-lesson-ui)

## Current Mode

BUILD — complete

## Next Steps

1. `/reflect` — рефлексия
2. `/close-task` — финализация задачи

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
- BUILD завершён (2026-08-10): HomeScreen — карта лаборатории (intro, модули из `lessonRoutes`, чеклист PWA, how-to, HTTPS); unit + E2E; Verify зелёный
- Фильтр модулей внутри `ModulesSection` (циклический импорт `HomeScreen` ↔ `lessonRoutes`)
- Сложность: Level 2 — VAN → PLAN → BUILD → REFLECT → close-task
