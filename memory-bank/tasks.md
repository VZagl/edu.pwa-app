# Tasks

## Current Task

- **Task ID:** `step-lighthouse-pwa-checklist`
- **Название:** Чеклист Lighthouse PWA и документирование проверки
- **Дата создания:** 2026-08-06
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-lighthouse-pwa-checklist`
- **Источник:** `docs/project/implementation-plan.md` (Order: 6.1.1)
- **Цель:** Зафиксировать воспроизводимый способ проверить, что MVP PWA выполнен

### Описание

Чеклист и документирование проверки: Lighthouse PWA, Application panel, установка на телефон. Отдельный `docs/project/pwa-checklist.md` + ссылки из README и смежных docs.

### Зависимости

- `step-install-prompt` ✅
- `step-offline-fallback` ✅

---

## План реализации (PLAN)

### Решения

| Вопрос                 | Решение                                   | Обоснование                                                                                       |
| ---------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Где разместить чеклист | Отдельный `docs/project/pwa-checklist.md` | README уже содержит индекс docs; отдельный файл проще поддерживать и ссылаться из нескольких мест |
| CREATIVE phase         | Не требуется                              | Формат документации однозначен; паттерн ссылок есть в README                                      |
| Изменения кода         | Только при обнаружении проблем Lighthouse | Задача — документирование; код менять только если audit выявит реальный дефект PWA                |
| Автотесты              | Регрессия существующих                    | Новые unit/E2E не нужны (deliverable — документация + ручная проверка)                            |

### Файлы

| Файл                             | Действие                                   |
| -------------------------------- | ------------------------------------------ |
| `docs/project/pwa-checklist.md`  | **Создать** — основной чеклист             |
| `README.md`                      | Добавить ссылку в раздел «Документация»    |
| `docs/project/tech-stack-pwa.md` | Ссылка на чеклист в строке «Проверка PWA»  |
| `docs/project/run-and-build.md`  | Ссылка в секции «Превью production-сборки» |

### Структура `pwa-checklist.md`

1. **Назначение** — для кого документ, когда применять (после фазы 5, перед `/close-task`)
2. **Предусловия** — `pnpm build`, `pnpm preview`, Chrome (рекомендуемый браузер для Lighthouse)
3. **Lighthouse PWA audit**
   - Запуск: DevTools → Lighthouse → Mode: Navigation, Categories: PWA (+ Performance опционально)
   - URL: `http://localhost:4173` (preview)
   - Ожидаемый результат: PWA audit проходит (зелёные проверки installability, SW, manifest, offline)
   - Таблица ключевых проверок Lighthouse PWA с кратким описанием «что смотреть»
4. **Application panel (Chrome DevTools)**
   - Manifest: имя, `start_url`, `display`, иконки, `theme_color`
   - Service Workers: статус activated, scope
   - Cache Storage: наличие Workbox/precache
   - Offline: симуляция offline + проверка fallback
5. **Установка на устройство**
   - Android (Chrome): кнопка «Установить» в UI / меню браузера
   - iOS (Safari): «Поделиться» → «На экран Домой» (fallback из `InstallBanner`)
   - Проверка standalone-режима (`display-mode: standalone`)
6. **Регрессия автотестами** — `pnpm lint`, `pnpm build`, `pnpm test --run`, `pnpm test:e2e`
7. **Troubleshooting** — типичные причины провала (SW не активирован, preview не запущен, кэш старой версии)

### Шаги BUILD

- [ ] **1.** Создать `docs/project/pwa-checklist.md` по структуре выше
- [ ] **2.** Добавить перекрёстные ссылки (README, tech-stack-pwa, run-and-build)
- [ ] **3.** Выполнить ручную проверку по чеклисту: `pnpm build` → `pnpm preview` → Lighthouse + Application panel
- [ ] **4.** Если Lighthouse выявит дефект — исправить и обновить чеклист (зафиксировать нюанс в troubleshooting)
- [ ] **5.** Прогнать регрессию: `pnpm lint`, `pnpm build`, `pnpm test --run`, `pnpm test:e2e`

### Challenges & Mitigations

| Риск                                               | Митигация                                                                                       |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Lighthouse PWA не запускается на `localhost`       | Документировать, что preview на `localhost:4173` — допустимое исключение для HTTPS              |
| Результаты Lighthouse зависят от версии Chrome     | Указать минимальную рекомендуемую версию Chrome; фиксировать дату проверки                      |
| `beforeinstallprompt` не срабатывает в headless/CI | В чеклисте явно разделить «автоматизируемое» (unit/E2E) и «только ручное» (Lighthouse, install) |
| iOS install не тестируется в CI                    | Секция «Установка на устройство» с пошаговой инструкцией для Safari                             |

### Verify (критерии готовности BUILD)

- [ ] `docs/project/pwa-checklist.md` создан и покрывает Lighthouse + Application + install + offline
- [ ] Ссылки из README и смежных docs работают
- [ ] Ручная проверка по чеклисту пройдена на `pnpm preview`
- [ ] `pnpm lint` ✅
- [ ] `pnpm build` ✅
- [ ] `pnpm test --run` ✅
- [ ] `pnpm test:e2e` ✅

### Creative Phases

Нет — переход к `/build`.

---

## Чеклист задачи

- [ ] GIT: Работа в feature-ветке `feat/step-lighthouse-pwa-checklist`
- [ ] BUILD: Создать `docs/project/pwa-checklist.md` и перекрёстные ссылки
- [ ] BUILD: Ручная проверка Lighthouse + Application panel по чеклисту
- [ ] BUILD: Регрессия lint / build / test --run / test:e2e
- [ ] REFLECT: Рефлексия командой `/reflect`
- [ ] CLOSE: Финализировать задачу командой `/close-task`

---

## Last Completed Task

- **Task ID:** `step-install-prompt`
- **Название:** Обработка `beforeinstallprompt` и кнопка «Установить»
- **Дата завершения:** 2026-08-06
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-install-prompt_2026-08-06.md](completed-tasks/2026/08/step-install-prompt_2026-08-06.md)
- **Reflection:** [memory-bank/reflection/reflection-step-install-prompt.md](reflection/reflection-step-install-prompt.md)
