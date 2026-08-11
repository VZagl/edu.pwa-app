# TASK ARCHIVE: Навигация по учебным разделам

## METADATA

| Поле                  | Значение                                                                       |
| --------------------- | ------------------------------------------------------------------------------ |
| **Task ID**           | `step-lessons-navigation`                                                      |
| **Название**          | Навигация по учебным разделам                                                  |
| **Уровень сложности** | Level 2 — Enhancement с планированием                                          |
| **Дата создания**     | 2026-08-01                                                                     |
| **Дата завершения**   | 2026-08-03                                                                     |
| **Git Branch**        | `feat/step-lessons-navigation`                                                 |
| **Источник**          | `memory-bank/backlog.md`, `docs/project/implementation-plan.md` (Order: 1.1.2) |
| **Зависит от**        | `step-app-shell` ✅                                                            |

## SUMMARY

Добавлена навигация по 5 учебным разделам (Главная + Manifest, Service Worker, Offline, Install). Реализована трёхслойная архитектура: конфиг маршрутов (`lessonRoutes.ts`), экраны-заглушки в `src/screens/`, общий layout (`LessonStubScreen`). Навигация и маршруты рендерятся из единого конфига через `.map()` в `App.tsx`. TDD: расширен `App.test.tsx`, добавлен E2E-сценарий полного цикла по разделам. Verify: lint ✅, build ✅, test (8) ✅, e2e (2) ✅.

## REQUIREMENTS

- Пользователь переключается между учебными разделами через React Router v8
- Каждый раздел — заглушка с названием темы (h2 + paragraph)
- 5 пунктов nav: Главная + 4 раздела курса (EN-термины)
- Активный пункт nav: `aria-current="page"` (не CSS-класс)
- 404 на неизвестном пути — вне nav
- Horizontal scroll nav на узком экране
- TDD: red → green → refactor
- Без creative phase (стандартная навигация)

## IMPLEMENTATION

### Архитектура (три слоя)

| Слой            | Расположение                       | Ответственность                                       |
| --------------- | ---------------------------------- | ----------------------------------------------------- |
| Маршрутизация   | `src/routes/lessonRoutes.ts`       | `path`, `navLabel`, ссылка на `Screen`                |
| Экран урока     | `src/screens/<Name>Screen/`        | title/description (контент растёт на следующих шагах) |
| Каркас заглушки | `src/components/LessonStubScreen/` | временный layout: h2 + paragraph                      |

### Маршруты

| Путь              | navLabel       | Screen                | title h2 (RU)       |
| ----------------- | -------------- | --------------------- | ------------------- |
| `/`               | Главная        | `HomeScreen`          | Добро пожаловать    |
| `/manifest`       | Manifest       | `ManifestScreen`      | Web App Manifest    |
| `/service-worker` | Service Worker | `ServiceWorkerScreen` | Service Worker      |
| `/offline`        | Offline        | `OfflineScreen`       | Офлайн и кэш        |
| `/install`        | Install        | `InstallScreen`       | Установка PWA       |
| `*`               | —              | `NotFoundScreen`      | Страница не найдена |

### Ключевые решения

- **`LessonRoute` с `ComponentType`** — типобезопасный конфиг; рендер `<route.Screen />`
- **`NavLink end={route.path === '/'}`** — корневой маршрут не остаётся active на вложенных путях
- **`NotFoundScreen` вне `lessonRoutes`** — catch-all `path='*'` не попадает в nav
- **Horizontal scroll** — `.app-shell__nav-list`: `overflow-x: auto`, `flex-wrap: nowrap`, `-webkit-overflow-scrolling: touch`
- **Контент в экране, не в конфиге** — `lessonRoutes.ts` только навигация

### Созданные файлы

- `src/routes/lessonRoutes.ts`
- `src/components/LessonStubScreen/LessonStubScreen.tsx`
- `src/screens/HomeScreen/HomeScreen.tsx`
- `src/screens/ManifestScreen/ManifestScreen.tsx`
- `src/screens/ServiceWorkerScreen/ServiceWorkerScreen.tsx`
- `src/screens/OfflineScreen/OfflineScreen.tsx`
- `src/screens/InstallScreen/InstallScreen.tsx`
- `src/screens/NotFoundScreen/NotFoundScreen.tsx`
- `e2e/lessons-navigation.spec.ts`

### Изменённые файлы

- `src/App.tsx` — nav и Routes из `lessonRoutes`; catch-all 404
- `src/App.scss` — horizontal scroll nav
- `src/App.test.tsx` — 6 тестов навигации

### Удалённые файлы

- `src/router-poc.test.tsx` — POC выполнил роль на `step-app-shell`

## TESTING

### Unit/Integration (`App.test.tsx`)

- 5 пунктов nav (Главная + 4 раздела)
- Клик по ссылке → контент раздела (h2) в `main`
- Активный пункт: `aria-current="page"`
- 404 на неизвестном пути

### E2E (`e2e/lessons-navigation.spec.ts`)

- Полный цикл: `/` → `/manifest` → `/service-worker` → `/offline` → `/install` → `/`
- Проверка h2 на каждом шаге; в конце «Добро пожаловать»

### Verify

- `pnpm lint` ✅
- `pnpm build` ✅
- `pnpm test --run` (8 тестов) ✅
- `pnpm test:e2e` (2 spec) ✅

## LESSONS LEARNED

- **PLAN без CREATIVE** достаточен для Level 2 с известным паттерном (nav + stub screens)
- **Наследование паттернов** из `step-app-shell` (`renderApp`, BEM, role-селекторы) ускорило BUILD
- **Чеклист Challenges & Mitigations** в tasks.md — horizontal scroll и разделение слоёв реализованы без сюрпризов
- **Централизованное покрытие навигации** в `App.test.tsx` вместо отдельных тестов для каждой заглушки
- **Следующие шаги** (`step-manifest-lesson-ui`) меняют только папку своего экрана — nav и `lessonRoutes.ts` не трогаются

## REFERENCES

- **Reflection:** [memory-bank/reflection/reflection-step-lessons-navigation.md](../reflection/reflection-step-lessons-navigation.md)
- **Зависимость:** [memory-bank/completed-tasks/2026/07/step-app-shell_2026-08-01.md](../completed-tasks/2026/07/step-app-shell_2026-08-01.md)
- **План:** `docs/project/implementation-plan.md` (step-lessons-navigation, Order: 1.1.2)
- **Следующий шаг:** `step-manifest-lesson-ui`
