const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1080,
    viewportHeight: 1320,
    setupNodeEvents(on, config) {
    },
  },
});

