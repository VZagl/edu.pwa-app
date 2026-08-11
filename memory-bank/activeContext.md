# Active Context

## Current Focus

- **Task ID:** `step-storage-quota-lesson-ui`
- **Git Branch:** `feat/step-storage-quota-lesson-ui`
- **Название:** Storage quota / Persistent storage — отдельный раздел

## Current Mode

REFLECT complete — следующий шаг `/close-task` (без `/archive`)

## Next Steps

1. `/close-task` — completed-запись, backlog/progress/roadmap, merge в `develop`

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- Реализовано: `useStorageQuota`, `StorageScreen` (`/storage`, navLabel `Storage`), lesson data, unit + E2E
- Verify: lint ✅, typecheck ✅, unit ✅, build ✅, e2e (storage + navigation) ✅
- Reflection: [memory-bank/reflection/reflection-step-storage-quota-lesson-ui.md](reflection/reflection-step-storage-quota-lesson-ui.md)
- Для пункта навигации «Storage» использовать exact-матч (иначе пересечение с «Cache Storage»)
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
