# step-install-prompt

- **Название:** Обработка `beforeinstallprompt` и кнопка «Установить»
- **Дата создания:** 2026-08-06
- **Дата завершения:** 2026-08-06
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Feature

## Задание

Обработка `beforeinstallprompt` (Chromium): отложенный prompt, кнопка «Установить» в UI. Fallback-текст для Safari/iOS.

**Цель:** На поддерживаемых браузерах пользователь может установить приложение из UI.

## Результат

Реализована установка PWA из UI: хук `useInstallPrompt` (grace period 1 с, BIP, `appinstalled`, standalone-детект), `installFallbackHints` (5 категорий UA + generic), компонент `InstallBanner` (кнопка «Установить» / контекстный fallback / скрыт в standalone). Контейнер `app-shell__bottom-banners` для стекинга с `SwUpdateBanner`. TDD: unit-тесты хука, подсказок и баннера; E2E `install-prompt.spec.ts`. Verify: lint ✅, build ✅, unit 59 ✅, e2e 12 ✅.

Пользователь видит баннер установки: в Chromium — кнопку «Установить», в остальных браузерах — контекстную инструкцию (Safari/iOS, Firefox и др.).

## Ссылки

- **Архив:** —
- **Рефлексия:** memory-bank/reflection/reflection-step-install-prompt.md
- **Ветка:** feat/step-install-prompt
- **Коммит:** 2d7f880
