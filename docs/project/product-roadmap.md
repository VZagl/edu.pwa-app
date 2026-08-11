# Дорожная карта продукта (Product Roadmap)

> Единый источник правды: концепция учебного PWA, направление развития и прогресс.

## 1. Концепция

### 1.1 Что за продукт

**edu.pwa-app** — учебное веб-приложение на React + Vite, которое **пошагово** демонстрирует создание **Progressive Web App (PWA)**. Каждый раздел приложения и каждый шаг плана реализации закрепляют отдельную тему: manifest, service worker, кэш, офлайн, установка на домашний экран и т.д.

- Не production-продукт с бизнес-логикой, а **лаборатория** для изучения PWA
- Код и документация должны быть понятны при прохождении темы с нуля
- Итоговое состояние — installable PWA с осмысленным офлайн-поведением

### 1.2 Для кого

Разработчики, изучающие React и хотящие понять PWA на практике (курс, самообучение, репозиторий-пример).

### 1.3 Зачем

Закрепить на реальном коде:

- критерии PWA и отличие от «просто сайта»;
- Web App Manifest и иконки;
- жизненный цикл Service Worker и стратегии кэширования;
- UX офлайна и обновления приложения;
- установка и режим standalone.

---

## 2. Архитектура (принятые решения)

- **Только frontend:** SPA в браузере, без собственного backend в репозитории.
- **Сборка:** Vite; production — статика в `dist/`.
- **PWA-слой:** manifest + service worker (целевой путь — `vite-plugin-pwa` + Workbox после базовых ручных шагов).
- **Деплой:** любой HTTPS-хостинг; localhost — для разработки.
- **Состояние UI:** React `useState` / Context; без тяжёлого state-менеджера на старте.
- **Стили:** только SCSS (`sass-embedded`).
- **Качество:** разработка по TDD; до фич — Vitest + Playwright (фаза 0 плана реализации).

---

## 3. Видение

Приложение с навигацией по **учебным модулям** (Manifest, SW, Offline, Install, Cache Storage, Storage, …), каждый модуль — живой пример + краткие пояснения в UI. Lighthouse PWA audit проходит на production-сборке; целевой хостинг после MVP — **GitHub Pages** (HTTPS).

---

## 4. Ключевые возможности (целевые)

1. Корректный **Web App Manifest** (имя, иконки, `display`, цвета)
2. Зарегистрированный **Service Worker** с контролируемым обновлением
3. **Precache** статики и разумный runtime-кэш
4. **Офлайн-fallback** (страница или режим «вы offline»)
5. **Install prompt** / подсказка установки (где поддерживает браузер)
6. Учебные экраны по темам (Главная, Manifest, SW, Offline, Install, Cache Storage, Storage)
7. Деплой на **GitHub Pages** (HTTPS)
8. (Опционально) Push, Background Sync, Share Target

---

## 5. Приоритеты

| Приоритет | Описание                                                        |
| --------- | --------------------------------------------------------------- |
| P0        | Manifest + базовая installability (иконки, meta, HTTPS preview) |
| P1        | Service Worker: регистрация, precache, обновление версии        |
| P2        | Офлайн UX, runtime caching, учебные экраны по темам             |
| P3        | Cache Storage / Storage UI, Push (опц.), деплой на GitHub Pages |

---

## 6. Краткосрочные цели (MVP PWA)

Первая версия, которую можно назвать PWA:

- [x] Тестовое окружение: Vitest + Playwright (фаза 0)
- [x] Базовое React-приложение с навигацией по учебным разделам
- [x] Web App Manifest и набор иконок
- [x] Service Worker (ручной или через vite-plugin-pwa)
- [x] Офлайн-доступ к оболочке приложения / fallback
- [x] Проверка: Lighthouse PWA + установка на устройство

**Синхронизация чекбоксов:** при `/close-task` отмечать `[x]`, когда **все** шаги из таблицы ниже имеют ссылку в поле **Completed** в [implementation-plan.md](implementation-plan.md).

### Связь с шагами плана (implementation-plan)

| Цель MVP           | Шаги плана                                             |
| ------------------ | ------------------------------------------------------ |
| Тестовое окружение | `step-test-environment`, `step-playwright-setup`       |
| Каркас UI          | `step-app-shell`, `step-lessons-navigation`            |
| Manifest           | `step-web-app-manifest`                                |
| Service Worker     | `step-service-worker-register`, `step-vite-plugin-pwa` |
| Офлайн             | `step-offline-fallback`                                |
| Install UX         | `step-install-prompt`                                  |

---

## 7. Долгосрочные цели

- [x] Заполнить экраны-заглушки: Главная, Service Worker, Install — `step-home-lesson-ui`, `step-sw-lesson-ui`, `step-install-lesson-ui`
- [ ] Разделы Cache Storage и Storage quota — `step-cache-storage-lesson-ui`, `step-storage-quota-lesson-ui`
- [ ] (Опционально) Push-уведомления — `step-push-notifications`
- [ ] Деплой на GitHub Pages (HTTPS) — `step-github-pages-deploy` (после Push)
- [ ] README «с нуля» для ученика — `step-readme-learner-guide`
- [ ] Расширенные E2E-сценарии PWA (offline/install в CI, где стабильно)

> Базовая инфра Playwright и smoke E2E — в MVP (фаза 0). Здесь — доделка лаборатории, деплой и углубление покрытия.

---

## 8. Ограничения и допущения

### Технические

- **pnpm** — обязательный менеджер пакетов
- **React 19**, **TypeScript**, **Vite** — версии из `package.json`
- **TDD** — обязателен; Vitest + Playwright до продуктовых шагов
- PWA в production только по **HTTPS**
- Safari/iOS: часть API (install prompt, push) ограничена — документировать в UI

### Продуктовые

- Фокус на **обучении PWA**, не на сложной предметной области
- Данные можно мокать или хранить в `localStorage` для демо
- Язык интерфейса: **русский** (на старте один язык)

---

## 9. Прогресс

Журнал вех. Строка добавляется при `/close-task`, когда закрытый шаг закрывает цель из §6–§7.

| Дата       | Событие                                                                         | Статус   |
| ---------- | ------------------------------------------------------------------------------- | -------- |
| 2026-07-23 | Инициализация репозитория (Vite + React), адаптация docs под учебное PWA        | ✅ Готов |
| 2026-07-30 | Фаза 0: тестовое окружение (Vitest + Playwright)                                | ✅ Готов |
| 2026-08-03 | Фаза 1: каркас UI и навигация по учебным разделам (`step-lessons-navigation`)   | ✅ Готов |
| 2026-08-03 | Web App Manifest (`step-web-app-manifest`)                                      | ✅ Готов |
| 2026-08-03 | Фаза 2: Web App Manifest и экран урока (`step-manifest-lesson-ui`)              | ✅ Готов |
| 2026-08-04 | Service Worker с Workbox precache (`step-vite-plugin-pwa`)                      | ✅ Готов |
| 2026-08-04 | Фаза 3: Service Worker в production и UX обновления (`step-sw-update-ux`)       | ✅ Готов |
| 2026-08-06 | Offline fallback и индикатор сети (`step-offline-fallback`)                     | ✅ Готов |
| 2026-08-06 | Фаза 4: офлайн и кэш (`step-offline-lesson-ui`)                                 | ✅ Готов |
| 2026-08-06 | Фаза 5: установка PWA из UI (`step-install-prompt`)                             | ✅ Готов |
| 2026-08-07 | Фаза 6 / MVP PWA: чеклист проверки Lighthouse (`step-lighthouse-pwa-checklist`) | ✅ Готов |
| 2026-08-11 | Экраны-заглушки заполнены: Главная, SW, Install (`step-install-lesson-ui`)      | ✅ Готов |

---

## Связанные документы

- [План реализации](implementation-plan.md)
- [Структура проекта](project-structure.md)
- [Технологии](tech-stack.md)
- [PWA и Service Worker](tech-stack-pwa.md)
