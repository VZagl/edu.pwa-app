# Active Context

## Current Focus

**step-app-shell** — базовая оболочка приложения (header, nav, main, React Router)

**Git Branch:** `feat/step-app-shell`

## Current Mode

POST-CREATIVE — design decisions зафиксированы, следующий шаг: VAN QA → `/build`

## Next Steps

1. VAN QA — установка `react-router`, техническая валидация (POC сборки)
2. `/build` — TDD-реализация по [creative-app-shell.md](creative/creative-app-shell.md)
3. `/reflect` → `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 0 завершена; фаза 1, этап 1.1 (каркас UI)
- **Creative complete:** [memory-bank/creative/creative-app-shell.md](creative/creative-app-shell.md)
- **Layout:** stacked — header → nav (горизонтальная полоса) → main
- **Nav:** `NavLink`, один пункт «Главная»; active — `.app-shell__nav-link--active`
- **SCSS:** `index.scss` (globals/vars) + `App.scss` (BEM `app-shell__*`); breakpoints 768/1024
- **Маршруты:** `/` (HomePage: «Добро пожаловать», «Контент уроков будет здесь») + `*` (NotFoundPage)
- **Роутинг:** React Router library mode; `BrowserRouter` в `main.tsx`; установка на VAN QA
- Разделы уроков — `step-lessons-navigation` (не на этом шаге)
- Текущий код — шаблон Vite (`App.css`, `index.css`); `App.test.tsx` отсутствует
- E2E smoke минимальный — расширить под оболочку
