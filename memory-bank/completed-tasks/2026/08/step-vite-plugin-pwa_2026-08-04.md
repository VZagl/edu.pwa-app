# step-vite-plugin-pwa

- **Название:** Подключить vite-plugin-pwa
- **Дата создания:** 2026-08-04
- **Дата завершения:** 2026-08-04
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Enhancement

## Задание

Подключить `vite-plugin-pwa` (Workbox): precache статики из сборки, dev/prod настройки (отключение SW в dev или `devOptions` по доке плагина). Заменить или интегрировать ручной SW из предыдущего шага.

**Цель:** Production-сборка генерирует SW; `pnpm preview` — приложение cacheable.

## Результат

Подключён `vite-plugin-pwa@^1.3.0` с `generateSW` (Workbox precache): production-сборка генерирует `sw.js`, `manifest.webmanifest` и workbox-runtime (11 precache entries). Manifest — единый источник в `vite.config.ts`; плагин инжектирует link/meta в HTML. Удалены `public/sw.js` и `public/manifest.webmanifest`. Регистрация SW сохранена через `registerSw.ts` (`injectRegister: null`). SW в dev отключён. E2E: `e2e/service-worker-pwa.spec.ts` (3 теста). Verify: lint ✅, build ✅, test (16) ✅, e2e (8) ✅. Обновлён `docs/project/config-schema.md`.

## Ссылки

- **Архив:** —
- **Рефлексия:** memory-bank/reflection/reflection-step-vite-plugin-pwa.md
- **Ветка:** feat/step-vite-plugin-pwa
- **Коммит:** ee5bce0
