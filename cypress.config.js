const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/register',

    setupNodeEvents(on, config) {
    }
  }
});
