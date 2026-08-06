# Active Context

## Current Focus

`feat/step-install-prompt` — обработка `beforeinstallprompt` и кнопка «Установить»

## Current Mode

PLAN — завершён. Следующий шаг: **BUILD** (creative не требуется)

## Next Steps

1. Запустить `/build` — TDD-реализация:
   - `useInstallPrompt` (хук + unit-тесты)
   - `InstallBanner` (компонент + SCSS + unit-тесты)
   - интеграция в `App.tsx`
   - E2E `e2e/install-prompt.spec.ts`
2. `/reflect` → `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 5 — установка PWA; manifest и SW готовы
- **Паттерны-ориентиры:**
  - `useOnlineStatus` / `useSwUpdate` — хуки с window events
  - `SwUpdateBanner` — fixed bottom PWA-баннер с кнопкой действия
  - `OfflineIndicator` — fixed chip, z-index 110
- **API хука:** `canInstall`, `showFallback`, `fallbackHint`, `isInstalled`, `promptInstall()`
- **Три режима UI:** кнопка (Chromium) / контекстный fallback (Firefox, Safari, прочие) / скрыт (standalone)
- **`installFallbackHints.ts`:** тексты для iOS, Android non-Chromium, Firefox desktop, Safari macOS, generic
- **Grace period ~1 с:** если BIP не пришёл → fallback (даже в Chrome при невыполненных критериях PWA)
- **Размещение:** `InstallBanner` в `App.tsx`, fixed bottom, z-index 105; mobile-first + адаптив tablet/desktop
- UI-конвенции: кнопка «Установить» + fallback (`docs/project/ui-conventions.md`)
- E2E: fallback после grace period; матрица браузеров — ручная проверка в reflection
