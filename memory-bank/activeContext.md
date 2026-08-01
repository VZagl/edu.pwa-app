# Active Context

## Current Focus

**step-app-shell** — базовая оболочка приложения (header, nav, main, React Router)

**Git Branch:** `feat/step-app-shell`

## Current Mode

POST-VAN-QA — техническая валидация завершена, следующий шаг: `/build`

## Next Steps

1. `/build` — TDD-реализация оболочки по [creative-app-shell.md](creative/creative-app-shell.md)
2. `/reflect` → `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 0 завершена; фаза 1, этап 1.1 (каркас UI)
- **VAN QA complete:** `react-router@^8.3.0` установлен; POC в `main.tsx`/`App.tsx`; тест `src/router-poc.test.tsx`
- **Импорты:** `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `MemoryRouter` — из `'react-router'` (не `react-router-dom`, не `@react-router/dev`)
- **Creative:** [memory-bank/creative/creative-app-shell.md](creative/creative-app-shell.md)
- **Layout (BUILD):** stacked — header → nav → main
- **Nav (BUILD):** `NavLink`, один пункт «Главная»
- **SCSS (BUILD):** `index.scss` + `App.scss`, BEM `app-shell__*`
- **Маршруты (BUILD):** `/` + catch-all 404
- POC временно оборачивает шаблон Vite в `Routes`/`Route` — BUILD заменит на оболочку
- `router-poc.test.tsx` — валидационный тест VAN QA; `App.test.tsx` создаётся в BUILD
