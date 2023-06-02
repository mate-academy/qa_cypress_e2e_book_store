const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/login',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
    },
  },
});
