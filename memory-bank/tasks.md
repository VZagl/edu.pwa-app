# Tasks

## Current Task

- **Task ID:** `step-sw-update-download-progress`
- **Название:** Прогресс загрузки новой версии SW / precache
- **Git Branch:** `feat/step-sw-update-download-progress`
- **Создано:** 2026-08-12
- **Источник:** memory-bank/backlog.md (Идеи)
- **Зависит от:** `step-sw-update-apply-fast` ✅
- **Complexity:** Level 3 — Intermediate Feature
- **Тип:** Enhancement (PWA update UX / precache progress)
- **Статус:** REFLECT COMPLETE → следующий шаг `/close-task`
- **Creative doc:** [creative/creative-sw-update-download-progress.md](creative/creative-sw-update-download-progress.md)
- **Reflection:** [reflection/reflection-step-sw-update-download-progress.md](reflection/reflection-step-sw-update-download-progress.md)

### Описание

Индикатор прогресса фонового скачивания assets новой версии на этапе install/precache.

**Уточнённый UX (подтверждён):**

1. Пока идёт фоновое скачивание (`installing` / precache) — показывать прогресс
2. После завершения скачивания (SW в `waiting`) — убрать прогресс и показать кнопку **«Обновить»**
3. После клика «Обновить» — только «Обновляется…» без % (activate + reload; загрузка уже завершена)

**Решения CREATIVE:** источник — lifecycle клиента (indeterminate); UI — расширить `SwUpdateBanner`. `generateSW` / push без изменений.

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-sw-update-download-progress`
- [x] PLAN: Детальный план реализации (`/plan`)
- [x] CREATIVE: Выбор подхода к прогрессу precache и UX (`/creative`)
- [x] BUILD: Реализация по TDD (`/build`)
- [x] REFLECT: Рефлексия (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Requirements

### Functional

- [x] Во время фонового install/precache показывать индикатор прогресса скачивания
- [x] По завершении скачивания скрыть прогресс и показать кнопку «Обновить» (текущий apply-flow)
- [x] После клика «Обновить» — «Обновляется…» без процента; сохранить in-flight защиту `applySwUpdate`
- [x] Опционально отразить поведение в учебном разделе Service Worker (`swLessonData` / экран)

### Non-Functional

- [x] Не ломать push (`sw-push.js` + `importScripts`), offline/precache, GitHub Pages `base`
- [x] TDD; проверка SW через `pnpm build` + `pnpm preview` (в dev SW отключён)
- [x] Учебная ясность важнее «продакшен-полировки»

### Constraints

- `generateSW` не даёт API прогресса precache из коробки
- `onNeedRefresh` срабатывает уже после precache (waiting) — прогресс нужен **до** этого события
- На Pages/CDN обнаружение нового SW может быть с задержкой (уже учтено в controller)

---

## Technology Stack

| Область           | Выбор                                                                 |
| ----------------- | --------------------------------------------------------------------- |
| Framework / build | React 19 + Vite 8 (без смены)                                         |
| PWA               | `vite-plugin-pwa@^1.3` + `workbox-window@^7.4` (уже в `package.json`) |
| Регистрация       | `virtual:pwa-register` + `swUpdateController` (база)                  |
| Стили             | SCSS / BEM (как `SwUpdateBanner`)                                     |

### Technology Validation Checkpoints

- [x] Project initialization / стек уже готов (фаза 0+ закрыта)
- [x] Required dependencies identified (новых нет; `injectManifest` не выбран)
- [x] Build configuration validated (текущий `VitePWA` + `generateSW`)
- [x] Hello-world verification = существующий `pnpm build` → `sw.js` + prompt UX
- [x] Паритет push / runtimeCaching / navigateFallback: стратегия SW **не** меняется (CREATIVE → Option A)

---

## Affected Components

| Компонент                                                                | Изменения                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `src/pwa/swUpdateController.ts`                                          | `isDownloading` / `downloadProgress`; `updatefound` + `statechange` |
| `src/hooks/useSwUpdate.ts`                                               | Проброс нового state                                                |
| `src/components/SwUpdateBanner/*`                                        | UI: фаза download → «Обновить» → «Обновляется…»                     |
| `vite.config.ts` / кастомный SW                                          | **Без изменений** (injectManifest не выбран)                        |
| `public/sw-push.js` / importScripts                                      | **Без изменений**                                                   |
| `swLessonData` / `ServiceWorkerScreen`                                   | Учебный текст update flow                                           |
| `docs/project/pwa-checklist.md` (+ при необходимости `config-schema.md`) | Ручная проверка                                                     |
| Тесты controller / hook / banner (+ E2E smoke)                           | TDD                                                                 |

---

## Implementation Plan (по CREATIVE)

### Phase 1 — Контракт состояния ✅

1. Расширить `SwUpdateState`: `isDownloading`, `downloadProgress: number | null` (`null` = indeterminate)
2. Unit-тесты controller (red → green)

### Phase 2 — Источник событий (Option A) ✅

1. Lifecycle: `registration` → `updatefound` / `installing` + `statechange`
2. `onNeedRefresh` → конец download, `updateAvailable`
3. Не мигрировать на `injectManifest`

### Phase 3 — UI (Option 1) ✅

1. Индикатор indeterminate на фазе download в `SwUpdateBanner`
2. После waiting — убрать прогресс, кнопка «Обновить»
3. После клика — «Обновляется…» без %

### Phase 4 — Урок + docs ✅

1. Обновить `updateFlowDescription` / связанные тексты
2. Обновить `pwa-checklist.md` (ручной сценарий download → banner)

### Phase 5 — Verify ✅

1. `pnpm lint`, `typecheck`, `test --run`, `build`
2. E2E: не добавляли (unit покрывает state-машину; smoke UI — через unit banner)
3. Ручной preview: две сборки / update SW → прогресс → «Обновить» → reload (чеклист обновлён)

---

## Build Progress

- **Phase 1–2 (controller):** Complete
  - Files: `src/pwa/swUpdateController.ts`, `src/pwa/swUpdateController.test.ts`
  - Lifecycle `updatefound` / `installing` + `statechange`; контракт `isDownloading` / `downloadProgress`
- **Phase 3 (UI):** Complete
  - Files: `src/hooks/useSwUpdate.ts`, `SwUpdateBanner.tsx/.scss/.test.tsx`, `useSwUpdate.test.ts`
  - Три фазы баннера: download / waiting / applying
- **Phase 4 (урок + docs):** Complete
  - Files: `swLessonData.ts`, `docs/project/pwa-checklist.md`
- **Phase 5 (verify):** Complete
  - lint ✅, typecheck ✅, unit 164 ✅, build ✅ (`generateSW`, precache 13 entries)

### Test Results

| Команда           | Результат     |
| ----------------- | ------------- |
| `pnpm lint`       | ✅            |
| `pnpm typecheck`  | ✅            |
| `pnpm test --run` | ✅ 164 passed |
| `pnpm build`      | ✅ + `sw.js`  |

---

## Creative Phases Required

- [x] 🏗️ **Architecture** — **решение: Option A** (lifecycle клиента, indeterminate)
  - Документ: [creative/creative-sw-update-download-progress.md](creative/creative-sw-update-download-progress.md)
  - A ✅ lifecycle; B injectManifest — отложено; C workbox-window — отклонён
- [x] 🎨 **UI/UX** — **решение: Option 1** (расширить `SwUpdateBanner`)
  - Download: «Загружается обновление…» + indeterminate progressbar
  - Waiting / Applying — как сейчас
  - Отдельный strip и «только урок» — отклонены; текст урока — в Phase 4 BUILD

---

## Dependencies

- База: `step-sw-update-apply-fast` ✅ (`swUpdateController`, in-flight apply, proactive `update()`)
- `vite-plugin-pwa` `registerType: 'prompt'`, `injectRegister: null`
- Push через `workbox.importScripts: ['sw-push.js']` — без изменений

---

## Challenges & Mitigations

| Риск                                             | Митигация                                            |
| ------------------------------------------------ | ---------------------------------------------------- |
| `onNeedRefresh` слишком поздно для прогресса     | Слушать `installing` до waiting                      |
| Миграция на `injectManifest` ломает push/offline | Не мигрируем (CREATIVE A)                            |
| Точный % на маленьком precache почти незаметен   | Indeterminate; `%` — nice-to-have later              |
| E2E нестабилен для реального download            | Unit на state-машину; E2E — smoke UI; ручной preview |
| Dev без SW                                       | Документировать preview-only                         |

---

## Testing Strategy

- **Unit:** controller (installing → progress → waiting → needRefresh), hook, banner states
- **E2E:** smoke (индикатор/баннер не ломают первую загрузку); без жёсткого assert на %
- **Ручная:** `build` → `preview` → смена сборки → download progress → «Обновить» → reload

---

## Status

- [x] Initialization complete (VAN)
- [x] Planning complete (PLAN)
- [x] Creative phases complete
- [x] Technology validation complete (финальный checkpoint после CREATIVE)
- [x] Implementation complete (BUILD)
- [x] Reflection complete
- [ ] Task closed (`/close-task`)

## Reflection Highlights

- **What Went Well:** CREATIVE Option A без миграции SW; TDD state-машины; один баннер на три фазы; контракт `downloadProgress` на будущее
- **Challenges:** короткий precache → прогресс может мелькать; Pages/mobile verify после деплоя
- **Lessons Learned:** `onNeedRefresh` слишком поздно — нужен lifecycle `installing`; indeterminate честнее ложного %
- **Next Steps:** `/close-task` → merge/deploy → ручная проверка update flow

## Last Completed Task

- **Task ID:** `step-remove-lesson-stub`
- **Название:** Убрать `LessonStubScreen`, когда все разделы заполнены
- **Дата завершения:** 2026-08-12
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-remove-lesson-stub_2026-08-12.md](completed-tasks/2026/08/step-remove-lesson-stub_2026-08-12.md)
