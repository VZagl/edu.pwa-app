# Tasks

## Current Task

- **Task ID:** `step-push-notifications`
- **Название:** Web Push — опциональный урок
- **Git Branch:** `feat/step-push-notifications`
- **Уровень сложности:** Level 3 — Intermediate Feature
- **Тип:** Feature
- **Источник:** docs/project/implementation-plan.md (step-push-notifications)
- **Создано:** 2026-08-07
- **Статус:** CREATIVE complete → готов к `/build`
- **Зависит от:** step-lighthouse-pwa-checklist (закрыта)
- **Creative:** [creative/creative-push-notifications.md](creative/creative-push-notifications.md)

### Описание

Опциональный урок: Web Push (требует backend или mock); только если есть учебная цель и HTTPS. Отдельный раздел или экран по итогам PLAN/CREATIVE.

**Цель:** Понять подписку на push, разрешения уведомлений и роль Service Worker в доставке (учебный сценарий без обязательного продакшен-backend).

**Ожидаемые артефакты:** экран `/push`, хук `usePushNotifications`, `pushLessonData`, `public/sw-push.js` + `importScripts`, unit (моки PushManager / Notification), E2E структуры UI.

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-push-notifications`
- [x] PLAN: Детальный план реализации
- [x] CREATIVE: Дизайн-решения (гибрид + SW importScripts + UX) — см. creative-push-notifications.md
- [ ] BUILD: Реализация по TDD + verify (lint / build / test / e2e)
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Requirements Analysis

### Функциональные

- [ ] Отдельный экран `/push` (navLabel: `Push`) в `lessonRoutes`
- [ ] Учебный контент: что такое Web Push; Notification vs Push; цепочка Permission → subscribe → push-сервис → SW; роль backend; VAPID/HTTPS; Pages ≠ отправитель; Safari/iOS
- [ ] Демо (гибрид): permission, поддержка, subscribe/unsubscribe, локальное `showNotification`; без серверной отправки
- [ ] Ссылка на связанный раздел (Service Worker)
- [ ] Ограничения Safari/iOS — в UI (как в roadmap)

### Нефункциональные

- [ ] Паттерн lesson-ui: hook + `*LessonData` + Screen (BEM) + unit + E2E
- [ ] Без продакшен-backend в репозитории (AGENTS.md / systemPatterns)
- [ ] TDD; verify: lint / typecheck / test / build / e2e
- [ ] Новые npm-зависимости для push-отправки — не добавлять

## Component Analysis

| Компонент                                        | Тип    | Изменения                                                                |
| ------------------------------------------------ | ------ | ------------------------------------------------------------------------ |
| `usePushNotifications`                           | новый  | Permission, support, subscribe/unsubscribe, showLocalNotification, error |
| `PushScreen` + SCSS + `pushLessonData`           | новый  | Intro, цепочка, демо, backend-пояснение, DevTools, лимиты                |
| `lessonRoutes`                                   | правка | `/push`                                                                  |
| App / HomeScreen tests, `lessons-navigation` E2E | правка | 8-й пункт навигации                                                      |
| `public/sw-push.js` + `vite.config.ts`           | новый  | `importScripts`; handlers `push` / `notificationclick`                   |
| Backend                                          | нет    | Не в scope; описан в учебном контенте                                    |

## Technology Stack

| Область     | Выбор                                        | Статус            |
| ----------- | -------------------------------------------- | ----------------- |
| UI          | React 19 + SCSS (BEM), как Storage/Install   | ✅                |
| Сборка      | Vite 8 + `vite-plugin-pwa` (generateSW)      | ✅                |
| Push API    | `Notification` + `PushManager` (браузер)     | ✅ без новых deps |
| SW          | generateSW + `importScripts(['sw-push.js'])` | ✅ CREATIVE       |
| Архитектура | Гибрид (без backend-отправки)                | ✅ CREATIVE       |
| Тесты       | Vitest (моки) + Playwright (структура UI)    | ✅                |

### Technology Validation Checkpoints

- [x] Стек проекта проверен (`package.json`, `vite.config.ts`)
- [x] Новые deps не обязательны
- [x] Build/test-инфра уже работает
- [x] CREATIVE: гибрид вместо backend / pure mock
- [x] CREATIVE: SW через importScripts, не injectManifest

## Creative Decisions (зафиксировано)

| Фаза         | Решение                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| Architecture | Гибрид: живые Permission/Notification + local notify; subscribe без серверной отправки; честный контент про backend |
| SW           | `generateSW` + `public/sw-push.js` через `workbox.importScripts`                                                    |
| UX           | Паттерн Install: бейдж/кнопки/секции; E2E без grant; секция «роль backend»                                          |

Подробно (включая «что / как / зачем / backend»): [creative/creative-push-notifications.md](creative/creative-push-notifications.md)

## Implementation Plan (фазы BUILD)

1. **Хук (TDD)** — `usePushNotifications`: supported, permission, subscription, requestPermission, subscribe/unsubscribe, showLocalNotification; моки в unit
2. **Контент** — `pushLessonData.ts` (смыслы из §0 creative-документа)
3. **Экран** — `PushScreen` (регионы + демо); unit на моке хука
4. **Маршрут** — `lessonRoutes` + правки nav-тестов
5. **SW** — `public/sw-push.js` + `importScripts` в `vite.config.ts`
6. **E2E** — `push-lesson.spec.ts` + шаг в `lessons-navigation`; без обязательного grant
7. **Verify** — `pnpm verify` (или verify:fast + e2e)

## Creative Phases Required

- [x] **Architecture:** гибрид (см. creative-push-notifications.md)
- [x] **SW integration:** generateSW + importScripts
- [x] **UX:** состояния + секции учебного контента

## Challenges & Mitigations

| Риск                        | Митигация                                        |
| --------------------------- | ------------------------------------------------ |
| Нет backend в repo          | Гибрид + секция «роль backend»; не тащить сервер |
| jsdom без Push/Notification | моки в unit хука; экран — мок хука               |
| Permission/E2E хрупкие      | E2E на структуру UI, не на grant                 |
| Safari/iOS ограничения      | секция в UI + roadmap                            |
| Путаница Notification/Push  | явные тексты в intro/API                         |
| Ожидание push с Pages       | текст: Pages = HTTPS, не отправитель             |
| Nav-тесты (8-й пункт)       | сразу обновить App/Home/E2E                      |

## Testing Strategy

- **Unit хука:** supported/unsupported, permission, subscribe/unsubscribe, local notify, ошибки
- **Unit экрана:** регионы, статусы, кнопки на моке хука
- **E2E:** заголовок/регионы/nav; без обязательного реального push
- **Регрессия:** `lessons-navigation`, Home/App nav counts

## Dependencies

- Закрыт: `step-lighthouse-pwa-checklist`
- Разблокирует: `step-github-pages-deploy` (HTTPS для проверки secure context; **не** backend push)
- Паттерн: Storage / Cache Storage / Install
- Документы: `tech-stack-pwa.md`, `implementation-plan.md` §7.2, `creative/creative-push-notifications.md`

---

## Last Completed Task

- **Task ID:** `step-storage-quota-lesson-ui`
- **Название:** Storage quota / Persistent storage — отдельный раздел
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-storage-quota-lesson-ui_2026-08-11.md](completed-tasks/2026/08/step-storage-quota-lesson-ui_2026-08-11.md)
- **Reflection:** [memory-bank/reflection/reflection-step-storage-quota-lesson-ui.md](reflection/reflection-step-storage-quota-lesson-ui.md)
