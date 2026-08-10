# Active Context

## Current Focus

`feat/step-home-lesson-ui` — Главная — учебный экран (step-home-lesson-ui)

## Current Mode

PLAN — планирование реализации (следующий шаг: `/plan`)

## Next Steps

1. `/plan` — детальный план: структура экрана, блоки контента, тесты, файлы
2. `/build` — реализация по TDD (red → green → refactor)
3. `/reflect` — рефлексия
4. `/close-task` — финализация задачи

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
- Текущий экран: `src/screens/HomeScreen/HomeScreen.tsx` — заглушка через `LessonStubScreen`
- Эталоны полноценных экранов: `ManifestScreen`, `OfflineScreen` (SCSS, data-файлы, unit-тесты)
- Маршруты: `src/routes/lessonRoutes.ts` (5 разделов)
- Чеклист PWA: `docs/project/pwa-checklist.md` (создан в `step-lighthouse-pwa-checklist`)
- Сложность: Level 2 — маршрут VAN → PLAN → BUILD → REFLECT → close-task
