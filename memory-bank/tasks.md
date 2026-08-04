# Tasks

## Current Task

- **Task ID:** `step-vite-plugin-pwa`
- **Название:** Подключить vite-plugin-pwa
- **Уровень сложности:** Level 2 — Simple Enhancement
- **Git Branch:** `feat/step-vite-plugin-pwa`
- **Источник:** docs/project/implementation-plan.md (Order 3.1.2)
- **Зависит от:** step-service-worker-register ✅

### Описание

Подключить `vite-plugin-pwa` (Workbox): precache статики из сборки, dev/prod настройки (отключение SW в dev или `devOptions` по доке плагина). Заменить или интегрировать ручной SW из предыдущего шага.

**Цель:** Production-сборка генерирует SW; `pnpm preview` — приложение cacheable.

### Technology Stack

| Компонент    | Выбор                                                |
| ------------ | ---------------------------------------------------- |
| Плагин       | `vite-plugin-pwa@^1.3.0` (peer: Vite 8 ✅)           |
| Стратегия SW | `generateSW` (Workbox precache)                      |
| Регистрация  | Ручная через `registerSw.ts`, `injectRegister: null` |
| Manifest     | Генерация плагином из `vite.config.ts`               |
| SW в dev     | Отключён (без `devOptions.enabled`)                  |
| Проверка     | `pnpm preview` + Playwright                          |

### Technology Validation Checkpoints

- [ ] `pnpm add -D vite-plugin-pwa`
- [ ] `pnpm build` — в `dist/` есть `sw.js`, `manifest.webmanifest`, workbox-precache
- [ ] `pnpm preview` — приложение загружается, SW регистрируется
- [ ] `pnpm test --run` и `pnpm test:e2e` проходят

### Решения по открытым вопросам (PLAN)

| #   | Вопрос                               | Решение                                                                                                                   |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| 1   | Удалить `public/sw.js`?              | **Да** — `generateSW` генерирует Workbox SW; два `/sw.js` конфликтуют                                                     |
| 2   | Manifest: static vs плагин?          | **Единый источник — `vite.config.ts`**; `manifestFilename: 'manifest.webmanifest'`; удалить `public/manifest.webmanifest` |
| 3   | `registerSw.ts` vs `injectRegister`? | **Оставить `registerSw.ts`**, `injectRegister: null` — паттерн `src/pwa/` для step-sw-update-ux                           |
| 4   | SW в dev?                            | **Отключить** — HMR не ломается; E2E через preview                                                                        |
| 5   | E2E                                  | **Отдельный spec** `e2e/service-worker-pwa.spec.ts`                                                                       |

### Чеклист

- [x] GIT: Работа в feature-ветке feat/step-vite-plugin-pwa
- [x] PLAN: Детальный план реализации (`/plan`)
- [ ] BUILD: Подключить `vite-plugin-pwa`, настроить Workbox precache
- [ ] BUILD: Dev/prod настройки SW (отключение в dev)
- [ ] BUILD: Удалить `public/sw.js`; обновить JSDoc в `registerSw.ts`
- [ ] BUILD: Manifest — единый источник в `vite.config.ts`; удалить `public/manifest.webmanifest`
- [ ] BUILD: Убрать дубли manifest/theme-color из `index.html` (инжект плагина)
- [ ] BUILD: TDD — `e2e/service-worker-pwa.spec.ts` (red → green)
- [ ] BUILD: Обновить `docs/project/config-schema.md`
- [ ] BUILD: Verify — lint, build, `pnpm test --run`, E2E против preview
- [ ] REFLECT: Рефлексия по задаче
- [ ] CLOSE: Финализировать задачу командой /close-task

### Implementation Plan

#### Шаг 1. Зависимость и конфиг плагина

1. `pnpm add -D vite-plugin-pwa`
2. Обновить `vite.config.ts` — добавить `VitePWA({...})` **после** `react()`:

```typescript
VitePWA({
	registerType: 'autoUpdate',
	injectRegister: null,
	manifestFilename: 'manifest.webmanifest',
	includeAssets: ['favicon.svg', 'icons/*.png'],
	manifest: {
		name: 'edu.pwa-app — учебное PWA',
		short_name: 'PWA Lab',
		description: 'Изучение Progressive Web Apps на React и Vite',
		start_url: '/',
		scope: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#646cff',
		lang: 'ru',
		icons: [
			{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
			{ src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
		],
	},
	workbox: {
		globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
	},
});
```

#### Шаг 2. Удалить дубли

| Файл                          | Действие                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| `public/sw.js`                | Удалить                                                      |
| `public/manifest.webmanifest` | Удалить                                                      |
| `index.html`                  | Убрать `<link rel="manifest">` и `<meta name="theme-color">` |

#### Шаг 3. Регистрация SW

- `registerSw.ts` — путь `/sw.js` без изменений; обновить JSDoc
- `main.tsx` — без изменений
- `registerSw.test.ts` — без изменений логики

#### Шаг 4. E2E (TDD red → green)

Новый `e2e/service-worker-pwa.spec.ts`:

1. Главная загружается после preview
2. `/sw.js` — HTTP 200, тело содержит `workbox` или `precache`
3. `navigator.serviceWorker.getRegistration()` — registration со scope `/`

Существующие E2E (`web-app-manifest.spec.ts`, `manifest-lesson.spec.ts`) — без изменений.

#### Шаг 5. Документация

- `docs/project/config-schema.md` — источник правды: `vite.config.ts` → `VitePWA.manifest`

#### Шаг 6. Verify

```powershell
pnpm lint
pnpm build
pnpm test --run
pnpm test:e2e
```

Ручная проверка: Chrome DevTools → Application → Service Workers (precache entries).

### Затрагиваемые файлы

| Файл                             | Изменение                   |
| -------------------------------- | --------------------------- |
| `package.json`                   | + `vite-plugin-pwa`         |
| `vite.config.ts`                 | + `VitePWA(...)`            |
| `public/sw.js`                   | удалить                     |
| `public/manifest.webmanifest`    | удалить                     |
| `index.html`                     | убрать manifest/theme-color |
| `src/pwa/registerSw.ts`          | JSDoc                       |
| `e2e/service-worker-pwa.spec.ts` | новый                       |
| `docs/project/config-schema.md`  | обновить                    |

**Без изменений:** `lessonRoutes`, экраны, `ManifestScreen`, `registerSw.test.ts`, `main.tsx`.

### Challenges & Mitigations

| Риск                                   | Митигация                                      |
| -------------------------------------- | ---------------------------------------------- |
| Дублирование manifest link в HTML      | Убрать ручные теги из `index.html`             |
| E2E: async SW registration             | `page.waitForFunction` / retry в Playwright    |
| Конфликт `public/sw.js` и generated SW | Удалить `public/sw.js` до первого build        |
| HMR в dev                              | SW в dev отключён                              |
| Расхождение manifest в тестах          | Значения в `vite.config.ts` = текущий manifest |

### Creative Phases Required

- Нет — Level 2, архитектурные решения зафиксированы в PLAN

## Last Completed Task

- **Task ID:** `step-service-worker-register`
- **Название:** Регистрация Service Worker
- **Дата завершения:** 2026-08-04
- **Статус:** COMPLETED
- **Completed:** [memory-bank/completed-tasks/2026/08/step-service-worker-register_2026-08-04.md](completed-tasks/2026/08/step-service-worker-register_2026-08-04.md)
- **Reflection:** [memory-bank/reflection/reflection-step-service-worker-register.md](reflection/reflection-step-service-worker-register.md)
