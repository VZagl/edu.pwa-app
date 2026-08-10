# Tasks

## Current Task

- **Task ID:** `step-home-lesson-ui`
- **Название:** Главная — учебный экран
- **Создано:** 2026-08-07
- **Сложность:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-home-lesson-ui`
- **Источник:** `docs/project/implementation-plan.md` (Order: 7.0.1)
- **Зависит от:** `step-lessons-navigation` ✅, `step-lighthouse-pwa-checklist` ✅
- **Статус планирования:** COMPLETED (2026-08-10)

### Описание

Заполнить экран «Главная» (сейчас `LessonStubScreen`): карта лаборатории — intro учебного PWA, порядок модулей со ссылками (Manifest → SW → Offline → Install и далее новые разделы), краткий чеклист критериев PWA, блок «как пользоваться» (preview, DevTools). Короткий блок **почему нужен HTTPS** (secure context; исключение `localhost`; на GitHub Pages HTTPS из коробки).

**Цель:** Главная — точка входа для ученика, а не заглушка.

**Файлы:** `src/screens/HomeScreen/`, тесты рядом; при необходимости `src/routes/lessonRoutes.ts`

**Тесты:** unit/integration — ключевые блоки и ссылки на разделы; E2E по смыслу

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-home-lesson-ui
- [x] PLAN: Составить план реализации (`/plan`)
- [x] BUILD: Реализовать экран по TDD (`/build`)
- [x] REFLECT: Рефлексия по задаче (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Technology Stack

- Framework: React 19 + TypeScript
- Build: Vite 8 + `vite-plugin-pwa`
- Styles: SCSS (sass-embedded), BEM по образцу `OfflineScreen`
- Routing: react-router (`Link` + существующий `lessonRoutes`)
- Tests: Vitest + Testing Library; Playwright E2E
- Package manager: pnpm

## Technology Validation Checkpoints

- [x] Project initialization verified (существующий Vite + React)
- [x] Required dependencies identified — новых пакетов не нужно
- [x] Build configuration validated (`pnpm build` уже работает)
- [x] Hello world / stack ready — эталоны `ManifestScreen`, `OfflineScreen`
- [x] Test tooling ready (`pnpm test --run`, `pnpm test:e2e`)

## Creative Phases Required

- Нет (Level 2; UI и структура контента следуют эталону Offline/manifest)

## Implementation Plan

### Структура экрана

```
HomeScreen
├── h2: заголовок («Карта лаборатории» / аналог)
├── intro — что такое учебное PWA
├── region «Модули» — Link из lessonRoutes (без path `/`)
├── region «Чеклист PWA» — 4–6 кратких критериев
├── region «Как пользоваться» — build/preview + DevTools
└── region «Почему HTTPS» — secure context / localhost / GitHub Pages
```

**Модули:** фильтровать `lessonRoutes` (`path !== '/'`), чтобы новые разделы (Cache Storage и т.д.) появлялись автоматически.

### Файлы

| Файл                                         | Действие                                         |
| -------------------------------------------- | ------------------------------------------------ |
| `src/screens/HomeScreen/HomeScreen.tsx`      | заменить `LessonStubScreen` на полноценный экран |
| `src/screens/HomeScreen/homeLessonData.ts`   | создать — intro, чеклист, how-to, HTTPS          |
| `src/screens/HomeScreen/HomeScreen.scss`     | создать — BEM как у `OfflineScreen`              |
| `src/screens/HomeScreen/HomeScreen.test.tsx` | создать — unit/integration                       |
| `e2e/home-lesson.spec.ts`                    | создать — E2E по смыслу                          |
| `src/routes/lessonRoutes.ts`                 | менять только при необходимости (ожидаемо нет)   |

`LessonStubScreen` не удалять — ещё используется SW/Install.

### Шаги BUILD (TDD)

1. **Red:** unit-тесты — блоки, заголовки, ссылки на `/manifest`, `/service-worker`, `/offline`, `/install`
2. **Green:** `homeLessonData.ts` + `HomeScreen.tsx` + `HomeScreen.scss`
3. **E2E:** `e2e/home-lesson.spec.ts` — ключевые блоки и переход по ссылке модуля
4. **Verify:** `pnpm lint`, `pnpm build`, `pnpm test --run`, `pnpm test:e2e`

### BUILD Subtasks

- [x] Data-файл + разметка экрана (5 блоков)
- [x] Ссылки на модули из `lessonRoutes`
- [x] SCSS (mobile-first, токены проекта)
- [x] Unit-тесты (`HomeScreen.test.tsx`)
- [x] E2E (`e2e/home-lesson.spec.ts`)
- [x] Главная больше не рендерит `LessonStubScreen`
- [x] Verify-команды зелёные

### Build Progress

- **Статус:** COMPLETED (2026-08-10)
- **Файлы:**
  - `src/screens/HomeScreen/homeLessonData.ts` — intro, чеклист, how-to, HTTPS
  - `src/screens/HomeScreen/HomeScreen.tsx` — 5 блоков; модули из `lessonRoutes` (filter `path !== '/'` внутри компонента из‑за циклического импорта)
  - `src/screens/HomeScreen/HomeScreen.scss` — BEM как у OfflineScreen
  - `src/screens/HomeScreen/HomeScreen.test.tsx` — 5 unit-тестов
  - `e2e/home-lesson.spec.ts` — блоки + переход в Manifest
- **Связанные правки тестов:** `App.test.tsx`, `e2e/smoke.spec.ts`, `e2e/lessons-navigation.spec.ts`, `e2e/offline-fallback.spec.ts` (новый h2; клики по nav из‑за дублирующих ссылок модулей)
- **Verify:** lint ✅, build ✅, `pnpm test --run` 64 ✅, `pnpm test:e2e` 13 ✅

### Challenges & Mitigations

| Риск                                    | Mitigation                                  |
| --------------------------------------- | ------------------------------------------- |
| Дублирование полного `pwa-checklist.md` | 4–6 пунктов; полный чеклист остаётся в docs |
| Дублирование path/navLabel              | единый источник — `lessonRoutes`            |
| Перегруз UI                             | короткие абзацы, секции `role="region"`     |

### Dependencies

- `step-lessons-navigation` ✅ — маршруты и навигация
- `step-lighthouse-pwa-checklist` ✅ — содержание краткого чеклиста / HTTPS
- Эталоны UI: `OfflineScreen`, `ManifestScreen`

### Reflection Highlights

- **What Went Well**: 5 блоков по плану; модули из `lessonRoutes`; data + screen паттерн; TDD + E2E; a11y regions
- **Challenges**: циклический импорт routes↔HomeScreen; дубли ссылок nav+главная в E2E; обновление stub-ожиданий в 4 спеках
- **Lessons Learned**: фильтр модулей в компоненте как workaround; E2E scope по region; `lessonRoutes` — single source для navLabel/path
- **Next Steps**: `/close-task`; опционально рефакторинг метаданных routes

**Reflection:** [memory-bank/reflection/reflection-step-home-lesson-ui.md](reflection/reflection-step-home-lesson-ui.md)

### Next Mode

`/close-task`

---

## Last Completed Task

- **Task ID:** `step-lighthouse-pwa-checklist`
- **Название:** Чеклист Lighthouse PWA и документирование проверки
- **Дата завершения:** 2026-08-07
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-lighthouse-pwa-checklist_2026-08-07.md](completed-tasks/2026/08/step-lighthouse-pwa-checklist_2026-08-07.md)
- **Reflection:** [memory-bank/reflection/reflection-step-lighthouse-pwa-checklist.md](reflection/reflection-step-lighthouse-pwa-checklist.md)
