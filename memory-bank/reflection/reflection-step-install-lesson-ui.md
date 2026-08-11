# Level 2 Enhancement Reflection: Install — учебный экран

**Task ID:** `step-install-lesson-ui`  
**Дата рефлексии:** 2026-08-11  
**Ветка:** `feat/step-install-lesson-ui`

## Enhancement Summary

Экран «Установка PWA» заменён с `LessonStubScreen` на полноценный учебный раздел: intro (зачем установка, отличие от глобального `InstallBanner`), условия installability (HTTPS/localhost, manifest, SW, иконки), живое демо через `useInstallPrompt` (badge canInstall / fallback / installed, кнопка «Установить», `fallbackHint`), display-mode (`matchMedia('(display-mode: standalone)'`, `navigator.standalone` на iOS), инструкции по платформам (Chromium / iOS Safari / прочие), DevTools и связь с баннером. Контент вынесен в `installLessonData.ts`; инфраструктура Install (`useInstallPrompt`, `installFallbackHints`, `InstallBanner`) не изменялась. TDD: 9 unit-тестов экрана, E2E `e2e/install-lesson.spec.ts`. Verify: lint ✅, typecheck ✅, unit 88 ✅, build ✅, e2e install-lesson ✅.

## What Went Well

- **Структура экрана по плану** — все 7 блоков из PLAN реализованы: intro, installability, демо, display-mode, платформы, DevTools, связь с баннером.
- **Переиспользование без дублирования** — демо и баннер используют один `useInstallPrompt`; логика prompt/fallback не копировалась в экран.
- **Паттерн data + screen** — согласован с `ServiceWorkerScreen` / `OfflineScreen` / `HomeScreen`; BEM-блок `install-screen`, badge и `__fields` по образцу.
- **TDD и покрытие** — мок хука (`vi.hoisted` + `vi.mock`) и `mockDisplayMode` для `matchMedia` / `navigator.standalone`; 9 unit-сценариев (рендер, секции, canInstall / fallback / installed, display-mode, платформы, DevTools, баннер); E2E smoke по регионам без реального `beforeinstallprompt`.
- **UX для dev-режима** — `previewHint` при `import.meta.env.DEV` и в секции DevTools: проверка installability через `pnpm build && pnpm preview`.
- **Доступность** — `role="region"`, `aria-labelledby`, `role="status"` для badge, `aria-label` на кнопке установки.

## Challenges Encountered

- **`beforeinstallprompt` ненадёжен в CI/headless** — живой prompt в E2E недоступен.
- **display-mode в unit-тестах** — нужен контролируемый `matchMedia` и `navigator.standalone`.
- **Installability в `pnpm dev`** — SW/установка в Vite dev отключены или ограничены; демо может показывать «Ожидание…».
- **Не дублировать логику `InstallBanner`** — риск скопировать UI/состояния вместо переиспользования хука.

## Solutions Applied

- Unit: мок `useInstallPrompt` с переключаемыми `canInstall` / `showFallback` / `isInstalled`; E2E проверяет структуру UI и тексты регионов.
- Хелпер `mockDisplayMode(standalone, iosStandalone?)` по паттерну из `useInstallPrompt.test.ts`.
- `previewHint` в `installLessonData.ts`, показ в демо при DEV и в DevTools.
- Только импорт и отображение состояний хука; `InstallBanner`, hints и роуты не трогались.

## Key Technical Insights

- **Учебный экран поверх готовой инфраструктуры** — после `step-install-prompt` достаточно UI + data + тестов экрана; отдельный хук для display-mode не обязателен (достаточно `detectDisplayMode` в модуле экрана).
- **Badge-состояния install** — единая визуальная модель: installed / can-install / fallback / waiting согласуется с баннером и упрощает объяснение статусов в уроке.
- **Мок хука vs мок API** — для экрана достаточно мока `useInstallPrompt`; низкоуровневые события остаются в тестах хука.
- **E2E без install prompt** — проверка `role="region"` и ключевых строк достаточна для smoke урока Install.

## Process Insights

- **Level 2 без creative phase** — эталон `ServiceWorkerScreen` и таблица Challenges & Mitigations в PLAN сократили проектирование.
- **Challenges & Mitigations закрыты в BUILD** — риски CI, display-mode, dev/preview, дублирование баннера были предусмотрены заранее.
- **Verify-матрица** — `pnpm verify:fast` + точечный `pnpm test:e2e e2e/install-lesson.spec.ts` после UI-задачи.
- **Повторяемый шаблон lesson-ui** — Home → Offline → SW → Install: один и тот же цикл PLAN → TDD BUILD → REFLECT ускоряет закрытие stub-экранов.

## Action Items for Future Work

- **`/close-task`** — completed-запись, обновление backlog/progress/roadmap, merge в `develop`.
- **Следующий шаг из плана** — после закрытия Install lesson: задача с выполненными зависимостями (например `step-pwa-audit-summary` / сводный аудит — сверять `implementation-plan.md` при `/close-task`).
- **При доработке Install-демо** — при необходимости вынести `detectDisplayMode` в небольшой хук/утилиту, если display-mode понадобится вне экрана.

## Time Estimation Accuracy

- Estimated time: ~3–4 ч (PLAN + TDD BUILD экрана + verify; без нового хука)
- Actual time: одна сессия PLAN → BUILD (2026-08-10), REFLECT 2026-08-11
- Variance: в пределах оценки
- Reason: эталоны UI и готовая инфраструктура Install; Challenges & Mitigations в PLAN сняли типичные риски заранее
