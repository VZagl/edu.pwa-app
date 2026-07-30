# Memory Bank: Задачи

## Текущая задача

**Название:** Тестовое окружение Vitest  
**Task ID:** `step-test-environment`  
**Уровень сложности:** Level 2 (Simple Enhancement)  
**Git Branch:** `feat/step-test-environment`  
**Источник:** `docs/project/implementation-plan.md` (Order: 0.1.1)  
**Создано в backlog:** 2026-07-24

## Статус

- [x] Определение задачи (`/van`)
- [ ] План реализации (`/plan`)
- [ ] Выполнение (`/build`)
- [ ] Рефлексия (`/reflect`)
- [ ] GIT: Работа в feature-ветке `feat/step-test-environment`
- [ ] CLOSE: Финализировать задачу командой `/close-task`

## Требования

- Подключить Vitest + Testing Library + jsdom
- Блок `test` в `vite.config.ts` (`globals: true`, `environment: 'jsdom'`, `setupFiles`)
- Файл `vitest.setup.ts`
- Скрипты `test` / `test:watch` в `package.json`
- Smoke unit-тест в `src/`
- Цель: `pnpm test --run` проходит; можно писать unit/integration по TDD
- При расхождении — обновить `docs/project/testing-guidelines-frontend.md`

## Компоненты / файлы

- `package.json`
- `vite.config.ts`
- `vitest.setup.ts`
- smoke-тест в `src/`
- при необходимости: `docs/project/testing-guidelines-frontend.md`

## Последняя завершённая

(нет)
