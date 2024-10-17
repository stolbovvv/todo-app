/**
 * Перечисление типов фильтров для задач.
 * @enum {string}
 */
export enum FilterType {
	/** Показать все задачи */
	all = 'ALL',
	/** Показать активные задачи */
	active = 'ACTIVE',
	/** Показать завершенные задачи */
	completed = 'COMPLETED',
}

/**
 * Интерфейс, представляющий данные задачи.
 */
export interface TaskData {
	/** Уникальный идентификатор задачи */
	id: string;
	/** Содержимое задачи */
	content: string;
	/** Статус выполнения задачи */
	completed: boolean;
}

/**
 * Интерфейс, представляющий состояние приложения.
 */
export interface State {
	/** Текущий фильтр для отображения задач */
	filter: FilterType;
	/** Список задач */
	tasks: TaskData[];
}

/**
 * Перечисление типов действий для управления состоянием.
 * @enum {string}
 */
export enum ActionType {
	/** Изменение фильтра задач */
	changeFilter = 'CHANGE_FILTER',
	/** Создание новой задачи */
	createTask = 'CREATE_TASK',
	/** Удаление задачи */
	deleteTask = 'DELETE_TASK',
	/** Обновление задачи */
	updateTask = 'UPDATE_TASK',
}

/**
 * Интерфейс действия для изменения фильтра.
 */
interface ActionChangeFilter {
	/** Тип действия */
	type: ActionType.changeFilter;
	/** Полезная нагрузка действия */
	payload: {
		/** Новый фильтр для отображения задач */
		filter: FilterType;
	};
}

/**
 * Интерфейс действия для создания новой задачи.
 */
interface ActionCreateTask {
	/** Тип действия */
	type: ActionType.createTask;
	/** Полезная нагрузка действия */
	payload: {
		/** Данные создаваемой задачи */
		task: TaskData;
	};
}

/**
 * Интерфейс действия для удаления задачи.
 */
interface ActionDeleteTask {
	/** Тип действия */
	type: ActionType.deleteTask;
	/** Полезная нагрузка действия */
	payload: {
		/** Уникальный идентификатор задачи для удаления */
		id: string;
	};
}

/**
 * Интерфейс действия для обновления задачи.
 */
interface ActionUpdateTask {
	/** Тип действия */
	type: ActionType.updateTask;
	/** Полезная нагрузка действия */
	payload: {
		/** Уникальный идентификатор задачи для обновления */
		id: string;
	};
}

/**
 * Тип объединения всех действий, которые могут быть выполнены.
 */
export type Action = ActionChangeFilter | ActionCreateTask | ActionDeleteTask | ActionUpdateTask;
