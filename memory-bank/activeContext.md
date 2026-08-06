# Active Context

## Current Focus

`feat/step-install-prompt` — обработка `beforeinstallprompt` и кнопка «Установить»

## Current Mode

VAN — завершён. Следующий шаг: **PLAN**

## Next Steps

1. Запустить `/plan` для детального плана реализации
2. При необходимости — `/creative` (UI баннера, размещение в layout)
3. `/build` — TDD: хук `useInstallPrompt`, компонент `InstallBanner`, unit + E2E
4. `/reflect` → `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 5 — установка PWA; предыдущие шаги (manifest, SW, offline) завершены
- Паттерны для ориентира: `useOnlineStatus` (хук), `OfflineIndicator` (глобальный PWA-баннер)
- UI-конвенции: кнопка «Установить» + подсказка для браузеров без `beforeinstallprompt` (`docs/project/ui-conventions.md`)
- Safari/iOS: install prompt недоступен — показать fallback-текст (Add to Home Screen)
