# Active Context

## Current Focus

`feat/step-install-prompt` — BUILD завершён ✅

## Current Mode

BUILD — завершён. Следующий шаг: **REFLECT**

## Next Steps

1. Запустить `/reflect` — рефлексия по задаче (включая ручную матрицу браузеров)
2. `/close-task` — финализация задачи

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
