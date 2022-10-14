/* eslint-env node */
'use strict';

module.exports = {
  root: true,
  ignorePatterns: ['dist/**/*'],
  overrides: [
    {
      files: ['*.js'],
      parserOptions: { ecmaVersion: 'latest' },
      env: { es2021: true },
      plugins: ['@typescript-eslint', 'import'],
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    },
    {
      files: ['*.ts'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      env: { browser: true, es2021: true },
      plugins: ['@typescript-eslint', 'import'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'plugin:import/typescript',
      ],
    },
  ],
};
