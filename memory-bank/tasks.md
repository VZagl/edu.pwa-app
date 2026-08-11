# Tasks

## Current Task

- **Task ID:** `step-github-pages-deploy`
- **Название:** Деплой на GitHub Pages
- **Git Branch:** `feat/step-github-pages-deploy`
- **Уровень сложности:** Level 3 — Intermediate Feature
- **Тип:** Feature / Infrastructure
- **Источник:** docs/project/implementation-plan.md (step-github-pages-deploy)
- **Создано:** 2026-08-07
- **Статус:** REFLECT complete → ожидание `/archive`
- **Reflection:** [memory-bank/reflection/reflection-step-github-pages-deploy.md](reflection/reflection-step-github-pages-deploy.md)
- **Creative doc:** [memory-bank/creative/creative-github-pages-deploy.md](creative/creative-github-pages-deploy.md)
- **Зависит от:** step-push-notifications (закрыта)

### Описание

Деплой учебного PWA на **GitHub Pages** (HTTPS): настроить `base` в Vite под путь репозитория (если project site), GitHub Actions (`pnpm build` → publish `dist`), проверить manifest/SW/offline/install уже на `https://…`. Обновить `docs/project/run-and-build.md` и при необходимости `docs/project/pwa-checklist.md` секцией про проверку на Pages.

**Цель:** Приложение доступно по HTTPS; PWA-сценарии воспроизводимы вне localhost.

**Ожидаемый URL (project site):** `https://vzagl.github.io/edu.pwa-app/` (remote: `VZagl/edu.pwa-app`)

**Ожидаемые артефакты:** правки `vite.config.ts` (base + пути manifest/PWA), `.github/workflows/` (deploy), обновления docs; ручная проверка на Pages; регрессия unit/E2E на preview.

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-github-pages-deploy`
- [x] PLAN: Детальный план реализации
- [x] CREATIVE: Дизайн-решения (base / workflow / PWA paths) → `memory-bank/creative/creative-github-pages-deploy.md`
- [x] BUILD: Реализация + verify (lint / build / test; e2e при необходимости)
- [x] REFLECT: Рефлексия по задаче → `memory-bank/reflection/reflection-step-github-pages-deploy.md`
- [ ] ARCHIVE: Архивация документации
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Requirements Analysis

### Функциональные

- [x] Production-сборка деплоится на GitHub Pages по HTTPS _(workflow готов; первый деплой — после enable Pages + merge/dispatch)_
- [x] Vite `base` корректен для project site (`/<repo>/`)
- [x] Manifest, SW, иконки и роутер работают под этим `base`
- [x] CI: `pnpm build` → publish `dist/` через GitHub Actions
- [x] Docs: секция деплоя в `run-and-build.md`; при необходимости — проверка на Pages в `pwa-checklist.md`

### Нефункциональные

- [x] Регрессия: lint / typecheck / unit / build; E2E на preview
- [x] Без новых npm-зависимостей (только Actions + конфиг)
- [x] Учебный характер: пути и деплой понятны из docs

### Технические ограничения

- Default remote branch: `develop` (не `main`) — влияет на trigger workflow
- В `package.json`: `preinstall` → только pnpm; CI не должен использовать npm
- Сейчас: `base` не задан; `.github/workflows/` отсутствует; абсолютные `/…` в manifest/icons/`fetchManifest`/push icons
- `BrowserRouter` без `basename`

---

## Component Analysis

| Компонент                                     | Изменения                                                                  | Зависимости    |
| --------------------------------------------- | -------------------------------------------------------------------------- | -------------- |
| `vite.config.ts`                              | `base`; `start_url` / `scope` / icons без абсолютных `/…`                  | Решение C1, C3 |
| `src/main.tsx`                                | `BrowserRouter basename={import.meta.env.BASE_URL}`                        | C1, C3         |
| `src/screens/ManifestScreen/fetchManifest.ts` | URL через `import.meta.env.BASE_URL`                                       | C3             |
| `public/sw-push.js`, `usePushNotifications`   | иконки уведомлений с учётом base                                           | C3             |
| Учебные тексты SW/scope                       | убрать жёсткий «scope = `/`», если после base scope станет `/edu.pwa-app/` | C3             |
| `.github/workflows/deploy.yml` (новый)        | pnpm + Pages (не npm из примера Vite)                                      | C2             |
| `docs/project/run-and-build.md`               | деплой, URL, включение Pages                                               | C1, C2         |
| `docs/project/pwa-checklist.md`               | секция проверки на HTTPS Pages                                             | —              |
| Тесты Manifest / fetchManifest                | ожидания URL с base / относительными путями                                | C3             |

---

## Technology Stack

| Область               | Выбор                                                                         |
| --------------------- | ----------------------------------------------------------------------------- |
| Сборка                | Vite 8 (`base`, `import.meta.env.BASE_URL`)                                   |
| PWA                   | `vite-plugin-pwa` 1.x (уже в проекте)                                         |
| Роутинг               | React Router 8 + `basename`                                                   |
| CI/CD                 | GitHub Actions + `configure-pages` / `upload-pages-artifact` / `deploy-pages` |
| Пакеты                | **pnpm** (`pnpm/action-setup` + cache)                                        |
| Новые npm-зависимости | **нет**                                                                       |

### Technology Validation Checkpoints

- [x] Стек определён (существующий + официальный Vite Pages flow)
- [x] Новых npm-зависимостей нет
- [x] Конфиг сборки уже валиден локально (`pnpm build`)
- [x] Hello-world деплоя = адаптация Vite static-deploy под pnpm + `base` — в BUILD
- [x] Test build с `base` — в BUILD после CREATIVE

---

## Implementation Plan (фазы BUILD)

### Phase 1 — Base + PWA paths (после CREATIVE)

1. [x] Применить решение C1 (`base` в `vite.config.ts`)
2. [x] Выровнять manifest: `start_url`, `scope`, icons (C3)
3. [x] `BrowserRouter` + `basename={import.meta.env.BASE_URL}`
4. [x] `fetchManifest` через `BASE_URL`
5. [x] Иконки в push (`sw-push.js`, `usePushNotifications`)
6. [x] Обновить lesson copy / unit-тесты, завязанные на `/` и абсолютные пути

### Phase 2 — GitHub Actions

1. [x] Создать `.github/workflows/deploy.yml` по решению C2
2. [x] pnpm setup + install + `pnpm build`
3. [x] Upload `dist/` + deploy-pages; permissions + concurrency

### Phase 3 — Docs

1. [x] `run-and-build.md`: URL, Settings → Pages → GitHub Actions, локальная проверка с `base`
2. [x] `pwa-checklist.md`: чеклист на `https://…/edu.pwa-app/`
3. [x] README learner guide — **не** в scope (отдельный `step-readme-learner-guide`)

### Phase 4 — Verify

1. [x] `pnpm verify:fast` (+ e2e при необходимости)
2. [ ] После merge / `workflow_dispatch`: ручная проверка Pages (manifest, SW, offline, install)

---

## Build Results (2026-08-11)

| Проверка              | Результат                              |
| --------------------- | -------------------------------------- |
| `pnpm verify:fast`    | ✅ lint + typecheck + 145 unit + build |
| `pnpm test:e2e`       | ✅ 18 passed (baseURL `/edu.pwa-app/`) |
| Новые npm-зависимости | нет                                    |

**Замечания BUILD:** Playwright `baseURL` обновлён под nested path; E2E `href` учитывает basename; в docs уточнено отличие Pages репозитория от `github.com/settings/pages`.

---

## Creative Phases Required

Документ: `memory-bank/creative/creative-github-pages-deploy.md`

| ID  | Тема                   | Решение                                                             | Статус |
| --- | ---------------------- | ------------------------------------------------------------------- | ------ |
| C1  | Стратегия `base`       | **A** — `base: '/edu.pwa-app/'`                                     | [x]    |
| C2  | Workflow trigger       | **B + dispatch** — `develop` + `workflow_dispatch`; pnpm (не npm)   | [x]    |
| C3  | Выравнивание PWA-путей | **C** — гибрид: relative manifest · `BASE_URL` в app · `scope` в SW | [x]    |

Подробности: [creative-github-pages-deploy.md](creative/creative-github-pages-deploy.md)

---

## Testing Strategy

- **Unit:** `fetchManifest`, манифест-фикстуры; тексты scope — по факту изменений
- **E2E:** регрессия на preview (`localhost:4173`)
- **Ручная:** Pages HTTPS + Application + офлайн/install
- **E2E против Pages:** опционально (как в implementation-plan)

---

## Dependencies

- Закрыта: `step-push-notifications`
- Внешние: GitHub Pages включён (Settings → Pages → GitHub Actions) — ручной шаг владельца репо
- Docs Vite: [static-deploy / GitHub Pages](https://vite.dev/guide/static-deploy)

---

## Challenges & Mitigations

| Challenge                                                             | Mitigation                                                       |
| --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Absolute `/icons/…`, `start_url`, `fetchManifest` ломают project site | C3 + правки в BUILD                                              |
| `BrowserRouter` без basename                                          | `basename={import.meta.env.BASE_URL}`                            |
| Default branch = `develop`, Vite-пример — `main`                      | C2                                                               |
| CI на npm сломает `only-allow pnpm`                                   | `pnpm/action-setup`                                              |
| E2E на `localhost:4173` без учёта base                                | preview с тем же `base`; baseURL Playwright не трогать без нужды |
| Ручной enable Pages в Settings                                        | зафиксировать в docs; первый деплой может требовать ручного шага |

---

## Status

- [x] Initialization complete (VAN)
- [x] Planning complete (PLAN)
- [x] Creative phases complete
- [x] Technology validation complete (полное — после BUILD с `base` + workflow)
- [x] Implementation complete
- [x] Reflection complete
- [ ] Archive complete

## Reflection Highlights

- **What Went Well**: CREATIVE C1–C3 до BUILD; гибрид путей без хардкода репо в runtime; workflow `develop`+pnpm; verify на nested path; docs Pages
- **Challenges**: absolute paths ripple; Playwright baseURL/href; ручной enable Pages
- **Lessons Learned**: `BASE_URL` + `registration.scope` как канон project site; при смене Vite `base` сразу планировать E2E paths
- **Next Steps**: `/archive` → `/close-task`; merge/dispatch + ручная проверка HTTPS Pages

---

## Last Completed Task

- **Task ID:** `step-app-version-header`
- **Название:** Версия приложения в header
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-app-version-header_2026-08-11.md](completed-tasks/2026/08/step-app-version-header_2026-08-11.md)
- **Reflection:** [memory-bank/reflection/reflection-step-app-version-header.md](reflection/reflection-step-app-version-header.md)
