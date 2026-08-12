# Tasks

## Current Task

- **Task ID:** `step-sw-update-download-progress`
- **Название:** Прогресс загрузки новой версии SW / precache
- **Git Branch:** `feat/step-sw-update-download-progress`
- **Создано:** 2026-08-12
- **Источник:** memory-bank/backlog.md (Идеи)
- **Зависит от:** `step-sw-update-apply-fast` ✅
- **Complexity:** Level 3 — Intermediate Feature
- **Тип:** Enhancement (PWA update UX / precache progress)
- **Статус:** VAN COMPLETE → ожидает `/plan`

### Описание

Опциональный индикатор прогресса скачивания assets новой версии на этапе install/precache (не «процент после клика Обновить»: activate + reload почти мгновенны). Технически — события Workbox / `workbox-window` / сообщения из SW; с текущим `generateSW` + `virtual:pwa-register` может понадобиться CREATIVE и доработка регистрации.

### Чеклист

- [x] GIT: Работа в feature-ветке `feat/step-sw-update-download-progress`
- [ ] PLAN: Детальный план реализации (`/plan`)
- [ ] CREATIVE: Выбор подхода к прогрессу precache и UX (`/creative`)
- [ ] BUILD: Реализация по TDD (`/build`)
- [ ] REFLECT: Рефлексия (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой `/close-task`

## Last Completed Task

- **Task ID:** `step-remove-lesson-stub`
- **Название:** Убрать `LessonStubScreen`, когда все разделы заполнены
- **Дата завершения:** 2026-08-12
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-remove-lesson-stub_2026-08-12.md](completed-tasks/2026/08/step-remove-lesson-stub_2026-08-12.md)
