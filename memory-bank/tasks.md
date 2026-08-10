# Tasks

## Current Task

- **Task ID:** `step-home-lesson-ui`
- **Название:** Главная — учебный экран
- **Создано:** 2026-08-07
- **Сложность:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-home-lesson-ui`
- **Источник:** `docs/project/implementation-plan.md` (Order: 7.0.1)
- **Зависит от:** `step-lessons-navigation` ✅, `step-lighthouse-pwa-checklist` ✅

### Описание

Заполнить экран «Главная» (сейчас `LessonStubScreen`): карта лаборатории — intro учебного PWA, порядок модулей со ссылками (Manifest → SW → Offline → Install и далее новые разделы), краткий чеклист критериев PWA, блок «как пользоваться» (preview, DevTools). Короткий блок **почему нужен HTTPS** (secure context; исключение `localhost`; на GitHub Pages HTTPS из коробки).

**Цель:** Главная — точка входа для ученика, а не заглушка.

**Файлы:** `src/screens/HomeScreen/`, тесты рядом; при необходимости `src/routes/lessonRoutes.ts`

**Тесты:** unit/integration — ключевые блоки и ссылки на разделы; E2E по смыслу

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-home-lesson-ui
- [ ] PLAN: Составить план реализации (`/plan`)
- [ ] BUILD: Реализовать экран по TDD (`/build`)
- [ ] REFLECT: Рефлексия по задаче (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Last Completed Task

- **Task ID:** `step-lighthouse-pwa-checklist`
- **Название:** Чеклист Lighthouse PWA и документирование проверки
- **Дата завершения:** 2026-08-07
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-lighthouse-pwa-checklist_2026-08-07.md](completed-tasks/2026/08/step-lighthouse-pwa-checklist_2026-08-07.md)
- **Reflection:** [memory-bank/reflection/reflection-step-lighthouse-pwa-checklist.md](reflection/reflection-step-lighthouse-pwa-checklist.md)
