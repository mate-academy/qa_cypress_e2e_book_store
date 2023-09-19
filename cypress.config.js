const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1100,
    viewportWidth: 1400,
    setupNodeEvents(on, config) {
    }
  }
});
