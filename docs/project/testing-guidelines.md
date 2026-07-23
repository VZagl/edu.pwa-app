> **Правила для ИИ:** написание и организация тестов

# Настройки тестирования

Проект **edu.pwa-app** — клиентское React-приложение (Vite). Backend и нативная оболочка **отсутствуют**. Правила тестирования — для frontend.

---

## Текущее состояние

**Vitest и Playwright пока не подключены** в `package.json`. До шага `step-vitest-setup` в [implementation-plan.md](./implementation-plan.md) тесты пишутся только если зависимости уже добавлены в рамках задачи.

---

## Политика покрытия

При наличии тестового стека — покрывать осмысленную логику:

- **Unit** — хуки (`useOnlineStatus`, `useInstallPrompt`), компоненты с условным рендером
- **Интеграция** — навигация по учебным экранам, связки layout + контент
- **E2E** (после Playwright) — manifest доступен, offline fallback, install banner (где возможно в CI)

---

## Алгоритм создания тестов

**TDD-цикл (рекомендуемый):** типы/API → тесты → реализация. Не подгонять тесты под код.

1. **Типы и контракты** — без тестов, если нет логики
2. **Тесты** — до или вместе с реализацией
3. **Реализация** — должна проходить тесты

Изменение существующих тестов — согласовать с пользователем и объяснить причину.

---

## Документы

### [testing-guidelines-frontend.md](./testing-guidelines-frontend.md)

Vitest, Testing Library, (опционально) Playwright для браузера.

---

## Быстрый запуск (после настройки)

| Слой               | Команда         |
| ------------------ | --------------- |
| Unit / integration | `pnpm test`     |
| E2E (браузер)      | `pnpm test:e2e` |

Актуальные скрипты — всегда в `package.json`.

---

## Проверки инструментами

Перед завершением BUILD или PR:

1. **`pnpm lint`** — ESLint без ошибок
2. **`pnpm build`** — TypeScript и сборка Vite проходят
3. После Vitest: **`pnpm test --run`**
4. Для PWA-шагов: **`pnpm preview`** + ручная проверка Application / Lighthouse (см. [tech-stack-pwa.md](./tech-stack-pwa.md))

Детали по frontend — [testing-guidelines-frontend.md](./testing-guidelines-frontend.md).
