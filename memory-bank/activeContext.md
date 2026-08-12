# Active Context

## Current Focus

`feat/step-readme-learner-guide` — README «с нуля» для ученика (Level 2)

## Current Mode

PLAN complete — следующий шаг `/build`

## Next Steps

1. `/build` — обновить `README.md` по плану в `tasks.md`
2. `/reflect` → `/close-task`
3. GIT: работать только в `feat/step-readme-learner-guide`
4. CLOSE: финализировать командой `/close-task`

## Context for AI

- Учебное Progressive Web App на React + Vite (только frontend)
- Менеджер пакетов: pnpm
- Не трогать `.vscode/settings.json` (локальное изменение вне скоупа)
- Задача docs-only: автотесты не обязательны; ревью документации
- **Рекомендуемый старт в README:** `pnpm build` + `pnpm preview` (не `dev` как главный путь)
- `pnpm dev` — только для UI/HMR; SW в dev по умолчанию выключен (`vite-plugin-pwa` без `devOptions.enabled`)
- Источник списка экранов: `src/routes/lessonRoutes.ts`
- Creative не нужен → сразу `/build`
