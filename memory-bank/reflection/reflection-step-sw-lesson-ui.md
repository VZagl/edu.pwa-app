# Level 2 Enhancement Reflection: Service Worker — учебный экран

**Task ID:** `step-sw-lesson-ui`  
**Дата рефлексии:** 2026-08-10  
**Ветка:** `feat/step-sw-lesson-ui`

## Enhancement Summary

Экран «Service Worker» заменён с `LessonStubScreen` на полноценный учебный раздел: intro (scope `/`, отличие от `<script>`), lifecycle (install → activate → controlling/waiting), живое демо через `useServiceWorkerInfo` (scope, states worker, controller, revision/scriptURL), update flow (`useSwUpdate` + `swUpdateController`/`SwUpdateBanner`), учебная кнопка «Сбросить SW и кэш» (`resetServiceWorkerLab`) с предупреждением «только для лаборатории», перекрёстная ссылка на Offline. Контент вынесен в `swLessonData.ts`; логика SW API — в хук и утилиту для изолированного тестирования. TDD: 6 unit-тестов хука, 2 unit-теста утилиты, 7 unit-тестов экрана, E2E `e2e/sw-lesson.spec.ts`. Verify: lint ✅, build ✅, unit 79 ✅, e2e 14 ✅.

## What Went Well

- **Структура экрана по плану** — все 7 блоков из PLAN реализованы: заголовок, intro, введение (scope), lifecycle, живое демо, update flow, сброс, ссылка на Offline.
- **Разделение ответственности** — `readServiceWorkerInfo` (чистая async-функция) + `useServiceWorkerInfo` (подписка на `controllerchange`); `resetServiceWorkerLab` отдельно от UI; `swLessonData.ts` для статического контента.
- **Паттерн data + screen + hook** — согласован с `HomeScreen`/`OfflineScreen`/`ManifestScreen`; BEM-классы и badge по образцу `offline-screen__badge`.
- **TDD и покрытие** — red → green на каждом слое: хук (моки `navigator.serviceWorker`), утилита (моки `caches`, `location.reload`), экран (моки хука и `useSwUpdate`), E2E smoke без клика по деструктивной кнопке.
- **Интеграция с существующей инфраструктурой** — переиспользованы `useSwUpdate`, `swUpdateController`, `SwUpdateBanner`; revision через `active.scriptURL` без новых env-переменных.
- **UX для dev-режима** — явная подсказка `devModeHint` при `import.meta.env.DEV`, что SW отключён в `pnpm dev`.
- **Доступность** — `role="region"`, `aria-labelledby`, `role="status"` для badge, `aria-label` на кнопке сброса.

## Challenges Encountered

- **SW отключён в `pnpm dev`** — живое демо не работает в dev-сервере Vite; нужна подсказка и инструкция `build` + `preview`.
- **Сложность моков Service Worker API** — `getRegistration()`, states worker, `controllerchange` требуют аккуратной настройки в unit-тестах.
- **Деструктивная кнопка сброса** — E2E не должен кликать (unregister + очистка caches + reload); только проверка наличия и предупреждения.
- **Revision без отдельного env** — нужен идентификатор сборки SW; выбран `scriptURL` из registration/controller.
- **Асинхронность в хуке** — race condition при unmount; решено флагом `cancelled`.

## Solutions Applied

- `devModeHint` в `swLessonData.ts`, показ в `SwDemoSection` при `import.meta.env.DEV`.
- Экспорт `readServiceWorkerInfo` отдельно от хука — тестируется без React; хук мокается в тестах экрана.
- E2E `sw-lesson.spec.ts`: проверка кнопки и текста «только для лаборатории» без `click()`.
- Revision: `registration?.active?.scriptURL ?? controller?.scriptURL` в `readServiceWorkerInfo`.
- В `useEffect`: `cancelled = true` в cleanup перед `setInfo`.

## Key Technical Insights

- **`readServiceWorkerInfo` как testable pure async** — вынос чтения SW-состояния из хука упрощает unit-тесты и позволяет переиспользовать логику без React.
- **`controllerchange` для живого демо** — подписка на событие обновляет UI при смене контроллера (после skipWaiting/reload).
- **`scriptURL` как revision** — Workbox/vite-plugin-pwa добавляет hash в URL SW-файла; достаточно для учебного «идентификатора сборки».
- **Деструктивные lab-утилиты** — `resetServiceWorkerLab` с ранним return при отсутствии `serviceWorker`; E2E не трогает деструктивные действия.
- **Badge-состояния** — единая визуальная модель: active / waiting / inactive / unsupported для демо и update flow.

## Process Insights

- **Level 2 без creative phase** — эталоны Offline/Home и таблица Challenges & Mitigations в PLAN сократили время на проектирование.
- **TDD по слоям** — сначала data + hook + util (red → green), затем UI, затем E2E; каждый слой изолирован.
- **Challenges & Mitigations в PLAN** — риски (dev mode, моки SW, деструктивная кнопка, revision) были предусмотрены и закрыты в BUILD.
- **Verify-матрица** — lint, build, unit, e2e после UI-задачи; baseline 79 unit / 14 e2e.

## Action Items for Future Work

- **`/close-task`** — completed-запись, merge в `develop`, обновление backlog/progress/roadmap.
- **Опционально: учебный экран Install** — следующий stub в roadmap (`step-install-lesson-ui` или аналог).
- **При доработке SW-демо** — рассмотреть polling или `statechange` на registration для обновления `waiting`/`installing` без перезагрузки (сейчас только `controllerchange`).
- **Backlog: общий паттерн lab-reset** — если появятся другие деструктивные кнопки, вынести предупреждение и E2E-стратегию в guideline.

## Time Estimation Accuracy

- Estimated time: ~4–5 ч (PLAN + TDD BUILD по 3 слоям + verify)
- Actual time: одна сессия 2026-08-10 (PLAN → BUILD)
- Variance: в пределах оценки
- Reason: эталоны UI и чёткий PLAN; дополнительное время — моки SW API и 3 новых модуля (hook, util, data)
