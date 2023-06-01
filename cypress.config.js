const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeigh: 1080,
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
    },
  },
});
