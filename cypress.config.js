const { defineConfig } = require('cypress');
const faker = require("faker");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1080,
    viewportWidth: 1340,
    setupNodeEvents(on, config) {
    },
  },
});
