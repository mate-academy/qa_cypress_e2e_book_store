const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/login',
    setupNodeEvents(on, config) {
    },
  },
});
