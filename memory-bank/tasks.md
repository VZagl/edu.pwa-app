# Task: Тестовое окружение Vitest

**Task ID:** `step-test-environment`  
**Уровень сложности:** Level 2 (Simple Enhancement)  
**Git Branch:** `feat/step-test-environment`  
**Источник:** `docs/project/implementation-plan.md` (Order: 0.1.1)  
**Создано в backlog:** 2026-07-24

## Description

Подключить Vitest + Testing Library + jsdom и подготовить проект к написанию unit/integration-тестов по TDD. Цель шага — **только окружение**, не покрытие существующего UI.

Smoke-тест проверяет работоспособность раннера (Vitest + jsdom + setup), **без** импорта/рендера `App` и без тестов имеющегося кода.

## Complexity

Level: 2  
Type: Enhancement

## Technology Stack

- Framework: Vitest (интеграция с Vite)
- Build Tool: Vite `^8.1.1` (уже в проекте)
- Language: TypeScript
- DOM: jsdom
- Testing helpers: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- Package manager: pnpm

## Technology Validation Checkpoints

- [x] Стек выбран и задокументирован в `testing-guidelines-frontend.md`
- [ ] Зависимости установлены через pnpm (`pnpm add -D …`)
- [ ] Блок `test` в `vite.config.ts` валиден (`defineConfig` из `vitest/config`)
- [ ] `vitest.setup.ts` подключает `@testing-library/jest-dom`
- [ ] Hello world / smoke: `pnpm test --run` проходит
- [ ] `pnpm lint` и `pnpm build` не ломаются

## Status

- [x] Initialization complete (`/van`)
- [x] Planning complete (`/plan`)
- [ ] Technology validation complete (выполняется в `/build`)
- [ ] Implementation complete
- [ ] Reflection (`/reflect`)
- [ ] CLOSE (`/close-task`)
- [ ] GIT: работа в feature-ветке `feat/step-test-environment`

## Requirements

- Подключить Vitest + Testing Library + jsdom
- Блок `test` в `vite.config.ts`: `globals: true`, `environment: 'jsdom'`, `setupFiles`
- Файл `vitest.setup.ts`
- Скрипты `test` / `test:watch` в `package.json`
- Smoke unit-тест **окружения** в `src/` (не тесты `App` / существующего UI)
- Цель: `pnpm test --run` проходит; можно писать unit/integration по TDD
- При расхождении — обновить `docs/project/testing-guidelines-frontend.md`

## Implementation Plan

1. **Red — smoke окружения**
   - Создать минимальный тест, например `src/smoke.test.ts` (или `src/test-environment.test.ts`)
   - Проверка: раннер выполняет тест (например `expect(true).toBe(true)` и/или лёгкая DOM-проверка **без** импорта `App`)
2. **Green — зависимости**
   - `pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`
   - Версии — актуальные, совместимые с Vite 8
3. **Green — конфигурация**
   - `vite.config.ts`: `defineConfig` из `vitest/config`, плагин React, блок `test`
   - `vitest.setup.ts`: импорт `@testing-library/jest-dom/vitest` (или актуальный путь из docs пакета)
   - `package.json`: `"test": "vitest"`, `"test:watch": "vitest"` (или `vitest --watch` — сверить с принятой практикой Vitest)
4. **Green — типы**
   - В `tsconfig.app.json` добавить `vitest/globals` в `compilerOptions.types` (рядом с `vite/client`)
5. **Verify**
   - `pnpm test --run`
   - `pnpm lint`
   - `pnpm build`
6. **Docs (условно)**
   - Обновить `docs/project/testing-guidelines-frontend.md` только при фактическом расхождении с конфигом

## Subtasks Checklist

- [ ] Smoke-тест окружения в `src/` (без `App`)
- [ ] Установить devDependencies
- [ ] Настроить `vite.config.ts` (блок `test`)
- [ ] Создать `vitest.setup.ts`
- [ ] Добавить скрипты `test` / `test:watch`
- [ ] Добавить типы `vitest/globals` в `tsconfig.app.json`
- [ ] `pnpm test --run` проходит
- [ ] `pnpm lint` и `pnpm build` проходят
- [ ] Docs синхронизированы (если нужно)

## Creative Phases Required

Нет (Level 2; решения по стеку уже зафиксированы в guidelines).

→ **NEXT MODE:** `/build`

## Dependencies

- Существующий Vite + React + TS проект
- Документация: `docs/project/testing-guidelines-frontend.md`, `docs/project/implementation-plan.md`
- Не зависит от Playwright (`step-playwright-setup` — следующий шаг)

## Challenges & Mitigations

- **Совместимость Vitest ↔ Vite 8:** ставить актуальные версии через pnpm; при ошибках — сверить peerDependencies
- **`globals: true` без типов:** добавить `vitest/globals` в `tsconfig.app.json`
- **Smoke не должен цепляться к UI шаблона:** не импортировать `App`, не проверять тексты лендинга Vite
- **Типы `test` в vite.config:** использовать `defineConfig` из `vitest/config`

## Компоненты / файлы

| Файл                                          | Действие                             |
| --------------------------------------------- | ------------------------------------ |
| `package.json`                                | deps + скрипты `test` / `test:watch` |
| `vite.config.ts`                              | `vitest/config` + блок `test`        |
| `vitest.setup.ts`                             | создать                              |
| `src/smoke.test.ts` (или аналог)              | smoke окружения                      |
| `tsconfig.app.json`                           | `vitest/globals`                     |
| `docs/project/testing-guidelines-frontend.md` | только при расхождении               |

## Последняя завершённая

(нет)
