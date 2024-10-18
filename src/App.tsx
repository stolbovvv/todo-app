import clsx from 'clsx';
import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type Action, type State, ActionType, FilterType } from '@/libs/definitions';
import { Form, Header, Toolbar } from '@/components';
import styles from './App.module.css';
import { Task } from './components/Task/Task';

const initialState: State = {
	filter: FilterType.all,
	tasks: [
		{ id: uuidv4(), content: 'Получить работу в Mindbox', completed: false },
		{ id: uuidv4(), content: 'Пройти собеседование', completed: false },
		{ id: uuidv4(), content: 'Откликнутся на вакансию Junior front-end разработчик', completed: true },
		{ id: uuidv4(), content: 'Написать тесты для приложения', completed: true },
		{ id: uuidv4(), content: 'Создать ToDo приложение', completed: true },
	],
};

function reducer(state: State, action: Action): State {
	const { type, payload } = action;

	switch (type) {
		case ActionType.changeFilter:
			return { ...state, filter: payload.filter };

		case ActionType.createTask:
			return { ...state, tasks: [payload.task, ...state.tasks] };

		case ActionType.deleteTask:
			return { ...state, tasks: state.tasks.filter(({ id }) => id !== payload.id) };

		case ActionType.updateTask:
			return {
				...state,
				tasks: state.tasks.map((task) => {
					if (task.id === payload.id) {
						return {
							id: task.id,
							content: task.content,
							completed: !task.completed,
						};
					}

					return task;
				}),
			};

		default:
			return state;
	}
}

export function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const changeFilter = (filter: FilterType) => {
		dispatch({
			type: ActionType.changeFilter,
			payload: { filter },
		});
	};

	const createTask = (value: string) => {
		dispatch({
			type: ActionType.createTask,
			payload: {
				task: {
					id: uuidv4(),
					content: value,
					completed: false,
				},
			},
		});
	};

	const deleteTask = (id: string) => {
		dispatch({
			type: ActionType.deleteTask,
			payload: { id },
		});
	};

	const updateTask = (id: string) => {
		dispatch({
			type: ActionType.updateTask,
			payload: { id },
		});
	};

	const filteredTasks = state.tasks.filter((task) => {
		switch (state.filter) {
			case FilterType.completed:
				return task.completed === true;

			case FilterType.active:
				return task.completed !== true;

			case FilterType.all:
				return true;
		}
	});

	const messages = {
		[FilterType.completed]: 'Нет выполненных задач',
		[FilterType.active]: 'Нет активных задач',
		[FilterType.all]: 'Нет задач',
	};

	return (
		<div className={styles.app}>
			<Header />
			<div className={styles.app__body}>
				<Form className={styles.app__form} onSubmit={createTask} />
				<Toolbar
					className={styles.app__toolbar}
					totalCount={state.tasks.length}
					activeCount={state.tasks.filter(({ completed }) => !completed).length}
					currentFilter={state.filter}
					onChangeFilter={changeFilter}
				/>
				<div className={styles.app__content}>
					{filteredTasks.length === 0 ? (
						<p className={clsx(styles.app__message)}>{messages[state.filter]}</p>
					) : (
						filteredTasks.map((taskData) => (
							<Task
								key={taskData.id}
								taskData={taskData}
								onDeleteTask={deleteTask}
								onUpdateTask={updateTask}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
