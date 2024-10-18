import { type RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { FilterType } from '@/libs/definitions';
import { Toolbar } from './Toolbar';

describe('Toolbar', () => {
	let ToolbarRender: RenderResult;

	const mockOnChangeFilter = jest.fn();

	beforeEach(() => {
		ToolbarRender = render(
			<Toolbar
				className="toolbar"
				totalCount={10}
				activeCount={5}
				currentFilter={FilterType.all}
				onChangeFilter={mockOnChangeFilter}
			/>,
		);
	});

	test('Начальное состояние', () => {
		const buttons = screen.getAllByRole('button');
		const allButton = screen.getByText('Все');

		expect(buttons).toHaveLength(3);
		expect(screen.getByText('05')).toBeInTheDocument();
		expect(screen.getByText('10')).toBeInTheDocument();

		expect(allButton).toHaveClass('toolbar__button_current');
	});

	test('Смена фильтра на активные', () => {
		const activeButton = screen.getByText('Активные');

		fireEvent.click(activeButton);

		ToolbarRender.rerender(
			<Toolbar
				className="toolbar"
				totalCount={10}
				activeCount={5}
				currentFilter={FilterType.active}
				onChangeFilter={mockOnChangeFilter}
			/>,
		);

		expect(activeButton).toHaveClass('toolbar__button_current');
	});

	test('Смена фильтра на выполненные', () => {
		const completedButton = screen.getByText('Выполенные');

		fireEvent.click(completedButton);

		ToolbarRender.rerender(
			<Toolbar
				className="toolbar"
				totalCount={10}
				activeCount={5}
				currentFilter={FilterType.completed}
				onChangeFilter={mockOnChangeFilter}
			/>,
		);

		expect(completedButton).toHaveClass('toolbar__button_current');
	});
});
