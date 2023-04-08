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
const {generateUser} = require('../support/generateUser');

Cypress.Commands.add(`findByPlaceholder`, (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});
Cypress.Commands.add(`findById`, (id) => {
    cy.get(`[id = ${id}]`);
});

Cypress.Commands.add('registerUser', () => {
  const user = generateUser();

  return cy.request('POST', 'https://demoqa.com/Account/v1/User', user)
    .then((response) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        password: user.password,
      };
    });
});
  
Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      userName: 'adydyk',
      password: 'Qwer1234!'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.setCookie('token',response.body.token);
    cy.setCookie('userID',response.body.userId);
    cy.setCookie('userName',response.body.username);
    cy.setCookie('expires',response.body.expires);
  });
});