> **Правила для ИИ:** тесты React-фронтенда (Vitest, Playwright)

# Тестирование фронтенда (React)

## Область применения

Unit-, интеграционные и E2E-тесты React-приложения (Vite). После фазы 0 (`step-test-environment`, `step-playwright-setup`) Vitest и Playwright обязательны — сверять версии и скрипты с `package.json`.

**TDD:** обязательный цикл из [testing-guidelines.md](./testing-guidelines.md).

---

## Что тестировать

| Тип            | Что покрывать              | Примеры                                    |
| -------------- | -------------------------- | ------------------------------------------ |
| **Unit**       | Хуки, компоненты с логикой | `useOnlineStatus`, `InstallBanner`         |
| **Интеграция** | Экраны, навигация          | переключение учебных разделов              |
| **E2E**        | Критичные UX / PWA         | загрузка, оболочка, offline shell, install |

Presentational-компоненты без логики — по необходимости.

---

## Стек

- **Unit/integration:** Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom
- **E2E:** Playwright

Версии — только из `package.json` (после фазы 0).

## Конфигурация Vitest

`vite.config.ts`: блок `test` с `globals: true`, `environment: 'jsdom'`, `setupFiles: ['./vitest.setup.ts']` (или актуальные пути из репозитория).

## Конфигурация Playwright

`playwright.config.ts`: `webServer` на `pnpm preview` (предпочтительно для PWA) или `pnpm dev`; тесты в `e2e/*.spec.ts`.

## Статический анализ

- **`pnpm lint`** — ESLint
- **`pnpm build`** — `tsc -b` + Vite build

## Структура тестов

- Unit/integration: рядом с модулем — `ComponentName.test.tsx` / `hookName.test.ts`
- E2E: `e2e/*.spec.ts`

## Правила пользовательских событий (Testing Library)

Ввод и Enter раздельно: `await user.type(input, 'текст')`, затем `await user.keyboard('{Enter}')`.

## Работа с моками (Vitest)

`afterEach(() => vi.restoreAllMocks())`. `vi.clearAllMocks()` — в `beforeEach`.

## Service Worker в тестах

- Unit: мокать `navigator.serviceWorker` через `vi.stubGlobal` или skip тестов, требующих реального SW
- E2E: проверять SW против `pnpm preview`, не полагаться на HMR-dev без явной настройки

## E2E (Playwright)

- Селекторы: `getByRole`, при необходимости `data-testid`
- Язык в `describe` / `it`: русский
- PWA-сценарии (offline, install) — с оговорками по стабильности в CI; документировать skip/ручную часть в шаге плана

---

## Чеклист

- [ ] `pnpm lint` и `pnpm build` проходят
- [ ] `pnpm test --run` проходит
- [ ] `pnpm test:e2e` проходит (или зафиксировано исключение для шага)
- [ ] `within()` для ограничения области поиска (Testing Library)
- [ ] Семантические запросы (`getByRole`)
- [ ] Моки Vitest восстанавливаются в `afterEach`
