# Tasks

## Current Task

- **Task ID:** `step-offline-fallback`
- **Название:** Runtime caching и offline fallback
- **Git Branch:** `feat/step-offline-fallback`
- **Complexity:** Level 3 (Feature)
- **Источник:** docs/project/implementation-plan.md (step-offline-fallback)
- **Создано:** 2026-08-04

### Описание

Runtime caching и offline fallback на уровне SW: `navigateFallback` → SPA из precache (отдельная React-страница «Вы offline» **не нужна** — оболочка уже в кэше). Хук `useOnlineStatus` — источник состояния сети. Отдельный компонент `OfflineIndicator` в правом верхнем углу: виден только в offline, при online не рендерится; пользователь продолжает работать с приложением offline.

### Цель

После первого визита приложение частично работает offline; есть явный offline UX.

### Чеклист

- [ ] GIT: Работа в feature-ветке feat/step-offline-fallback
- [x] PLAN: Детальный план реализации (`/plan`)
- [ ] BUILD: Workbox `navigateFallback` + runtime caching rules в `vite.config.ts`
- [ ] BUILD: Хук `useOnlineStatus`
- [ ] BUILD: Компонент `OfflineIndicator` (правый верхний угол, только offline)
- [ ] BUILD: Unit-тесты (хук, индикатор)
- [ ] BUILD: E2E offline-сценарий
- [ ] BUILD: lint, build, test, e2e
- [ ] REFLECT: Рефлексия (`/reflect`)
- [ ] CLOSE: Финализировать задачу командой /close-task

---

## Requirements

- [x] Offline navigation отдаёт SPA-оболочку через Workbox `navigateFallback` (не отдельная React-страница «Вы offline»)
- [x] Явный offline UX: `OfflineIndicator` в правом верхнем углу, только при offline
- [x] Состояние сети — хук `useOnlineStatus` (`navigator.onLine` + события `online`/`offline`)
- [x] Учебный `runtimeCaching` в дополнение к precache
- [x] `/offline` остаётся заглушкой урока (`step-offline-lesson-ui`), не fallback
- [x] Unit-тесты хука и индикатора; E2E offline-сценарий (где стабильно в CI)

## Technology Stack

- Framework: React 19 + React Router 8
- Build: Vite 8 + `vite-plugin-pwa` ^1.3.0 (Workbox generateSW)
- Language: TypeScript
- Styles: SCSS (mobile-first, CSS-переменные из `index.scss`)
- Tests: Vitest + Testing Library; Playwright E2E против `pnpm preview`
- Network API: `navigator.onLine`, `window` events `online`/`offline`
- **Новые npm-зависимости:** не требуются

## Technology Validation Checkpoints

- [x] Стек PWA уже подключён (`vite-plugin-pwa`, precache, `registerType: 'prompt'`)
- [x] Новые зависимости не нужны
- [x] API сети — стандарт Web Platform
- [x] Preview/E2E инфраструктура отработана (фаза 3)
- [x] Hello-world PoC: N/A — расширение существующего Workbox-конфига

## Status

- [x] Initialization complete (VAN)
- [x] Planning complete (PLAN)
- [x] Technology validation complete
- [x] Creative phases — UI OfflineIndicator зафиксирован (см. ниже)
- [ ] Implementation (BUILD)
- [ ] Reflection
- [ ] Close task

## Components Affected

| Компонент                          | Действие                                                 |
| ---------------------------------- | -------------------------------------------------------- |
| `vite.config.ts`                   | `navigateFallback` + `runtimeCaching`                    |
| `src/hooks/useOnlineStatus/`       | новый хук + unit-тесты (папка по `project-structure.md`) |
| `src/components/OfflineIndicator/` | компонент + SCSS + unit-тесты                            |
| `src/App.tsx`                      | подключить `OfflineIndicator`                            |
| `e2e/offline-fallback.spec.ts`     | новый E2E offline-сценарий                               |
| `src/screens/OfflineScreen/`       | без изменений (урок, не fallback)                        |

## Implementation Plan

### 1. Хук `useOnlineStatus` (TDD: red → green)

- Файлы: `src/hooks/useOnlineStatus/useOnlineStatus.ts`, `useOnlineStatus.test.ts`
- Начальное значение: `navigator.onLine`
- Подписка на `window` `online` / `offline`, cleanup в `useEffect`
- Unit: online по умолчанию; смена через `dispatchEvent`; отписка при unmount

### 2. Компонент `OfflineIndicator` (TDD: red → green)

- Файлы: `OfflineIndicator.tsx`, `OfflineIndicator.scss`, `OfflineIndicator.test.tsx`
- `if (isOnline) return null`
- Реализовать строго по **UI-спецификации** ниже
- Unit: скрыт при online; виден при offline; текст `offline`; `role="status"`; `aria-label="Нет сети"`

### UI-спецификация: `OfflineIndicator`

Композиция: `[●] offline` — слева мягкий красный круг, справа слово `offline`.

**Разметка:**

```tsx
<div className='offline-indicator' role='status' aria-label='Нет сети'>
	<span className='offline-indicator__dot' aria-hidden='true' />
	<span className='offline-indicator__label'>offline</span>
</div>
```

**Круг (CSS `radial-gradient`, без PNG):**

- Размер: `10px` (`0.625rem`), `border-radius: 50%`
- Gradient: яркий центр → затухание к краю:

```scss
background: radial-gradient(
	circle at 50% 50%,
	#ff4d4f 0%,
	#e11d48 45%,
	rgba(225, 29, 72, 0.35) 70%,
	transparent 100%
);
```

- Опционально: лёгкий pulse `opacity` `1 → 0.65 → 1` ~2s; при `prefers-reduced-motion: reduce` — без анимации

**Тема (локальные CSS-переменные компонента):**

| Токен    | Light                               | Dark                                 |
| -------- | ----------------------------------- | ------------------------------------ |
| Фон chip | `rgba(255, 241, 242, 0.95)`         | `rgba(69, 10, 10, 0.9)`              |
| Текст    | `#9f1239`                           | `#fecaca`                            |
| Рамка    | `1px solid rgba(225, 29, 72, 0.35)` | `1px solid rgba(248, 113, 113, 0.4)` |
| Тень     | `0 1px 4px rgba(0,0,0,0.08)`        | `0 1px 6px rgba(0,0,0,0.35)`         |
| Круг     | один gradient на обе темы           | то же                                |

Dark — через `@media (prefers-color-scheme: dark)`. Не использовать фиолетовый accent.

**Позиция и отступы:**

| Параметр             | Mobile                              | ≥768px                     |
| -------------------- | ----------------------------------- | -------------------------- |
| `position`           | `fixed`                             | то же                      |
| `top`                | `var(--space-sm)` (1rem)            | `var(--space-md)` (1.5rem) |
| `right`              | `var(--space-sm)` (1rem)            | `var(--space-md)` (1.5rem) |
| `padding`            | `0.375rem 0.625rem`                 | `0.5rem 0.75rem`           |
| `gap` (круг ↔ текст) | `0.375rem`                          | то же                      |
| `z-index`            | `110` (выше `SwUpdateBanner` = 100) | то же                      |
| Шрифт                | `0.8125rem`, `font-weight: 500`     | то же                      |

Желательно: `top: max(var(--space-sm), env(safe-area-inset-top))` (и аналог для `right` с `safe-area-inset-right`).

### 3. Интеграция в `App.tsx`

- Рядом с `SwUpdateBanner`: `<OfflineIndicator />`

### 4. Workbox в `vite.config.ts`

```ts
workbox: {
  globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
  navigateFallback: 'index.html',
  navigateFallbackDenylist: [/^\/api\//],
  runtimeCaching: [
    {
      urlPattern: /\.json$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'runtime-json',
        networkTimeoutSeconds: 5,
        expiration: { maxEntries: 16, maxAgeSeconds: 24 * 60 * 60 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'runtime-images',
        expiration: { maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
  ],
}
```

- Проверка: `pnpm build`, в `dist/sw.js` — признаки navigateFallback / runtime caching

### 5. E2E `e2e/offline-fallback.spec.ts`

- Online → `goto('/')` → дождаться регистрации SW
- `context.setOffline(true)` → индикатор виден
- Клиентская навигация (напр. `/manifest`) → shell + `main` видны
- `setOffline(false)` → индикатор скрыт
- При нестабильности в CI — `test.skip` + комментарий (testing-guidelines)

### 6. Verify

- `pnpm lint`
- `pnpm build`
- `pnpm test --run`
- `pnpm test:e2e`

## Creative Phases Required

- [x] UI/UX OfflineIndicator — **зафиксирован** (раздел «UI-спецификация: OfflineIndicator» выше)
- [x] ~~Стратегии runtime caching~~ — не требуется (зафиксированы в PLAN по `tech-stack-pwa.md`)
- [x] ~~Архитектура~~ — не требуется

→ **NEXT MODE: BUILD** (`/build`)

## Dependencies

- `step-vite-plugin-pwa` / фаза 3 SW — ✅ завершены
- Feature-ветка `feat/step-offline-fallback` — создана
- Новые пакеты — нет

## Challenges & Mitigations

| Риск                                                         | Митигация                                                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| E2E offline нестабилен в CI                                  | `context.setOffline`; retries Playwright; при необходимости skip + ручная проверка в reflection |
| `navigateFallback` перехватывает non-SPA пути                | `navigateFallbackDenylist: [/^\/api\//]`                                                        |
| Путаница с маршрутом `/offline`                              | Урок (`OfflineScreen`) ≠ SW fallback; в PLAN/BUILD явно разделены                               |
| `implementation-plan.md` ещё упоминает «страницу Вы offline» | Следовать VAN/этому PLAN; правку docs — опционально отдельно                                    |
| Стиль хуков: flat vs folder                                  | Для `useOnlineStatus` — **папка** по `project-structure.md`                                     |

## Last Completed Task

- **Task ID:** `step-sw-update-ux`
- **Название:** UX обновления Service Worker
- **Дата завершения:** 2026-08-04
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-sw-update-ux_2026-08-04.md](completed-tasks/2026/08/step-sw-update-ux_2026-08-04.md)
- **Reflection:** [memory-bank/reflection/reflection-step-sw-update-ux.md](reflection/reflection-step-sw-update-ux.md)
