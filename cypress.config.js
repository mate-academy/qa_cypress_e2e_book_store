const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1500,
    viewportHeight: 1600,
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
    }
  }
});
