# step-github-pages-deploy

- **Название:** Деплой на GitHub Pages
- **Дата создания:** 2026-08-07
- **Дата завершения:** 2026-08-11
- **Уровень сложности:** Level 3 — Intermediate Feature
- **Тип:** Feature / Infrastructure

## Задание

Деплой учебного PWA на GitHub Pages (HTTPS): Vite `base`, Actions → Pages, проверка PWA по HTTPS.

- **Источник:** docs/project/implementation-plan.md (step-github-pages-deploy)
- **Зависит от:** step-push-notifications
- **Причина:** Следующий шаг после Push; закрывает «деплой» из фазы 6

## Результат

Настроен деплой project site (`base: '/edu.pwa-app/'`), гибрид PWA-путей (relative manifest · `BASE_URL` · `registration.scope`), `BrowserRouter` с `basename`, workflow pnpm на `develop` + `workflow_dispatch`, docs (`run-and-build.md`, `pwa-checklist.md`). Verify: `pnpm verify:fast` ✅ (145 unit); `pnpm test:e2e` ✅ (18). Ручная проверка HTTPS Pages — после enable Pages + merge/dispatch.

## Ссылки

- **Архив:** [memory-bank/archive/archive-step-github-pages-deploy.md](../../archive/archive-step-github-pages-deploy.md)
- **Рефлексия:** [memory-bank/reflection/reflection-step-github-pages-deploy.md](../../reflection/reflection-step-github-pages-deploy.md)
- **Ветка:** `feat/step-github-pages-deploy`
- **Коммит:** `36d6c78`
