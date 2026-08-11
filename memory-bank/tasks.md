# Tasks

## Current Task

- **Task ID:** `step-github-pages-deploy`
- **Название:** Деплой на GitHub Pages
- **Git Branch:** `feat/step-github-pages-deploy`
- **Уровень сложности:** Level 3 — Intermediate Feature
- **Тип:** Feature / Infrastructure
- **Источник:** docs/project/implementation-plan.md (step-github-pages-deploy)
- **Создано:** 2026-08-07
- **Статус:** VAN complete → ожидание `/plan`
- **Зависит от:** step-push-notifications (закрыта)

### Описание

Деплой учебного PWA на **GitHub Pages** (HTTPS): настроить `base` в Vite под путь репозитория (если project site), GitHub Actions (`pnpm build` → publish `dist`), проверить manifest/SW/offline/install уже на `https://…`. Обновить `docs/project/run-and-build.md` и при необходимости `docs/project/pwa-checklist.md` секцией про проверку на Pages.

**Цель:** Приложение доступно по HTTPS; PWA-сценарии воспроизводимы вне localhost.

**Ожидаемые артефакты:** правки `vite.config.ts` (base + пути manifest/PWA), `.github/workflows/` (deploy), обновления docs; ручная проверка на Pages; регрессия unit/E2E на preview.

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-github-pages-deploy`
- [ ] PLAN: Детальный план реализации
- [ ] CREATIVE: Дизайн-решения (base / workflow / PWA paths)
- [ ] BUILD: Реализация + verify (lint / build / test; e2e при необходимости)
- [ ] REFLECT: Рефлексия по задаче
- [ ] ARCHIVE: Архивация документации
- [ ] CLOSE: Финализировать задачу командой `/close-task`

### Challenges & Mitigations (предварительно)

| Challenge                                                        | Mitigation                                                             |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Project site: assets/SW/manifest ломаются без корректного `base` | CREATIVE: стратегия `base` + относительные/базированные пути в VitePWA |
| Абсолютные `/icons/…`, `start_url`/`scope` в текущем конфиге     | Согласовать с `base` в PLAN/CREATIVE                                   |
| CI: pnpm + Pages publish                                         | Официальный Actions Pages flow или эквивалент; зафиксировать в docs    |
| Проверка PWA только на HTTPS                                     | Docs + ручной чеклист на Pages после деплоя                            |

## Last Completed Task

- **Task ID:** `step-push-notifications`
- **Название:** Web Push — опциональный урок
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED & ARCHIVED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-push-notifications_2026-08-11.md](completed-tasks/2026/08/step-push-notifications_2026-08-11.md)
- **Archive:** [memory-bank/archive/archive-step-push-notifications.md](archive/archive-step-push-notifications.md)
- **Reflection:** [memory-bank/reflection/reflection-step-push-notifications.md](reflection/reflection-step-push-notifications.md)
