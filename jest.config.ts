import type { Config } from 'jest';

const config: Config = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transform: {
		'^.+\\.(jsx?|tsx?)$': [
			'@swc/jest',
			{
				jsc: {
					parser: {
						tsx: true,
						syntax: 'typescript',
					},
					transform: {
						react: {
							runtime: 'automatic',
						},
					},
				},
				isModule: 'unknown',
			},
		],
	},
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/tests/__mocks__/fileMock.ts',
		'\\.svg$': '<rootDir>/tests/__mocks__/svgMock.ts',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'@/(.*)': '<rootDir>/src/$1',
	},
};

export default config;
