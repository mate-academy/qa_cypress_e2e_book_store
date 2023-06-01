const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1980,
    viewportWidth: 2040,
    defaultCommandTimeout: 10000,

    setupNodeEvents(on, config) {
    },
  },
});
