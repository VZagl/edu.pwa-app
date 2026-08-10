# Tasks

## Current Task

- **Task ID:** `step-install-lesson-ui`
- **Название:** Install — учебный экран
- **Git Branch:** `feat/step-install-lesson-ui`
- **Уровень сложности:** Level 2
- **Тип:** Enhancement
- **Статус:** PLAN → BUILD
- **Источник:** `docs/project/implementation-plan.md` (step-install-lesson-ui)

### Описание

Заполнить экран «Install»: условия installability, демо на базе `useInstallPrompt` (canInstall / fallback / installed), определение `display-mode` (standalone vs вкладка), инструкции по платформам (Chromium prompt vs iOS/Safari), куда смотреть в DevTools.

**Цель:** Раздел Install закрепляет установку PWA в UI, а не только глобальный баннер.

### Technology Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8 + vite-plugin-pwa
- **Стили:** SCSS (BEM, паттерн `*Screen.scss`)
- **Тесты:** Vitest + Testing Library; Playwright E2E
- **Переиспользование:** `useInstallPrompt`, `installFallbackHints`, `InstallBanner` (без изменений)

### Technology Validation Checkpoints

- [x] Стек определён — новые зависимости не нужны
- [x] `useInstallPrompt` и `installFallbackHints` уже реализованы и покрыты тестами
- [x] Референс-паттерн: `ServiceWorkerScreen`, `OfflineScreen` (`*LessonData.ts` + секции)
- [x] POC не требуется — инфраструктура Install готова (`step-install-prompt`)
- [ ] BUILD: verify после реализации (`pnpm verify:fast`, при необходимости `pnpm test:e2e`)

### Creative Phases Required

- [ ] Нет — UI следует установленному паттерну учебных экранов

### Зависимости

- `step-install-prompt` — ✅ завершён (`useInstallPrompt`, `InstallBanner`)
- `step-lessons-navigation` — ✅ завершён (маршрут `/install`)

### Implementation Plan

#### 1. Данные урока (`installLessonData.ts`)

- Intro-тексты: зачем установка PWA, отличие от глобального `InstallBanner`
- Условия installability: HTTPS/`localhost`, manifest, SW, иконки (кратко из `pwa-checklist.md`)
- Платформенные инструкции: Chromium (`beforeinstallprompt`) vs iOS/Safari vs прочие
- DevTools: Application → Manifest, installability; `pnpm build && pnpm preview`
- Связь с `InstallBanner`: тот же хук `useInstallPrompt`

#### 2. Компонент экрана (`InstallScreen.tsx`)

Секции (по аналогии с `ServiceWorkerScreen`):

1. **Intro** — вводный текст
2. **Условия installability** — чеклист критериев
3. **Демо: статус установки** — живые данные из `useInstallPrompt`:
   - badge: `canInstall` / `fallback` / `installed`
   - кнопка «Установить» при `canInstall`
   - `fallbackHint` при `showFallback`
4. **display-mode** — standalone vs вкладка (`matchMedia('(display-mode: standalone)')`, `navigator.standalone` на iOS)
5. **Инструкции по платформам** — Chromium prompt vs iOS/Safari vs прочие
6. **DevTools** — где смотреть installability
7. **Связь с баннером** — `InstallBanner` использует тот же хук

#### 3. Стили (`InstallScreen.scss`)

- BEM-блок `install-screen` по паттерну `sw-screen` / `offline-screen`
- Badge-состояния, `__fields` (dl), `__section`, `__hint`

#### 4. Тесты (TDD: red → green → refactor)

**Unit (`InstallScreen.test.tsx`):**

- Мок `useInstallPrompt` (как в `ServiceWorkerScreen.test.tsx`)
- Рендер заголовка и intro
- Секции: installability, демо, display-mode, платформы, DevTools
- Состояния: `canInstall` (кнопка), `showFallback` (hint), `isInstalled` (badge)
- Связь с `InstallBanner`

**E2E (`e2e/install-lesson.spec.ts`):**

- `/install` — ключевые регионы и тексты (без реального `beforeinstallprompt`, по аналогии с `sw-lesson.spec.ts`)

#### 5. Verify

- `pnpm lint`
- `pnpm build`
- `pnpm test --run`
- `pnpm test:e2e` (при необходимости)

### Challenges & Mitigations

| Challenge                                     | Mitigation                                                             |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| `beforeinstallprompt` ненадёжен в CI/headless | Мок хука в unit; E2E проверяет структуру UI                            |
| Не дублировать логику `InstallBanner`         | Только переиспользовать `useInstallPrompt`                             |
| display-mode в тестах                         | Мок `window.matchMedia` в unit (паттерн из `useInstallPrompt.test.ts`) |
| Installability в `pnpm dev`                   | Подсказка: `pnpm build && pnpm preview` (как на SW-экране)             |

### Файлы

| Действие   | Путь                                                               |
| ---------- | ------------------------------------------------------------------ |
| Создать    | `src/screens/InstallScreen/installLessonData.ts`                   |
| Заменить   | `src/screens/InstallScreen/InstallScreen.tsx`                      |
| Создать    | `src/screens/InstallScreen/InstallScreen.scss`                     |
| Создать    | `src/screens/InstallScreen/InstallScreen.test.tsx`                 |
| Создать    | `e2e/install-lesson.spec.ts`                                       |
| Не трогать | `useInstallPrompt`, `installFallbackHints`, `InstallBanner`, роуты |

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-install-lesson-ui
- [x] PLAN: Детальный план реализации
- [ ] BUILD: Реализация (TDD)
- [ ] REFLECT: Рефлексия
- [ ] CLOSE: Финализировать задачу командой /close-task

---

## Last Completed Task

- **Task ID:** `step-sw-lesson-ui`
- **Название:** Service Worker — учебный экран
- **Дата завершения:** 2026-08-10
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-sw-lesson-ui_2026-08-10.md](completed-tasks/2026/08/step-sw-lesson-ui_2026-08-10.md)
- **Reflection:** [memory-bank/reflection/reflection-step-sw-lesson-ui.md](reflection/reflection-step-sw-lesson-ui.md)
