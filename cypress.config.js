const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/login',
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          return {
            password: '12345Qwert!',
            username:'Kasia'
          };
        }
      });
    }
  }
});
