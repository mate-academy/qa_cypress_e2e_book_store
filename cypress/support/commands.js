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
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('login', (username = 'Adam', password = '12345Qwert!') => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      userName: username,
      password
    }
  }).then((response) => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('expires', response.body.expires);
    cy.setCookie('userName', response.body.username);
  });
});

Cypress.Commands.add('addNewBook', () => {
  cy.get('#gotoStore').click();
  cy.findByPlaceholder('Type to search').type('Speaking JavaScript');
  cy.contains('a', 'Speaking JavaScript').click();
  cy.contains('#addNewRecordButton', 'Add To Your Collection')
    .click();
  cy.visit('/profile');
  cy.contains('a', 'Speaking JavaScript').should('be.visible');
});
