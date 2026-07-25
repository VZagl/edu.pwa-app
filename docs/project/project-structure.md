# Структура проекта

## Корень

- `package.json`, `pnpm-lock.yaml` — зависимости и скрипты
- `.prettierrc.cjs`, `.prettierignore` — форматирование
- `eslint.config.js` — ESLint
- `vite.config.ts` — Vite
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — TypeScript
- `.gitignore`, `.cursorignore` — исключения
- `.husky/` — Git hooks (pre-commit)
- `.vscode/` — настройки редактора
- `.cursor/` — правила и команды для Cursor/агентов (`commands/`, `rules/`)
- `docs/` — документация
- `src/` — исходный код React-приложения
- `e2e/` — E2E-тесты Playwright (после `step-playwright-setup`)
- `public/` — статические файлы (favicon, иконки; позже — manifest, SW)
- `index.html` — точка входа HTML
- `README.md`

## Документация `docs/`

- `docs/common/` — общие правила (dev-environment, git-commit-description, memory-bank-usage, agent-*)
- `docs/project/` — материалы проекта:
  - [project-structure.md](project-structure.md) — эта страница
  - [run-and-build.md](run-and-build.md) — запуск и сборка
  - [tech-stack.md](tech-stack.md), [tech-stack-frontend.md](tech-stack-frontend.md), [tech-stack-pwa.md](tech-stack-pwa.md)
  - [testing-guidelines.md](testing-guidelines.md), [testing-guidelines-frontend.md](testing-guidelines-frontend.md)
  - [product-roadmap.md](product-roadmap.md), [implementation-plan.md](implementation-plan.md)
  - [config-schema.md](config-schema.md) — manifest и PWA-метаданные
  - [ui-conventions.md](ui-conventions.md) — UI-конвенции
  - [date-time-contract.md](date-time-contract.md) — дата и время в коде

## Исходный код `src/`

Клиентское React-приложение (Vite SPA, целевой PWA):

- `main.tsx` — точка входа React
- `App.tsx` — корневой компонент
- `App.scss`, `index.scss` — стили (только SCSS)
- `*.test.tsx` / `*.test.ts` — unit/integration рядом с модулями (Vitest)
- `assets/` — изображения и прочие ресурсы, импортируемые из кода

**Планируемая эволюция структуры** (по мере учебных шагов):

- `src/components/` — переиспользуемые компоненты
- `src/pages/` или `src/screens/` — экраны/разделы учебного приложения
- `src/hooks/` — кастомные хуки (в т.ч. PWA: online/offline, install prompt)
- `src/pwa/` — регистрация SW, утилиты обновления (после соответствующих шагов)
- `e2e/` — сценарии Playwright
- `vitest.setup.ts`, `playwright.config.ts` — после фазы 0

## Каталог `public/`

Файлы отдаются как есть по корневому URL:

- `favicon.svg`, `icons.svg` — текущие статические ресурсы
- (план) `manifest.webmanifest` — Web App Manifest
- (план) `icons/` — иконки PWA разных размеров
- (план) service worker — генерируется сборкой или лежит в `public/` на учебном этапе

## Структура модулей фронтенда

При создании компонентов, экранов, хуков: каждый логический блок — отдельная папка. Внутри папки — файлы с согласованным именем:

```
components/
└── InstallBanner/
    ├── InstallBanner.tsx
    ├── InstallBanner.scss
    └── InstallBanner.test.tsx

hooks/
└── useOnlineStatus/
    ├── useOnlineStatus.ts
    └── useOnlineStatus.test.ts
```

**Импорты:** при настройке alias `@/` — использовать его для модулей из `src/`. Barrel (`index.ts`) — по необходимости для внешних потребителей.

## Конфигурация

- `vite.config.ts` — Vite (позже — `vite-plugin-pwa`)
- `eslint.config.js` — ESLint
- `tsconfig.app.json` — TypeScript для приложения (`src/`)
