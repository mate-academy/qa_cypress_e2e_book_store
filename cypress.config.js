const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1080,
    viewportWidth: 1980,
    setupNodeEvents(on, config) {
    },
  },
});
