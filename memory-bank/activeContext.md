# Active Context

## Current Focus

`feat/step-offline-lesson-ui` — экран урока «Offline & Cache»

## Current Mode

PLAN — ожидание детального планирования

## Next Steps

1. Запустить `/plan` для создания плана реализации
2. После плана — `/build` (или `/creative`, если потребуются дизайн-решения)

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 4 в процессе — offline fallback завершён (`step-offline-fallback`)
- Маршрут `/offline` уже есть; `OfflineScreen` — заглушка (`LessonStubScreen`)
- Доступны: `useOnlineStatus`, `OfflineIndicator` (глобальный chip)
- Паттерн урока: `ManifestScreen` (текст + живые данные + тесты + E2E)
- Nav и `lessonRoutes.ts` не менять (маршрут уже зарегистрирован)
