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

Cypress.Commands.add('loginUI', (username, password) => {
  cy.get('#userName')
    .type(username);

  cy.get('#password')
    .type(password);

  cy.get('#login')
    .click();
});

Cypress.Commands.add('loginAPI', (username, password) => {
  cy.request('POST', 'https://demoqa.com/Account/v1/Login', {
    userName: username,
    password
  }).then(
    (response) => {
      cy.setCookie('token', response.body.token);
      cy.setCookie('userID', response.body.userId);
      cy.setCookie('expires', response.body.expires);
      cy.setCookie('userName', response.body.username);
    });
});

Cypress.Commands.add('assertBook', (id, book) => {
  cy.get('.rt-td')
    .eq(id)
    .should('contain', book);
});
