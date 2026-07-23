> **Правила для ИИ:** тесты React-фронтенда (Vitest, Playwright)

# Тестирование фронтенда (React)

## Область применения

Unit- и интеграционные тесты React-приложения (Vite). **Vitest пока может быть не установлен** — сверять с `package.json`.

**TDD:** цикл из [testing-guidelines.md](./testing-guidelines.md).

---

## Что тестировать

| Тип            | Что покрывать              | Примеры                                    |
| -------------- | -------------------------- | ------------------------------------------ |
| **Unit**       | Хуки, компоненты с логикой | `useOnlineStatus`, `InstallBanner`         |
| **Интеграция** | Экраны, навигация          | переключение учебных разделов              |
| **E2E**        | Критичные PWA-сценарии     | загрузка, offline shell (после Playwright) |

Presentational-компоненты без логики — по необходимости.

---

## Стек (целевой)

Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom. Версии — `package.json` после `step-vitest-setup`.

## Конфигурация (целевая)

`vite.config.ts`: блок `test` с `globals: true`, `environment: 'jsdom'`, `setupFiles: ['./vitest.setup.ts']`.

## Статический анализ

- **`pnpm lint`** — ESLint
- **`pnpm build`** — `tsc -b` + Vite build

## Структура тестов

Файл теста — рядом с модулем: `ComponentName.test.tsx` рядом с `ComponentName.tsx`. E2E — в `e2e/*.spec.ts` (когда появится Playwright).

## Правила пользовательских событий

Ввод и Enter раздельно: `await user.type(input, 'текст')`, затем `await user.keyboard('{Enter}')`.

## Работа с моками

`afterEach(() => vi.restoreAllMocks())`. `vi.clearAllMocks()` — в `beforeEach`.

## Service Worker в тестах

Мокать `navigator.serviceWorker` через `vi.stubGlobal` или skip тестов, требующих реального SW; E2E — проверять SW в `pnpm preview`.

## E2E (Playwright, опционально)

- Dev-сервер: `pnpm dev` или `pnpm preview` для PWA
- Селекторы: `getByRole`, `data-testid`
- Язык в `describe`/`it`: русский

---

## Чеклист

- [ ] `pnpm lint` и `pnpm build` проходят
- [ ] При наличии Vitest: `pnpm test --run`
- [ ] `within()` для ограничения области поиска
- [ ] Семантические запросы (`getByRole`)
- [ ] Моки восстанавливаются в `afterEach`
