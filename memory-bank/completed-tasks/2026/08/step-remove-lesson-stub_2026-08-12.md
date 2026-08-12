# step-remove-lesson-stub

- **Название:** Убрать `LessonStubScreen`, когда все разделы заполнены
- **Дата создания:** 2026-08-07
- **Дата завершения:** 2026-08-12
- **Уровень сложности:** Level 1 — Quick Fix / Cleanup
- **Тип:** Cleanup (удаление мёртвого кода)

## Задание

Удалить `src/components/LessonStubScreen/` и импорты, когда Главная, Service Worker и Install больше не заглушки (как Manifest/Offline). Временный layout из `step-lessons-navigation`; после полных уроков — мёртвый код.

## Результат

Удалён мёртвый компонент `src/components/LessonStubScreen/`. Импортов и тестов на stub в `src/`/`e2e` не было. Verify: lint ✅ · build ✅ · unit 155 ✅ (24 files). Reflect/archive пропущены как избыточные для Level 1 cleanup.

## Ссылки

- **Архив:** —
- **Рефлексия:** —
- **Ветка:** `chore/step-remove-lesson-stub`
- **Коммит:** `301cddb`
