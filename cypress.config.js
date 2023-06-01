/// <reference types="cypress" />

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1960,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
    },
  },
});
