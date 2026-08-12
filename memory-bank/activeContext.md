# Active Context

## Current Focus

`feat/step-sw-update-download-progress` — прогресс загрузки новой версии SW / precache (`step-sw-update-download-progress`)

## Current Mode

CREATIVE COMPLETE → следующий шаг: `/build`

## Next Steps

1. `/build` — реализация по TDD (Phase 1–5 из `tasks.md`)
2. `/reflect` → `/close-task`
3. GIT: работать только в `feat/step-sw-update-download-progress`

## Context for AI

- Учебное Progressive Web App на React + Vite (только frontend)
- Менеджер пакетов: pnpm
- База: `swUpdateController` + `virtual:pwa-register` + `generateSW` (`registerType: 'prompt'`) после `step-sw-update-apply-fast`
- **UX (зафиксирован):**
  1. Фоновое скачивание (install/precache) → показать прогресс
  2. Скачивание завершено (waiting) → убрать прогресс, кнопка «Обновить»
  3. После клика → «Обновляется…» без % (activate + reload)
- **CREATIVE решения:**
  - Architecture: **Option A** — lifecycle `updatefound` / `installing` + `statechange`, indeterminate (`downloadProgress: null`)
  - UI/UX: **Option 1** — расширить `SwUpdateBanner` (три фазы)
  - Документ: `memory-bank/creative/creative-sw-update-download-progress.md`
  - `injectManifest` / смена стратегии SW — **не** в этой задаче
- Не трогать `.vscode/settings.json` (локальное изменение вне скоупа)
