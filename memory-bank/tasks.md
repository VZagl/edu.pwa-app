# Tasks

## Current Task

- **Task ID:** step-service-worker-register
- **Название:** Регистрация Service Worker
- **Level:** 2 — Simple Enhancement
- **Git Branch:** feat/step-service-worker-register
- **Фаза:** Фаза 3 — Service Worker (Order 3.1.1)
- **Источник:** docs/project/implementation-plan.md
- **Status:** REFLECT complete → готово к /archive

### Цель

SW регистрируется; в DevTools видны install/activate; понятен scope (`/`).

### Description

Учебный этап: ручной минимальный SW в `public/sw.js` (install + activate, логи в консоль). Регистрация из `src/pwa/registerSw.ts` с проверкой `'serviceWorker' in navigator`, вызов из `main.tsx`. Без `vite-plugin-pwa` (следующий шаг плана).

## Complexity

Level: 2  
Type: Enhancement

## Technology Stack

- Framework: React 19 + Vite 8 (уже в проекте)
- SW: ручной `public/sw.js` (без сборки)
- Регистрация: `src/pwa/registerSw.ts` → вызов из `main.tsx`
- Тесты: Vitest + jsdom, мок `navigator.serviceWorker`
- Новые зависимости: нет

## Technology Validation Checkpoints

- [x] Project initialization verified (существующий Vite + pnpm)
- [x] Required dependencies identified — новых не требуется
- [x] Build configuration validated (`vite.config.ts`, `public/` as-is → `/sw.js`)
- [x] Hello world / текущий проект собирается
- [x] Technology validation complete (отдельный PoC не нужен)

## Status

- [x] Initialization complete (VAN)
- [x] Planning complete (PLAN)
- [x] Technology validation complete
- [x] Implementation (BUILD)
- [x] Reflection (REFLECT)
- [ ] Archiving / close-task

## Implementation Plan

1. **Red — unit-тест** `src/pwa/registerSw.test.ts`
   - при поддержке SW → `register` вызывается с `/sw.js`
   - без поддержки → `register` не вызывается
   - мок через `vi.stubGlobal` / подмену `navigator.serviceWorker`
2. **Green — `src/pwa/registerSw.ts`**
   - проверка `'serviceWorker' in navigator`
   - `navigator.serviceWorker.register('/sw.js')`
   - минимальная обработка/логирование ошибки регистрации
3. **Green — `public/sw.js`**
   - обработчики `install` / `activate` + `console.log`
   - без кэширования (следующий шаг фазы)
4. **Интеграция** — вызов `registerSw()` в `src/main.tsx`
5. **Verify** — `pnpm lint`, `pnpm build`, `pnpm test --run`
   - ручная проверка: DevTools → Application → Service Workers (scope `/`)

## Creative Phases Required

- [x] Не требуются (Level 2; путь зафиксирован планом; UI не меняем)

## Files to Create / Modify

| Файл                         | Действие                     |
| ---------------------------- | ---------------------------- |
| `src/pwa/registerSw.test.ts` | создать                      |
| `src/pwa/registerSw.ts`      | создать                      |
| `public/sw.js`               | создать                      |
| `src/main.tsx`               | изменить (вызов регистрации) |

## Dependencies

- Завершённый шаг: step-web-app-manifest / фаза 2 ✅
- Следующий шаг плана (не в scope): step с `vite-plugin-pwa`

## Challenges & Mitigations

- jsdom без реального SW API → только мок в unit-тестах
- SW в `dev` может мешать HMR → учебный шаг допускает регистрацию; основная проверка — DevTools / `preview`
- E2E «по возможности» → не блокирует закрытие задачи

## Build Progress

- **registerSw (TDD):** Complete
  - `src/pwa/registerSw.test.ts` — 2 теста (поддержка SW / без поддержки)
  - `src/pwa/registerSw.ts` — проверка `'serviceWorker' in navigator`, register `/sw.js`, catch ошибок
- **public/sw.js:** Complete — install/activate + console.log
- **main.tsx:** Complete — вызов `registerSw()` при старте
- **Verify:** lint ✅, build ✅, test (16) ✅; `dist/sw.js` присутствует

## Reflection Highlights

- **What Went Well:** TDD red→green; чистое разделение `public/sw.js` / `src/pwa/registerSw.ts` / `main.tsx`; минимальный scope без vite-plugin-pwa
- **Challenges:** jsdom без SW API; SW в dev vs HMR; E2E DevTools не автоматизируется
- **Lessons Learned:** `'serviceWorker' in navigator` + мок через `vi.stubGlobal`; `src/pwa/` как дом для PWA-модулей; `void registerSw()` не блокирует React
- **Next Steps:** `/archive`, `/close-task`, ручная проверка DevTools, следующий шаг — precache / vite-plugin-pwa

**Reflection:** [memory-bank/reflection/reflection-step-service-worker-register.md](reflection/reflection-step-service-worker-register.md)

## Чеклист

- [x] GIT: Работа в feature-ветке feat/step-service-worker-register
- [x] PLAN: Составить план реализации
- [x] BUILD: public/sw.js + src/pwa/registerSw.ts + main.tsx (TDD)
- [x] TEST: unit-тест регистрации (мок navigator.serviceWorker)
- [x] VERIFY: lint, build, pnpm test --run
- [ ] CLOSE: Финализировать задачу командой /close-task

## Last Completed Task

- **Task ID:** `step-manifest-lesson-ui`
- **Название:** Экран урока «Manifest»
- **Дата завершения:** 2026-08-03
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-manifest-lesson-ui_2026-08-03.md](completed-tasks/2026/08/step-manifest-lesson-ui_2026-08-03.md)
- **Reflection:** [memory-bank/reflection/reflection-step-manifest-lesson-ui.md](reflection/reflection-step-manifest-lesson-ui.md)
