# Tasks

## Current Task

- **Task ID:** `step-offline-fallback`
- **Название:** Runtime caching и offline fallback
- **Git Branch:** `feat/step-offline-fallback`
- **Complexity:** Level 2–3
- **Источник:** docs/project/implementation-plan.md (step-offline-fallback)
- **Создано:** 2026-08-04

### Описание

Runtime caching и offline fallback на уровне SW: `navigateFallback` → SPA из precache (отдельная React-страница «Вы offline» **не нужна** — оболочка уже в кэше). Хук `useOnlineStatus` — источник состояния сети. Отдельный компонент `OfflineIndicator` в правом верхнем углу: виден только в offline, при online не рендерится; пользователь продолжает работать с приложением offline.

### Цель

После первого визита приложение частично работает offline; есть явный offline UX.

### Чеклист

- [ ] GIT: Работа в feature-ветке feat/step-offline-fallback
- [ ] PLAN: Детальный план реализации (`/plan`)
- [ ] BUILD: Workbox `navigateFallback` + runtime caching rules в `vite.config.ts`
- [ ] BUILD: Хук `useOnlineStatus`
- [ ] BUILD: Компонент `OfflineIndicator` (правый верхний угол, только offline)
- [ ] BUILD: Unit-тесты (хук, индикатор)
- [ ] BUILD: E2E offline-сценарий
- [ ] BUILD: lint, build, test, e2e
- [ ] REFLECT: Рефлексия (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой /close-task

## Last Completed Task

- **Task ID:** `step-sw-update-ux`
- **Название:** UX обновления Service Worker
- **Дата завершения:** 2026-08-04
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-sw-update-ux_2026-08-04.md](completed-tasks/2026/08/step-sw-update-ux_2026-08-04.md)
- **Reflection:** [memory-bank/reflection/reflection-step-sw-update-ux.md](reflection/reflection-step-sw-update-ux.md)
