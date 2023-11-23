module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react-refresh', 'simple-import-sort'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
	overrides: [
		{
			files: ['**/*.js', '**/*.ts', '**/*.tsx'],
			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							// `react` first, `next` second, then packages starting with a character
							['^react$', '^next', '^[a-z]'],
							// Packages starting with `@`
							['^@'],
							// Packages starting with `~`
							['^~'],
							// Imports starting with `../`
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							// Imports starting with `./`
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
							// Style imports
							['^.+\\.s?css$'],
							// Side effect imports
							['^\\u0000'],
						],
					},
				],
			},
		},
		{
			files: ['*.ts'],
			rules: {
				'no-unused-vars': 'off',
			},
		},
	],
};
