# Active Context

## Current Focus

`feat/step-offline-fallback` — REFLECT завершён ✅

## Current Mode

REFLECT → ARCHIVE

## Next Steps

1. `/archive` — архивация задачи `step-offline-fallback`
2. `/close-task` — финализация задачи

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 3 завершена ✅ — SW в production, UX обновления (`step-sw-update-ux`)
- Текущая задача: `step-offline-fallback` (фаза 4 — офлайн и кэш) — BUILD и REFLECT завершены
- **Reflection:** [memory-bank/reflection/reflection-step-offline-fallback.md](reflection/reflection-step-offline-fallback.md)
- Offline fallback — SW-уровень (`navigateFallback: 'index.html'` → SPA из precache)
- Runtime caching: NetworkFirst для `.json`, StaleWhileRevalidate для изображений
- Хук `useOnlineStatus` (папка `src/hooks/useOnlineStatus/`)
- `OfflineIndicator`: chip `[●] offline`, radial red dot, light/dark токены, fixed top-right, `z-index: 110`
- `/offline` — учебный экран-заглушка, не offline fallback
- Verify: lint ✅, build ✅, unit 36 ✅, e2e 10 ✅
