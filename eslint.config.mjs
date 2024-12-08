import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: { ...globals.node, ...globals.browser },
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't need React in scope
      'no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^React$', args: 'none' },
      ],
      'react/jsx-uses-vars': 'error', // Prevent unused JSX variables from being flagged
      'no-undef': 'off',           // Turn off base rule to avoid conflicts with globals
    },
  },
];