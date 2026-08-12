# Active Context

## Current Focus

`feat/step-sw-update-download-progress` — прогресс загрузки новой версии SW / precache (`step-sw-update-download-progress`)

## Current Mode

VAN COMPLETE → следующий шаг: `/plan`

## Next Steps

1. `/plan` — детальный план (подходы к прогрессу precache, затрагиваемые файлы, тесты)
2. `/creative` — выбор подхода (generateSW vs injectManifest / workbox-window / messaging) и UX индикатора
3. `/build` — реализация по TDD
4. `/reflect` → `/close-task`
5. GIT: работать только в `feat/step-sw-update-download-progress`

## Context for AI

- Учебное Progressive Web App на React + Vite (только frontend)
- Менеджер пакетов: pnpm
- База: `swUpdateController` + `virtual:pwa-register` + `generateSW` (`registerType: 'prompt'`) после `step-sw-update-apply-fast`
- Цель UX: прогресс на этапе **install/precache**, не после клика «Обновить»
- Не трогать `.vscode/settings.json` (локальное изменение вне скоупа)
