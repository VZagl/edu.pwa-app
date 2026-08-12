# История изменений

Все важные изменения в проекте документируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Добавлено

- Индикатор прогресса фонового скачивания обновления PWA (precache) в баннере до кнопки «Обновить»

### Изменено

- Быстрее обнаруживается обновление PWA; после «Обновить» кнопка блокируется и показывает «Обновляется…» до перезагрузки

## [1.0.0] - 2026-08-11

Первый релиз учебного Progressive Web App на React + Vite.

### Добавлено

- Базовая оболочка приложения: header, навигация и основная область контента с маршрутизацией React Router
- Навигация по учебным разделам (Главная, Manifest, Service Worker, Offline, Install) с переключением экранов
- Экран урока «Manifest»: объяснение Web App Manifest и отображение живых данных из manifest
- Production Service Worker через vite-plugin-pwa (Workbox precache статики); manifest генерируется из конфигурации сборки
- Баннер «Доступно обновление» при новой версии Service Worker с кнопкой «Обновить» для перезагрузки приложения
- Индикатор offline в правом верхнем углу при отсутствии сети; offline fallback через Service Worker (navigateFallback) и runtime caching
- Экран урока «Офлайн и кэш»: объяснение precache vs runtime, стратегии Workbox и демо статуса сети
- Баннер установки PWA: кнопка «Установить» в Chromium и контекстные подсказки для Safari/iOS/Firefox
- Экран «Главная» — карта лаборатории: intro, модули, краткий чеклист PWA, инструкции по использованию и блок о HTTPS
- Экран урока «Service Worker»: lifecycle, живое демо статуса SW, update flow и учебная кнопка сброса для лаборатории
- Экран урока «Установка PWA»: условия installability, демо `useInstallPrompt`, display-mode, инструкции по платформам и DevTools
- Экран урока «Cache Storage»: описание API и живой список кэшей/URL через Cache Storage
- Экран урока «Storage»: квоты хранилища (`estimate` usage/quota), Persistent Storage (`persisted` / `persist`), лимиты и вытеснение
- Экран урока «Push»: гибридное демо Web Push (Permission, subscribe/unsubscribe, локальные уведомления), учебные секции про цепочку, роль backend, VAPID/HTTPS и Safari/iOS
- Версия приложения в шапке (из package.json, справа от названия)
- Публикация приложения на GitHub Pages (HTTPS): https://vzagl.github.io/edu.pwa-app/

[Unreleased]: https://github.com/VZagl/edu.pwa-app/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/VZagl/edu.pwa-app/releases/tag/v1.0.0
