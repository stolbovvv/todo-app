import { type ChangeEvent, type FormEvent, useState } from 'react';
import clsx from 'clsx';
import { ReactComponent as IconPlus } from '@/assets/icons/icon-plus.svg';
import styles from './Form.module.css';

interface FormProps {
	className?: string;
	onSubmit: (value: string) => void;
}

export function Form({ className, onSubmit }: FormProps) {
	const [error, setError] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');

	const changeValue = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (error) {
			setError(false);
		}

		setValue(target.value);
	};

	const submitValue = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (value.length < 3) {
			setError(true);
		} else {
			onSubmit(value);
			setValue('');
		}
	};

	return (
		<form className={clsx(className, styles.form)} onSubmit={submitValue}>
			<div className={styles.form__body}>
				<input
					className={clsx(styles.form__search, { [styles.form__search_error]: error })}
					type="text"
					placeholder="Добавить новую задачу"
					value={value}
					onChange={changeValue}
				/>
				<button className={styles.form__button} type="submit">
					<span>Добавить</span>
					<IconPlus />
				</button>
			</div>
			{error && <p className={styles.form__error}>Введите название, длинной более 3 символов!</p>}
		</form>
	);
}
