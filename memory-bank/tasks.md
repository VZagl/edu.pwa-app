# Tasks

## Current Task

- **Task ID:** `step-sw-update-apply-fast`
- **Название:** Быстрое применение обновления PWA по кнопке «Обновить»
- **Создано:** 2026-08-12
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Тип:** Enhancement (PWA update UX)
- **Git Branch:** `feat/step-sw-update-apply-fast`
- **Источник:** memory-bank/backlog.md (step-sw-update-apply-fast)
- **Связь:** развивает `step-sw-update-ux` (`swUpdateController`, `useSwUpdate`, `SwUpdateBanner`)
- **Статус:** VAN COMPLETE → переход к PLAN

### Описание

На смартфоне (особенно установленное PWA / GitHub Pages) новая версия ощущается медленнее, чем на десктопе: редко вызывается проверка SW, waiting-worker появляется с задержкой, после клика нет промежуточного UI до reload.

**Важно:** `skipWaiting` уже есть через `updateSW(true)` в `applySwUpdate` (`registerType: 'prompt'`). Задача — не «добавить skipWaiting с нуля», а ускорить обнаружение обновления и сделать путь «клик → activate → reload» надёжным и мгновенным по ощущениям.

### Критерий (must-have)

После первого клика по «Обновить» повторные клики невозможны на всех платформах (desktop / Android / iOS). Кнопка сразу `disabled` (или эквивалент), подпись → «Обновляется…»; повторный вызов `applySwUpdate` / `updateSW` не допускается.

### Скоуп

- Блокировка кнопки + смена текста на «Обновляется…» (минимальный UX-фидбек до reload)
- Проактивные проверки: `registration.update()` на `visibilitychange` / `focus` / `online` (+ осторожный интервал, если нужен)
- Аудит `swUpdateController` / `SwUpdateBanner` / `useSwUpdate`: одноразовый apply (флаг in-flight), гарантированный reload после waiting
- Документировать ограничения GitHub Pages CDN / кэша `sw.js`
- Ручная проверка: Android Chrome (установленное PWA) и по возможности iOS Safari

### Не входит

Индикатор процентов precache / progress UI — `step-sw-update-download-progress`

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-sw-update-apply-fast
- [ ] PLAN: Детальный план реализации
- [ ] BUILD: Реализация + TDD
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой /close-task

## Last Completed Task

- **Task ID:** `step-github-pages-deploy`
- **Название:** Деплой на GitHub Pages
- **Дата завершения:** 2026-08-11
- **Статус:** COMPLETED & ARCHIVED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-github-pages-deploy_2026-08-11.md](completed-tasks/2026/08/step-github-pages-deploy_2026-08-11.md)
- **Archive:** [memory-bank/archive/archive-step-github-pages-deploy.md](archive/archive-step-github-pages-deploy.md)
- **Reflection:** [memory-bank/reflection/reflection-step-github-pages-deploy.md](reflection/reflection-step-github-pages-deploy.md)
