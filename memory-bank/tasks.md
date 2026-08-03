# Tasks

## Current Task

- **Task ID:** `step-manifest-lesson-ui`
- **Название:** Экран урока «Manifest»
- **Уровень сложности:** Level 2 — Enhancement с планированием
- **Git Branch:** `feat/step-manifest-lesson-ui`
- **Дата создания:** 2026-08-03
- **Источник:** `memory-bank/backlog.md`, `docs/project/implementation-plan.md` (Order: 2.1.2)
- **Зависит от:** `step-web-app-manifest` ✅, `step-lessons-navigation` ✅

### Описание

Экран урока «Manifest»: краткое объяснение в UI + отображение текущих значений manifest (fetch `/manifest.webmanifest`).

**Цель:** Раздел Manifest в приложении объясняет и показывает живые данные.

**Файлы:** `src/screens/ManifestScreen/` (и тесты рядом с модулями); nav и `lessonRoutes.ts` не трогать.

**Тесты:** unit/integration — экран показывает данные manifest; E2E по смыслу сценария урока.

### Technology Stack

- **UI:** React 19 + SCSS (только в папке экрана)
- **Данные:** `fetch('/manifest.webmanifest')` — native API, без новых зависимостей
- **Типы:** TypeScript interface по `docs/project/config-schema.md`
- **Unit/integration:** Vitest + Testing Library
- **E2E:** Playwright (`webServer` на preview)

### Technology Validation Checkpoints

- [x] Зависимости — новых не нужно (`package.json` без изменений)
- [x] Build config — без изменений
- [x] Manifest доступен по `/manifest.webmanifest` (проверено в `e2e/web-app-manifest.spec.ts`)
- [x] Vitest + Playwright работают (фаза 0 закрыта)

### Implementation Plan

#### Архитектура (`src/screens/ManifestScreen/`)

```
ManifestScreen/
├── ManifestScreen.tsx          # экран: объяснение + данные
├── ManifestScreen.scss         # стили экрана (BEM: manifest-screen__)
├── ManifestScreen.test.tsx     # unit/integration
├── fetchManifest.ts            # pure fetch + parse JSON
├── fetchManifest.test.ts       # unit для fetch-утилиты
└── types.ts                    # WebAppManifest, ManifestIcon
```

**Поток данных:** `ManifestScreen` → `useEffect` → `fetchManifest()` → `GET /manifest.webmanifest` → JSON → UI (объяснение + `<dl>` полей).

**Почему fetch, а не статический объект:** соответствует цели шага («живые данные»); manifest — отдельный HTTP-ресурс, как в DevTools → Application.

#### UI-решения (без `/creative`)

1. **Заголовок:** `<h2>Web App Manifest</h2>` — сохранить для совместимости с `App.test.tsx` и `e2e/lessons-navigation.spec.ts`
2. **Объяснение:** 2–3 абзаца `<p>` — что такое manifest, зачем браузеру, связь с установкой PWA
3. **Данные:** `<section aria-labelledby="manifest-data-heading">` + `<dl>` для MVP-полей: `name`, `short_name`, `start_url`, `display`, `theme_color`, `background_color`; опционально `description`, `lang`, `scope`; `icons` — список `src / sizes / type`
4. **Состояния:** loading («Загрузка данных манифеста…»), error («Не удалось загрузить манифест»)
5. **Стили:** CSS-переменные из `index.scss`, mobile-first

#### TDD-шаги (BUILD)

1. **Типы и fetch-утилита**
   - [ ] `types.ts`: `WebAppManifest`, `ManifestIcon` по `config-schema.md`
   - [ ] `fetchManifest.ts`: GET → JSON, throw при `!response.ok`
   - [ ] RED → GREEN: `fetchManifest.test.ts` (mock `global.fetch`, успех и ошибка)

2. **Экран (unit/integration)**
   - [ ] RED: `ManifestScreen.test.tsx` — mock fetch, loading/success/error, объяснительный текст, значения полей
   - [ ] GREEN: `ManifestScreen.tsx` с `useState` + `useEffect`
   - [ ] REFACTOR при необходимости

3. **Стили**
   - [ ] `ManifestScreen.scss`: отступы, `<dl>` layout, color swatch для `theme_color` / `background_color`
   - [ ] Импорт в `ManifestScreen.tsx`

4. **E2E**
   - [ ] `e2e/manifest-lesson.spec.ts`: goto `/manifest`, heading, видимые значения из реального manifest
   - [ ] Не дублировать HTTP-проверки из `web-app-manifest.spec.ts`

5. **Verify**
   - [ ] `pnpm lint`
   - [ ] `pnpm build`
   - [ ] `pnpm test --run`
   - [ ] `pnpm test:e2e`

6. **Регрессии**
   - [ ] `App.test.tsx` — heading «Web App Manifest» на `/manifest`
   - [ ] `e2e/lessons-navigation.spec.ts` — навигация без изменений

### Файлы

| Файл                                                 | Действие          |
| ---------------------------------------------------- | ----------------- |
| `src/screens/ManifestScreen/types.ts`                | создать           |
| `src/screens/ManifestScreen/fetchManifest.ts`        | создать           |
| `src/screens/ManifestScreen/fetchManifest.test.ts`   | создать           |
| `src/screens/ManifestScreen/ManifestScreen.tsx`      | заменить заглушку |
| `src/screens/ManifestScreen/ManifestScreen.scss`     | создать           |
| `src/screens/ManifestScreen/ManifestScreen.test.tsx` | создать           |
| `e2e/manifest-lesson.spec.ts`                        | создать           |
| `lessonRoutes.ts`, nav, другие экраны                | **не трогать**    |

### Creative Phases Required

- [ ] UI/UX Design — **нет** (простой учебный layout)
- [ ] Architecture — **нет** (стандартный fetch + useState)
- [ ] Data Model — **нет** (типы из `config-schema.md`)

### Dependencies

- `step-web-app-manifest` ✅ — `public/manifest.webmanifest`, иконки, `config-schema.md`
- `step-lessons-navigation` ✅ — маршрут `/manifest`, заглушка `ManifestScreen`

### Challenges & Mitigations

| Challenge                    | Mitigation                                                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Первый async fetch в проекте | Изолировать в `fetchManifest.ts`; mock через `vi.stubGlobal('fetch', …)` + `afterEach(vi.restoreAllMocks)` |
| Flaky E2E при async load     | `await expect(...).toBeVisible()` с auto-retry Playwright                                                  |
| Дублирование assert manifest | E2E UI — только видимые значения; HTTP — в `web-app-manifest.spec.ts`                                      |
| Регрессия навигации          | Сохранить `<h2>Web App Manifest</h2>`                                                                      |
| Цвета в `<dl>`               | Swatch + hex-текст, не только цвет                                                                         |

### Оценка

~2–3 ч (PLAN ✅ + BUILD TDD + verify)

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-manifest-lesson-ui`
- [x] PLAN: Детальный план реализации (`/plan`)
- [ ] BUILD: TDD red → green → refactor
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой `/close-task`

## Last Completed Task

- **Task ID:** `step-web-app-manifest`
- **Название:** Web App Manifest
- **Дата завершения:** 2026-08-03
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-web-app-manifest_2026-08-03.md](completed-tasks/2026/08/step-web-app-manifest_2026-08-03.md)
- **Reflection:** [memory-bank/reflection/reflection-step-web-app-manifest.md](reflection/reflection-step-web-app-manifest.md)
