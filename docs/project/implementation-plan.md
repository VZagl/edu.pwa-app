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

**Completed:** —

---

## Фаза 6: Качество и деплой

#### step-lighthouse-pwa-checklist (Order: 6.1.1)

**Описание**

Чеклист и документирование проверки: Lighthouse PWA, Application panel, установка на телефон. Краткая секция в README или отдельный `docs/project/pwa-checklist.md` (опционально).

**Цель:** Зафиксирован reproducible способ проверить, что MVP PWA выполнен.

**Тесты:** документация чеклиста; регрессия через существующие unit/E2E; ручной Lighthouse

**Зависит от:** step-install-prompt, step-offline-fallback

**Completed:** —

---

## Фаза 7: Опционально (после MVP)

#### step-push-notifications (Order: 7.1.1)

**Описание**

Опциональный урок: Web Push (требует backend или mock); только если есть учебная цель и HTTPS.

**Тесты:** unit моков подписки; E2E — по учебной необходимости

**Зависит от:** step-lighthouse-pwa-checklist

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
| 5    | Install flow / инструкции                                | —            |
| 6    | Lighthouse PWA checklist зафиксирован                    | —            |

---

## Как использовать этот план

1. Шаг добавляется в `memory-bank/backlog.md`, когда готовы к реализации.
2. Перед стартом проверить **Зависит от** — все зависимости должны иметь **Completed**.
3. Продуктовые шаги (фаза 1+) — только после **Completed** у `step-test-environment` и `step-playwright-setup`.
4. Цикл — по Memory Bank (VAN → … → CLOSE-TASK); в BUILD соблюдать TDD.
5. После `/close-task` — обновить **Completed** здесь и чекбоксы в [product-roadmap.md](product-roadmap.md).
