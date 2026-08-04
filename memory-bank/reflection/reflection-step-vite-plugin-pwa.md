# Level 2 Enhancement Reflection: Подключить vite-plugin-pwa

**Task ID:** `step-vite-plugin-pwa`  
**Дата рефлексии:** 2026-08-04  
**Ветка:** `feat/step-vite-plugin-pwa`

## Enhancement Summary

Подключён `vite-plugin-pwa@^1.3.0` с стратегией `generateSW` (Workbox precache): production-сборка генерирует `sw.js`, `manifest.webmanifest` и workbox-runtime; manifest и theme-color инжектируются плагином в HTML. Удалены ручные `public/sw.js` и `public/manifest.webmanifest`; единый источник manifest — `vite.config.ts`. Регистрация SW сохранена через `registerSw.ts` (`injectRegister: null`). SW в dev отключён; E2E проверяет preview. TDD: новый `e2e/service-worker-pwa.spec.ts` (3 теста). Verify: lint ✅, build ✅, test (16) ✅, e2e (8) ✅. Обновлён `docs/project/config-schema.md`.

## What Went Well

- **PLAN → BUILD без отклонений** — все 5 решений по открытым вопросам (удаление `public/sw.js`, manifest в конфиге, `injectRegister: null`, SW off в dev, отдельный E2E spec) реализованы как зафиксировано в tasks.md.
- **Плавная миграция с ручного SW** — `registerSw.ts` и путь `/sw.js` не менялись; unit-тесты `registerSw.test.ts` остались зелёными; паттерн `src/pwa/` сохранён для следующего шага `step-sw-update-ux`.
- **Единый источник manifest** — значения из предыдущего `public/manifest.webmanifest` перенесены в `VitePWA.manifest`; существующие E2E (`web-app-manifest.spec.ts`, `manifest-lesson.spec.ts`) продолжают проходить без правок.
- **E2E-покрытие SW** — три сценария: загрузка preview, HTTP 200 + Workbox в теле `/sw.js`, регистрация со scope `/` через `waitForFunction`; закрывает пробел предыдущей задачи (SW без автоматизации).
- **Verify-набор полный** — lint, build (11 precache entries), 16 unit + 8 e2e; артефакты `dist/sw.js`, `dist/manifest.webmanifest`, `dist/workbox-*.js` подтверждают корректную сборку.
- **Документация синхронизирована** — `config-schema.md` указывает на `vite.config.ts` как источник правды; чеклист «нет дублирования manifest/theme-color в index.html» актуален.

## Challenges Encountered

- **Конфликт двух `/sw.js`** — `public/sw.js` (ручной) и generated SW от Workbox не могут сосуществовать; Vite копирует `public/` as-is, что перекрыло бы precache.
- **Дублирование manifest в HTML** — ручные `<link rel="manifest">` и `<meta name="theme-color">` в `index.html` конфликтовали бы с инжектом плагина при сборке.
- **Асинхронная регистрация SW в E2E** — `navigator.serviceWorker.getRegistration()` сразу после `goto` часто возвращает `null`; нужен retry/wait.
- **SW недоступен в dev** — без `devOptions.enabled` регистрация в `main.tsx` no-op в `pnpm dev`; проверка только через preview/deploy.
- **Workbox precache scope** — `globPatterns` должны включать все нужные типы файлов; иначе часть статики не попадёт в precache.

## Solutions Applied

- Удалены `public/sw.js` и `public/manifest.webmanifest` до первого build с плагином; generated SW — единственный источник.
- Из `index.html` убраны manifest link и theme-color meta; плагин добавляет их при сборке.
- `injectRegister: null` + существующий `registerSw.ts` — ручной контроль регистрации без дублирования с `injectRegister: 'auto'`.
- E2E: `page.waitForFunction` с timeout 10s для ожидания registration; проверка scope через regex `/$`.
- SW в dev намеренно отключён (без `devOptions`); E2E и ручная проверка — через `pnpm preview`.
- `globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}']` — покрывает MVP-статику сборки.

## Key Technical Insights

- **`injectRegister: null`** — плагин генерирует SW и manifest, но не вставляет `<script>` регистрации; удобно для учебного паттерна явной регистрации в `src/pwa/`.
- **`registerType: 'autoUpdate'`** — SW обновляется при новой сборке; UI prompt для пользователя — отдельная задача (`step-sw-update-ux`).
- **Manifest из конфига** — `manifestFilename: 'manifest.webmanifest'` сохраняет совместимость с существующими E2E и уроками; URL `/manifest.webmanifest` не меняется.
- **`includeAssets`** — favicon и icons попадают в precache/manifest pipeline без дублирования в `globPatterns`.
- **Preview vs dev** — vite-plugin-pwa активен только при production build; для PWA-функций в разработке нужен явный `devOptions.enabled` (осознанно не включали).

## Process Insights

- **Таблица «Решения по открытым вопросам» в PLAN** — сняла неопределённость до BUILD; все 5 пунктов реализованы без пересмотра.
- **Challenges & Mitigations** — риски (дубли HTML, async SW, HMR, конфликт sw.js) были предусмотрены; mitigations сработали без сюрпризов.
- **Level 2 без CREATIVE** — конфигурационная задача; детальный Implementation Plan в tasks.md достаточен для BUILD без creative phase.
- **TDD для E2E** — отдельный spec `service-worker-pwa.spec.ts` не ломает существующие manifest-тесты; red → green изолирован.
- **Verify до REFLECT** — все чеклисты BUILD отмечены; REFLECT опирается на зафиксированные результаты в progress.md.

## Action Items for Future Work

- **`/archive` и `/close-task`** — финализация задачи (completed-запись, обновление `implementation-plan.md`).
- **Ручная проверка DevTools** — Application → Service Workers: precache entries (11), scope `/`; Cache Storage → workbox-precache.
- **Следующий шаг плана** — `step-sw-update-ux` (Order 3.1.3): UI при обновлении SW, используя `registerType: 'autoUpdate'` и паттерн `src/pwa/`.
- **`devOptions` (опционально)** — если понадобится тестировать SW в `pnpm dev`, включить `devOptions: { enabled: true }` с пониманием влияния на HMR.
- **Offline fallback** — следующие шаги фазы 3 (offline page, runtime caching) строятся на текущем Workbox SW.

## Time Estimation Accuracy

- Estimated time: ~2–3 ч (PLAN + конфиг плагина + миграция файлов + E2E + docs + verify)
- Actual time: одна сессия 2026-08-04 (PLAN → BUILD → REFLECT)
- Variance: в пределах оценки
- Reason: решения зафиксированы в PLAN; инфраструктура preview/E2E уже отработана; основная работа — конфиг и удаление дублей, без UI и creative
