# Active Context

## Current Focus

`feat/step-install-lesson-ui` — Install — учебный экран

## Current Mode

PLAN → BUILD — планирование завершено, готово к реализации

## Next Steps

1. Запустить `/build` для реализации по плану в `tasks.md`
2. `- [ ] BUILD: Реализация (TDD)`
3. `- [ ] REFLECT: Рефлексия`
4. `- [ ] CLOSE: Финализировать задачу командой /close-task`

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
- Референс по стилю: `ServiceWorkerScreen`, `HomeScreen`, `OfflineScreen` (BEM + `*LessonData.ts`)
- Инфраструктура Install: `useInstallPrompt`, `installFallbackHints`, `InstallBanner` (`step-install-prompt`)
- Текущий экран — заглушка: `src/screens/InstallScreen/InstallScreen.tsx`
- Creative phase не требуется — UI следует паттерну учебных экранов
- Детальный план: `memory-bank/tasks.md` → Implementation Plan
