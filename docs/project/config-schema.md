# Схема Web App Manifest

Манифест PWA описывает, как браузер и ОС представляют приложение при установке.

**Единый источник правды:** `vite.config.ts` → опция `manifest` плагина `VitePWA`. Файл `manifest.webmanifest` генерируется при сборке в `dist/`; статический файл в `public/` не используется.

## Минимально необходимые поля (MVP)

| Поле               | Тип    | Описание                                                   |
| ------------------ | ------ | ---------------------------------------------------------- |
| `name`             | string | Полное имя приложения                                      |
| `short_name`       | string | Короткое имя на домашнем экране                            |
| `start_url`        | string | URL при запуске (обычно `/` или `./`)                      |
| `display`          | string | `standalone`, `minimal-ui`, `fullscreen` или `browser`     |
| `background_color` | string | Цвет splash screen                                         |
| `theme_color`      | string | Цвет UI браузера / status bar                              |
| `icons`            | array  | Минимум 192×192 и 512×512 PNG (или поддерживаемые форматы) |

## Рекомендуемые поля

| Поле          | Описание                           |
| ------------- | ---------------------------------- |
| `description` | Краткое описание для store-like UI |
| `lang`        | Язык, например `ru`                |
| `orientation` | `portrait` / `landscape` / `any`   |
| `scope`       | Область навигации PWA (обычно `/`) |

## Конфигурация в vite.config.ts

```typescript
VitePWA({
	registerType: 'prompt',
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
});
```

Плагин при сборке инжектирует в HTML:

- `<link rel="manifest" href="/manifest.webmanifest">`

`theme_color` задаётся в manifest (браузер читает из `manifest.webmanifest`); отдельный `<meta name="theme-color">` в `index.html` не дублировать.

## Иконки

### Favicon и manifest

| Ресурс         | Файл                                        | Назначение                   |
| -------------- | ------------------------------------------- | ---------------------------- |
| Favicon        | `public/favicon.svg`                        | Иконка вкладки браузера      |
| Manifest icons | `public/icons/icon-192.png`, `icon-512.png` | Установка PWA, splash screen |

Единый визуальный стиль: книга на фиолетовом градиенте (`#646cff` → `#863bff`), белая страница, текст `#646cff`. На favicon (48×48) — только «edu»; на PNG 192+ — «edu» и «PWA».

### Каталог manifest-иконок

- Каталог: `public/icons/`
- Для maskable-иконок добавить `"purpose": "maskable"` (отдельный ресурс или combined `any maskable` по доке платформы)

## Service Worker

- Стратегия: `generateSW` (Workbox precache статики из сборки)
- `registerType: 'prompt'` — при waiting worker показывается баннер «Доступно обновление»; активация через `updateSW(true)` (`skipWaiting` по сообщению клиента)
- Регистрация: вручную через `src/pwa/swUpdateController.ts` + `virtual:pwa-register` (`injectRegister: null`)
- UI обновления: `SwUpdateBanner` (fixed bottom) + `useSwUpdate`
- SW в dev: отключён (без `devOptions.enabled`)
- Проверка: `pnpm build && pnpm preview`, E2E `e2e/service-worker-pwa.spec.ts`; полный update-flow — ручная проверка (rebuild → refresh)

## Чеклист для ИИ

- [ ] Все обязательные поля MVP заполнены в `vite.config.ts` → `VitePWA.manifest`
- [ ] `start_url` и `scope` согласованы с деплоем
- [ ] Иконки существуют по указанным путям в `public/icons/`
- [ ] Нет дублирования manifest/theme-color в `index.html`
- [ ] Нет статического `public/manifest.webmanifest` — только генерация плагином
