# Active Context

## Current Focus

- **Task ID:** `step-storage-quota-lesson-ui`
- **Git Branch:** `feat/step-storage-quota-lesson-ui`
- **Название:** Storage quota / Persistent storage — отдельный раздел

## Current Mode

VAN — инициализация завершена; следующий шаг — `/plan`

## Next Steps

1. `/plan` — детальный план реализации (Level 2)
2. `/build` — реализация по TDD
3. `/reflect` — рефлексия
4. `/close-task` — финализация

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- Паттерн lesson-ui: hook + `*LessonData` + Screen (BEM) + `lessonRoutes` + unit/E2E (как Cache Storage / Install)
- API урока: `navigator.storage.estimate()`, опционально `persist()` / `persisted()`
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
