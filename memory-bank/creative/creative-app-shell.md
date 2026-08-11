# Creative Phase: App Shell (`step-app-shell`)

**Task ID:** `step-app-shell`  
**Дата:** 2026-08-01  
**Тип:** UI/UX + Architecture  
**Документ:** design decisions для базовой оболочки учебного PWA

---

## 🎨🎨🎨 ENTERING CREATIVE PHASE: UI/UX + Architecture 🎨🎨🎨

**Фокус:** базовая оболочка учебного PWA (header, nav, main)  
**Цель:** зафиксировать layout, навигацию, SCSS-структуру и маршруты до BUILD  
**Ограничения:** mobile-first, только SCSS, русский UI, один маршрут `/`, без scope creep

**Style Guide:** `memory-bank/style-guide.md`, `docs/project/ui-conventions.md`

---

## 1. App Shell Layout

### Problem Statement

Как расположить `header`, `nav` и `main` на mobile/tablet/desktop при минимальном наборе пунктов навигации (один пункт «Главная»)?

### Options Analysis

#### Option 1: Stacked (вертикальный стек)

**Description:** `header` → `nav` (горизонтальная полоса) → `main`

**Pros:**

- Семантические landmarks (`banner`, `navigation`, `main`) — удобно для тестов и a11y
- Простая реализация без JS-состояния меню
- Масштабируется: nav остаётся горизонтальной полосой под header на всех breakpoints
- Достаточно для одного пункта nav

**Cons:**

- На desktop nav не «в одной строке» с заголовком (приемлемо для учебного PWA)

**Complexity:** Low  
**Implementation Time:** ~30 min

#### Option 2: Header + inline nav

**Description:** Название слева, nav справа в одной строке header; на mobile — перенос

**Pros:**

- Компактнее на широких экранах

**Cons:**

- Сложнее адаптив без пользы при одном пункте
- На mobile возможен неудобный перенос

**Complexity:** Medium  
**Implementation Time:** ~45 min

#### Option 3: Hamburger на mobile

**Description:** Nav скрыт за кнопкой «Меню» на узком экране

**Pros:**

- Стандарт для приложений с многими пунктами

**Cons:**

- Over-engineering для одного пункта
- Дополнительный JS, a11y (focus trap, aria-expanded), тесты

**Complexity:** High  
**Implementation Time:** ~2 h

#### Option 4: Bottom navigation

**Description:** Nav внизу экрана (типичный mobile PWA-паттерн)

**Pros:**

- Удобен для 3–5 разделов на телефоне

**Cons:**

- Преждевременно при одном пункте
- Конфликтует с контентом уроков в `main`

**Complexity:** Medium  
**Implementation Time:** ~1 h

### Decision

**Выбран Option 1: Stacked layout**

**Rationale:** Максимальная простота при полном соответствии семантике и требованиям тестов. Hamburger и bottom nav — для `step-lessons-navigation`, когда появятся разделы уроков.

### Visualization

```
┌─────────────────────────────┐
│  HEADER: «edu.pwa-app»      │
├─────────────────────────────┤
│  NAV: [ Главная ]           │  ← горизонтальная полоса
├─────────────────────────────┤
│                             │
│  MAIN: контент маршрута     │
│                             │
└─────────────────────────────┘
```

**Адаптив:**

- **Mobile (base):** header full-width; nav — горизонтальный список с touch-friendly padding (min 44×44px)
- **Tablet (≥768px):** `main` с `max-width`, центрирование
- **Desktop (≥1024px):** та же структура, увеличенные отступы; nav не переносится в hamburger

---

## 2. Навигация

### Problem Statement

NavLink vs Link, active state, количество пунктов на этом шаге.

### Options Analysis

#### Option 1: NavLink, один пункт «Главная»

**Description:** `NavLink to="/"` с active-стилем через `isActive`

**Pros:**

- Встроенный `isActive`, `aria-current="page"` для a11y
- Минимальный scope
- Готовая основа для расширения в `step-lessons-navigation`

**Cons:**

- При одном пункте active state визually очевиден только на `/`

**Complexity:** Low  
**Implementation Time:** ~15 min

#### Option 2: Link без active state

**Description:** Обычный `Link`, без визуального «активного» состояния

**Pros:**

- Ещё проще

**Cons:**

- Нет `aria-current`, хуже a11y
- Придётся добавлять active state позже

**Complexity:** Low  
**Implementation Time:** ~10 min

#### Option 3: Заготовки nav под уроки

**Description:** Пункты «Manifest», «SW», «Offline» как disabled/placeholder

**Pros:**

- Визуальный preview будущей навигации

**Cons:**

- Scope creep — разделы в `step-lessons-navigation`
- Disabled-ссылки ухудшают UX на этом шаге

**Complexity:** Medium  
**Implementation Time:** ~30 min

### Decision

**Выбран Option 1: NavLink, один пункт «Главная»**

**Rationale:** NavLink — стандарт React Router для nav с active state; один пункт соответствует scope задачи.

### Implementation Guidelines

```tsx
<NavLink
	to='/'
	className={({ isActive }) => `app-shell__nav-link${isActive ? ' app-shell__nav-link--active' : ''}`}
	end
>
	Главная
</NavLink>
```

- **Focus:** видимый `:focus-visible` outline
- **Разметка:** `<nav><ul><li>…</li></ul></nav>`

---

## 3. SCSS-структура

### Problem Statement

Разделение глобальных и компонентных стилей, breakpoints, CSS-переменные.

### Options Analysis

#### Option 1: Два файла — `index.scss` + `App.scss`

**Description:** Глобальные vars/reset в `index.scss`; layout оболочки в `App.scss`

**Pros:**

- Соответствует плану и style-guide
- Чёткое разделение global vs component
- Достаточно для Level 2

**Cons:**

- При росте проекта понадобятся partials (не сейчас)

**Complexity:** Low  
**Implementation Time:** ~45 min

#### Option 2: CSS Modules (`App.module.scss`)

**Description:** Изолированные классы через CSS Modules

**Pros:**

- Нет коллизий имён

**Cons:**

- Не используется в проекте; лишняя абстракция для простой оболочки

**Complexity:** Medium  
**Implementation Time:** ~1 h

#### Option 3: SCSS partials (`_variables.scss`, `_breakpoints.scss`)

**Description:** Отдельные partials с `@use`

**Pros:**

- Масштабируемость

**Cons:**

- Over-engineering для одного layout на этом шаге

**Complexity:** Medium  
**Implementation Time:** ~1 h

### Decision

**Выбран Option 1: `index.scss` + `App.scss`, BEM-подобные классы**

**Rationale:** Минимальный scope, соответствие style-guide («глобальные — index.scss / оболочка в App.scss»).

### Class Naming

| Класс                          | Назначение                                          |
| ------------------------------ | --------------------------------------------------- |
| `.app-shell`                   | Корневой flex-column контейнер, `min-height: 100vh` |
| `.app-shell__header`           | Заголовок приложения                                |
| `.app-shell__title`            | `<h1>` с названием                                  |
| `.app-shell__nav`              | `<nav>` с border-bottom                             |
| `.app-shell__nav-list`         | `<ul>` flex row                                     |
| `.app-shell__nav-link`         | Ссылка NavLink                                      |
| `.app-shell__nav-link--active` | Активный пункт                                      |
| `.app-shell__main`             | `<main>`, flex-grow                                 |

### CSS Variables (`index.scss`)

```scss
:root {
	--color-text: ...;
	--color-text-heading: ...;
	--color-bg: ...;
	--color-border: ...;
	--color-accent: ...;
	--color-accent-bg: ...;
	--font-sans: system-ui, 'Segoe UI', Roboto, sans-serif;
	--space-xs: 0.5rem;
	--space-sm: 1rem;
	--space-md: 1.5rem;
	--space-lg: 2rem;
	--content-max-width: 48rem;
}
```

Миграция из `index.css`: типографика, цвета, spacing; **не** переносить стили Vite-шаблона (hero, counter, social). Сохранить `prefers-color-scheme: dark`.

### Breakpoints

| Token         | Значение | Применение                     |
| ------------- | -------- | ------------------------------ |
| base          | <768px   | Mobile-first                   |
| `$bp-tablet`  | 768px    | padding main, max-width        |
| `$bp-desktop` | 1024px   | увеличенные отступы header/nav |

---

## 4. Маршруты

### Problem Statement

Только `/` или заготовки nav/маршрутов под `step-lessons-navigation`?

### Options Analysis

#### Option 1: Только `/`

**Description:** HomePage с placeholder «Контент уроков будет здесь»

**Pros:**

- Минимальный scope
- Чёткая граница с `step-lessons-navigation`

**Cons:**

- Нет обработки неизвестных URL

**Complexity:** Low  
**Implementation Time:** ~15 min

#### Option 2: Заготовки маршрутов

**Description:** `/`, `/manifest`, `/sw`, … без контента

**Pros:**

- Nav уже готов к урокам

**Cons:**

- Scope creep; пустые/disabled маршруты

**Complexity:** Medium  
**Implementation Time:** ~30 min

#### Option 3: `/` + catch-all 404

**Description:** Главная + `path="*"` → «Страница не найдена»

**Pros:**

- Корректное поведение роутера
- Без лишних nav-пунктов
- Полезно для E2E и отладки

**Cons:**

- Дополнительный минимальный компонент

**Complexity:** Low  
**Implementation Time:** ~20 min

### Decision

**Выбран Option 3: `/` + catch-all 404**

**Rationale:** Минимальный scope + корректная работа React Router; разделы уроков — в `step-lessons-navigation`.

### Component Structure

```
App.tsx
├── layout (.app-shell)
│   ├── header (.app-shell__header) — role="banner"
│   ├── nav (.app-shell__nav) → NavLink «Главная»
│   └── main (.app-shell__main)
│       └── <Routes>
│           ├── Route path="/" → HomePage
│           └── Route path="*" → NotFoundPage
```

Inline-компоненты `HomePage` / `NotFoundPage` в `App.tsx` — достаточно для Level 2; отдельные `pages/` — опционально.

**HomePage контент (для E2E):**

- «Добро пожаловать»
- «Контент уроков будет здесь»

---

## 🎨 CREATIVE CHECKPOINT: Verification

```
✓ CREATIVE PHASE VERIFICATION
- Problem clearly defined? YES
- Multiple options considered (3+)? YES
- Pros/cons documented for each option? YES
- Decision made with clear rationale? YES
- Implementation plan included? YES
- Visualization/diagrams created? YES
- tasks.md updated with decision? YES
```

---

## 🎨🎨🎨 EXITING CREATIVE PHASE — DECISION MADE 🎨🎨🎨

### Summary

Зафиксирован stacked layout (header → nav → main), NavLink с одним пунктом «Главная», SCSS в двух файлах с BEM-классами `app-shell__*`, маршруты `/` и catch-all 404.

### Key Decisions

1. **Layout:** stacked — без hamburger/bottom nav на этом шаге
2. **Nav:** `NavLink`, один пункт «Главная», active через BEM-модификатор
3. **SCSS:** `index.scss` (globals) + `App.scss` (layout), breakpoints 768/1024
4. **Routes:** `/` + `*`; без заготовок разделов уроков

### BUILD Guidelines

- **Header:** `<header role="banner">` с `<h1>edu.pwa-app</h1>`
- **Nav:** `<nav>` с `<ul><li><NavLink>…</NavLink></li></ul>`
- **Main:** `<main>` с `<Routes>` внутри
- **Unit-тесты:** `getByRole('banner')`, `getByRole('navigation')`, `getByRole('main')`
- **E2E:** title `edu.pwa-app`, видимы header/nav/main, текст приветствия в main
- **Не переносить** стили Vite-шаблона

### Next Steps

1. VAN QA — `pnpm add react-router`, POC сборки
2. `/build` — TDD-реализация по плану в `tasks.md`
