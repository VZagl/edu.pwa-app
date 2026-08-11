> **Правила для ИИ:** PWA, Service Worker и возможности платформы браузера

# Технологии: PWA

## Область применения

Правила для изменений, связанных с Progressive Web App: manifest, service worker, кэширование, офлайн-режим, установка на устройство. Файлы manifest и SW — в `public/` или генерируются плагином сборки (см. план реализации).

## Ключевые правила

- **HTTPS обязателен** для полноценного PWA в production (localhost — исключение для разработки).
- **Manifest** — единый источник метаданных приложения (имя, иконки, `display`, `theme_color`). Схема — [config-schema.md](config-schema.md).
- **Service Worker** регистрировать из клиентского кода после загрузки страницы; обрабатывать обновления SW явно (UX «доступна новая версия»).
- **Кэширование:** стратегии выбирать по типу ресурса (статика — cache-first, API — network-first или stale-while-revalidate); не кэшировать без необходимости динамические персональные данные.
- **vite-plugin-pwa** — предпочтительный способ интеграции SW и manifest в Vite-проекте (добавляется на соответствующем шаге плана); до подключения плагина — ручная регистрация SW допустима для обучения.
- Версии зависимостей PWA-библиотек проверять в `package.json` перед предложением изменений.

## Стек (целевой, по мере прохождения плана)

| Область        | Технология                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------- |
| Manifest       | `public/manifest.webmanifest` или генерация через `vite-plugin-pwa`                         |
| Service Worker | Workbox (через `vite-plugin-pwa`) или ручной SW для учебных шагов                           |
| Иконки         | PNG/SVG в `public/icons/`                                                                   |
| Проверка PWA   | [pwa-checklist.md](./pwa-checklist.md); Chrome DevTools → Application; Lighthouse PWA audit |

## Типичные учебные темы (roadmap)

1. Web App Manifest и иконки
2. Регистрация Service Worker
3. Precache статики и runtime-кэш
4. Офлайн-страница и fallback
5. Prompt «Установить приложение» / `beforeinstallprompt`
6. (Опционально) Push, Background Sync, Share Target API

## Запрещено

- Регистрировать SW в dev без понимания последствий для HMR — следовать настройкам плагина или отключать SW в dev явно.
- Хардкодить абсолютные URL production-сервера в SW — использовать относительные пути и `import.meta.env`.
- Добавлять тяжёлые PWA-зависимости без шага в [implementation-plan.md](implementation-plan.md).

## Чеклист для ИИ

- [ ] Задача относится к PWA (manifest, SW, офлайн, install), а не к обычному React UI.
- [ ] Проверены `package.json` и [config-schema.md](config-schema.md).
- [ ] Учтены HTTPS, scope SW и стратегия обновления кэша.
- [ ] Изменения согласованы с текущим шагом [implementation-plan.md](implementation-plan.md).
