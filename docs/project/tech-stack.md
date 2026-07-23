> **Правила для ИИ:** выбор и применение технологических правил проекта

# Технологии

## Область применения

Этот файл — точка входа по стеку. Использовать его для выбора нужного профильного документа и проверки общих ограничений. Детальные правила находятся в профильных файлах.

## Ключевые правила

- **Версии зависимостей:** брать только из `package.json`.
- **Менеджер пакетов:** использовать `pnpm` (ориентир — `packageManager` в `package.json`).
- **Детали frontend:** брать из [tech-stack-frontend.md](tech-stack-frontend.md).
- **Детали PWA:** брать из [tech-stack-pwa.md](tech-stack-pwa.md).
- **Правила тестирования:** брать из [testing-guidelines.md](testing-guidelines.md) и [testing-guidelines-frontend.md](testing-guidelines-frontend.md).

## Разделы

- **[tech-stack-frontend.md](tech-stack-frontend.md)** — React, UI, стили, локальное состояние.
- **[tech-stack-pwa.md](tech-stack-pwa.md)** — Web App Manifest, Service Worker, офлайн, установка.
- **[config-schema.md](config-schema.md)** — схема manifest и PWA-настроек приложения.
- **[date-time-contract.md](date-time-contract.md)** — правила даты и времени в TypeScript и UI.

## Чеклист для ИИ

- [ ] Перед выбором библиотек проверен `package.json`.
- [ ] Выбран профильный документ (frontend / PWA) под текущую задачу.
- [ ] Не добавлены правила, дублирующие профильные документы без необходимости.
- [ ] Для тестов использованы правила из `testing-guidelines.md` и при необходимости `testing-guidelines-frontend.md`.
