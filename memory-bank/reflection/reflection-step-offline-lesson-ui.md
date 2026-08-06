# Level 2 Enhancement Reflection: Экран урока «Offline & Cache»

**Task ID:** `step-offline-lesson-ui`  
**Дата рефлексии:** 2026-08-06  
**Ветка:** `feat/step-offline-lesson-ui`

## Enhancement Summary

Заглушка `OfflineScreen` заменена на полноценный учебный экран «Офлайн и кэш»: intro (precache vs runtime, различие `/offline` и `navigateFallback`), секция «Стратегии кэширования» (precache, runtime rules в таблице, navigateFallback) и «Демо: статус сети» (badge online/offline через `useOnlineStatus`, ссылка на глобальный `OfflineIndicator`). Статические данные Workbox вынесены в `offlineLessonData.ts` как зеркало `vite.config.ts`. TDD: 4 unit-теста с `vi.hoisted` моком хука; E2E `offline-lesson.spec.ts` — контент экрана (отдельно от `offline-fallback.spec.ts`). Nav, `App.tsx`, `vite.config.ts` не менялись. Verify: lint ✅, build ✅, unit 40 ✅, e2e 11 ✅.

## What Went Well

- **Паттерн ManifestScreen переиспользован без creative phase** — структура intro + `role="region"` секции + BEM `.offline-screen` дала предсказуемый BUILD по чеклисту из `tasks.md`.
- **Разделение данных и UI** — `offlineLessonData.ts` изолирует зеркало Workbox-конфига; компонент только рендерит, тесты проверяют видимые значения (`runtime-json`, `NetworkFirst`, `index.html`).
- **TDD с `vi.hoisted` для хука** — тот же паттерн, что в `OfflineIndicator.test.tsx` из `step-offline-fallback`; online/offline покрыты двумя тестами без flaky DOM.
- **Явное разъяснение `/offline` vs `navigateFallback`** — отдельный абзац в intro и подсекция в стратегиях; митигация из Challenges & Mitigations реализована в UI.
- **Scope discipline** — изменения только в `src/screens/OfflineScreen/` и `e2e/offline-lesson.spec.ts`; зависимости (`useOnlineStatus`, `OfflineIndicator`, Workbox) переиспользованы, не дублированы.
- **Разделение E2E** — `offline-lesson.spec.ts` проверяет учебный контент; `offline-fallback.spec.ts` остаётся за глобальным индикатором и SW offline-поведением.

## Challenges Encountered

- **Workbox-конфиг недоступен в runtime** — `vite.config.ts` не импортируется в браузер; нужен статический дубликат данных.
- **Риск рассинхронизации `offlineLessonData.ts` и `vite.config.ts`** — при изменении runtime rules в конфиге урок может показать устаревшие значения.
- **Путаница маршрута `/offline` с SW fallback** — учебный раздел и механизм `navigateFallback` звучат похоже для новичка.
- **Ограничения `navigator.onLine`** — демо показывает бинарный статус ОС, не реальную доступность сервера.
- **Два E2E-сценария про offline** — риск дублирования проверок между `offline-lesson` и `offline-fallback`.

## Solutions Applied

- `offlineLessonData.ts` — `precacheInfo`, `runtimeRules[]`, `navigateFallback` как единый источник для UI урока; комментарий в PLAN: синхронизировать вручную с `vite.config.ts`.
- Intro + подсекция navigateFallback с явной формулировкой: SW отдаёт SPA-оболочку, а не содержимое урока.
- В демо-секции — disclaimer про приблизительность `navigator.onLine` и ссылка на `OfflineIndicator` как глобальный индикатор.
- E2E урока ограничен видимым контентом и badge «В сети»; offline-переключение и SW остаются в `offline-fallback.spec.ts`.
- Unit-тесты: `within(section)` + `getByRole('region')` для scoped assertions; мок хука через `vi.hoisted`.

## Key Technical Insights

- **Статическое зеркало build-time конфига** — для учебного PWA допустимо дублировать Workbox-правила в TS-модуле; альтернатива (чтение `sw.js` в runtime) избыточна для Level 2.
- **`vi.hoisted` + mutable `hookMocks.isOnline`** — проще переключать online/offline между тестами, чем `mockReturnValueOnce` при нескольких render в одном describe.
- **Таблица runtime rules** — нагляднее `<dl>` для трёх колонок (pattern, handler, cacheName); `<code>` для regex-паттернов сохраняет читаемость.
- **Subcomponents в том же файле** — `CachingStrategies` и `NetworkStatusDemo` достаточны без отдельных файлов, как в `ManifestScreen`.
- **Badge с `role="status"` и `aria-label`** — согласованность с `OfflineIndicator` и testing-guidelines по a11y.

## Process Insights

- **PLAN без CREATIVE** — UI следует `ManifestScreen`; Challenges & Mitigations в `tasks.md` покрыли все реальные риски BUILD.
- **Зависимости закрыты заранее** — `step-offline-fallback` дал хук, индикатор и Workbox rules; BUILD свёлся к экрану и тестам.
- **Verify-набор полный** — lint → build → unit (40) → e2e (11); прирост +4 unit, +1 e2e относительно предыдущей задачи.
- **TDD red → green по шагам PLAN** — тесты → данные → компонент → стили → E2E → verify без отклонений от Implementation Plan.

## Action Items for Future Work

- **`/close-task`** — completed-запись, merge в `develop`, убрать задачу из `backlog.md`.
- **Backlog: синхронизация Workbox** — при изменении `vite.config.ts` проверять `offlineLessonData.ts`; опционально smoke-тест на совпадение cache names (из reflection `step-offline-fallback`).
- **Следующий шаг roadmap** — следующий пункт фазы 4 в `implementation-plan.md` (после 4.1.2).
- **Backlog: ручной чеклист** — DevTools Offline для демо-секции урока (переключение badge + появление `OfflineIndicator`).

## Time Estimation Accuracy

- Estimated time: ~2–3 ч (PLAN + BUILD TDD + verify)
- Actual time: одна сессия 2026-08-06 (PLAN → BUILD → REFLECT)
- Variance: в пределах оценки
- Reason: паттерн `ManifestScreen` и инфраструктура из `step-offline-fallback` сократили неопределённость; creative phase не требовалась
