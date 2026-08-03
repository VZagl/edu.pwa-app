# Tasks

## Current Task

- **Task ID:** `step-web-app-manifest`
- **Название:** Web App Manifest
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-web-app-manifest`
- **Источник:** `memory-bank/backlog.md`, `docs/project/implementation-plan.md` (Order: 2.1.1)
- **Зависит от:** `step-app-shell` ✅

### Цель

DevTools → Application → Manifest без критичных ошибок; иконки отображаются.

### Описание

Добавить `manifest.webmanifest`: `name`, `short_name`, `start_url`, `display` (`standalone` или `minimal-ui`), `theme_color`, `background_color`, `icons`. Подключить в `index.html` (`<link rel="manifest">`). Иконки — `public/icons/` (минимум 192×192 и 512×512). Документировать поля в `config-schema.md`.

### Файлы

- `public/manifest.webmanifest` (новый)
- `public/icons/` (новый — icon-192.png, icon-512.png)
- `index.html` (изменить)
- `docs/project/config-schema.md` (уточнить при необходимости)
- `e2e/` — тест manifest по URL

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-web-app-manifest`
- [ ] PLAN: План реализации с TDD-шагами
- [ ] BUILD: `public/manifest.webmanifest` с обязательными полями MVP
- [ ] BUILD: Иконки 192×192 и 512×512 в `public/icons/`
- [ ] BUILD: `<link rel="manifest">` и `<meta name="theme-color">` в `index.html`
- [ ] BUILD: E2E или integration — manifest отдаётся по URL с обязательными полями
- [ ] BUILD: Verify — lint, build, test, e2e
- [ ] REFLECT: Рефлексия по задаче
- [ ] ARCHIVE: Архив задачи
- [ ] CLOSE: Финализировать задачу командой `/close-task`

## Last Completed Task

- **Task ID:** `step-lessons-navigation`
- **Название:** Навигация по учебным разделам
- **Дата завершения:** 2026-08-03
- **Статус:** COMPLETED & ARCHIVED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-lessons-navigation_2026-08-03.md](completed-tasks/2026/08/step-lessons-navigation_2026-08-03.md)
- **Archive:** [memory-bank/archive/archive-step-lessons-navigation.md](archive/archive-step-lessons-navigation.md)
- **Reflection:** [memory-bank/reflection/reflection-step-lessons-navigation.md](reflection/reflection-step-lessons-navigation.md)
