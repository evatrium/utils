module.exports = {
	env: {
		commonjs: true,
		node: true,
		browser: true,
		es6: true,
		jest: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier'
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
		quotes: [
			'warn',
			'single',
			{
				avoidEscape: true
			}
		],
		'@typescript-eslint/no-unused-vars': [
			'off',
			{
				ignoreRestSiblings: true
			}
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off'
	}
};
