# Tasks

## Current Task

- **Task ID:** `step-playwright-setup`
- **Название:** Playwright E2E-окружение
- **Источник:** backlog + `docs/project/implementation-plan.md` (Order: 0.1.2)
- **Создано:** 2026-07-24
- **Инициализировано (VAN):** 2026-07-30
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Enhancement / Testing (E2E)
- **Статус:** VAN COMPLETE → ожидание `/plan`
- **Git Branch:** `feat/step-playwright-setup` (из `develop`)

### Описание

Подключить Playwright: зависимости, `playwright.config.ts` (в т.ч. `webServer` на `pnpm preview` или `pnpm dev`), каталог `e2e/`, скрипт `test:e2e`. Smoke E2E: приложение открывается в браузере. Документировать запуск в `run-and-build.md` / guidelines.

**Цель:** `pnpm test:e2e` проходит; можно писать E2E по TDD для пользовательских сценариев.

### Зависимости

- [x] `step-test-environment` — Completed (2026-07-30)

### Файлы (ожидаемые)

- `package.json` — `@playwright/test`, скрипт `test:e2e`
- `playwright.config.ts` — конфиг + `webServer`
- `e2e/` — smoke E2E
- docs: `run-and-build.md` / testing guidelines (при необходимости)

### COMPLEXITY DETERMINATION

```
Assessment:
- Scope: один подсистемный слой (E2E-инфра), без продуктового UI
- Design decisions: умеренные (webServer: preview vs dev — в guidelines предпочтён preview)
- Risk: низкий–умеренный (изолировано от app-кода)
- Effort: часы (аналог step-test-environment)
- Keywords: add / setup / connect

Determination: Level 2 — Simple Enhancement
Workflow: VAN → PLAN → BUILD → REFLECT
```

### Чеклист

- [x] VAN: платформа, Memory Bank, сложность
- [x] GIT: Работа в feature-ветке `feat/step-playwright-setup`
- [ ] PLAN: детальный план реализации
- [ ] BUILD: TDD (smoke E2E) + конфиг + verify
- [ ] REFLECT
- [ ] CLOSE: Финализировать задачу командой `/close-task`

## Last Completed Task

- **Task ID:** `step-test-environment`
- **Название:** Тестовое окружение Vitest
- **Дата завершения:** 2026-07-30
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/07/step-test-environment_2026-07-30.md](memory-bank/completed-tasks/2026/07/step-test-environment_2026-07-30.md)
