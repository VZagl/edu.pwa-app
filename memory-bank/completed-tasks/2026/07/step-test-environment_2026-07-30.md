# step-test-environment

- **Название:** Тестовое окружение Vitest
- **Дата создания:** 2026-07-24
- **Дата завершения:** 2026-07-30
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Enhancement / Testing

## Задание

Подключить Vitest + Testing Library + jsdom: зависимости, блок `test` в `vite.config.ts`, `vitest.setup.ts`, скрипт `test`, smoke unit-тест.
Цель: `pnpm test --run` проходит; можно писать unit/integration по TDD.

## Результат

Vitest 4.1.10 + jsdom + Testing Library; конфиг в `vite.config.ts` / `vitest.setup.ts`; типы `vitest/globals`; smoke `src/test-environment.test.ts` без `App`. Verify: `pnpm test --run` (2 passed), lint, build — OK. Guidelines без правок.

## Ссылки

- **Архив:** —
- **Рефлексия:** reflection/reflection-step-test-environment.md
- **Ветка:** feat/step-test-environment
- **Коммит:** 0b3baf5 (последний; BUILD: b1579fd)
