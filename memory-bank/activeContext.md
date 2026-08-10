# Active Context

## Current Focus

`feat/step-install-lesson-ui` — Install — учебный экран

## Current Mode

VAN → PLAN — инициализация завершена, ожидается планирование

## Next Steps

1. Запустить `/plan` для детального плана
2. `- [ ] PLAN: Детальный план реализации`
3. `- [ ] CLOSE: Финализировать задачу командой /close-task`

## Context for AI

- Учебное PWA на React + Vite; менеджер пакетов — pnpm
- План шагов: `docs/project/implementation-plan.md`
- Дорожная карта: `docs/project/product-roadmap.md`
- Референс по стилю: `ServiceWorkerScreen`, `HomeScreen`, `OfflineScreen` (BEM + `*LessonData.ts`)
- Инфраструктура Install: `useInstallPrompt`, `installFallbackHints`, `InstallBanner` (`step-install-prompt`)
- Текущий экран — заглушка: `src/screens/InstallScreen/InstallScreen.tsx`
