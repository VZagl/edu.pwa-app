# Level 2 Enhancement Reflection: Главная — учебный экран

**Task ID:** `step-home-lesson-ui`  
**Дата рефлексии:** 2026-08-10  
**Ветка:** `feat/step-home-lesson-ui`

## Enhancement Summary

Экран «Главная» заменён с `LessonStubScreen` на полноценную «Карту лаборатории»: intro об учебном PWA, автоматический список модулей из `lessonRoutes` (без `/`), краткий чеклист PWA (5 пунктов), блок «Как пользоваться» (build/preview, DevTools) и «Почему HTTPS» (secure context, localhost, GitHub Pages). Контент вынесен в `homeLessonData.ts`; стили BEM по образцу `OfflineScreen`. TDD: 5 unit-тестов в `HomeScreen.test.tsx`, E2E `e2e/home-lesson.spec.ts`. Обновлены ожидания в `App.test.tsx`, `smoke.spec.ts`, `lessons-navigation.spec.ts`, `offline-fallback.spec.ts` (новый h2, клики по nav из‑за дублирующих ссылок модулей на главной). Verify: lint ✅, build ✅, unit 64 ✅, e2e 13 ✅.

## What Went Well

- **Структура экрана по плану** — все 5 блоков из PLAN реализованы: intro, модули, чеклист, how-to, HTTPS; заголовок «Карта лаборатории».
- **Единый источник маршрутов** — `lessonRoutes.filter(path !== '/')` в `ModulesSection`; новые разделы появятся на главной без правок контента.
- **Паттерн data + screen** — как у `OfflineScreen`/`ManifestScreen`: `homeLessonData.ts` для текста, компонент для разметки; чеклист 5 пунктов, не дублирует полный `pwa-checklist.md`.
- **TDD и покрытие** — red → green: unit-тесты на каждый блок (region + ключевой контент), E2E на видимость блоков и переход в Manifest.
- **Доступность** — `role="region"`, `aria-labelledby`, нумерованный список модулей (`ol`), согласованность с другими экранами.
- **Связь с предыдущей задачей** — чеклист и HTTPS опираются на содержание `step-lighthouse-pwa-checklist` (preview vs dev, secure context).

## Challenges Encountered

- **Циклический импорт** — `lessonRoutes` импортирует экраны, включая `HomeScreen`; фильтр модулей не вынести в data-файл без цикла.
- **Дублирование ссылок в E2E** — на главной и в nav одни и те же `Link`; `getByRole('link', { name: 'Manifest' })` без scope находит два элемента.
- **Обновление существующих тестов** — smoke, lessons-navigation, offline-fallback ожидали stub «Главная»; нужна синхронизация h2 и стратегии кликов.
- **Объём контента** — риск перегруза UI; нужны короткие абзацы и секции.

## Solutions Applied

- Фильтр `lessonRoutes` оставлен внутри `ModulesSection` в `HomeScreen.tsx` — явный комментарий о циклическом импорте.
- E2E: scope через `getByRole('region', { name: 'Модули' })` перед кликом по ссылке; в `lessons-navigation` — клики по nav, не по body.
- Unit-тесты: `within(section)` для изоляции ссылок в секции модулей.
- Короткие пункты в `homeLessonData.ts`; секции с `role="region"`; intro — два абзаца.

## Key Technical Insights

- **Циклический импорт route → screen** — при динамическом списке модулей data-файл не может импортировать `lessonRoutes`; фильтрация в компоненте — практичный workaround до рефакторинга routes (lazy routes / registry без импорта компонентов).
- **Дубли nav + content links** — при E2E всегда scope по region или nav landmark; паттерн для будущих экранов с перекрёстными ссылками.
- **`lessonRoutes` как single source of truth** — navLabel и path для модулей; главная не хардкодит список разделов.
- **Regex в тестах** — `/учебн(ое|ого) PWA/i` покрывает варианты текста intro без жёсткой строки.

## Process Insights

- **Level 2 без creative phase** — эталоны Offline/Manifest сократили время на UI-решения; PLAN с таблицей файлов и TDD-шагами дал предсказуемый BUILD.
- **Challenges & Mitigations в PLAN** — риски (дублирование чеклиста, перегруз UI, дубли path) закрыты до BUILD.
- **Связанные правки тестов** — при замене stub на полноценный экран заранее планировать обновление App + E2E, не только новые спеки.
- **Verify-матрица** — lint, build, unit, e2e после UI-задачи — стандарт; 64 unit / 13 e2e как baseline после задачи.

## Action Items for Future Work

- **`/close-task`** — completed-запись, merge в `develop`, backlog/progress.
- **Опционально: рефакторинг `lessonRoutes`** — отделить метаданные маршрутов (path, navLabel) от lazy-компонентов, чтобы data-файлы могли читать список модулей без цикла.
- **Backlog: учебный экран SW/Install** — заменить оставшиеся `LessonStubScreen` на полноценные уроки (уже в roadmap).
- **При добавлении Cache Storage и др.** — проверить, что модуль автоматически появляется на главной (регрессия одного E2E или unit на count модулей).

## Time Estimation Accuracy

- Estimated time: ~3–4 ч (PLAN + TDD BUILD + verify + правки E2E)
- Actual time: одна сессия 2026-08-10 (PLAN → BUILD)
- Variance: в пределах оценки
- Reason: эталоны UI и чёткий PLAN; дополнительное время — обновление 4 E2E/App тестов и workaround циклического импорта
