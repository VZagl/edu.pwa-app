# Active Context

## Current Focus

`feat/step-sw-update-apply-fast` — быстрое применение обновления PWA по кнопке «Обновить»

## Current Mode

VAN COMPLETE — ожидание `/plan`

## Next Steps

1. `/plan` — детальный план (блокировка кнопки, проактивный `registration.update()`, аудит apply/reload, docs GitHub Pages)
2. `/build` — реализация по TDD
3. `/reflect` → `/close-task`

## Context for AI

- Task ID: `step-sw-update-apply-fast`
- Level 2 — Simple Enhancement; маршрут: VAN → PLAN → BUILD → REFLECT
- База: существующий `step-sw-update-ux` (`swUpdateController`, `useSwUpdate`, `SwUpdateBanner`); `skipWaiting` уже через `updateSW(true)`
- Must-have: после первого клика «Обновить» кнопка disabled + «Обновляется…», без повторного `applySwUpdate`
- Не входит: progress % precache (`step-sw-update-download-progress`)
- Git Branch: `feat/step-sw-update-apply-fast`
- Пакетный менеджер: pnpm
