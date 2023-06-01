const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://demoqa.com/login',
    viewportHeight: 1080,
    viewportWidth: 1980,

  },
});
