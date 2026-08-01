# Active Context

## Current Focus

**step-app-shell** — базовая оболочка приложения (header, nav, main, React Router)

**Git Branch:** `feat/step-app-shell`

## Current Mode

POST-PLAN — планирование завершено, следующий шаг: `/creative`

## Next Steps

1. `/creative` — UI/layout решения (оболочка, nav, маршруты, SCSS)
2. VAN QA — установка `react-router`, техническая валидация
3. `/build` — TDD-реализация
4. `/reflect` → `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 0 завершена; фаза 1, этап 1.1 (каркас UI)
- Навигация: **React Router** (library mode, `react-router`), установка на VAN QA
- `BrowserRouter` — в `main.tsx`; `App.tsx` — layout + `Routes`/`Route`/`NavLink`
- Маршрут на этом шаге: `/` (главная); разделы уроков — `step-lessons-navigation`
- Стили: только SCSS; mobile-first (`ui-conventions.md`, `style-guide.md`)
- Текущий код — шаблон Vite (`App.css`, `index.css`); `App.test.tsx` отсутствует
- E2E smoke минимальный — расширить под оболочку
