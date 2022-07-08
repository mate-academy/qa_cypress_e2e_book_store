const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1280,
    viewportWidth: 1280,
    defaultCommandTimeout: 6000,
  },
})
