# Active Context

## Current Focus

Нет активной задачи. Запустить `/van` для инициализации.

## Current Mode

IDLE — ожидание новой задачи

## Next Steps

Запустить `/van [описание задачи]` для начала новой задачи.

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 3 завершена ✅ — SW в production, UX обновления (`step-sw-update-ux`)
- Фаза 4 в процессе — offline fallback завершён (`step-offline-fallback`); следующий шаг в backlog: `step-offline-lesson-ui`
- Offline fallback — SW-уровень (`navigateFallback: 'index.html'` → SPA из precache)
- `OfflineIndicator`: chip `[●] offline`, fixed top-right; `/offline` — учебный экран, не SW fallback
