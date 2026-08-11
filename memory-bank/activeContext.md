# Active Context

## Current Focus

`feat/step-github-pages-deploy` — деплой учебного PWA на GitHub Pages (HTTPS)

## Current Mode

PLAN complete → ожидание `/creative`

## Next Steps

1. `/creative` — решения C1 (`base`), C2 (workflow trigger), C3 (PWA paths) → `creative-github-pages-deploy.md`
2. `/build` — реализация и проверки
3. `/reflect` → `/archive` → `/close-task`
4. Чеклист: GIT (`feat/step-github-pages-deploy`), CLOSE

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- Task ID: `step-github-pages-deploy` (Level 3)
- Зависимость `step-push-notifications` закрыта
- Remote: `VZagl/edu.pwa-app`; ожидаемый URL: `https://vzagl.github.io/edu.pwa-app/`
- Default branch: `develop` (не `main`) — учесть в C2
- Сейчас: `base` в Vite не задан; `.github/workflows/` отсутствует; в manifest/icons/`fetchManifest`/push — абсолютные `/…`; `BrowserRouter` без `basename`
- Файлы по плану: `vite.config.ts`, `src/main.tsx`, `fetchManifest.ts`, push icons, `.github/workflows/`, `docs/project/run-and-build.md`, `docs/project/pwa-checklist.md`
- Новых npm-зависимостей нет
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
