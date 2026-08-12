# Tasks

## Current Task

- **Task ID:** `step-remove-lesson-stub`
- **Название:** Убрать `LessonStubScreen`, когда все разделы заполнены
- **Создано:** 2026-08-07
- **Git Branch:** `chore/step-remove-lesson-stub`
- **Complexity:** Level 1 — Quick Fix / Cleanup
- **Тип:** Cleanup (удаление мёртвого кода)
- **Статус:** BUILD COMPLETE → готов к `/reflect`
- **Источник:** memory-bank/backlog.md (Идеи)
- **Зависит от:** step-home-lesson-ui, step-sw-lesson-ui, step-install-lesson-ui (все ✅)

### Описание

Удалить `src/components/LessonStubScreen/` — временный layout из `step-lessons-navigation`. Все учебные экраны (Главная, Manifest, SW, Offline, Install и др.) уже заполнены; импортов stub в `src/` нет.

### Чеклист

- [x] GIT: Работа в feature-ветке `chore/step-remove-lesson-stub`
- [x] Удалить `src/components/LessonStubScreen/`
- [x] Убедиться, что импортов/тестов на stub нет
- [x] Verify: `pnpm lint`, `pnpm build`, `pnpm test --run`
- [ ] CLOSE: Финализировать задачу командой /close-task

### Build Results

- Удалён `src/components/LessonStubScreen/LessonStubScreen.tsx` (папка удалена)
- Импортов/тестов на stub в `src/` и `e2e/` нет
- Verify: lint ✅ · build ✅ · unit 155 ✅ (24 files)

## Last Completed Task

- **Task ID:** `step-sw-update-apply-fast`
- **Название:** Быстрое применение обновления PWA по кнопке «Обновить»
- **Дата завершения:** 2026-08-12
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-sw-update-apply-fast_2026-08-12.md](completed-tasks/2026/08/step-sw-update-apply-fast_2026-08-12.md)
- **Reflection:** [memory-bank/reflection/reflection-step-sw-update-apply-fast.md](reflection/reflection-step-sw-update-apply-fast.md)
