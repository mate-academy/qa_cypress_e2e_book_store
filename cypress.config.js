const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 980,
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
    },
  },
});
