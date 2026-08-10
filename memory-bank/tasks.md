# Tasks

## Current Task

- **Task ID:** `step-sw-lesson-ui`
- **Название:** Service Worker — учебный экран
- **Git Branch:** `feat/step-sw-lesson-ui`
- **Уровень сложности:** Level 2
- **Статус:** BUILD → REFLECT
- **Источник:** `docs/project/implementation-plan.md` (step-sw-lesson-ui)

### Описание

Заполнить экран «Service Worker»: intro (scope, отличие от обычного скрипта), lifecycle (install → activate → controlling / waiting), живое демо (`controller`, state регистрации, scope), связь с баннером обновления (`swUpdateController`). Показать версию сборки / revision в UI. Учебная кнопка «Сбросить SW и кэш» с пометкой «только для лаборатории». Перекрёстная ссылка на Offline.

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-sw-lesson-ui
- [x] PLAN: Детальный план реализации
- [x] BUILD: Реализация (TDD)
- [ ] REFLECT: Рефлексия
- [ ] CLOSE: Финализировать задачу командой /close-task

### Technology Stack

- React 19 + React Router 8 + SCSS (BEM)
- `vite-plugin-pwa` + Workbox (`virtual:pwa-register`)
- `workbox-window` (уже в dependencies)
- Vitest + Playwright

### Technology Validation Checkpoints

- [x] Стек определён (существующий)
- [x] SW-инфраструктура работает (`e2e/service-worker-pwa.spec.ts`)
- [x] Паттерн учебных экранов отработан (`step-home-lesson-ui`, `OfflineScreen`)
- [x] `registerType: 'prompt'` + `swUpdateController` готовы
- [x] BUILD: финальный verify (lint, build, unit, e2e)

### Архитектура файлов

```
src/screens/ServiceWorkerScreen/
├── ServiceWorkerScreen.tsx      # заменить LessonStubScreen
├── ServiceWorkerScreen.scss     # BEM по образцу offline-screen / home-screen
├── swLessonData.ts              # статический учебный контент
└── ServiceWorkerScreen.test.tsx

src/hooks/useServiceWorkerInfo/
├── useServiceWorkerInfo.ts      # живой статус SW (scope, states, controller)
└── useServiceWorkerInfo.test.ts

src/pwa/
├── resetServiceWorkerLab.ts     # unregister + очистка caches + reload
└── resetServiceWorkerLab.test.ts

e2e/sw-lesson.spec.ts            # smoke E2E экрана
```

### Структура экрана

1. **Заголовок** — `Service Worker`
2. **Intro** — что такое SW, scope `/`, отличие от обычного `<script>`
3. **Lifecycle** — нумерованный список: `install` → `activate` → `controlling` / `waiting`
4. **Живое демо** (`useServiceWorkerInfo`) — scope, states worker, controller, revision (`active.scriptURL`)
5. **Update flow** — связь с `swUpdateController` + `SwUpdateBanner`
6. **Кнопка сброса** — `resetServiceWorkerLab()` с пометкой «только для лаборатории»
7. **Ссылка на Offline** — `<Link to="/offline">` (без дублирования runtime rules)

### План реализации (TDD, BUILD)

**Шаг 1 — Данные и утилиты (red → green)**

- [x] `swLessonData.ts` — intro, lifecycle, предупреждения, тексты ссылок
- [x] `useServiceWorkerInfo` — подписка на `controllerchange`, чтение `getRegistration()`
- [x] `resetServiceWorkerLab` — `getRegistrations()` → `unregister()`, `caches.keys()` → `delete()`, `location.reload()`
- [x] Unit-тесты хука и утилиты (моки `navigator.serviceWorker`, `caches`)

**Шаг 2 — UI экрана**

- [x] `ServiceWorkerScreen.tsx` — секции по структуре выше
- [x] `ServiceWorkerScreen.scss` — BEM, badge для статусов (как `offline-screen__badge`)
- [x] Unit-тесты экрана: intro, lifecycle, демо (мок хука), revision, предупреждение кнопки, ссылка на Offline, update flow

**Шаг 3 — E2E и интеграция**

- [x] `e2e/sw-lesson.spec.ts` — ключевые секции на `/service-worker`
- [x] Проверить `lessons-navigation.spec.ts` (заголовок «Service Worker» сохраняется)
- [x] Verify: `pnpm lint`, `pnpm build`, `pnpm test --run`, `pnpm test:e2e`

### Creative Phases Required

Нет — Level 2, паттерны зафиксированы в `HomeScreen` / `OfflineScreen` / `ManifestScreen`. Следующий режим: `/build`.

### Зависимости

- [x] `step-sw-update-ux` — `swUpdateController`, `SwUpdateBanner`
- [x] `step-lessons-navigation` — маршрут `/service-worker`

### Challenges & Mitigations

| Вызов                       | Решение                                                   |
| --------------------------- | --------------------------------------------------------- |
| SW отключён в `pnpm dev`    | Явное сообщение + инструкция preview                      |
| Сложность моков SW API      | Вынести логику в хук/утилиту; тестировать изолированно    |
| Деструктивная кнопка сброса | E2E только проверяет наличие и предупреждение, не кликает |
| Revision без нового env     | `active.scriptURL` как идентификатор сборки SW            |

---

## Last Completed Task

- **Task ID:** `step-home-lesson-ui`
- **Название:** Главная — учебный экран
- **Дата завершения:** 2026-08-10
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-home-lesson-ui_2026-08-10.md](completed-tasks/2026/08/step-home-lesson-ui_2026-08-10.md)
- **Reflection:** [memory-bank/reflection/reflection-step-home-lesson-ui.md](reflection/reflection-step-home-lesson-ui.md)
