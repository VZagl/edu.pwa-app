# Tasks

## Current Task

- **Task ID:** `step-app-shell`
- **Название:** Базовая оболочка приложения
- **Complexity:** Level 2
- **Git Branch:** `feat/step-app-shell`
- **Источник:** `docs/project/implementation-plan.md` (Order: 1.1.1)
- **Дата старта:** 2026-08-01

### Цель

Заменить стартовый шаблон Vite на оболочку учебного PWA: `header`, `nav`, `main`. Навигация через **React Router** (library mode, `BrowserRouter`). Контент уроков рендерится в `main`. Стили — только SCSS.

### Зависимости (закрыты)

- `step-test-environment` ✅
- `step-playwright-setup` ✅

### VAN QA — зависимости

- [ ] Установить `react-router` (`pnpm add react-router`) на этапе VAN QA
- `@react-router/dev` **не** использовать (framework mode)

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-app-shell`
- [ ] PLAN: Детальный план реализации (`/plan`)
- [ ] CREATIVE: UI/layout решения (`/creative`)
- [ ] VAN QA: Установка `react-router`, техническая валидация
- [ ] BUILD: TDD — `App.test.tsx`, E2E smoke с оболочкой и навигацией
- [ ] BUILD: `App.tsx` — оболочка + маршруты (`BrowserRouter`, `Routes`, `Route`, `Link`/`NavLink`)
- [ ] BUILD: Миграция `App.css` → `App.scss`, `index.css` → `index.scss`
- [ ] BUILD: Verify — lint, build, `pnpm test --run`, `pnpm test:e2e`
- [ ] REFLECT: Рефлексия (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой `/close-task`

### Файлы (ориентир)

- `src/main.tsx`, `src/App.tsx`, `src/App.scss`, `src/index.scss`
- `src/App.test.tsx`, `e2e/smoke.spec.ts`
- `package.json` (на VAN QA)

## Last Completed Task

- **Task ID:** `step-playwright-setup`
- **Название:** Playwright E2E-окружение
- **Дата завершения:** 2026-07-30
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/07/step-playwright-setup_2026-07-30.md](memory-bank/completed-tasks/2026/07/step-playwright-setup_2026-07-30.md)
