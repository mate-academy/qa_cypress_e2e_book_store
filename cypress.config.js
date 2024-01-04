const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1080,
    viewportWidth: 1320,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            firstName: 'Shanti',
            lastName: 'Shantihi',
            userName: 'Shanti',
            password: 'Gthtvjuf24'
          };
        }
      });
    }
  }
});
