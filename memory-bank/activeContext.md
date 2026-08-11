# Active Context

## Current Focus

- **Task ID:** `step-push-notifications`
- **Git Branch:** `feat/step-push-notifications`
- **Название:** Web Push — опциональный урок

## Current Mode

CREATIVE — завершён; следующий шаг — `/build`

## Next Steps

1. `/build` — реализация по TDD (хук → контент → экран → routes → SW importScripts → E2E → verify)
2. `/reflect` — рефлексия
3. `/close-task` — финализация

## Creative Summary

- **Документ:** [creative/creative-push-notifications.md](creative/creative-push-notifications.md)
- **Architecture:** гибрид (живые Permission/Notification + local notify; subscribe без серверной отправки)
- **SW:** `generateSW` + `importScripts('sw-push.js')`
- **UX:** паттерн Install; учебные секции «что / как / зачем / роль backend / Pages / iOS»
- **Не в scope:** backend отправки push; это не входит в `step-github-pages-deploy`

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- Паттерн lesson-ui: hook + `*LessonData` + Screen (BEM) + `lessonRoutes` + unit/E2E
- Смыслы урока брать из §0 creative-документа (Notification vs Push, цепочка, VAPID, обязанности backend)
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
