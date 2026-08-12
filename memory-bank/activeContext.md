# Active Context

## Current Focus

`feat/step-sw-update-download-progress` — прогресс загрузки новой версии SW / precache (`step-sw-update-download-progress`)

## Current Mode

PLAN COMPLETE → следующий шаг: `/creative`

## Next Steps

1. `/creative` — выбрать источник прогресса (lifecycle vs injectManifest/% vs hybrid) и UX индикатора (баннер в две фазы)
2. `/build` — реализация по TDD
3. `/reflect` → `/close-task`
4. GIT: работать только в `feat/step-sw-update-download-progress`

## Context for AI

- Учебное Progressive Web App на React + Vite (только frontend)
- Менеджер пакетов: pnpm
- База: `swUpdateController` + `virtual:pwa-register` + `generateSW` (`registerType: 'prompt'`) после `step-sw-update-apply-fast`
- **UX (зафиксирован в PLAN):**
  1. Фоновое скачивание (install/precache) → показать прогресс
  2. Скачивание завершено (waiting) → убрать прогресс, кнопка «Обновить»
  3. После клика → «Обновляется…» без % (activate + reload)
- Не трогать `.vscode/settings.json` (локальное изменение вне скоупа)
