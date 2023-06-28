// import globals from 'globals'

const tsParser = require('@typescript-eslint/parser');

const eslintJS = require('@eslint/js');
const eslintTS = require('@typescript-eslint/eslint-plugin');



module.exports = [
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // ...globals.es2020,
        // ...globals.browser,
      }
    },
    plugins: {
      '@typescript-eslint': eslintTS,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...eslintJS.configs.recommended.rules,
      ...eslintTS.configs['eslint-recommended'].overrides[0].rules,
      ...eslintTS.configs.recommended.rules,
    }
  },
];