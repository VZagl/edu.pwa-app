# step-sw-update-apply-fast

- **Название:** Быстрое применение обновления PWA по кнопке «Обновить»
- **Дата создания:** 2026-08-12
- **Дата завершения:** 2026-08-12
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Enhancement (PWA update UX)

## Задание

На смартфоне (особенно установленное PWA / GitHub Pages) новая версия ощущается медленнее, чем на десктопе: редко вызывается проверка SW, waiting-worker появляется с задержкой, после клика нет промежуточного UI до reload.

**Важно:** `skipWaiting` уже есть через `updateSW(true)` в `applySwUpdate` (`registerType: 'prompt'`). Задача — не «добавить skipWaiting с нуля», а ускорить обнаружение обновления и сделать путь «клик → activate → reload» надёжным и мгновенным по ощущениям.

**Критерий (must-have):** после первого клика по «Обновить» повторные клики невозможны на всех платформах (desktop / Android / iOS). Кнопка сразу `disabled` (или эквивалент: pointer-events + aria-disabled), подпись → «Обновляется…»; повторный вызов `applySwUpdate` / `updateSW` не допускается.

**Скоуп:**

- Блокировка кнопки + смена текста на «Обновляется…» (минимальный UX-фидбек до reload; полный % precache — не здесь).
- Проактивные проверки: `registration.update()` на `visibilitychange` / `focus` / `online` (+ осторожный интервал, если нужен).
- Аудит `swUpdateController` / `SwUpdateBanner` / `useSwUpdate`: одноразовый apply (флаг in-flight), гарантированный reload после waiting.
- Документировать ограничения GitHub Pages CDN / кэша `sw.js` (кастомный `Cache-Control` почти недоступен).
- Ручная проверка: Android Chrome (установленное PWA) и по возможности iOS Safari.

**Не входит:** индикатор процентов загрузки precache / progress UI — `step-sw-update-download-progress`.

**Связь:** развивает `step-sw-update-ux` (`swUpdateController`, `useSwUpdate`, `SwUpdateBanner`).

## Результат

Ускорен UX применения обновления PWA: одноразовый `applySwUpdate` с модульным флагом `isApplying` (повторные вызовы — no-op), проактивный `registration.update()` на `visibilitychange` / `focus` / `online` (throttle 30s) плюс интервал 60м с `fetch(swUrl, { cache: 'no-store' })`, баннер с disabled-кнопкой «Обновляется…» и `aria-busy`, документация ограничений GitHub Pages CDN для `sw.js`.

**Verify:** `pnpm lint` ✅ · `pnpm test --run` ✅ · `pnpm build` ✅.  
**Ручная проверка mobile** (Android Chrome / iOS Safari на Pages) — после merge/deploy.

**Файлы:** `src/pwa/swUpdateController.ts`, `src/hooks/useSwUpdate.ts`, `src/components/SwUpdateBanner/*`, `docs/project/pwa-checklist.md`, `docs/project/run-and-build.md`.

## Ссылки

- **Архив:** —
- **Рефлексия:** [memory-bank/reflection/reflection-step-sw-update-apply-fast.md](../../reflection/reflection-step-sw-update-apply-fast.md)
- **Ветка:** `feat/step-sw-update-apply-fast`
- **Коммит:** `caa6d5a`
