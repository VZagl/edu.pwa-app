# edu.pwa-app: учебное PWA-приложение

Клиентское веб-приложение на **React + Vite + TypeScript**, которое поэтапно превращается в **Progressive Web App (PWA)**. Цель — на практике изучить manifest, service worker, офлайн-кэш, установку на устройство и смежные возможности платформы. Backend в репозитории нет: всё работает в браузере.

## Стек

- **Frontend:** React 19, TypeScript, Vite
- **Стили:** SCSS (`sass-embedded`)
- **PWA:** `vite-plugin-pwa`, Workbox, `workbox-window`
- **Менеджер пакетов:** pnpm (только; `preinstall` блокирует npm/yarn)

## Рекомендуемый старт (проверка PWA)

Главный путь ученика — **production-сборка и preview**, не `dev`:

```bash
pnpm install
pnpm build
pnpm preview
```

Открыть в Chrome: **`http://localhost:4173/edu.pwa-app/`**  
(корень `http://localhost:4173/` без `/edu.pwa-app/` — не точка входа SPA).

Почему не только `dev`: в dev Service Worker по умолчанию **выключен** (`vite-plugin-pwa` без `devOptions.enabled`). Manifest, SW, Cache Storage, offline и install корректно проверяются на **preview** после `build`.

## Режим разработки UI

Только вёрстка, тексты уроков и HMR:

```bash
pnpm dev
```

Адрес: `http://localhost:5173`. Для полноценной проверки PWA используйте раздел выше (`build` + `preview`).

## Экраны-уроки

Порядок как в навигации (`src/routes/lessonRoutes.ts`):

| #   | Экран          | Зачем смотреть                                 |
| --- | -------------- | ---------------------------------------------- |
| 1   | Главная (`/`)  | Карта лаборатории и чеклист PWA                |
| 2   | Manifest       | Web App Manifest: имя, иконки, `display`, тема |
| 3   | Service Worker | Регистрация SW, жизненный цикл, обновления     |
| 4   | Offline        | Офлайн-fallback и поведение без сети           |
| 5   | Install        | Установка на устройство / beforeinstallprompt  |
| 6   | Cache Storage  | Кэши Workbox / Cache API в браузере            |
| 7   | Storage        | Квота хранилища и Persistent Storage           |
| 8   | Push           | Web Push и уведомления (учебный обзор)         |

## Проверка в DevTools (на preview)

В Chrome на `http://localhost:4173/edu.pwa-app/`:

1. **Application → Manifest** — поля, иконки, ошибки парсинга
2. **Application → Service Workers** — статус, scope, обновления
3. **Application → Cache Storage** — имена кэшей и URL precache
4. **Network → Offline** (чекбокс) — офлайн-fallback и кэш

## Сборка и preview (углубление)

- `pnpm build` — `tsc -b` + `vite build` → каталог `dist/`
- В `vite.config.ts`: **`base: '/edu.pwa-app/'`** (GitHub Pages project site)
- `pnpm preview` — локальный сервер `dist/` с тем же base path

Подробнее: [docs/project/run-and-build.md](docs/project/run-and-build.md)

## Чеклист PWA

Пошаговая ручная проверка (Lighthouse PWA, install, offline):  
[docs/project/pwa-checklist.md](docs/project/pwa-checklist.md)

## Документация

- [Структура проекта](docs/project/project-structure.md)
- [Технологии](docs/project/tech-stack.md)
- [PWA и Service Worker](docs/project/tech-stack-pwa.md)
- [Чеклист проверки PWA](docs/project/pwa-checklist.md)
- [Запуск и сборка](docs/project/run-and-build.md)
- [Дорожная карта](docs/project/product-roadmap.md)
- [План реализации](docs/project/implementation-plan.md)

## IDE

Рекомендуется: [VS Code](https://code.visualstudio.com/) + расширения из [.vscode/extensions.json](.vscode/extensions.json)
