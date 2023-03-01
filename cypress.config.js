const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 960,
  viewportHeight: 500,
  e2e: { 
    baseUrl: "https://demoqa.com",
    setupNodeEvents(on, config) {
    },
  },
});
