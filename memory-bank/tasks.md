# Tasks

## Current Task

- **Task ID:** `step-storage-quota-lesson-ui`
- **Название:** Storage quota / Persistent storage — отдельный раздел
- **Git Branch:** `feat/step-storage-quota-lesson-ui`
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Feature
- **Источник:** docs/project/implementation-plan.md (step-storage-quota-lesson-ui)
- **Создано:** 2026-08-07
- **Статус:** VAN complete → ожидание `/plan`
- **Зависит от:** step-cache-storage-lesson-ui (закрыта)

### Описание

Отдельный раздел навигации (продвинутый урок): Storage quota / Persistent storage — `navigator.storage.estimate()` (usage/quota), опционально `persist()` / `persisted()`, краткое объяснение лимитов и вытеснения данных браузером.

**Цель:** Понять квоты хранилища и Persistent Storage на практике.

**Ожидаемые артефакты:** `src/screens/StorageScreen/` (или аналог), хук, `src/routes/lessonRoutes.ts`, unit (моки `navigator.storage`) + E2E.

### Чеклист

- [ ] GIT: Работа в feature-ветке `feat/step-storage-quota-lesson-ui`
- [ ] PLAN: Детальный план реализации
- [ ] BUILD: Реализация по TDD + verify (lint / build / test / e2e)
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой `/close-task`

## Last Completed Task

- **Task ID:** `step-cache-storage-lesson-ui`
- **Название:** Cache Storage — отдельный раздел
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-cache-storage-lesson-ui_2026-08-11.md](completed-tasks/2026/08/step-cache-storage-lesson-ui_2026-08-11.md)
- **Reflection:** [memory-bank/reflection/reflection-step-cache-storage-lesson-ui.md](reflection/reflection-step-cache-storage-lesson-ui.md)
