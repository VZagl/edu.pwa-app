# Level 2 Enhancement Reflection: Версия приложения в header

**Task ID:** `step-app-version-header`  
**Дата рефлексии:** 2026-08-11  
**Ветка:** `feat/step-app-version-header`  
**Complexity:** Level 2 — Simple Enhancement

## Enhancement Summary

В `app-shell__header` справа от названия выводится версия приложения. Источник истины — `version` в `package.json`; проброс в клиент через Vite `define` (`__APP_VERSION__`), типы в `src/vite-env.d.ts` и тонкий модуль `src/appVersion.ts` (`export const APP_VERSION`). UI: flex на header, `span.app-shell__version`. TDD: unit в `App.test.tsx` (название + версия через `APP_VERSION`). Verify: lint ✅, typecheck ✅, unit 145 ✅, build ✅. E2E не входил в scope. Creative phase не требовалась.

## What Went Well

- **PLAN → BUILD без отклонений** — цепочка `package.json` → `define` → `vite-env.d.ts` → `appVersion.ts` → `App.tsx` / `App.scss` реализована как в плане.
- **TDD red → green** — сначала тест header + версии, затем конфиг/модуль и UI; verify с первого полного прогона.
- **Тонкий модуль `APP_VERSION`** — единая точка для UI и тестов; без дублирования строки версии.
- **Vitest на базе Vite** — `define` из того же `vite.config.ts` подставился в unit без отдельной настройки.
- **Scope discipline** — без bump `package.json`, без изменений экрана SW / revision / `scriptURL`; только header.

## Challenges Encountered

- **Путаница app version vs SW revision** — в лаборатории легко смешать версию приложения и идентификатор SW; нужно явно держать границу.
- **TypeScript и `__APP_VERSION__`** — глобал из `define` не известен компилятору без `declare const`.
- **Layout header** — нужно прижать версию вправо без ломки существующего title; выбран flex + `space-between` / `margin-left: auto`.

## Solutions Applied

- В PLAN и коде зафиксировано: менять только header; урок Service Worker не трогать.
- `src/vite-env.d.ts` с `declare const __APP_VERSION__: string`.
- `.app-shell__header { display: flex; justify-content: space-between; }` и `.app-shell__version { margin-left: auto; }` + вторичный стиль через `var(--color-text)`.

## Key Technical Insights

- **Vite `define` + `JSON.stringify(version)`** — штатный способ пробросить константу сборки в клиент; значение читается при старте конфига из `package.json`.
- **Named export `APP_VERSION`** удобнее прямого использования `__APP_VERSION__` в компонентах: проще импорт в тестах и единый контракт модуля.
- **Unit через `APP_VERSION`, а не хардкод `'0.0.0'`** — тест остаётся валидным при смене версии в `package.json` без правки assertions.
- **E2E не обязателен** для чисто визуальной константы в shell, если unit покрывает наличие текста в `banner`.

## Process Insights

- **Level 2 без CREATIVE** оправдан: альтернатива «только import JSON» отклонена ещё в PLAN; отдельный creative-документ не добавлял бы ценности.
- **Challenges & Mitigations в PLAN** закрыли риски TS/`define`/путаницы со SW заранее — BUILD без сюрпризов.
- **Verify-матрица до REFLECT** (lint, typecheck, unit, build) даёт уверенную базу для рефлексии и архивации.

## Action Items for Future Work

- `/close-task` — completed-запись, обновление `implementation-plan.md` / backlog, merge в `develop`.
- **Bump version** — вне scope этой задачи; при релизах обновлять `package.json` `version` (источник истины для header).
- Опционально: при появлении update-flow UX можно явно подписать в UI «версия приложения», если снова возникнет путаница со SW.

## Time Estimation Accuracy

- Estimated time: ~1–2 ч (PLAN + TDD + define/модуль/UI + verify для L2)
- Actual time: одна сессия 2026-08-11 (PLAN → BUILD → REFLECT)
- Variance: в пределах оценки
- Reason: инфраструктура Vite/Vitest и app-shell уже готовы; объём совпал с чеклистом, новых зависимостей нет
