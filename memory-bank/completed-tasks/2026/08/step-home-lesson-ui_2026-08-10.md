# step-home-lesson-ui

- **Название:** Главная — учебный экран
- **Дата создания:** 2026-08-07
- **Дата завершения:** 2026-08-10
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Feature

## Задание

Заполнить экран «Главная» (сейчас `LessonStubScreen`): карта лаборатории — intro учебного PWA, порядок модулей со ссылками (Manifest → SW → Offline → Install и далее новые разделы), краткий чеклист критериев PWA, блок «как пользоваться» (preview, DevTools). Короткий блок **почему нужен HTTPS** (secure context; исключение `localhost`; на GitHub Pages HTTPS из коробки).

**Цель:** Главная — точка входа для ученика, а не заглушка.

## Результат

Экран «Главная» заменён с `LessonStubScreen` на «Карту лаборатории»: intro, автоматический список модулей из `lessonRoutes`, краткий чеклист PWA (5 пунктов), блоки «Как пользоваться» и «Почему HTTPS». Контент в `homeLessonData.ts`, стили BEM по образцу `OfflineScreen`. TDD: 5 unit-тестов, E2E `e2e/home-lesson.spec.ts`. Обновлены ожидания в App/smoke/lessons-navigation/offline-fallback. Verify: lint ✅, build ✅, unit 64 ✅, e2e 13 ✅.

## Ссылки

- **Архив:** —
- **Рефлексия:** [memory-bank/reflection/reflection-step-home-lesson-ui.md](../../reflection/reflection-step-home-lesson-ui.md)
- **Ветка:** `feat/step-home-lesson-ui`
- **Коммит:** `e623bd4`
