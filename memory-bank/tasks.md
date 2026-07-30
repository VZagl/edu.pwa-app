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

- Framework: Vitest `^4.1.10` (интеграция с Vite)
- Build Tool: Vite `^8.1.1` (уже в проекте)
- Language: TypeScript
- DOM: jsdom `^30.0.1`
- Testing helpers: `@testing-library/react` `^16.3.2`, `@testing-library/jest-dom` `^7.0.0`, `@testing-library/user-event` `^14.6.1`
- Package manager: pnpm

## Technology Validation Checkpoints

- [x] Стек выбран и задокументирован в `testing-guidelines-frontend.md`
- [x] Зависимости установлены через pnpm (`pnpm add -D …`)
- [x] Блок `test` в `vite.config.ts` валиден (`defineConfig` из `vitest/config`)
- [x] `vitest.setup.ts` подключает `@testing-library/jest-dom`
- [x] Hello world / smoke: `pnpm test --run` проходит
- [x] `pnpm lint` и `pnpm build` не ломаются

## Status

- [x] Initialization complete (`/van`)
- [x] Planning complete (`/plan`)
- [x] Technology validation complete (выполняется в `/build`)
- [x] Implementation complete
- [ ] Reflection (`/reflect`)
- [ ] CLOSE (`/close-task`)
- [x] GIT: работа в feature-ветке `feat/step-test-environment`

## Requirements

- Подключить Vitest + Testing Library + jsdom
- Блок `test` в `vite.config.ts`: `globals: true`, `environment: 'jsdom'`, `setupFiles`
- Файл `vitest.setup.ts`
- Скрипт `test` в `package.json` (`vitest`; CI: `pnpm test --run`)
- Smoke unit-тест **окружения** в `src/` (не тесты `App` / существующего UI)
- Цель: `pnpm test --run` проходит; можно писать unit/integration по TDD
- При расхождении — обновить `docs/project/testing-guidelines-frontend.md`

## Implementation Plan

1. **Red — smoke окружения**
   - Создать минимальный тест `src/test-environment.test.ts`
   - Проверка: раннер выполняет тест (например `expect(true).toBe(true)` и/или лёгкая DOM-проверка **без** импорта `App`)
2. **Green — зависимости**
   - `pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`
   - Версии — актуальные, совместимые с Vite 8
3. **Green — конфигурация**
   - `vite.config.ts`: `defineConfig` из `vitest/config`, плагин React, блок `test`
   - `vitest.setup.ts`: импорт `@testing-library/jest-dom/vitest`
   - `package.json`: `"test": "vitest"` (без дубля `test:watch`)
4. **Green — типы**
   - В `tsconfig.app.json` добавить `vitest/globals` в `compilerOptions.types` (рядом с `vite/client`)
5. **Verify**
   - `pnpm test --run`
   - `pnpm lint`
   - `pnpm build`
6. **Docs (условно)**
   - Обновить `docs/project/testing-guidelines-frontend.md` только при фактическом расхождении с конфигом

## Subtasks Checklist

- [x] Smoke-тест окружения в `src/` (без `App`) — `src/test-environment.test.ts`
- [x] Установить devDependencies
- [x] Настроить `vite.config.ts` (блок `test`)
- [x] Создать `vitest.setup.ts`
- [x] Добавить скрипт `test`
- [x] Добавить типы `vitest/globals` в `tsconfig.app.json`
- [x] `pnpm test --run` проходит
- [x] `pnpm lint` и `pnpm build` проходят
- [x] Docs синхронизированы (расхождений нет — обновление не требуется)

## Creative Phases Required

Нет (Level 2; решения по стеку уже зафиксированы в guidelines).

## Build Progress

- [x] Dependencies: vitest, jsdom, @testing-library/*
- [x] Config: `vite.config.ts`, `vitest.setup.ts`, scripts, types
- [x] Smoke: `src/test-environment.test.ts`
- [x] Verify: test / lint / build

### Test Results (2026-07-30)

| Команда           | Результат                                 |
| ----------------- | ----------------------------------------- |
| `pnpm test --run` | ✅ 1 file, 2 tests passed (Vitest 4.1.10) |
| `pnpm lint`       | ✅                                        |
| `pnpm build`      | ✅                                        |

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
| `package.json`                                | deps + скрипт `test`                 |
| `pnpm-lock.yaml`                              | lockfile после установки             |
| `vite.config.ts`                              | `vitest/config` + блок `test`        |
| `vitest.setup.ts`                             | создать                              |
| `src/test-environment.test.ts`                | smoke окружения                      |
| `tsconfig.app.json`                           | `vitest/globals`                     |
| `docs/project/testing-guidelines-frontend.md` | без изменений (совпадает с конфигом) |

## Последняя завершённая

BUILD complete (2026-07-30) → NEXT: `/reflect`
