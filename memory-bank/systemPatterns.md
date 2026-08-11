# Memory Bank: System Patterns

## Архитектура

- **Только frontend:** SPA в браузере, без backend в репозитории
- **Сборка:** Vite; production — статика в `dist/`
- **Деплой:** любой HTTPS-хостинг; localhost — для разработки
- **PWA-слой:** manifest + service worker (целевой путь — `vite-plugin-pwa` + Workbox после базовых ручных шагов)

## Состояние UI

- Локально: React `useState`
- Между экранами: React Context или выделенный store
- Тяжёлый state-менеджер — только при явной необходимости и согласовании

## Структура кода (текущая → целевая)

```
src/
  main.tsx, App.tsx, App.scss, index.scss, assets/
  components/   # по мере роста
  pages|screens/
  hooks/        # в т.ч. online/offline, install
  pwa/          # регистрация SW после соответствующих шагов
public/
  favicon, icons; позже — manifest, icons/, SW
```

Модули: один логический блок — отдельная папка (`Component/Component.tsx` + SCSS + `*.test.tsx`). E2E — в `e2e/`.

## Качество (TDD)

- Обязательный цикл: red → green → refactor
- Unit/integration — Vitest; критичный UX — Playwright
- Продуктовые шаги только после фазы 0 (`step-test-environment`, `step-playwright-setup`)

## UI-паттерны

- Самописные React-компоненты; UI-библиотека не обязательна
- Семантика: `header` / `nav` / `main`, видимый focus, `aria-label` для icon-only
- PWA-состояния отражаются в UI (banner/badge), не молчаливый сбой сети

## Workflow задач

Уровни сложности и циклы — `docs/project/implementation-plan.md` и Memory Bank (`/van` → … → `/close-task`).
Источник шагов продукта — `implementation-plan.md`; активный пул — `memory-bank/backlog.md`.
