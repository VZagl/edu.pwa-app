# Active Context

## Current Focus

**Task ID:** `step-manifest-lesson-ui` — Экран урока «Manifest»  
**Git Branch:** `feat/step-manifest-lesson-ui`

## Current Mode

PLAN — ожидает `/plan` для детального плана реализации

## Next Steps

1. Запустить `/plan` — детальный план (файлы, TDD-шаги, UI-решения)
2. `/build` — реализация по TDD
3. `/reflect` — рефлексия
4. `/close-task` — финализация задачи

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 2: Web App Manifest — `step-web-app-manifest` завершён ✅
- Текущая задача: заменить заглушку `ManifestScreen` полным контентом урока
- Manifest доступен: `public/manifest.webmanifest`, значения в `docs/project/config-schema.md`
- Nav и `lessonRoutes.ts` не менять — только папка `src/screens/ManifestScreen/`
- Паттерны: `LessonStubScreen`, `App.test.tsx`, `e2e/lessons-navigation.spec.ts`, `e2e/web-app-manifest.spec.ts`
- Цикл Level 2: VAN → PLAN → BUILD → REFLECT → CLOSE-TASK
