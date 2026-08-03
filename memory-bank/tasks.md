# Tasks

## Current Task

- **Task ID:** `step-web-app-manifest`
- **Название:** Web App Manifest
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-web-app-manifest`
- **Источник:** `memory-bank/backlog.md`, `docs/project/implementation-plan.md` (Order: 2.1.1)
- **Зависит от:** `step-app-shell` ✅

### Цель

DevTools → Application → Manifest без критичных ошибок; иконки отображаются.

### Описание

Добавить `manifest.webmanifest`: `name`, `short_name`, `start_url`, `display` (`standalone` или `minimal-ui`), `theme_color`, `background_color`, `icons`. Подключить в `index.html` (`<link rel="manifest">`). Иконки — `public/icons/` (минимум 192×192 и 512×512). Документировать поля в `config-schema.md`.

### Technology Stack

- **Manifest:** статический JSON в `public/manifest.webmanifest`
- **Иконки:** PNG 192×192 и 512×512 в `public/icons/`
- **Подключение:** `<link rel="manifest">` + `<meta name="theme-color">` в `index.html`
- **Тесты:** Playwright E2E (`request.get` для manifest и иконок)
- **Новые зависимости:** не требуются (Vite копирует `public/` в `dist/` автоматически)

### Technology Validation Checkpoints

- [x] Стек определён (Vite static public, Playwright)
- [x] Зависимости проверены (`package.json` — без изменений)
- [x] Конфигурация сборки валидна (Vite public dir по умолчанию)
- [x] E2E инфраструктура готова (`playwright.config.ts`, `e2e/`)
- [ ] Test build с manifest — на этапе BUILD

### Значения manifest (источник: `config-schema.md`)

| Поле               | Значение                                     |
| ------------------ | -------------------------------------------- |
| `name`             | `edu.pwa-app — учебное PWA`                  |
| `short_name`       | `PWA Lab`                                    |
| `start_url`        | `/`                                          |
| `scope`            | `/`                                          |
| `display`          | `standalone`                                 |
| `theme_color`      | `#646cff`                                    |
| `background_color` | `#ffffff`                                    |
| `lang`             | `ru`                                         |
| `icons`            | `/icons/icon-192.png`, `/icons/icon-512.png` |

`theme_color` в manifest **должен совпадать** с `<meta name="theme-color">`.

### Дизайн иконок (решение PLAN)

**Концепция:** книга с двумя строками текста на «странице» — первая строка `edu`, вторая `PWA`.

**Обоснование:** прямо отражает `edu.pwa-app` (учебное приложение про PWA), метафора книги = обучение.

**Визуальные правила:**

- Книга — простой силуэт (3–4 формы: обложка + страница), без мелких деталей
- Текст: жирный sans-serif, две строки `edu` / `PWA` (регистр как в брендинге проекта)
- Контраст: фиолетовый фон `#646cff` (или градиент к `#863bff` как favicon) + белая книга и тёмный/фиолетовый текст; либо инверсия — светлая страница, текст `#646cff`
- **Критерий приёмки иконки:** читаемость на 48×48 и 192×192; если «PWA» не читается на 192px — fallback: только крупная «edu» на книге
- Maskable safe zone: композиция в центральных ~80%
- `favicon.svg` не менять (вкладка браузера)

**Файлы:** `public/icons/icon-192.png`, `public/icons/icon-512.png`

### Implementation Plan (TDD)

1. **RED — E2E-тест**
   - Создать `e2e/web-app-manifest.spec.ts`:
     - `GET /manifest.webmanifest` → 200
     - JSON содержит MVP-поля: `name`, `short_name`, `start_url`, `display`, `theme_color`, `background_color`, `icons`
     - Массив `icons` включает 192×192 и 512×512
     - `GET /icons/icon-192.png` и `/icons/icon-512.png` → 200
   - `pnpm test:e2e` — тест падает (404)

2. **GREEN — manifest, иконки, HTML**
   - `public/manifest.webmanifest` по `config-schema.md`
   - `public/icons/icon-192.png`, `icon-512.png` — книга + edu/PWA
   - `index.html`: `<link rel="manifest" href="/manifest.webmanifest" />`, `<meta name="theme-color" content="#646cff" />`

3. **GREEN — прогон тестов**
   - `pnpm test:e2e`, `pnpm lint`, `pnpm build`, `pnpm test --run`

4. **Документация**
   - Проверить/уточнить `docs/project/config-schema.md` при необходимости

5. **Ручная проверка**
   - `pnpm preview` → DevTools → Application → Manifest без критичных ошибок

### Creative Phases Required

- [ ] Нет — решения в `config-schema.md` + дизайн иконок зафиксирован выше

### Challenges & Mitigations

| Challenge                    | Mitigation                                           |
| ---------------------------- | ---------------------------------------------------- |
| Читаемость текста на 192×192 | Крупный sans-serif; проверка на 48px; fallback «edu» |
| Синхронизация `theme_color`  | Одно значение `#646cff` в manifest и `<meta>`        |
| Бинарные PNG в git           | Простая flat-графика, без лишних деталей             |
| E2E против preview           | Уже настроено в `playwright.config.ts`               |

### Файлы

- `public/manifest.webmanifest` (новый)
- `public/icons/icon-192.png`, `icon-512.png` (новые)
- `index.html` (изменить)
- `e2e/web-app-manifest.spec.ts` (новый)
- `docs/project/config-schema.md` (уточнить при необходимости)

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-web-app-manifest`
- [x] PLAN: План реализации с TDD-шагами
- [ ] BUILD: `public/manifest.webmanifest` с обязательными полями MVP
- [ ] BUILD: Иконки 192×192 и 512×512 в `public/icons/` (книга + edu/PWA)
- [ ] BUILD: `<link rel="manifest">` и `<meta name="theme-color">` в `index.html`
- [ ] BUILD: E2E — manifest отдаётся по URL с обязательными полями
- [ ] BUILD: Verify — lint, build, test, e2e
- [ ] REFLECT: Рефлексия по задаче
- [ ] ARCHIVE: Архив задачи
- [ ] CLOSE: Финализировать задачу командой `/close-task`

### Оценка

~1–2 ч (PLAN + BUILD для Level 2 без creative).

## Last Completed Task

- **Task ID:** `step-lessons-navigation`
- **Название:** Навигация по учебным разделам
- **Дата завершения:** 2026-08-03
- **Статус:** COMPLETED & ARCHIVED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-lessons-navigation_2026-08-03.md](completed-tasks/2026/08/step-lessons-navigation_2026-08-03.md)
- **Archive:** [memory-bank/archive/archive-step-lessons-navigation.md](archive/archive-step-lessons-navigation.md)
- **Reflection:** [memory-bank/reflection/reflection-step-lessons-navigation.md](reflection/reflection-step-lessons-navigation.md)
