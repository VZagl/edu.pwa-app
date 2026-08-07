# Active Context

## Current Focus

`feat/step-lighthouse-pwa-checklist` — чеклист Lighthouse PWA и документирование проверки

## Current Mode

PLAN завершён → следующий шаг: **BUILD**

## Next Steps

1. `/build` — создать `docs/project/pwa-checklist.md` и перекрёстные ссылки
2. Выполнить ручную проверку по чеклисту (`pnpm build` → `pnpm preview` → Lighthouse)
3. Прогнать регрессию (lint, build, test --run, test:e2e)
4. `/reflect` → `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 6: Lighthouse PWA checklist — документация, без CREATIVE phase
- Deliverable: `docs/project/pwa-checklist.md` + ссылки из README, tech-stack-pwa, run-and-build
- Зависимости (`step-install-prompt`, `step-offline-fallback`) закрыты
- Код менять только если ручной Lighthouse выявит реальный дефект PWA
- План: `memory-bank/tasks.md`
