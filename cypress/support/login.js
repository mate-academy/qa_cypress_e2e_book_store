/// <reference types="cypress" />

Cypress.Commands.add('login', (username="Sup3rT3st3r!", password="Sup3rT3st3r!") => { 
  cy.intercept('POST', '/Account/v1/Login').as('login');

  cy.get('[id="userName"]')
      .type(username);

  cy.get('[id="password"]')
      .type(password);

  cy.get('[id="login"]')
      .click();

  cy.get('[id="userName-value"]')
      .should('contain.text', 'Sup3rT3st3r!');

  cy.wait('@login');
});