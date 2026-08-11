/**
 * Smoke-тест окружения Vitest + jsdom.
 * Не импортирует App и не покрывает существующий UI.
 */
describe('Тестовое окружение', () => {
	it('должен выполнять простой assertion', () => {
		expect(true).toBe(true);
	});

	it('должен предоставлять DOM через jsdom', () => {
		const element = document.createElement('div');
		element.textContent = 'smoke';
		document.body.appendChild(element);

		expect(document.body.textContent).toContain('smoke');
	});
});
