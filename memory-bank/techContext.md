# Memory Bank: Tech Context

## Менеджер пакетов

- **pnpm** (обязателен; `preinstall`: `only-allow pnpm`)
- Ориентир версии: поле `packageManager` в `package.json`

## Текущий стек (из package.json)

| Область       | Технология                                |
| ------------- | ----------------------------------------- |
| UI            | React 19, React DOM 19                    |
| Язык          | TypeScript ~6                             |
| Сборка / dev  | Vite 8, `@vitejs/plugin-react`            |
| Стили         | только SCSS (`sass-embedded`)             |
| Линт / формат | ESLint 10, Prettier 3, Husky, lint-staged |

## Скрипты

| Команда           | Назначение                                 |
| ----------------- | ------------------------------------------ |
| `pnpm install`    | зависимости                                |
| `pnpm dev`        | Vite HMR (`http://localhost:5173`)         |
| `pnpm build`      | `tsc -b` + `vite build` → `dist/`          |
| `pnpm preview`    | превью production-сборки (удобно для PWA)  |
| `pnpm lint`       | ESLint                                     |
| `pnpm test`       | Vitest (после `step-test-environment`)     |
| `pnpm test --run` | Vitest без watch (BUILD/CI)                |
| `pnpm test:e2e`   | Playwright (после `step-playwright-setup`) |

## Тесты

- **TDD обязателен.** До закрытия фазы 0 продуктовые шаги не начинать.
- Целевой стек: Vitest + Testing Library (unit/integration), Playwright (E2E).
- Сейчас в `package.json` раннеры могут ещё отсутствовать — шаги `step-test-environment`, `step-playwright-setup`.
- Правила: `docs/project/testing-guidelines.md`, `testing-guidelines-frontend.md`.

## PWA (целевой стек, по плану)

| Область        | Технология                                                          |
| -------------- | ------------------------------------------------------------------- |
| Manifest       | `public/manifest.webmanifest` или генерация через `vite-plugin-pwa` |
| Service Worker | ручной SW на учебных шагах → Workbox через `vite-plugin-pwa`        |
| Иконки         | `public/icons/` (минимум 192×192 и 512×512)                         |
| Проверка       | DevTools → Application; Lighthouse PWA                              |

**Ограничения:** HTTPS обязателен в production; не добавлять PWA-зависимости вне шага `implementation-plan.md`; версии — только из `package.json`.

## Документация стека

- `docs/project/tech-stack.md`
- `docs/project/tech-stack-frontend.md`
- `docs/project/tech-stack-pwa.md`
- `docs/project/run-and-build.md`
- `docs/project/testing-guidelines.md`
