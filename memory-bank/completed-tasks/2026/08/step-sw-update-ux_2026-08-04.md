# step-sw-update-ux

- **Название:** UX обновления Service Worker
- **Дата создания:** 2026-08-04
- **Дата завершения:** 2026-08-04
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Feature

## Задание

UX при новой версии SW: обнаружение `waiting` worker, баннер «Доступно обновление» + кнопка перезагрузки (`skipWaiting` + `clients.claim` по выбранной стратегии).

**Цель:** Пользователь понимает, как обновляется установленное PWA.

## Результат

Реализован UX обновления PWA: `registerType: 'prompt'` + `virtual:pwa-register`; `swUpdateController.ts` (pub/sub, `immediate: true`) + `useSwUpdate` + `SwUpdateBanner` (fixed bottom bar). Активация через `updateSW(true)` без `skipWaiting`/`clientsClaim` в workbox. Удалён `registerSw.ts`. TDD: 6+4+3 unit-тестов; E2E smoke — баннер скрыт при первой загрузке. Verify: lint ✅, build ✅, test (27) ✅, e2e (9) ✅. Обновлён `docs/project/config-schema.md`.

Пользователь видит баннер «Доступно обновление» с кнопкой «Обновить» при появлении новой версии SW.

## Ссылки

- **Архив:** —
- **Рефлексия:** memory-bank/reflection/reflection-step-sw-update-ux.md
- **Ветка:** feat/step-sw-update-ux
- **Коммит:** f978b27
