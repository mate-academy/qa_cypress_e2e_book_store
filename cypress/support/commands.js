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
Cypress.Commands.add('findById', (id) => {
  cy.get(`#${id}`);
});

Cypress.Commands.add('clickButton', (id) => {
  cy.findById(id).click();
});

Cypress.Commands.add('loginViaUi', (username, password, buttonId) => {
  cy.findById('userName').type(username);
  cy.findById('password').type(password);
  cy.clickButton(buttonId);
});

Cypress.Commands.add('loginViaApi', (username, password) => {
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

Cypress.Commands.add('findByClass', (classOfelement) => {
    cy.get(`.${classOfelement}`);
  });