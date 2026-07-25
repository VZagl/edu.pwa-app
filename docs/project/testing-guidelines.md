> **Правила для ИИ:** написание и организация тестов

# Настройки тестирования

Проект **edu.pwa-app** — клиентское React-приложение (Vite). Backend и нативная оболочка **отсутствуют**. Правила тестирования — для frontend.

Разработка ведётся по **TDD**. Фичи не начинать, пока не закрыты шаги фазы 0 в [implementation-plan.md](./implementation-plan.md): `step-test-environment`, `step-playwright-setup`.

---

## Текущее состояние

До завершения фазы 0 Vitest и Playwright могут ещё отсутствовать в `package.json`. После фазы 0 оба раннера обязательны; актуальные скрипты — всегда в `package.json`.

---

## Политика покрытия

Покрывать осмысленную логику и критичные сценарии:

- **Unit** (Vitest) — хуки, компоненты с условным рендером
- **Integration** (Vitest + Testing Library) — навигация, layout + контент
- **E2E** (Playwright) — загрузка приложения, учебные сценарии UI; для PWA — manifest/offline/install там, где стабильно (часто против `pnpm preview`)

---

## Алгоритм создания тестов (TDD — обязательно)

**Цикл:** типы/контракты → тесты (red) → реализация (green) → рефакторинг. Не подгонять тесты под уже написанный код.

1. **Типы и контракты** — без тестов, если нет логики
2. **Тесты** — до реализации (unit/integration; E2E — для критичного UX шага)
3. **Реализация** — должна проходить тесты

Изменение существующих тестов — согласовать с пользователем и объяснить причину.

---

## Документы

### [testing-guidelines-frontend.md](./testing-guidelines-frontend.md)

Vitest, Testing Library, Playwright.

---

## Быстрый запуск (после фазы 0)

| Слой               | Команда           |
| ------------------ | ----------------- |
| Unit / integration | `pnpm test`       |
| Unit (CI / BUILD)  | `pnpm test --run` |
| E2E (браузер)      | `pnpm test:e2e`   |

Актуальные скрипты — всегда в `package.json`.

---

## Проверки инструментами

Перед завершением BUILD или PR:

1. **`pnpm lint`** — ESLint без ошибок
2. **`pnpm build`** — TypeScript и сборка Vite проходят
3. **`pnpm test --run`** — unit/integration
4. **`pnpm test:e2e`** — E2E (обязательно, если шаг добавляет/меняет E2E-сценарий; иначе — smoke-регрессия фазы 0, если не оговорено исключение)
5. Для PWA-шагов: **`pnpm preview`** + ручная проверка Application / Lighthouse (см. [tech-stack-pwa.md](./tech-stack-pwa.md))

Детали по frontend — [testing-guidelines-frontend.md](./testing-guidelines-frontend.md).
