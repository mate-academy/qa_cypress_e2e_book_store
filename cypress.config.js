const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 800,
    viewportWidth: 1300,
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
    }
  }
});
