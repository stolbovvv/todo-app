import clsx from 'clsx';
import { type TaskData } from '@/libs/definitions';
import { ReactComponent as IconTrash } from '@/assets/icons/icon-trash.svg';
import styles from './Task.module.css';

interface TaskProps {
	className?: string;
	taskData: TaskData;
	onDeleteTask: (id: string) => void;
	onUpdateTask: (id: string) => void;
}

export function Task({ className, taskData, onDeleteTask, onUpdateTask }: TaskProps) {
	const { id, content, completed } = taskData;
	return (
		<div className={clsx(className, styles.task)}>
			<input
				id={id}
				className={styles.task__checkbox}
				type="checkbox"
				checked={completed}
				onChange={() => onUpdateTask(id)}
			/>
			<label className={styles.task__content} htmlFor={id}>
				{content}
			</label>
			<button className={styles.task__button} onClick={() => onDeleteTask(id)}>
				<IconTrash />
			</button>
		</div>
	);
}
