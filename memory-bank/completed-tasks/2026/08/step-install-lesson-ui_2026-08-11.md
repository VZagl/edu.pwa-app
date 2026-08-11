# step-install-lesson-ui

- **Название:** Install — учебный экран
- **Дата создания:** 2026-08-07
- **Дата завершения:** 2026-08-11
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Feature

## Задание

Installability, демо `useInstallPrompt`, display-mode, инструкции по платформам.

**Цель:** Раздел Install закрепляет установку PWA в UI, а не только глобальный баннер.

## Результат

Экран «Установка PWA» заменён с `LessonStubScreen` на полноценный учебный раздел: intro, условия installability, живое демо (`useInstallPrompt`: canInstall / fallback / installed), display-mode, инструкции по платформам, DevTools, связь с `InstallBanner`. TDD: 9 unit + E2E. Verify: lint ✅, unit 88 ✅, build ✅, e2e install-lesson ✅.

## Ссылки

- **Архив:** —
- **Рефлексия:** [memory-bank/reflection/reflection-step-install-lesson-ui.md](../../reflection/reflection-step-install-lesson-ui.md)
- **Ветка:** `feat/step-install-lesson-ui`
- **Коммит:** `1882fcc`
