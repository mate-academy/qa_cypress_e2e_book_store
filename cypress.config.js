const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {  
  viewportWidth: 1600,
  viewportHeight: 1200,
  baseUrl: `https://demoqa.com/`
  }
});
