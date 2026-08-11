# step-storage-quota-lesson-ui

- **Название:** Storage quota / Persistent storage — отдельный раздел
- **Дата создания:** 2026-08-07
- **Дата завершения:** 2026-08-11
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Feature

## Задание

Отдельный раздел навигации (продвинутый урок): Storage quota / Persistent storage — `navigator.storage.estimate()` (usage/quota), опционально `persist()` / `persisted()`, краткое объяснение лимитов и вытеснения данных браузером.

**Цель:** Понять квоты хранилища и Persistent Storage на практике.

## Результат

Добавлен учебный раздел `/storage` (navLabel: `Storage`): квоты через `estimate()` (usage/quota, байты + человекочитаемо, %), Persistent Storage (`persisted` / `persist`), лимиты/вытеснение, DevTools, ссылка на `/cache-storage`. Хук `useStorageQuota`, экран `StorageScreen` (BEM). TDD: unit + E2E. Verify: lint ✅, typecheck ✅, unit ✅, build ✅, e2e ✅.

## Ссылки

- **Архив:** —
- **Рефлексия:** [memory-bank/reflection/reflection-step-storage-quota-lesson-ui.md](../../reflection/reflection-step-storage-quota-lesson-ui.md)
- **Ветка:** `feat/step-storage-quota-lesson-ui`
- **Коммит:** `11c2f46`
