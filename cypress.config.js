const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/',
    viewportWidth: 1320,
    viewportHeight: 1080,
    execTimeout: 8000,
    setupNodeEvents(on, config) {
    }
  }
});
