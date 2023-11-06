const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1600,
    viewportWidth: 1820,
    setupNodeEvents(on, config) {
    },
    execTimeout: 10000,
  }
});
