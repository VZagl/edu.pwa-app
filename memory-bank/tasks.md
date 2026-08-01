# Tasks

## Current Task

- **Task ID:** `step-app-shell`
- **Название:** Базовая оболочка приложения
- **Complexity:** Level 2
- **Type:** Enhancement
- **Git Branch:** `feat/step-app-shell`
- **Источник:** `docs/project/implementation-plan.md` (Order: 1.1.1)
- **Дата старта:** 2026-08-01

### Цель

Заменить стартовый шаблон Vite на оболочку учебного PWA: `header`, `nav`, `main`. Навигация через **React Router** (library mode, `BrowserRouter`). Контент уроков рендерится в `main`. Стили — только SCSS.

### Зависимости (закрыты)

- `step-test-environment` ✅
- `step-playwright-setup` ✅

### Technology Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Стили:** SCSS (`sass-embedded`)
- **Роутинг:** `react-router` (library mode) — установка на VAN QA
- **Unit/Integration:** Vitest + Testing Library
- **E2E:** Playwright (preview)

### Technology Validation Checkpoints

- [ ] `pnpm add react-router`
- [ ] Минимальный POC: `BrowserRouter` + один `Route` — dev/build без ошибок
- [ ] Импорты из `'react-router'`: `BrowserRouter`, `Routes`, `Route`, `NavLink`/`Link`
- [ ] `@react-router/dev` **не** использовать (framework mode)
- [ ] Vitest: рендер с `MemoryRouter` или прямой `BrowserRouter` в jsdom
- [ ] `pnpm lint`, `pnpm build`, `pnpm test --run`, `pnpm test:e2e`

### Status

- [x] Initialization complete
- [x] Planning complete
- [ ] Technology validation complete
- [x] Creative phase complete
- [ ] Implementation complete
- [ ] Reflection complete

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-app-shell`
- [x] PLAN: Детальный план реализации (`/plan`)
- [x] CREATIVE: UI/layout решения (`/creative`)
- [ ] VAN QA: Установка `react-router`, техническая валидация
- [ ] BUILD: TDD — `App.test.tsx`, E2E smoke с оболочкой и навигацией
- [ ] BUILD: `App.tsx` — оболочка + маршруты (`Routes`, `Route`, `NavLink`)
- [ ] BUILD: `main.tsx` — `BrowserRouter`, импорт `index.scss`
- [ ] BUILD: Миграция `App.css` → `App.scss`, `index.css` → `index.scss`
- [ ] BUILD: `index.html` — `lang="ru"`
- [ ] BUILD: Verify — lint, build, `pnpm test --run`, `pnpm test:e2e`
- [ ] REFLECT: Рефлексия (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой `/close-task`

### Implementation Plan

#### Фаза 0: `/creative` — UI/layout (до BUILD) ✅

- [x] Структура оболочки: **stacked** — header → nav → main (без hamburger/bottom nav)
- [x] Название проекта в header: `<h1>edu.pwa-app</h1>` (русский UI в контенте)
- [x] Маршруты: `/` (HomePage) + catch-all `*` (NotFoundPage); без заготовок разделов
- [x] Mobile-first SCSS: `index.scss` (globals) + `App.scss` (layout), BEM `app-shell__*`, breakpoints 768/1024
- [x] Nav: `NavLink`, один пункт «Главная», active через `.app-shell__nav-link--active`

**Документ:** [memory-bank/creative/creative-app-shell.md](memory-bank/creative/creative-app-shell.md)

#### Фаза 1: VAN QA — зависимости

1. `pnpm add react-router`
2. Проверить сборку и импорты
3. Зафиксировать версию в `package.json`

#### Фаза 2: BUILD — TDD (red → green → refactor)

**2.1 Unit/Integration — `src/App.test.tsx` (RED)**

- `describe('Оболочка приложения')` — header с названием, nav, main с контентом маршрута
- Селекторы: `getByRole('banner')`, `getByRole('navigation')`, `getByRole('main')`
- Обёртка: `MemoryRouter` (если `BrowserRouter` в `main.tsx`)
- Язык тестов: русский

**2.2 E2E — `e2e/smoke.spec.ts` (RED)**

- Title `edu.pwa-app`, видимы header, nav, main
- В main — узнаваемый текст (название / приветствие)

**2.3 Реализация (GREEN)**

| Файл                           | Действие                                                 |
| ------------------------------ | -------------------------------------------------------- |
| `src/main.tsx`                 | `BrowserRouter`, импорт `./index.scss`                   |
| `src/App.tsx`                  | Удалить шаблон Vite; layout + `Routes`/`Route`/`NavLink` |
| `src/App.scss`                 | Стили оболочки (mobile-first)                            |
| `src/index.scss`               | Глобальные reset/typography (из `index.css`)             |
| `src/App.css`, `src/index.css` | Удалить после миграции                                   |
| `index.html`                   | `lang="ru"`                                              |

**2.4 Refactor + Verify**

- `pnpm lint`, `pnpm build`, `pnpm test --run`, `pnpm test:e2e`

### Creative Phases Required

- [x] **App Shell Layout** — stacked (header → nav → main); горизонтальный nav, без hamburger
- [x] **Навигация** — `NavLink`, один пункт «Главная», active через BEM-модификатор
- [x] **SCSS-структура** — `index.scss` + `App.scss`, BEM `app-shell__*`, breakpoints 768/1024, CSS-переменные
- [x] **Маршруты** — `/` + catch-all 404; без заготовок nav под `step-lessons-navigation`

### Challenges & Mitigations

- **React Router v7 — единый пакет `react-router`:** VAN QA — проверить импорты; не ставить `@react-router/dev`
- **Тестирование роутера:** `MemoryRouter` в unit; E2E через preview
- **Миграция CSS → SCSS:** перенести нужное из `index.css`; стили шаблона Vite не переносить
- **Scope creep (уроки в nav):** ограничить шаг оболочкой; разделы — `step-lessons-navigation`
- **`index.html lang="en"`:** сменить на `ru` в BUILD

### Файлы (итоговый список)

**Изменить:** `src/main.tsx`, `src/App.tsx`, `src/App.test.tsx` (новый), `e2e/smoke.spec.ts`, `index.html`, `package.json`  
**Создать:** `src/App.scss`, `src/index.scss`  
**Удалить:** `src/App.css`, `src/index.css`  
**Опционально:** неиспользуемые ассеты шаблона в `src/assets/`

## Last Completed Task

- **Task ID:** `step-playwright-setup`
- **Название:** Playwright E2E-окружение
- **Дата завершения:** 2026-07-30
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/07/step-playwright-setup_2026-07-30.md](memory-bank/completed-tasks/2026/07/step-playwright-setup_2026-07-30.md)
