const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 900,
    viewportWidth: 1260,
  },
});
