# Active Context

## Current Focus

**Task ID:** `step-manifest-lesson-ui` — Экран урока «Manifest»

**Git Branch:** `feat/step-manifest-lesson-ui`

## Current Mode

REFLECT ✅ завершён — следующий шаг `/close-task`

## Next Steps

1. `/close-task` — финализация задачи (completed-запись, merge в develop)

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**

- Фаза 2: Web App Manifest — `step-web-app-manifest` завершён ✅

- BUILD завершён: `ManifestScreen` — объяснение + живые данные из `/manifest.webmanifest`

- REFLECT завершён: [memory-bank/reflection/reflection-step-manifest-lesson-ui.md](reflection/reflection-step-manifest-lesson-ui.md)

- Nav и `lessonRoutes.ts` не менялись — только `src/screens/ManifestScreen/`

- Первый async fetch в проекте — изолирован в `fetchManifest.ts`

- SCSS экрана: `ManifestScreen.scss`, BEM-префикс `manifest-screen__`

- Цикл Level 2: VAN → PLAN ✅ → BUILD ✅ → REFLECT ✅ → CLOSE-TASK
