# Tasks

## Current Task

- **Task ID:** `step-readme-learner-guide`
- **Название:** README «с нуля» для ученика
- **Сложность:** Level 2 (Simple Enhancement)
- **Git Branch:** `feat/step-readme-learner-guide`
- **Источник:** docs/project/implementation-plan.md (step-readme-learner-guide)
- **Создано:** 2026-08-07
- **Статус:** PLAN complete → следующий `/build`

### Описание

Расширить README «с нуля»: порядок экранов/разделов, что смотреть в DevTools (Manifest, Service Workers, Cache Storage, Network → Offline), зачем `pnpm build` + `pnpm preview`, ссылка на [pwa-checklist.md](../docs/project/pwa-checklist.md).

**Цель:** Репозиторий понятен без истории Memory Bank.

**Файлы:** `README.md`

**Тесты:** ревью документации (автотесты не обязательны)

**Зависит от:** step-home-lesson-ui, step-sw-lesson-ui, step-install-lesson-ui (все ✅)

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-readme-learner-guide
- [x] PLAN: Детальный план структуры README
- [ ] BUILD: Обновить README.md
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой /close-task

## Implementation Plan

### Complexity

Level 2 — Simple Enhancement (docs-only). Creative-фаза не требуется.

### Technology Stack / Validation

- Документация Markdown; новых зависимостей и изменений конфига нет.
- Стек приложения уже зафиксирован (`package.json`, Vite + `vite-plugin-pwa`).
- Technology validation: **N/A** (только `README.md`).

### Requirements

1. README понятен «с нуля», без Memory Bank.
2. Описать порядок экранов/уроков (источник истины: `src/routes/lessonRoutes.ts`).
3. Указать, что смотреть в DevTools: Manifest, Service Workers, Cache Storage, Network → Offline.
4. Объяснить, зачем `pnpm build` + `pnpm preview` (в т.ч. `base: '/edu.pwa-app/'`).
5. Ссылка на `docs/project/pwa-checklist.md`.
6. Сохранить полезное из текущего README (стек, список docs, IDE).
7. **Главный старт для ученика PWA — `build` + `preview`, не `dev`.**

### Целевая структура README

| #   | Раздел                        | Содержание                                                                                                                                               |
| --- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Введение                      | Цель учебного PWA                                                                                                                                        |
| 2   | Стек                          | React/Vite/TS, **SCSS**, pnpm (исправить устаревшее «CSS»)                                                                                               |
| 3   | **Рекомендуемый старт (PWA)** | `pnpm install` → `pnpm build` → `pnpm preview`; URL `http://localhost:4173/edu.pwa-app/`; кратко почему не только `dev` (SW в dev по умолчанию выключен) |
| 4   | Режим разработки UI           | `pnpm dev` → `:5173` — только UI/уроки/HMR; без полноценной проверки SW/offline/install                                                                  |
| 5   | Экраны-уроки                  | Порядок: Главная → Manifest → Service Worker → Offline → Install → Cache Storage → Storage → Push (+ кратко «зачем»)                                     |
| 6   | Проверка в DevTools           | Application: Manifest / SW / Cache Storage; Network → Offline; на **preview**                                                                            |
| 7   | Сборка и preview (углубление) | Зачем production-сборка; base path; ссылка на `run-and-build.md`                                                                                         |
| 8   | Чеклист PWA                   | Ссылка на `pwa-checklist.md` (Lighthouse, установка)                                                                                                     |
| 9   | Документация                  | Существующий список docs                                                                                                                                 |
| 10  | IDE                           | Как сейчас                                                                                                                                               |

### BUILD steps

1. Переписать/расширить `README.md` по таблице выше.
2. Ревью: ученик без MB понимает путь «install → build → preview → уроки → DevTools → checklist».
3. Проверить относительные ссылки (`docs/project/...`).

### Creative Phases Required

- Нет (порядок разделов задан планом; UI/код не меняются).

### Challenges & Mitigations

| Риск                            | Митигация                                                           |
| ------------------------------- | ------------------------------------------------------------------- |
| Дублирование `pwa-checklist.md` | В README — краткий обзор + ссылка                                   |
| Путаница `dev` vs `preview`     | Рекомендуемый старт = preview; `dev` — отдельный короткий подраздел |
| Устаревание списка экранов      | Опираться на `lessonRoutes.ts`                                      |

### Dependencies

- Экраны-уроки (home, SW, install и остальные) завершены ✅
- `docs/project/pwa-checklist.md`, `run-and-build.md` существуют ✅

## Last Completed Task

- **Task ID:** `step-sw-update-download-progress`
- **Название:** Прогресс загрузки новой версии SW / precache
- **Дата завершения:** 2026-08-12
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-sw-update-download-progress_2026-08-12.md](completed-tasks/2026/08/step-sw-update-download-progress_2026-08-12.md)
