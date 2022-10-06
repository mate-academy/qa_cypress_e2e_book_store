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
/// <reference types="cypress" />

import { user } from "./testData.js";

Cypress.Commands.add('search', (bookName) => {
    cy.contains('[id="item-2"]', 'Book Store').click();

    cy.get('[id="searchBox"]')
      .type(`${bookName}`, { timeout: 1000 });

    cy.get(`[id="see-book-${bookName}"]`)
      .should('be.visible');
});

Cypress.Commands.add('addBook', (bookname) => {
  cy.search(bookname);

  cy.intercept('POST', '/BookStore/v1/Books').as('bookAdding');

  cy.contains('a', `${bookname}`)
  .click();

  cy.contains('[id*="RecordButton"]', 'Add To Your Collection')
    .click({ force: true });

  cy.wait('@bookAdding');
});

Cypress.Commands.add('deleteBook', () => {
  cy.intercept('DELETE', '/BookStore/v1/Book').as('bookDeleting');

  cy.contains('[id="item-3"]', 'Profile').click();

  cy.get('[id="delete-record-undefined"]')
      .click({ force:true });

  cy.contains('[class="btn btn-primary"]', 'OK')
      .click();

  cy.wait('@bookDeleting');
});

Cypress.Commands.add('loginRequest', () => {
  cy.request('POST', '/BookStore/v1/Books', {userName: user.username, password: user.password})
    .then((response) => {
      cy.setCookie('token', response.body.token);
      cy.setCookie('userID', response.body.userId);
      cy.setCookie('isActive', response.body.isActive); //false by default
      });
});

