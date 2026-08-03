# Active Context

## Current Focus

**Task ID:** `step-web-app-manifest`  
**Git Branch:** `feat/step-web-app-manifest`  
**Название:** Web App Manifest

## Current Mode

BUILD — ожидает `/build`

## Next Steps

1. `/build` — TDD: E2E red → manifest, иконки (книга + edu/PWA), index.html, green
2. `/reflect` → `/archive` → `/close-task`

## Context for AI

- Учебный PWA на React + Vite (frontend only), **pnpm**
- Фаза 2: Web App Manifest (Order: 2.1.1)
- Схема manifest: `docs/project/config-schema.md`
- PWA-правила: `docs/project/tech-stack-pwa.md`
- `public/` — есть `favicon.svg`; добавить `manifest.webmanifest` и `icons/`
- `vite-plugin-pwa` — не установлен (на этом шаге не требуется)
- Creative phase не требуется
- **Иконки:** книга, две строки `edu` / `PWA`; проверка читаемости на 48px и 192px
