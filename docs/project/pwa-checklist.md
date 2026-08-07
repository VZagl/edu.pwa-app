# Чеклист проверки PWA

## Назначение

Документ описывает **воспроизводимую ручную проверку**, что учебное PWA MVP выполнено: manifest, Service Worker, офлайн-fallback, установка на устройство.

**Для кого:** разработчик проекта, ревьюер, ИИ-помощник при закрытии шага `step-lighthouse-pwa-checklist`.

**Когда применять:** после завершения фазы 5 плана ([implementation-plan.md](./implementation-plan.md)) — manifest, SW, offline, install prompt — **перед** `/close-task` для соответствующей задачи.

---

## Предусловия

| Условие | Детали                                                                                                                                                          |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Сборка  | `pnpm build` — без ошибок                                                                                                                                       |
| Preview | `pnpm preview` — по умолчанию `http://localhost:4173`                                                                                                           |
| Браузер | **Chrome** (рекомендуется для Lighthouse PWA audit и Application panel). Минимум: актуальный stable Chrome; при расхождениях фиксировать версию и дату проверки |
| HTTPS   | Для `localhost` исключение — PWA audit на preview допустим без HTTPS                                                                                            |

```bash
pnpm build
pnpm preview
```

Открыть в Chrome: `http://localhost:4173`

---

## Lighthouse PWA audit

### Запуск

1. Chrome DevTools → вкладка **Lighthouse**
2. **Mode:** Navigation
3. **Categories:** PWA (Performance — опционально)
4. **Device:** Mobile или Desktop (для MVP достаточно одного; mobile ближе к целевому сценарию)
5. URL: `http://localhost:4173`
6. **Analyze page load**

### Ожидаемый результат

- Категория **PWA** — проход (зелёные проверки installability, Service Worker, manifest, offline)
- Критические audit'ы PWA не должны быть красными

### Ключевые проверки Lighthouse PWA

| Проверка (типичное название)              | Что смотреть                                                                     |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| **Installable** / **Web app manifest**    | Manifest валиден, `name`, `short_name`, `start_url`, `display`, иконки 192 и 512 |
| **Service worker**                        | SW зарегистрирован, отвечает на запросы                                          |
| **Works offline**                         | При offline загружается закэшированный контент или fallback                      |
| **Configured for a custom splash screen** | `background_color`, `theme_color`, иконки в manifest                             |
| **Redirects HTTP to HTTPS**               | На `localhost` может быть N/A — нормально для preview                            |
| **Uses HTTPS**                            | На `localhost` — исключение                                                      |

Конфигурация manifest и SW в проекте: [config-schema.md](./config-schema.md), [tech-stack-pwa.md](./tech-stack-pwa.md).

---

## Application panel (Chrome DevTools)

Открыть DevTools → **Application**.

### Manifest

| Поле        | Ожидаемое значение (текущий MVP)            |
| ----------- | ------------------------------------------- |
| Name        | `edu.pwa-app — учебное PWA`                 |
| Short name  | `PWA Lab`                                   |
| Start URL   | `/`                                         |
| Display     | `standalone`                                |
| Theme color | `#646cff`                                   |
| Icons       | `icon-192.png`, `icon-512.png` из `/icons/` |

Ссылка на manifest в HTML: `/manifest.webmanifest` (генерируется `vite-plugin-pwa` при сборке).

### Service Workers

| Проверка | Ожидаемое                             |
| -------- | ------------------------------------- |
| Статус   | **activated** (после первой загрузки) |
| Source   | `/sw.js`                              |
| Scope    | origin + `/`                          |

Если статус **waiting** — обновить страницу или проверить баннер «Доступно обновление» (`SwUpdateBanner` в `src/components/SwUpdateBanner/`).

### Cache Storage

- Precache Workbox: записи с префиксом workbox-precache (или аналог от `vite-plugin-pwa`)
- Runtime: `runtime-json`, `runtime-images` (если ресурсы уже запрашивались)

### Offline

1. Application → **Service Workers** → **Offline** (или Network → Offline)
2. Обновить страницу или перейти по навигации SPA
3. Ожидание: приложение загружается из кэша; индикатор **offline** в UI; навигация по урокам работает для precache-контента
4. E2E-покрытие: `e2e/offline-fallback.spec.ts`, `e2e/offline-lesson.spec.ts`

---

## Установка на устройство

### Android (Chrome)

1. Открыть `http://localhost:4173` на устройстве **или** эмулировать installable в Chrome desktop (Application → Manifest → «Add to home screen» / симуляция)
2. В UI: баннер **«Установить»** (`InstallBanner`) при срабатывании `beforeinstallprompt`
3. Альтернатива: меню Chrome → «Установить приложение» / «Добавить на главный экран»
4. После установки: запуск в **standalone** (`display-mode: standalone` — без адресной строки браузера)

### iOS (Safari)

`beforeinstallprompt` не поддерживается. В UI показывается fallback из `InstallBanner`:

- **Поделиться** → **На экран «Домой»**

Проверка только **вручную** на устройстве или симуляторе iOS; в CI не автоматизируется.

### Standalone-режим

После установки открыть приложение с иконки на домашнем экране. В DevTools (remote debugging) или визуально: нет UI браузера, отображается как отдельное приложение.

### Тест на Android с десктопа (`pnpm preview`)

| Способ                                | Команда / URL                                                        | PWA (SW, install)                          |
| ------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------ |
| **USB + adb reverse** (рекомендуется) | `adb reverse tcp:4173 tcp:4173`, на телефоне `http://localhost:4173` | ✅ secure context                          |
| Wi‑Fi по IP                           | `pnpm preview --host`, на телефоне `http://<IP-десктопа>:4173`       | ❌ обычный HTTP — SW и install не работают |
| HTTPS (деплой / туннель)              | Netlify, ngrok и т.п.                                                | ✅                                         |

---

## Удаление приложения и полная очистка данных

Нужно при повторной проверке установки, после смены SW/manifest или если «застряла» старая версия.

**Что хранит PWA в браузере** (даже если приложение не пишет в `localStorage`):

| Тип данных                                | Где в DevTools (Chrome/Edge)                     |
| ----------------------------------------- | ------------------------------------------------ |
| Service Worker                            | Application → Service Workers                    |
| Cache Storage (Workbox precache, runtime) | Application → Cache Storage                      |
| Local / Session storage, IndexedDB        | Application → соответствующие секции             |
| Cookies                                   | Application → Cookies                            |
| Состояние «установлено»                   | Внутреннее состояние браузера + иконка на экране |

**Полная очистка** = удалить иконку приложения **и** сбросить данные origin (`http://localhost:4173` или ваш production URL).

### Google Chrome

**Десктоп**

1. Удалить установленное PWA: `chrome://apps` → правый клик → **Удалить из Chrome** (или Меню → **Установленные приложения**).
2. Очистить данные сайта: DevTools → **Application** → **Storage** → **Clear site data** (все галочки).
   Альтернатива: `chrome://settings/content/all` → найти `localhost:4173` → **Удалить данные**.
3. Проверка: Application → Service Workers и Cache Storage пусты; при новом открытии сайта — как первый визит.

**Android**

1. Долгое нажатие на иконку → **Удалить** / **Uninstall**.
2. Chrome → **Настройки** → **Настройки сайтов** → **Все сайты** → `localhost` (или origin) → **Очистить и сбросить**.
   Или: **Настройки** → **Приложения** → web app → **Хранилище** → **Очистить данные**.

### Microsoft Edge

**Десктоп**

1. Удалить PWA: `edge://apps` → правый клик → **Удалить** (или Меню → **Приложения** → **Управление приложениями**).
2. Очистить данные: DevTools → **Application** → **Clear site data** (как в Chrome).
   Альтернатива: `edge://settings/content/all` → origin → **Удалить данные**.

**Android**

1. Удалить иконку с домашнего экрана.
2. Edge → **Настройки** → **Параметры сайтов** → **Все сайты** → origin → **Очистить и сбросить**.

Edge на Chromium — шаги совпадают с Chrome; отличаются только URL настроек (`edge://` вместо `chrome://`).

### Mozilla Firefox

**Десктоп**

1. Удалить установленное сайт-приложение: **Меню (≡)** → **Установленные сайты** → **Удалить** (или иконка в панели задач / Dock → удалить).
2. Очистить данные origin: **Настройки** → **Приватность и защита** → **Куки и данные сайтов** → **Управление данными** → найти `localhost` → **Удалить выбранные**.
3. Service Worker: `about:debugging#/runtime/this-firefox` → **Service Workers** → **Unregister** для origin (если остался после шага 2).

**Android**

1. Удалить иконку с домашнего экрана (если добавляли).
2. Firefox → **Настройки** → **Удалить данные браузера** → отметить **Куки и данные сайтов** и **Кэшированные файлы** (при необходимости — только для конкретного сайта через **Управление данными сайтов** в настройках приватности).

Firefox не поддерживает `beforeinstallprompt` так же, как Chromium; установка — через меню браузера. После очистки данных prompt/иконка установки могут появиться снова.

### Safari

**macOS**

1. Удалить web app: если добавляли через **Файл** → **Добавить в Dock** — правый клик на иконке в Dock → **Удалить из Dock**; или **Системные настройки** → приложение в списке (зависит от версии macOS).
2. Очистить данные сайта: **Safari** → **Настройки** → **Дополнения** → **Данные веб-сайтов** (или **Конфиденциальность** → **Управлять данными веб-сайтов**) → найти origin → **Удалить**.
3. Дополнительно: **Разработка** → **Очистить кэши** (если включено меню «Разработка»).

**iOS (iPhone / iPad)**

1. Долгое нажатие на иконку на домашнем экране → **Удалить приложение** → **Удалить с экрана «Домой»** (данные Safari для origin могут остаться).
2. **Настройки** → **Приложения** → **Safari** → **Данные веб-сайтов** → найти origin → **Удалить**.
   Альтернатива: **Настройки** → **Safari** → **Дополнения** → **Данные веб-сайтов** → удалить origin.

На iOS нет кнопки «Установить» в UI приложения — только fallback-текст; после очистки снова появится подсказка «Поделиться → На экран Домой».

### Samsung Internet (Android)

1. Удалить иконку с домашнего экрана.
2. Samsung Internet → **Настройки** → **Полезные функции** → **Установленные приложения** → удалить сайт (если есть).
3. **Настройки** → **Личные данные** → **Управление данными веб-сайтов** → origin → **Удалить**.

Chromium-ветка: очистка данных сайта аналогична Chrome.

### Opera (десктоп и Android)

1. Удалить PWA: `opera://apps` (десктоп) или иконка с домашнего экрана (Android).
2. Очистить данные origin: DevTools → **Clear site data** или **Настройки** → **Конфиденциальность** → **Очистить данные браузера** / управление данными сайтов.

---

## Регрессия автотестами

Перед закрытием задачи прогнать:

```bash
pnpm lint
pnpm build
pnpm test --run
pnpm test:e2e
```

| Команда           | Что проверяет                                                               |
| ----------------- | --------------------------------------------------------------------------- |
| `pnpm lint`       | ESLint                                                                      |
| `pnpm build`      | TypeScript + production bundle + генерация SW/manifest                      |
| `pnpm test --run` | Unit/integration (Vitest)                                                   |
| `pnpm test:e2e`   | Playwright на preview (`localhost:4173`): manifest, SW, offline, install UI |

Полный verify одной командой: `pnpm verify` (lint + typecheck + unit + build + e2e).

**Разделение:** Lighthouse, Application panel и установка на реальное устройство — **ручные**; автотесты покрывают регрессию кода и базовые PWA-сценарии в Chromium.

---

## Troubleshooting

| Симптом                               | Возможная причина                          | Действие                                                                                                         |
| ------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Lighthouse PWA «Uses HTTPS» failed    | Проверка на non-localhost без HTTPS        | Для preview использовать `localhost`; в production — только HTTPS                                                |
| SW не activated                       | Preview не запущен, dev-режим (`pnpm dev`) | `pnpm build && pnpm preview`; SW в dev отключён                                                                  |
| Manifest пустой / 404                 | Сборка не выполнена                        | `pnpm build`; проверить `dist/manifest.webmanifest`                                                              |
| Старая версия после изменений         | Кэш SW                                     | См. [Удаление и полная очистка данных](#удаление-приложения-и-полная-очистка-данных); DevTools → Clear site data |
| Offline не работает                   | SW не зарегистрирован                      | Проверить `/sw.js`, вкладку Service Workers                                                                      |
| Баннер / кнопка «Установить» не видны | См. ниже                                   | См. [Удаление и полная очистка данных](#удаление-приложения-и-полная-очистка-данных)                             |
| Lighthouse результаты различаются     | Версия Chrome, расширения, throttling      | Закрыть лишние вкладки; указать версию Chrome в заметках проверки                                                |
| `beforeinstallprompt` в headless/CI   | Ожидаемо                                   | Install — только ручная проверка; E2E мокает событие (`e2e/install-prompt.spec.ts`)                              |

### Баннер и кнопка «Установить» не видны

`InstallBanner` показывает **кнопку** только если сработал `beforeinstallprompt` (Chromium). Иначе — **текст** с инструкцией или **ничего** (если уже установлено).

| Ситуация                      | Что видно                                     | Действие                                                                            |
| ----------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| Открыто с иконки (standalone) | Ничего — баннер скрыт намеренно               | Норма; для проверки баннера открыть сайт в вкладке браузера                         |
| Chrome «помнит» установку     | Нет prompt, нет кнопки                        | [Полная очистка данных](#удаление-приложения-и-полная-очистка-данных) + удалить PWA |
| `http://192.168.x.x` по Wi‑Fi | SW и install не работают                      | Использовать `adb reverse` + `localhost` или HTTPS                                  |
| iOS Safari                    | Кнопки нет, только текст подсказки            | Норма; установка только через «На экран Домой»                                      |
| Первые ~1 с после загрузки    | Ничего                                        | Подождать grace period (`InstallBanner`)                                            |
| `pnpm dev`                    | SW не активен, installability может не пройти | `pnpm build && pnpm preview`                                                        |

---

## Связанные документы

- [tech-stack-pwa.md](./tech-stack-pwa.md) — правила и стек PWA
- [config-schema.md](./config-schema.md) — схема manifest и SW
- [run-and-build.md](./run-and-build.md) — команды сборки и preview
- [testing-guidelines.md](./testing-guidelines.md) — политика тестирования
