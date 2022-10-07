/// <reference types="cypress" />

import { book, user } from "../support/testData.js";

describe('User is able to input data in all of the fields', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });

  beforeEach(() => {
    cy.visit('/login');
    cy.login();
  });

  it('login', () => {
    cy.contains('[id="submit"]', 'Log out')
      .click();
  });
  
  it('search bar testing', () => {
    cy.contains('[id="item-2"]', 'Book Store').click();

    cy.get('[id="searchBox"]')
      .type(book.title, { timeout: 1000 });

    cy.get(`[id="see-book-${book.title}"]`)
      .should('be.visible');
  });

  it('add a book', () => {    
    cy.search(`${book.title}`);

    cy.contains('a', `${book.title}`)
      .click();

    cy.contains('[id*="RecordButton"]', 'Add To Your Collection')
      .click({ force: true });

    cy.on('window:alert', (str) => {
        expect(str).to.equal('Book added to your collection.');
    });

    cy.contains('[id="item-3"]', 'Profile')
    .click();

    cy.contains('a', `${book.title}`)
      .should('exist');

    cy.deleteBook();
  });

  it('delete a book', () => {
    cy.addBook(`${book.title}`);

    cy.contains('[id="item-3"]', 'Profile')
    .click();

    cy.get('[id="delete-record-undefined"]')
      .click({ force:true });

    cy.contains('[class="btn btn-primary"]', 'OK')
      .click();

    cy.on('window:alert', (str) => {
        expect(str).to.equal('Book deleted.');
    });
  });
});
