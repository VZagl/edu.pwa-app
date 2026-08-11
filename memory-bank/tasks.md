# Tasks

## Current Task

- **Task ID:** `step-cache-storage-lesson-ui`
- **Название:** Cache Storage — отдельный раздел
- **Git Branch:** `feat/step-cache-storage-lesson-ui`
- **Complexity:** Level 2 — Simple Enhancement
- **Источник:** docs/project/implementation-plan.md (step-cache-storage-lesson-ui, Order 7.0.4)
- **Создано:** 2026-08-07
- **Статус:** REFLECT complete → ожидает `/close-task`
- **Reflection:** [memory-bank/reflection/reflection-step-cache-storage-lesson-ui.md](reflection/reflection-step-cache-storage-lesson-ui.md)

### Описание

Отдельный раздел навигации «Cache Storage»: описание Cache Storage API + блок живых значений — список `caches.keys()`, для выбранного кэша — URL из `cache.keys()`. Кнопка обновления списка. Без вывода тел ответов.

**Цель:** Ученик видит реальные кэши Workbox/runtime в UI приложения.

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-cache-storage-lesson-ui`
- [x] PLAN: Детальный план реализации
- [x] BUILD: Реализация (TDD)
- [x] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой `/close-task`

### Reflection Highlights

- **What Went Well:** шаблон hook + data + screen; TDD (мок `caches` / мок хука); previewHint; сохранение `selectedCache` после refresh
- **Challenges:** jsdom без `caches`; пустые кэши в dev; хрупкие Home/App-тесты на число пунктов навигации
- **Lessons Learned:** для урока достаточно keys/URL без тел; при смене `lessonRoutes` сразу править Home/App unit
- **Next Steps:** `/close-task` (без `/archive`)

---

## Requirements

1. Новый пункт навигации **Cache Storage** (`/cache-storage`)
2. Описание Cache Storage API (`caches.keys`, `caches.open`, `cache.keys`; без тел ответов)
3. Живой блок: список имён кэшей → выбор → URL записей; кнопка «Обновить»
4. Связь с Offline/Workbox (precache, `runtime-json`, `runtime-images`)
5. Unit: мок `caches`; E2E по смыслу (регионы / навигация)
6. Без новых npm-зависимостей

## Technology Stack

- Framework: React 19 + TypeScript
- Routing: React Router 8 (`lessonRoutes`)
- Styles: SCSS, BEM `cache-storage-screen`
- Browser API: `window.caches` (Cache Storage)
- Hook: `useCacheStorage` (паттерн `useServiceWorkerInfo`)
- Tests: Vitest + Testing Library; Playwright E2E
- Package manager: pnpm

## Technology Validation Checkpoints

- [x] Стек проекта подтверждён (`package.json`: React, Vitest, Playwright, sass-embedded)
- [x] Новых зависимостей не требуется
- [x] Паттерн data + screen + hook уже в кодовой базе (Install / SW / Offline)
- [x] Hello World / PoC не нужен — API `caches` стандартный; в unit — мок
- [x] Test build после BUILD: `pnpm lint`, `typecheck`, `test --run`, `build` (+ e2e cache-storage / navigation)

## Creative Phases Required

- [x] Не требуются (Level 2; UI/API по существующим учебным экранам)

## Implementation Plan

### 1. Хук `useCacheStorage` (TDD)

- Создать `src/hooks/useCacheStorage/useCacheStorage.ts`
- Экспорт: `readCacheNames()`, `readCacheUrls(cacheName)`, хук со состоянием
- Состояния: `supported`, `loading`, `error`, `cacheNames`, `selectedCache`, `urls`
- Действия: `refresh()`, `selectCache(name)`
- При отсутствии `caches` — `supported: false`
- Не читать тела ответов — только `request.url` из `cache.keys()`
- Unit: `useCacheStorage.test.ts` с моком `globalThis.caches`

### 2. Lesson data

- Создать `src/screens/CacheStorageScreen/cacheStorageLessonData.ts`
- intro, bullets API, DevTools, hint preview, связь с Offline/Workbox

### 3. Экран `CacheStorageScreen`

- Создать `CacheStorageScreen.tsx` + `CacheStorageScreen.scss`
- Секции (`role="region"`):
  1. Intro
  2. Cache Storage API
  3. Демо: живые кэши (список, выбор, URL, «Обновить», empty/unsupported/loading/error)
  4. Связь с Offline / Workbox
  5. DevTools
- BEM-блок `cache-storage-screen`; стиль как у Install/Offline

### 4. Unit-тесты экрана

- `CacheStorageScreen.test.tsx` — мок хука (`vi.hoisted` + `vi.mock`)
- Сценарии: заголовок/intro, API-секция, empty, список кэшей, выбор → URL, refresh, unsupported

### 5. Маршрут и навигация

- `src/routes/lessonRoutes.ts`: после Install добавить  
  `{ path: '/cache-storage', navLabel: 'Cache Storage', Screen: CacheStorageScreen }`
- HomeScreen подхватит пункт автоматически через `lessonRoutes`

### 6. E2E

- Создать `e2e/cache-storage-lesson.spec.ts` — регионы и ключевые тексты на `/cache-storage`
- Обновить `e2e/lessons-navigation.spec.ts` — переход на Cache Storage

### 7. Verify (перед завершением BUILD)

- `pnpm lint`, `pnpm typecheck`, `pnpm test --run`, `pnpm build`
- При необходимости: `pnpm test:e2e` (cache-storage-lesson + lessons-navigation)

## Files to Create / Modify

| Действие | Путь                                                         |
| -------- | ------------------------------------------------------------ |
| Создать  | `src/hooks/useCacheStorage/useCacheStorage.ts`               |
| Создать  | `src/hooks/useCacheStorage/useCacheStorage.test.ts`          |
| Создать  | `src/screens/CacheStorageScreen/cacheStorageLessonData.ts`   |
| Создать  | `src/screens/CacheStorageScreen/CacheStorageScreen.tsx`      |
| Создать  | `src/screens/CacheStorageScreen/CacheStorageScreen.scss`     |
| Создать  | `src/screens/CacheStorageScreen/CacheStorageScreen.test.tsx` |
| Изменить | `src/routes/lessonRoutes.ts`                                 |
| Создать  | `e2e/cache-storage-lesson.spec.ts`                           |
| Изменить | `e2e/lessons-navigation.spec.ts`                             |

## Dependencies

- step-offline-fallback, step-lessons-navigation (уже закрыты)
- Существующие экраны Offline / SW — только для ссылок в тексте; код не ломать
- Workbox cache names из `vite.config.ts` / `offlineLessonData` (документация в UI)

## Challenges & Mitigations

| Риск                                      | Митигация                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| В `pnpm dev` SW/кэши пусты или ограничены | Hint про `pnpm build` + `pnpm preview`; unit на моках; E2E — структура UI |
| jsdom без `caches`                        | Мок `globalThis.caches` в тестах хука и экрана                            |
| Длинный список URL precache               | Список + прокрутка; без тел ответов                                       |
| Выбор кэша после refresh                  | Сохранять `selectedCache`, если имя ещё есть в `cacheNames`               |

## BUILD Subtasks

- [x] 1. Хук `useCacheStorage` + unit-тесты (TDD)
- [x] 2. `cacheStorageLessonData.ts`
- [x] 3. `CacheStorageScreen` + SCSS
- [x] 4. Unit-тесты экрана
- [x] 5. Маршрут в `lessonRoutes.ts`
- [x] 6. E2E cache-storage-lesson + обновление lessons-navigation
- [x] 7. Verify: lint, typecheck, unit, build (+ e2e по необходимости)

## Build Results

- **lint:** ✅ `pnpm lint`
- **typecheck:** ✅ `pnpm typecheck`
- **unit:** ✅ 106 passed (20 files), в т.ч. `useCacheStorage` (10) + `CacheStorageScreen` (8)
- **build:** ✅ `pnpm build` (PWA precache ok)
- **e2e:** ✅ `cache-storage-lesson.spec.ts` + `lessons-navigation.spec.ts`
- **Дополнительно:** обновлены `App.test.tsx` и `HomeScreen.test.tsx` под 6 пунктов навигации

## Last Completed Task

- **Task ID:** `step-install-lesson-ui`
- **Название:** Install — учебный экран
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-install-lesson-ui_2026-08-11.md](completed-tasks/2026/08/step-install-lesson-ui_2026-08-11.md)
- **Reflection:** [memory-bank/reflection/reflection-step-install-lesson-ui.md](reflection/reflection-step-install-lesson-ui.md)
