/**
 * Добавляет ведущий ноль к числу, если оно меньше 10.
 *
 * @param {number} value - Число, к которому может быть добавлен ведущий ноль.
 * @returns {string} Число в виде строки с ведущим нулем, если оно меньше 10.
 */

export function addLeadingZero(value: number): string {
	if (value < 10) return `0${value}`;
	return `${value}`;
}
