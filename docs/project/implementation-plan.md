# План реализации (Implementation Plan)

> Пошаговая разработка учебного PWA. Каждый шаг — отдельная задача в backlog Memory Bank.
> Разработка ведётся по **TDD**. До продуктовых шагов обязательно тестовое окружение (Vitest + Playwright).

**Связано с:** [Дорожная карта продукта](product-roadmap.md), [Тестирование](testing-guidelines.md)

---

## Критические правила эволюции плана

1. **Запрещено изменять нумерацию существующих шагов** (`Order`) и их `ID`, если на шаг уже есть ссылки из реализованного кода, `completed-tasks` или закрытых задач.
2. Неактуальный шаг с такими ссылками помечается как `Удалён`, а не стирается из истории.
3. На стадии настройки правил/среды (ещё нет реализации по шагу и нет ссылок из кода/completed): неактуальный шаг **удаляется полностью** — запись «Удалён» только создаёт шум для агента.
4. Новые шаги — только с новым `Order` и новым `ID`.
5. При добавлении инфраструктурного шага обновить зависимости затронутых шагов.

---

## Цикл выполнения задачи

| Уровень     | Когда                     | Цикл                                                 |
| ----------- | ------------------------- | ---------------------------------------------------- |
| **Level 1** | Мелкое изменение          | VAN → BUILD → REFLECT → CLOSE-TASK                   |
| **Level 2** | Улучшение с планированием | VAN → PLAN → BUILD → REFLECT → CLOSE-TASK            |
| **Level 3** | Фича с дизайн-решениями   | VAN → PLAN → CREATIVE → BUILD → REFLECT → CLOSE-TASK |

**BUILD (TDD):** red → green → refactor. Unit/integration — Vitest; критичный UX-сценарий шага — Playwright. BUILD не закрывать без проверок из [testing-guidelines.md](testing-guidelines.md).

---

## Легенда

- **Order** — порядок отображения
- **ID** — стабильный идентификатор `step-{slug}` (kebab-case)
- **Completed** — ссылка на closed task в `memory-bank/completed-tasks/`

---

## Шаблон шага

```markdown
#### [ID] (Order: X.Y.Z)

**Описание** …

**Цель:** …

**Файлы:** …

**Тесты:** обязательны (TDD); unit/integration и/или E2E по смыслу шага — [testing-guidelines.md](testing-guidelines.md)

**Зависит от:** …

**Completed:** …
```

---

## Фаза 0: Тестовое окружение

> Цель: Vitest и Playwright готовы **до** любой продуктовой разработки. Фичи без закрытых шагов фазы 0 не начинать.

### Этап 0.1: Раннеры

#### step-test-environment (Order: 0.1.1)

**Описание**

Подключить Vitest + Testing Library + jsdom: зависимости в `package.json`, блок `test` в `vite.config.ts`, `vitest.setup.ts`, скрипт `test` (`vitest`; для однократного прогона — `pnpm test --run`). Smoke unit-тест, подтверждающий работу окружения. Обновить [testing-guidelines-frontend.md](testing-guidelines-frontend.md) при расхождении с фактической конфигурацией.

**Цель:** `pnpm test --run` проходит; можно писать unit/integration по TDD.

**Файлы:** `package.json`, `vite.config.ts`, `vitest.setup.ts`, smoke-тест в `src/`

**Тесты:** smoke unit (окружение поднимается и проходит)

**Зависит от:** —

**Completed:** [memory-bank/completed-tasks/2026/07/step-test-environment_2026-07-30.md](memory-bank/completed-tasks/2026/07/step-test-environment_2026-07-30.md)

---

#### step-playwright-setup (Order: 0.1.2)

**Описание**

Подключить Playwright: зависимости, `playwright.config.ts` (в т.ч. `webServer` на `pnpm preview` или `pnpm dev`), каталог `e2e/`, скрипт `test:e2e`. Smoke E2E: приложение открывается в браузере. Документировать запуск в [run-and-build.md](run-and-build.md) / guidelines.

**Цель:** `pnpm test:e2e` проходит; можно писать E2E по TDD для пользовательских сценариев.

**Файлы:** `package.json`, `playwright.config.ts`, `e2e/`

**Тесты:** smoke E2E (загрузка приложения)

**Зависит от:** step-test-environment

**Completed:** [memory-bank/completed-tasks/2026/07/step-playwright-setup_2026-07-30.md](memory-bank/completed-tasks/2026/07/step-playwright-setup_2026-07-30.md)

---

## Фаза 1: Основа приложения

> Цель: каркас SPA и навигация по учебным разделам.

### Этап 1.1: Каркас UI

#### step-app-shell (Order: 1.1.1)

**Описание**

Базовая разметка приложения: header, main, простая навигация. Заменить стартовый шаблон Vite на оболочку учебного PWA (название проекта, место под контент уроков). Стили — только SCSS.

**Цель:** Приложение имеет узнаваемую оболочку; контент уроков рендерится в main.

**Файлы:** `src/App.tsx`, `src/App.scss`, `src/index.scss`, `src/App.test.tsx`, при необходимости `e2e/`

**Тесты:** unit/integration — оболочка (header, main, название); E2E — страница загружается с узнаваемой оболочкой

**Зависит от:** step-test-environment, step-playwright-setup

**Completed:** [memory-bank/completed-tasks/2026/07/step-app-shell_2026-08-01.md](memory-bank/completed-tasks/2026/07/step-app-shell_2026-08-01.md)

---

#### step-lessons-navigation (Order: 1.1.2)

**Описание**

Навигация по учебным разделам (Manifest, Service Worker, Offline, Install). Достаточно переключения экранов через state или лёгкий роутер (React Router — только если добавлен в `package.json`).

**Цель:** Пользователь переключается между разделами; каждый раздел — заглушка с названием темы.

**Файлы:** `src/`, `src/components/` или `src/screens/`, соответствующие `*.test.*`, при необходимости `e2e/`

**Тесты:** unit/integration — переключение разделов; E2E — переход между разделами в UI

**Зависит от:** step-app-shell

**Completed:** [memory-bank/completed-tasks/2026/08/step-lessons-navigation_2026-08-03.md](memory-bank/completed-tasks/2026/08/step-lessons-navigation_2026-08-03.md)

---

## Фаза 2: Web App Manifest

> Цель: приложение узнаётся браузером как installable candidate.

#### step-web-app-manifest (Order: 2.1.1)

**Описание**

Добавить `manifest.webmanifest`: `name`, `short_name`, `start_url`, `display` (`standalone` или `minimal-ui`), `theme_color`, `background_color`, `icons`. Подключить в `index.html` (`<link rel="manifest">`). Иконки — `public/icons/` (минимум 192×192 и 512×512). Документировать поля в [config-schema.md](config-schema.md).

**Цель:** DevTools → Application → Manifest без критичных ошибок; иконки отображаются.

**Файлы:** `public/manifest.webmanifest`, `public/icons/`, `index.html`

**Тесты:** E2E или интеграция — manifest отдаётся по URL и содержит обязательные поля; ручная проверка Application panel

**Зависит от:** step-app-shell

**Completed:** [memory-bank/completed-tasks/2026/08/step-web-app-manifest_2026-08-03.md](memory-bank/completed-tasks/2026/08/step-web-app-manifest_2026-08-03.md)

---

#### step-manifest-lesson-ui (Order: 2.1.2)

**Описание**

Экран урока «Manifest»: краткое объяснение в UI + отображение текущих значений manifest (fetch `/manifest.webmanifest` или статический объект).

**Цель:** Раздел Manifest в приложении объясняет и показывает живые данные.

**Файлы:** `src/screens/` или `src/pages/`, тесты рядом с модулями

**Тесты:** unit/integration — экран показывает данные manifest; E2E по смыслу сценария урока

**Зависит от:** step-web-app-manifest, step-lessons-navigation

**Completed:** [memory-bank/completed-tasks/2026/08/step-manifest-lesson-ui_2026-08-03.md](memory-bank/completed-tasks/2026/08/step-manifest-lesson-ui_2026-08-03.md)

---

## Фаза 3: Service Worker

> Цель: offline-ready оболочка и понимание жизненного цикла SW.

#### step-service-worker-register (Order: 3.1.1)

**Описание**

Учебный этап: **ручной** минимальный SW в `public/sw.js` (или `src/sw.ts` с последующей сборкой) — install + activate, логирование в консоль. Регистрация из `main.tsx` или `src/pwa/registerSw.ts` с проверкой `'serviceWorker' in navigator`.

**Цель:** SW регистрируется; в DevTools видны install/activate; понятен scope.

**Файлы:** `public/sw.js` (или аналог), `src/pwa/`, `src/main.tsx`

**Тесты:** unit — регистрация вызывается при поддержке SW (мок `navigator.serviceWorker`); E2E/preview — по возможности регистрация в preview

**Зависит от:** step-web-app-manifest

**Completed:** [memory-bank/completed-tasks/2026/08/step-service-worker-register_2026-08-04.md](memory-bank/completed-tasks/2026/08/step-service-worker-register_2026-08-04.md)

---

#### step-vite-plugin-pwa (Order: 3.1.2)

**Описание**

Подключить `vite-plugin-pwa` (Workbox): precache статики из сборки, dev/prod настройки (отключение SW в dev или `devOptions` по доке плагина). Заменить или интегрировать ручной SW из предыдущего шага.

**Цель:** Production-сборка генерирует SW; `pnpm preview` — приложение cacheable.

**Файлы:** `vite.config.ts`, `package.json`

**Тесты:** E2E против `pnpm preview` — приложение загружается; ручная/автопроверка наличия SW в production-сборке

**Зависит от:** step-service-worker-register

**Completed:** [memory-bank/completed-tasks/2026/08/step-vite-plugin-pwa_2026-08-04.md](memory-bank/completed-tasks/2026/08/step-vite-plugin-pwa_2026-08-04.md)

---

#### step-sw-update-ux (Order: 3.1.3)

**Описание**

UX при новой версии SW: обнаружение `waiting` worker, баннер «Доступно обновление» + кнопка перезагрузки (`skipWaiting` + `clients.claim` по выбранной стратегии).

**Цель:** Пользователь понимает, как обновляется установленное PWA.

**Файлы:** `src/pwa/`, `src/components/`

**Тесты:** unit — баннер/хук при наличии waiting worker (моки); E2E — по возможности сценарий обновления

**Зависит от:** step-vite-plugin-pwa

**Completed:** [memory-bank/completed-tasks/2026/08/step-sw-update-ux_2026-08-04.md](memory-bank/completed-tasks/2026/08/step-sw-update-ux_2026-08-04.md)

---

## Фаза 4: Офлайн и кэш

#### step-offline-fallback (Order: 4.1.1)

**Описание**

Runtime caching и/или offline fallback: при отсутствии сети показывать сохранённую оболочку или страницу «Вы offline». Хук `useOnlineStatus` для индикатора в UI.

**Цель:** После первого визита приложение частично работает offline; есть явный offline UX.

**Файлы:** `vite.config.ts` (workbox runtime rules), `src/hooks/`, `src/screens/`

**Тесты:** unit — `useOnlineStatus` / индикатор; E2E — offline-сценарий (где стабильно в CI)

**Зависит от:** step-vite-plugin-pwa

**Completed:** [memory-bank/completed-tasks/2026/08/step-offline-fallback_2026-08-06.md](memory-bank/completed-tasks/2026/08/step-offline-fallback_2026-08-06.md)

---

#### step-offline-lesson-ui (Order: 4.1.2)

**Описание**

Экран урока «Offline & Cache»: объяснение precache vs runtime, демо статуса сети.

**Цель:** Тема кэширования закреплена в UI приложения.

**Файлы:** `src/screens/` или `src/pages/`, тесты рядом с модулями

**Тесты:** unit/integration — экран урока и демо статуса сети

**Зависит от:** step-offline-fallback, step-lessons-navigation

**Completed:** [memory-bank/completed-tasks/2026/08/step-offline-lesson-ui_2026-08-06.md](memory-bank/completed-tasks/2026/08/step-offline-lesson-ui_2026-08-06.md)

---

## Фаза 5: Установка PWA

#### step-install-prompt (Order: 5.1.1)

**Описание**

Обработка `beforeinstallprompt` (Chromium): отложенный prompt, кнопка «Установить» в UI. Fallback-текст для Safari/iOS (Add to Home Screen вручную).

**Цель:** На поддерживаемых браузерах пользователь может установить приложение из UI.

**Файлы:** `src/hooks/useInstallPrompt.ts`, `src/components/InstallBanner/`

**Тесты:** unit — хук и баннер при/без `beforeinstallprompt` (моки); E2E — видимость UI установки (с оговорками по браузеру)

**Зависит от:** step-web-app-manifest, step-vite-plugin-pwa

**Completed:** [memory-bank/completed-tasks/2026/08/step-install-prompt_2026-08-06.md](memory-bank/completed-tasks/2026/08/step-install-prompt_2026-08-06.md)

---

## Фаза 6: Качество и деплой

#### step-lighthouse-pwa-checklist (Order: 6.1.1)

**Описание**

Чеклист и документирование проверки: Lighthouse PWA, Application panel, установка на телефон. Краткая секция в README или отдельный `docs/project/pwa-checklist.md` (опционально).

**Цель:** Зафиксирован reproducible способ проверить, что MVP PWA выполнен.

**Тесты:** документация чеклиста; регрессия через существующие unit/E2E; ручной Lighthouse

**Зависит от:** step-install-prompt, step-offline-fallback

**Completed:** [memory-bank/completed-tasks/2026/08/step-lighthouse-pwa-checklist_2026-08-07.md](../../memory-bank/completed-tasks/2026/08/step-lighthouse-pwa-checklist_2026-08-07.md)

---

## Фаза 7: После MVP — учебные экраны, API, деплой

> MVP (фазы 0–6) закрыт. Дальше — доделка заглушек уроков, отдельные разделы Cache Storage / Storage, опциональный Push, деплой на GitHub Pages.

### Этап 7.0: Доделка учебных экранов

#### step-home-lesson-ui (Order: 7.0.1)

**Описание**

Заполнить экран «Главная» (сейчас `LessonStubScreen`): карта лаборатории — intro учебного PWA, порядок модулей со ссылками (Manifest → SW → Offline → Install и далее новые разделы), краткий чеклист критериев PWA, блок «как пользоваться» (preview, DevTools). Короткий блок **почему нужен HTTPS** (secure context; исключение `localhost`; на GitHub Pages HTTPS из коробки).

**Цель:** Главная — точка входа для ученика, а не заглушка.

**Файлы:** `src/screens/HomeScreen/`, тесты рядом; при необходимости `src/routes/lessonRoutes.ts`

**Тесты:** unit/integration — ключевые блоки и ссылки на разделы; E2E по смыслу

**Зависит от:** step-lessons-navigation, step-lighthouse-pwa-checklist

**Completed:** [memory-bank/completed-tasks/2026/08/step-home-lesson-ui_2026-08-10.md](../../memory-bank/completed-tasks/2026/08/step-home-lesson-ui_2026-08-10.md)

---

#### step-sw-lesson-ui (Order: 7.0.2)

**Описание**

Заполнить экран «Service Worker»: intro (scope, отличие от обычного скрипта), lifecycle (install → activate → controlling / waiting), живое демо (`controller`, state регистрации, scope), связь с баннером обновления (`swUpdateController`). Показать **версию сборки / revision** в UI (связь с update flow). Учебная кнопка **«Сбросить SW и кэш»** (`unregister` + очистка `caches` + опционально reload) с явной пометкой «только для лаборатории» и пояснением, что на проде делают через update flow и cleanup в `activate`, а не публичный hard-reset. Не дублировать таблицы runtime rules с Offline — перекрёстная ссылка.

**Цель:** Раздел SW объясняет lifecycle и даёт интерактив для экспериментов.

**Файлы:** `src/screens/ServiceWorkerScreen/`, при необходимости `src/pwa/`, тесты рядом

**Тесты:** unit — отображение статуса / версия / предупреждение у кнопки сброса (моки SW и caches); E2E по смыслу

**Зависит от:** step-sw-update-ux, step-lessons-navigation

**Completed:** —

---

#### step-install-lesson-ui (Order: 7.0.3)

**Описание**

Заполнить экран «Install»: условия installability, демо на базе `useInstallPrompt` (canInstall / fallback / installed), определение `display-mode` (standalone vs вкладка), инструкции по платформам (Chromium prompt vs iOS/Safari), куда смотреть в DevTools.

**Цель:** Раздел Install закрепляет установку PWA в UI, а не только глобальный баннер.

**Файлы:** `src/screens/InstallScreen/`, переиспользование `useInstallPrompt` / hints, тесты рядом

**Тесты:** unit/integration — состояния установки и display-mode (моки); E2E по смыслу

**Зависит от:** step-install-prompt, step-lessons-navigation

**Completed:** —

---

### Этап 7.1: Новые учебные разделы (Cache Storage, Storage)

#### step-cache-storage-lesson-ui (Order: 7.0.4)

**Описание**

**Отдельный раздел** навигации «Cache Storage»: описание Cache Storage API + блок живых значений — список `caches.keys()`, для выбранного кэша — URL из `cache.keys()`. Кнопка обновления списка. Без вывода тел ответов.

**Цель:** Ученик видит реальные кэши Workbox/runtime в UI приложения.

**Файлы:** `src/screens/CacheStorageScreen/` (или аналог), `src/routes/lessonRoutes.ts`, тесты рядом

**Тесты:** unit — рендер списка кэшей/ключей (мок `caches`); E2E по смыслу

**Зависит от:** step-offline-fallback, step-lessons-navigation

**Completed:** —

---

#### step-storage-quota-lesson-ui (Order: 7.0.5)

**Описание**

**Отдельный раздел** навигации (продвинутый урок): Storage quota / Persistent storage — `navigator.storage.estimate()` (usage/quota), опционально `persist()` / `persisted()`, краткое объяснение лимитов и вытеснения данных браузером.

**Цель:** Понять квоты хранилища и Persistent Storage на практике.

**Файлы:** `src/screens/StorageScreen/` (или аналог), `src/routes/lessonRoutes.ts`, тесты рядом

**Тесты:** unit — отображение estimate/persisted (моки `navigator.storage`); E2E по смыслу

**Зависит от:** step-cache-storage-lesson-ui

**Completed:** —

---

### Этап 7.2: Опционально — Push

#### step-push-notifications (Order: 7.1.1)

**Описание**

Опциональный урок: Web Push (требует backend или mock); только если есть учебная цель и HTTPS. Отдельный раздел или экран по итогам PLAN/CREATIVE.

**Тесты:** unit моков подписки; E2E — по учебной необходимости

**Зависит от:** step-lighthouse-pwa-checklist

**Completed:** —

---

### Этап 7.3: Деплой

#### step-github-pages-deploy (Order: 7.2.1)

**Описание**

Деплой учебного PWA на **GitHub Pages** (HTTPS): настроить `base` в Vite под путь репозитория (если project site), GitHub Actions (`pnpm build` → publish `dist`), проверить manifest/SW/offline/install уже на `https://…`. Обновить [run-and-build.md](run-and-build.md) и при необходимости [pwa-checklist.md](pwa-checklist.md) секцией про проверку на Pages. Закрывает пробел фазы 6 («качество и деплой») — сам шаг деплоя.

**Цель:** Приложение доступно по HTTPS; PWA-сценарии воспроизводимы вне localhost.

**Файлы:** `vite.config.ts`, `.github/workflows/`, `docs/project/run-and-build.md`, при необходимости `docs/project/pwa-checklist.md`

**Тесты:** документация и ручная проверка на Pages; регрессия существующих unit/E2E на preview; E2E против Pages — опционально

**Зависит от:** step-push-notifications

**Completed:** —

---

### Этап 7.4: Документация для ученика

#### step-readme-learner-guide (Order: 7.3.1)

**Описание**

Расширить README «с нуля»: порядок экранов/разделов, что смотреть в DevTools (Manifest, Service Workers, Cache Storage, Network → Offline), зачем `pnpm build` + `pnpm preview`, ссылка на [pwa-checklist.md](pwa-checklist.md).

**Цель:** Репозиторий понятен без истории Memory Bank.

**Файлы:** `README.md`

**Тесты:** ревью документации (автотесты не обязательны)

**Зависит от:** step-home-lesson-ui, step-sw-lesson-ui, step-install-lesson-ui

**Completed:** —

---

## Критерии готовности по фазам

| Фаза | Критерий                                                 | Статус       |
| ---- | -------------------------------------------------------- | ------------ |
| 0    | Vitest и Playwright настроены; smoke unit и E2E проходят | ✅ Завершена |
| 1    | Каркас и навигация по урокам (с тестами)                 | ✅ Завершена |
| 2    | Manifest валиден                                         | ✅ Завершена |
| 3    | SW в production, UX обновления                           | ✅ Завершена |
| 4    | Офлайн-fallback работает                                 | ✅ Завершена |
| 5    | Install flow / инструкции                                | ✅ Завершена |
| 6    | Lighthouse PWA checklist зафиксирован                    | ✅ Завершена |
| 7    | Экраны-уроки, Cache/Storage, Push (опц.), Pages, README  | ⏳ В плане   |

---

## Как использовать этот план

1. Шаг добавляется в `memory-bank/backlog.md`, когда готовы к реализации.
2. Перед стартом проверить **Зависит от** — все зависимости должны иметь **Completed**.
3. Продуктовые шаги (фаза 1+) — только после **Completed** у `step-test-environment` и `step-playwright-setup`.
4. Цикл — по Memory Bank (VAN → … → CLOSE-TASK); в BUILD соблюдать TDD.
5. После `/close-task` — обновить **Completed** здесь и чекбоксы в [product-roadmap.md](product-roadmap.md).
