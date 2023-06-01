const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1220,
    setupNodeEvents(on, config) {
    }
  }
});
