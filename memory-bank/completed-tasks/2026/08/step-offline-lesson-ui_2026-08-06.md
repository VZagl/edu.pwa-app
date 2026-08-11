# step-offline-lesson-ui

- **Название:** Экран урока «Offline & Cache»
- **Дата создания:** 2026-08-06
- **Дата завершения:** 2026-08-06
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Feature

## Задание

Экран урока «Offline & Cache»: объяснение precache vs runtime, демо статуса сети.

**Цель:** Тема кэширования закреплена в UI приложения.

## Результат

Заглушка `OfflineScreen` заменена на полноценный учебный экран «Офлайн и кэш»: intro (precache vs runtime, различие `/offline` и `navigateFallback`), секция «Стратегии кэширования» (precache, runtime rules в таблице, navigateFallback) и «Демо: статус сети» (badge online/offline через `useOnlineStatus`, ссылка на глобальный `OfflineIndicator`). Статические данные Workbox вынесены в `offlineLessonData.ts` как зеркало `vite.config.ts`. TDD: 4 unit-теста; E2E `offline-lesson.spec.ts`. Verify: lint ✅, build ✅, unit 40 ✅, e2e 11 ✅.

На экране урока «Офлайн и кэш» пользователь видит объяснение стратегий кэширования Workbox и демо статуса сети в реальном времени.

## Ссылки

- **Архив:** —
- **Рефлексия:** memory-bank/reflection/reflection-step-offline-lesson-ui.md
- **Ветка:** feat/step-offline-lesson-ui
- **Коммит:** 3080c15
