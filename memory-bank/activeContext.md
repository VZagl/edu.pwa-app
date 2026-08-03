# Active Context

## Current Focus

**Task ID:** `step-manifest-lesson-ui` — Экран урока «Manifest»

**Git Branch:** `feat/step-manifest-lesson-ui`

## Current Mode

BUILD ✅ завершён — следующий шаг `/reflect`

## Next Steps

1. `/reflect` — рефлексия по задаче

2. `/close-task` — финализация задачи

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**

- Фаза 2: Web App Manifest — `step-web-app-manifest` завершён ✅

- BUILD завершён: `ManifestScreen` — объяснение + живые данные из `/manifest.webmanifest`

- Nav и `lessonRoutes.ts` не менялись — только `src/screens/ManifestScreen/`

- Первый async fetch в проекте — изолирован в `fetchManifest.ts`

- SCSS экрана: `ManifestScreen.scss`, BEM-префикс `manifest-screen__`

- Цикл Level 2: VAN → PLAN ✅ → BUILD ✅ → REFLECT → CLOSE-TASK
