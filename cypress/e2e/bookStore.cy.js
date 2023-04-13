/// <reference types='cypress' />

import { user, book } from '../support/testData';

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
    cy.viewport(1280, 800);
  });

  it('should provide an ability to login', () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.contains('.text-right button', 'Login').click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/profile`);
    cy.get('#userName-value').should('contains.text', user.username);
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(`${book.title}{enter}`);
    cy.contains('a', book.title).click();
    cy.get('#author-wrapper > .col-md-9 > #userName-value').should('contain', book.author);
    cy.get('#publisher-wrapper > .col-md-9 > #userName-value').should('contain', book.publisher);
    cy.contains('.btn', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    cy.contains('.btn', 'Profile').click();
    cy.get('#delete-record-undefined > svg > path').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
