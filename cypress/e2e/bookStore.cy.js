/// <reference types='cypress' />

import { user } from "../support/testData";
describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should provide an abbility to login', () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
  });
  it('should providean abbility to add a book to collection', () => {
    cy.viewport(1080, 1920);
    cy.login();
    cy.visit('/profile');
    cy.get('.text').contains('Book Store').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('O\'Reilly Media');
    cy.get('.action-buttons').click();
    cy.get('.btn-primary').contains('Add To Your Collection').click();
  });
  it('Delete book', () => {
    cy.viewport(1080, 1920);
    cy.login();
    cy.visit('/profile');
    cy.get('.text').contains('Book Store').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('.action-buttons').click();
    cy.get('.btn-primary').contains('Add To Your Collection').click();
    cy.get('.text').contains('Profile').click();
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  })
});
