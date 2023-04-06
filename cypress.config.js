const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1000,
    viewportHeight: 1000,
    setupNodeEvents(on, config) {
    },
  },
});
