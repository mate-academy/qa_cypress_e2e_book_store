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


Cypress.Commands.add('login', (username = 'UserMO', password = '12345Qwert!') => {
    cy.visit("/login");
    cy.get('#userName').type('UserMO');
    cy.get('#password').type('12345Qwert!');
    cy.get('#login').click();
    cy.url().should('include', '\profile')
});

Cypress.Commands.add('checkAlert1', () => {
    cy.once('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`);
      });
});

Cypress.Commands.add('checkAlert2', () => {
    cy.once('window:alert', (str) => {
        expect(str).to.equal(`Book deleted.`);
      });
});