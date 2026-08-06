# step-offline-fallback

- **Название:** Runtime caching и offline fallback
- **Дата создания:** 2026-08-04
- **Дата завершения:** 2026-08-06
- **Уровень сложности:** Level 3 — Feature
- **Тип:** Feature

## Задание

Runtime caching и offline fallback на уровне SW: `navigateFallback` → SPA из precache (отдельная React-страница «Вы offline» не нужна). Хук `useOnlineStatus` + компонент `OfflineIndicator` (правый верхний угол, только offline).

**Цель:** После первого визита приложение частично работает offline; есть явный offline UX.

## Результат

Workbox: `navigateFallback: 'index.html'`, `navigateFallbackDenylist`, runtime caching (NetworkFirst для `.json`, StaleWhileRevalidate для изображений). Хук `useOnlineStatus` в `src/hooks/useOnlineStatus/`. Компонент `OfflineIndicator` — chip `[●] offline`, fixed top-right, light/dark, `z-index: 110`. Интеграция в `App.tsx`. E2E `offline-fallback.spec.ts`. Verify: lint ✅, build ✅, unit 36 ✅, e2e 10 ✅.

После первого визита приложение работает offline (SPA-оболочка из precache); при отсутствии сети пользователь видит индикатор `[●] offline` в правом верхнем углу.

## Ссылки

- **Архив:** —
- **Рефлексия:** memory-bank/reflection/reflection-step-offline-fallback.md
- **Ветка:** feat/step-offline-fallback
- **Коммит:** 938572a
