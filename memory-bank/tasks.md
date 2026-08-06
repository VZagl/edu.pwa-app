# Tasks

## Current Task

- **Task ID:** `step-install-prompt`
- **Название:** Обработка `beforeinstallprompt` и кнопка «Установить»
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-install-prompt`
- **Фаза:** 5 — Установка PWA (Order: 5.1.1)
- **Статус:** VAN — инициализировано, ожидает PLAN
- **Дата создания:** 2026-08-06
- **Источник:** [docs/project/implementation-plan.md](../docs/project/implementation-plan.md) (step-install-prompt)

### Описание

Обработка `beforeinstallprompt` (Chromium): отложенный prompt, кнопка «Установить» в UI. Fallback-текст для Safari/iOS (Add to Home Screen вручную).

### Цель

На поддерживаемых браузерах пользователь может установить приложение из UI.

### Планируемые файлы

- `src/hooks/useInstallPrompt.ts` — хук: перехват события, хранение deferred prompt, вызов установки
- `src/components/InstallBanner/` — баннер с кнопкой «Установить» и fallback-подсказкой

### Тесты

- Unit — хук и баннер при/без `beforeinstallprompt` (моки)
- E2E — видимость UI установки (с оговорками по браузеру)

### Зависимости

- `step-web-app-manifest` — ✅
- `step-vite-plugin-pwa` — ✅

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-install-prompt`
- [ ] PLAN: Составить план реализации (`/plan`)
- [ ] CREATIVE: Дизайн-решения (если потребуется)
- [ ] BUILD: Реализация по TDD (`/build`)
- [ ] REFLECT: Рефлексия (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Last Completed Task

- **Task ID:** `step-offline-lesson-ui`
- **Название:** Экран урока «Offline & Cache»
- **Дата завершения:** 2026-08-06
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-offline-lesson-ui_2026-08-06.md](completed-tasks/2026/08/step-offline-lesson-ui_2026-08-06.md)
- **Reflection:** [memory-bank/reflection/reflection-step-offline-lesson-ui.md](reflection/reflection-step-offline-lesson-ui.md)
