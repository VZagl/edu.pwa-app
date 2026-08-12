# Active Context

## Current Focus

`feat/step-sw-update-apply-fast` — быстрое применение обновления PWA по кнопке «Обновить»

## Current Mode

PLAN COMPLETE — ожидание `/build`

## Next Steps

1. `/build` — TDD: in-flight apply, проактивный `registration.update()`, banner «Обновляется…», docs Pages/CDN
2. `/reflect` → `/close-task`

## Context for AI

- Task ID: `step-sw-update-apply-fast`
- Level 2 — Simple Enhancement; маршрут: VAN → PLAN → BUILD → REFLECT (creative не нужен)
- База: `swUpdateController`, `useSwUpdate`, `SwUpdateBanner`; `skipWaiting` уже через `updateSW(true)`
- Must-have: после первого клика «Обновить» кнопка disabled + «Обновляется…», без повторного `applySwUpdate`
- План: расширить state `{ updateAvailable, isApplying }`; `onRegisteredSW` + throttle на visibility/focus/online + интервал; docs про CDN `sw.js`
- Не входит: progress % precache (`step-sw-update-download-progress`)
- Git Branch: `feat/step-sw-update-apply-fast`
- Пакетный менеджер: pnpm
