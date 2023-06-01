const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    baseUrl: 'https://demoqa.com',
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
    },
  },
});
