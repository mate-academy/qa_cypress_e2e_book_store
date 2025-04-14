const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1200,
    viewportWidth: 1000,
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
    }
  }
});
