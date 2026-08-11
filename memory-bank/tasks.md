# Tasks

## Current Task

- **Task ID:** `step-app-version-header`
- **Название:** Версия приложения в header
- **Создано:** 2026-08-11
- **Complexity:** Level 2 — Simple Enhancement
- **Тип:** Enhancement
- **Git Branch:** `feat/step-app-version-header`
- **Источник:** `docs/project/implementation-plan.md` (step-app-version-header)
- **Зависит от:** `step-app-shell` ✅
- **Статус:** VAN COMPLETE → переход к PLAN

### Описание

Вывести версию приложения в `app-shell__header` справа от названия (`edu.pwa-app`), прижать к правому краю. Layout: flex на `.app-shell__header`. Источник истины — `version` в `package.json`; проброс в клиент через Vite `define` или тонкий модуль (`src/appVersion.ts`). Это версия приложения, не SW revision / `scriptURL`.

### Цель

В шапке всегда видна текущая версия приложения (удобно для лаборатории и update flow).

### Чеклист

- [x] VAN: Инициализация задачи, сложность L2, feature-ветка
- [x] GIT: Работа в feature-ветке `feat/step-app-version-header`
- [ ] PLAN: Детальный план реализации
- [ ] BUILD: Реализация (TDD) + verify
- [ ] REFLECT: Рефлексия
- [ ] CLOSE: Финализировать задачу командой `/close-task`

### Затрагиваемые файлы (предварительно)

- `package.json` (`version`)
- `vite.config.ts`
- `src/App.tsx`, `src/App.scss`
- при необходимости `src/appVersion.ts` / типы Vite
- `src/App.test.tsx`

### Тесты

- unit — header показывает название и версию
- при необходимости smoke E2E

## Last Completed Task

- **Task ID:** `step-push-notifications`
- **Название:** Web Push — опциональный урок
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED & ARCHIVED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-push-notifications_2026-08-11.md](completed-tasks/2026/08/step-push-notifications_2026-08-11.md)
- **Archive:** [memory-bank/archive/archive-step-push-notifications.md](archive/archive-step-push-notifications.md)
- **Reflection:** [memory-bank/reflection/reflection-step-push-notifications.md](reflection/reflection-step-push-notifications.md)
