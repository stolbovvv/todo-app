import { render, screen } from '@testing-library/react';
import { App } from './App';

test('Рендер главной страницы', () => {
	render(<App />);
	expect(screen.getByRole('heading')).toBeInTheDocument();
	expect(screen.getByRole('paragraph')).toBeInTheDocument();
});
