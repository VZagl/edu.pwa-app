# Active Context

## Current Focus

`feat/step-github-pages-deploy` — деплой учебного PWA на GitHub Pages (HTTPS)

## Current Mode

CREATIVE complete → ожидание `/build`

## Next Steps

1. `/build` — Phase 1–4 по плану + решения C1–C3 из `creative-github-pages-deploy.md`

2. `/reflect` → `/archive` → `/close-task`

3. Чеклист: GIT (`feat/step-github-pages-deploy`), CLOSE

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm

- Task ID: `step-github-pages-deploy` (Level 3)

- Зависимость `step-push-notifications` закрыта

- Remote: `VZagl/edu.pwa-app`; ожидаемый URL: `https://vzagl.github.io/edu.pwa-app/`

- Default branch: `develop` (не `main`)

- **Creative decisions (зафиксированы):**

  - **C1:** `base: '/edu.pwa-app/'`

  - **C2:** trigger `develop` + `workflow_dispatch`; pnpm в Actions

  - **C3:** гибрид путей — relative в manifest · `BASE_URL` + basename в app · `registration.scope` в SW

- Creative doc: `memory-bank/creative/creative-github-pages-deploy.md`

- Файлы по плану: `vite.config.ts`, `src/main.tsx`, `fetchManifest.ts`, push icons, `.github/workflows/`, `docs/project/run-and-build.md`, `docs/project/pwa-checklist.md`

- Новых npm-зависимостей нет

- План шагов: `docs/project/implementation-plan.md`

- Дорожная карта: `docs/project/product-roadmap.md`
