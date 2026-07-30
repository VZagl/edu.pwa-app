# Tasks

## Current Task

- **Task ID:** `step-playwright-setup`
- **Название:** Playwright E2E-окружение
- **Источник:** backlog + `docs/project/implementation-plan.md` (Order: 0.1.2)
- **Создано:** 2026-07-24
- **Инициализировано (VAN):** 2026-07-30
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Enhancement / Testing (E2E)
- **Статус:** BUILD COMPLETE → ожидание `/reflect`
- **Git Branch:** `feat/step-playwright-setup` (из `develop`)

### Описание

Подключить Playwright: зависимости, `playwright.config.ts` (в т.ч. `webServer` на `pnpm preview` или `pnpm dev`), каталог `e2e/`, скрипт `test:e2e`. Smoke E2E: приложение открывается в браузере. Документировать запуск в `run-and-build.md` / guidelines.

**Цель:** `pnpm test:e2e` проходит; можно писать E2E по TDD для пользовательских сценариев.

### Зависимости

- [x] `step-test-environment` — Completed (2026-07-30)

### Файлы (ожидаемые)

- `package.json` — `@playwright/test`, скрипты `test:e2e`, `test:e2e:install`
- `playwright.config.ts` — конфиг + `webServer`
- `e2e/smoke.spec.ts` — smoke E2E
- docs: `run-and-build.md` (при необходимости — `testing-guidelines-frontend.md`)

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

---

## Technology Stack

| Компонент       | Выбор                        | Обоснование                                                                      |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| E2E-раннер      | `@playwright/test`           | Стек из `testing-guidelines-frontend.md`; версия — latest stable на момент BUILD |
| Браузер (smoke) | Chromium                     | Минимальный набор для CI; Firefox/WebKit — по необходимости в продуктовых шагах  |
| webServer       | `pnpm build && pnpm preview` | Guidelines: preview предпочтителен для PWA; smoke не зависит от HMR-dev          |
| baseURL         | `http://localhost:4173`      | Дефолтный порт Vite preview                                                      |
| Каталог тестов  | `e2e/*.spec.ts`              | Согласовано с guidelines и `project-structure.md`                                |

## Technology Validation Checkpoints (BUILD)

- [x] `@playwright/test` добавлен в `devDependencies` (`pnpm add -D @playwright/test`)
- [x] Браузеры установлены (`pnpm test:e2e:install`)
- [x] `playwright.config.ts` валиден (`pnpm exec playwright test --list`)
- [x] `pnpm build` проходит (webServer зависит от сборки)
- [x] `pnpm test:e2e` — smoke green
- [x] Регрессия: `pnpm test --run`, `pnpm lint`, `pnpm build`

## Creative Phases Required

**Нет.** Стек и предпочтения зафиксированы в `testing-guidelines-frontend.md`; решение «preview + smoke по title/root» — инфраструктурное, не требует CREATIVE.

---

## Implementation Plan

### Принципы (из рефлексии `step-test-environment`)

1. **TDD:** red → green → refactor.
2. **Узкий smoke:** проверка «приложение открылось», **без** привязки к текстам шаблонного UI Vite (`Get started`, счётчик) — они сменятся в `step-app-shell`.
3. **Docs:** обновлять только при фактическом расхождении с guidelines; `run-and-build.md` — убрать оговорку «скрипты могут отсутствовать» после BUILD.

### Шаг 1: RED — smoke E2E до инфраструктуры

- Создать `e2e/smoke.spec.ts`:
  - `describe` / `it` на **русском**
  - `test('должен открыть главную страницу приложения')`:
    - `page.goto('/')`
    - Проверка **title** страницы: `edu.pwa-app` (из `index.html`, стабильно до смены брендинга)
    - Дополнительно: `#root` видим и не пуст (`toBeVisible`, `not.toBeEmpty` или аналог)
  - Селекторы: семантика Playwright (`page.getByRole` при необходимости); для `#root` — `page.locator('#root')`
- Запуск `pnpm test:e2e` → **ожидаемый fail** (нет Playwright / скрипта).

### Шаг 2: GREEN — зависимости и конфиг

**2.1. `package.json`**

- `pnpm add -D @playwright/test`
- Скрипты:
  - `"test:e2e": "playwright test"`
  - `"test:e2e:install": "playwright install chromium"` — установка браузера для E2E (первый запуск, CI, после обновления `@playwright/test`)

**2.2. `playwright.config.ts`** (корень репозитория)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: 'list',
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'pnpm build && pnpm preview',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
```

**Ключевые решения:**

- `webServer.command` включает **build** — preview без `dist/` не поднимется.
- `timeout: 120_000` — запас на `tsc -b && vite build` при cold start.
- Один проект `chromium` — достаточно для smoke фазы 0.
- `reuseExistingServer: !process.env.CI` — локально можно переиспользовать уже запущенный preview.

**2.3. Установка браузеров**

- `pnpm test:e2e:install`

**2.4. Verify GREEN**

- `pnpm test:e2e` → smoke passed.

### Шаг 3: REFACTOR + docs

- Убедиться, что `.gitignore` уже покрывает `playwright-report/`, `test-results/` (есть).
- **`docs/project/run-and-build.md`:** удалить абзац «До закрытия step-test-environment / step-playwright-setup скрипты могут ещё отсутствовать»; добавить `pnpm test:e2e:install` (первый запуск / CI); кратко пояснить, что E2E поднимает preview через webServer (build встроен).
- **`testing-guidelines-frontend.md`:** править **только** если фактический конфиг расходится (ожидание: без правок, как в Vitest-шаге).
- **`memory-bank/techContext.md`:** обновить статус Playwright после BUILD (не в PLAN).

### Шаг 4: BUILD verify (чеклист закрытия BUILD)

- [x] `pnpm test:e2e` — smoke green
- [x] `pnpm test --run` — регрессия Vitest
- [x] `pnpm lint`
- [x] `pnpm build`

### Build Progress

- **RED:** `e2e/smoke.spec.ts` создан; `pnpm test:e2e` → fail (скрипт отсутствовал) ✅
- **GREEN:** `@playwright/test@1.62.0`, `playwright.config.ts`, скрипты `test:e2e` / `test:e2e:install`, Chromium установлен ✅
- **Fix:** Vitest `include: ['src/**/*.{test,spec}...']` — исключить `e2e/` из unit-раннера ✅
- **Docs:** `run-and-build.md`, `techContext.md` обновлены ✅

---

## Challenges & Mitigations

| Вызов                                   | Митигация                                                                                                                   |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Preview требует предварительной сборки  | `webServer.command`: `pnpm build && pnpm preview`; увеличенный `timeout`                                                    |
| Долгий cold start E2E (build + preview) | Приемлемо для smoke; в CI кэш `dist` — вне scope этой задачи                                                                |
| Smoke привязан к шаблонному UI Vite     | Проверять `title` из `index.html` + `#root`, не тексты `App.tsx`                                                            |
| Первая установка без браузеров          | Скрипт `test:e2e:install` в `package.json`; документировать в `run-and-build.md` (`pnpm test:e2e:install` перед первым E2E) |
| Конфликт порта preview                  | Дефолт 4173; при занятости — `reuseExistingServer` локально или явный `--port` в preview (только если воспроизведётся)      |

## Estimated Effort

| Этап                            | Оценка                                    |
| ------------------------------- | ----------------------------------------- |
| RED (smoke spec)                | ~15 мин                                   |
| GREEN (deps + config + install) | ~30–45 мин                                |
| Verify + docs                   | ~15 мин                                   |
| **Итого**                       | ~1–1.5 ч (аналог `step-test-environment`) |

---

### Чеклист

- [x] VAN: платформа, Memory Bank, сложность
- [x] GIT: Работа в feature-ветке `feat/step-playwright-setup`
- [x] PLAN: детальный план реализации
- [x] BUILD: TDD (smoke E2E) + конфиг + verify
- [ ] REFLECT
- [ ] CLOSE: Финализировать задачу командой `/close-task`

## Last Completed Task

- **Task ID:** `step-test-environment`
- **Название:** Тестовое окружение Vitest
- **Дата завершения:** 2026-07-30
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/07/step-test-environment_2026-07-30.md](memory-bank/completed-tasks/2026/07/step-test-environment_2026-07-30.md)
