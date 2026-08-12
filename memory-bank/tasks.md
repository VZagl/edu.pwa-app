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
- **Статус:** PLAN COMPLETE → следующий шаг `/creative`

### Описание

Индикатор прогресса фонового скачивания assets новой версии на этапе install/precache.

**Уточнённый UX (подтверждён):**

1. Пока идёт фоновое скачивание (`installing` / precache) — показывать прогресс
2. После завершения скачивания (SW в `waiting`) — убрать прогресс и показать кнопку **«Обновить»**
3. После клика «Обновить» — только «Обновляется…» без % (activate + reload; загрузка уже завершена)

Технически — события Workbox / `workbox-window` / сообщения из SW / lifecycle `registration.installing`; с текущим `generateSW` + `virtual:pwa-register` нужен CREATIVE (источник прогресса + форма индикатора).

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-sw-update-download-progress`
- [x] PLAN: Детальный план реализации (`/plan`)
- [ ] CREATIVE: Выбор подхода к прогрессу precache и UX (`/creative`)
- [ ] BUILD: Реализация по TDD (`/build`)
- [ ] REFLECT: Рефлексия (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Requirements

### Functional

- [ ] Во время фонового install/precache показывать индикатор прогресса скачивания
- [ ] По завершении скачивания скрыть прогресс и показать кнопку «Обновить» (текущий apply-flow)
- [ ] После клика «Обновить» — «Обновляется…» без процента; сохранить in-flight защиту `applySwUpdate`
- [ ] Опционально отразить поведение в учебном разделе Service Worker (`swLessonData` / экран)

### Non-Functional

- [ ] Не ломать push (`sw-push.js` + `importScripts`), offline/precache, GitHub Pages `base`
- [ ] TDD; проверка SW через `pnpm build` + `pnpm preview` (в dev SW отключён)
- [ ] Учебная ясность важнее «продакшен-полировки»

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
- [x] Required dependencies identified (`workbox-window` есть; новые — только если CREATIVE выберет `injectManifest`)
- [x] Build configuration validated (текущий `VitePWA` + `generateSW`)
- [x] Hello-world verification = существующий `pnpm build` → `sw.js` + prompt UX
- [ ] После CREATIVE: подтвердить паритет push / runtimeCaching / navigateFallback при смене стратегии SW

---

## Affected Components

| Компонент                                                                | Изменения                                                      |
| ------------------------------------------------------------------------ | -------------------------------------------------------------- |
| `src/pwa/swUpdateController.ts`                                          | Состояние download/progress; подписка на installing / messages |
| `src/hooks/useSwUpdate.ts`                                               | Проброс нового state                                           |
| `src/components/SwUpdateBanner/*`                                        | UI: фаза прогресса → фаза «Обновить»                           |
| Возможно `vite.config.ts` + кастомный SW                                 | Только при выборе `injectManifest`                             |
| `public/sw-push.js` / importScripts                                      | Миграция при смене стратегии SW                                |
| `swLessonData` / `ServiceWorkerScreen`                                   | Учебный текст update flow                                      |
| `docs/project/pwa-checklist.md` (+ при необходимости `config-schema.md`) | Ручная проверка                                                |
| Тесты controller / hook / banner (+ E2E smoke)                           | TDD                                                            |

---

## Implementation Plan (после CREATIVE)

### Phase 1 — Контракт состояния

1. Расширить `SwUpdateState`: например `isDownloading`, `downloadProgress: number | null` (`null` = indeterminate)
2. Unit-тесты controller (red → green)

### Phase 2 — Источник событий (по решению CREATIVE)

1. Lifecycle: `registration.installing` + `statechange`, **или**
2. Messages из кастомного SW (`injectManifest`), **или**
3. Hybrid

### Phase 3 — UI

1. Индикатор на фазе download
2. После waiting — убрать прогресс, кнопка «Обновить»
3. После клика — «Обновляется…» без %

### Phase 4 — Урок + docs

1. Обновить `updateFlowDescription` / связанные тексты
2. Обновить `pwa-checklist.md` (ручной сценарий download → banner)

### Phase 5 — Verify

1. `pnpm lint`, `typecheck`, `test --run`, `build`
2. E2E по необходимости (smoke)
3. Ручной preview: две сборки / update SW → прогресс → «Обновить» → reload

---

## Creative Phases Required

- [ ] 🏗️ **Architecture** — источник прогресса:
  - **A.** Только lifecycle клиента (фазы без точного %) — минимальный риск
  - **B.** `injectManifest` + `postMessage` (точный %) — контроль, миграция SW
  - **C.** Hybrid / события `workbox-window` — без % без кастомного SW
  - _(чистый `generateSW` + `importScripts` для перехвата precache Workbox — ненадёжен)_
- [ ] 🎨 **UI/UX** — форма индикатора:
  - расширить `SwUpdateBanner` (две фазы: прогресс → «Обновить»)
  - отдельный strip + баннер apply как сейчас
  - - учебный блок на SW-экране

---

## Dependencies

- База: `step-sw-update-apply-fast` ✅ (`swUpdateController`, in-flight apply, proactive `update()`)
- `vite-plugin-pwa` `registerType: 'prompt'`, `injectRegister: null`
- Push через `workbox.importScripts: ['sw-push.js']` — сохранить при любой стратегии SW

---

## Challenges & Mitigations

| Риск                                             | Митигация                                            |
| ------------------------------------------------ | ---------------------------------------------------- |
| `onNeedRefresh` слишком поздно для прогресса     | Слушать `installing` до waiting                      |
| Миграция на `injectManifest` ломает push/offline | CREATIVE: чеклист паритета                           |
| Точный % на маленьком precache почти незаметен   | Допустить indeterminate; % — nice-to-have            |
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
- [ ] Creative phases complete
- [ ] Technology validation complete (финальный checkpoint после CREATIVE)
- [ ] Implementation complete
- [ ] Reflection complete
- [ ] Task closed (`/close-task`)

## Last Completed Task

- **Task ID:** `step-remove-lesson-stub`
- **Название:** Убрать `LessonStubScreen`, когда все разделы заполнены
- **Дата завершения:** 2026-08-12
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-remove-lesson-stub_2026-08-12.md](completed-tasks/2026/08/step-remove-lesson-stub_2026-08-12.md)
