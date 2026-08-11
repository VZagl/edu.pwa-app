# Level 2 Enhancement Reflection: Экран урока «Manifest»

**Task ID:** `step-manifest-lesson-ui`  
**Дата рефлексии:** 2026-08-03  
**Ветка:** `feat/step-manifest-lesson-ui`

## Enhancement Summary

Реализован экран урока «Manifest»: объяснительный текст (3 абзаца) + загрузка живых данных из `/manifest.webmanifest` через изолированную утилиту `fetchManifest.ts`. UI показывает MVP-поля в семантическом `<dl>` с color swatch для `theme_color` и `background_color`, состояния loading/error/success. TDD: `fetchManifest.test.ts` (mock `global.fetch`), `ManifestScreen.test.tsx` (mock модуля + loading/success/error), `e2e/manifest-lesson.spec.ts` (видимые значения из реального manifest). Nav и `lessonRoutes.ts` не менялись. Verify: lint ✅, build ✅, test (14) ✅, e2e (5) ✅.

## What Went Well

- **TDD red → green по слоям** — сначала pure fetch-утилита с unit-тестами, затем экран с integration-тестами, затем E2E; каждый слой изолирован и mock-ируется независимо.
- **Изоляция async-логики в `fetchManifest.ts`** — первый async fetch в проекте не размазан по компоненту; компонент только управляет состоянием (loading/error/data) и cleanup через `cancelled` flag в `useEffect`.
- **Разделение ответственности E2E** — `manifest-lesson.spec.ts` проверяет UI и видимые значения; HTTP-проверки manifest остались в `web-app-manifest.spec.ts` без дублирования.
- **Сохранение совместимости** — `<h2>Web App Manifest</h2>` не изменён; `App.test.tsx` и `e2e/lessons-navigation.spec.ts` прошли без правок.
- **Типы из `config-schema.md`** — `WebAppManifest` и `ManifestIcon` в `types.ts` соответствуют документированной схеме; mock-данные в тестах совпадают с реальным manifest.
- **Accessibility** — `<section aria-labelledby>`, color swatch с `aria-hidden`, семантический `<dl>` для пар ключ–значение.

## Challenges Encountered

- **Первый async fetch в проекте** — не было установленного паттерна mock fetch в Vitest.
- **Async loading в unit-тестах** — нужно корректно тестировать loading, success и error без flaky assertions.
- **Разделение mock-стратегий** — unit для `fetchManifest` (stub `global.fetch`) vs integration для `ManifestScreen` (mock модуля `./fetchManifest`).
- **E2E async load** — данные manifest загружаются после mount; нужен auto-retry Playwright.
- **Color swatch в `<dl>`** — hex-значение должно быть и визуально, и текстом.

## Solutions Applied

- `vi.stubGlobal('fetch', …)` + `afterEach(vi.restoreAllMocks)` в `fetchManifest.test.ts`; `vi.mock('./fetchManifest')` в `ManifestScreen.test.tsx` — разные уровни изоляции для разных целей.
- Loading: `mockReturnValue(new Promise(() => {}))` — зависший promise; success/error: `mockResolvedValue` / `mockRejectedValue` + `waitFor` / `findBy*`.
- E2E: `await expect(...).toBeVisible()` с auto-retry; scope через `getByRole('region', { name: '…' })`.
- `ManifestColorField` — swatch `<span>` + hex-текст рядом; BEM-классы `manifest-screen__color-swatch`.
- Cleanup в `useEffect`: `cancelled = true` при unmount — защита от setState после размонтирования.

## Key Technical Insights

- **`vi.mock('./fetchManifest')` vs `vi.stubGlobal('fetch')`** — mock модуля удобнее для integration-тестов компонента (не нужно знать URL и формат ответа); stub global fetch — для unit-тестов pure-функции.
- **Playwright `getByRole('region')`** — `<section aria-labelledby>` даёт именованный region для scoped assertions внутри блока данных.
- **`within(section)` в Testing Library** — ограничивает поиск элементов контекстом секции, снижает риск false-positive при совпадении текста в intro и data.
- **Fetch того же origin** — `/manifest.webmanifest` работает и в dev, и в preview без CORS; Vite отдаёт файл из `public/`.
- **Subcomponents в том же файле** — `ManifestField`, `ManifestColorField`, `ManifestIcons`, `ManifestData` достаточны для Level 2 без отдельных файлов.

## Process Insights

- **PLAN без CREATIVE** — UI-решения (заголовок, `<dl>`, состояния, swatch) зафиксированы в tasks.md; BUILD шёл по чеклисту без отклонений.
- **Challenges & Mitigations в tasks.md** — async fetch, flaky E2E, регрессия heading были предусмотрены; все mitigations сработали.
- **Verify-набор** — lint + build + unit (14) + e2e (5); e2e вырос с 4 до 5 тестов, unit — с 8 до 14.
- **Scope discipline** — изменения только в `src/screens/ManifestScreen/` и `e2e/manifest-lesson.spec.ts`; nav и routes не тронуты, как и планировалось.

## Action Items for Future Work

- **`/close-task`** — финализация `step-manifest-lesson-ui` (completed-запись, merge в `develop`).
- **Паттерн fetch-утилит** — при следующих async-экранах (SW, offline) переиспользовать структуру: `fetchX.ts` + unit test + mock модуля в screen test.
- **Общий mock manifest** — `mockManifest` дублируется в трёх тестовых файлах; при росте числа экранов вынести в `src/test-fixtures/manifest.ts` или аналог.
- **Следующий шаг roadmap** — Service Worker / Offline / Install (фаза 2+).

## Time Estimation Accuracy

- Estimated time: ~2–3 ч (PLAN + BUILD TDD + verify)
- Actual time: одна сессия 2026-08-03 (PLAN → BUILD → REFLECT)
- Variance: в пределах оценки
- Reason: план детализирован в tasks.md; зависимости (`step-web-app-manifest`, навигация) уже закрыты; TDD-инфраструктура из фазы 0 ускорила BUILD
