# Task Reflection: Web Push — опциональный урок

**Task ID:** `step-push-notifications`  
**Дата рефлексии:** 2026-08-11  
**Ветка:** `feat/step-push-notifications`  
**Complexity:** Level 3 (Intermediate Feature)

## Summary

Добавлен учебный раздел `/push` (navLabel: `Push`): гибридный демо Web Push без продакшен-backend — Permission, subscribe/unsubscribe, локальный `showNotification`, handlers SW `push` / `notificationclick` через `public/sw-push.js` + `workbox.importScripts`. Хук `usePushNotifications`, контент `pushLessonData` (Notification vs Push, цепочка, роль backend, VAPID/HTTPS, Pages ≠ отправитель, Safari/iOS, DevTools), экран `PushScreen` (BEM, паттерн Install). Маршрут в `lessonRoutes` (8-й пункт). TDD: unit хука (моки PushManager/Notification) и экрана (мок хука); E2E структуры UI без обязательного grant. Verify: lint ✅, typecheck ✅, unit 145 ✅, build ✅, e2e 18 ✅.

## 1. Overall Outcome & Requirements Alignment

Все требования из `tasks.md` выполнены:

| Требование                                                            | Статус |
| --------------------------------------------------------------------- | ------ |
| Экран `/push`, navLabel `Push`                                        | ✅     |
| Учебный контент (цепочка, backend, VAPID/HTTPS, Pages, Safari/iOS)    | ✅     |
| Гибрид-демо: permission, support, subscribe/unsubscribe, local notify | ✅     |
| Ссылка на Service Worker                                              | ✅     |
| Паттерн lesson-ui + без backend в repo                                | ✅     |
| `sw-push.js` + `importScripts`, без новых npm-deps                    | ✅     |
| Unit + E2E (без обязательного grant)                                  | ✅     |

Отклонений от PLAN/CREATIVE нет. Архитектурное решение «гибрид» и SW через `importScripts` реализованы как зафиксировано в `creative-push-notifications.md`.

**Оценка:** задача успешна; опциональный урок закрывает учебную цель Web Push в рамках frontend-only политики проекта.

## 2. Planning Phase Review

- PLAN в `tasks.md` совпал с BUILD: 7 фаз (хук → data → экран → routes → SW → E2E → verify).
- Таблица **Challenges & Mitigations** заранее закрыла ключевые риски: нет backend, jsdom, хрупкие Permission/E2E, Safari/iOS, путаница Notification/Push, Pages ≠ отправитель, nav-тесты на 8-й пункт.
- Component Analysis и Technology Stack были точными — новых deps не появилось.
- **Что можно улучшить:** в PLAN явно отметить риск Playwright Permission API (strict vs legacy mock) — проявился в E2E и потребовал точечный фикс.

## 3. Creative Phase Review

- CREATIVE оправдан: Architecture (mock vs backend vs гибрид), SW (`importScripts` vs `injectManifest`), UX (Install-паттерн).
- **Гибрид** — правильный выбор: живые Permission/Notification/subscribe без нарушения AGENTS.md и без ложного «полного» цикла серверной доставки.
- **`generateSW` + `importScripts`** — минимальный diff; DevTools Push работает; offline/install не ломаются; миграция на `injectManifest` не нужна.
- UX-секции и смыслы из §0 creative-документа перенесены в `pushLessonData` / UI без потерь ключевых формулировок.
- Friction points: почти нет; единственный сюрприз — API мока Permission в Playwright (не в CREATIVE).

## 4. Implementation Phase Review

### Что прошло хорошо

- **CREATIVE → BUILD без отклонений** — гибрид, SW, UX реализованы по guidelines.
- **TDD по слоям** — сначала хук на моках браузерных API (11 unit), затем экран на моке хука (6 unit), затем E2E структуры.
- **Паттерн lesson-ui** — как Install/Storage/Cache: hook + `*LessonData` + Screen (BEM) + `lessonRoutes` + nav-регрессия.
- **Нулевые новые зависимости** — только Web Platform API + существующий `vite-plugin-pwa`.
- **Честный учебный контент** — явно разделены Notification vs Web Push и роль backend.

### Сложности

- **jsdom без Push/Notification** — ожидаемо; закрыто моками в unit хука.
- **E2E и Permission** — Playwright в новых версиях требует `browserContext.grantPermissions` / корректный контекст; для урока достаточно структуры UI без grant (митигация из PLAN сработала после фикса).
- **Граница «subscribe ≠ серверная доставка»** — нужна дисциплина копирайтинга; CREATIVE §0 помог удержать формулировки.

## 5. Testing Phase Review

- **Unit хука:** supported/unsupported, permission, subscribe/unsubscribe, local notify, ошибки — покрытие контракта API.
- **Unit экрана:** регионы, статусы, кнопки на моке хука — без браузерных API.
- **E2E:** заголовок/регионы/nav; без обязательного реального push/grant — стабильнее, чем сценарии с permission dialog.
- **Регрессия:** `lessons-navigation`, `App`/`HomeScreen` под 8 пунктов.
- **Пробел (осознанный):** нет автотеста, что `dist/sw.js` реально содержит `importScripts('sw-push.js')` — косвенно через build + ручной DevTools Push.

## What Went Well

1. **CREATIVE до BUILD** — архитектура гибрида и SW-интеграция сняли главный риск scope creep (backend в repo).
2. **Повторяемый lesson-ui шаблон** — ускорил PLAN и реализацию экрана/маршрута/тестов.
3. **Challenges & Mitigations в PLAN** — почти все риски закрыты без сюрпризов; E2E без grant — правильная стратегия.
4. **`importScripts` вместо `injectManifest`** — учебные handlers Push без регрессии precache/offline.
5. **Verify-матрица** — lint / typecheck / unit / build / e2e дали уверенность перед REFLECT.

## Challenges

| Вызов                         | Как решён                                              |
| ----------------------------- | ------------------------------------------------------ |
| Нет backend в repo            | Гибрид + секция «роль backend»; без серверной отправки |
| jsdom без Push/Notification   | Моки в unit хука; экран — мок хука                     |
| Permission/E2E хрупкие        | E2E на структуру UI; точечный фикс Permission API      |
| Safari/iOS ограничения        | Секция в UI + текст из roadmap/creative                |
| Путаница Notification vs Push | Явные блоки в intro/API/`pushLessonData`               |
| Ожидание push с GitHub Pages  | Текст: Pages = HTTPS, не отправитель                   |
| Nav-тесты (8-й пункт)         | Сразу обновлены App/Home/E2E                           |

## Lessons Learned

### Technical

- **Web Push в учебном frontend-only PWA** — максимум ценности даёт гибрид (живые API + честная граница backend), а не pure mock и не мини-сервер в repo.
- **`workbox.importScripts`** — практичный способ добавить `push` / `notificationclick` при `generateSW` без смены стратегии SW.
- **VAPID public в клиенте допустим для демо subscribe**; private и отправка — только вне этого репозитория.
- **E2E для Permission** — тестировать структуру и состояния UI надёжнее, чем реальный grant dialog.

### Process

- Для опциональных PWA-тем с архитектурной развилкой (mock/backend/гибрид + SW) Level 3 + CREATIVE окупается.
- Challenges & Mitigations стоит дополнять конкретными API Playwright/jsdom, если урок трогает Permission/Push.
- Сразу обновлять nav-тесты при добавлении пункта в `lessonRoutes` (подтверждено на 8-м пункте).

### Estimation

- Оценка: ~1 сессия CREATIVE + 1 сессия BUILD (хук/экран/SW/E2E/verify) для Level 3.
- Факт: CREATIVE + BUILD + REFLECT в один день (2026-08-11).
- Variance: в пределах ожидания; шаблон lesson-ui и готовый creative-документ ускорили BUILD.

## Process Improvements

- В PLAN для уроков с Permission/Push явно фиксировать: «E2E = структура UI; grant только вручную / DevTools».
- При CREATIVE по SW сразу фиксировать verify: после build проверить наличие `importScripts` в сгенерированном SW (smoke вручную или assert в будущем).
- Сохранять §0 «учебный контекст» в creative-документах для lesson-ui с плотной теорией — это ускоряет `*LessonData` и снижает дрейф формулировок.

## Technical Improvements

- **Опционально (backlog):** внешний минимальный push-backend (отдельный repo/Cloud Function) — только если появится учебная цель полного цикла.
- **Опционально:** unit/smoke assert, что build подключает `sw-push.js` через importScripts.
- **Документация при `/close-task`:** отметить в implementation-plan / roadmap закрытие `step-push-notifications`; связь с `step-github-pages-deploy` (HTTPS ≠ push-сервер).

## Next Steps

- `/archive` — архивация задачи
- `/close-task` — completed-запись, backlog/progress/roadmap, merge в `develop`
- Следующий по roadmap: `step-github-pages-deploy` (secure context для проверки; **не** backend push)

## Manual Verification Checklist

- [ ] `pnpm build && pnpm preview` — SW active, на `/push` демо permission / local notify
- [ ] DevTools → Application → Service Workers → Push — срабатывает handler из `sw-push.js`
- [ ] Клик по уведомлению — focus/open окна приложения
- [ ] В UI видны секции: цепочка, роль backend, Pages ≠ отправитель, Safari/iOS
- [ ] Subscribe (если secure context + VAPID public) показывает endpoint без обещания серверной доставки
