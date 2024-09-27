const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1300,
    viewportWigth: 660,
    setupNodeEvents(on, config) {
    }
  }
});
