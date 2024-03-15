const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          return {
            password: 'Eltest523!',
            username: 'Elementa'
          };
        }
      });
    }
  }
});
