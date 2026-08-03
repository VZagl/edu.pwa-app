# Active Context

## Current Focus

**Task ID:** `step-manifest-lesson-ui` — Экран урока «Manifest»
**Git Branch:** `feat/step-manifest-lesson-ui`

## Current Mode

BUILD — готов к `/build` (TDD red → green → refactor)

## Next Steps

1. `/build` — реализация по TDD (см. Implementation Plan в `tasks.md`)
2. `/reflect` — рефлексия
3. `/close-task` — финализация задачи

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 2: Web App Manifest — `step-web-app-manifest` завершён ✅
- Текущая задача: заменить заглушку `ManifestScreen` полным контентом урока
- Manifest доступен: `public/manifest.webmanifest`, значения в `docs/project/config-schema.md`
- Nav и `lessonRoutes.ts` не менять — только папка `src/screens/ManifestScreen/`
- Паттерны: `LessonStubScreen`, `App.test.tsx`, `e2e/lessons-navigation.spec.ts`, `e2e/web-app-manifest.spec.ts`
- Первый async fetch в проекте — изолировать в `fetchManifest.ts`
- SCSS экрана: `ManifestScreen.scss` в папке экрана, BEM-префикс `manifest-screen__`
- Creative phase не требуется — переход сразу в BUILD
- Цикл Level 2: VAN → PLAN ✅ → BUILD → REFLECT → CLOSE-TASK
