const { defineConfig } = require('cypress');
const faker = require("faker");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1050,
    viewportWidth: 1680
  },
});
