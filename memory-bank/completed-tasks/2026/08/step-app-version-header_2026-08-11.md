# step-app-version-header

- **Название:** Версия приложения в header
- **Дата создания:** 2026-08-11
- **Дата завершения:** 2026-08-11
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Enhancement

## Задание

Версия из `package.json` в `app-shell__header` справа от названия; flex-выравнивание.

- **Источник:** docs/project/implementation-plan.md (step-app-version-header)
- **Зависит от:** step-app-shell
- **Причина:** Нужна видимая версия приложения в UI (отдельно от SW scriptURL)

## Результат

В шапке справа от названия выводится версия приложения. Источник истины — `version` в `package.json`; проброс через Vite `define` (`__APP_VERSION__`) и `src/appVersion.ts` (`APP_VERSION`). UI: flex на header. TDD: unit в `App.test.tsx`. Verify: lint ✅, typecheck ✅, unit 145 ✅, build ✅.

## Ссылки

- **Архив:** —
- **Рефлексия:** [memory-bank/reflection/reflection-step-app-version-header.md](../../reflection/reflection-step-app-version-header.md)
- **Ветка:** `feat/step-app-version-header`
- **Коммит:** `d1a7c22`
