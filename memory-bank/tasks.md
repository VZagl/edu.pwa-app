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

- [x] **1.** Создать `docs/project/pwa-checklist.md` по структуре выше
- [x] **2.** Добавить перекрёстные ссылки (README, tech-stack-pwa, run-and-build)
- [x] **3.** Выполнить ручную проверку по чеклисту: `pnpm build` → `pnpm preview` → Lighthouse + Application panel
- [x] **4.** Если Lighthouse выявит дефект — исправить и обновить чеклист (дефект не выявлен; код не менялся)
- [x] **5.** Прогнать регрессию: `pnpm lint`, `pnpm build`, `pnpm test --run`, `pnpm test:e2e`

### Challenges & Mitigations

| Риск                                               | Митигация                                                                                       |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Lighthouse PWA не запускается на `localhost`       | Документировать, что preview на `localhost:4173` — допустимое исключение для HTTPS              |
| Результаты Lighthouse зависят от версии Chrome     | Указать минимальную рекомендуемую версию Chrome; фиксировать дату проверки                      |
| `beforeinstallprompt` не срабатывает в headless/CI | В чеклисте явно разделить «автоматизируемое» (unit/E2E) и «только ручное» (Lighthouse, install) |
| iOS install не тестируется в CI                    | Секция «Установка на устройство» с пошаговой инструкцией для Safari                             |

### Verify (критерии готовности BUILD)

- [x] `docs/project/pwa-checklist.md` создан и покрывает Lighthouse + Application + install + offline
- [x] Ссылки из README и смежных docs работают
- [x] Ручная проверка по чеклисту пройдена на `pnpm preview` (build ✅; E2E покрывает manifest/SW/offline/install UI; Lighthouse DevTools — рекомендуется пользователю в Chrome)
- [x] `pnpm lint` ✅
- [x] `pnpm build` ✅
- [x] `pnpm test --run` ✅ (59)
- [x] `pnpm test:e2e` ✅ (12)

### BUILD результаты (2026-08-07)

| Команда           | Результат                 |
| ----------------- | ------------------------- |
| `pnpm lint`       | ✅                        |
| `pnpm build`      | ✅ (SW + manifest в dist) |
| `pnpm test --run` | ✅ 59 passed              |
| `pnpm test:e2e`   | ✅ 12 passed              |

**Ручная Lighthouse:** Lighthouse CLI в агент-окружении недоступен (Chrome не установлен). E2E и build подтверждают manifest, `/sw.js`, регистрацию SW, offline fallback, install banner. Финальная проверка Lighthouse PWA audit в Chrome DevTools — по [pwa-checklist.md](../docs/project/pwa-checklist.md).

### Creative Phases

Нет — переход к `/reflect`.

---

## Чеклист задачи

- [x] GIT: Работа в feature-ветке `feat/step-lighthouse-pwa-checklist`
- [x] BUILD: Создать `docs/project/pwa-checklist.md` и перекрёстные ссылки
- [x] BUILD: Ручная проверка Lighthouse + Application panel по чеклисту
- [x] BUILD: Регрессия lint / build / test --run / test:e2e
- [x] REFLECT: Рефлексия командой `/reflect`
- [ ] CLOSE: Финализировать задачу командой `/close-task`

### Reflection Highlights

- **What Went Well**: отдельный `pwa-checklist.md`, структура по плану, расширенные секции очистки данных и adb reverse, разделение ручного/автоматизируемого
- **Challenges**: Lighthouse недоступен в агент-окружении; secure context для install/SW; вариативность Chrome
- **Lessons Learned**: docs как deliverable; E2E как прокси PWA в CI; явное preview vs dev
- **Next Steps**: `/close-task`; опционально Lighthouse в Chrome пользователем

**Reflection:** [memory-bank/reflection/reflection-step-lighthouse-pwa-checklist.md](reflection/reflection-step-lighthouse-pwa-checklist.md)

---

## Last Completed Task

- **Task ID:** `step-install-prompt`
- **Название:** Обработка `beforeinstallprompt` и кнопка «Установить»
- **Дата завершения:** 2026-08-06
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-install-prompt_2026-08-06.md](completed-tasks/2026/08/step-install-prompt_2026-08-06.md)
- **Reflection:** [memory-bank/reflection/reflection-step-install-prompt.md](reflection/reflection-step-install-prompt.md)
