const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
    }
  }
});
