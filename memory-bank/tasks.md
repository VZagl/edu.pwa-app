# Tasks

## Current Task

- **Task ID:** `step-sw-update-apply-fast`
- **Название:** Быстрое применение обновления PWA по кнопке «Обновить»
- **Создано:** 2026-08-12
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Enhancement (PWA update UX)
- **Git Branch:** `feat/step-sw-update-apply-fast`
- **Источник:** memory-bank/backlog.md (step-sw-update-apply-fast)
- **Связь:** развивает `step-sw-update-ux` (`swUpdateController`, `useSwUpdate`, `SwUpdateBanner`)
- **Статус:** BUILD COMPLETE → переход к REFLECT

### Описание

На смартфоне (особенно установленное PWA / GitHub Pages) новая версия ощущается медленнее, чем на десктопе: редко вызывается проверка SW, waiting-worker появляется с задержкой, после клика нет промежуточного UI до reload.

**Важно:** `skipWaiting` уже есть через `updateSW(true)` в `applySwUpdate` (`registerType: 'prompt'`). Задача — не «добавить skipWaiting с нуля», а ускорить обнаружение обновления и сделать путь «клик → activate → reload» надёжным и мгновенным по ощущениям.

### Критерий (must-have)

После первого клика по «Обновить» повторные клики невозможны на всех платформах (desktop / Android / iOS). Кнопка сразу `disabled` (или эквивалент), подпись → «Обновляется…»; повторный вызов `applySwUpdate` / `updateSW` не допускается.

### Скоуп

- Блокировка кнопки + смена текста на «Обновляется…» (минимальный UX-фидбек до reload)
- Проактивные проверки: `registration.update()` на `visibilitychange` / `focus` / `online` (+ осторожный интервал, если нужен)
- Аудит `swUpdateController` / `SwUpdateBanner` / `useSwUpdate`: одноразовый apply (флаг in-flight), гарантированный reload после waiting
- Документировать ограничения GitHub Pages CDN / кэша `sw.js`
- Ручная проверка: Android Chrome (установленное PWA) и по возможности iOS Safari

### Не входит

Индикатор процентов precache / progress UI — `step-sw-update-download-progress`

## Technology Stack

- Framework: React 19
- Build Tool: Vite 8 + `vite-plugin-pwa` (`registerType: 'prompt'`)
- Language: TypeScript
- PWA register: `virtual:pwa-register` (`registerSW`, `onRegisteredSW`, `updateSW(true)`)
- Тесты: Vitest + Testing Library
- Новые зависимости: нет

## Technology Validation Checkpoints

- [x] Стек определён (существующий из `step-sw-update-ux`)
- [x] Новые зависимости не требуются
- [x] API подтверждены по доке vite-plugin-pwa (`onRegisteredSW` + `r.update()`, periodic updates)
- [x] Hello world / POC не нужен — база уже в production-сборке
- [x] Конфигурация `vite.config.ts` валидна (`registerType: 'prompt'`, `injectRegister: null`)

## Status

- [x] Initialization complete (VAN)
- [x] Planning complete (PLAN)
- [x] Technology validation complete
- [x] Implementation (BUILD)
- [ ] Reflection (REFLECT)
- [ ] Close task (CLOSE)

## Build Progress

- **Controller (isApplying + one-shot apply):** Complete — `src/pwa/swUpdateController.ts`
- **Controller (proactive update):** Complete — `onRegisteredSW`, throttle 30s, events visibility/focus/online, interval 60m + `fetch(no-store)`
- **Hook:** Complete — `isApplying` в `useSwUpdate`
- **Banner UX:** Complete — disabled + «Обновляется…» + `aria-busy`
- **Docs:** Complete — `pwa-checklist.md`, `run-and-build.md` (Pages CDN / `sw.js`)
- **Verify:** `pnpm lint` ✅ · `pnpm test --run` ✅ · `pnpm build` ✅
- **Ручная проверка mobile:** ожидает стенд (Android Chrome / iOS Safari на Pages)

## Implementation Plan

1. **Controller — одноразовый apply (TDD)**
   - Расширить состояние: `{ updateAvailable, isApplying }`
   - Флаг in-flight в модуле (не только React state): повторный `applySwUpdate` → no-op
   - При первом apply: `isApplying = true` → notify → `updateSW(true)`
   - Тесты: двойной вызов → `updateSW` один раз; подписчик получает `isApplying: true`

2. **Controller — проактивные проверки (TDD)**
   - Сохранить registration через `onRegisteredSW(swUrl, registration)`
   - Вызывать `registration.update()` на `visibilitychange` (когда visible), `window` `focus`, `online`
   - Debounce / throttle: не чаще N секунд между проверками
   - Осторожный интервал (~30–60 мин) при `navigator.onLine`; по возможности fetch `swUrl` с `cache: 'no-store'` перед `update()` (как в доке vite-plugin-pwa)
   - Cleanup слушателей / interval при необходимости (тестовый reset)

3. **Hook `useSwUpdate`**
   - Проброс `isApplying` из подписки
   - Тесты на новое поле состояния

4. **Banner UX**
   - При `isApplying`: кнопка `disabled`, текст «Обновляется…», корректный `aria-label` / `aria-busy`
   - Стили disabled в SCSS
   - Тесты: disabled + текст после клика / при `isApplying: true`

5. **Документация**
   - `docs/project/pwa-checklist.md` и/или `docs/project/run-and-build.md`: ограничения GitHub Pages CDN / кэша `sw.js`, отсутствие кастомного `Cache-Control`; проактивный `update()` смягчает, но не отменяет задержку CDN

6. **Верификация**
   - `pnpm lint`, `pnpm test --run`, `pnpm build`
   - Ручная проверка: Android Chrome (установленное PWA), по возможности iOS Safari; сравнить с десктопом на том же деплое

## Creative Phases Required

- Нет (Level 2; UX и API зафиксированы в backlog — disabled + «Обновляется…»)

## Dependencies

- Существующий `step-sw-update-ux` (`swUpdateController`, `useSwUpdate`, `SwUpdateBanner`)
- `vite-plugin-pwa` / `virtual:pwa-register` (уже в проекте)
- Деплой GitHub Pages (для ручной проверки на HTTPS)

## Challenges & Mitigations

- **Двойной клик до re-render:** флаг in-flight в `swUpdateController`, не только UI state
- **Частые `update()` на focus/visibility:** throttle между проверками
- **Reload не произошёл:** опереться на `updateSW(true)`; unit-тесты на одноразовый вызов; ручная проверка на Pages
- **CDN держит старый `sw.js`:** документировать ограничение; optional `no-store` fetch перед `update()`

## Affected Files

| Файл                                                                  | Изменение                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------- |
| `src/pwa/swUpdateController.ts`                                       | `isApplying`, одноразовый apply, проактивный `update()` |
| `src/pwa/swUpdateController.test.ts`                                  | TDD: in-flight, события, интервал                       |
| `src/hooks/useSwUpdate.ts`                                            | Проброс `isApplying`                                    |
| `src/hooks/useSwUpdate.test.ts`                                       | Тесты на `isApplying`                                   |
| `src/components/SwUpdateBanner/SwUpdateBanner.tsx`                    | disabled + «Обновляется…»                               |
| `src/components/SwUpdateBanner/SwUpdateBanner.test.tsx`               | Тесты UX apply                                          |
| `src/components/SwUpdateBanner/SwUpdateBanner.scss`                   | Стили disabled                                          |
| `docs/project/pwa-checklist.md` и/или `docs/project/run-and-build.md` | Ограничения Pages / CDN для `sw.js`                     |

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-sw-update-apply-fast
- [x] PLAN: Детальный план реализации
- [x] BUILD: TDD — одноразовый `applySwUpdate` + `isApplying`
- [x] BUILD: TDD — проактивный `registration.update()` (visibility/focus/online + интервал)
- [x] BUILD: Hook — проброс `isApplying`
- [x] BUILD: Banner — disabled + «Обновляется…»
- [x] BUILD: Docs — GitHub Pages / CDN `sw.js`
- [x] BUILD: verify — lint + tests + build
- [ ] BUILD: Ручная проверка mobile (Android / iOS по возможности)
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой /close-task

## Last Completed Task

- **Task ID:** `step-github-pages-deploy`
- **Название:** Деплой на GitHub Pages
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED & ARCHIVED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-github-pages-deploy_2026-08-11.md](completed-tasks/2026/08/step-github-pages-deploy_2026-08-11.md)
- **Archive:** [memory-bank/archive/archive-step-github-pages-deploy.md](archive/archive-step-github-pages-deploy.md)
- **Reflection:** [memory-bank/reflection/reflection-step-github-pages-deploy.md](reflection/reflection-step-github-pages-deploy.md)
