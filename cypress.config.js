const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/',
    viewportHeight: 1320,
    viewportWidth: 1080,
    setupNodeEvents(on, config) {
    }
  }
});
