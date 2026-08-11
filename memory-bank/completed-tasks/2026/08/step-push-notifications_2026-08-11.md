# step-push-notifications

- **Название:** Web Push — опциональный урок
- **Дата создания:** 2026-08-07
- **Дата завершения:** 2026-08-11
- **Уровень сложности:** Level 3 — Intermediate Feature
- **Тип:** Feature

## Задание

Опциональный урок: Web Push (требует backend или mock); только если есть учебная цель и HTTPS. Отдельный раздел или экран по итогам PLAN/CREATIVE.

## Результат

Добавлен учебный раздел `/push` (navLabel: `Push`): гибридный демо Web Push без продакшен-backend — Permission, subscribe/unsubscribe, локальный `showNotification`, handlers SW `push` / `notificationclick` через `public/sw-push.js` + `workbox.importScripts`. Хук `usePushNotifications`, контент `pushLessonData`, экран `PushScreen` (BEM). Маршрут в `lessonRoutes` (8-й пункт). TDD: unit + E2E структуры UI. Verify: lint ✅, typecheck ✅, unit 145 ✅, build ✅, e2e 18 ✅.

## Ссылки

- **Архив:** [memory-bank/archive/archive-step-push-notifications.md](../../archive/archive-step-push-notifications.md)
- **Рефлексия:** [memory-bank/reflection/reflection-step-push-notifications.md](../../reflection/reflection-step-push-notifications.md)
- **Ветка:** `feat/step-push-notifications`
- **Коммит:** `b132010`
