# Tasks

## Current Task

- **Task ID:** `step-sw-update-ux`
- **Название:** UX обновления Service Worker
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-sw-update-ux`
- **Источник:** docs/project/implementation-plan.md (Order 3.1.3)
- **Зависит от:** step-vite-plugin-pwa ✅

### Описание

UX при новой версии SW: обнаружение `waiting` worker, баннер «Доступно обновление» + кнопка перезагрузки (`skipWaiting` через сообщение клиента по стратегии `prompt`).

**Цель:** Пользователь понимает, как обновляется установленное PWA.

**Файлы:** `src/pwa/`, `src/hooks/`, `src/components/`, `vite.config.ts`, `App.tsx`, `main.tsx`, `e2e/`, `docs/project/config-schema.md`

**Тесты:** unit — controller/хук/баннер (моки `virtual:pwa-register`); E2E — smoke «баннер скрыт при первой загрузке»

### Technology Stack

- **PWA:** `vite-plugin-pwa@^1.3.0` — `registerType: 'prompt'`, `injectRegister: null`
- **Регистрация:** `virtual:pwa-register` (workbox-window + `SKIP_WAITING`)
- **UI:** React 19 + SCSS (`SwUpdateBanner`)
- **Unit:** Vitest + Testing Library
- **E2E:** Playwright против `pnpm preview`

### Technology Validation Checkpoints

- [x] `vite-plugin-pwa` в `package.json`
- [x] `injectRegister: null` + ручная регистрация — паттерн уже используется
- [x] SW в dev отключён — E2E через preview
- [x] `registerType: 'prompt'` поддерживается; типы через `vite/client`
- [ ] BUILD: сборка с import `virtual:pwa-register`

### Решения PLAN (ответы на вопросы)

| #   | Вопрос                                   | Решение                                                                                                     |
| --- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1   | `registerType` vs `virtual:pwa-register` | Оба: `registerType: 'prompt'` + `virtual:pwa-register`                                                      |
| 2   | Где логика                               | `swUpdateController.ts` (императив) + `useSwUpdate` (React) + `SwUpdateBanner` (UI)                         |
| 3   | Активация                                | Сообщение из клиента: `updateSW(true)` → `messageSkipWaiting()`; без `skipWaiting`/`clientsClaim` в workbox |
| 4   | UX баннера                               | Фиксированная полоска снизу, текст «Доступно обновление», кнопка «Обновить»                                 |
| 5   | E2E                                      | Unit — основное покрытие; E2E smoke; полный update-flow — ручная проверка                                   |

### Creative Phases Required

- Нет (Level 2; UI описан в `ui-conventions.md`)

### Implementation Plan

1. **Конфигурация** (`vite.config.ts`)
   - `registerType: 'autoUpdate'` → `'prompt'`
   - `injectRegister: null` — без изменений
   - `workbox` — без `skipWaiting`/`clientsClaim`

2. **Controller** (`src/pwa/swUpdateController.ts`)
   - `initSwUpdate()` — `registerSW` из `virtual:pwa-register`
   - `onNeedRefresh` → pub/sub + флаг `needRefresh`
   - `applySwUpdate()` → `updateSW(true)`
   - `subscribeSwUpdate(listener)` — для React-хука
   - Guard: `'serviceWorker' in navigator`
   - TDD: `swUpdateController.test.ts` — мок virtual module

3. **Хук** (`src/hooks/useSwUpdate.ts`)
   - `{ updateAvailable, applyUpdate }` через подписку на controller
   - TDD: `useSwUpdate.test.ts`

4. **UI** (`src/components/SwUpdateBanner/`)
   - Fixed bottom, `role="status"`, кнопка «Обновить» (`aria-label`)
   - SCSS: mobile-first, touch target ≥ 44px
   - TDD: `SwUpdateBanner.test.tsx`

5. **Интеграция**
   - `main.tsx`: `initSwUpdate()` вместо `registerSw()`
   - `App.tsx`: `<SwUpdateBanner />`
   - Удалить/заменить `registerSw.ts`; мигрировать тесты

6. **E2E** (`e2e/service-worker-pwa.spec.ts`)
   - Smoke: баннер не виден при первой загрузке
   - Комментарий: полный flow — manual (build → preview → rebuild → refresh)

7. **Документация** (`docs/project/config-schema.md`)
   - `registerType: 'prompt'`, описание update UX

8. **Verify**
   - `pnpm lint`, `pnpm build`, `pnpm test --run`, `pnpm test:e2e`

### Challenges & Mitigations

- Virtual module в Vitest → мок `virtual:pwa-register` в тестах controller
- Двойная регистрация SW → единственная точка `initSwUpdate()` в `main.tsx`
- E2E не ловит real waiting worker → unit + smoke E2E; manual в reflection

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-sw-update-ux
- [x] PLAN: Детальный план реализации (`/plan`)
- [ ] BUILD: `registerType: 'prompt'` + `swUpdateController.ts`
- [ ] BUILD: `useSwUpdate` + `SwUpdateBanner` + интеграция в App/main
- [ ] BUILD: TDD — unit-тесты controller/хук/баннер; E2E smoke
- [ ] BUILD: Обновить `config-schema.md`
- [ ] BUILD: Verify — lint, build, `pnpm test --run`, E2E против preview
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой /close-task

## Last Completed Task

- **Task ID:** `step-vite-plugin-pwa`
- **Название:** Подключить vite-plugin-pwa
- **Дата завершения:** 2026-08-04
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-vite-plugin-pwa_2026-08-04.md](completed-tasks/2026/08/step-vite-plugin-pwa_2026-08-04.md)
- **Reflection:** [memory-bank/reflection/reflection-step-vite-plugin-pwa.md](reflection/reflection-step-vite-plugin-pwa.md)
