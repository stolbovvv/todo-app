import { fireEvent, render, screen } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
	const mockOnSubmit = jest.fn();

	beforeEach(() => {
		mockOnSubmit.mockClear();
		render(<Form onSubmit={mockOnSubmit} />);
	});

	test('Начальное состояние', () => {
		const input = screen.getByTestId('input');
		const error = screen.queryByTestId('error');

		expect(input).toBeInTheDocument();
		expect(input).toHaveValue('');
		expect(error).not.toBeInTheDocument();
	});

	test('Изменение значения', () => {
		const input = screen.getByTestId('input');
		const error = screen.queryByTestId('error');

		fireEvent.change(input, { target: { value: 'Текст новой задачи' } });

		expect(input).toHaveValue('Текст новой задачи');
		expect(error).not.toBeInTheDocument();
	});

	test('Отправка валидного значения', () => {
		const form = screen.getByTestId('form');
		const input = screen.getByTestId('input');

		fireEvent.change(input, { target: { value: 'абв' } });
		fireEvent.submit(form);

		expect(mockOnSubmit).toHaveBeenCalledWith('абв');
		expect(mockOnSubmit).toHaveBeenCalledTimes(1);
		expect(input).toHaveValue('');
		expect(screen.queryByTestId('error')).not.toBeInTheDocument();
	});

	test('Отправка невалидного значения', () => {
		const form = screen.getByTestId('form');
		const input = screen.getByTestId('input');

		fireEvent.change(input, { target: { value: 'аб' } });
		fireEvent.submit(form);

		expect(mockOnSubmit).not.toHaveBeenCalled();
		expect(screen.getByTestId('error')).toBeInTheDocument();
	});
});
