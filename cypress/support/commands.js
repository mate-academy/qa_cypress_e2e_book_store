// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('findBySelector', (id) => {
  cy.get(`#${id}`);
});

Cypress.Commands.add('clickOnButton', (id) => {
  cy.findBySelector(id).click();
});

Cypress.Commands.add('login', (username, password, buttonId) => {
  cy.findBySelector('userName').type(username);
  cy.findBySelector('password').type(password);
  cy.clickOnButton(buttonId);
});

Cypress.Commands.add('apiLogin', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      userName: `${username}`,
      password: `${password}`,
    },
  }).then((response) => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('yserName', response.body.username);
    cy.setCookie('expires', response.body.expires);
  });
});

Cypress.Commands.add('findByClass', (selector) => {
    cy.get(`.${selector}`);
  });