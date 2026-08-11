# TASK ARCHIVE: Web Push — опциональный урок

## METADATA

| Поле                  | Значение                                                                |
| --------------------- | ----------------------------------------------------------------------- |
| **Task ID**           | `step-push-notifications`                                               |
| **Название**          | Web Push — опциональный урок                                            |
| **Уровень сложности** | Level 3 — Intermediate Feature                                          |
| **Тип**               | Feature                                                                 |
| **Дата создания**     | 2026-08-07                                                              |
| **Дата завершения**   | 2026-08-11                                                              |
| **Дата архивации**    | 2026-08-11                                                              |
| **Статус**            | COMPLETED & ARCHIVED                                                    |
| **Git Branch**        | `feat/step-push-notifications`                                          |
| **Источник**          | `docs/project/implementation-plan.md` (step-push-notifications)         |
| **Зависит от**        | `step-lighthouse-pwa-checklist` ✅                                      |
| **Разблокирует**      | `step-github-pages-deploy` (HTTPS / secure context; **не** push-сервер) |

## SUMMARY

Добавлен учебный раздел `/push` (navLabel: `Push`): гибридный демо Web Push без продакшен-backend — Permission, subscribe/unsubscribe, локальный `showNotification`, handlers SW `push` / `notificationclick` через `public/sw-push.js` + `workbox.importScripts`. Хук `usePushNotifications`, контент `pushLessonData` (Notification vs Push, цепочка, роль backend, VAPID/HTTPS, Pages ≠ отправитель, Safari/iOS, DevTools), экран `PushScreen` (BEM, паттерн Install). Маршрут в `lessonRoutes` (8-й пункт). TDD: unit хука и экрана; E2E структуры UI без обязательного grant. Verify: lint ✅, typecheck ✅, unit 145 ✅, build ✅, e2e 18 ✅.

## REQUIREMENTS

### Функциональные

- Отдельный экран `/push` (navLabel: `Push`) в `lessonRoutes`
- Учебный контент: Web Push; Notification vs Push; цепочка Permission → subscribe → push-сервис → SW; роль backend; VAPID/HTTPS; Pages ≠ отправитель; Safari/iOS
- Демо (гибрид): permission, поддержка, subscribe/unsubscribe, локальное `showNotification`; без серверной отправки
- Ссылка на связанный раздел (Service Worker)
- Ограничения Safari/iOS — в UI

### Нефункциональные

- Паттерн lesson-ui: hook + `*LessonData` + Screen (BEM) + unit + E2E
- Без продакшен-backend в репозитории
- TDD; verify: lint / typecheck / test / build / e2e
- Новые npm-зависимости для push-отправки — не добавлять

## IMPLEMENTATION

### Design Decisions (CREATIVE)

| Фаза         | Решение                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| Architecture | Гибрид: живые Permission/Notification + local notify; subscribe без серверной отправки; честный контент про backend |
| SW           | `generateSW` + `public/sw-push.js` через `workbox.importScripts` (не `injectManifest`)                              |
| UX           | Паттерн Install: бейдж/кнопки/секции; E2E без grant; секция «роль backend»                                          |

Подробно: [creative/creative-push-notifications.md](../creative/creative-push-notifications.md)

### Approach

1. Хук `usePushNotifications` (TDD) — supported, permission, subscription, requestPermission, subscribe/unsubscribe, showLocalNotification
2. Контент `pushLessonData` — смыслы из §0 creative-документа
3. Экран `PushScreen` — регионы + демо (BEM)
4. Маршрут в `lessonRoutes` + обновление nav-тестов (8-й пункт)
5. SW — `public/sw-push.js` + `importScripts` в `vite.config.ts`
6. E2E — структура UI без обязательного grant
7. Verify — полный цикл

### Key Components

| Компонент                                        | Тип    | Назначение                                                               |
| ------------------------------------------------ | ------ | ------------------------------------------------------------------------ |
| `usePushNotifications`                           | новый  | Permission, support, subscribe/unsubscribe, showLocalNotification, error |
| `PushScreen` + SCSS + `pushLessonData`           | новый  | Intro, цепочка, демо, backend, DevTools, лимиты                          |
| `lessonRoutes`                                   | правка | `/push`                                                                  |
| App / HomeScreen tests, `lessons-navigation` E2E | правка | 8-й пункт навигации                                                      |
| `public/sw-push.js` + `vite.config.ts`           | новый  | `importScripts`; handlers `push` / `notificationclick`                   |

### Technology

- React 19 + SCSS (BEM); Vite 8 + `vite-plugin-pwa` (generateSW)
- Web Platform API: `Notification` + `PushManager` — без новых deps
- Vitest (моки) + Playwright (структура UI)

### Key Files

- `src/hooks/usePushNotifications/`
- `src/screens/PushScreen/`
- `public/sw-push.js`, `vite.config.ts` (`importScripts`)
- `src/routes/lessonRoutes.ts`, nav-тесты, `e2e/push-lesson.spec.ts`

## TESTING

### Strategy

- **Unit хука:** supported/unsupported, permission, subscribe/unsubscribe, local notify, ошибки (моки PushManager/Notification)
- **Unit экрана:** регионы, статусы, кнопки на моке хука
- **E2E:** заголовок/регионы/nav; без обязательного реального push/grant
- **Регрессия:** `lessons-navigation`, App/HomeScreen nav counts

### Results

| Проверка  | Результат |
| --------- | --------- |
| lint      | ✅        |
| typecheck | ✅        |
| unit      | ✅ 145    |
| build     | ✅        |
| e2e       | ✅ 18     |

### Осознанный пробел

Нет автотеста, что `dist/sw.js` содержит `importScripts('sw-push.js')` — косвенно через build + ручной DevTools Push.

## LESSONS LEARNED

### Technical

- Web Push в frontend-only PWA: максимум ценности даёт **гибрид**, а не pure mock и не мини-сервер в repo
- `workbox.importScripts` — практичный способ добавить `push` / `notificationclick` при `generateSW`
- VAPID public в клиенте допустим для демо subscribe; private и отправка — вне репозитория
- E2E для Permission: структура UI надёжнее реального grant dialog

### Process

- Для опциональных PWA-тем с развилкой (mock/backend/гибрид + SW) Level 3 + CREATIVE окупается
- Challenges & Mitigations стоит дополнять конкретными API Playwright/jsdom для Permission/Push
- Сразу обновлять nav-тесты при добавлении пункта в `lessonRoutes`

### Future Considerations

- Опционально (backlog): внешний минимальный push-backend — только при учебной цели полного цикла
- Опционально: smoke assert на `importScripts` в сгенерированном SW
- При `/close-task`: отметить закрытие в implementation-plan / roadmap; связь с `step-github-pages-deploy`

## REFERENCES

- **Reflection:** [memory-bank/reflection/reflection-step-push-notifications.md](../reflection/reflection-step-push-notifications.md)
- **Creative:** [memory-bank/creative/creative-push-notifications.md](../creative/creative-push-notifications.md)
- **План:** `docs/project/implementation-plan.md` (step-push-notifications)
- **Roadmap:** `docs/project/product-roadmap.md`
- **Style Guide:** `memory-bank/style-guide.md`, `docs/project/ui-conventions.md`
- **Паттерн:** Install / Storage / Cache Storage lesson-ui
- **Следующий шаг:** `step-github-pages-deploy` (после `/close-task`)
