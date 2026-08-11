# Active Context

## Current Focus

- **Task ID:** `step-storage-quota-lesson-ui`
- **Git Branch:** `feat/step-storage-quota-lesson-ui`
- **Название:** Storage quota / Persistent storage — отдельный раздел

## Current Mode

PLAN — планирование завершено; следующий шаг — `/build`

## Next Steps

1. `/build` — реализация по TDD (хук → data → Screen → маршрут → E2E → verify)
2. `/reflect` — рефлексия
3. `/close-task` — финализация

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- Паттерн lesson-ui: hook + `*LessonData` + Screen (BEM) + `lessonRoutes` + unit/E2E (как Cache Storage / Install)
- Именование: `StorageScreen`, `useStorageQuota`, путь `/storage`, navLabel `Storage`
- API урока: `navigator.storage.estimate()`, `persist()` / `persisted()`
- Creative не нужен (Level 2)
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
