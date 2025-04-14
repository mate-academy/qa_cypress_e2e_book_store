const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/',
    viewportHeight: 1000,
    viewportWidth: 1400,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
    }
  }
});
