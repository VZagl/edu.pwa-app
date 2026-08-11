# Memory Bank: Backlog

## Высокий

(Нет активных задач)

## Средний

- [ ] Cache Storage — отдельный раздел (step-cache-storage-lesson-ui)
  - **Создано:** 2026-08-07
  - Описание API + живой список кэшей и ключей.
  - **Источник:** docs/project/implementation-plan.md (step-cache-storage-lesson-ui)
  - **Причина:** Новый учебный модуль после доделки заглушек

- [ ] Storage quota / Persistent storage — отдельный раздел (step-storage-quota-lesson-ui)
  - **Создано:** 2026-08-07
  - `estimate` / `persist` / `persisted`; продвинутый урок.
  - **Источник:** docs/project/implementation-plan.md (step-storage-quota-lesson-ui)
  - **Зависит от:** step-cache-storage-lesson-ui
  - **Причина:** Продвинутая тема хранения

- [ ] Web Push — опциональный урок (step-push-notifications)
  - **Создано:** 2026-08-07
  - Опциональный урок: Web Push (требует backend или mock); только если есть учебная цель и HTTPS.
  - **Источник:** docs/project/implementation-plan.md (step-push-notifications)
  - **Причина:** Опциональный шаг фазы 7; после доделки основных экранов

- [ ] Деплой на GitHub Pages (step-github-pages-deploy)
  - **Создано:** 2026-08-07
  - Vite `base`, Actions → Pages, проверка PWA по HTTPS.
  - **Источник:** docs/project/implementation-plan.md (step-github-pages-deploy)
  - **Зависит от:** step-push-notifications
  - **Причина:** Следующий шаг после Push; закрывает «деплой» из фазы 6

- [ ] README «с нуля» для ученика (step-readme-learner-guide)
  - **Создано:** 2026-08-07
  - Порядок экранов, DevTools, preview, ссылка на pwa-checklist.
  - **Источник:** docs/project/implementation-plan.md (step-readme-learner-guide)
  - **Зависит от:** step-home-lesson-ui, step-sw-lesson-ui, step-install-lesson-ui
  - **Причина:** Онбординг без истории Memory Bank

## Низкий

(Нет активных задач)

## Идеи

- [ ] Убрать `LessonStubScreen`, когда все разделы заполнены
  - **Создано:** 2026-08-07
  - Удалить `src/components/LessonStubScreen/` и импорты, когда Главная, Service Worker и Install больше не заглушки (как Manifest/Offline).
  - **Зависит от:** заполненные экраны Home / SW / Install (`step-home-lesson-ui`, `step-sw-lesson-ui`, `step-install-lesson-ui`)
  - **Причина:** Временный layout из `step-lessons-navigation`; после полных уроков — мёртвый код

---

**Примечание**: Этот файл — планировщик задач. Содержит только активные задачи и идеи. История завершённых задач хранится в `memory-bank/completed-tasks/`.

**Как использовать:**

1. Добавляйте новые идеи в соответствующий раздел по приоритету
2. Перемещайте задачи между приоритетами по мере необходимости
3. После завершения задачи — финализировать командой `/close-task` (задача удаляется из backlog, запись создаётся в `completed-tasks/`)
4. Используйте ссылки на task ID для связи с конкретными задачами
5. В **Высокий** — только задачи без незакрытых зависимостей; зависимые шаги — в **Средний**/ниже до разблокировки
