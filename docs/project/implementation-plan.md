# План реализации (Implementation Plan)

> Пошаговая разработка учебного PWA. Каждый шаг — отдельная задача в backlog Memory Bank.

**Связано с:** [Дорожная карта продукта](product-roadmap.md)

---

## Критические правила эволюции плана

1. **Запрещено изменять нумерацию существующих шагов** (`Order`) и их `ID`.
2. Неактуальный шаг помечается как `Удалён`, а не удаляется из истории.
3. Новые шаги — только с новым `Order` и новым `ID`.
4. При добавлении инфраструктурного шага обновить зависимости затронутых шагов.

---

## Цикл выполнения задачи

| Уровень     | Когда                     | Цикл                                                 |
| ----------- | ------------------------- | ---------------------------------------------------- |
| **Level 1** | Мелкое изменение          | VAN → BUILD → REFLECT → CLOSE-TASK                   |
| **Level 2** | Улучшение с планированием | VAN → PLAN → BUILD → REFLECT → CLOSE-TASK            |
| **Level 3** | Фича с дизайн-решениями   | VAN → PLAN → CREATIVE → BUILD → REFLECT → CLOSE-TASK |

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

**Тесты:** по [testing-guidelines.md](testing-guidelines.md) или «—» до подключения Vitest

**Зависит от:** …

**Completed:** …
```

---

## Фаза 1: Основа приложения

> Цель: каркас SPA и навигация по учебным разделам.

### Этап 1.1: Каркас UI

#### step-app-shell (Order: 1.1.1)

**Описание**

Базовая разметка приложения: header, main, простая навигация. Заменить стартовый шаблон Vite на оболочку учебного PWA (название проекта, место под контент уроков).

**Цель:** Приложение имеет узнаваемую оболочку; контент уроков рендерится в main.

**Файлы:** `src/App.tsx`, `src/App.css`, `src/index.css`

**Тесты:** — (до подключения Vitest)

**Зависит от:** —

**Completed:** —

---

#### step-lessons-navigation (Order: 1.1.2)

**Описание**

Навигация по учебным разделам (Manifest, Service Worker, Offline, Install). Достаточно переключения экранов через state или лёгкий роутер (React Router — только если добавлен в `package.json`).

**Цель:** Пользователь переключается между разделами; каждый раздел — заглушка с названием темы.

**Файлы:** `src/`, `src/components/` или `src/screens/`

**Зависит от:** step-app-shell

**Completed:** —

---

## Фаза 2: Web App Manifest

> Цель: приложение узнаётся браузером как installable candidate.

#### step-web-app-manifest (Order: 2.1.1)

**Описание**

Добавить `manifest.webmanifest`: `name`, `short_name`, `start_url`, `display` (`standalone` или `minimal-ui`), `theme_color`, `background_color`, `icons`. Подключить в `index.html` (`<link rel="manifest">`). Иконки — `public/icons/` (минимум 192×192 и 512×512). Документировать поля в [config-schema.md](config-schema.md).

**Цель:** DevTools → Application → Manifest без критичных ошибок; иконки отображаются.

**Файлы:** `public/manifest.webmanifest`, `public/icons/`, `index.html`

**Зависит от:** step-app-shell

**Completed:** —

---

#### step-manifest-lesson-ui (Order: 2.1.2)

**Описание**

Экран урока «Manifest»: краткое объяснение в UI + отображение текущих значений manifest (fetch `/manifest.webmanifest` или статический объект).

**Цель:** Раздел Manifest в приложении объясняет и показывает живые данные.

**Файлы:** `src/screens/` или `src/pages/`

**Зависит от:** step-web-app-manifest, step-lessons-navigation

**Completed:** —

---

## Фаза 3: Service Worker

> Цель: offline-ready оболочка и понимание жизненного цикла SW.

#### step-service-worker-register (Order: 3.1.1)

**Описание**

Учебный этап: **ручной** минимальный SW в `public/sw.js` (или `src/sw.ts` с последующей сборкой) — install + activate, логирование в консоль. Регистрация из `main.tsx` или `src/pwa/registerSw.ts` с проверкой `'serviceWorker' in navigator`.

**Цель:** SW регистрируется; в DevTools видны install/activate; понятен scope.

**Файлы:** `public/sw.js` (или аналог), `src/pwa/`, `src/main.tsx`

**Зависит от:** step-web-app-manifest

**Completed:** —

---

#### step-vite-plugin-pwa (Order: 3.1.2)

**Описание**

Подключить `vite-plugin-pwa` (Workbox): precache статики из сборки, dev/prod настройки (отключение SW в dev или `devOptions` по доке плагина). Заменить или интегрировать ручной SW из предыдущего шага.

**Цель:** Production-сборка генерирует SW; `pnpm preview` — приложение cacheable.

**Файлы:** `vite.config.ts`, `package.json`

**Зависит от:** step-service-worker-register

**Completed:** —

---

#### step-sw-update-ux (Order: 3.1.3)

**Описание**

UX при новой версии SW: обнаружение `waiting` worker, баннер «Доступно обновление» + кнопка перезагрузки (`skipWaiting` + `clients.claim` по выбранной стратегии).

**Цель:** Пользователь понимает, как обновляется установленное PWA.

**Файлы:** `src/pwa/`, `src/components/`

**Зависит от:** step-vite-plugin-pwa

**Completed:** —

---

## Фаза 4: Офлайн и кэш

#### step-offline-fallback (Order: 4.1.1)

**Описание**

Runtime caching и/или offline fallback: при отсутствии сети показывать сохранённую оболочку или страницу «Вы offline». Хук `useOnlineStatus` для индикатора в UI.

**Цель:** После первого визита приложение частично работает offline; есть явный offline UX.

**Файлы:** `vite.config.ts` (workbox runtime rules), `src/hooks/`, `src/screens/`

**Зависит от:** step-vite-plugin-pwa

**Completed:** —

---

#### step-offline-lesson-ui (Order: 4.1.2)

**Описание**

Экран урока «Offline & Cache»: объяснение precache vs runtime, демо статуса сети.

**Цель:** Тема кэширования закреплена в UI приложения.

**Зависит от:** step-offline-fallback, step-lessons-navigation

**Completed:** —

---

## Фаза 5: Установка PWA

#### step-install-prompt (Order: 5.1.1)

**Описание**

Обработка `beforeinstallprompt` (Chromium): отложенный prompt, кнопка «Установить» в UI. Fallback-текст для Safari/iOS (Add to Home Screen вручную).

**Цель:** На поддерживаемых браузерах пользователь может установить приложение из UI.

**Файлы:** `src/hooks/useInstallPrompt.ts`, `src/components/InstallBanner/`

**Зависит от:** step-web-app-manifest, step-vite-plugin-pwa

**Completed:** —

---

## Фаза 6: Качество и деплой

#### step-lighthouse-pwa-checklist (Order: 6.1.1)

**Описание**

Чеклист и документирование проверки: Lighthouse PWA, Application panel, установка на телефон. Краткая секция в README или отдельный `docs/project/pwa-checklist.md` (опционально).

**Цель:** Зафиксирован reproducible способ проверить, что MVP PWA выполнен.

**Зависит от:** step-install-prompt, step-offline-fallback

**Completed:** —

---

#### step-vitest-setup (Order: 6.2.1)

**Описание**

Подключить Vitest + Testing Library для unit-тестов компонентов и хуков (online, install prompt). Обновить [testing-guidelines-frontend.md](testing-guidelines-frontend.md).

**Файлы:** `vite.config.ts`, `package.json`, `vitest.setup.ts`

**Зависит от:** step-app-shell

**Completed:** —

---

## Фаза 7: Опционально (после MVP)

#### step-push-notifications (Order: 7.1.1)

**Описание**

Опциональный урок: Web Push (требует backend или mock); только если есть учебная цель и HTTPS.

**Зависит от:** step-lighthouse-pwa-checklist

**Completed:** —

---

## Критерии готовности по фазам

| Фаза | Критерий                                       | Статус |
| ---- | ---------------------------------------------- | ------ |
| 1    | Каркас и навигация по урокам                   | —      |
| 2    | Manifest валиден                               | —      |
| 3    | SW в production, UX обновления                 | —      |
| 4    | Офлайн-fallback работает                       | —      |
| 5    | Install flow / инструкции                      | —      |
| 6    | Lighthouse PWA, тесты (при подключении Vitest) | —      |

---

## Как использовать этот план

1. Шаг добавляется в `memory-bank/backlog.md`, когда готовы к реализации.
2. Перед стартом проверить **Зависит от** — все зависимости должны иметь **Completed**.
3. Цикл — по Memory Bank (VAN → … → CLOSE-TASK).
4. После `/close-task` — обновить **Completed** здесь и чекбоксы в [product-roadmap.md](product-roadmap.md).
