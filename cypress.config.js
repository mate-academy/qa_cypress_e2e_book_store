const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1220,
    viewportWidth: 1000,
    setupNodeEvents(on, config) {
    },
  },
});
