# Level 2 Enhancement Reflection: UX обновления Service Worker

**Task ID:** `step-sw-update-ux`  
**Дата рефлексии:** 2026-08-04  
**Ветка:** `feat/step-sw-update-ux`

## Enhancement Summary

Реализован UX обновления PWA при появлении waiting Service Worker: `registerType: 'autoUpdate'` заменён на `'prompt'`; регистрация SW перенесена с `registerSw.ts` на `swUpdateController.ts` через `virtual:pwa-register` (`immediate: true`, `onNeedRefresh`). Императивный pub/sub-слой отделён от React (`useSwUpdate`) и UI (`SwUpdateBanner` — fixed bottom bar, «Доступно обновление» + «Обновить»). Активация — `updateSW(true)` (skipWaiting по сообщению клиента, без `skipWaiting`/`clientsClaim` в workbox). TDD: 6 unit-тестов controller, 4 хук, 3 баннер; глобальный мок `virtual:pwa-register` в `vitest.setup.ts`. E2E smoke: баннер скрыт при первой загрузке (4-й тест в `service-worker-pwa.spec.ts`). Verify: lint ✅, build ✅, test (27) ✅, e2e (9) ✅. Обновлён `docs/project/config-schema.md`.

## What Went Well

- **PLAN → BUILD без отклонений** — все 5 решений PLAN (registerType + virtual module, трёхслойная архитектура, skipWaiting через клиент, fixed bottom bar, E2E smoke) реализованы как зафиксировано в tasks.md.
- **Чистое разделение слоёв** — `swUpdateController.ts` (императив, pub/sub) → `useSwUpdate` (React) → `SwUpdateBanner` (UI); controller не зависит от React, тестируется изолированно.
- **TDD с virtual module** — `vi.hoisted` + локальный мок в `swUpdateController.test.ts` перехватывает `onNeedRefresh` и проверяет `updateSW(true)`; глобальный мок в `vitest.setup.ts` не ломает остальные тесты.
- **Плавная замена `registerSw.ts`** — единственная точка входа `initSwUpdate()` в `main.tsx`; старый модуль и его тесты удалены без регрессий.
- **UI по ui-conventions** — mobile-first SCSS, touch target ≥ 44px, `role="status"`, `aria-label` на кнопке; баннер рендерится только при `updateAvailable`.
- **E2E smoke без ложных срабатываний** — проверка «баннер не виден при первой загрузке» дополняет существующие 3 SW-теста; полный update-flow осознанно вынесен в manual.

## Challenges Encountered

- **Virtual module `virtual:pwa-register` в Vitest** — модуль не существует в runtime тестов; нужен явный мок с захватом опций `registerSW`.
- **E2E не воспроизводит waiting worker** — для появления баннера нужны две сборки (build → preview → rebuild → refresh); автоматизация хрупкая и медленная.
- **Синхронизация состояния controller ↔ React** — подписчик должен получить текущее состояние сразу при subscribe (race: `onNeedRefresh` до mount компонента).
- **Зависимость `workbox-window`** — peer/runtime для `virtual:pwa-register`; добавлена явно в `package.json` для корректной сборки типов.

## Solutions Applied

- Мок через `vi.hoisted` + `vi.mock('virtual:pwa-register')` в тестах controller; глобальный no-op мок в `vitest.setup.ts` для компонентов, не тестирующих SW-логику.
- E2E ограничен smoke («баннер скрыт»); полный flow документирован как ручная проверка (комментарий в spec + reflection).
- `subscribeSwUpdate` сразу вызывает `listener({ updateAvailable: needRefresh })` при подписке — новый подписчик не пропускает уже наступившее обновление.
- `workbox-window@^7.4.1` добавлен в dependencies; `RegisterSWOptions` типизирован через `vite-plugin-pwa/types`.

## Key Technical Insights

- **`registerType: 'prompt'` + `virtual:pwa-register`** — плагин генерирует клиентский код с `onNeedRefresh`; ручная регистрация (`injectRegister: null`) сохраняет контроль над UX.
- **`updateSW(true)`** — обёртка над `messageSkipWaiting()` из workbox-window; не требует `skipWaiting: true` в workbox config — пользователь решает, когда активировать waiting worker.
- **Pub/sub вне React** — SW-события приходят вне render cycle; controller как singleton с `Set<listener>` надёжнее, чем только Context/useState на верхнем уровне.
- **`immediate: true`** — регистрация SW при загрузке страницы; без этого waiting worker может не обнаружиться вовремя.
- **Preview-only проверка** — SW и update UX активны только после production build; dev по-прежнему без SW.

## Process Insights

- **Level 2 без CREATIVE** — UI описан в PLAN и ui-conventions; fixed bottom bar достаточен без отдельной creative phase.
- **Challenges & Mitigations из PLAN** — риски (virtual module, двойная регистрация, E2E) были предусмотрены; mitigations сработали.
- **TDD по слоям** — controller → hook → banner → интеграция; каждый слой покрыт до wiring в App.
- **Verify до REFLECT** — lint, build, 27 unit, 9 e2e; reflection опирается на зафиксированные результаты в progress.md.

## Action Items for Future Work

- **`/archive` и `/close-task`** — финализация задачи (completed-запись, обновление `implementation-plan.md`, удаление из backlog).
- **Ручная проверка update flow** — `pnpm build && pnpm preview` → изменить код → `pnpm build` → refresh в браузере → баннер «Доступно обновление» → «Обновить» → перезагрузка с новым SW.
- **E2E update flow (опционально, backlog)** — двухэтапный preview с разными hash сборок; сложно, но возможно через CI artifact или custom fixture.
- **Следующий шаг фазы 3** — offline page / runtime caching (по implementation-plan.md).
- **`devOptions.enabled` (опционально)** — если понадобится тестировать update UX в `pnpm dev`.

## Time Estimation Accuracy

- Estimated time: ~3–4 ч (PLAN + controller/hook/banner + TDD + E2E smoke + docs + verify)
- Actual time: одна сессия 2026-08-04 (PLAN → BUILD → REFLECT)
- Variance: в пределах оценки
- Reason: архитектура зафиксирована в PLAN; инфраструктура preview/E2E и паттерн `src/pwa/` уже отработаны в step-vite-plugin-pwa; основная работа — controller + UI + миграция с registerSw

## Manual Verification Checklist

- [ ] `pnpm build && pnpm preview` — SW регистрируется, баннер скрыт
- [ ] Изменить видимый текст (например, заголовок) → `pnpm build` → refresh без hard reload
- [ ] Баннер «Доступно обновление» появляется
- [ ] Кнопка «Обновить» → страница перезагружается, баннер исчезает
- [ ] DevTools → Application → Service Workers: activated worker обновлён
