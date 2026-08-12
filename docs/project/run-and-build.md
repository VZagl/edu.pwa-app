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

В `vite.config.ts` задан **`base: '/edu.pwa-app/'`** (project site на GitHub Pages). Ассеты, manifest и роутер резолвятся относительно этого пути. В коде приложения использовать `import.meta.env.BASE_URL`, а не хардкод имени репозитория.

## Превью production-сборки

```bash
pnpm build
pnpm preview
```

Локальный сервер для предпросмотра содержимого `dist/`. Из‑за `base` приложение открывается по nested path:

**`http://localhost:4173/edu.pwa-app/`**

(корень `http://localhost:4173/` без subdirectory — не точка входа SPA).

**Рекомендуется** для проверки PWA (manifest, SW, офлайн) после настройки соответствующих шагов. Пошаговый чеклист: [pwa-checklist.md](./pwa-checklist.md).

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
pnpm test:e2e:install   # первый запуск / CI — установка Chromium
pnpm test:e2e
```

E2E поднимает production-preview через `webServer` в `playwright.config.ts` (`pnpm build && pnpm preview`). `baseURL` указывает на `http://localhost:4173/edu.pwa-app/`.

Правила и политика покрытия — [testing-guidelines.md](./testing-guidelines.md), [testing-guidelines-frontend.md](./testing-guidelines-frontend.md).

## Релиз

Подготовка версии — команда **`/release-prepare`** (см. `.cursor/commands/release-prepare.md`), когда в проекте появится версионирование и CHANGELOG.

## Деплой на GitHub Pages

URL (project site): **`https://vzagl.github.io/edu.pwa-app/`**  
Пока один URL Pages: и стенд (`build`), и релиз (`main`) публикуют туда же (последний успешный деплой перекрывает предыдущий).

Workflow: [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) — `pnpm build` → publish `dist/` через GitHub Actions.

| Параметр          | Значение                                                           |
| ----------------- | ------------------------------------------------------------------ |
| Trigger           | push в **`build`** или **`main`** + ручной **`workflow_dispatch`** |
| Пакетный менеджер | **pnpm** (`pnpm/action-setup`; не npm — `preinstall` / only-allow) |
| Artifact          | `./dist`                                                           |

**Как выложить:**

- **Стенд (проверка):** feature → `develop`; когда нужна пересборка — merge `develop` → `build` и push (или Actions → Run workflow, ветка `build`). Merge в `develop` деплой не запускает.
- **Релиз:** push / merge в `main` — тоже деплой на тот же Pages URL.

### Первый запуск (владелец репозитория)

1. Открыть **Pages в настройках репозитория** (не аккаунта):
   - UI: репозиторий → **Settings** → слева **Pages**
   - Прямая ссылка: https://github.com/VZagl/edu.pwa-app/settings/pages
   - **Build and deployment → Source:** GitHub Actions
   - Не путать с `https://github.com/settings/pages` — это настройки **аккаунта** (Verified domains), источник деплоя там не выбирается.
2. Убедиться, что ветка `build` существует на remote; при необходимости: merge актуального `develop` в `build` и `git push origin build` **или** Actions → **Deploy static content to Pages** → Run workflow (ветка `build`).
3. Дождаться зелёного workflow; открыть `https://vzagl.github.io/edu.pwa-app/`.

Для PWA в production **обязателен HTTPS** — Pages его обеспечивает. Ручная проверка на стенде: [pwa-checklist.md](./pwa-checklist.md) → секция «Проверка на GitHub Pages».

**Ограничение кэша `sw.js`:** GitHub Pages не даёт настроить `Cache-Control` для service worker. CDN может отдавать старый `/edu.pwa-app/sw.js` после деплоя. Клиент смягчает это проактивным `registration.update()` и `fetch(..., { cache: 'no-store' })` (`swUpdateController`), но задержка обнаружения обновления на mobile всё же возможна. Подробнее: [pwa-checklist.md](./pwa-checklist.md) → «Обновление приложения».

## Полезные ссылки

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev: Learn PWA](https://web.dev/learn/pwa/)
- [Vite: Deploying a Static Site — GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
