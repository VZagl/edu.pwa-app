# Tasks

## Current Task

- **Task ID:** `step-offline-lesson-ui`
- **Название:** Экран урока «Offline & Cache»
- **Git Branch:** `feat/step-offline-lesson-ui`
- **Complexity:** Level 2 — Simple Enhancement
- **Источник:** `docs/project/implementation-plan.md` (Order: 4.1.2)
- **Создано:** 2026-08-06

### Описание

Экран урока «Offline & Cache»: объяснение precache vs runtime, демо статуса сети.

**Цель:** Тема кэширования закреплена в UI приложения.

**Зависит от:** `step-offline-fallback` ✅, `step-lessons-navigation` ✅

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-offline-lesson-ui`
- [x] PLAN: Детальный план реализации
- [x] BUILD: Реализация по TDD
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Technology Stack

| Слой                 | Технология                                                    |
| -------------------- | ------------------------------------------------------------- |
| UI                   | React + SCSS (паттерн `ManifestScreen`)                       |
| Статус сети          | `useOnlineStatus` (уже есть)                                  |
| Глобальный индикатор | `OfflineIndicator` в `App.tsx` (только ссылка в тексте урока) |
| Тесты                | Vitest (unit) + Playwright (E2E)                              |
| Новые зависимости    | **нет**                                                       |

### Technology Validation Checkpoints

- [x] Проект собирается (`pnpm build`)
- [x] `useOnlineStatus` и `OfflineIndicator` реализованы в `step-offline-fallback`
- [x] Workbox-конфиг в `vite.config.ts` (precache + 2 runtime rules)
- [x] E2E-инфраструктура Playwright готова
- [x] POC не требуется — расширение существующего экрана

---

## Status

- [x] Initialization complete
- [x] Planning complete
- [x] Technology validation complete
- [x] Implementation complete

---

## Implementation Plan

### Затрагиваемые файлы

| Файл                                               | Действие                                                      |
| -------------------------------------------------- | ------------------------------------------------------------- |
| `src/screens/OfflineScreen/OfflineScreen.tsx`      | Заменить заглушку на полный экран урока                       |
| `src/screens/OfflineScreen/OfflineScreen.scss`     | Стили (по образцу `ManifestScreen.scss`)                      |
| `src/screens/OfflineScreen/OfflineScreen.test.tsx` | Unit-тесты (TDD)                                              |
| `src/screens/OfflineScreen/offlineLessonData.ts`   | Статические данные Workbox-конфига (зеркало `vite.config.ts`) |
| `e2e/offline-lesson.spec.ts`                       | E2E-сценарий урока                                            |

**Не трогать:** `lessonRoutes.ts`, `App.tsx`, `vite.config.ts`, `useOnlineStatus`, `OfflineIndicator`.

### Структура экрана

1. **Заголовок** — `h2`: «Офлайн и кэш»
2. **Intro** (2–3 абзаца): зачем кэш в PWA; precache vs runtime; `navigateFallback` ≠ этот урок
3. **region «Стратегии кэширования»**: precache при install; runtime rules (таблица из конфига); `navigateFallback: index.html`
4. **region «Демо: статус сети»**: badge online/offline через `useOnlineStatus`; подсказка DevTools → Offline; ссылка на глобальный `OfflineIndicator`

### Шаги реализации (TDD)

1. **Тесты (red)** — `OfflineScreen.test.tsx`: заголовок, intro (precache, runtime), секция стратегий, демо статуса; мок `useOnlineStatus` через `vi.hoisted`; online → «В сети», offline → «Нет сети»
2. **Данные** — `offlineLessonData.ts`: `precacheInfo`, `runtimeRules[]`, `navigateFallback` — зеркало `vite.config.ts` → workbox
3. **Компонент (green)** — `OfflineScreen.tsx`: intro + `CachingStrategies` + `NetworkStatusDemo`; семантика `role="region"`, `aria-labelledby`, `role="status"` для badge
4. **Стили** — `OfflineScreen.scss`: BEM `.offline-screen`, карточки как `manifest-screen__data`, badge online/offline
5. **E2E** — `e2e/offline-lesson.spec.ts`: `/offline` → заголовок, текст, секции, статус «В сети»
6. **Verify** — `pnpm lint` ✅ → `pnpm build` ✅ → `pnpm test --run` ✅ (40) → `pnpm test:e2e` ✅ (11)

---

## Build Progress

- **OfflineScreen**: Complete
  - `src/screens/OfflineScreen/OfflineScreen.tsx` — полный экран урока (intro, CachingStrategies, NetworkStatusDemo)
  - `src/screens/OfflineScreen/offlineLessonData.ts` — зеркало workbox-конфига из `vite.config.ts`
  - `src/screens/OfflineScreen/OfflineScreen.scss` — стили по образцу ManifestScreen
  - `src/screens/OfflineScreen/OfflineScreen.test.tsx` — 4 unit-теста (TDD)
  - `e2e/offline-lesson.spec.ts` — E2E-сценарий урока
- **Verify**: lint ✅, build ✅, unit 40 ✅, e2e 11 ✅

## Creative Phases Required

- [ ] Не требуются — UI следует паттерну `ManifestScreen`

---

## Dependencies

- `step-offline-fallback` ✅ — `useOnlineStatus`, `OfflineIndicator`, Workbox runtime rules
- `step-lessons-navigation` ✅ — маршрут `/offline` зарегистрирован
- `step-vite-plugin-pwa` ✅ — precache через Workbox

---

## Challenges & Mitigations

| Вызов                                            | Митигация                                                                     |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| Путаница `/offline` (урок) vs `navigateFallback` | Явный абзац в intro: SW отдаёт SPA-оболочку, этот экран — учебный раздел      |
| Workbox-конфиг не читается в runtime             | Статический `offlineLessonData.ts`, синхронизированный с `vite.config.ts`     |
| `navigator.onLine` неточен                       | Упомянуть ограничение в демо-секции                                           |
| Дублирование E2E offline                         | E2E урока — контент экрана; `offline-fallback.spec.ts` — глобальный индикатор |

---

## Last Completed Task

- **Task ID:** `step-offline-fallback`
- **Название:** Runtime caching и offline fallback
- **Дата завершения:** 2026-08-06
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-offline-fallback_2026-08-06.md](completed-tasks/2026/08/step-offline-fallback_2026-08-06.md)
- **Reflection:** [memory-bank/reflection/reflection-step-offline-fallback.md](reflection/reflection-step-offline-fallback.md)
