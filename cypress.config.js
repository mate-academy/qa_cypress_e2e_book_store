const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/login',
    viewportWidth: 1100,
    viewportHeight: 1300,
    setupNodeEvents(on, config) {
    },
  },
});
