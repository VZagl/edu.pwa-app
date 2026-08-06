# Active Context

## Current Focus

`feat/step-offline-lesson-ui` — экран урока «Offline & Cache»

## Current Mode

BUILD — реализация по TDD

## Next Steps

1. Запустить `/build` для реализации экрана урока
2. После BUILD — `/reflect`, затем `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 4 в процессе — offline fallback завершён (`step-offline-fallback`)
- Маршрут `/offline` уже есть; `OfflineScreen` — заглушка (`LessonStubScreen`) → заменить полным уроком
- Доступны: `useOnlineStatus`, `OfflineIndicator` (глобальный chip)
- Паттерн урока: `ManifestScreen` (текст + данные + тесты + E2E)
- Nav и `lessonRoutes.ts` не менять (маршрут уже зарегистрирован)
- Creative phase не требуется — UI по образцу `ManifestScreen`
