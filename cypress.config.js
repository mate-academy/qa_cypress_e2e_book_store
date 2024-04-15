const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    pageLoadTimeout: 90000,
    setupNodeEvents(on, config) {
    }
  }
});
