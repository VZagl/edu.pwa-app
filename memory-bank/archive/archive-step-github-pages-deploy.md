# TASK ARCHIVE: Деплой на GitHub Pages

## METADATA

| Поле                  | Значение                                                             |
| --------------------- | -------------------------------------------------------------------- |
| **Task ID**           | `step-github-pages-deploy`                                           |
| **Название**          | Деплой на GitHub Pages                                               |
| **Уровень сложности** | Level 3 — Intermediate Feature                                       |
| **Тип**               | Feature / Infrastructure                                             |
| **Дата создания**     | 2026-08-07                                                           |
| **Дата завершения**   | 2026-08-11                                                           |
| **Дата архивации**    | 2026-08-11                                                           |
| **Статус**            | COMPLETED & ARCHIVED                                                 |
| **Git Branch**        | `feat/step-github-pages-deploy`                                      |
| **Источник**          | `docs/project/implementation-plan.md` (step-github-pages-deploy)     |
| **Зависит от**        | `step-push-notifications` ✅                                         |
| **Ожидаемый URL**     | `https://vzagl.github.io/edu.pwa-app/` (remote: `VZagl/edu.pwa-app`) |

## SUMMARY

Настроен деплой учебного PWA на GitHub Pages (project site): Vite `base: '/edu.pwa-app/'`, гибридное выравнивание PWA-путей (relative manifest · `BASE_URL` в app · `registration.scope` в SW), `BrowserRouter` с `basename`, GitHub Actions workflow на `develop` + `workflow_dispatch` с pnpm (не npm), обновлены `run-and-build.md` и `pwa-checklist.md`. Verify: `pnpm verify:fast` ✅ (145 unit); `pnpm test:e2e` ✅ (18, baseURL `/edu.pwa-app/`). Ручная проверка HTTPS Pages — после enable Pages + merge/dispatch.

## REQUIREMENTS

### Функциональные

- Production-сборка деплоится на GitHub Pages по HTTPS
- Vite `base` корректен для project site (`/<repo>/`)
- Manifest, SW, иконки и роутер работают под этим `base`
- CI: `pnpm build` → publish `dist/` через GitHub Actions
- Docs: секция деплоя в `run-and-build.md`; проверка на Pages в `pwa-checklist.md`

### Нефункциональные

- Регрессия: lint / typecheck / unit / build; E2E на preview
- Без новых npm-зависимостей (только Actions + конфиг)
- Учебный характер: пути и деплой понятны из docs

## IMPLEMENTATION

### Design Decisions (CREATIVE)

| ID  | Тема                   | Решение                                                             |
| --- | ---------------------- | ------------------------------------------------------------------- |
| C1  | Стратегия `base`       | **A** — `base: '/edu.pwa-app/'`                                     |
| C2  | Workflow trigger       | **B + dispatch** — `develop` + `workflow_dispatch`; pnpm (не npm)   |
| C3  | Выравнивание PWA-путей | **C** — гибрид: relative manifest · `BASE_URL` в app · `scope` в SW |

Подробно: [creative/creative-github-pages-deploy.md](../creative/creative-github-pages-deploy.md)

### Approach

1. **Phase 1 — Base + PWA paths:** `base` в Vite; relative manifest (`start_url` / `scope` / icons); `BrowserRouter` + `basename={import.meta.env.BASE_URL}`; `fetchManifest` через `BASE_URL`; иконки push через `BASE_URL` / `registration.scope`; lesson copy и unit-тесты
2. **Phase 2 — GitHub Actions:** `.github/workflows/deploy.yml` — pnpm setup, build, upload `dist/`, deploy-pages; permissions + concurrency
3. **Phase 3 — Docs:** `run-and-build.md` (URL, Settings → Pages → Actions); `pwa-checklist.md` (HTTPS); README learner guide вне scope
4. **Phase 4 — Verify:** `pnpm verify:fast` + E2E на nested path; ручная проверка Pages — после merge

### Key Components

| Компонент                                     | Изменения                                                 |
| --------------------------------------------- | --------------------------------------------------------- |
| `vite.config.ts`                              | `base`; `start_url` / `scope` / icons без абсолютных `/…` |
| `src/main.tsx`                                | `BrowserRouter basename={import.meta.env.BASE_URL}`       |
| `src/screens/ManifestScreen/fetchManifest.ts` | URL через `import.meta.env.BASE_URL`                      |
| `public/sw-push.js`, `usePushNotifications`   | иконки уведомлений с учётом base / scope                  |
| Учебные тексты SW/scope                       | убраны жёсткие «scope = `/`»                              |
| `.github/workflows/deploy.yml`                | pnpm + Pages (`develop` + `workflow_dispatch`)            |
| `playwright.config.ts` + E2E                  | `baseURL` `/edu.pwa-app/`; `href` с basename              |
| `docs/project/run-and-build.md`               | деплой, URL, включение Pages                              |
| `docs/project/pwa-checklist.md`               | секция проверки на HTTPS Pages                            |

### Technology

- Vite 8 (`base`, `import.meta.env.BASE_URL`)
- `vite-plugin-pwa` 1.x (уже в проекте)
- React Router 8 + `basename`
- GitHub Actions: `configure-pages` / `upload-pages-artifact` / `deploy-pages`
- pnpm (`pnpm/action-setup` + cache)
- Новых npm-зависимостей нет

### Key Files

- `vite.config.ts`, `src/main.tsx`
- `src/screens/ManifestScreen/fetchManifest.ts`
- `public/sw-push.js`, хук push-уведомлений
- `.github/workflows/deploy.yml`
- `playwright.config.ts`, E2E specs
- `docs/project/run-and-build.md`, `docs/project/pwa-checklist.md`

## TESTING

### Strategy

- **Unit:** `fetchManifest`, манифест-фикстуры; тексты scope
- **E2E:** регрессия на preview с nested path (`localhost:4173/edu.pwa-app/`)
- **Ручная:** Pages HTTPS + Application + офлайн/install — после первого деплоя
- **E2E против Pages:** опционально (как в implementation-plan)

### Results

| Проверка           | Результат                              |
| ------------------ | -------------------------------------- |
| `pnpm verify:fast` | ✅ lint + typecheck + 145 unit + build |
| `pnpm test:e2e`    | ✅ 18 passed (baseURL `/edu.pwa-app/`) |
| Новые npm-deps     | нет                                    |

### Осознанный пробел

Нет автотеста против живого Pages URL — ручная проверка после enable Pages + merge/`workflow_dispatch`.

## LESSONS LEARNED

### Technical

- Vite `base` — единый источник; в runtime — `import.meta.env.BASE_URL`, в SW — `registration.scope`
- Relative пути в manifest + plugin `base` корректно собирают webmanifest для subdirectory
- Preview/E2E должны использовать тот же nested path, что и prod project site

### Process

- Для infra + PWA paths Level 3 + CREATIVE окупается: три решения заранее дешевле отладки на Pages
- При смене `base` сразу планировать Playwright `baseURL` и регрессию навигационных `href`
- Ручные шаги GitHub Settings — явный чеклист-пункт, не «потом всплывёт»

### Future Considerations

- После merge/dispatch: ручная проверка manifest, SW, offline, install на `https://vzagl.github.io/edu.pwa-app/`
- Зафиксировать паттерн C3 в tech-stack-pwa / run-and-build как канон для project site
- Опционально: smoke E2E против Pages URL
- README learner guide — отдельный шаг `step-readme-learner-guide`

## REFERENCES

- **Reflection:** [memory-bank/reflection/reflection-step-github-pages-deploy.md](../reflection/reflection-step-github-pages-deploy.md)
- **Creative:** [memory-bank/creative/creative-github-pages-deploy.md](../creative/creative-github-pages-deploy.md)
- **План:** `docs/project/implementation-plan.md` (step-github-pages-deploy)
- **Roadmap:** `docs/project/product-roadmap.md`
- **Vite static deploy:** https://vite.dev/guide/static-deploy
- **Следующий шаг:** `/close-task` → merge в `develop` / `workflow_dispatch` + ручная проверка HTTPS Pages
