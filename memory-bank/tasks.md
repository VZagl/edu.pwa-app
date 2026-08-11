# Tasks

## Current Task

- **Task ID:** `step-storage-quota-lesson-ui`
- **Название:** Storage quota / Persistent storage — отдельный раздел
- **Git Branch:** `feat/step-storage-quota-lesson-ui`
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Feature
- **Источник:** docs/project/implementation-plan.md (step-storage-quota-lesson-ui)
- **Создано:** 2026-08-07
- **Статус:** REFLECT complete → ожидание `/close-task`
- **Зависит от:** step-cache-storage-lesson-ui (закрыта)
- **Reflection:** [memory-bank/reflection/reflection-step-storage-quota-lesson-ui.md](reflection/reflection-step-storage-quota-lesson-ui.md)

### Описание

Отдельный раздел навигации (продвинутый урок): Storage quota / Persistent storage — `navigator.storage.estimate()` (usage/quota), опционально `persist()` / `persisted()`, краткое объяснение лимитов и вытеснения данных браузером.

**Цель:** Понять квоты хранилища и Persistent Storage на практике.

**Ожидаемые артефакты:** `src/screens/StorageScreen/`, хук `useStorageQuota`, `src/routes/lessonRoutes.ts`, unit (моки `navigator.storage`) + E2E.

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-storage-quota-lesson-ui`
- [x] PLAN: Детальный план реализации
- [x] BUILD: Реализация по TDD + verify (lint / build / test / e2e)
- [x] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой `/close-task`

### Reflection Highlights

- **What Went Well**: шаблон lesson-ui; TDD (мок StorageManager / мок хука); Challenges & Mitigations из PLAN закрыты в BUILD
- **Challenges**: jsdom без storage; `persist()` часто false; approximate quota; exact-матч «Storage» vs «Cache Storage»
- **Lessons Learned**: exact-матч для похожих navLabel; `/archive` для Level 2 lesson-ui не обязателен
- **Next Steps**: `/close-task`

### Requirements

- Раздел `/storage` (navLabel: `Storage`): квоты и Persistent Storage
- Живые значения: `navigator.storage.estimate()` → usage/quota; `persisted()`; опционально кнопка `persist()`
- Кратко: лимиты, вытеснение, что значения approximate
- Unit (моки `navigator.storage`) + E2E по структуре UI

### Technology Stack

- Framework: React 19 + TypeScript
- Build: Vite 8 + vite-plugin-pwa (без изменений конфига)
- Styles: SCSS (BEM), mobile-first
- Tests: Vitest + Testing Library; Playwright E2E
- API: native `StorageManager` (`estimate` / `persist` / `persisted`) — без новых npm-зависимостей

### Technology Validation Checkpoints

- [x] Project initialization / стек уже валидированы в проекте
- [x] Required dependencies: новых нет (`package.json` без изменений)
- [x] Build configuration: меняется только `lessonRoutes`
- [x] Hello world / POC: не нужен — повтор lesson-ui (Cache Storage / Install)
- [x] Test build: verify в BUILD (`pnpm lint`, `typecheck`, `test --run`, `build`, e2e)

### Naming

| Артефакт | Имя                                            |
| -------- | ---------------------------------------------- |
| Экран    | `src/screens/StorageScreen/`                   |
| Хук      | `src/hooks/useStorageQuota/useStorageQuota.ts` |
| Контент  | `storageLessonData.ts`                         |
| Маршрут  | `/storage` → navLabel `Storage`                |
| E2E      | `e2e/storage-lesson.spec.ts`                   |

### Структура экрана (регионы)

1. Intro — квоты / eviction / зачем Persistent Storage
2. Storage API — `estimate()`, `persisted()`, `persist()`
3. Демо — usage/quota (байты + человекочитаемо), % заполнения, статус persisted, «Обновить», «Запросить Persistent Storage»
4. Лимиты и вытеснение — краткий учебный текст
5. DevTools — Application → Storage
6. Связь с Cache Storage — ссылка на `/cache-storage`

### Implementation Plan (TDD)

1. **Хук `useStorageQuota`**
   - Состояние: `supported`, `loading`, `error`, `usage`/`quota`, `persisted`
   - Методы: `refresh`, `requestPersist`
   - Чистые функции: `readStorageEstimate`, `readPersisted`, `requestPersist` (или аналог)
   - Unit на моках `navigator.storage`
2. **`storageLessonData.ts`** — intro, apiMethods, limitsHints, devToolsItems
3. **`StorageScreen`** — регионы + SCSS (BEM `storage-screen`); unit с моком хука
4. **Маршрут** — запись в `lessonRoutes`; правки `App.test.tsx`, `HomeScreen.test.tsx` (7-й пункт)
5. **E2E** — `storage-lesson.spec.ts` + шаг в `lessons-navigation.spec.ts`
6. **Verify** — `pnpm lint`, `typecheck`, `test --run`, `build`, точечный e2e

### BUILD Checklist

- [x] Unit: `useStorageQuota` (моки `navigator.storage`) — red → green
- [x] Unit: `StorageScreen` (мок хука) — red → green
- [x] `storageLessonData.ts` + `StorageScreen.tsx` + `StorageScreen.scss`
- [x] Маршрут `/storage` в `lessonRoutes.ts`
- [x] Обновить `App.test.tsx` и `HomeScreen.test.tsx` под 7 пунктов навигации
- [x] E2E: `e2e/storage-lesson.spec.ts`
- [x] E2E: шаг Storage в `e2e/lessons-navigation.spec.ts`
- [x] Verify: lint / typecheck / unit / build / e2e

### Build Results

| Проверка                               | Результат |
| -------------------------------------- | --------- |
| `pnpm lint`                            | ✅        |
| `pnpm typecheck`                       | ✅        |
| `pnpm test --run`                      | ✅        |
| `pnpm build`                           | ✅        |
| `pnpm test:e2e` (storage + navigation) | ✅        |

**Замечание:** в E2E/unit для пункта «Storage» нужен exact-матч (`exact: true` / `/^Storage$/`), иначе пересекается с «Cache Storage».

### Creative Phases Required

- Нет (Level 2; копируем структуру Cache Storage / Install lesson-ui)

### Dependencies

- Закрытая задача `step-cache-storage-lesson-ui` (паттерн экрана и навигации)
- Браузерный `navigator.storage` (StorageManager)

### Challenges & Mitigations

| Риск                                 | Митигация                                              |
| ------------------------------------ | ------------------------------------------------------ |
| jsdom без `navigator.storage`        | Мок API в тестах хука; UI — мок хука                   |
| `persist()` часто возвращает `false` | Показать ответ API; E2E не требует grant               |
| usage/quota approximate / optional   | `usage ?? null`, `quota ?? null`; текст про неточность |
| Навигационные unit-тесты хрупки      | Сразу обновить App/Home под 7 пунктов                  |
| «Storage» vs «Cache Storage» в a11y  | exact-матч в unit/E2E                                  |

### Оценка

~3–5 ч (как Cache Storage)

### Next Mode

`/close-task` — финализация задачи

## Last Completed Task

- **Task ID:** `step-cache-storage-lesson-ui`
- **Название:** Cache Storage — отдельный раздел
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-cache-storage-lesson-ui_2026-08-11.md](completed-tasks/2026/08/step-cache-storage-lesson-ui_2026-08-11.md)
- **Reflection:** [memory-bank/reflection/reflection-step-cache-storage-lesson-ui.md](reflection/reflection-step-cache-storage-lesson-ui.md)
