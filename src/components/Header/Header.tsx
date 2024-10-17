import clsx from 'clsx';
import styles from './Header.module.css';

interface HeaderProps {
	className?: string;
}

export function Header({ className }: HeaderProps) {
	return (
		<header className={clsx(className, styles.header)}>
			<h1 className={styles.header__heading}>TODO</h1>
		</header>
	);
}
