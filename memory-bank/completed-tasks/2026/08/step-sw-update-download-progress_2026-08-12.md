# step-sw-update-download-progress

- **Название:** Прогресс загрузки новой версии SW / precache
- **Дата создания:** 2026-08-12
- **Дата завершения:** 2026-08-12
- **Уровень сложности:** Level 3 — Intermediate Feature
- **Тип:** Enhancement (PWA update UX / precache progress)

## Задание

Опциональный индикатор прогресса скачивания assets новой версии (этап install/precache), а не «процент после клика Обновить» (activate + reload почти мгновенны и процент будет бессмысленным).

Технически возможно через события Workbox / workbox-window / сообщения из SW; с текущим generateSW + virtual:pwa-register может понадобиться CREATIVE и доработка регистрации.

**Зависит от:** step-sw-update-apply-fast  
**Причина:** UX прозрачности «что качается», отдельно от фикса скорости применения обновления

## Изменения в задании

Уточнён UX: download (indeterminate) → «Обновить» → «Обновляется…» без %. CREATIVE: lifecycle клиента (Option A), UI в SwUpdateBanner (Option 1); injectManifest отложен.

## Результат

Индикатор фонового install/precache в SwUpdateBanner: пока SW installing — indeterminate progress; после waiting — кнопка «Обновить»; после клика — «Обновляется…» без %. Источник — lifecycle клиента (updatefound / installing + statechange) в swUpdateController; generateSW и push без изменений. Обновлены урок SW и pwa-checklist.

**Verify:** lint ✅ · typecheck ✅ · unit 164 ✅ · build ✅ (sw.js, precache 13).  
**Ручная Pages/mobile** — после merge/deploy.

**Файлы:** swUpdateController, useSwUpdate, SwUpdateBanner, swLessonData, pwa-checklist.md.

## Ссылки

- **Архив:** —
- **Рефлексия:** [memory-bank/reflection/reflection-step-sw-update-download-progress.md](../../reflection/reflection-step-sw-update-download-progress.md)
- **Ветка:** `feat/step-sw-update-download-progress`
- **Коммит:** `5f589c0`
