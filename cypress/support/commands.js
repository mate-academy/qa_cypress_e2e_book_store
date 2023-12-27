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

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder='${placeholder}']`);
});

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'https://demoqa.com/Account/v1/Login', {
    userName: user.username,
    password: user.password
  }).then((response) => {
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('token', response.body.token);
    cy.setCookie('userName', response.body.username);
    cy.setCookie('expires', response.body.expires);
  });
});
