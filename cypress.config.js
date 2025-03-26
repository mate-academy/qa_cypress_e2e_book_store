const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://demoqa.com',
    viewportHeight: 1400,
    viewportWidth: 1300,
    setupNodeEvents(on, config) {
    }
  }
});
