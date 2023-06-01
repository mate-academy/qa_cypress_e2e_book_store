const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/login',
    viewportHeight: 1000,
    setupNodeEvents(on, config) {
    },
  },
});
