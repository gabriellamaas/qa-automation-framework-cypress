const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'QA Automation Framework - Cypress',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 8000,
  video: false,
  screenshotOnRunFailure: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    apiUrl: 'https://jsonplaceholder.typicode.com',
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },
  },
})
