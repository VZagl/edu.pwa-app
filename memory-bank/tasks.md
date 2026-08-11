# Tasks

## Current Task

- **Task ID:** `step-app-version-header`
- **Название:** Версия приложения в header
- **Создано:** 2026-08-11
- **Complexity:** Level 2 — Simple Enhancement
- **Тип:** Enhancement
- **Git Branch:** `feat/step-app-version-header`
- **Источник:** `docs/project/implementation-plan.md` (step-app-version-header)
- **Зависит от:** `step-app-shell` ✅
- **Статус:** REFLECT COMPLETE → переход к `/close-task`
- **Reflection:** [memory-bank/reflection/reflection-step-app-version-header.md](reflection/reflection-step-app-version-header.md)

### Описание

Вывести версию приложения в `app-shell__header` справа от названия (`edu.pwa-app`), прижать к правому краю. Layout: flex на `.app-shell__header`. Источник истины — `version` в `package.json`; проброс в клиент через Vite `define` + тонкий модуль `src/appVersion.ts`. Это версия приложения, не SW revision / `scriptURL`.

### Цель

В шапке всегда видна текущая версия приложения (удобно для лаборатории и update flow).

### Чеклист

- [x] VAN: Инициализация задачи, сложность L2, feature-ветка
- [x] GIT: Работа в feature-ветке `feat/step-app-version-header`
- [x] PLAN: Детальный план реализации
- [x] BUILD: Реализация (TDD) + verify
- [x] REFLECT: Рефлексия
- [ ] CLOSE: Финализировать задачу командой `/close-task`

## Reflection Highlights

- **What Went Well:** PLAN→BUILD без отклонений; TDD; `define` + тонкий `APP_VERSION`; Vitest подхватил `define`; строгий scope
- **Challenges:** граница app version vs SW; типы `__APP_VERSION__`; flex layout header
- **Lessons Learned:** `define` + named export — удобный паттерн; unit через `APP_VERSION` устойчивее хардкода версии
- **Next Steps:** `/close-task`

## Build Progress

- [x] Red: `App.test.tsx` — header с названием и `APP_VERSION`
- [x] Green: `vite.config.ts` `define` + `src/vite-env.d.ts` + `src/appVersion.ts`
- [x] Green: UI в `App.tsx` / `App.scss` (flex, версия справа)
- [x] Verify: lint ✅, typecheck ✅, unit 145 ✅, build ✅

### Test Results

| Команда           | Результат               |
| ----------------- | ----------------------- |
| `pnpm lint`       | ✅                      |
| `pnpm typecheck`  | ✅                      |
| `pnpm test --run` | ✅ 24 files / 145 tests |
| `pnpm build`      | ✅                      |

## Technology Stack

- Framework: React 19 + TypeScript
- Build Tool: Vite 8 (`define` для константы версии)
- Styles: SCSS (`App.scss`)
- Tests: Vitest + Testing Library
- Новые зависимости: нет

## Technology Validation Checkpoints

- [x] Стек проекта уже инициализирован (pnpm / Vite / React)
- [x] Новых зависимостей не требуется
- [x] Механизм Vite `define` подтверждён документацией
- [x] `vite/client` уже подключён в `tsconfig.app.json`
- [x] Отдельный Hello World / POC не нужен (инфраструктура готова)
- [x] Проверка в BUILD: `pnpm lint`, `pnpm typecheck`, `pnpm test --run`, `pnpm build`

## Implementation Plan

### Решение по пробросу версии

`package.json` (`version`) → `vite.config.ts` `define: { __APP_VERSION__ }` → `src/vite-env.d.ts` → `src/appVersion.ts` (`export const APP_VERSION`) → `App.tsx`.

Альтернатива «только модуль с import JSON» отклонена: `define` — штатный путь Vite; тонкий модуль даёт named export для UI и тестов.

### Шаги (TDD)

1. **Red** — расширить `src/App.test.tsx`: header показывает название и версию (`APP_VERSION` / значение из `package.json`)
2. **Green — конфиг и модуль**
   - `vite.config.ts`: читать `version` из `package.json`, `define: { __APP_VERSION__: JSON.stringify(version) }`
   - `src/vite-env.d.ts`: `declare const __APP_VERSION__: string`
   - `src/appVersion.ts`: `export const APP_VERSION = __APP_VERSION__`
3. **Green — UI**
   - `App.tsx`: `<span className="app-shell__version">{APP_VERSION}</span>` в header рядом с названием
   - `App.scss`: `display: flex`, `justify-content: space-between` (или `margin-left: auto` у версии), вторичный стиль версии через `var(--color-text)`
4. **Verify:** `pnpm lint`, `pnpm typecheck`, `pnpm test --run`, `pnpm build`
5. E2E — не обязателен (unit достаточно)

### Затрагиваемые файлы

| Файл                | Действие                                    |
| ------------------- | ------------------------------------------- |
| `vite.config.ts`    | добавить `define` из `package.json`         |
| `src/vite-env.d.ts` | создать (типы `__APP_VERSION__`)            |
| `src/appVersion.ts` | создать (named export `APP_VERSION`)        |
| `src/App.tsx`       | вывести версию в header                     |
| `src/App.scss`      | flex-layout + стили версии                  |
| `src/App.test.tsx`  | unit: название + версия                     |
| `package.json`      | только чтение `version` (bump не требуется) |

### Тесты

- unit — header показывает название и версию
- E2E smoke — опционально, не в scope по умолчанию

## Creative Phases Required

- Нет (L2; решение по `define` vs модуль зафиксировано в плане)

## Challenges & Mitigations

| Риск                                  | Митигация                                                         |
| ------------------------------------- | ----------------------------------------------------------------- |
| TypeScript не знает `__APP_VERSION__` | `src/vite-env.d.ts` с `declare const`                             |
| Vitest без подстановки `define`       | тот же `vite.config.ts` (Vitest на базе Vite)                     |
| Путаница с SW revision / `scriptURL`  | менять только header; экран Service Worker без изменений          |
| Версия `0.0.0` выглядит «сыро»        | отображать как в `package.json` (источник истины); bump вне scope |

## Dependencies

- `step-app-shell` ✅ (header / shell уже есть)
- Vite `define` (встроенный)
- Существующие unit-тесты `App.test.tsx`

## Last Completed Task

- **Task ID:** `step-push-notifications`
- **Название:** Web Push — опциональный урок
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED & ARCHIVED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-push-notifications_2026-08-11.md](completed-tasks/2026/08/step-push-notifications_2026-08-11.md)
- **Archive:** [memory-bank/archive/archive-step-push-notifications.md](archive/archive-step-push-notifications.md)
- **Reflection:** [memory-bank/reflection/reflection-step-push-notifications.md](reflection/reflection-step-push-notifications.md)
