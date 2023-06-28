import globals from 'globals'

import tsParser from '@typescript-eslint/parser';

import reactRefreshPlugin from 'eslint-plugin-react-refresh';

import eslintJS from '@eslint/js'
import eslintTS from '@typescript-eslint/eslint-plugin';
import eslintReactHooks from 'eslint-plugin-react-hooks';



export default [
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.es2020,
        ...globals.browser,
      }
    },
    plugins: {
      'react-refresh': reactRefreshPlugin,
      '@typescript-eslint': eslintTS,
      'react-hooks': eslintReactHooks,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
      ...eslintJS.configs.recommended.rules,
      ...eslintTS.configs['eslint-recommended'].overrides[0].rules,
      ...eslintTS.configs.recommended.rules,
      ...eslintReactHooks.configs.recommended.rules,
    }
  },
];