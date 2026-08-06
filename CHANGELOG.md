# История изменений

Все важные изменения в проекте документируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Добавлено

- Базовая оболочка приложения: header, навигация и основная область контента с маршрутизацией React Router
- Навигация по учебным разделам (Главная, Manifest, Service Worker, Offline, Install) с переключением экранов
- Экран урока «Manifest»: объяснение Web App Manifest и отображение живых данных из manifest
- Production Service Worker через vite-plugin-pwa (Workbox precache статики); manifest генерируется из конфигурации сборки
- Баннер «Доступно обновление» при новой версии Service Worker с кнопкой «Обновить» для перезагрузки приложения
- Индикатор offline в правом верхнем углу при отсутствии сети; offline fallback через Service Worker (navigateFallback) и runtime caching
