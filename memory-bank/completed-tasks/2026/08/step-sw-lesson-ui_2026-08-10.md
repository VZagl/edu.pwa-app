# step-sw-lesson-ui

- **Название:** Service Worker — учебный экран
- **Дата создания:** 2026-08-07
- **Дата завершения:** 2026-08-10
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Feature

## Задание

Заполнить экран «Service Worker»: intro (scope, отличие от обычного скрипта), lifecycle (install → activate → controlling / waiting), живое демо (`controller`, state регистрации, scope), связь с баннером обновления (`swUpdateController`). Показать версию сборки / revision в UI. Учебная кнопка «Сбросить SW и кэш» с пометкой «только для лаборатории». Перекрёстная ссылка на Offline.

**Цель:** Раздел SW объясняет lifecycle и даёт интерактив для экспериментов.

## Результат

Экран «Service Worker» заменён с `LessonStubScreen` на полноценный учебный раздел: intro, lifecycle, живое демо (`useServiceWorkerInfo`: scope, states, controller, revision/scriptURL), update flow (`useSwUpdate` + `swUpdateController`/`SwUpdateBanner`), кнопка «Сбросить SW и кэш» (`resetServiceWorkerLab`) с предупреждением «только для лаборатории», ссылка на Offline. TDD: 6 unit-тестов хука, 2 unit-теста утилиты, 7 unit-тестов экрана, E2E `sw-lesson.spec.ts`. Verify: lint ✅, build ✅, unit 79 ✅, e2e 14 ✅.

## Ссылки

- **Архив:** —
- **Рефлексия:** [memory-bank/reflection/reflection-step-sw-lesson-ui.md](../../reflection/reflection-step-sw-lesson-ui.md)
- **Ветка:** `feat/step-sw-lesson-ui`
- **Коммит:** `ca6e112`
