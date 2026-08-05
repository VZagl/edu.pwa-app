# Active Context

## Current Focus

`feat/step-offline-fallback` — Runtime caching и offline fallback

## Current Mode

BUILD — реализация по плану (TDD)

## Next Steps

1. `/build` — реализация по Implementation Plan в `tasks.md`
2. `/reflect` → `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 3 завершена ✅ — SW в production, UX обновления (`step-sw-update-ux`)
- Текущая задача: `step-offline-fallback` (фаза 4 — офлайн и кэш)
- PLAN завершён; UI OfflineIndicator зафиксирован в `tasks.md` → BUILD
- Offline fallback — SW-уровень (`navigateFallback: 'index.html'` → SPA из precache)
- Runtime caching: NetworkFirst для `.json`, StaleWhileRevalidate для изображений
- Хук `useOnlineStatus` (папка `src/hooks/useOnlineStatus/`)
- `OfflineIndicator`: chip `[●] offline`, radial red dot, light/dark токены, fixed top-right (`space-sm`/`space-md`), `z-index: 110`, `aria-label="Нет сети"`
- `/offline` — учебный экран-заглушка, не offline fallback
- SW в dev отключён; E2E через preview + `context.setOffline`
- ui-conventions.md: mobile-first SCSS; видимый текст индикатора — `offline` (исключение для status badge)
