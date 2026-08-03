# Level 2 Enhancement Reflection: Навигация по учебным разделам

**Task ID:** `step-lessons-navigation`  
**Дата рефлексии:** 2026-08-03  
**Ветка:** `feat/step-lessons-navigation`

## Enhancement Summary

Добавлена навигация по 5 учебным разделам (Главная + Manifest, Service Worker, Offline, Install). Трёхслойная архитектура: `src/routes/lessonRoutes.ts` (маршрутизация и navLabel), `src/screens/<Name>Screen/` (контент урока), `src/components/LessonStubScreen/` (временный layout h2 + paragraph). TDD: расширен `App.test.tsx` (6 тестов — nav, клик → h2, `aria-current="page"`, 404), добавлен `e2e/lessons-navigation.spec.ts` (полный цикл по всем разделам). Рефакторинг `App.tsx` — nav и Routes из конфига; horizontal scroll nav в `App.scss`. Удалён `router-poc.test.tsx`. Verify: lint ✅, build ✅, test (8) ✅, e2e (2) ✅.

## What Went Well

- **Трёхслойная архитектура** — чёткое разделение ответственности: `lessonRoutes.ts` (path, navLabel, Screen), экраны (title/description), `LessonStubScreen` (layout). Следующие шаги (`step-manifest-lesson-ui`) меняют только папку своего экрана.
- **TDD red → green:** сначала расширены `App.test.tsx` и E2E, затем реализация — все проверки прошли с первого green-прогона.
- **Конфиг `lessonRoutes.ts`** — добавление нового раздела = одна строка в массиве; `App.tsx` рендерит nav и Routes через `.map()` без дублирования.
- **Без creative phase** — стандартная навигация и экраны-заглушки; детальный план в `tasks.md` оказался достаточным для Level 2.
- **Расширение существующих тестов** вместо отдельных `*.test.tsx` для каждой заглушки — навигация покрывается централизованно в `App.test.tsx`.
- **E2E покрывает полный цикл** — `/` → `/manifest` → `/service-worker` → `/offline` → `/install` → `/` с проверкой h2 на каждом шаге.
- **Cleanup POC:** удалён `router-poc.test.tsx` — POC выполнил роль на `step-app-shell`, навигация покрыта `App.test.tsx` и E2E.

## Challenges Encountered

- **5 пунктов nav на узком экране:** горизонтальный scroll на `.app-shell__nav-list` (`overflow-x: auto`, `flex-wrap: nowrap`, `-webkit-overflow-scrolling: touch`); touch target ≥ 44px сохранён из `step-app-shell`.
- **Разделение контента и навигации:** title и description задаются в файле экрана (`*Screen.tsx`), не в `lessonRoutes.ts` — конфиг остаётся «только навигация».
- **Активный пункт nav для `/`:** `NavLink` с `end={route.path === '/'}` — без `end` корневой маршрут остаётся active на всех вложенных путях.

## Solutions Applied

- Horizontal scroll nav в `App.scss` — mitigates overflow на mobile без изменения количества пунктов.
- `LessonStubScreen` как общий layout; каждый экран — тонкая обёртка с title/description.
- `NavLink end` для корневого маршрута + проверка `aria-current="page"` в unit-тесте.
- `NotFoundScreen` вне `lessonRoutes` — catch-all `path='*'` не попадает в nav.

## Key Technical Insights

- **`LessonRoute` с `ComponentType`** — типобезопасный конфиг маршрутов; `Screen` рендерится как `<route.Screen />`.
- **`NavLink end` для `/`** — стандартный паттерн React Router для корневого маршрута в nav с несколькими пунктами.
- **`MemoryRouter` + `renderApp(initialRoute)`** — паттерн из `step-app-shell` масштабируется на новые маршруты без изменений helper.
- **Implicit ARIA через `NavLink`** — `aria-current="page"` на активной ссылке без ручного JS; тест проверяет атрибут, не CSS-класс.
- **E2E role-селекторы** — `getByRole('link', { name: 'Manifest' })` и `getByRole('heading', { level: 2 })` стабильны при смене контента разделов.

## Process Insights

- **PLAN без CREATIVE** оправдан для Level 2 с известным паттерном (nav + stub screens) — сэкономил время без потери качества.
- **Наследование паттернов** из `step-app-shell` (`renderApp`, BEM, role-селекторы) ускорило BUILD — не нужно переизобретать инфраструктуру.
- **Чеклист Challenges & Mitigations в tasks.md** — horizontal scroll и разделение слоёв были предусмотрены заранее и реализованы без сюрпризов.
- **Verify-набор после BUILD** (lint + build + unit + e2e) — привычка из фазы 0, без регрессий.

## Action Items for Future Work

- `/close-task` — финализация `step-lessons-navigation` (архивация, merge в `develop`).
- **`step-manifest-lesson-ui`** — замена заглушки в `ManifestScreen/` полным контентом; nav и `lessonRoutes.ts` не трогать.
- **Unit-тесты экранов** — добавлять только на шагах с реальным контентом и логикой, не для presentational-заглушек.
- **Partial SCSS для экранов** — при росте контента добавлять `ManifestScreen.scss` и т.д. в папку экрана, не в `App.scss`.

## Time Estimation Accuracy

- Estimated time: ~2–3 ч (PLAN + BUILD для Level 2 без creative)
- Actual time: одна сессия 2026-08-03 (PLAN → BUILD)
- Variance: в пределах оценки
- Reason: объём совпал с чеклистом; отсутствие creative phase сэкономило ~30–45 мин; архитектура из tasks.md была детальной
