const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1080,
  viewportHeight: 1200,
  e2e: {
    setupNodeEvents(on, config) {
    }
  }
});
