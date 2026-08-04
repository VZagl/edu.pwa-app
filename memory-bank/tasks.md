# Tasks

## Current Task

- **Task ID:** `step-vite-plugin-pwa`
- **Название:** Подключить vite-plugin-pwa
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-vite-plugin-pwa`
- **Источник:** docs/project/implementation-plan.md (Order 3.1.2)
- **Зависит от:** step-service-worker-register ✅

### Описание

Подключить `vite-plugin-pwa` (Workbox): precache статики из сборки, dev/prod настройки (отключение SW в dev или `devOptions` по доке плагина). Заменить или интегрировать ручной SW из предыдущего шага.

**Цель:** Production-сборка генерирует SW; `pnpm preview` — приложение cacheable.

**Файлы:** `vite.config.ts`, `package.json` (+ возможно `src/pwa/registerSw.ts`, `public/sw.js`, manifest, E2E)

**Тесты:** E2E против `pnpm preview` — приложение загружается; ручная/автопроверка наличия SW в production-сборке

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-vite-plugin-pwa
- [ ] PLAN: Детальный план реализации (`/plan`)
- [ ] BUILD: Подключить `vite-plugin-pwa`, настроить Workbox precache
- [ ] BUILD: Dev/prod настройки SW (отключение в dev или `devOptions`)
- [ ] BUILD: Заменить/интегрировать ручной `public/sw.js` и `registerSw.ts`
- [ ] BUILD: Manifest — единый источник правды (не дублировать с `public/manifest.webmanifest`)
- [ ] BUILD: TDD — unit/E2E тесты по плану
- [ ] BUILD: Verify — lint, build, `pnpm test --run`, E2E против preview
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой /close-task

### Вопросы для PLAN

1. Удалить `public/sw.js` или оставить как fallback?
2. Manifest: `public/manifest.webmanifest` vs генерация через плагин?
3. Регистрация SW: оставить `registerSw.ts` или `injectRegister` плагина?
4. SW в dev: отключить или `devOptions.enabled`?
5. E2E: расширить smoke или отдельный spec для SW?

## Last Completed Task

- **Task ID:** `step-service-worker-register`
- **Название:** Регистрация Service Worker
- **Дата завершения:** 2026-08-04
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-service-worker-register_2026-08-04.md](completed-tasks/2026/08/step-service-worker-register_2026-08-04.md)
- **Reflection:** [memory-bank/reflection/reflection-step-service-worker-register.md](reflection/reflection-step-service-worker-register.md)
