/// <reference types='cypress' />
import { user } from "../support/testData";

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should provide an ability to login', () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', 'user675');
    cy.url().should('include', '/profile');
  });

  it('should provide an ability to add a book to collection', () => {
    cy.viewport(1280, 720);
    cy.login();
    cy.visit('/profile');
    cy.get('.text').contains('Book Store').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('.action-buttons').click();
    cy.get('.btn-primary').contains('Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('should provide an ability to delete a book', () => {
    cy.viewport(1280, 720);
    cy.login();
    cy.visit('/profile');
    cy.get('.text').contains('Book Store').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('.action-buttons').click();
    cy.get('.btn-primary').contains('Add To Your Collection').click();
    cy.get('.text').contains('Profile').click();
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
