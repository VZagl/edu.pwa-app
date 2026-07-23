# Схема Web App Manifest

Манифест PWA описывает, как браузер и ОС представляют приложение при установке. Файл: **`public/manifest.webmanifest`** (или путь, заданный в `vite-plugin-pwa`).

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

## Пример

```json
{
	"name": "edu.pwa-app — учебное PWA",
	"short_name": "PWA Lab",
	"description": "Изучение Progressive Web Apps на React и Vite",
	"start_url": "/",
	"scope": "/",
	"display": "standalone",
	"background_color": "#ffffff",
	"theme_color": "#646cff",
	"lang": "ru",
	"icons": [
		{
			"src": "/icons/icon-192.png",
			"sizes": "192x192",
			"type": "image/png",
			"purpose": "any"
		},
		{
			"src": "/icons/icon-512.png",
			"sizes": "512x512",
			"type": "image/png",
			"purpose": "any"
		}
	]
}
```

## Подключение в HTML

```html
<link rel="manifest" href="/manifest.webmanifest" /> <meta name="theme-color" content="#646cff" />
```

## Иконки

- Каталог: `public/icons/`
- Для maskable-иконок добавить `"purpose": "maskable"` (отдельный ресурс или combined `any maskable` по доке платформы)

## Связь с vite-plugin-pwa

После шага `step-vite-plugin-pwa` часть полей может задаваться в `vite.config.ts` (`manifest` option плагина). **Единый источник правды** — не дублировать противоречивые manifest в двух местах; при генерации плагином обновить этот документ и [config-schema.md](./config-schema.md) в той же задаче.

## Чеклист для ИИ

- [ ] Все обязательные поля MVP заполнены
- [ ] `start_url` и `scope` согласованы с деплоем
- [ ] Иконки существуют по указанным путям
- [ ] `theme_color` совпадает с `<meta name="theme-color">`
