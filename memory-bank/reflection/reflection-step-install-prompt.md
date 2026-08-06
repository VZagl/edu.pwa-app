# Level 2 Enhancement Reflection: Обработка `beforeinstallprompt` и кнопка «Установить»

**Task ID:** `step-install-prompt`  
**Дата рефлексии:** 2026-08-06  
**Ветка:** `feat/step-install-prompt`

## Enhancement Summary

Реализована установка PWA из UI: хук `useInstallPrompt` перехватывает `beforeinstallprompt`, откладывает нативный prompt и предоставляет `promptInstall()`; компонент `InstallBanner` показывает кнопку «Установить» (Chromium) или контекстную fallback-подсказку (Safari/iOS, Firefox, прочие). Три режима UI: install / fallback / hidden (standalone). Чистая функция `getInstallFallbackHint()` выбирает текст по UA только для подсказки, не для логики install. Grace period 1 с перед показом fallback. Контейнер `app-shell__bottom-banners` в `App.tsx` стекирует `InstallBanner` и `SwUpdateBanner` через `flex-direction: column-reverse`. TDD: unit-тесты хука, подсказок и баннера; E2E `install-prompt.spec.ts` на fallback после grace period. Verify: lint ✅, build ✅, unit 59 ✅, e2e 12 ✅.

## What Went Well

- **Разделение install-логики и UA-sniffing** — `beforeinstallprompt` определяет `canInstall`; `installFallbackHints.ts` использует UA только для текста подсказки. Принцип из PLAN соблюдён без исключений.
- **Паттерн `SwUpdateBanner` переиспользован** — fixed bottom, `role="status"`, BEM, safe-area, min 44×44 px на кнопке, `prefers-color-scheme: dark`; BUILD без creative phase.
- **Grace period в хуке** — таймер 1 с с проверкой `deferredPromptRef` перед `showFallback`; поздний BIP переключает с fallback на кнопку (`setShowFallback(false)`).
- **Стекинг баннеров через контейнер** — `app-shell__bottom-banners` с `column-reverse` и `pointer-events: none` на контейнере решает конфликт с `SwUpdateBanner` без сложного z-index offset.
- **TDD по слоям PLAN** — `installFallbackHints` → `useInstallPrompt` → `InstallBanner` → `App.tsx` → E2E; каждый слой с unit-тестами до интеграции.
- **Полифилл `matchMedia` в `vitest.setup.ts`** — единая точка для standalone-детекта в тестах хука и других компонентов.
- **E2E с гибким matcher** — regex на несколько вариантов текста (install + fallback) + условная проверка кнопки «Установить» без flaky клика install в CI.

## Challenges Encountered

- **`beforeinstallprompt` недоступен в unit/E2E CI** — Playwright headless Chromium не гарантирует BIP; programmatic install не тестируется end-to-end.
- **TypeScript не знает `BeforeInstallPromptEvent`** — нужен локальный interface с `prompt()` и `userChoice`.
- **Асинхронность BIP** — синхронная проверка `'onbeforeinstallprompt' in window` недостаточна; даже в Chrome событие может не прийти при невыполненных критериях PWA.
- **iOS standalone-детект** — `navigator.standalone` не в стандартном `Navigator`; расширение типа через intersection.
- **Конфликт позиции с `SwUpdateBanner` и `OfflineIndicator`** — три fixed-bottom элементы (z-index 100 контейнер, offline-chip 110).
- **Длинные fallback-тексты на desktop** — нужен `text-wrap: pretty` и flex layout для переноса без обрезки.

## Solutions Applied

- Unit-тесты: `dispatchEvent` с моком `BeforeInstallPromptEvent` (`preventDefault`, `prompt`, `userChoice`); fake timers для grace period.
- E2E: ожидание активации SW (паттерн `offline-fallback.spec.ts`), затем видимость баннера с regex; кнопка — `if (isVisible)` без реального install.
- Grace period + ref `deferredPromptRef` — fallback только если prompt не сохранён и не standalone.
- `detectIsInstalled()` — `matchMedia('(display-mode: standalone)')` + `navigator.standalone` для iOS.
- Контейнер `app-shell__bottom-banners` вместо индивидуальных z-index offset на каждый баннер.
- `InstallBanner.scss` — `--fallback` модификатор с `text-wrap: pretty`; padding через `max(..., env(safe-area-inset-bottom))`.

## Key Technical Insights

- **Ref для deferred prompt** — state для события не нужен; ref сохраняет объект между render без re-render при сохранении prompt.
- **Grace timer cleanup** — `clearTimeout` в effect cleanup; при unmount не оставляет stale `setShowFallback`.
- **`setShowFallback` с callback** — проверка `deferredPromptRef.current` внутри setter избегает race между таймером и поздним BIP.
- **UA-категории в чистой функции** — порядок проверок важен: iOS → Android non-Chromium → desktop Firefox → desktop Safari → generic.
- **`column-reverse` для bottom stack** — InstallBanner выше SwUpdateBanner в DOM, но визуально install/fallback ближе к краю экрана за счёт reverse flex.
- **`pointer-events: none` на контейнере** — fixed overlay не блокирует клики по контенту вне баннеров.

## Process Insights

- **PLAN с матрицей браузеров** — Challenges & Mitigations в `tasks.md` покрыли все реальные риски BUILD; creative phase не требовалась.
- **Зависимости закрыты** — manifest (`step-web-app-manifest`) и SW (`step-vite-plugin-pwa`) готовы; BUILD свёлся к хуку, баннеру и тестам.
- **Verify-набор полный** — lint → build → unit (59, +19 от step-offline-lesson-ui) → e2e (12, +1).
- **Ручная матрица в reflection, не в E2E** — осознанное ограничение CI; документировано ниже.

## Ручная матрица проверки браузеров

Проверка вручную на реальных устройствах/браузерах (не автоматизирована в CI):

| Среда                              | Ожидание            | Fallback-текст (если применимо)                     |
| ---------------------------------- | ------------------- | --------------------------------------------------- |
| Chrome Android                     | Кнопка «Установить» | —                                                   |
| Chrome desktop (Win/macOS/Linux)   | Кнопка «Установить» | —                                                   |
| Edge desktop / Android             | Кнопка «Установить» | —                                                   |
| Samsung Internet Android           | Кнопка «Установить» | —                                                   |
| Firefox desktop                    | Fallback            | «Нажмите значок установки… или Меню → «Установить»» |
| Firefox Android                    | Fallback            | «Откройте меню браузера (⋮)…»                       |
| Safari iOS (iPhone/iPad)           | Fallback            | «Нажмите «Поделиться» → «На экран Домой»»           |
| Safari macOS                       | Fallback            | «В меню «Файл» выберите «Добавить в Dock»»          |
| Chrome iOS                         | Fallback (WebKit)   | «Поделиться» → «На экран Домой» (категория `ios`)   |
| Уже установленное PWA (standalone) | Баннер скрыт        | —                                                   |

**Чеклист ручной проверки:**

- [ ] Chrome desktop — кнопка «Установить», клик открывает нативный prompt
- [ ] Chrome Android — кнопка «Установить»
- [ ] Firefox desktop — fallback-текст, без кнопки install
- [ ] Safari iOS — fallback «Поделиться»
- [ ] Safari macOS — fallback «Добавить в Dock»
- [ ] После установки (standalone) — баннер не виден
- [ ] При двух баннерах (install + SW update) — оба видны, install выше update

## Action Items for Future Work

- **`/close-task`** — completed-запись, merge в `develop`, убрать из `backlog.md`.
- **Следующий шаг roadmap** — фаза 5, следующий пункт в `implementation-plan.md` после step-install-prompt.
- **Backlog: учебный экран Install** — опционально экран урока про `beforeinstallprompt`, grace period и матрицу браузеров (аналог `OfflineScreen`).
- **Backlog: dismiss после prompt** — при `userChoice.outcome === 'dismissed'` можно не показывать баннер снова (localStorage); не в scope Level 2.

## Time Estimation Accuracy

- Estimated time: ~3–4 ч (PLAN + BUILD TDD + verify)
- Actual time: одна сессия 2026-08-06 (PLAN → BUILD → REFLECT)
- Variance: в пределах оценки
- Reason: паттерны `SwUpdateBanner` / `useSwUpdate` и инфраструктура тестов сократили неопределённость; расширенная матрица fallback добавила объём, но не вышла за оценку
