# Level 2 Enhancement Reflection: Базовая оболочка приложения

**Task ID:** `step-app-shell`  
**Дата рефлексии:** 2026-08-01  
**Ветка:** `feat/step-app-shell`

## Enhancement Summary

Заменён стартовый шаблон Vite на учебную оболочку PWA: stacked layout (`header` → `nav` → `main`), навигация через React Router v8 (library mode, `BrowserRouter` в `main.tsx`), маршруты `/` и catch-all 404. Стили мигрированы с CSS на SCSS (`index.scss` + `App.scss`, BEM `app-shell__*`). TDD: `App.test.tsx` (3 теста), обновлён `e2e/smoke.spec.ts`. VAN QA: `react-router@^8.3.0`, POC `router-poc.test.tsx`. Verify: lint, build, `pnpm test --run` (6 тестов), `pnpm test:e2e` — OK.

## What Went Well

- **Creative → VAN QA → BUILD** — последовательность сработала: design decisions из `creative-app-shell.md` реализованы без отклонений (stacked layout, NavLink «Главная», BEM-классы, `/` + 404).
- **TDD red → green:** сначала `App.test.tsx` и E2E smoke с role-селекторами (`banner`, `navigation`, `main`), затем реализация — все проверки прошли с первого green-прогона.
- **VAN QA отдельно от BUILD:** установка `react-router@^8.3.0` и POC (`router-poc.test.tsx`) подтвердили library mode и импорты из `'react-router'` до полной оболочки — снизило риск блокера на этапе BUILD.
- **Scope discipline:** без заготовок nav/маршрутов под уроки; inline `HomePage`/`NotFoundPage` в `App.tsx` — достаточно для Level 2.
- **SCSS-миграция:** перенесены globals и layout; стили Vite-шаблона (hero, counter) не переносились — чистый старт под учебное PWA.
- **Единые селекторы в unit и E2E:** `getByRole('banner'|'navigation'|'main')` — стабильные, a11y-friendly проверки.

## Challenges Encountered

- **React Router v8 (не v7):** единый пакет `react-router`, импорты отличаются от legacy `@remix-run/react` / split packages — потребовалась отдельная VAN QA-фаза.
- **Unit vs E2E роутинг:** `BrowserRouter` в `main.tsx`, но unit-тесты требуют `MemoryRouter`-обёртку — нужен helper `renderApp(initialRoute)`.
- **E2E smoke эволюция:** предыдущий шаг (`step-playwright-setup`) использовал `#root`; текущий — role-based селекторы и тексты UI — осознанное изменение, но требует синхронизации при следующих UI-шагах.
- **Типы jest-dom:** matcher-ы (`toBeInTheDocument`) потребовали `@testing-library/jest-dom` в `tsconfig.app.json`.
- **Миграция CSS → SCSS:** выборочный перенос из `index.css` (typography, dark mode) без шаблонных стилей Vite.

## Solutions Applied

- VAN QA: `pnpm add react-router`, POC в `main.tsx`/`App.tsx`, тест `router-poc.test.tsx` с `MemoryRouter`, `NavLink`, `Link`.
- Helper `renderApp()` в `App.test.tsx` с `MemoryRouter initialEntries`.
- E2E: проверка title, header h1, nav, main с текстом «Добро пожаловать».
- `tsconfig.app.json`: типы `@testing-library/jest-dom`.
- Два SCSS-файла: globals в `index.scss`, layout в `App.scss`; удалены `App.css`, `index.css`.

## Key Technical Insights

- **React Router v8 library mode:** `BrowserRouter` + `Routes`/`Route`/`NavLink` из `'react-router'`; `@react-router/dev` не нужен (framework mode не используется).
- **`MemoryRouter` в unit-тестах** — стандартный паттерн при `BrowserRouter` на уровне entry point.
- **`NavLink` с `end` и BEM-модификатором** — `isActive` + `app-shell__nav-link--active` даёт a11y (`aria-current`) без лишнего JS.
- **Implicit ARIA roles:** `<header>` на верхнем уровне → `role="banner"` без явного атрибута; тесты `getByRole('banner')` работают корректно.
- **`100svh` fallback** в `.app-shell` — mobile-friendly min-height для PWA-оболочки.

## Process Insights

- **Creative phase для Level 2 UI** оправдана: 4 decision blocks (layout, nav, SCSS, routes) предотвратили scope creep и дали готовый BUILD checklist.
- **VAN QA как обязательный шаг для новых deps** — шаблон для `step-lessons-navigation` и PWA-зависимостей (workbox и т.д.).
- **Полный verify-набор после BUILD** (lint + build + unit + e2e) — привычка из фазы 0, без сюрпризов.
- **Документ creative-app-shell.md** — точная спецификация; BUILD не потребовал переоткрытия design decisions.

## Action Items for Future Work

- `/close-task` — финализация `step-app-shell` (архивация, merge в `develop`).
- **`step-lessons-navigation`** — расширение nav и маршрутов; рассмотреть `pages/` и partials SCSS при росте числа разделов.
- **Unit-тест для 404:** добавить кейс `renderApp('/unknown')` → «Страница не найдена» (не блокер, улучшение coverage).
- **`router-poc.test.tsx`:** оставить как regression или удалить при рефакторе после merge — зафиксировать решение в close-task.
- **E2E:** при добавлении nav-пунктов — тесты навигации между маршрутами.

## Time Estimation Accuracy

- Estimated time: ~2–3 ч (PLAN + CREATIVE + VAN QA + BUILD для Level 2)
- Actual time: одна сессия 2026-08-01 (PLAN → CREATIVE → VAN QA → BUILD)
- Variance: в пределах оценки
- Reason: объём совпал с чеклистом; VAN QA добавила ~30 мин, но сэкономила время на отладке роутера в BUILD
