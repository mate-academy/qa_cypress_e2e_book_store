// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

Cypress.on('uncaught:exception', () => {
  return false
});

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add('login', (username = 'Kurt_Volker', password = 'Qwerty123!') => {
    cy.visit('/login');
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
});