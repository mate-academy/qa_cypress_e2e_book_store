const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1400,
    viewportWidth: 1200,
    setupNodeEvents(on, config) {
    }
  }
});
