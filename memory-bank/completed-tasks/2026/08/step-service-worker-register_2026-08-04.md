# step-service-worker-register

- **Название:** Регистрация Service Worker
- **Дата создания:** 2026-08-03
- **Дата завершения:** 2026-08-04
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Enhancement

## Задание

Учебный этап: **ручной** минимальный SW в `public/sw.js` (install + activate, логирование в консоль). Регистрация из `main.tsx` или `src/pwa/registerSw.ts` с проверкой `'serviceWorker' in navigator`.

**Цель:** SW регистрируется; в DevTools видны install/activate; понятен scope.

**Файлы:** `public/sw.js` (или аналог), `src/pwa/`, `src/main.tsx`

**Тесты:** unit — регистрация вызывается при поддержке SW (мок `navigator.serviceWorker`); E2E/preview — по возможности регистрация в preview

## Результат

Реализована учебная регистрация Service Worker: `public/sw.js` (install/activate + логи), `src/pwa/registerSw.ts` с проверкой `'serviceWorker' in navigator`, вызов из `main.tsx`. TDD: `registerSw.test.ts` — 2 unit-теста с моком `navigator.serviceWorker`. Verify: lint ✅, build ✅, test (16) ✅; `dist/sw.js` в сборке. UI не менялся.

## Ссылки

- **Архив:** —
- **Рефлексия:** memory-bank/reflection/reflection-step-service-worker-register.md
- **Ветка:** feat/step-service-worker-register
- **Коммит:** 192e719
