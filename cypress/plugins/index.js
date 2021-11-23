/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const faker = require("faker");
module.exports = (on, config) => {

  on('before:browser:launch', (browser, launchOptions) => {
    if ((browser.name === 'chrome' || browser.name === 'edge') && browser.isHeadless) {
      launchOptions.args.push('--disable-gpu');
      return launchOptions
    }
  });

  on("task", {
    newUser() {
      user = {
        userFirstName: faker.name.firstName() + `${Math.round(Math.random() * 100000)}`,
        userLastName: faker.name.lastName() + `${Math.round(Math.random() * 100000)}`,
        email: 'test' + `${Math.round(Math.random() * 100000)}` + '@mail.com',
        password: '12345Qwert!',
      };
      return user;
    },
  });
};
