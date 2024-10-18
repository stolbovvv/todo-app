import { type RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { type TaskData } from '@/libs/definitions';
import { Task } from './Task';

describe('Task', () => {
	let taskRender: RenderResult;

	const taskData: TaskData = {
		id: '1',
		content: 'Тестируемая задача',
		completed: false,
	};

	const mockOnDeleteTask = jest.fn();
	const mockOnUpdateTask = jest.fn();

	beforeEach(() => {
		taskRender = render(
			<Task taskData={taskData} onDeleteTask={mockOnDeleteTask} onUpdateTask={mockOnUpdateTask} />,
		);
	});

	test('Начальное состояние', () => {
		const label = screen.getByLabelText(taskData.content);
		const checkbox = screen.getByRole('checkbox');

		expect(label).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
	});

	test('Удаление задачи', () => {
		const deleteButton = screen.getByRole('button');

		fireEvent.click(deleteButton);

		expect(mockOnDeleteTask).toHaveBeenCalledWith(taskData.id);
		expect(mockOnDeleteTask).toHaveBeenCalledTimes(1);
	});

	test('Обновление задачи', () => {
		const checkbox = screen.getByRole('checkbox');

		fireEvent.click(checkbox);

		expect(mockOnUpdateTask).toHaveBeenCalledWith(taskData.id);
		expect(mockOnUpdateTask).toHaveBeenCalledTimes(1);

		taskRender.rerender(
			<Task
				taskData={{ ...taskData, completed: true }}
				onDeleteTask={mockOnDeleteTask}
				onUpdateTask={mockOnUpdateTask}
			/>,
		);

		expect(checkbox).toBeChecked();
	});
});
