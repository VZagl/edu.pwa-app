# Active Context

## Current Focus

`feat/step-offline-fallback` — Runtime caching и offline fallback

## Current Mode

PLAN — детальное планирование перед реализацией

## Next Steps

1. `/plan` — детальный план: `navigateFallback`, runtime caching, `useOnlineStatus`, `OfflineIndicator`, тесты
2. [CREATIVE] — при необходимости решения по стратегиям кэширования
3. `/build` — реализация по TDD
4. `/reflect` → `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 3 завершена ✅ — SW в production, UX обновления (`step-sw-update-ux`)
- Текущая задача: `step-offline-fallback` (фаза 4 — офлайн и кэш)
- `vite.config.ts`: только precache, без `runtimeCaching`
- Offline fallback — SW-уровень (`navigateFallback` → SPA из precache); отдельная React-страница «Вы offline» не нужна
- `/offline` — учебный экран урока (`step-offline-lesson-ui`), не offline fallback
- Offline-индикатор — отдельный компонент `OfflineIndicator` в правом верхнем углу, скрыт при online
- SW в dev отключён; E2E через preview
- ui-conventions.md: mobile-first SCSS, touch target ≥ 44px
