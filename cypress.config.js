const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    viewportHeight: 1200,
    viewportWidth: 1600,
  },
});
