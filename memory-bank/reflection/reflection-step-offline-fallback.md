# Task Reflection: Runtime caching и offline fallback

**Task ID:** `step-offline-fallback`  
**Дата рефлексии:** 2026-08-06  
**Ветка:** `feat/step-offline-fallback`  
**Complexity:** Level 3 (Feature)

## Summary

Реализован offline fallback на уровне Service Worker и явный offline UX в React. Workbox: `navigateFallback: 'index.html'` с `navigateFallbackDenylist: [/^\/api/]` и учебный `runtimeCaching` (NetworkFirst для `.json`, StaleWhileRevalidate для изображений). Хук `useOnlineStatus` (`navigator.onLine` + события `online`/`offline`) в папке `src/hooks/useOnlineStatus/`. Компонент `OfflineIndicator` — chip `[●] offline` в правом верхнем углу, виден только offline, `z-index: 110`, light/dark токены, `prefers-reduced-motion`. Интеграция в `App.tsx` рядом с `SwUpdateBanner`. E2E `offline-fallback.spec.ts`: активация SW → `context.setOffline(true)` → индикатор → клиентская навигация `/manifest` → возврат online. Verify: lint ✅, build ✅, unit 36 ✅, e2e 10 ✅.

## 1. Overall Outcome & Requirements Alignment

Все требования из `tasks.md` выполнены:

| Требование                                                                | Статус |
| ------------------------------------------------------------------------- | ------ |
| SPA-оболочка через `navigateFallback`, не отдельная страница «Вы offline» | ✅     |
| `OfflineIndicator` top-right, только при offline                          | ✅     |
| `useOnlineStatus` как источник состояния сети                             | ✅     |
| Учебный `runtimeCaching`                                                  | ✅     |
| `/offline` остаётся уроком, не fallback                                   | ✅     |
| Unit + E2E тесты                                                          | ✅     |

Отклонений от PLAN нет. Маршрут `/offline` (`OfflineScreen`) не затронут — разделение «урок vs SW fallback» сохранено.

**Оценка:** задача успешна; фаза 4 (офлайн и кэш) стартовала с полноценного offline UX и SW-конфига.

## 2. Planning Phase Review

- PLAN в `tasks.md` оказался точным: пошаговый breakdown (хук → компонент → App → Workbox → E2E → verify) совпал с реализацией.
- Таблица **Challenges & Mitigations** предусмотрела ключевые риски (`navigateFallbackDenylist`, путаница с `/offline`, нестабильность E2E) — митигации сработали.
- UI-спецификация `OfflineIndicator` в PLAN заменила отдельную creative phase — для Level 3 с одним UI-элементом этого достаточно.
- **Что можно улучшить в планировании:** синхронизировать `docs/project/implementation-plan.md` (там ещё упоминается «страница Вы offline») — вынести в отдельный docs-шаг при `/close-task`.

## 3. Creative Phase Review

- Отдельный `creative-*.md` не создавался — UI зафиксирован в разделе «UI-спецификация: OfflineIndicator» в `tasks.md`.
- Решения (radial-gradient dot, chip-токены light/dark, safe-area, pulse с `prefers-reduced-motion`) перенесены в SCSS без потерь.
- `style-guide.md` + `ui-conventions.md` достаточны; исключение для видимого текста `offline` (status badge) учтено в PLAN.

## 4. Implementation Phase Review

### Что прошло хорошо

- **PLAN → BUILD без отклонений** — все 6 шагов Implementation Plan реализованы как зафиксировано.
- **Минимальный хук** — `useOnlineStatus` (~20 строк), lazy initial state, корректный cleanup; папка по `project-structure.md`.
- **TDD по слоям** — 5 unit-тестов хука (включая отписку), 4 теста индикатора с `vi.hoisted` моком хука.
- **Workbox-расширение** — точечные правки в `vite.config.ts` без новых npm-зависимостей.
- **UI fidelity** — SCSS соответствует спецификации: `max(var(--space-*), env(safe-area-inset-*))`, `z-index: 110`, dark mode, pulse.
- **Симметрия с фазой 3** — `OfflineIndicator` рядом с `SwUpdateBanner`; оба fixed, оба `role="status"`, разные углы экрана.

### Сложности

- **Ограничения `navigator.onLine`** — API бинарный и может врать (Wi‑Fi без интернета); для учебного PWA достаточно, но не полноценная проверка connectivity.
- **E2E зависит от SW** — нужно дождаться `reg.active.state === 'activated'` (timeout 15s); без preview + production SW тест бессмысленен.
- **Два слоя offline** — SW (`navigateFallback`) и UI (`OfflineIndicator`) решают разные задачи; важно не смешивать с маршрутом `/offline`.

## 5. Testing Phase Review

- **Unit:** хук и компонент изолированы; мок `useOnlineStatus` в тестах индикатора — тот же паттерн, что `virtual:pwa-register` в step-sw-update-ux.
- **E2E:** `context.setOffline(true/false)` стабилен локально (10/10 e2e); skip не потребовался — риск из PLAN не материализовался.
- **Verify pipeline:** lint → build → unit → e2e — полный прогон перед REFLECT.
- **Пробел:** нет автоматической проверки содержимого `dist/sw.js` на наличие `navigateFallback` / runtime rules (только ручная/косвенная через build + e2e).

## What Went Well

1. **UI-спецификация в PLAN** — детальная разметка и токены исключили неопределённость без отдельной creative phase.
2. **Разделение SW fallback и React-индикатора** — приложение работает offline (shell из precache), пользователь видит статус сети отдельно.
3. **E2E offline-сценарий** — один тест покрывает индикатор + клиентскую навигацию; `setOffline` проще, чем двухэтапный preview из step-sw-update-ux.
4. **Нулевые новые зависимости** — Web Platform API + существующий `vite-plugin-pwa`.
5. **TDD и русификация тестов** — соответствие `AGENTS.md` и testing-guidelines.

## Challenges

| Вызов                                      | Как решён                                                                                     |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Путаница `/offline` (урок) vs SW fallback  | Явно зафиксировано в PLAN; `OfflineScreen` не менялся                                         |
| `navigateFallback` для non-SPA путей       | `navigateFallbackDenylist: [/^\/api/]`                                                        |
| E2E нестабилен в CI                        | `waitForFunction` на activated SW; retries Playwright; skip зарезервирован, но не понадобился |
| Два fixed UI-элемента (banner + indicator) | Разные углы, `z-index` 100 vs 110                                                             |

## Lessons Learned

### Technical

- **`navigateFallback: 'index.html'`** — при наличии precache SPA-оболочка доступна offline без отдельной React-страницы; это проще и ближе к реальным PWA.
- **`runtimeCaching`** — учебные правила (json/images) дополняют precache; NetworkFirst + timeout — разумный дефолт для данных.
- **`navigator.onLine`** — достаточен для индикатора «нет сети на уровне ОС», но не заменяет ping/fetch-проверку реальной доступности.
- **Preview-only SW** — E2E offline обязан идти через `pnpm preview`, не `pnpm dev`.

### Process

- Level 3 с одним UI-компонентом может обойтись без `creative-*.md`, если UI-спека в PLAN детальна.
- Challenges & Mitigations в PLAN снижают сюрпризы на BUILD (особенно для E2E и Workbox).
- Verify-чеклист в tasks.md — надёжная точка входа для REFLECT.

### Estimation

- Оценка: ~4–6 ч (PLAN + хук + UI + Workbox + E2E + verify).
- Факт: одна сессия 2026-08-04 (PLAN) + 2026-08-06 (BUILD) + 2026-08-06 (REFLECT).
- Variance: в пределах оценки; инфраструктура preview/E2E и паттерны TDD уже отработаны в фазах 2–3.

## Process Improvements

- При `/close-task` обновить `implementation-plan.md` — убрать/уточнить формулировку про «страницу Вы offline».
- Добавить в backlog опциональный smoke-тест: assert фрагмента `dist/sw.js` после build (navigateFallback, cache names).
- Для следующих PWA-шагов заранее фиксировать в PLAN: «SW-уровень vs React-уровень vs учебный маршрут».

## Technical Improvements

- **Backlog:** опциональная проверка реальной connectivity (fetch HEAD с timeout) поверх `navigator.onLine` — только если понадобится для продвинутого UX.
- **Backlog:** DevTools manual checklist для offline (аналог step-sw-update-ux) — см. ниже.
- **Документация:** при появлении реальных API-вызовов расширить `navigateFallbackDenylist`.

## Next Steps

- `/archive` — архивация задачи
- `/close-task` — completed-запись, обновление `implementation-plan.md`
- Следующий шаг по roadmap: `step-offline-lesson-ui` или следующий пункт фазы 4

## Manual Verification Checklist

- [ ] `pnpm build && pnpm preview` — первый визит, SW activated
- [ ] DevTools → Network → Offline — индикатор `[●] offline` в правом верхнем углу
- [ ] Клиентская навигация (Manifest, Offline lesson) — shell и контент видны
- [ ] DevTools → Application → Cache Storage — `workbox-precache-*`, `runtime-json`, `runtime-images` (при обращении к ресурсам)
- [ ] Вернуть Online — индикатор исчезает
- [ ] Dark mode / `prefers-reduced-motion` — токены и отсутствие pulse
