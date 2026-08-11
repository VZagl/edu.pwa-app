# Tasks

## Current Task

- **Task ID:** `step-push-notifications`
- **Название:** Web Push — опциональный урок
- **Git Branch:** `feat/step-push-notifications`
- **Уровень сложности:** Level 3 — Intermediate Feature
- **Тип:** Feature
- **Источник:** docs/project/implementation-plan.md (step-push-notifications)
- **Создано:** 2026-08-07
- **Статус:** PLAN complete → ожидание `/creative`
- **Зависит от:** step-lighthouse-pwa-checklist (закрыта)

### Описание

Опциональный урок: Web Push (требует backend или mock); только если есть учебная цель и HTTPS. Отдельный раздел или экран по итогам PLAN/CREATIVE.

**Цель:** Понять подписку на push, разрешения уведомлений и роль Service Worker в доставке (учебный сценарий без обязательного продакшен-backend).

**Ожидаемые артефакты:** экран/раздел Push (по итогам PLAN/CREATIVE), хук/хелперы подписки (моки), маршрут в `lessonRoutes`, unit (моки PushManager / Notification); E2E — по учебной необходимости.

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-push-notifications`
- [x] PLAN: Детальный план реализации
- [ ] CREATIVE: Дизайн-решения (mock vs backend, UX подписки, SW)
- [ ] BUILD: Реализация по TDD + verify (lint / build / test / e2e)
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Requirements Analysis

### Функциональные

- [ ] Отдельный экран `/push` (navLabel: `Push`) в `lessonRoutes`
- [ ] Учебный контент: Permission API, `PushManager`, роль SW (`push` / `notificationclick`), VAPID/HTTPS
- [ ] Демо: статус permission, поддержка Push, подписка/отписка (через моки или учебный сценарий — решение в CREATIVE)
- [ ] Ссылка на связанный раздел (Service Worker)
- [ ] Ограничения Safari/iOS — в UI (как в roadmap)

### Нефункциональные

- [ ] Паттерн lesson-ui: hook + `*LessonData` + Screen (BEM) + unit + E2E
- [ ] Без продакшен-backend в репозитории (AGENTS.md / systemPatterns)
- [ ] TDD; verify: lint / typecheck / test / build / e2e
- [ ] Новые npm-зависимости — только если CREATIVE явно потребует

## Component Analysis

| Компонент                                        | Тип        | Изменения                                                    |
| ------------------------------------------------ | ---------- | ------------------------------------------------------------ |
| `usePushNotifications`                           | новый      | Permission, поддержка, subscribe/unsubscribe, состояние      |
| `PushScreen` + SCSS + `pushLessonData`           | новый      | Intro, API, демо, DevTools, лимиты платформ                  |
| `lessonRoutes`                                   | правка     | `/push`                                                      |
| App / HomeScreen tests, `lessons-navigation` E2E | правка     | 8-й пункт навигации                                          |
| Service Worker (vite-plugin-pwa)                 | возможно   | handlers `push` / `notificationclick` — после CREATIVE       |
| Backend                                          | нет в repo | mock / локальный Notification / опц. внешний mock — CREATIVE |

## Technology Stack

| Область  | Выбор                                                                             | Статус                     |
| -------- | --------------------------------------------------------------------------------- | -------------------------- |
| UI       | React 19 + SCSS (BEM), как Storage/Install                                        | ✅ уже в проекте           |
| Сборка   | Vite 8 + `vite-plugin-pwa` (generateSW)                                           | ✅ `pnpm build`            |
| Push API | `Notification` + `PushManager` (браузер)                                          | ✅ без новых deps при mock |
| SW       | Workbox; кастомные push-handlers — CREATIVE (`injectManifest` vs `importScripts`) | ⏳ CREATIVE                |
| Тесты    | Vitest (моки PushManager/Notification) + Playwright                               | ✅                         |

### Technology Validation Checkpoints

- [x] Стек проекта проверен (`package.json`, `vite.config.ts`)
- [x] Новые deps не обязательны для mock-урока
- [x] Build/test-инфра уже работает
- [ ] POC реальной подписки Push — только после решения CREATIVE (mock vs backend)
- [ ] Конфиг SW под push — после CREATIVE

## Implementation Plan (фазы BUILD)

1. **Хук (TDD)** — `usePushNotifications`: supported, permission, subscription snapshot, requestPermission, subscribe/unsubscribe; моки в unit
2. **Контент** — `pushLessonData.ts` (intro, API, DevTools, лимиты iOS/Safari, HTTPS)
3. **Экран** — `PushScreen` (регионы + демо); unit на моке хука
4. **Маршрут** — `lessonRoutes` + правки nav-тестов
5. **SW (по CREATIVE)** — handlers / mock-доставка; без лишнего scope
6. **E2E** — `push-lesson.spec.ts` + шаг в `lessons-navigation`; без обязательного grant permission
7. **Verify** — `pnpm verify` (или verify:fast + e2e)

## Creative Phases Required

- [ ] **Architecture:** mock-подписка vs минимальный backend vs гибрид (local `Notification` + mock `PushSubscription`)
- [ ] **SW integration:** остаться на generateSW + доп. код vs `injectManifest`
- [ ] **UX:** состояния default/granted/denied/unsupported, кнопки, тексты про HTTPS/VAPID/iOS

## Challenges & Mitigations

| Риск                        | Митигация                                                 |
| --------------------------- | --------------------------------------------------------- |
| Нет backend в repo          | CREATIVE → mock/гибрид; не тащить сервер без учебной цели |
| jsdom без Push/Notification | моки в unit хука; экран — мок хука                        |
| Permission/E2E хрупкие      | E2E на структуру UI, не на grant                          |
| Safari/iOS ограничения      | секция в UI + roadmap                                     |
| SW: generateSW без push     | CREATIVE до BUILD SW-части                                |
| Nav-тесты (8-й пункт)       | сразу обновить App/Home/E2E                               |

## Testing Strategy

- **Unit хука:** supported/unsupported, permission, subscribe/unsubscribe, ошибки
- **Unit экрана:** регионы, статусы, кнопки на моке хука
- **E2E:** заголовок/регионы/nav; без обязательного реального push
- **Регрессия:** `lessons-navigation`, Home/App nav counts

## Dependencies

- Закрыт: `step-lighthouse-pwa-checklist`
- Разблокирует: `step-github-pages-deploy` (HTTPS для реального Push)
- Паттерн: Storage / Cache Storage / Install
- Документы: `tech-stack-pwa.md`, `implementation-plan.md` §7.2

---

## Last Completed Task

- **Task ID:** `step-storage-quota-lesson-ui`
- **Название:** Storage quota / Persistent storage — отдельный раздел
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-storage-quota-lesson-ui_2026-08-11.md](completed-tasks/2026/08/step-storage-quota-lesson-ui_2026-08-11.md)
- **Reflection:** [memory-bank/reflection/reflection-step-storage-quota-lesson-ui.md](reflection/reflection-step-storage-quota-lesson-ui.md)
