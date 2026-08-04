# Tasks

## Current Task

- **Task ID:** `step-sw-update-ux`
- **Название:** UX обновления Service Worker
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-sw-update-ux`
- **Источник:** docs/project/implementation-plan.md (Order 3.1.3)
- **Зависит от:** step-vite-plugin-pwa ✅

### Описание

UX при новой версии SW: обнаружение `waiting` worker, баннер «Доступно обновление» + кнопка перезагрузки (`skipWaiting` + `clients.claim` по выбранной стратегии).

**Цель:** Пользователь понимает, как обновляется установленное PWA.

**Файлы:** `src/pwa/`, `src/components/` (+ возможно `vite.config.ts`, `App.tsx`, E2E)

**Тесты:** unit — баннер/хук при наличии waiting worker (моки); E2E — по возможности сценарий обновления

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-sw-update-ux
- [ ] PLAN: Детальный план реализации (`/plan`)
- [ ] BUILD: Хук/логика обнаружения waiting worker и активации обновления
- [ ] BUILD: UI-баннер «Доступно обновление» + кнопка перезагрузки
- [ ] BUILD: Настройка `registerType` / стратегии обновления SW в vite.config
- [ ] BUILD: TDD — unit-тесты хука/баннера; E2E — по возможности
- [ ] BUILD: Verify — lint, build, `pnpm test --run`, E2E против preview
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой /close-task

### Вопросы для PLAN

1. `registerType`: сменить `autoUpdate` на `prompt` или использовать virtual module `virtual:pwa-register`?
2. Где разместить логику: расширить `registerSw.ts` или отдельный хук `useSwUpdate`?
3. Стратегия активации: `skipWaiting` + `clients.claim` в SW vs `message` из клиента?
4. UX баннера: фиксированная полоска сверху/снизу или toast-паттерн?
5. E2E: как симулировать новую версию SW в Playwright (двойной build, route mock)?

## Last Completed Task

- **Task ID:** `step-vite-plugin-pwa`
- **Название:** Подключить vite-plugin-pwa
- **Дата завершения:** 2026-08-04
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-vite-plugin-pwa_2026-08-04.md](completed-tasks/2026/08/step-vite-plugin-pwa_2026-08-04.md)
- **Reflection:** [memory-bank/reflection/reflection-step-vite-plugin-pwa.md](reflection/reflection-step-vite-plugin-pwa.md)
