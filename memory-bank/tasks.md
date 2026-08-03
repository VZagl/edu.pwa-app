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

### Technology Stack

- **Framework:** React 19 + React Router v8 (library mode)
- **Build:** Vite 8
- **Стили:** SCSS (BEM `app-shell__*`)
- **Тесты:** Vitest + Testing Library; Playwright E2E

### Technology Validation Checkpoints

- [x] React Router v8 в `package.json`
- [x] `BrowserRouter` в `main.tsx`
- [x] `MemoryRouter` в unit-тестах (паттерн из `App.test.tsx`)
- [x] Vitest + Playwright настроены (фаза 0)
- [x] SCSS-only, named exports only

### Creative Phases Required

Нет — стандартная навигация и экраны-заглушки без дизайн-решений.

### Архитектура экранов

Три слоя — разная ответственность:

| Слой                | Где                                | Что хранит                                                |
| ------------------- | ---------------------------------- | --------------------------------------------------------- |
| **Маршрутизация**   | `src/routes/lessonRoutes.ts`       | `path`, `navLabel`, ссылка на компонент `Screen`          |
| **Экран урока**     | `src/screens/<Name>Screen/`        | контент, логика, стили, тесты (растёт на следующих шагах) |
| **Каркас заглушки** | `src/components/LessonStubScreen/` | временный layout: h2 + paragraph (только для этого шага)  |

**Сейчас (заглушки):** каждый экран — тонкая обёртка над `LessonStubScreen`; title/description задаются **в файле экрана**, не в `lessonRoutes.ts`.

**Потом (например, `step-manifest-lesson-ui`):** меняется только папка своего экрана — добавляются компоненты, хуки, интерактив; nav и маршруты не трогаются.

```
src/screens/ManifestScreen/
├── ManifestScreen.tsx      # сейчас: LessonStubScreen; потом: полный урок
├── ManifestScreen.scss     # при необходимости
└── ManifestScreen.test.tsx # на шаге с реальным контентом
```

### Маршруты

| Путь              | navLabel (EN)  | Screen                | title h2 (RU, в экране) | description (RU, в экране)                                  |
| ----------------- | -------------- | --------------------- | ----------------------- | ----------------------------------------------------------- |
| `/`               | Главная        | `HomeScreen`          | Добро пожаловать        | Контент уроков будет здесь                                  |
| `/manifest`       | Manifest       | `ManifestScreen`      | Web App Manifest        | Раздел о манифесте PWA. Контент появится на следующем шаге. |
| `/service-worker` | Service Worker | `ServiceWorkerScreen` | Service Worker          | Раздел о регистрации и жизненном цикле SW.                  |
| `/offline`        | Offline        | `OfflineScreen`       | Офлайн и кэш            | Раздел о работе приложения без сети.                        |
| `/install`        | Install        | `InstallScreen`       | Установка PWA           | Раздел об установке приложения на устройство.               |

**404:** `path='*'` → `NotFoundScreen` («Страница не найдена»), не входит в `lessonRoutes`.

**Язык UI:** navLabel — EN-термины курса (кроме «Главная»); title и description — RU, в файле экрана.

### Конфиг маршрутов

`src/routes/lessonRoutes.ts` — **только навигация**, без контента урока:

```typescript
import type { ComponentType } from 'react';

export type LessonRoute = {
	path: string;
	navLabel: string;
	Screen: ComponentType;
};

export const lessonRoutes: LessonRoute[] = [
	{ path: '/manifest', navLabel: 'Manifest', Screen: ManifestScreen },
	// ...
];
```

Рендер в `App.tsx`: `<Route path={route.path} element={<route.Screen />} />`.

Пример экрана-заглушки (контент в папке экрана):

```tsx
// src/screens/ManifestScreen/ManifestScreen.tsx
export function ManifestScreen() {
	return (
		<LessonStubScreen
			title='Web App Manifest'
			description='Раздел о манифесте PWA. Контент появится на следующем шаге.'
		/>
	);
}
```

### Implementation Plan (TDD: red → green → refactor)

1. **Red — unit/integration:** расширить `App.test.tsx`:
   - nav: 5 пунктов (Главная + 4 раздела)
   - клик по ссылке → контент раздела (h2) в `main`
   - активный пункт: `aria-current="page"` (не класс)
   - 404 на неизвестном пути
2. **Red — E2E:** `e2e/lessons-navigation.spec.ts` — сценарий `/` → `/manifest` → `/service-worker` → `/offline` → `/install` → `/`; на каждом шаге проверка h2; в конце «Добро пожаловать»
3. **Green — реализация:**
   - `src/components/LessonStubScreen/LessonStubScreen.tsx`
   - `src/screens/HomeScreen/HomeScreen.tsx`
   - `src/screens/ManifestScreen/ManifestScreen.tsx`
   - `src/screens/ServiceWorkerScreen/ServiceWorkerScreen.tsx`
   - `src/screens/OfflineScreen/OfflineScreen.tsx`
   - `src/screens/InstallScreen/InstallScreen.tsx`
   - `src/screens/NotFoundScreen/NotFoundScreen.tsx`
   - `src/routes/lessonRoutes.ts` — path, navLabel, Screen
   - рефакторинг `App.tsx` — nav и Routes из конфига; catch-all 404
   - `src/App.scss` — horizontal scroll nav (см. Challenges)
4. **Cleanup:** удалить `src/router-poc.test.tsx`
5. **Verify:** `pnpm lint`, `pnpm build`, `pnpm test --run`, `pnpm test:e2e`

### Файлы

**Создать:**

- `src/routes/lessonRoutes.ts`
- `src/components/LessonStubScreen/LessonStubScreen.tsx`
- `src/screens/HomeScreen/HomeScreen.tsx`
- `src/screens/ManifestScreen/ManifestScreen.tsx`
- `src/screens/ServiceWorkerScreen/ServiceWorkerScreen.tsx`
- `src/screens/OfflineScreen/OfflineScreen.tsx`
- `src/screens/InstallScreen/InstallScreen.tsx`
- `src/screens/NotFoundScreen/NotFoundScreen.tsx`
- `e2e/lessons-navigation.spec.ts`

**Изменить:**

- `src/App.tsx`
- `src/App.scss`
- `src/App.test.tsx`

**Удалить:**

- `src/router-poc.test.tsx`

**Не создавать на этом шаге:** `*.test.tsx` для экранов-заглушек (presentational без логики); навигация покрывается `App.test.tsx`. Unit-тесты экрана — на шагах с реальным контентом (`step-manifest-lesson-ui` и далее).

### Challenges & Mitigations

- **5 пунктов nav на узком экране:** horizontal scroll на `.app-shell__nav-list` (`overflow-x: auto`, `flex-wrap: nowrap`, `-webkit-overflow-scrolling: touch`); touch target ≥ 44px уже есть
- **Дублирование заглушек:** общий `LessonStubScreen` (layout); title/description — в каждом `*Screen.tsx`; на следующих шагах экран заменяется целиком без изменения `lessonRoutes.ts`
- **Регрессия step-app-shell:** расширить существующие тесты `App.test.tsx`; `e2e/smoke.spec.ts` не менять (контент Home сохраняется)

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-lessons-navigation
- [x] PLAN: Детальный план реализации
- [x] BUILD: TDD — экраны-заглушки, маршруты, навигация, тесты, удаление router-poc
- [ ] REFLECT: Рефлексия по задаче

### Build Progress

- **Red:** `App.test.tsx` — 5 nav-пунктов, клик → h2, `aria-current="page"`, 404; `e2e/lessons-navigation.spec.ts`
- **Green:** `LessonStubScreen`, 6 экранов (`HomeScreen` … `NotFoundScreen`), `lessonRoutes.ts`, рефакторинг `App.tsx`, horizontal scroll в `App.scss`
- **Cleanup:** удалён `src/router-poc.test.tsx`
- **Verify:** lint ✅, build ✅, test (8) ✅, e2e (2) ✅
- [ ] CLOSE: Финализировать задачу командой /close-task

## Last Completed Task

- **Task ID:** `step-app-shell`
- **Название:** Базовая оболочка приложения
- **Дата завершения:** 2026-08-01
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/07/step-app-shell_2026-08-01.md](completed-tasks/2026/07/step-app-shell_2026-08-01.md)
