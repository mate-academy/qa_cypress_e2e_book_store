const { defineConfig } = require('cypress');
const faker = require("faker");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1050,
    viewportWidth: 1680,
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          user = {
            username: faker.name.firstName() + `${Math.round(Math.random() * 100000)}`,
            email: 'test' +  `${Math.round(Math.random() * 100000)}` + '@mail.com',
            password: faker.internet.password(),
          };
          return user;
        },
        generateArticle() {
          article = {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.text(),
          };
          return article;
        },
      });
    },
  },
});
