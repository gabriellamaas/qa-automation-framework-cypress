import js from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: [
      'node_modules/',
      'cypress/reports/',
      'cypress/screenshots/',
      'cypress/videos/',
      'cypress/downloads/',
    ],
  },
  js.configs.recommended,
  {
    files: ['cypress/**/*.js'],
    ...pluginCypress.configs.recommended,
    languageOptions: {
      ...pluginCypress.configs.recommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...pluginCypress.configs.recommended.languageOptions?.globals, ...globals.browser },
    },
  },
  {
    files: ['cypress/e2e/**/*.cy.js'],
    rules: {
      // Chai usa expressões como `expect(x).to.be.empty`.
      'no-unused-expressions': 'off',
    },
  },
  {
    files: ['cypress.config.js'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
  eslintConfigPrettier,
]
