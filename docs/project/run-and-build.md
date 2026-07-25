# Разработка

Приложение **edu.pwa-app** — клиентский SPA на React (Vite). Backend-сервера в репозитории нет; PWA работает в браузере пользователя.

## Установка зависимостей

```bash
pnpm install
```

> **Примечание:** проект использует `pnpm` как менеджер пакетов. Скрипт `preinstall` (`only-allow pnpm`) блокирует установку через npm/yarn.

## Запуск в режиме разработки

```bash
pnpm dev
```

Запускает Vite dev-сервер с HMR. По умолчанию: `http://localhost:5173`.

Для проверки PWA в dev после подключения Service Worker следовать настройкам `vite-plugin-pwa` (часто SW отключают или используют отдельный preview — см. [tech-stack-pwa.md](./tech-stack-pwa.md)).

## Сборка

```bash
pnpm build
```

Выполняет `tsc -b` и `vite build`. Результат — каталог `dist/` (статика для деплоя на HTTPS-хостинг).

## Превью production-сборки

```bash
pnpm preview
```

Локальный сервер для предпросмотра содержимого `dist/`. **Рекомендуется** для проверки PWA (manifest, SW, офлайн) после настройки соответствующих шагов.

## Линтинг

```bash
pnpm lint
```

Запускает ESLint по репозиторию.

## Тестирование

Разработка по **TDD**. После фазы 0 плана реализации:

```bash
pnpm test
pnpm test --run
pnpm test:e2e
```

Правила и политика покрытия — [testing-guidelines.md](./testing-guidelines.md), [testing-guidelines-frontend.md](./testing-guidelines-frontend.md).

До закрытия `step-test-environment` / `step-playwright-setup` скрипты могут ещё отсутствовать в `package.json`.

## Релиз

Подготовка версии — команда **`/release-prepare`** (см. `.cursor/commands/release-prepare.md`), когда в проекте появится версионирование и CHANGELOG.

Деплой — статика из `dist/` на любой HTTPS-хостинг (GitHub Pages, Netlify, Vercel и т.д.). Для PWA **обязателен HTTPS** в production.

## Полезные ссылки

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev: Learn PWA](https://web.dev/learn/pwa/)
