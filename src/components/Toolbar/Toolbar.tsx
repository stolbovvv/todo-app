import clsx from 'clsx';
import { FilterType } from '@/libs/definitions';
import { addLeadingZero } from '@/libs/utilities';
import styles from './Toolbar.module.css';

interface Button {
	id: string;
	type: FilterType;
	label: string;
}

interface ToolbarProps {
	className?: string;
	totalCount: number;
	activeCount: number;
	currentFilter: FilterType;
	onChangeFilter: (filter: FilterType) => void;
}

const buttons: Button[] = [
	{ id: '1', type: FilterType.all, label: 'Все' },
	{ id: '2', type: FilterType.active, label: 'Активные' },
	{ id: '3', type: FilterType.completed, label: 'Выполенные' },
];

export function Toolbar({ className, totalCount, activeCount, currentFilter, onChangeFilter }: ToolbarProps) {
	return (
		<div className={clsx(className, styles.toolbar)}>
			<div className={styles.toolbar__tasks}>
				<span className={styles.toolbar__label}>Задачи</span>
				<span className={styles.toolbar__counter}>
					<span>{addLeadingZero(activeCount)}</span>
					<span>/</span>
					<span>{addLeadingZero(totalCount)}</span>
				</span>
			</div>
			<div className={styles.toolbar__filter}>
				{buttons.map(({ id, type, label }) => (
					<button
						key={id}
						className={clsx(styles.toolbar__button, {
							[styles.toolbar__button_current]: type === currentFilter,
						})}
						onClick={() => onChangeFilter(type)}
					>
						{label}
					</button>
				))}
			</div>
		</div>
	);
}
