# Level 2 Enhancement Reflection: Storage quota / Persistent storage — отдельный раздел

**Task ID:** `step-storage-quota-lesson-ui`  
**Дата рефлексии:** 2026-08-11  
**Ветка:** `feat/step-storage-quota-lesson-ui`

## Enhancement Summary

Добавлен учебный раздел `/storage` (navLabel: `Storage`): квоты через `navigator.storage.estimate()` (usage/quota, байты + человекочитаемо, % заполнения), Persistent Storage (`persisted()` / `persist()`), краткий текст про лимиты и вытеснение, DevTools, ссылка на `/cache-storage`. Хук `useStorageQuota` (состояние + `refresh` / `requestPersist`, чистые хелперы `formatBytes` / `calcUsagePercent`), контент в `storageLessonData.ts`, экран `StorageScreen` (BEM). Маршрут в `lessonRoutes`. TDD: unit хука (моки `navigator.storage`) и экрана (мок хука); E2E урок + шаг в `lessons-navigation`. Обновлены `App.test.tsx` и `HomeScreen.test.tsx` под 7 пунктов. Verify: lint ✅, typecheck ✅, unit ✅, build ✅, e2e ✅.

## What Went Well

- **План выполнен без отклонений по scope** — хук, data, экран, маршрут, unit, E2E; CREATIVE не понадобился.
- **Повторяемый шаблон lesson-ui** — hook + `*LessonData` + Screen (BEM) + `lessonRoutes` + E2E регионов, как у Cache Storage / Install.
- **TDD с разделением слоёв** — хук на моках `navigator.storage.estimate` / `persisted` / `persist`; экран — на моке хука; E2E — структура UI без требования grant `persist()`.
- **Challenges & Mitigations из PLAN закрыты в BUILD** — jsdom, approximate quota, `persist() === false`, хрупкие nav-тесты, exact-матч «Storage» vs «Cache Storage».
- **Доступность** — `role="region"`, статусы unsupported / loading / error, `aria-label` на кнопках «Обновить» и «Запросить Persistent Storage».

## Challenges Encountered

- **jsdom без StorageManager** — в unit нет реального `navigator.storage`.
- **`persist()` часто возвращает `false`** — браузер может отказать без явного user gesture / политики.
- **usage/quota approximate / optional** — поля могут отсутствовать; значения приблизительные.
- **A11y-коллизия имён** — пункт «Storage» пересекается с «Cache Storage» при неточном матче в unit/E2E.
- **Побочные тесты навигации** — 7-й пункт ломает жёсткие ожидания в `App` / `HomeScreen`.

## Solutions Applied

- Чистые функции чтения estimate/persisted + мок API в тестах хука; UI — мок `useStorageQuota`.
- В демо показывается фактический ответ `persist()`; E2E не требует grant.
- `usage ?? null` / `quota ?? null`, учебный текст про неточность и вытеснение.
- Exact-матч (`exact: true` / `/^Storage$/`) в unit и E2E.
- Сразу обновлены `App.test.tsx` и `HomeScreen.test.tsx` под 7 пунктов `lessonRoutes`.

## Key Technical Insights

- **Учебный экран Storage — тонкая обёртка над StorageManager** — достаточно `estimate` / `persisted` / `persist`; отдельный npm-пакет не нужен.
- **Мок API vs мок хука** — контракт StorageManager в тестах хука; UI-сценарии (unsupported / loading / error / percent) — через мок хука.
- **Связь с Cache Storage** — квота относится ко всему origin storage; ссылка на `/cache-storage` лучше дублирования объяснения Cache API.
- **Навигационные лейблы с общим словом** — при добавлении «Storage» рядом с «Cache Storage» exact-матч обязателен с первого коммита тестов.

## Process Insights

- **Level 2 + Challenges & Mitigations в PLAN** — риски API/jsdom/a11y были закрыты без сюрпризов в BUILD.
- **Эталон Cache Storage lesson-ui** — ускорил PLAN и BUILD; creative phase не нужен при копировании структуры экрана.
- **Verify-матрица** — lint / typecheck / unit / build + точечный e2e (`storage-lesson` + `lessons-navigation`) достаточны для закрытия BUILD.
- **`/archive` для таких задач не обязателен** — рефлексия + `/close-task` (completed-tasks, backlog, merge) закрывают цикл.

## Action Items for Future Work

- **`/close-task`** — completed-запись, обновление backlog/progress/roadmap, merge в `develop`.
- **При следующем lesson-ui с похожими navLabel** — сразу закладывать exact-матч в unit/E2E чеклист BUILD.
- **При добавлении урока в `lessonRoutes`** — сразу править Home/App unit-тесты (уже зафиксировано после Cache Storage; подтверждено на 7-м пункте).

## Time Estimation Accuracy

- Estimated time: ~3–5 ч (PLAN + TDD хук/экран + маршрут + E2E + verify)
- Actual time: одна сессия PLAN → BUILD (2026-08-11), REFLECT в тот же день
- Variance: в пределах оценки
- Reason: готовый шаблон lesson-ui; Challenges & Mitigations в PLAN; CREATIVE не требовался
