# Tasks

## Current Task

- **Task ID:** `step-lessons-navigation`
- **Название:** Навигация по учебным разделам
- **Уровень сложности:** Level 2 — Enhancement с планированием
- **Git Branch:** `feat/step-lessons-navigation`
- **Источник:** `memory-bank/backlog.md`, `docs/project/implementation-plan.md` (Order: 1.1.2)
- **Зависит от:** `step-app-shell` ✅

### Описание

Навигация по учебным разделам (Manifest, Service Worker, Offline, Install). Переключение экранов через React Router (уже в `package.json` и `App.tsx`).

### Цель

Пользователь переключается между разделами; каждый раздел — заглушка с названием темы.

### Файлы

`src/`, `src/screens/` (или `src/components/`), соответствующие `*.test.*`, при необходимости `e2e/`

### Тесты

- unit/integration — переключение разделов
- E2E — переход между разделами в UI

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-lessons-navigation
- [ ] PLAN: Детальный план реализации
- [ ] BUILD: TDD — экраны-заглушки, маршруты, навигация, тесты
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой /close-task

## Last Completed Task

- **Task ID:** `step-app-shell`
- **Название:** Базовая оболочка приложения
- **Дата завершения:** 2026-08-01
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/07/step-app-shell_2026-08-01.md](completed-tasks/2026/07/step-app-shell_2026-08-01.md)
