const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1100,
    viewportWidth: 900
  },
});
