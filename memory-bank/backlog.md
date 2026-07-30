# Memory Bank: Backlog

## Высокий

- [ ] Тестовое окружение Vitest (step-test-environment)
  - **Создано:** 2026-07-24
  - Подключить Vitest + Testing Library + jsdom: зависимости, блок `test` в `vite.config.ts`, `vitest.setup.ts`, скрипт `test`, smoke unit-тест.
  - **Цель:** `pnpm test --run` проходит; можно писать unit/integration по TDD
  - **Файлы:** `package.json`, `vite.config.ts`, `vitest.setup.ts`, smoke-тест в `src/`
  - **Тесты:** smoke unit (окружение)
  - **Источник:** docs/project/implementation-plan.md (step-test-environment, Order: 0.1.1)
  - **Связано с:** —
  - **Причина:** блокер для всех продуктовых шагов; первый шаг фазы 0

## Средний

- [ ] Playwright E2E-окружение (step-playwright-setup)
  - **Создано:** 2026-07-24
  - Подключить Playwright: конфиг, `e2e/`, скрипт `test:e2e`, smoke E2E (открытие приложения).
  - **Цель:** `pnpm test:e2e` проходит; можно писать E2E по TDD
  - **Файлы:** `package.json`, `playwright.config.ts`, `e2e/`
  - **Тесты:** smoke E2E
  - **Источник:** docs/project/implementation-plan.md (step-playwright-setup, Order: 0.1.2)
  - **Связано с:** step-test-environment
  - **Причина:** второй шаг фазы 0; блокирован до Vitest

- [ ] Базовая оболочка приложения (step-app-shell)
  - **Создано:** 2026-07-24
  - Базовая разметка: header, main, простая навигация. Заменить стартовый шаблон Vite на оболочку учебного PWA (название проекта, место под контент уроков). Стили — только SCSS.
  - **Цель:** приложение имеет узнаваемую оболочку; контент уроков рендерится в main
  - **Файлы:** `src/App.tsx`, `src/App.scss`, `src/index.scss`, `src/App.test.tsx`, при необходимости `e2e/`
  - **Тесты:** unit/integration — оболочка; E2E — загрузка с оболочкой (TDD)
  - **Источник:** docs/project/implementation-plan.md (step-app-shell, Order: 1.1.1)
  - **Связано с:** step-test-environment, step-playwright-setup
  - **Причина:** первый продуктовый шаг фазы 1; блокирован до фазы 0

## Низкий

(Нет активных задач)

## Идеи

(Нет активных задач)

---

**Примечание**: Этот файл — планировщик задач. Содержит только активные задачи и идеи. История завершённых задач хранится в `memory-bank/completed-tasks/`.

**Как использовать:**

1. Добавляйте новые идеи в соответствующий раздел по приоритету
2. Перемещайте задачи между приоритетами по мере необходимости
3. После завершения задачи — финализировать командой `/close-task` (задача удаляется из backlog, запись создаётся в `completed-tasks/`)
4. Используйте ссылки на task ID для связи с конкретными задачами
5. В **Высокий** — только задачи без незакрытых зависимостей; зависимые шаги — в **Средний**/ниже до разблокировки
