# Active Context

## Current Focus

- **Task ID:** `step-storage-quota-lesson-ui`
- **Git Branch:** `feat/step-storage-quota-lesson-ui`
- **Название:** Storage quota / Persistent storage — отдельный раздел

## Current Mode

BUILD — реализация завершена; следующий шаг — `/reflect`

## Next Steps

1. `/reflect` — рефлексия
2. `/close-task` — финализация

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- Реализовано: `useStorageQuota`, `StorageScreen` (`/storage`, navLabel `Storage`), lesson data, unit + E2E
- Verify: lint ✅, typecheck ✅, unit ✅, build ✅, e2e (storage + navigation) ✅
- Для пункта навигации «Storage» использовать exact-матч (иначе пересечение с «Cache Storage»)
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
