import { addLeadingZero } from './utilities';

describe('addLeadingZero', () => {
	test('Ведущий ноль для однозначных чисел', () => {
		expect(addLeadingZero(0)).toBe('00');
		expect(addLeadingZero(9)).toBe('09');
	});

	test('Без изменений для двузначных чисел', () => {
		expect(addLeadingZero(10)).toBe('10');
		expect(addLeadingZero(19)).toBe('19');
	});
});
