import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const noDefaultExportRules = {
	'no-restricted-syntax': [
		'error',
		{
			selector: 'ExportDefaultDeclaration',
			message:
				'Не используйте export default в src/. Используйте named export. См. docs/project/tech-stack-frontend.md',
		},
		{
			selector: 'ExportNamedDeclaration[specifiers.0.type="ExportDefaultSpecifier"]',
			message:
				'Не используйте export { … as default } в src/. Используйте named export. См. docs/project/tech-stack-frontend.md',
		},
	],
};

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			globals: globals.browser,
		},
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		rules: noDefaultExportRules,
	},
]);
