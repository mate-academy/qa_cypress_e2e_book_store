const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
    }
  }
});
