# Task Reflection: Деплой на GitHub Pages

**Task ID:** `step-github-pages-deploy`  
**Дата рефлексии:** 2026-08-11  
**Ветка:** `feat/step-github-pages-deploy`  
**Complexity:** Level 3 (Intermediate Feature)

## Summary

Настроен деплой учебного PWA на GitHub Pages (project site `https://vzagl.github.io/edu.pwa-app/`): Vite `base: '/edu.pwa-app/'`, выравнивание PWA-путей (relative manifest · `BASE_URL` в app · `registration.scope` в SW), `BrowserRouter` с `basename`, GitHub Actions workflow на `develop` + `workflow_dispatch` с pnpm (не npm), обновлены `run-and-build.md` и `pwa-checklist.md`. Verify: `pnpm verify:fast` ✅ (145 unit); `pnpm test:e2e` ✅ (18, baseURL `/edu.pwa-app/`). Ручная проверка HTTPS Pages — после enable Pages + merge/dispatch.

## 1. Overall Outcome & Requirements Alignment

| Требование                                      | Статус         |
| ----------------------------------------------- | -------------- |
| Vite `base` для project site (`/<repo>/`)       | ✅             |
| Manifest / SW / icons / router под `base`       | ✅             |
| CI: `pnpm build` → publish `dist/`              | ✅             |
| Docs: деплой + чеклист на HTTPS Pages           | ✅             |
| Регрессия lint / typecheck / unit / build / e2e | ✅             |
| Без новых npm-зависимостей                      | ✅             |
| Ручная проверка на живом Pages                  | ⏳ после merge |

Отклонений от PLAN/CREATIVE (C1–C3) нет. README learner guide осознанно вне scope (`step-readme-learner-guide`).

**Оценка:** задача успешна на уровне кода, CI и docs; живой HTTPS-стенд — следующий операционный шаг владельца репо.

## 2. Planning Phase Review

- PLAN в `tasks.md` (4 фазы: base+PWA paths → Actions → docs → verify) совпал с BUILD.
- Component Analysis и Challenges & Mitigations заранее закрыли absolute `/…`, basename, `develop` vs `main`, only-allow pnpm.
- **Что можно улучшить:** в PLAN явно заложить обновление Playwright `baseURL` и E2E `href` при смене Vite `base` (в Challenges mitigation было «не трогать без нужды» — на практике трогать пришлось).

## 3. Creative Phase Review

- CREATIVE оправдан: три независимые развилки (base / trigger / path strategy).
- **C1 Option A** — явный `base` прозрачен для учебного проекта; `BASE_URL` стал источником истины.
- **C2 B + dispatch** — совпал с git-workflow (`develop`); pnpm вместо npm из примера Vite.
- **C3 гибрид** — правильно учёл разные среды (manifest / TS / static SW); без хардкода имени репо в runtime.
- Friction: минимальный; сюрприз BUILD — каскад E2E под nested path (не в CREATIVE, но предсказуем).

## 4. Implementation Phase Review

### Что прошло хорошо

- CREATIVE → BUILD без отклонений по C1–C3.
- Минимальный runtime-хардкод: имя репо только в `vite.config.ts`.
- `sw-push.js` через `registration.scope` — устойчив к смене base.
- Docs уточнили отличие Pages репозитория от `github.com/settings/pages`.

### Сложности

- Absolute paths ripple: manifest, `fetchManifest`, push icons, lesson copy scope.
- Playwright preview должен зеркалить prod nested path — иначе ложные падения E2E.
- Ручной enable Pages в Settings — вне кода; зафиксирован в docs.

## 5. Testing Phase Review

- Unit: `fetchManifest` / ManifestScreen под base / relative URL.
- E2E: 18 passed с `baseURL` `/edu.pwa-app/`; `href` учитывает basename.
- Verify-матрица дала уверенность до merge.
- **Пробел (осознанный):** нет автотеста против живого Pages URL — ручная проверка после первого деплоя.

## What Went Well

1. **CREATIVE C1–C3 до BUILD** — сняли главный риск absolute paths и неверной копии Vite workflow.
2. **Гибрид C3** — канон для project site без дублирования `/edu.pwa-app/` в app/SW.
3. **Workflow под реалии репо** — `develop` + pnpm + `workflow_dispatch`.
4. **Verify на nested path** — preview и Playwright отражают prod.
5. **Docs** — URL, Settings → Pages → Actions, чеклист HTTPS.

## Challenges

| Вызов                          | Как решён                                       |
| ------------------------------ | ----------------------------------------------- |
| Absolute `/icons`, `start_url` | C3: relative manifest + `BASE_URL` + scope в SW |
| Router без basename            | `basename={import.meta.env.BASE_URL}`           |
| Vite-пример на `main` + npm    | C2: `develop` + `pnpm/action-setup`             |
| E2E на корне preview           | Playwright `baseURL` + правки `href`            |
| Enable Pages вручную           | Docs + отложенная ручная проверка после merge   |

## Lessons Learned

### Technical

- Vite `base` — единый источник; в runtime — `import.meta.env.BASE_URL`, в SW — `registration.scope`.
- Relative пути в manifest + plugin `base` корректно собирают webmanifest для subdirectory.
- Preview/E2E должны использовать тот же nested path, что и prod project site.

### Process

- Для infra + PWA paths Level 3 + CREATIVE окупается: три решения заранее дешевле отладки на Pages.
- При смене `base` сразу планировать Playwright `baseURL` и регрессию навигационных `href`.
- Ручные шаги GitHub Settings — явный чеклист-пункт, не «потом всплывёт».

## Process Improvements

- В PLAN для задач с Vite `base`: отдельный подпункт «Playwright baseURL / E2E paths».
- В Challenges для Pages: явно «Settings → Pages → GitHub Actions» как внешний blocker первого деплоя.

## Technical Improvements

- Зафиксировать паттерн C3 в tech-stack-pwa / run-and-build как канон для project site.
- Опционально позже: smoke E2E против Pages URL (как в implementation-plan).

## Next Steps

1. `/archive` → `/close-task`
2. Merge в `develop` (или `workflow_dispatch`) после enable Pages
3. Ручная проверка: manifest, SW, offline, install на `https://vzagl.github.io/edu.pwa-app/`
