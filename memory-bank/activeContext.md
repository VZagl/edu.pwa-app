# Active Context

## Current Focus

`feat/step-offline-lesson-ui` — REFLECT завершён

## Current Mode

REFLECT → CLOSE (архив пропущен по решению пользователя)

## Next Steps

1. Запустить `/close-task` для финализации задачи

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 4 в процессе — экран урока «Offline & Cache» реализован
- `OfflineScreen` заменён с заглушки на полный урок (intro + стратегии + демо статуса сети)
- `offlineLessonData.ts` — статическое зеркало workbox-конфига
- Verify: lint ✅, build ✅, unit 40 ✅, e2e 11 ✅
